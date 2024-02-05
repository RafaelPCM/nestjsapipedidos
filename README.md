# nestjsapipedidos
Api de ordem de pedidos em Nest.js





Parece que você está enfrentando um problema relacionado à execução de scripts no PowerShell do Windows. O erro indica que a execução de scripts está desabilitada neste sistema e você precisa habilitá-la para poder usar o comando nest para criar um novo projeto NestJS.

Para resolver esse problema, você pode seguir estas etapas:

Abra o PowerShell como administrador: Clique com o botão direito do mouse no ícone do PowerShell e selecione "Executar como administrador".

Habilite a execução de scripts: Execute o seguinte comando no PowerShell com privilégios elevados para habilitar a execução de scripts:

powershell
Copy code
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
Isso permitirá a execução de scripts para o usuário atual (você).

Confirme a mudança: Você pode precisar confirmar a alteração na política de execução. Digite Y e pressione Enter.

Tente criar o projeto NestJS novamente: Agora, tente executar o comando nest new nestjs-api novamente e veja se o problema persiste.

Essas etapas devem resolver o problema e permitir que você crie um novo projeto NestJS sem encontrar erros relacionados à execução de scripts.