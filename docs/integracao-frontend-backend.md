# Integração entre frontend e backend

## Integração atual

Frontend e backend estão no mesmo repositório, mas funcionam como aplicações npm independentes. A interface React atual não realiza requisições HTTP, não importa um cliente Supabase e não declara uma URL para a API.

O login exibido no frontend compara dados localmente e abre o dashboard estático. Portanto, ele não consome `POST /auth/login`, não armazena tokens e não consulta `GET /auth/me`.

Os indicadores e botões do dashboard também não consomem `GET /servicos` nem qualquer outro endpoint.

## Contrato disponível no backend

A API disponibiliza:

| Método | Caminho | Autenticação | Uso |
|---|---|---:|---|
| `GET` | `/health` | Não | Verificação da aplicação HTTP. |
| `POST` | `/auth/login` | Não | Autenticação por e-mail e senha. |
| `GET` | `/auth/me` | Sim | Consulta do usuário e perfil atuais. |
| `GET` | `/servicos` | Sim | Listagem de serviços. |
| `GET` | `/servicos/:id` | Sim | Consulta de um serviço. |

Os contratos completos estão em [API HTTP](api.md). O backend não configura CORS; chamadas do navegador originadas em outra porta não possuem liberação explícita no código atual.
