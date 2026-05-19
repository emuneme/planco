# Database Setup for Planco

Este projeto usa InsForge/Supabase para conexão com o banco de dados.

## Tabelas necessárias

- `projects`
- `approvals`

## Como aplicar

### 1. Use o editor SQL do Supabase/InsForge

1. Abra o dashboard do seu projeto InsForge/Supabase.
2. Vá para o editor SQL.
3. Cole o conteúdo de `database/schema.sql` e execute.

### 2. Se estiver usando PostgreSQL local

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

## Variáveis de ambiente

Já configurado em `env.example`:

```env
NEXT_PUBLIC_INSFORGE_BASE_URL=https://seu_projeto.insforge.dev
NEXT_PUBLIC_INSFORGE_ANON_KEY=sb_publishable_xxx
```

> O app atual usa apenas as tabelas `projects` e `approvals`.
> Se você quiser autenticação completa, ajuste as políticas no dashboard do Supabase/InsForge.
