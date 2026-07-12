# Linkaa — Engineering Steering Guide

The single source of truth for how we build the Linkaa web application. Read this
before contributing. It defines the architecture, conventions, and standards that
keep the codebase clean, consistent, and scalable.

> **Golden rule:** favor small, reusable, well-named pieces. If you're about to
> hardcode a value or duplicate a component, stop and check this guide first.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Architecture](#2-project-architecture)
3. [Folder Structure](#3-folder-structure)
4. [Import Aliases](#4-import-aliases)
5. [Coding Standards](#5-coding-standards)
6. [Naming Conventions](#6-naming-conventions)
7. [Component Guidelines](#7-component-guidelines)
8. [Reusable Component Rules](#8-reusable-component-rules)
9. [CSS Architecture](#9-css-architecture)
10. [Design Tokens](#10-design-tokens)
11. [Responsive Design](#11-responsive-design)
12. [Accessibility Standards](#12-accessibility-standards)
13. [Performance Optimization](#13-performance-optimization)
14. [Asset Management](#14-asset-management)
15. [State Management](#15-state-management)
16. [Adding a New Page](#16-adding-a-new-page)
17. [Adding a New Component](#17-adding-a-new-component)
18. [Development Workflow](#18-development-workflow)
19. [Git Conventions](#19-git-conventions)
20. [Recommended Libraries](#20-recommended-libraries)

---

## 1. Tech Stack

| Concern            | Choice                          | Why                                       |
| ------------------ | ------------------------------- | ----------------------------------------- |
| Framework          | React 18                        | Component model, ecosystem, concurrency   |
| Build tool         | Vite 5                          | Fast dev server, native ESM, easy config  |
| Routing            | React Router 6                  | Standard client-side routing              |
| Styling            | CSS Modules + CSS Custom Props  | Scoped styles, zero runtime, tokenized    |
| Linting            | ESLint 9 (flat config)          | Consistency and bug prevention            |
| Formatting         | Prettier 3                      | Zero-argument formatting                  |
| Language           | JavaScript (JSX)                | Simplicity; migrate to TS when it pays    |

> **TypeScript:** the structure is TS-ready. When the team is ready, rename
> `.jsx → .tsx`, add `tsconfig.json`, and type props incrementally.

---

## 2. Project Architecture

Linkaa follows a **layered, feature-agnostic architecture** with a strict
dependency direction. Lower layers never import from higher layers.

```
pages          →  compose sections + layouts (route entry points)
  ↓
sections       →  page-level blocks (Hero, Features, PricingSection…)
  ↓
common         →  reusable domain widgets (FeatureCard, PricingCard, Accordion…)
  ↓
ui             →  design-system primitives (Button, Card, Input, Icon…)
  ↓
styles / utils / hooks / services / constants  →  foundation
```

**Rules of the dependency graph:**

- `ui` primitives may import only from `styles`, `utils`, and `hooks`.
- `common` components compose `ui` primitives.
- `sections` compose `common` + `ui` and pull data from `constants`/`services`.
- `pages` compose `sections` and set page metadata.
- `layouts` provide the shell (header/footer) and render routed pages via `<Outlet />`.
- Cross-cutting logic lives in `hooks`, `utils`, `services`, `constants` — never inline.

This keeps each layer independently testable and swappable.

---

## 3. Folder Structure

```
linkaa-react/
├── public/                     # Static, served as-is (favicons)
├── src/
│   ├── assets/                 # Imported assets (logos, images, icons)
│   │   ├── logos/
│   │   └── icons/
│   ├── components/
│   │   ├── ui/                 # Design-system primitives (1 folder per component)
│   │   ├── common/             # Reusable composite/domain components
│   │   └── sections/           # Page sections (Hero, Features, CTA, …)
│   ├── layouts/
│   │   ├── MainLayout/         # App shell (skip link, header, outlet, footer)
│   │   └── components/         # Layout-only parts (Header, Footer)
│   ├── pages/                  # Route entry points (Home, Pricing, …)
│   ├── routes/                 # Route table + lazy loading
│   ├── hooks/                  # Reusable React hooks
│   ├── services/               # API/data access layer
│   ├── utils/                  # Pure helper functions
│   ├── constants/              # Static config, content, routes, nav
│   ├── styles/                 # Global CSS: variables, reset, typography, global
│   ├── App.jsx                 # Root (error boundary + routes)
│   └── main.jsx                # Entry (React root + router provider)
├── eslint.config.js
├── vite.config.js
├── STEERING.md                 # ← you are here
└── package.json
```

**Component folder shape** (every component follows this):

```
Button/
├── Button.jsx            # Component implementation
├── Button.module.css     # Scoped styles (only if the component has styles)
└── index.js              # Re-export: export { default } from './Button';
```

Barrel files (`index.js`) at each layer let consumers import cleanly:

```js
import { Button, Card, Section } from '@components/ui';
import { FeatureCard, PricingCard } from '@components/common';
```

---

## 4. Import Aliases

Configured in `vite.config.js`. Always prefer aliases over deep relative paths
(`../../../`).

| Alias          | Resolves to        |
| -------------- | ------------------ |
| `@`            | `src`              |
| `@components`  | `src/components`   |
| `@pages`       | `src/pages`        |
| `@layouts`     | `src/layouts`      |
| `@assets`      | `src/assets`       |
| `@hooks`       | `src/hooks`        |
| `@services`    | `src/services`     |
| `@utils`       | `src/utils`        |
| `@constants`   | `src/constants`    |
| `@styles`      | `src/styles`       |
| `@routes`      | `src/routes`       |

> When you add a new top-level `src` folder, register its alias in **both**
> `vite.config.js` and (if added later) `jsconfig.json`/`tsconfig.json`.

---

## 5. Coding Standards

- **One component per file.** File name matches the component name.
- **Function components + hooks only.** The single exception is `ErrorBoundary`
  (React requires a class for error boundaries).
- **Named, documented props.** Every component has a JSDoc block describing its
  props and defaults.
- **Sensible defaults.** Give props default values so a component renders with
  minimal configuration.
- **Pure functions in `utils`.** No side effects, no React imports.
- **No dead code.** Remove unused imports, variables, and commented-out blocks.
- **Prefer composition over configuration.** Small components that combine beat
  one component with 15 boolean flags.
- **Early returns** over deep nesting.
- **Destructure props** in the function signature.
- **Keep components under ~150 lines.** If larger, extract sub-components or hooks.
- Run `npm run lint` and `npm run format` before every commit. CI treats lint
  errors as blocking.

### Example component skeleton

```jsx
import { cn } from '@utils/classNames';
import styles from './Widget.module.css';

/**
 * One-line description of what the widget does.
 *
 * @param {object} props
 * @param {'a'|'b'} [props.variant='a']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
function Widget({ variant = 'a', className, children, ...rest }) {
  return (
    <div className={cn(styles.widget, styles[variant], className)} {...rest}>
      {children}
    </div>
  );
}

export default Widget;
```

---

## 6. Naming Conventions

| Thing                    | Convention              | Example                       |
| ------------------------ | ----------------------- | ----------------------------- |
| Component file & folder  | `PascalCase`            | `PricingCard/PricingCard.jsx` |
| Component function       | `PascalCase`            | `function PricingCard()`      |
| Hook file & function     | `camelCase` + `use`     | `useMediaQuery.js`            |
| Util / service file      | `camelCase`             | `classNames.js`               |
| Constant values          | `UPPER_SNAKE_CASE`      | `NAV_LINKS`, `ROUTES`         |
| CSS Module class         | `camelCase`             | `.iconWrap`, `.isActive`      |
| CSS custom property      | `--kebab-case`          | `--color-accent`              |
| Boolean props/vars       | `is/has/should` prefix  | `isOpen`, `hasError`          |
| Event handlers           | `handle` prefix         | `handleSubmit`                |
| Event handler props      | `on` prefix             | `onClose`                     |

- Name by **role**, not appearance: `--color-accent`, not `--color-black-button`.
- Folders that only re-export use `index.js` (never `Index.jsx`).

---

## 7. Component Guidelines

- **Presentational by default.** Components receive data via props; they don't
  fetch. Data fetching happens in pages or hooks, then flows down.
- **Polymorphic where useful.** Use an `as` prop for elements that may change tag
  (`Container`, `Card`, `Section`) and `to`/`href` for link-or-button behavior
  (`Button`).
- **Forward refs** on interactive primitives (`Button`, `Input`) so parents can
  focus/measure them.
- **Spread `...rest`** onto the root element so consumers can pass `aria-*`,
  `data-*`, `id`, and event handlers.
- **Accept `className`** and merge it last with `cn()` so callers can extend styles.
- **Content lives in `constants` or comes from `services`** — never hardcode long
  copy inside a component that's meant to be reused. Section components accept an
  `items`/content prop with a sensible default so they can be reused across pages.

---

## 8. Reusable Component Rules

Before creating a component, decide which layer it belongs to:

- **`ui/`** — generic, brand-agnostic primitive with no business meaning
  (Button, Input, Card, Badge, Spinner, Icon). Reused everywhere.
- **`common/`** — a reusable widget with domain meaning that composes primitives
  (FeatureCard, PricingCard, TestimonialCard, Accordion).
- **`sections/`** — a full-width page block composed of `common` + `ui`
  (Hero, Features, CTA). Configurable via props with defaults.

**Reuse checklist (DRY):**

1. Search `@components/ui` and `@components/common` before writing anything new.
2. If a similar component exists, extend it with a prop instead of copying it.
3. If two components share markup, extract the shared part into a primitive.
4. Never fork a component by copy-paste. Parameterize the original.
5. Keep variant logic inside the component (via a `variant` prop + CSS Module
   classes), not scattered across call sites.

---

## 9. CSS Architecture

We use **CSS Modules + global CSS custom properties**. No CSS-in-JS runtime, no
utility-class soup, no global class collisions.

**Global layer** (`src/styles/`, imported once in `main.jsx` via `global.css`):

| File             | Responsibility                                        |
| ---------------- | ----------------------------------------------------- |
| `variables.css`  | All design tokens (the ONLY place raw values live)    |
| `reset.css`      | Modern CSS reset                                       |
| `typography.css` | Base element typography using tokens                  |
| `global.css`     | Imports the above + selection, focus, sr-only, scroll |

**Component layer** — one `*.module.css` per component. Rules:

- **Never hardcode** colors, spacing, radii, shadows, font sizes, z-index,
  transitions. Always reference a `var(--token)`.
- Class names are `camelCase` and semantic (`.iconWrap`, not `.mt16`).
- Keep selector depth shallow (max ~2 levels). Modules already scope names.
- Compose modifier classes (`styles.featured`) instead of overriding with
  descendant selectors.
- Co-locate the module with its component; import as `styles`.
- Use logical properties (`padding-inline`, `margin-block`) for RTL-friendliness.

**When to add a global style vs a module style:** if it applies to raw HTML
elements everywhere (e.g. `h2`), it's global. If it's specific to a component,
it's a module.

---

## 10. Design Tokens

`src/styles/variables.css` is the design system's contract. Every visual value
flows from it. Token groups:

- **Color primitives** (`--color-grey-500`, `--color-white`) — raw palette, not
  used directly in components.
- **Semantic colors** (`--color-accent`, `--color-text-primary`,
  `--color-bg-subtle`, `--color-border`) — **use these in components.**
- **Typography** — `--font-family-*`, `--font-size-*`, `--font-weight-*`,
  `--line-height-*`, `--letter-spacing-*`.
- **Spacing** — 4px-based scale `--space-0 … --space-32` + section rhythm.
- **Radius** — `--radius-sm … --radius-xl`, `--radius-pill`, `--radius-circle`.
- **Shadows** — `--shadow-xs … --shadow-xl`, `--shadow-focus`.
- **Motion** — `--transition-fast/base/slow`, `--ease-*` (auto-disabled under
  `prefers-reduced-motion`).
- **Z-index** — named scale `--z-header`, `--z-modal`, `--z-toast`, … Never use
  magic z-index numbers.

**Rules:**

- Add new values by extending the scale, not by inventing one-off values in a
  module.
- Reference semantic tokens in components; reference primitives only when
  defining new semantic tokens.
- **Theming / dark mode:** because everything is a semantic token, a dark theme is
  a matter of overriding semantic variables under a `[data-theme='dark']` selector
  — no component changes required.

---

## 11. Responsive Design

- **Mobile-first.** Write base styles for small screens, then enhance with
  `min-width` media queries. Never start desktop-first with `max-width` overrides.
- **Standard breakpoints** (use these consistently):

  | Name    | Min width | Typical use               |
  | ------- | --------- | ------------------------- |
  | `sm`    | 640px     | large phones / grid → 2col|
  | `md`    | 800px     | tablets / layout shifts   |
  | `lg`    | 900px     | desktop nav, 3-col grids  |
  | `xl`    | 1000px    | wide grids                |

- **Fluid over fixed.** Prefer `clamp()`, `min()`, `%`, `fr`, and `ch` units for
  spacing, type, and widths (see `--font-size-4xl`, `--section-padding-y`).
- **Container** primitive handles max-width and responsive gutters — wrap page
  content in `<Container>` rather than setting widths manually.
- Grids use `grid-template-columns: 1fr` at base and add columns at breakpoints.
- Test at 320px, 768px, 1024px, and 1440px before shipping.
- Never disable zoom; keep `viewport` meta as shipped.

---

## 12. Accessibility Standards

Target: **WCAG 2.1 AA**. Baseline requirements for every contribution:

- **Semantic HTML first** — `<button>` for actions, `<a>` for navigation,
  `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, heading hierarchy.
- **One `<h1>` per page**; don't skip heading levels.
- **Keyboard operable** — everything usable without a mouse. Visible focus is
  provided globally via `:focus-visible`; never remove outlines without a
  replacement.
- **Skip link** to `#main-content` is in `MainLayout` — keep it.
- **Labels** — every input has an associated `<label>` (see `Input`). Icon-only
  buttons use `aria-label`.
- **ARIA state** — toggles set `aria-expanded`/`aria-controls` (see `Header`,
  `Accordion`); async status regions use `aria-live` (see `ContactForm`).
- **Decorative icons** are `aria-hidden`; meaningful icons pass a `title` to
  `<Icon>` (renders `role="img"` + `<title>`).
- **Color contrast** ≥ 4.5:1 for text. The black/white/grey palette is
  high-contrast by design; verify greys on light backgrounds.
- **Reduced motion** — respected globally; don't add essential info that only
  appears via animation.
- **Images** require meaningful `alt` (empty `alt=""` for decorative).

> Full WCAG conformance requires manual testing with a keyboard and a screen
> reader (NVDA/VoiceOver) plus expert review — automated checks are necessary but
> not sufficient.

---

## 13. Performance Optimization

- **Route-level code splitting** — every page is `React.lazy`-loaded in
  `routes/AppRoutes.jsx` behind a `<Suspense>` fallback. Keep new pages lazy.
- **Component memoization** — reach for `React.memo`, `useMemo`, `useCallback`
  only when profiling shows a real cost. Don't pre-optimize.
- **Stable keys** — use stable IDs from data, never array indices, for list keys.
- **Assets** — SVGs inline via components (see `Logo`, `Icon`); raster images use
  responsive sizes + `loading="lazy"` + explicit `width`/`height` to avoid layout
  shift.
- **Fonts** — `display=swap`; self-host Inter in production and preload the
  primary weight to cut render-blocking.
- **CSS** — scoped modules ship only what's used per route (Vite splits CSS per
  chunk — visible in the build output).
- **Avoid large deps** — check bundle impact before adding a library
  (`npm run build` prints per-chunk sizes). Prefer tree-shakeable ESM packages.
- **Passive listeners** for scroll/touch (see `useScrollPosition`).
- Measure with Lighthouse and the Vite build report before/after changes.

---

## 14. Asset Management

- **Single source of brand assets.** The Linkaa mark is defined **once** as an
  inline SVG in `components/ui/Logo`. It uses `currentColor`, so it adapts to any
  background (dark header, light footer). **Never** paste the logo SVG anywhere
  else or add a second logo file for a color variant.
- **Icons** live in one registry: `components/ui/Icon/icons.jsx`. Add a new glyph
  there (24×24, `currentColor`) and reference it by name via `<Icon name="…" />`.
- **Favicons** live in `public/` and are referenced from `index.html`.
- **Imported assets** (raster images, downloadable files) go in `src/assets/` and
  are imported so Vite can hash and optimize them:
  ```jsx
  import heroImg from '@assets/images/hero.png';
  ```
- **Do not duplicate assets.** If the same image is used twice, import it twice
  from one file. One asset → one file on disk.
- Keep source SVGs optimized (SVGO) before committing.

---

## 15. State Management

Use the **lightest tool that solves the problem**, escalating only when needed:

1. **Local state** (`useState`/`useReducer`) — default for component-scoped state
   (form values, open/close). See `ContactForm`, `Accordion`.
2. **Custom hooks** — share stateful logic across components (`useDisclosure`,
   `useMediaQuery`, `useScrollPosition`). Extract here before reaching for a store.
3. **URL / router state** — for anything shareable or navigable (filters, tabs,
   pagination) use the route/query params, not component state.
4. **React Context** — for low-frequency global values (theme, auth user, locale).
   Keep contexts small and split by concern to avoid needless re-renders.
5. **Server state** — data from APIs belongs in a data-fetching library
   (**TanStack Query**, recommended below), not hand-rolled `useEffect` fetches,
   once the app grows beyond static content.
6. **Global client store** (**Zustand**) — only if genuinely global, cross-tree
   client state emerges. Avoid until there's clear need.

**Rules:** keep state as local as possible; lift only when shared; never
duplicate server data into client stores; all network calls go through
`services/` regardless of the state tool.

---

## 16. Adding a New Page

1. Create `src/pages/MyPage/MyPage.jsx` (+ `MyPage.module.css` if needed) and an
   `index.js` re-export.
2. Compose existing `sections`; add page-specific sections only if reusable.
3. Set the tab title with `useDocumentTitle('My Page')`.
4. Add the path to `src/constants/routes.js` (`ROUTES.MY_PAGE`).
5. Register a lazy route in `src/routes/AppRoutes.jsx`:
   ```jsx
   const MyPage = lazy(() => import('@pages/MyPage'));
   // …
   <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
   ```
6. If it should appear in navigation, add it to `src/constants/navigation.js`.
7. Verify: `npm run lint` and `npm run build`.

---

## 17. Adding a New Component

1. Pick the layer: `ui` (primitive), `common` (domain widget), or `sections`
   (page block). See [§8](#8-reusable-component-rules).
2. Create the folder: `Component/Component.jsx`, `Component.module.css`,
   `index.js`.
3. Implement with: JSDoc props, default values, `cn()` for classes, `...rest`
   spread, `className` passthrough, tokens-only CSS.
4. Export it from the layer barrel (`components/<layer>/index.js`).
5. Reuse tokens — no hardcoded values.
6. Check accessibility (labels, roles, keyboard) and responsiveness.
7. `npm run lint` must pass.

---

## 18. Development Workflow

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server (HMR)
npm run lint       # ESLint (must be clean before commit)
npm run lint:fix   # auto-fix lint issues
npm run format     # Prettier write
npm run build      # production build to /dist
npm run preview    # preview the production build locally
```

- Work on a **feature branch**, never on `main`.
- Keep PRs small and focused; one concern per PR.
- Before pushing: `lint` clean, `build` passes, manually smoke-test affected
  routes at mobile + desktop widths.
- Update this guide when you introduce a new pattern, alias, or convention.

---

## 19. Git Conventions

**Branches:** `type/short-description`
`feat/pricing-page`, `fix/header-focus-trap`, `chore/upgrade-vite`,
`docs/steering-update`, `refactor/button-variants`.

**Commits:** [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(optional scope): <short summary>

feat(pricing): add annual/monthly toggle
fix(header): trap focus in mobile menu
refactor(ui): extract Field wrapper from Input
docs(steering): add state management section
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.

**Rules:**

- Present tense, imperative mood ("add", not "added").
- One logical change per commit.
- Never commit `.env`, secrets, or `node_modules`.
- Open PRs against `main`; require green lint + build and one review.
- Write a PR description: what changed, why, how it was tested, screenshots for UI.

---

## 20. Recommended Libraries

All below are **free / open-source, actively maintained, production-ready**. Add
them only when a real need appears, and always check bundle impact first.

| Need                | Library                          | Notes                                                            |
| ------------------- | -------------------------------- | ---------------------------------------------------------------- |
| **Animations**      | `framer-motion` (Motion)         | Declarative, accessible, gesture support. Heaviest — lazy-load.  |
|                     | `@formkit/auto-animate`          | Tiny, drop-in list/layout animations when Motion is overkill.    |
| **Icons**           | `lucide-react`                   | Tree-shakeable, matches our stroke style. Swap the local `Icon` registry for it when the glyph count grows. |
| **Sliders/Carousel**| `embla-carousel-react`           | Lightweight, accessible, no styling lock-in.                     |
|                     | `keen-slider`                    | Zero-dependency alternative.                                     |
| **Form validation** | `react-hook-form` + `zod`        | Performant forms + schema validation & type inference.           |
| **HTTP requests**   | `@tanstack/react-query`          | Server-state cache, retries, dedupe. Pair with our `apiClient`.  |
|                     | `axios` or `ky`                  | Ergonomic fetch wrapper if you outgrow the built-in one.         |
| **Notifications**   | `sonner`                         | Beautiful, accessible toasts, tiny footprint.                    |
|                     | `react-hot-toast`                | Popular, simple alternative.                                     |
| **SEO / meta**      | `react-helmet-async`             | Per-route `<title>`/meta/OG tags. Replace `useDocumentTitle`.    |
| **Lazy loading**    | Built-in `React.lazy` + `Suspense` | Already used for routes.                                        |
|                     | `react-intersection-observer`    | Lazy-render/animate sections on scroll into view.                |
| **Image optimization** | `vite-imagetools`             | Build-time responsive images / modern formats (AVIF/WebP).       |
|                     | `@unpic/react`                   | Framework-agnostic responsive `<img>` component.                 |
| **Loading skeletons** | `react-loading-skeleton`       | Token-friendly skeletons; wire colors to our CSS variables.      |
| **Charts** (if needed) | `recharts`                    | Composable React charts, sensible defaults.                      |
|                     | `visx`                           | Low-level D3 primitives for bespoke visualizations.              |
| **Dates** (if needed) | `date-fns`                     | Tree-shakeable, immutable date utilities.                        |
| **Testing**         | `vitest` + `@testing-library/react` | Vite-native unit/component testing.                          |
| **E2E**             | `@playwright/test`               | Reliable cross-browser end-to-end testing.                       |

**Integration principles:**

- Wrap third-party UI in our own component so the rest of the app depends on our
  API, not the vendor's (easy to swap later).
- Feed libraries our design tokens (colors, radii) instead of their defaults so
  the UI stays on-brand.
- Prefer lazy-loading heavy libraries (charts, animation) at the route/section
  level.

---

_Keep this document current. When in doubt, optimize for the next developer._
