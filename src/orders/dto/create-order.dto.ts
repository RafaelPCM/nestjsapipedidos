import { Type } from "class-transformer";
import { ArrayNotEmpty, IsInt, IsNotEmpty, IsPositive, IsString, MaxLength, ValidateNested } from "class-validator";

export class CreateOrderDto {
    
    @ValidateNested()
    @ArrayNotEmpty({each: true})
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    card_hash: string;

}


export class OrderItemDto {
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    quantity: number;

    @IsNotEmpty()
    @MaxLength(36)
    @IsString()
    product_id: string;
}