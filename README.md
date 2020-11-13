# recuperação de senha

**RF**

- o usuario deve poder recuperar sua senha informando o email
- o usuario deve receber um email com instruções de recuperação de email
- o usuario deve poder resetar sua senha

**RNF**

- utilizar mailtrap para testar envios em dev
- utilizar amozon SES para envios em produção
- o envio de emails deve acontecer em segundo plano (background job - fila)

**RN**

- o link de recuperação de senha deve expirar em 2 horas
- o usuario precisa confirmar a nova senha ao resetar sua senha.

# atualização do perfil

**RF**

- o usuario deve poder atualizar seru nome, email e senha

**RNF**

**RN**

- o usuario não pode alterar seu email para um email já utilizado
- para atualizar sua senha o usuario deve informar a senha antiga
- para atualizar a senha o usuario deve confirmar sua nova senha

# painel do prestador

**RF**

- o prestador deve poder ver todos os agendamentos do dia
- o prestador deve ser notificado quando houver um novo agendamento
- o prestador deve poder visualizar as notificações nao lidas

**RNF**

- os agendamento do prestador do dia devem ser armazenados em cache.
- as notificações devem ser armazenadas no mongodb
- as notificações do prestador devem ser enviadas em tempo real utilizando Socket.io

**RN**

- a notificação deve ter um status de lida ou nao liga para o prestador controlar

# agendamento de serviços

**RF**

- o usuario deve poder listar todos os prestadores cadastrados.
- o usuario deve poder listar os dias de um mes com os horarios de um prestador
- o usuario deve poder listar os horario de um dia de um prestador
- o usuario deve poder realizar um novo agendamento em um prestador

**RNF**

- a listagem de prestadores deve ser armazenado em chache

**RN**

- cada agendamento deve durar uma hora
- os agendamento devem estar disponiveis das 8 as 18
- o usuario nao pode agendar em um horario já agendado
- o usuario nao pode agendar em um horario invalido
- o usuario nao pode agendar serviços consigo mesmo
