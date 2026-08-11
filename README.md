# 💸 Controle de Gastos

Aplicação full-stack desenvolvida como teste técnico. Permite o gerenciamento de pessoas e o controle de suas transações (receitas e despesas), com regras de negócio e validações aplicadas.

## 🚀 Tecnologias Utilizadas
- **Back-end:** C# .NET, Entity Framework Core, SQLite.
- **Front-end:** React, TypeScript, Vite, Axios.

## ⚙️ Como executar o projeto na sua máquina

O projeto possui dois ambientes que devem rodar simultaneamente.

### 1. Rodando a API (Back-end)
Abra o terminal na raiz da API e execute:
```bash
dotnet run
```
> **Nota:** O banco de dados SQLite e as migrations serão criados e aplicados automaticamente na primeira execução através do `Program.cs`. A API rodará na porta `5231`.

### 2. Rodando o Front-end (React)
Abra um novo terminal, navegue até a pasta do front-end e execute:
```bash
cd controleDeGastosFront
npm install
npm run dev
```
> O front-end rodará em `http://localhost:5173`.