---
inclusion: always
---

# Livantaa — Engineering Steering Guide

The single source of truth for how we build the Livantaa web application.
**Always follow this guide** when writing, modifying, or reviewing code for this project.
It defines the architecture, conventions, and standards that keep the codebase clean,
consistent, and scalable.

> **Golden rule:** favour small, reusable, well-named pieces. If you are about to
> hardcode a value or duplicate a component, stop and check this guide first.

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

---

## 2. Project Architecture

Layered, feature-agnostic. Lower layers never import from higher layers.

```
pages → sections → common → ui → (styles · hooks · services · utils · constants)
```

- `ui` primitives import only from `styles`, `utils`, `hooks`.
- `common` composes `ui` primitives.
- `sections` compose `common` + `ui`, pull data from `constants`/`services`.
- `pages` compose `sections`, set metadata.
- `layouts` provide the shell (Header/Footer) and render pages via `<Outlet />`.
- Cross-cutting logic lives in `hooks`, `utils`, `services`, `constants`.

---

## 3. Folder Structure

```
livantaa-react/
├── public/                     # Static (favicons)
├── src/
│   ├── assets/logos/           # Brand SVGs & PNGs (imported, not duplicated)
│   ├── components/
│   │   ├── ui/                 # Design-system primitives (Button, Card, Icon…)
│   │   ├── common/             # Reusable domain widgets (FeatureCard, Accordion…)
│   │   └── sections/           # Page blocks (Hero, Features, CTA…)
│   ├── layouts/                # MainLayout + Header + Footer
│   ├── pages/                  # Route entry points
│   ├── routes/                 # Lazy route table
│   ├── hooks/                  # Reusable React hooks
│   ├── services/               # API/data access layer
│   ├── utils/                  # Pure helpers
│   ├── constants/              # Static config, content, routes, nav
│   ├── styles/                 # variables.css, reset.css, typography.css, global.css
│   ├── App.jsx
│   └── main.jsx
├── .kiro/steering/             # This file (auto-loaded by Kiro)
├── eslint.config.js
├── vite.config.js
└── package.json
```

**Component folder shape:**
```
ComponentName/
├── ComponentName.jsx
├── ComponentName.module.css
└── index.js
```

---

## 4. Import Aliases

Always use aliases. Never `../../../`.

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

---

## 5. Coding Standards

- One component per file. Function components + hooks only (except ErrorBoundary).
- Every component has a JSDoc block describing props.
- Props have sensible defaults.
- Pure functions in `utils` — no side effects, no React imports.
- No dead code; remove unused imports.
- Prefer composition over configuration.
- Early returns over deep nesting.
- Destructure props in the signature.
- Keep components under ~150 lines.
- Run `npm run lint` and `npm run format` before committing.

---

## 6. Naming Conventions

| Thing                    | Convention              | Example                       |
| ------------------------ | ----------------------- | ----------------------------- |
| Component file/folder    | `PascalCase`            | `PricingCard/PricingCard.jsx` |
| Hook file/function       | `camelCase` + `use`     | `useMediaQuery.js`            |
| Util/service file        | `camelCase`             | `classNames.js`               |
| Constants                | `UPPER_SNAKE_CASE`      | `NAV_LINKS`, `ROUTES`         |
| CSS Module class         | `camelCase`             | `.iconWrap`                   |
| CSS custom property      | `--kebab-case`          | `--color-accent`              |
| Boolean props            | `is/has/should` prefix  | `isOpen`, `hasError`          |
| Event handlers           | `handle` prefix         | `handleSubmit`                |
| Event handler props      | `on` prefix             | `onClose`                     |

---

## 7. Component Guidelines

- Presentational by default — data flows down via props.
- Polymorphic `as` prop for tag-flexible containers.
- `forwardRef` on interactive primitives (Button, Input).
- Spread `...rest` on root element for aria/data attrs.
- Accept `className` and merge last with `cn()`.
- Content lives in `constants` or comes from `services` — not hardcoded in reusable components.

---

## 8. Reusable Component Rules

Layers:
- **`ui/`** — brand-agnostic primitives. Reused everywhere.
- **`common/`** — domain widgets composing `ui` (FeatureCard, PricingCard).
- **`sections/`** — full-width page blocks, configurable via props with defaults.

DRY checklist:
1. Search existing components before creating new ones.
2. Extend with a prop, do not copy.
3. Extract shared markup into a primitive.
4. Never fork by copy-paste.
5. Variant logic stays inside the component via a `variant` prop.

---

## 9. CSS Architecture

**CSS Modules + global custom properties.** No CSS-in-JS runtime.

Global layer (`src/styles/`, imported in `main.jsx`):
- `variables.css` — ALL design tokens (only place raw values live)
- `reset.css` — modern reset
- `typography.css` — base element styles using tokens
- `global.css` — imports above + selection, focus, sr-only, scrollbar

Component layer rules:
- **NEVER hardcode** colours, spacing, radii, shadows, font sizes, z-index, transitions.
- Always reference `var(--token)`.
- `camelCase` class names, shallow selectors (max 2 levels).
- Co-locate module with component; import as `styles`.
- Use logical properties for RTL readiness.

---

## 10. Design Tokens & Colour Palette

All tokens live in `src/styles/variables.css`.

**IMPORTANT — Strict monochrome palette:** The entire website uses ONLY black, white,
and grey. No other colours are permitted anywhere in the UI. This applies to:
- Buttons, links, and interactive elements
- Section backgrounds and card surfaces
- Text, borders, shadows, and decorative elements
- Hover states, focus rings, and feedback indicators
- Gradients, scrims, and glass effects

Token groups:
- Colour primitives → Semantic colours (always use semantic tokens in components)
- Typography (font-family, size, weight, line-height, letter-spacing)
- Spacing (4px scale: `--space-0` → `--space-32` + section rhythm)
- Radius (`--radius-sm` → `--radius-circle`)
- Shadows (`--shadow-xs` → `--shadow-xl`, `--shadow-focus`)
- Motion (`--transition-fast/base/slow`, `--ease-*`, prefers-reduced-motion respected)
- Z-index (named scale, never magic numbers)

Rules:
- Extend the scale; do not invent one-off values.
- Components use semantic tokens; primitives only when defining new semantic ones.
- **Never introduce any colour outside the black/white/grey palette.**

---

## 11. Responsive Design

- **Mobile-first.** Base styles for small screens, `min-width` breakpoints to enhance.
- Breakpoints: 640px (sm), 800px (md), 900px (lg), 1000px (xl).
- Prefer `clamp()`, `min()`, `%`, `fr`, `ch` over fixed sizes.
- Always wrap content in `<Container>`.
- Test at 320px, 768px, 1024px, 1440px.

---

## 12. Accessibility (WCAG 2.1 AA)

- Semantic HTML first. Heading hierarchy, no skipped levels.
- Keyboard operable. `:focus-visible` globally; never remove outlines.
- Skip link to `#main-content`.
- Every input has a `<label>`. Icon-only buttons use `aria-label`.
- ARIA state on toggles (`aria-expanded`, `aria-controls`).
- Decorative icons: `aria-hidden`. Meaningful icons: `title` prop.
- Colour contrast ≥ 4.5:1.
- Reduced motion respected globally.

---

## 13. Performance

- Route-level code splitting with `React.lazy` + `<Suspense>`.
- Memo only when profiling shows cost.
- Stable keys (IDs, not indices).
- SVGs inline via components; raster images: `loading="lazy"` + dimensions.
- Fonts: `display=swap`, self-host in production.
- Check bundle size via `npm run build` before adding deps.

---

## 14. Asset Management

- Logo defined ONCE in `components/ui/Logo` using `currentColor`. Never duplicate.
- Icons in one registry: `components/ui/Icon/icons.jsx`. Add glyphs there.
- Favicons in `public/`.
- Raster assets in `src/assets/`, imported so Vite hashes them.
- One asset = one file on disk. Never duplicate.

---

## 15. State Management

Escalate only as needed:
1. `useState`/`useReducer` — component-scoped (default)
2. Custom hooks — shared logic
3. URL/router state — shareable/navigable values
4. React Context — low-frequency globals (theme, auth)
5. TanStack Query — server/API state
6. Zustand — global client state (only if truly needed)

All network calls go through `services/`.

---

## 16. Content & Regional Context

- Business is based in **Rajkot, Gujarat, India**.
- All content must be written in standard, professional English.
- Contact information, addresses, phone numbers use Indian formats.
- Currency references use INR (₹) when applicable.
- Timber references use species available in India (teak, sheesham, mango wood).
- All copy lives in `src/constants/content.js` and `src/constants/site.js` — never
  hardcoded in reusable components.

---

## 17. Adding a New Page

1. Create `src/pages/PageName/PageName.jsx` + `index.js`
2. Compose existing sections
3. Set title: `useDocumentTitle('Page Name')`
4. Add path to `src/constants/routes.js`
5. Register lazy route in `src/routes/AppRoutes.jsx`
6. Add to nav in `src/constants/navigation.js` if needed
7. Verify: `npm run lint` + `npm run build`

---

## 18. Adding a New Component

1. Pick layer: `ui`, `common`, or `sections`
2. Create folder: `Name/Name.jsx`, `Name.module.css`, `index.js`
3. JSDoc props, defaults, `cn()`, `...rest`, `className`, tokens-only CSS
4. Export from layer barrel (`index.js`)
5. Check accessibility + responsiveness
6. `npm run lint` must pass

---

## 19. Development Workflow

```bash
npm install        # install deps
npm run dev        # Vite dev server
npm run lint       # must be clean before commit
npm run build      # production build
npm run preview    # preview prod build
```

---

## 20. Git Conventions

- Branches: `type/short-description` (feat/, fix/, chore/, docs/, refactor/)
- Commits: Conventional Commits format
- Present tense, imperative mood
- One logical change per commit
- Never commit `.env`, secrets, `node_modules`

---

## 21. Recommended Libraries

Only add when needed. Check bundle impact first.

| Need                 | Library                              |
| -------------------- | ------------------------------------ |
| Animations           | `framer-motion`, `@formkit/auto-animate` |
| Icons                | `lucide-react`                       |
| Sliders              | `embla-carousel-react`               |
| Forms                | `react-hook-form` + `zod`            |
| Server state         | `@tanstack/react-query`              |
| HTTP                 | `ky` or `axios`                      |
| Notifications        | `sonner`                             |
| SEO                  | `react-helmet-async`                 |
| Intersection observe | `react-intersection-observer`        |
| Image optimization   | `vite-imagetools`                    |
| Skeletons            | `react-loading-skeleton`             |
| Charts               | `recharts`                           |
| Testing              | `vitest` + `@testing-library/react`  |
| E2E                  | `@playwright/test`                   |

Wrap third-party UI in our own component. Feed our tokens. Lazy-load heavy libs.

---

## Key References

- Design tokens: `#[[file:src/styles/variables.css]]`
- Route definitions: `#[[file:src/constants/routes.js]]`
- Navigation config: `#[[file:src/constants/navigation.js]]`
- Content/copy: `#[[file:src/constants/content.js]]`
- Site metadata: `#[[file:src/constants/site.js]]`
- UI barrel: `#[[file:src/components/ui/index.js]]`
- Common barrel: `#[[file:src/components/common/index.js]]`
- Sections barrel: `#[[file:src/components/sections/index.js]]`

---

_Always follow this guide. When in doubt, optimise for the next developer._
