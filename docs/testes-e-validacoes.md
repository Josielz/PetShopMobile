# Testes e validações

## Backend

O backend usa o Node Test Runner, `node:assert/strict` e requisições HTTP feitas com `fetch`. Os testes iniciam a aplicação em uma porta local aleatória.

Execute:

```bash
cd Backend
npm run check
npm test
```

`npm run check` verifica a sintaxe dos arquivos JavaScript do backend e dos testes.

A suíte contém oito casos:

- credenciais obrigatórias no login;
- Bearer token obrigatório em `/auth/me`;
- autenticação obrigatória em `/servicos`;
- listagem de serviços;
- tratamento de falha na listagem;
- consulta de serviço por ID;
- rejeição de ID inválido;
- resposta para serviço ausente.

As integrações com Supabase usadas pelos testes de serviços são substituídas por mocks. Não há teste automatizado que faça login real ou consulte o projeto Supabase remoto.

Para validar deliberadamente a conexão remota configurada:

```bash
cd Backend
npm run check:supabase
```

Esse comando não é um teste isolado: ele depende de credenciais locais, rede, tabela `servicos` e migrations aplicadas.

## Frontend

O frontend possui comandos de lint e build:

```bash
cd Frontend
npm run lint
npm run build
```

Não existem arquivos de teste automatizado para componentes ou fluxos do frontend.
