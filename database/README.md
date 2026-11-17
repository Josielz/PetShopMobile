# Projeto - Pet Shop | Banco de Dados

## Objetivo

Organizar os dados utilizados pelo Sistema Pet Shop.

Nesta primeira etapa, o banco contempla somente os perfis de administradores e funcionários, necessários para o login.

## Estrutura

```text
database/
├── README.md
└── migrations/
    └── 001_perfis.sql
```

- `README.md`: documentação do banco de dados.
- `migrations/`: pasta dos arquivos que criam ou modificam tabelas.
- `001_perfis.sql`: arquivo que define os perfis de usuários e suas regras de acesso.

## Tabela: perfis

| Campo | Finalidade |
|---|---|
| `id` | Identificar o usuário. |
| `nome` | Guardar o nome do usuário. |
| `tipo` | Diferenciar `ADMIN` e `FUNCIONARIO`. |
| `created_at` | Registrar quando o perfil foi criado. |

## Funcionamento

- Administradores e funcionários utilizam a mesma tela de login.
- Somente o administrador pode cadastrar funcionários no sistema.
- O perfil de um novo usuário é criado como `FUNCIONARIO`.
- O e-mail e a senha ficam no Supabase Auth, não na tabela `perfis`.
