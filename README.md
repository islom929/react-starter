# React Starter

Feature-based React starter template with production-ready tooling.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Core | React + TypeScript | 18.3 |
| Build | Vite | 5.4 |
| Routing | React Router DOM | 6.30 |
| Server State | TanStack React Query | 5.97 |
| Client State | Zustand | 5.0 |
| HTTP Client | Axios | 1.15 |
| Styling | Tailwind CSS | 4.2 |
| UI Components | shadcn/ui (Radix UI) | latest |
| Forms | React Hook Form + Zod | 7.72 / 3.25 |
| i18n | i18next + react-i18next | 26.0 / 17.0 |
| Linting | ESLint + Prettier | 9.13 / 3.8 |
| Git Hooks | Husky + lint-staged | 9.1 / 15.5 |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:5173
```

## Architecture

Feature-based architecture — code is organized by business domain, not by technical type.

```
src/
├── app/              # Entry point, providers, router, global styles
├── pages/            # Page composition (imports features, no business logic)
├── features/         # Self-contained business modules
├── components/       # Shared UI components
│   ├── ui/           # shadcn/ui primitives
│   ├── form/         # Form control wrappers
│   └── dialog/       # Global dialog system
├── layouts/          # Page layouts (header, footer, outlet)
└── shared/           # Infrastructure (api, i18n, hooks, types, store)
```

See [CLAUDE.md](./CLAUDE.md) for detailed architecture rules and conventions.

## Key Features

- **Feature-based structure** — each feature is self-contained with api, components, hooks, types, schemas
- **Dialog system** — stack-based, single overlay, inline TSX support
- **Form controls** — `<FormInput>`, `<FormSelect>`, `<FormTextarea>` eliminate boilerplate
- **i18n** — 3 languages (uz, ru, uz_cyr) with Zustand-backed language switching
- **Axios interceptors** — automatic token injection, 401 redirect
- **Code quality** — ESLint + Prettier auto-format on every commit

## License

MIT
