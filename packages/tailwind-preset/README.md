# @jarviisha/davinci-tailwind-preset

Tailwind CSS v4 preset that maps Davinci design tokens to Tailwind utility classes (`bg-primary`, `text-foreground`, `rounded-card`, `gap-200`, etc.).

Part of the [Davinci](https://github.com/jarviisha/davinci) design system.

## Install

```bash
pnpm add @jarviisha/davinci-tailwind-preset @jarviisha/davinci-tokens
pnpm add -D tailwindcss
```

## Usage

Pick one of the two integration paths below — both produce the same utility classes.

### Option A — CSS-first (recommended for Tailwind v4)

No `tailwind.config.ts` required. Import everything in your stylesheet:

```css
@import "@jarviisha/davinci-tokens/css/variables.css";
@import "@jarviisha/davinci-tokens/css/light.css";
@import "@jarviisha/davinci-tokens/css/dark.css";
@import "tailwindcss";
@import "@jarviisha/davinci-tailwind-preset/theme.css";
```

`theme.css` uses Tailwind v4's `@theme inline` directive to expose every Davinci token as a Tailwind theme variable, so utilities like `bg-primary`, `text-foreground`, `rounded-card`, and `gap-200` work out of the box.

### Option B — JS preset (config-based)

If you already maintain a `tailwind.config.ts`, register the preset there instead:

```ts
// tailwind.config.ts
import preset from "@jarviisha/davinci-tailwind-preset";
import type { Config } from "tailwindcss";

export default {
  presets: [preset],
  content: ["./index.html", "./src/**/*.{ts,tsx}"]
} satisfies Config;
```

```css
@import "@jarviisha/davinci-tokens/css/variables.css";
@import "@jarviisha/davinci-tokens/css/light.css";
@import "@jarviisha/davinci-tokens/css/dark.css";
@import "tailwindcss";
```

> Pick **one** path — don't mix CSS `theme.css` and the JS preset, they expose the same token surface.

## What it adds

The preset extends Tailwind's theme with token-backed utilities:

- **Colors** — `background`, `surface`, `foreground` (with `foreground-subtle`/`foreground-subtlest`), `primary`, border roles (`border-subtle`, `border`, `border-bold`, `border-boldest`), status colors (`success`, `warning`, `danger`, `info`, `discovery`), `link` (+ hovered/pressed), `overlay`, and the usual `*-hovered` / `*-pressed` / `*-selected` / `*-foreground` variants.
- **Spacing** — Davinci spacing scale (`gap-100`, `p-200`, `px-300`, … up to `1000`).
- **Radius** — `rounded-card`, `rounded-control`, `rounded-pill`, plus standard `sm`/`md`/`lg`/`xl`/`full`.
- **Typography** — `text-body`, `text-heading-md`, `font-sans`, `font-semibold`, `tracking-wide`, `leading-400`.
- **Shadows** — `shadow-card`, `shadow-raised`, `shadow-overlay`.
- **Focus ring** — `ring-focus`, `ring-offset-background` for token-driven focus styles.

## Example

```tsx
<button className="rounded-control bg-primary px-200 py-100 text-primary-foreground hover:bg-primary-hovered">
  Save
</button>
```

## Theming

Toggle dark mode by adding the `dark` class to `<html>` (or pair this preset with [`@jarviisha/davinci-react-theme-provider`](https://www.npmjs.com/package/@jarviisha/davinci-react-theme-provider)). All semantic utilities flip automatically because they resolve to CSS variables.

## License

MIT
