# Desafio Técnico - Testes Automatizados de API com Cypress

## Objetivo

Este projeto foi desenvolvido para validar endpoints de uma API REST utilizando Cypress, aplicando boas práticas de automação de testes, validação de contratos, geração de dados dinâmicos e geração de relatórios de execução.

A API utilizada para os testes foi:

https://restful-booker.herokuapp.com/apidoc/index.html

---

# Requisitos Atendidos

## Tarefa 1

Utilizando Cypress, foram implementados testes automatizados para validação dos endpoints da API.

Os testes contemplam:

* Validação de Status Code;
* Validação de Headers;
* Validação do Body da resposta;
* Cenários Positivos;
* Cenários Negativos;
* Validação de Contrato (Schema Validation);
* Geração de Relatórios de Execução.

### Exemplos de validações implementadas

#### GET

* Listar reservas com sucesso;
* Consultar reserva existente;
* Consultar reserva inexistente;
* Consultar utilizando identificador inválido;
* Validar estrutura da resposta;
* Validar tipos dos campos;
* Validar contrato da API.

#### POST

* Criar reserva com sucesso;
* Validar retorno do bookingid;
* Validar dados enviados;
* Validar contrato da resposta;
* Payload vazio;
* Campos obrigatórios ausentes.

#### PUT

* Atualizar reserva com sucesso;
* Validar atualização dos dados;
* Validar contrato da atualização;
* Atualização sem token;
* Atualização com token inválido;
* Atualização de reserva inexistente;
* Payload vazio.

#### DELETE

* Exclusão de reserva com sucesso;
* Exclusão sem token;
* Exclusão com token inválido;
* Exclusão de reserva inexistente.

---

## Tarefa 2

Foram automatizados testes para múltiplos endpoints utilizando diferentes métodos HTTP.

### Métodos Cobertos

| Método | Descrição               |
| ------ | ----------------------- |
| GET    | Consulta de reservas    |
| POST   | Criação de reservas     |
| PUT    | Atualização de reservas |
| DELETE | Exclusão de reservas    |

### Validações realizadas

* Status Codes;
* Headers;
* Body de resposta;
* Contrato da API;
* Dados obrigatórios;
* Autenticação;
* Payloads inválidos;
* Recursos inexistentes.

---

# Tecnologias Utilizadas

* Cypress
* AJV (JSON Schema Validation)
* Faker JS
* Mochawesome Reporter
* JavaScript

---

# Estrutura do Projeto

```text
cypress
│
├── e2e
│   └── bookings
│       ├── getBookings.cy.js
│       ├── postBooking.cy.js
│       ├── putBooking.cy.js
│       └── deleteBooking.cy.js
│
├── fixtures
│   └── booking.json
│
├── schemas
│   ├── bookingSchema.js
│   └── createBookingSchema.js
│
├── support
│   ├── factories
│   │   └── bookingFactory.js
│   │
│   ├── services
│   │   └── bookingService.js
│   │
│   └── schemaValidator.js
│
└── reports
```

---

# Padrões Utilizados

## Service Layer

Toda comunicação com a API foi centralizada na camada de serviços.

Exemplo:

```javascript
bookingService.getBookings()

bookingService.createBooking()

bookingService.updateBooking()

bookingService.deleteBooking()
```

Benefícios:

* Reutilização de código;
* Facilidade de manutenção;
* Melhor organização dos testes.

---

## Factory Pattern

Os dados de teste são gerados dinamicamente utilizando Faker.

Exemplo:

```javascript
const booking = createBookingData()
```

Benefícios:

* Dados únicos por execução;
* Redução de dependência de massas fixas;
* Simulação mais próxima de cenários reais.

---

## Contract Testing

Foi implementada validação de contrato utilizando JSON Schema e AJV.

Exemplo:

```javascript
const result = validateSchema(
    bookingSchema,
    response.body
)

expect(result.valid).to.be.true
```

Benefícios:

* Garantia da estrutura da API;
* Detecção precoce de quebras de contrato;
* Maior confiabilidade dos testes.

---

# Instalação do Projeto

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Acesse a pasta:

```bash
cd <NOME_DO_PROJETO>
```

Instale as dependências:

```bash
npm install
```

---

# Dependências Utilizadas

## Cypress

```bash
npm install cypress --save-dev
```

## Faker

```bash
npm install @faker-js/faker --save-dev
```

## AJV

```bash
npm install ajv --save-dev
```

## Mochawesome

```bash
npm install mochawesome --save-dev
```

Ou:

```bash
npm install cypress-mochawesome-reporter --save-dev
```

---

# Executando os Testes

## Abrir interface gráfica

```bash
npx cypress open
```

ou

```bash
npm run cy:open
```

---

## Executar em modo headless

```bash
npx cypress run
```

ou

```bash
npm run cy:run
```

---

# Relatórios

Os relatórios são gerados automaticamente após a execução.

Localização:

```text
cypress/reports
```

Arquivos gerados:

```text
mochawesome.html

mochawesome.json
```

Para visualizar:

```text
cypress/reports/mochawesome.html
```

O relatório apresenta:

* Total de testes executados;
* Cenários aprovados;
* Cenários reprovados;
* Tempo de execução;
* Evidências de falha;
* Stack trace dos erros.

---

# Cobertura Implementada

## GET Booking

* Listar reservas
* Buscar reserva por ID
* Reserva inexistente
* Identificador inválido
* Validação de campos obrigatórios
* Validação de tipos
* Validação de datas
* Validação de contrato

## POST Booking

* Criar reserva
* Retornar bookingid
* Validar dados enviados
* Validar contrato
* Payload vazio
* Campos obrigatórios ausentes

## PUT Booking

* Atualizar reserva
* Validar alteração dos dados
* Validar contrato
* Token inválido
* Ausência de token
* Reserva inexistente
* Payload vazio

## DELETE Booking

* Excluir reserva
* Token inválido
* Ausência de token
* Reserva inexistente

---

# Considerações Finais

A solução foi desenvolvida seguindo boas práticas de automação de testes de API, contemplando:

* Organização em camadas (Service Layer);
* Dados dinâmicos com Faker;
* Contract Testing com AJV;
* Cenários positivos e negativos;
* Cobertura completa de CRUD;
* Relatórios automatizados;
* Código reutilizável e de fácil manutenção.

O objetivo foi demonstrar capacidade de planejamento, implementação e validação de APIs REST utilizando Cypress em um contexto próximo ao utilizado em projetos reais.
