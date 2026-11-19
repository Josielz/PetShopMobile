# Banco de dados e Supabase

## Organização

O esquema PostgreSQL é definido por migrations incrementais em `database/migrations/`. O repositório não contém executor próprio de migrations, arquivo de configuração do Supabase CLI ou migrations de reversão.

## Migration `001_perfis.sql`

Cria `public.perfis`:

| Coluna | Tipo | Regras |
|---|---|---|
| `id` | `UUID` | Chave primária e referência a `auth.users(id)`, com exclusão em cascata. |
| `nome` | `TEXT` | Obrigatória, com texto vazio como padrão. |
| `tipo` | `TEXT` | Obrigatória; aceita somente `ADMIN` ou `FUNCIONARIO`. |
| `created_at` | `TIMESTAMPTZ` | Obrigatória, preenchida com `NOW()`. |

A função `public.criar_perfil_usuario()` e o trigger `ao_criar_usuario` criam um perfil `FUNCIONARIO` para cada novo registro de `auth.users`. A função usa `SECURITY DEFINER`, define o `search_path` vazio e referencia a tabela de destino de forma qualificada.

A tabela possui RLS. Usuários autenticados podem consultar apenas o próprio perfil. Não há políticas de inserção, atualização ou exclusão para o papel `authenticated`.

## Migration `002_servicos.sql`

Cria `public.servicos`:

| Coluna | Tipo | Regras |
|---|---|---|
| `id` | `BIGINT` identity | Chave primária. |
| `nome` | `TEXT` | Obrigatória e única. |
| `preco` | `NUMERIC(10,2)` | Obrigatória. |
| `ativo` | `BOOLEAN` | Obrigatória, com `TRUE` como padrão. |

A tabela possui RLS e permite leitura para usuários autenticados. A migration insere os registros iniciais `Banho`, `Tosa` e `Consulta veterinária`, todos com preço inicial zero.

## Acesso pelo backend

Os repositories consultam `perfis` e `servicos` por meio de um cliente configurado com a chave `service_role`. Essa chave possui privilégios elevados e não deve ser enviada ao frontend.

O repositório não permite confirmar se as migrations já foram aplicadas a algum ambiente Supabase. Essa confirmação depende do projeto remoto configurado.
