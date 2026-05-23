---
"@jarviisha/davinci-tokens": major
"@jarviisha/davinci-react-ui": major
"@jarviisha/davinci-tailwind-preset": major
---

Overhaul color-token naming across the three layers (primitive, semantic, component). Breaking — no aliases kept.

**Semantic renames (Tier 1):**

| Old | New |
|---|---|
| `textSubtle` | `foregroundSubtle` |
| `textMuted` | `foregroundSubtlest` |
| `textInverse` | `foregroundInverse` |
| `textDisabled` | `foregroundDisabled` |
| `muted` | `backgroundSubtle` |
| `mutedHovered` | `backgroundSubtleHovered` |
| `mutedPressed` | `backgroundSubtlePressed` |
| `information` | `info` |
| `informationForeground` | `infoForeground` |
| `borderStrong` | `borderBoldest` |

**New semantic tokens (Tier 2):**

- `borderSubtle` — softer than `border`, for low-contrast dividers.
- `borderSelected` — selected-row outline, distinct from `borderFocused`.
- `foregroundSelected` — selected-row text color.
- `linkHovered`, `linkPressed` — link state coverage to match `primary*`.
- `overlay` — modal/sheet scrim, now drives `component.dialog.backdrop.background`.

**Primitive rename (Tier 3):**

- `color.darkNeutral.*` → `color.neutralDark.*`
- `color.darkNeutralAlpha.*` → `color.neutralDarkAlpha.*`
- CSS var prefix `--davinci-color-dark-neutral-*` → `--davinci-color-neutral-dark-*`

**Tailwind preset (`@jarviisha/davinci-tailwind-preset`):**

- Utility-class renames mirror the semantic changes: `text-text-subtle` → `text-foreground-subtle`, `bg-muted` → `bg-background-subtle`, `bg-information` → `bg-info`, `border-strong` → `border-boldest`, etc.
- New utilities: `border-subtle`, `border-selected`, `foreground-selected`, `link-hovered`, `link-pressed`, `overlay`.

**Migration:** find-replace the old keys/CSS vars/Tailwind classes with the new ones — the value tables are unchanged, so visual output stays identical for consumers who only used the rebrandable tokens (i.e., not the now-renamed `borderStrong`/`darkNeutral.*` primitives directly).
