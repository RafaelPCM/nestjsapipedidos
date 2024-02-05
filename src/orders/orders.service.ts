import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private amqpConnection: AmqpConnection,
    ) {

  }


  async create(createOrderDto: CreateOrderDto & { client_id: number}) {
    const productIds = createOrderDto.items.map((item) => item.product_id)
    const uniqueProductIds = [...new Set(productIds)];
    const products = await this.productRepo.findBy({
      id: In(productIds),
    })

    if(products.length !== uniqueProductIds.length) {
      throw new Error('Alguem producto não existe. Produtos passados ${productItds}, produtos encontrados ${products.map((product) => product.id)}',);
    }
    
    const order = Order.create({
      client_id: createOrderDto.client_id,
      items: createOrderDto.items.map((item) => {
        const product = products.find((product) => product.id === item.product_id);
        return {
          price: product.price,
          product_id: item.product_id,
          quantity: item.quantity,
        }
      })
    })
    await this.orderRepo.save(order);
    await this.amqpConnection.publish('amq.direct', 'OrderCreated', {
      order_id: order.id,
      card_hash: createOrderDto.card_hash,
      total: order.total,
    });
    return order;
  }

  findAll(client_id: number) {
    return this.orderRepo.find({
      where: {
        client_id,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  findOne(id: string, client_id: number) {
    return this.orderRepo.findOneByOrFail({
        id,
        client_id,
    });
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
