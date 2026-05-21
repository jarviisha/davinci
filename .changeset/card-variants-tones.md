---
"@jarviisha/davinci-tokens": minor
"@jarviisha/davinci-react-ui": minor
---

Expand Card with new variants, tones, and modifier props.

- Add three Card variants: `filled` (subtle `surface` background, no shadow), `flat` (no chrome — transparent), `floating` (raised surface plus the stronger `shadow.raised`).
- Add `tone` prop with `neutral` / `info` / `success` / `warning` / `danger`. Tints are computed via `color-mix` on background and border, mirroring the Alert pattern, so they follow light / dark themes automatically.
- Add `interactive` boolean prop for hover, focus ring, and pointer cursor. Composes with any variant; on `elevated` and `floating` it also raises the shadow on hover.
- Add `selected` boolean prop for highlighted state (border `border-focused` plus `color-mix` of `primary` on background). Composes with any variant or tone.
- New component tokens: `component.card.filled.background`, `component.card.filled.shadow`, `component.card.floating.background`, `component.card.floating.border`, `component.card.floating.shadow`.
- Internal refactor (no public API change): inline SVGs in `Checkbox`, `Nav`, `Toast`, and `SearchInput` are now sourced from internal `Check`, `Minus`, `ChevronRight`, `X`, `Search` icon components.
