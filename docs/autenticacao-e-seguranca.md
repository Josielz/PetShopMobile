# Autenticação e segurança

## Fluxo de autenticação

1. O cliente envia e-mail e senha para `POST /auth/login`.
2. O backend chama `signInWithPassword` do Supabase Auth.
3. O backend consulta `public.perfis` usando o identificador do usuário autenticado.
4. A resposta inclui tokens da sessão e os dados formatados do usuário.
5. Rotas protegidas recebem o access token no cabeçalho `Authorization: Bearer <token>`.
6. O middleware consulta o Supabase Auth para validar o token e disponibiliza o usuário em `request.auth`.

O endpoint `GET /auth/me` consulta novamente o perfil associado ao usuário validado.

## Papéis

O banco aceita os papéis `ADMIN` e `FUNCIONARIO`. Novos usuários recebem `FUNCIONARIO` pelo trigger da migration `001_perfis.sql`.

O backend atual autentica usuários, mas não contém middleware de autorização por papel. Também não existem endpoints de cadastro de usuários ou alteração de papéis.

## Controles implementados

- exigência do esquema Bearer nas rotas protegidas;
- validação do token pelo Supabase Auth;
- RLS habilitado nas tabelas versionadas;
- ausência de políticas de escrita para usuários autenticados em `perfis`;
- chave `service_role` carregada somente pelo backend;
- mensagens genéricas para erros HTTP de nível 500;
- variáveis locais protegidas pelo `.gitignore`.

## Cuidados operacionais

- nunca enviar a chave `SUPABASE_SERVICE_ROLE_KEY` ao navegador;
- não versionar o arquivo `.env`;
- não registrar tokens, senhas ou chaves em logs;
- manter valores reais fora de `.env.example`;
- revisar o acesso ao projeto remoto antes de executar `npm run check:supabase`.

## Frontend

O formulário atual usa uma comparação local demonstrativa e não chama o backend nem o Supabase. Esse mecanismo não representa autenticação real e não deve ser tratado como controle de segurança.
