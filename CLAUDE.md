# React Starter

Feature-based React starter template.

## Tech Stack

- React 18 + TypeScript + Vite 5
- React Router v6
- TanStack React Query v5 (server state)
- Zustand (client state)
- Axios + qs (HTTP + interceptors + param serialization)
- Sonner (toast notifications)
- Tailwind CSS 4 + shadcn/ui (new-york style)
- React Hook Form + Zod (form validation)
- i18next (uz, ru, uz_cyr)

## Architecture — Feature-Based

```
src/
├── app/                    # Entry, providers, router, global styles
├── assets/                 # All static resources — images, icons, fonts
│   ├── images/             # Photos, backgrounds, illustrations
│   ├── icons/              # Custom SVGs (UI icons come from lucide-react)
│   └── fonts/              # Font files (if self-hosted)
├── pages/                  # Page composition (no business logic here)
│   └── [name]/
│       ├── [name]-page.tsx # The page component (e.g. home-page.tsx)
│       ├── index.ts        # barrel: export * from './[name]-page'
│       └── components/     # Page-specific components only
├── features/               # Self-contained business logic modules
│   └── [name]/
│       ├── api/            # API calls
│       ├── components/     # Feature components
│       ├── constants/      # Query keys, enums, static data
│       ├── hooks/          # Feature hooks (useQuery, useMutation)
│       ├── types/          # Feature types
│       └── schemas/        # Zod validation schemas (factories)
├── components/             # Shared UI (used in 2+ places)
│   ├── ui/                 # shadcn primitives — DO NOT modify
│   ├── form/               # Form wrappers (FormInput, FormSelect, FormTextarea)
│   └── dialog/             # Global dialog system (Context-based, stack)
├── layouts/                # Layout components
│   └── [name]/
│       ├── [name].tsx      # The layout component (e.g. main-layout.tsx)
│       ├── index.ts        # barrel: export * from './[name]'
│       ├── header.tsx
│       └── footer.tsx
└── shared/                 # Infrastructure (rarely imported directly)
    ├── api/                # HTTP + data-fetching layer
    │   ├── client.ts       # axios instance + interceptors
    │   ├── query-client.ts # React Query client + global onError
    │   ├── error.ts        # getErrorMessage, getStatus
    │   ├── auth-token.ts   # getToken, setToken, clearToken
    │   └── index.ts        # barrel export
    ├── constants/          # App-wide constants (routes, storage keys, event names)
    ├── hooks/              # Shared hooks (useAuth, etc.)
    ├── lib/                # Misc utilities (i18n setup, cn helper)
    ├── locales/            # Translation files (uz/, ru/, uz_cyr/)
    ├── store/              # Global zustand stores (language.ts)
    └── types/              # Shared types (IPagination, ApiError, ILang)
```

## File Naming & Export Conventions

### All file names use kebab-case with a type suffix

| Type | Pattern | Example |
|------|---------|---------|
| Hook | `use-[name].ts` | `use-products.ts` |
| API functions | `[name].api.ts` | `products.api.ts` |
| Types | `[name].types.ts` | `products.types.ts` |
| Zod schema | `[name].schema.ts` | `products.schema.ts` |
| Query keys | `[name].query-key.ts` | `products.query-key.ts` |
| **App-wide constants** | **`[name].constants.ts`** | **`routes.constants.ts`, `base.constants.ts`** |
| Component | `[name].tsx` | `product-form.tsx` |
| Page | `[name]-page.tsx` | `home-page.tsx` |
| Layout | `[name].tsx` | `main-layout.tsx` |

Files under `shared/constants/` MUST use the `.constants.ts` suffix. `base.constants.ts` holds foundational constants like `TOKEN_KEY`, `AUTH_EVENT`. `routes.constants.ts` holds the `ROUTES` object. Never create `constants/auth.ts` or `constants/routes.ts` without the suffix.

### Never name a component/page/layout file `index.tsx`

`index.tsx` makes editor tabs and search results ambiguous (five `index.tsx` open at once — which is which?). Use descriptive filenames and keep `index.ts` as a tiny barrel:

```
pages/home/
├── home-page.tsx        # the component
├── index.ts             # export * from './home-page'
└── components/
```

```
layouts/main-layout/
├── main-layout.tsx      # the component
├── index.ts             # export * from './main-layout'
├── header.tsx
└── footer.tsx
```

Imports still resolve through the folder: `import { HomePage } from '@/pages/home'` works because `index.ts` re-exports.

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
- **Always use `export *`** in barrel files — never named re-exports. Single line per source file. This way adding a new export to a source file doesn't require updating the barrel, and renaming stays in one place.

```ts
// GOOD — features/products/hooks/index.ts
export * from './use-products'
export * from './use-create-product'
export * from './use-delete-product'

// BAD — fragile, has to be updated every time you add an export
export { useProducts } from './use-products'
export { useCreateProduct } from './use-create-product'
```

This means imports look like:
```tsx
// Subfolder barrel — short
import { useProducts } from '@/features/products/hooks'
import { productsKeys } from '@/features/products/constants'
import type { IProduct } from '@/features/products/types'

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

### Query keys use a factory (never hardcode strings)

Each feature's `[feature].query-key.ts` exports a single `[feature]Keys` factory. The root string is a file-private `BASE` const — don't export it, use `productsKeys.base` everywhere.

```ts
// features/products/constants/products.query-key.ts
const BASE = 'products'

export const productsKeys = {
  base: [BASE] as const,
  list: [BASE, 'list'] as const,
  detail: (id: string) => [BASE, 'detail', id] as const,
}
```

```ts
// Hook — plain list:
useQuery({ queryKey: productsKeys.list, queryFn: getProducts })

// Hook — list with filters (write them inline):
useQuery({
  queryKey: [...productsKeys.list, { category: 'books' }],
  queryFn: () => getProducts({ category: 'books' }),
})

// Hook — detail:
useQuery({ queryKey: productsKeys.detail(id), queryFn: () => getProduct(id) })

// Mutation — invalidate everything for this feature (inside OR outside):
queryClient.invalidateQueries({ queryKey: productsKeys.base })
```

**Three keys on the factory:**
- `base` — root prefix, invalidates ALL queries for this feature
- `list` — static prefix for list queries; filters get appended inline at the call site
- `detail(id)` — specific item query

**Why `BASE` is file-private:** `productsKeys.base` already gives `['products']` — anyone who needs the root can read it from the factory. Exporting the bare string adds nothing and forces a choice of descriptive name everywhere. Keep it private; add an export later only if a real use case appears (e.g. `predicate` callbacks that compare `query.queryKey[0]` against a bare string).

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
- All route paths defined in `shared/constants/routes.constants.ts` as `ROUTES` object
- Use `ROUTES.*` everywhere: router config, `<Link to>`, `navigate()`
- Never hard-code route paths as strings

```tsx
// shared/constants/routes.constants.ts
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
- Infrastructure code only: api, constants, hooks, lib, locales, store, types
- Frequently imported items (components) do NOT belong here
- `shared/api/` — all data-fetching infra (axios client, query client, error helpers, auth token). Import from barrel: `import { api, queryClient, getToken } from '@/shared/api'`
- `shared/constants/` — anything reusable: route paths, storage keys (`TOKEN_KEY`), event names (`AUTH_EVENT`), enums shared across features. Do NOT hard-code these in multiple places

### Asset placement
- All static resources go in `src/assets/` — images, icons, fonts
- Subfolders by type: `assets/images/`, `assets/icons/`, `assets/fonts/`
- Import in TSX: `import bg from '@/assets/images/auth-bg.jpg'` — Vite hashes and optimizes
- Prefer `<img src={bg} alt="" />` over `style={{ backgroundImage }}` — better a11y, lazy loading, preload
- Do NOT put assets inside `features/` or `pages/` — keep them in `src/assets/` for one source of truth
- UI icons come from `lucide-react` — only put custom brand/illustration SVGs in `assets/icons/`
- `public/` is reserved for: `favicon.ico`, `robots.txt`, `manifest.json`, social-share OG images (anything referenced by stable URL from HTML)

### shadcn/ui
- `components/ui/` is generated by shadcn CLI — do not modify
- Add new components: `npx shadcn add [component]`
- Custom wrappers go in `components/form/`

## Auth & Token Handling

Token lives in `localStorage` via three helpers (no Zustand store for the token itself):

```ts
// shared/api/auth-token.ts
export function getToken(): string | null
export function setToken(token: string): void   // dispatches auth:change
export function clearToken(): void              // dispatches auth:change
```

- Axios interceptor reads via `getToken()` on every request — always fresh, handles refresh/cross-tab
- 401 responses are handled globally in `query-client.ts` → clearToken() → UI reacts
- For UI reactivity use `useAuth()` hook from `@/shared/hooks/use-auth` — it listens to `storage` event (cross-tab) and `auth:change` event (same-tab)
- `TOKEN_KEY` and `AUTH_EVENT` live in `shared/constants/base.constants.ts`

## Error Handling

Global `MutationCache` + `QueryCache` `onError` handlers in `shared/api/query-client.ts` handle ALL errors:
- 401 → clearToken() → ProtectedRoute redirects
- Others → `toast.error(getErrorMessage(error))` with i18n fallbacks

Hooks don't need `onError` — only `onSuccess` for specific actions (navigate, invalidate). Opt out of global toast via `meta: { skipErrorToast: true }`:

```ts
useMutation({
  mutationFn: submit,
  meta: { skipErrorToast: true },
  onError: (error) => form.setError('root', { message: getErrorMessage(error) }),
})
```

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
```

### Zod schemas are factories (for i18n validation messages)

Never hardcode validation messages. Schemas are functions that take `t`:

```ts
// features/products/schemas/products.schema.ts
import type { TFunction } from 'i18next'

export const createProductSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('products.v.nameRequired')),
    price: z.number().min(0, t('products.v.priceMin')),
  })

export type TProductFormValues = z.infer<ReturnType<typeof createProductSchema>>
```

```tsx
// Component — memoize schema so it stays stable between renders:
const { t } = useTranslation()
const schema = useMemo(() => createProductSchema(t), [t])
const form = useForm({ resolver: zodResolver(schema), ... })
```

When the user switches language, `t` reference changes → schema rebuilds with new messages.

## i18n

3 languages: uz (O'zbekcha), ru (Русский), uz_cyr (Ўзбекча). Default: uz.
- Translations use flat keys: `"common.save": "Saqlash"` (not nested objects)
- Files: `shared/locales/{uz,ru,uz_cyr}/translation.json`
- Switch language: `useLanguageStore()` → `setLang('ru')`
- In components: `const { t } = useTranslation()` → `t('common.save')`
- **Outside components** (utilities, error helpers): `import i18n from '@/shared/lib/i18n'` → `i18n.t('error.unexpected')`
- **NEVER hardcode user-facing strings** — toast messages, placeholders, button labels, validation errors, fallback texts all must live in translation JSON. Key pattern: `[feature].[group].[name]` (e.g. `auth.v.emailInvalid`, `products.cat.books`, `error.timeout`)

## State Management

- **Server state** → React Query (`useQuery`, `useMutation`)
- **UI state** → Context (dialog)
- **Global app state** → Zustand (language)
- **Auth token** → `localStorage` via `getToken/setToken/clearToken` helpers (not Zustand — token doesn't need to be a reactive store)
- Do not use Zustand when React Query or localStorage is sufficient

## Path Aliases

`@/*` → `src/*` (configured in tsconfig + vite)

```tsx
import { Button } from '@/components/ui/button'
import { api, queryClient, getToken } from '@/shared/api'
import { ROUTES, TOKEN_KEY } from '@/shared/constants'
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
5. Create page at `pages/[name]/[name]-page.tsx` with `index.ts` barrel
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
