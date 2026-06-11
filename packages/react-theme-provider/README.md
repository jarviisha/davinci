# @jarviisha/davinci-react-theme-provider

A small, SSR-safe React theme provider for the Davinci design system. Supports `light`, `dark`, and `system` themes, persists the choice in `localStorage`, and ships a tiny inline script to avoid theme flash on reload.

Part of the [Davinci](https://github.com/jarviisha/davinci) design system. See [DESIGN.md](https://github.com/jarviisha/davinci/blob/main/DESIGN.md) for the theming model these providers sit on top of.

## Install

```bash
pnpm add @jarviisha/davinci-react-theme-provider
```

Peer dependencies: `react ^18.3.1 || ^19.0.0`, `react-dom ^18.3.1 || ^19.0.0`.

## Usage

Wrap your app once:

```tsx
import { ThemeProvider, useTheme } from "@jarviisha/davinci-react-theme-provider";

export function Root() {
  return (
    <ThemeProvider defaultTheme="system">
      <App />
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      Theme: {theme} (active: {resolvedTheme})
    </button>
  );
}
```

`ThemeProvider` adds the `light` or `dark` class to `<html>` based on the active theme.

## API

### `<ThemeProvider>`

| Prop           | Type                              | Default          | Description                                       |
| -------------- | --------------------------------- | ---------------- | ------------------------------------------------- |
| `defaultTheme` | `"light" \| "dark" \| "system"`   | `"system"`       | Theme used when nothing is stored.                |
| `storageKey`   | `string`                          | `"davinci-theme"` | `localStorage` key for persistence.              |

### `useTheme()`

```ts
const { theme, resolvedTheme, setTheme } = useTheme();
```

- `theme` — the user's preference (`light`, `dark`, or `system`).
- `resolvedTheme` — the concrete theme currently applied (`light` or `dark`).
- `setTheme(next)` — update the preference; persists to `localStorage`.

### Avoid theme flash

`ThemeProvider` applies the theme class on mount, which causes a brief flash for dark-mode users. Inject a tiny synchronous script in `<head>` so the class lands before first paint.

**Next.js, Remix, Astro** — render `ThemeScript` inside `<head>`:

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

**Plain HTML (Vite, CRA)** — inline the output of `getThemeScript()`:

```ts
import { getThemeScript } from "@jarviisha/davinci-react-theme-provider";
console.log(getThemeScript({ defaultTheme: "system" }));
// Paste the printed string into your index.html <head>.
```

Pass the same `defaultTheme` and `storageKey` to `ThemeScript` (or `getThemeScript`) and `ThemeProvider` so they agree.

## Radius customization

`useRadiusPreset` adjusts the Davinci radius scale at runtime. It accepts a named preset (`minimum`, `subtle`, `default`, `bold`) **or** a raw `{ sm, md, lg, xl }` scale in pixels, writes the `--davinci-radius-*` (and derived `--davinci-semantic-radius-*`) custom properties on `<html>`, and persists the choice to `localStorage`.

```tsx
import { useRadiusPreset, matchPreset } from "@jarviisha/davinci-react-theme-provider";

function RadiusControls() {
  const [radius, setRadius] = useRadiusPreset();
  const active = matchPreset(radius); // preset key, or null when custom

  return (
    <>
      <button onClick={() => setRadius("bold")}>Bold</button>
      {/* free-form: bump just one step */}
      <button onClick={() => setRadius({ sm: 6, md: 10, lg: 14, xl: 20 })}>Custom</button>
      <span>{active ?? "Custom"}</span>
    </>
  );
}
```

| Export                  | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| `useRadiusPreset(opts)` | Hook returning `[value, setValue]`. Options: `storageKey`, `defaultValue`.  |
| `radiusPresets`         | The named preset → scale map.                                               |
| `resolveScale(value)`   | Resolve a preset key or scale to concrete `{ sm, md, lg, xl }` pixels.      |
| `matchPreset(value)`    | The preset a value matches exactly, or `null` when it is custom.            |
| `RADIUS_PRESET_LABELS`  | Human-readable labels for each preset.                                       |
| `getRadiusScript(opts)` / `RadiusScript` | Flash-prevention script, same pattern as `getThemeScript` / `ThemeScript`. |

The default `storageKey` is `"davinci-radius"`.

## License

MIT
