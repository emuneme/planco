# Planco - Gestão Inteligente de Obras

Sistema completo para gestão de custos, aprovações e solicitações de materiais em obras de construção civil.

## Principais Funcionalidades

- **Dashboard Administrativo**: Visão geral de custos em tempo real.
- **Portal do Usuário (Portal do Encarregado)**: Mobile-first, para solicitações de material no terreno.
- **Gestão Financeira**: Fluxo de caixa e exportação profissional para PDF.
- **Aprovações**: Fluxo de trabalho para validar solicitações de suprimentos.
- **Segurança**: Configurações de perfil, senha e notificações.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles with Tailwind
```

## Environment Variables

Crie um arquivo `.env.local` na raiz (ou configure no Vercel) com estas variáveis do **InsForge**:

```env
NEXT_PUBLIC_INSFORGE_BASE_URL=seu_base_url_do_insforge
NEXT_PUBLIC_INSFORGE_ANON_KEY=seu_anon_key_do_insforge
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
