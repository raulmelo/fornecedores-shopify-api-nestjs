# Shopify - Fornecedores API

## Sobre o Projeto

Este projeto é uma API desenvolvida com NestJS, voltada para a gestão de fornecedores para shopify. Ela permite a criação de empresas, consulta, atualização e remoção de informações de fornecedores podendo adicionar ou remover produtos de forma eficiente e segura.

## Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias e bibliotecas:

- NestJS
- TypeScript
- Prisma
- JWT para autenticação
- Swagger para documentação da API
- Outras dependências listadas em `package.json`

## Como Instalar

Para rodar este projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**
Ou crie um fork

2. **Instale as dependências:**

npm install

3. **Configuração**

Certifique-se de configurar as variáveis de ambiente necessárias para o projeto. Isso pode incluir 

* strings de conexão de banco de dados
* segredos JWT
* Token do shopify admin

```bash
DATABASE_PRIVATE_URL="CONEXO_COM_BANCO_DE_DADOS"
JWT_SECRET="b2d3e4f5g6h7i8j9k0l"
JWT_EXPIRES_IN="30d"
MAILER_USER="<EXEMPLO_EMAIL@gmail.com>"
MAILER_PASS="MAIL_PASS_BOT_PASSWORD"
URL_FRONTEND="URL_DO_FRONTEND"
SHOPIFY_TOKEN="SHOPIFY_TOKEN_ADMIN_AQUI"
```


Projeto usando o Prisma.
