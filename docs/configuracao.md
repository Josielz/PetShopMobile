# Configuração do ambiente

## Pré-requisitos

- Node.js e npm;
- projeto Supabase com Auth e PostgreSQL;
- migrations de `database/migrations/` aplicadas na ordem numérica.

A versão mínima ou recomendada do Node.js não está declarada no repositório.

## Backend

Instale as dependências definidas no arquivo lock:

```bash
cd Backend
npm ci
```

Crie um arquivo `.env` a partir de `.env.example`. As variáveis reconhecidas são:

| Variável | Obrigatória | Finalidade |
|---|---:|---|
| `PORT` | Não | Porta HTTP. O padrão é `3000`. |
| `SUPABASE_URL` | Sim | URL do projeto Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | Sim | Chave privilegiada usada somente pelo backend. |

O arquivo `.env` é carregado explicitamente a partir da raiz de `Backend/`. Valores ausentes para as configurações do Supabase impedem a inicialização dos módulos que usam o cliente.

Comandos disponíveis:

```bash
npm start              # inicia com Node.js
npm run dev            # inicia com nodemon
npm run check          # verifica a sintaxe dos arquivos JavaScript
npm test               # executa os testes automatizados
npm run check:supabase # consulta o Supabase configurado
```

`check:supabase` acessa a tabela `servicos` e depende de conexão, credenciais e banco configurados.

## Frontend

```bash
cd Frontend
npm ci
npm run dev
```

Comandos disponíveis:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

O frontend não declara variáveis de ambiente nem endereço de API.

## Proteção de configuração

Arquivos `.env` e suas variantes locais são ignorados pelo Git. Arquivos `.env.example` permanecem versionáveis e devem conter apenas nomes de variáveis e placeholders.
