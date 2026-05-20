# @jarviisha/davinci-tokens

Design tokens for the Davinci design system. Ships CSS variables for theming and a typed JavaScript export of every token.

Part of the [Davinci](https://github.com/jarviisha/davinci) design system.

## Install

```bash
pnpm add @jarviisha/davinci-tokens
# or npm / yarn / bun
```

## Usage

Import the CSS once in your app entry — once for the primitive variables, plus one or both themes.

```css
@import "@jarviisha/davinci-tokens/css/variables.css";
@import "@jarviisha/davinci-tokens/css/light.css";
@import "@jarviisha/davinci-tokens/css/dark.css";
```

- `variables.css` declares every primitive and component token on `:root` — always include it.
- `light.css` targets `:root, .light` so it acts as the default theme.
- `dark.css` targets `.dark` and activates when the `dark` class is on `<html>`.

Toggle the active theme by setting the class on `<html>` (or use [`@jarviisha/davinci-react-theme-provider`](https://www.npmjs.com/package/@jarviisha/davinci-react-theme-provider)).

## JS / TS access

```ts
import { tokens, type TokenName } from "@jarviisha/davinci-tokens/js/tokens";

const primary = tokens["semantic.color.primary"];
// → { type: "color", value: "{color.blue.700}", cssVar: "--davinci-semantic-color-primary" }
```

Useful for design-system docs, codegen, or runtime lookups. Each entry exposes:

- `type` — the original `$type` from the token source (`color`, `dimension`, `fontWeight`, …).
- `value` — the raw value as authored (may contain `{reference}` placeholders).
- `cssVar` — the generated CSS variable name to use at runtime.

## Token layers

Tokens are organized into three layers:

1. **Primitive** — raw palette and scale values (`color.blue.500`, `spacing.200`).
2. **Semantic** — theme-aware roles (`semantic.color.primary`, `semantic.color.foreground`).
3. **Component** — component-level decisions (`component.button.height.md`).

The CSS bundles map cleanly onto these layers — primitive + component go into `variables.css`, semantic into `light.css` / `dark.css`.

## License

MIT
