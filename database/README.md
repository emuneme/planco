# Database Setup for Planco

Este projeto usa Supabase para conexão com o banco de dados.

## Tabelas necessárias

- `projects`
- `approvals`

## Como aplicar

### 1. Use o editor SQL do Supabase

1. Abra o dashboard do seu projeto Supabase.
2. Vá para o editor SQL.
3. Cole o conteúdo de `database/schema.sql` e execute.

### 2. Se estiver usando PostgreSQL local

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

## Variáveis de ambiente

Já configurado em `env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu_projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
```

> O app atual usa apenas as tabelas `projects` e `approvals`.
> Se você quiser autenticação completa, ajuste as políticas no dashboard do Supabase.
