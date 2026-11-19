# Visão geral e escopo

## Finalidade

O Pet Shop é um projeto acadêmico de sistema web. A implementação reúne uma interface administrativa, uma API para autenticação e consulta de serviços e um banco PostgreSQL integrado ao Supabase Auth.

## Escopo implementado

O frontend contém:

- formulário visual de login com seleção de perfil;
- validação local demonstrativa;
- painel administrativo estático com indicadores e opções de navegação sem ações associadas.

O backend contém:

- verificação de saúde da API;
- login por e-mail e senha por meio do Supabase Auth;
- consulta do usuário autenticado e de seu perfil;
- listagem e consulta individual de serviços;
- respostas padronizadas para rotas inexistentes e erros internos.

O banco contém:

- perfis de usuários vinculados a `auth.users`;
- papéis `ADMIN` e `FUNCIONARIO`;
- serviços com nome, preço e indicação de atividade;
- políticas de Row Level Security para leitura autenticada.

Não existem no código atual operações de cadastro de funcionários, clientes, pets, produtos, vacinas, atendimentos ou relatórios. Os controles visuais correspondentes no painel não possuem integração ou regras de negócio.

## Autoria e responsabilidades registradas

- Josiel — login e cadastro;
- Isaac — CRUD de pets;
- Leonardo — banco de dados e Supabase;
- João Henrique — dashboard e relatórios;
- Aaron — integrante da equipe, sem responsabilidade técnica especificada na documentação original.
