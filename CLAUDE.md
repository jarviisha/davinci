# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Davinci is a **three-layer design token system** shipped as a pnpm + Turborepo monorepo. Tokens are authored as JSON, compiled to CSS variables and typed JS, and consumed by a Tailwind preset and a token-only React component library. The published packages are scoped `@jarviisha/davinci-*`; `@davinci/*` packages are private (playground, token-builder).

Read **DESIGN.md** before adding components, picking variants, or theming — it defines the visual philosophy (single-canvas, border-led) and the anti-patterns the codebase is built to avoid. **USAGE.md** covers consumer integration.

## Commands

Run from the repo root unless noted. Turbo handles `^build` dependency ordering across packages.

```bash
pnpm install
pnpm tokens:build      # compile JSON tokens -> packages/tokens/dist (REQUIRED before dev/build)
pnpm dev               # Vite playground (@davinci/playground)
pnpm dev:wiki          # Vite docs site (@davinci/wiki)
pnpm build             # build all packages + apps via Turbo
pnpm lint              # tsc --noEmit across the workspace via Turbo
pnpm test              # vitest run across the workspace via Turbo
pnpm clean             # clean dist + remove root node_modules
```

`tokens:build` is the bootstrap step: most packages import `@jarviisha/davinci-tokens/dist`, so a fresh checkout needs it before `dev`/`build`/`lint` will succeed.

### Tests

Only `token-builder` and `react-theme-provider` have tests (vitest). There is no test runner for `react-ui` — components are verified via the playground/wiki.

```bash
pnpm --filter @davinci/token-builder test            # run package tests
pnpm --filter @davinci/token-builder test:watch
pnpm --filter @davinci/token-builder exec vitest run path/to.test.ts   # single file
pnpm --filter @davinci/token-builder exec vitest run -t "name"         # single test by name
```

### Per-package work

Target one package with `--filter`, e.g. `pnpm --filter @jarviisha/davinci-react-ui build`. Each package's `lint` is `tsc --noEmit`.

## Architecture

### Token pipeline (the core)

`packages/tokens/src/**.json` → `packages/token-builder/src/build.ts` → `packages/tokens/dist/{css,js}`.

Source JSON follows the **DTCG** shape (`$type` + `$value`, references as `{color.blue.700}`). Three layers, referenced top-down (see DESIGN.md for the rules on which layer app code may use):

- `primitive/` — raw values (color, spacing, radius, typography). Never referenced by app code.
- `semantic/` — theme-aware roles, split into `shared.json` (mode-independent), `light.json`, `dark.json`. This is the stable, rebrandable API.
- `component/` — per-component decisions (`component.button.height.md`, etc.), one JSON file per component. Only `react-ui` references these.

`build.ts` (a single standalone `tsx` script, no framework) does: deep-merge each layer's files → flatten to `--davinci-<kebab-path>` CSS var names → resolve `{ref}` to `var(--davinci-ref)` → emit. It **validates** before writing and throws on: missing `$type`/`$value`, references to nonexistent tokens, and duplicate var names / JS keys. Outputs:

- `dist/css/variables.css` — primitive + semantic-shared + component tokens, under `:root`
- `dist/css/light.css` — light semantic tokens, under `:root, .light`
- `dist/css/dark.css` — dark semantic tokens, under `.dark`
- `dist/js/tokens.{js,d.ts}` — `tokens`, `lightTokens`, `darkTokens` objects (`{ type, value, cssVar }`) + `TokenName`/`SemanticTokenName` types

To add/change a token, edit the JSON source and re-run `pnpm tokens:build`. Do not hand-edit `dist`.

### Package dependency graph

```
tokens (dist) ──┬─> tailwind-preset      (maps css vars -> Tailwind utilities)
                ├─> react-ui             (components styled by css vars only)
                └─> react-theme-provider (toggles .light/.dark class + radius vars)
apps/{playground,wiki} consume all four.
```

`token-builder` builds `tokens`; `tokens`' own `build` script just delegates to it.

### react-ui conventions

Token-only components — **no Tailwind dependency**. Each component:

- Lives in one flat file under `packages/react-ui/src/<name>.tsx`; all styling is in `src/styles.css` keyed by `.davinci-<component>` BEM-ish classes (`--variant`, `--tone`, `--size` modifiers). Components map props → class names via lookup records (see `card.tsx`).
- References only **semantic** and **component** CSS vars, never primitives, never hardcoded color/shadow/radius.
- Exposes the shared prop vocab: `variant`, `tone`, `size`. Tone/variant union types carry **JSDoc explaining intent** — that documentation is the spec (IDE tooltips + AI assistants read it). Match the existing vocab in `card.tsx`/`button.tsx`/`badge.tsx`.
- `styles.css` declares `@layer theme, base, davinci.components, components, utilities;` and wraps component rules in `@layer davinci.components` so consumers can override without specificity wars.
- Public API is re-exported from `src/index.ts`; the build copies `src/styles.css` to `dist/styles.css`.

### Build mechanics

- Library packages (`react-ui`, `react-theme-provider`, `tailwind-preset`) build with plain `tsc -p tsconfig.json`; the two with CSS copy it via an inline `node -e copyFileSync` step. No bundler.
- Apps build with `tsc -b && vite build` (Tailwind v4 via `@tailwindcss/vite`).

## Releasing

Versioning via **Changesets** (`baseBranch: main`, public access). `@davinci/playground` and `@davinci/token-builder` are ignored (never published). Add a changeset with `pnpm changeset`; CI (`.github/workflows/`) handles version PRs and npm publish via `pnpm release`. Full first-time setup is in RELEASING.md (written in Vietnamese).

## Conventions

- TypeScript strict everywhere (`tsconfig.base.json`); ESM only (`"type": "module"`), Node ≥20, `.js` extension on relative imports (NodeNext-style).
- Node ≥20, pnpm ≥10.11.0 (`packageManager` pin).
- Some design discussion in git history / PRs is in Vietnamese; DESIGN.md is the English source of truth.
