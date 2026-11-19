# API HTTP

## Convenções

- formato das requisições e respostas: JSON;
- porta padrão: `3000`;
- autenticação: `Authorization: Bearer <access-token>`;
- erros retornam `{ "message": "..." }`;
- rotas inexistentes retornam HTTP `404`.

Não há prefixo global como `/api` ou `/v1` e não existe configuração de CORS no backend.

## Saúde

### `GET /health`

Rota pública para verificar se a aplicação HTTP está respondendo.

Resposta `200`:

```json
{
  "status": "ok"
}
```

## Autenticação

### `POST /auth/login`

Rota pública.

Corpo:

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha-do-usuario"
}
```

Resposta `200`:

```json
{
  "accessToken": "<access-token>",
  "refreshToken": "<refresh-token>",
  "expiresAt": 0,
  "user": {
    "id": "<uuid>",
    "email": "usuario@exemplo.com",
    "nome": "Nome",
    "tipo": "FUNCIONARIO",
    "createdAt": "<data-hora>"
  }
}
```

Respostas previstas:

- `400`: e-mail ou senha ausente;
- `401`: credenciais inválidas;
- `404`: usuário autenticado sem perfil;
- `503`: falha ao consultar o perfil, apresentada ao cliente com mensagem interna genérica.

### `GET /auth/me`

Exige Bearer token.

Resposta `200`:

```json
{
  "user": {
    "id": "<uuid>",
    "email": "usuario@exemplo.com",
    "nome": "Nome",
    "tipo": "FUNCIONARIO",
    "createdAt": "<data-hora>"
  }
}
```

Respostas previstas: `401` para token ausente, inválido ou expirado; `404` para perfil ausente; `503` para falha de consulta.

## Serviços

Todas as rotas de serviços exigem Bearer token.

### `GET /servicos`

Retorna os serviços ordenados por `id` crescente.

Resposta `200`:

```json
{
  "servicos": [
    {
      "id": 1,
      "nome": "Banho",
      "preco": 0,
      "ativo": true
    }
  ]
}
```

Respostas previstas: `401` para falha de autenticação e `503` para falha na consulta.

### `GET /servicos/:id`

O parâmetro `id` deve ser um número inteiro positivo.

Resposta `200`:

```json
{
  "servico": {
    "id": 1,
    "nome": "Banho",
    "preco": 0,
    "ativo": true
  }
}
```

Respostas previstas:

- `400`: ID inválido;
- `401`: falha de autenticação;
- `404`: serviço não encontrado;
- `503`: falha na consulta.
