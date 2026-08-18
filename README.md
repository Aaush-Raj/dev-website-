# eLurny Website

Marketing site for eLurny. Statically rendered, no backend.

## Stack

| Layer      | Choice                        | Why |
| ---------- | ----------------------------- | --- |
| Framework  | Next.js 16 (App Router)       | Static rendering, first-class SEO metadata, image optimization |
| Language   | TypeScript (strict)           | Catches errors at build, not in production |
| Styling    | Tailwind CSS v4               | CSS-native config; tokens are real custom properties |
| Animation  | Motion                        | Scroll reveals, respects reduced-motion |
| Formatting | Prettier + `prettier-plugin-tailwindcss` | Deterministic class ordering |

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

| Command                | Does |
| ---------------------- | --- |
| `npm run dev`          | Dev server at http://localhost:3000 |
| `npm run build`        | Production build |
| `npm start`            | Serve the production build |
| `npm run check`        | Typecheck + lint + format check — **run before pushing** |
| `npm run format`       | Auto-format |

## Project structure

```
src/
├── app/                  Routes, layout, sitemap.ts, robots.ts
├── components/
│   ├── ui/               Primitives: Button, Card, Section, Heading, Text…
│   ├── sections/         Page sections: Hero, Features, Pricing…
│   ├── layout/           Header, Footer, MobileMenu, Logo
│   └── seo/              JsonLd
├── content/              Copy and nav as typed data, separate from markup
├── lib/                  site config, SEO helpers, structured data, cn()
├── styles/
│   ├── globals.css       Tailwind import, @theme bridge, base styles
│   └── tokens/           colors, typography, spacing, effects
└── types/
public/
├── llms.txt              LLM site map (llmstxt.org)
├── llms-full.txt         Full site text for LLM ingestion
└── assets/               images, icons
```

## Conventions

These are what keep the codebase maintainable as it grows. Worth following.

### 1. Colours come from tokens, never hex

All colour lives in [`src/styles/tokens/colors.css`](src/styles/tokens/colors.css)
in two layers:

- **Primitives** (`--brand-600`, `--neutral-100`) — the raw palette. Never
  referenced from a component.
- **Semantic tokens** (`--color-text-primary`, `--color-surface-raised`) —
  named for their role. These are what components use.

```tsx
<div className="bg-surface-raised text-text-primary" />   // ✅
<div className="bg-white text-slate-900" />               // ❌
```

Rebranding = editing the primitives in that one file. Nothing else changes.
Dark mode already works because only the semantic layer is remapped under
`.dark`.

### 2. Sections use `<Section>`, content uses `<Container>`

`<Section>` owns vertical rhythm and background; `<Container>` owns max-width
and gutters. Don't hand-roll `py-24 px-6 max-w-7xl mx-auto` — the point is that
spacing stays consistent when sections are reordered.

### 3. Heading level ≠ heading size

`<Heading as="h2" size="4xl">` — pick `as` from the document outline (one h1,
no skipped levels) and `size` from the design. Conflating them breaks either
SEO or the layout.

### 4. Copy lives in `src/content`, not in JSX

Section components read typed objects from `src/content/*.ts`. Copy edits never
touch component code, and swapping in a CMS later is a data-source change.

### 5. Server Components by default

Only add `"use client"` when the component needs state, effects or browser
APIs — currently just `Header`, `MobileMenu`, `Reveal` and `error.tsx`. Keep
client components as leaves so the rest of the tree ships zero JavaScript.

## SEO

Already wired up:

- Per-page metadata via `buildMetadata()` in [`src/lib/seo.ts`](src/lib/seo.ts) —
  canonical, Open Graph, Twitter card, robots directives
- JSON-LD (Organization, WebSite, SoftwareApplication) in the root layout;
  helpers for Breadcrumb and FAQ in
  [`src/lib/structured-data.ts`](src/lib/structured-data.ts)
- Auto-generated `sitemap.xml` and `robots.txt`
- `llms.txt` / `llms-full.txt` for LLM discoverability
- Semantic landmarks, skip link, visible focus rings, reduced-motion support

Adding a page:

1. Create the route under `src/app`
2. Export `metadata` from `buildMetadata({ title, description, path })`
3. Add the path to the `routes` array in [`src/app/sitemap.ts`](src/app/sitemap.ts)

## Before launch

- [ ] Replace placeholder colours in `tokens/colors.css` with the brand palette
- [ ] Replace Inter/Sora in `app/layout.tsx` with the brand typefaces
- [ ] Write the real `description` and `tagline` in `lib/site.ts`
- [ ] Add `public/assets/images/og-default.png` (1200×630)
- [ ] Add the real logo and favicon
- [ ] Fill in `llms.txt` and `llms-full.txt`
- [ ] Set `NEXT_PUBLIC_SITE_URL` in the deployment environment
- [ ] Confirm the social handles in `lib/site.ts`
