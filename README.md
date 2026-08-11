# 💸 Controle de Gastos

Aplicação full-stack desenvolvida como teste técnico para controle de gastos
residenciais: cadastro de pessoas, cadastro de transações (receitas/despesas) e
consulta de totais, com as regras de negócio e validações exigidas.

> 📄 Especificação original do desafio: [`documentacao/enunciado.md`](documentacao/enunciado.md)
> 📐 Diagramas UML (casos de uso, classes e sequência): [`documentacao/`](documentacao/)

## Índice

- [Funcionalidades](#-funcionalidades)
- [Regras de negócio](#-regras-de-negócio)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Como executar o projeto](#️-como-executar-o-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Documentação e diagramas](#-documentação-e-diagramas)

## 📋 Funcionalidades

### Pessoas

- Criação, listagem e exclusão de pessoas;
- Cada pessoa possui identificador (gerado automaticamente), nome e idade.

### Transações

- Criação e listagem de transações (receita ou despesa);
- Cada transação está vinculada a uma pessoa já cadastrada.

### Totais

- Resumo com o total de receitas, despesas e saldo (receita − despesa) **de cada pessoa**;
- Total geral consolidado (receitas, despesas e saldo líquido) de todas as pessoas.

## 📐 Regras de negócio

- **Exclusão em cascata:** ao excluir uma pessoa, todas as suas transações são
  removidas automaticamente (`OnDelete(DeleteBehavior.Cascade)` em
  [`Data/AppDbContext.cs`](Data/AppDbContext.cs));
- **Restrição por idade:** pessoas menores de 18 anos só podem ter **despesas**
  cadastradas — receitas são bloqueadas com `400 Bad Request`
  (validado em [`Controllers/TransacaoController.cs`](Controllers/TransacaoController.cs));
- **Integridade referencial:** uma transação só é aceita se a pessoa informada
  (`PessoaId`) já existir no cadastro, retornando `404 Not Found` caso contrário.

## 🚀 Tecnologias Utilizadas

**Back-end**
- C# / .NET 10 (ASP.NET Core Web API)
- Entity Framework Core 10 (Code First + Migrations)
- SQLite

**Front-end**
- React 19 + TypeScript
- Vite
- Axios

## 🗂 Estrutura do projeto

```
ControleDeGastos/
├── Controllers/                # Endpoints da API (Pessoas, Transacao)
├── Models/                     # Entidades de domínio (Pessoa, Transacao, TipoTransacao)
├── Dtos/                        # DTOs de saída (ex.: resumo de totais por pessoa)
├── Data/                       # AppDbContext (EF Core) e mapeamento de relacionamentos
├── Migrations/                 # Migrations do Entity Framework Core
├── Properties/                 # Configurações de execução (launchSettings.json)
├── documentacao/                # Enunciado do desafio + diagramas UML
├── controleDeGastosFront/      # SPA em React + TypeScript
│   └── src/
│       ├── App.tsx             # Telas de cadastro, listagem e painel de totais
│       └── App.css
├── Program.cs                  # Configuração da aplicação (DI, CORS, migrations automáticas)
└── appsettings.json            # Connection string do SQLite
```

## ⚙️ Como executar o projeto

### Pré-requisitos

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/) e npm

O projeto possui dois processos que devem rodar simultaneamente (back-end e front-end).

### 1. Back-end (API)

Na raiz do repositório, execute:

```bash
dotnet run
```

> O banco de dados SQLite (`banco_gastos.db`) e as migrations são criados/aplicados
> automaticamente na primeira execução, via `db.Database.Migrate()` em `Program.cs`.
> A API fica disponível em `http://localhost:5231`.

### 2. Front-end (React)

Em outro terminal:

```bash
cd controleDeGastosFront
npm install
npm run dev
```

> A aplicação fica disponível em `http://localhost:5173`.

## 🔌 Endpoints da API

### Pessoas — `/api/Pessoas`

| Método   | Rota                | Descrição                                                                |
|----------|---------------------|---------------------------------------------------------------------------|
| `GET`    | `/api/Pessoas`       | Lista todas as pessoas cadastradas                                        |
| `POST`   | `/api/Pessoas`       | Cadastra uma nova pessoa (`nome`, `idade`)                                 |
| `DELETE` | `/api/Pessoas/{id}`  | Remove uma pessoa e todas as suas transações (cascade)                     |
| `GET`    | `/api/Pessoas/totais`| Retorna o total de receitas, despesas e saldo de cada pessoa, além do total geral |

### Transações — `/api/Transacao`

| Método | Rota             | Descrição                                                          |
|--------|------------------|---------------------------------------------------------------------|
| `GET`  | `/api/Transacao`  | Lista todas as transações (com os dados da pessoa vinculada)        |
| `POST` | `/api/Transacao`  | Cadastra uma transação (`descricao`, `valor`, `tipo`, `pessoaId`)    |

> Em ambiente de desenvolvimento, a especificação OpenAPI é exposta automaticamente
> (via `AddOpenApi`/`MapOpenApi`) para exploração dos contratos da API.

## 📚 Documentação e diagramas

A pasta [`documentacao/`](documentacao/) contém a especificação original do desafio
e os diagramas UML do projeto (casos de uso, classes e sequência), incluindo o
código-fonte Mermaid (`.mmd`) de cada um, para facilitar manutenção futura.
