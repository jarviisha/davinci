# Design Token System

Monorepo scaffold for a three-layer design token system:

1. `primitive`: raw values such as color, spacing, radius, typography.
2. `semantic`: theme-aware roles such as background, foreground, primary, border.
3. `component`: component-level decisions such as button height, padding, radius.

## Stack

- pnpm workspace
- Turborepo
- TypeScript strict
- Tailwind CSS v4
- Custom token build pipeline
- React + Vite playground

## Structure

```txt
apps/
  playground/
packages/
  tokens/
  token-builder/
  tailwind-preset/
  react-theme-provider/
  react-ui/
```

## Install

```bash
pnpm install
```

## Build Tokens

```bash
pnpm tokens:build
```

This reads JSON token sources from `packages/tokens/src` and writes:

- `packages/tokens/dist/css/variables.css`
- `packages/tokens/dist/css/light.css`
- `packages/tokens/dist/css/dark.css`
- `packages/tokens/dist/js/tokens.js`
- `packages/tokens/dist/js/tokens.d.ts`

## Run Playground

```bash
pnpm tokens:build
pnpm dev
```

The playground imports generated token CSS, uses the Tailwind preset, and toggles theme through `@jarviisha/davinci-react-theme-provider`.

## Add A New Token

Add source JSON under the correct layer in `packages/tokens/src`.

Example primitive token:

```json
{
  "spacing": {
    "10": {
      "$type": "dimension",
      "$value": "2.5rem"
    }
  }
}
```

Then rebuild:

```bash
pnpm tokens:build
```

For semantic tokens, use references to primitive tokens:

```json
{
  "semantic": {
    "color": {
      "surface": {
        "$type": "color",
        "$value": "{color.neutral.0}"
      }
    }
  }
}
```

## Use The Tailwind Preset In Another React App

Install or link these workspace packages:

- `@jarviisha/davinci-tokens`
- `@jarviisha/davinci-tailwind-preset`
- `@jarviisha/davinci-react-theme-provider`

Import generated CSS once in your app stylesheet:

```css
@import "@jarviisha/davinci-tokens/css/variables.css";
@import "@jarviisha/davinci-tokens/css/light.css";
@import "@jarviisha/davinci-tokens/css/dark.css";
@import "tailwindcss";
```

Use the preset in `tailwind.config.ts`:

```ts
import preset from "@jarviisha/davinci-tailwind-preset";
import type { Config } from "tailwindcss";

export default {
  presets: [preset],
  content: ["./index.html", "./src/**/*.{ts,tsx}"]
} satisfies Config;
```

Wrap the app with `ThemeProvider`:

```tsx
import { ThemeProvider } from "@jarviisha/davinci-react-theme-provider";

export function Root() {
  return <ThemeProvider defaultTheme="system">{/* app */}</ThemeProvider>;
}
```

### Avoid theme flash on reload

`ThemeProvider` applies the theme class after React mounts, which causes a brief flash for users on dark mode. Inject a tiny synchronous script in `<head>` so the class lands before first paint.

Plain HTML (Vite, CRA) — inline the output of `getThemeScript()` in `index.html`:

```html
<head>
  <script>
    /* paste the string returned by getThemeScript() here */
  </script>
</head>
```

Next.js, Remix, Astro — render `ThemeScript` inside `<head>`:

```tsx
import { ThemeScript } from "@jarviisha/davinci-react-theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ThemeScript defaultTheme="system" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Pass the same `defaultTheme` and `storageKey` to both `ThemeScript` and `ThemeProvider` so they agree.

Then use token-backed Tailwind classes:

```tsx
<div className="bg-background text-foreground">
  <button className="rounded-md bg-primary text-primary-foreground">Save</button>
</div>
```

## Use React UI Without Tailwind

`@jarviisha/davinci-react-ui` ships its own CSS and only depends on Davinci CSS variables. Import tokens and UI styles once:

```tsx
import "@jarviisha/davinci-tokens/css/variables.css";
import "@jarviisha/davinci-tokens/css/light.css";
import "@jarviisha/davinci-tokens/css/dark.css";
import "@jarviisha/davinci-react-ui/styles.css";
```

Then use components directly:

```tsx
import { Button } from "@jarviisha/davinci-react-ui";

export function Example() {
  return <Button variant="primary">Save</Button>;
}
```

## Scripts

- `pnpm dev`: run the Vite playground.
- `pnpm build`: build all packages and apps through Turbo.
- `pnpm lint`: run TypeScript checks through Turbo.
- `pnpm tokens:build`: build token outputs.
- `pnpm clean`: clean package outputs and root dependencies.

## Roadmap

- Wrap `react-ui` styles in `@layer davinci.components` so consumers can override without specificity wars.
- Ship an aggregated `tokens/css/index.css` so consumers can import one file instead of three.
- Add form primitives: `Label`, `FormField`, `FormHelpText`, and `aria-invalid` styling for `Input` / `Select` / `Textarea`.
- Add `loading` state and `leftSlot` / `rightSlot` to `Button`.
- Composite components (`Dialog`, `DropdownMenu`, `Tooltip`, `Toast`) built on Radix Primitives.
- Storybook plus visual regression (Chromatic or Playwright snapshots).
- Evaluate migrating the custom token builder to Style Dictionary when the token graph outgrows the current pipeline.
