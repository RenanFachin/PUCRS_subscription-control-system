# Subscription Control System
Considerando mundo de hoje, o problema propõem a criação de uma aplicação que trabalha com o modelo de assinaturas.O cliente poderá baixar os aplicativos gratuitamente na loja, porém eles só devem estar disponíveis caso o cliente tenha um assinatura paga. 

Com isto, é necessário um sistema para manter o controle das assinaturas, este sistema deve ser capaz de, periodicamente, verificar se a assinatura continua válida.
Ao assinar um aplicativo, o sistema deve automaticamente gerar um código, que juntamente com o código de identificação do cliente, fazem a liberação do aplicativo.

## Requisitos

### Requisitos funcionais

#### ServicoCadastramento
- [ ] Deve ser possível gerar uma lista com todos os clientes cadastrados;
- [ ] Deve ser possível gerar uma lista com todos os aplicativos cadatrados;
- [ ] Deve ser possível criar uma assinatura;
- [ ] Deve ser possível realizar uma atualização no custo mensal dos aplicativos;
- [ ] Deve ser possível retornar uma lista com todos as assinaturas vigentes;
- [ ] O cliente deve ser capaz de retornar uma lista com as suas assinaturas;
- [ ] Deve ser possível retornar uma lista de assinaturas por aplicativos;

#### ServicoPagamentos
- [ ] Deve ser possível solicitar o registro de um pagamento;

#### ServicoAssinaturasValidas
- [ ] Deve ser possível retornar a validade de uma assinatura específica



### Requisitos não-funcionais

- [ ] Deve ser previsto um script para popular o bando de dados;
- [ ] Deve ser possível adicionar novos microserviços conforme necessário para atender à demanda crescente;
- [ ] Todos os dados sensíveis, como informações de pagamento, devem ser armazenados de forma segura;
- [ ] O sistema deve estar disponível para acesso e uso dos usuários 24 horas por dia, 7 dias por semana, com um tempo de inatividade mínimo planejado para manutenção e atualizações;
- [ ] Deve haver documentação abrangente disponível para orientar os usuários sobre como utilizar o sistema de forma eficaz;

## Entidades
A aplicação deve conter as seguintes entidades: `Aplicativo`,`Cliente`,`Assinatura`,`Pagamento`,`Usuário`

## Atributos

### Aplicativo
| Atributo | Descrição                                         | Tipo   |
|----------|---------------------------------------------------|--------|
| codigo   | Código identificador do aplicativo                | Int  |
| nome     | Nome fantasia pelo qual o aplicativo é conhecido | String  |
| custoMensal     | Valor da assinatura mensal | Float  |


### Cliente
| Atributo | Descrição                                         | Tipo   |
|----------|---------------------------------------------------|--------|
| codigo   | Código identificador do cliente                | Int  |
| nome     | Nome do cliente | String  |
| email     | E-mail do cliente | String  |


### Assinatura
| Atributo | Descrição                                         | Tipo   |
|----------|---------------------------------------------------|--------|
| codigo   | Código identificador da assinatura                | Int  |
| codApp     | Código do aplicativo assinado | Int  |
| codCli     | Código do cliente | Int  |
| inicioVigencia     | Início da vigência da assinatura | Date  |
| fimVigencia     | Fim da vigência da assinatura | Date  |


### Pagamento
| Atributo | Descrição                                         | Tipo   |
|----------|---------------------------------------------------|--------|
| codigo   | Identificador único do pagamento                | Int  |
| codAssinatura     | Código da assinatura paga | Int  |
| valorPago     | Valor pago | Float  |
| dataPagamento     | Data em que o pagamento foi efetivado | Date  |

### Usuário
| Atributo | Descrição                                         | Tipo   |
|----------|---------------------------------------------------|--------|
| usuario   | Identificador do usuário para login                | String  |
| senha     | Senha de acesso do usuário | String  |