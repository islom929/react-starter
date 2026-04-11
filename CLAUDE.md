# React Starter

Feature-based React starter template.

## Tech Stack

- React 18 + TypeScript + Vite 5
- React Router v6
- TanStack React Query v5 (server state)
- Zustand (client state)
- Axios (HTTP + interceptors)
- Tailwind CSS 4 + shadcn/ui (new-york style)
- React Hook Form + Zod (form validation)
- i18next (uz, ru, uz_cyr)

## Architecture — Feature-Based

```
src/
├── app/                    # Entry, providers, router, global styles
├── pages/                  # Page composition (no business logic here)
│   └── [name]/
│       ├── index.tsx
│       └── components/     # Page-specific components only
├── features/               # Self-contained business logic modules
│   └── [name]/
│       ├── api/            # API calls
│       ├── components/     # Feature components
│       ├── constants/      # Query keys, enums, static data
│       ├── hooks/          # Feature hooks (useQuery, useMutation)
│       ├── types/          # Feature types
│       └── schemas/        # Zod validation schemas
├── components/             # Shared UI (used in 2+ places)
│   ├── ui/                 # shadcn primitives — DO NOT modify
│   ├── form/               # Form wrappers (FormInput, FormSelect, FormTextarea)
│   └── dialog/             # Global dialog system (Context-based, stack)
├── layouts/                # Layout components
│   └── [name]/
│       ├── index.tsx       # Layout + Outlet
│       ├── header.tsx
│       └── footer.tsx
└── shared/                 # Infrastructure (rarely imported directly)
    ├── lib/                # api.ts, query.ts, i18n.ts, utils.ts
    ├── hooks/              # Shared hooks
    ├── types/              # Shared types (IPagination, ApiError, ILang)
    ├── locales/            # Translation files (uz/, ru/, uz_cyr/)
    └── store/              # Global zustand stores (language.ts)
```

## File Naming & Export Conventions

### All file names use kebab-case

```
use-products.ts       # hook file
products.api.ts       # api file
products.types.ts     # types file
products.schema.ts    # schema file
products.query-key.ts # constants file
product-form.tsx      # component file
```

### Feature file pattern: single file per concern with `[name].[type].ts`

```
features/products/
├── api/
│   ├── products.api.ts          # single file
│   └── index.ts                 # barrel export
├── constants/
│   ├── products.query-key.ts    # single file
│   └── index.ts                 # barrel export
├── hooks/
│   ├── use-products.ts          # 1 hook = 1 file
│   ├── use-create-product.ts
│   ├── use-delete-product.ts
│   └── index.ts                 # barrel export
├── types/
│   ├── products.types.ts
│   └── index.ts                 # barrel export
├── schemas/
│   ├── products.schema.ts
│   └── index.ts                 # barrel export
└── components/
    ├── product-form.tsx          # no index.ts — import directly
    └── product-list.tsx
```

### Barrel export rules

- **Feature subfolders** (api/, hooks/, types/, schemas/, constants/) → have `index.ts` for short imports
- **Feature root** → NO `index.ts` (no feature-level barrel export)
- **Components** → NO `index.ts` — import each component directly by file path

This means imports look like:
```tsx
// Subfolder barrel — short
import { useProducts } from '@/features/products/hooks'
import { PRODUCTS_KEY } from '@/features/products/constants'
import type { Product } from '@/features/products/types'

// Components — direct file import
import { ProductForm } from '@/features/products/components/product-form'
```

### Hook naming

| Pattern | Name | Example |
|---------|------|---------|
| Fetch list | `use[Entity]s` | `useProducts` |
| Fetch single | `use[Entity]` | `useProduct(id)` |
| Create | `useCreate[Entity]` | `useCreateProduct` |
| Update | `useUpdate[Entity]` | `useUpdateProduct` |
| Delete | `useDelete[Entity]` | `useDeleteProduct` |

## Rules

### Component placement
- Used in 1 place → colocate it (`pages/home/components/` or `features/products/components/`)
- Used in 2+ places → lift to `components/`
- Layout-specific (header, footer) → inside `layouts/[name]/`

### Feature rules
- Each feature is self-contained: api, components, constants, hooks, types, schemas
- Features must not import other features directly — use shared layer

### Page rules
- Pages are composition only — import and arrange features
- No business logic in pages — keep it in features

### Route rules
- All route paths defined in `shared/constants/routes.ts` as `ROUTES` object
- Use `ROUTES.*` everywhere: router config, `<Link to>`, `navigate()`
- Never hard-code route paths as strings

```tsx
// shared/constants/routes.ts
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
}

// router.tsx
{ path: ROUTES.PRODUCTS, element: <ProductsPage /> }

// Link
<Link to={ROUTES.PRODUCTS}>

// navigate
navigate(ROUTES.PRODUCTS)
```

### shared/ rules
- Infrastructure code only: lib, hooks, types, locales, store, constants
- Frequently imported items (components) do NOT belong here

### shadcn/ui
- `components/ui/` is generated by shadcn CLI — do not modify
- Add new components: `npx shadcn add [component]`
- Custom wrappers go in `components/form/`

## Dialog System

Context-based stack dialog system. Call `useDialog()` from any component:

```tsx
const { open, close, closeAll } = useDialog()

open(
  <DialogWrapper title="Confirm">
    <p>Content</p>
    <button onClick={close}>Close</button>
  </DialogWrapper>
)
```

- Stack-based: supports dialog-on-top-of-dialog
- Single overlay: background does not darken with each stacked dialog
- Pass TSX directly, `close` is available in the same scope
- ESC key closes the topmost dialog
- Click outside closes the topmost dialog
- `DialogWrapper` provides title, close button, optional icon

## Form Pattern

Form controls eliminate boilerplate:

```tsx
// With wrapper (1 line each):
<FormInput control={form.control} name="email" label="Email" />
<FormSelect control={form.control} name="role" label="Role" options={options} />
<FormTextarea control={form.control} name="bio" label="Bio" />

// Zod schema:
const schema = z.object({ email: z.string().email() })
type FormValues = z.infer<typeof schema>
```

## i18n

3 languages: uz (O'zbekcha), ru (Русский), uz_cyr (Ўзбекча). Default: uz.
- Translations use flat keys: `"common.save": "Saqlash"` (not nested objects)
- Files: `shared/locales/{uz,ru,uz_cyr}/translation.json`
- Switch language: `useLanguageStore()` → `setLang('ru')`
- In components: `const { t } = useTranslation()` → `t('common.save')`

## State Management

- **Server state** → React Query (`useQuery`, `useMutation`)
- **UI state** → Context (dialog)
- **Global app state** → Zustand (language)
- Do not use Zustand when React Query is sufficient

## Path Aliases

`@/*` → `src/*` (configured in tsconfig + vite)

```tsx
import { Button } from '@/components/ui/button'
import { api } from '@/shared/lib/api'
```

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build (tsc + vite)
npm run lint     # ESLint check
npm run format   # Prettier format all files
npm run preview  # Preview production build locally
```

## Adding a New Feature

1. Create `src/features/[name]/` directory
2. Add subdirectories: `api/`, `components/`, `constants/`, `hooks/`, `types/`, `schemas/`
3. Each subfolder gets single files (`[name].[type].ts`) and an `index.ts` barrel export
4. Components do NOT get `index.ts` — import directly by file path
5. Create page at `pages/[name]/`, import from feature subfolders
6. Add route in `app/router.tsx`

## Adding a shadcn Component

```bash
npx shadcn add dialog
npx shadcn add table
```

Component lands in `components/ui/`. Do not edit — write a wrapper instead.

## Code Style

- Single quotes, no semicolons, 2-space indent
- Prettier + ESLint auto-format on commit (husky + lint-staged)
