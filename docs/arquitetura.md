# Arquitetura e estrutura

## Componentes

O sistema está dividido em três áreas independentes:

```text
PetShopMobile/
├── Backend/                API Node.js e Express
│   ├── src/
│   │   ├── config/         Ambiente e cliente Supabase
│   │   ├── errors/         Erro de aplicação
│   │   ├── middlewares/    Autenticação e tratamento HTTP
│   │   ├── modules/        Auth, health e serviços
│   │   ├── scripts/        Verificação da conexão Supabase
│   │   ├── app.js          Composição da aplicação Express
│   │   └── server.js       Inicialização do servidor HTTP
│   └── test/               Testes automatizados
├── Frontend/               Aplicação React e Vite
│   ├── public/              Arquivos públicos
│   └── src/                 Componentes, estilos e recursos
├── database/
│   └── migrations/         Definições SQL versionadas
├── docs/                   Documentação técnica oficial
└── README.md               Apresentação e execução
```

Frontend e backend possuem manifestos e arquivos lock próprios. Não existe um `package.json` na raiz.

## Backend

Os módulos com regra de negócio seguem o fluxo:

```text
routes -> controllers -> services -> repositories
```

- `routes` associam caminhos, middlewares e controllers;
- `controllers` validam entradas HTTP e formatam respostas;
- `services` implementam regras de negócio e traduzem falhas para erros da aplicação;
- `repositories` encapsulam chamadas ao cliente Supabase.

O módulo `health` possui apenas rota e controller porque não contém regra de negócio nem acesso a dados. Middlewares compartilhados tratam autenticação, rotas inexistentes e erros.

## Frontend

A entrada da aplicação é `Frontend/src/main.jsx`. O componente `App` mantém o estado do formulário de login e alterna localmente para `AdminDashboard`. Não há biblioteca de roteamento, cliente HTTP ou SDK do Supabase instalado no frontend.

## Persistência

O backend utiliza `@supabase/supabase-js` para acessar o Supabase Auth e as tabelas PostgreSQL. O esquema versionado está nas migrations SQL; não há configuração do Supabase CLI no repositório.
