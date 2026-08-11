# Desafio Técnico
## Objetivo

Implementar um sistema de controle de gastos residenciais com:

- Cadastro de transações;
- Cadastro de pessoas;
- Consulta de totais.

O código deve deixar clara a lógica/função do que foi desenvolvido, por meio de comentários e documentação no próprio código.

## Especificação

Em linhas gerais, basta que o sistema cumpra os requisitos apresentados a seguir.

## Tecnologias

- **Back-end:** .NET com C#
- **Front-end:** React com TypeScript
- Os dados devem persistir após o fechamento da aplicação.

## Funcionalidades

### Cadastro de pessoas

Deverá ser implementado um cadastro contendo as funcionalidades básicas de gerenciamento: **criação, deleção e listagem**.

Ao deletar uma pessoa, todas as transações associadas a ela deverão ser apagadas.

O cadastro de pessoa deverá conter:

- Identificador (único, gerado automaticamente);
- Nome;
- Idade.

### Cadastro de transações

Deverá ser implementado um cadastro contendo as funcionalidades básicas de gerenciamento: **criação e listagem** (não é necessário implementar edição/deleção).

Caso a pessoa informada seja menor de idade (menor de 18 anos), apenas despesas poderão ser cadastradas.

O cadastro de transação deverá conter:

- Identificador (único, gerado automaticamente);
- Descrição;
- Valor;
- Tipo (despesa/receita);
- Pessoa (identificador da pessoa) — esse valor precisa existir no cadastro de pessoas.

### Consulta de totais

Deverá listar todas as pessoas cadastradas, exibindo o total de receitas, despesas e o saldo (receita – despesa) de cada uma.

Ao final da listagem, deverá ser exibido o total geral de todas as pessoas, incluindo o total de receitas, o total de despesas e o saldo líquido.

## Critérios de avaliação

A avaliação do teste técnico será baseada nos seguintes pontos:

- Aderência às regras de negócio;
- Atenção aos detalhes;
- Qualidade e legibilidade do código;
- Boas práticas.

## Formato de entrega

Você deve subir o código-fonte da sua solução para um repositório Git e enviar o link do repositório conforme as instruções do processo seletivo.

**Importante:**

1. Certifique-se de que o repositório esteja **público**, garantindo o acesso à sua solução;
2. Remova qualquer referência à empresa contratante de todos os arquivos antes da publicação;
3. Recursos adicionais podem ser implementados livremente, desde que não afetem o funcionamento das funcionalidades já especificadas.

Em caso de dúvidas, entre em contato com a equipe de recrutamento responsável pelo processo seletivo.

## Organização da entrega

Para facilitar a entrega do desafio:

1. Certifique-se de que resolveu todo o desafio técnico;
2. Verifique se seguiu as instruções para envio do teste técnico;
3. Suba o código-fonte final da sua solução para um repositório Git;
4. Envie o link do repositório (público) para a equipe responsável pelo processo seletivo — essa é a única forma de garantir o acesso à sua solução para análise.

---
