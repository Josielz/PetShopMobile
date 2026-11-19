# Pet Shop

Sistema web acadêmico para apoiar o gerenciamento de um Pet Shop. O repositório reúne uma interface em React, uma API HTTP em Express e a estrutura de dados utilizada no Supabase.

## Tecnologias

- React 19 e Vite 8 no frontend;
- Node.js e Express 5 no backend;
- Supabase Auth para autenticação;
- PostgreSQL e Row Level Security no banco de dados;
- Node Test Runner para os testes automatizados do backend.

## Instalação

O frontend e o backend são projetos npm independentes. É necessário ter Node.js e npm instalados. A versão exata do Node.js ainda não está fixada no repositório.

### Backend

```bash
cd Backend
npm ci
```

Crie `Backend/.env` a partir de `Backend/.env.example` e preencha as variáveis com dados do projeto Supabase. Não versione o arquivo `.env` nem exponha a chave `service_role`.

Com as migrations aplicadas no Supabase, execute:

```bash
npm run dev
```

A porta padrão da API é `3000`. Ela pode ser alterada pela variável `PORT`.

### Frontend

```bash
cd Frontend
npm ci
npm run dev
```

O endereço local é informado pelo Vite no terminal. A interface atual não realiza chamadas para a API.

## Validação

```bash
cd Backend
npm run check
npm test
```

```bash
cd Frontend
npm run lint
npm run build
```

O comando `npm run check:supabase` realiza uma consulta real ao Supabase configurado no ambiente e, por isso, requer credenciais locais válidas e as migrations aplicadas.

## Documentação

A documentação técnica oficial está centralizada em [`docs/`](docs/README.md):

- visão geral e escopo;
- arquitetura e estrutura do repositório;
- configuração do ambiente;
- banco de dados e Supabase;
- autenticação e segurança;
- endpoints e contratos da API;
- testes e validações;
- integração entre frontend e backend.

## Equipe

- Josiel — login e cadastro;
- Isaac — CRUD de pets;
- Leonardo — banco de dados e Supabase;
- João Henrique — dashboard e relatórios;
- Aaron — integrante da equipe.
