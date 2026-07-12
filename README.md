# Linkaa

Enterprise-grade React web application for **Linkaa** — a platform to connect,
automate, and scale business relationships. Built with a clean, component-based,
scalable architecture and a fully tokenized design system.

Brand palette: **White** (primary) · **Black** (accent) · **Grey** (secondary).

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server (HMR)      |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview the production build         |
| `npm run lint`    | Run ESLint                           |
| `npm run lint:fix`| Auto-fix lint issues                 |
| `npm run format`  | Format with Prettier                 |

## Tech stack

React 18 · Vite 5 · React Router 6 · CSS Modules + CSS custom properties ·
ESLint 9 · Prettier 3.

## Architecture at a glance

```
pages → sections → common → ui → (styles · hooks · services · utils · constants)
```

- `components/ui` — design-system primitives (Button, Card, Input, Icon, Logo…)
- `components/common` — reusable domain widgets (FeatureCard, PricingCard…)
- `components/sections` — full-width page blocks (Hero, Features, CTA…)
- `pages` — route entry points; `layouts` — the app shell; `routes` — lazy route table.

All design decisions live in `src/styles/variables.css`. **Never hardcode**
colors, spacing, radii, shadows, or type — reference a token.

## Documentation

See **[STEERING.md](./STEERING.md)** for the full engineering guide: architecture,
coding standards, CSS/token rules, accessibility, performance, state management,
workflows, git conventions, and recommended libraries.

## Brand assets

The Linkaa logo is defined once as an inline SVG (`components/ui/Logo`) using
`currentColor`, so a single source adapts to light and dark backgrounds. Favicons
live in `public/`. Do not duplicate brand assets — see STEERING.md § Asset Management.
