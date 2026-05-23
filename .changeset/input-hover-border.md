---
"@jarviisha/davinci-tokens": minor
"@jarviisha/davinci-react-ui": minor
---

Refine input hover affordance via a dedicated border-hovered token.

- New semantic token `semantic.color.borderHovered` (light: `color.neutral.700`, dark: `color.neutralDark.700`) sits between `borderBold` and the focused state, giving hover its own intensity step on top of the existing `border` / `borderBold` / `borderDisabled` / `borderFocused` scale.
- New component token `component.input.borderHovered` → `{semantic.color.borderHovered}`, consumed by `Input`, `Select`, `Textarea`, `Combobox`, `SearchInput`, and native date inputs.
- Default input border softened: `component.input.border` now points at `{semantic.color.border}` (`neutral.300`) instead of `{semantic.color.borderBold}` (`neutral.500`). The hover step from `border` → `borderHovered` is now visually distinct (300 → 700) rather than near-invisible (500 → background tint).
- Hover styles on `.davinci-input` / `.davinci-select` / `.davinci-textarea` / `.davinci-search-input` / `.davinci-combobox__input` swap their `background-color` change for a `border-color` change. The combobox input also gains a `transition: border-color 150ms ease` so the new state animates.
