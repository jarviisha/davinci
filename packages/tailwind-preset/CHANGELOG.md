# @jarviisha/davinci-tailwind-preset

## 0.4.0

### Minor Changes

- 91288c9: Unify tone color between Button and Badge, and split each tone into a fill token and a text token.

  Every tone (`primary`, `danger`, `success`, `warning`, `info`, `discovery`) now resolves to the same 700-step fill in **both** light and dark, and every tone fill carries white text — a blue Badge and a solid blue Button are now the same blue with the same label color in every mode. Previously dark mode flipped tone fills to a light 400-step with near-black text, so the two components disagreed across modes and Badge tones read as neon in dark.

  New `<tone>Text` semantic tokens (800 in light, 300 in dark) carry the tone wherever it is drawn on the canvas instead of behind white text: outline/ghost/soft Button labels, Alert/Toast icons and tints, tone Card tints, invalid input borders, the active tab underline, the active nav item. This also fixes the dark-mode contrast failures those spots had, where the fill-tuned tone was used as a text color (soft primary at rest was 3.25:1, ghost tone buttons dropped to ~2.6:1 while pressed). The full ladder now clears 4.5:1 in both modes.

  Also in this change:

  - Tone fill hover/pressed steps are 800/850 in both modes (previously light went to 900, dark went lighter).
  - `warning` moves from `orange.400` + near-black text to `orange.700` + white text so it follows the same rule as the other tones.
  - `focus.ringColor` points at `border-focused` instead of `primary`, so the ring keeps its own brightness now that `primary` is a fill color.
  - Badge `primary` uses the tone fill instead of `background-selected`, which also stops primary badges from disappearing inside a selected table row.
  - The Tailwind preset exposes the new tokens as `*-text` color utilities.

  Consumers who used `semantic.color.<tone>` as a text or icon color should switch to `semantic.color.<tone>Text`.

## 0.3.0

### Minor Changes

- Re-anchor the default theme around a **single-canvas, border-led** philosophy: the whole app reads as one color, borders do all the layering work, and a card has a background **only** when its content is intentionally emphasized.

  ## Surface tokens collapsed onto one canvas

  | Token                   | Light                       | Dark                        | Role                                                                                                                         |
  | ----------------------- | --------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
  | `background`            | `#FFFFFF`                   | `#18191A`                   | The canvas. Everything defaults here.                                                                                        |
  | `surface`               | `#FFFFFF` _(was `#F8F8F8`)_ | `#18191A` _(was `#242528`)_ | Alias of `background`. Kept as a stable API; themes can break the alias to reintroduce elevation tiers.                      |
  | `surfaceRaised`         | `#FFFFFF`                   | `#303134`                   | Reserved for true float overlays (popover, dropdown, dialog). Lifts via shadow in light, via lighter color + shadow in dark. |
  | `surfaceSunken` _(new)_ | `#F0F1F2`                   | `#111213` _(was `#1F1F21`)_ | Structural inset wells (code blocks, comparison panes, zebra rows) — one step darker than canvas in both modes.              |

  ## Borders — light mode switched to alpha

  | Token          | Before                          | After                                 |
  | -------------- | ------------------------------- | ------------------------------------- |
  | `borderSubtle` | `color.neutral.200` (`#F0F1F2`) | `color.neutralAlpha.200` (~6% black)  |
  | `border`       | `color.neutral.300` (`#DDDEE1`) | `color.neutralAlpha.300` (~14% black) |

  `borderSubtle` no longer collides with `backgroundSubtle` (both were `#F0F1F2`), so subtle borders stay visible over any surface — including `tone-*` card backgrounds. Mirrors the alpha approach already in dark. `borderBold`, `borderBoldest`, and `borderHovered` stay solid — they're emphasis tokens, not structural.

  ## Card emphasis ladder

  `card.default.background` now maps to `semantic.color.background` (was `surfaceRaised`). On the single canvas this makes the default card **transparent-equivalent** — only the border separates it from surroundings. Emphasis is opt-in:

  | Variant                                  | Background                                         | When to use                                                                 |
  | ---------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------- |
  | `card--default`                          | canvas                                             | Default container. Border-only separation.                                  |
  | `card--filled`                           | `backgroundSubtle`                                 | Mild emphasis (sub-panels, neutral callouts).                               |
  | `card--tone-info/success/warning/danger` | `info/success/warning/danger` mixed 8% into canvas | Status **is the message** (blocked, succeeded, attention) — not decoration. |
  | `card--selected`                         | `primary` mixed 8% into canvas                     | Selected item in a list/grid.                                               |
  | `card--floating`                         | `surfaceRaised` + raised shadow                    | True float overlays (popover, menu).                                        |

  `.davinci-card--interactive:hover` bumps `border-color` to `borderBold` instead of shifting background — gives a crisper "lift" signal without a muddy bg flash competing with the canvas.

  ## AppShell — single canvas

  All AppShell regions (sidebar, top-bar, header, main, aside) now share `background`. Separation comes from `border` lines between grid areas, not from color tiers.

  ## Floating overlays use `card-floating` tokens

  Combobox listbox, dropdown menu content, and Popover were coupled to `card.default` background/border tokens. With `card.default` now mapping to canvas, those overlays would have lost all color separation in dark mode (only a weak shadow on dark bg). Switched them to `card.floating` tokens so they always elevate:

  - Light: same canvas color + overlay shadow (shadow does the lift).
  - Dark: lighter `surfaceRaised` (`#303134`) + overlay shadow (visibly raised).

  ## Tailwind preset

  New utility: `bg-surface-sunken` / `ring-offset-surface-sunken`.

  ## Migration notes

  - Consumers who relied on `bg-surface` being visually distinct from `bg-background` will see them render identically in defaults. To bring tiered surfaces back in a custom theme, override `--davinci-semantic-color-surface` after importing the base CSS.
  - Cards rendered with `<Card variant="default">` over a tinted parent no longer get an implicit white inset; if you needed that visual, switch to `<Card variant="filled">` or `<Card variant="floating">`.

## 0.2.0

### Minor Changes

- f70fab5: Token naming consistency refactor: align vocabulary, fix layer responsibilities, and tokenize values that were previously hardcoded in CSS.

  ### Breaking renames

  **`destructive` → `danger`** (unifies the red role across the system; previously split between `destructive`, `danger`, and `error`)

  - Semantic tokens: `semantic.color.destructive*` → `semantic.color.danger*` (`danger`, `dangerHovered`, `dangerPressed`, `dangerForeground`)
  - Component tokens: every reference in `button.json`, `badge.json`, `input.json`, `radio.json`, `checkbox.json`, `formField.json`, `card.json`, `toast.json` now points at `{semantic.color.danger*}`
  - Component variant blocks: `component.badge.destructive` → `component.badge.danger`; `component.toast.error` → `component.toast.danger`
  - React props: `<Badge variant="destructive">` → `<Badge variant="danger">`; `toast.error(...)` → `toast.danger(...)`
  - CSS classes: `.davinci-badge--destructive` → `.davinci-badge--danger`; `.davinci-toast--error` → `.davinci-toast--danger`
  - Tailwind utilities: `bg-destructive`, `text-destructive`, `border-destructive`, `destructive-hovered`, `destructive-pressed`, `destructive-foreground` → `bg-danger`, `text-danger`, `border-danger`, `danger-hovered`, `danger-pressed`, `danger-foreground`

  **Card variant `surface` → `default`** (the literal `"surface"` was never released — see the migration in `card-drop-elevated-variant`)

  - React prop: `<Card variant="surface">` → `<Card variant="default">` (also the new default value when `variant` is omitted)
  - CSS class: `.davinci-card--surface` → `.davinci-card--default`
  - Tokens & CSS vars: `component.card.surface.*` → `component.card.default.*`; `--davinci-component-card-surface-*` → `--davinci-component-card-default-*` (also affects internal callers — `dropdown-menu`, `popover`, `combobox` listbox)
  - Reason: avoids collision with the semantic `color.surface` role.

  **Focus tokens move from primitive to semantic** (primitive should not reference semantic — previously `primitive/focus.json` reached into `{semantic.color.primary}`)

  - Source file `primitive/focus.json` removed; new `semantic/shared.json` hosts `semantic.focus.ringColor`, `ringWidth`, `ringOffset`, `ringStyle`.
  - CSS vars: `--davinci-focus-ring-color` → `--davinci-semantic-focus-ring-color` (same for `-width`, `-offset`, `-style`).

  **Radius semantic aliases move from primitive to semantic**

  - `primitive/radius.json` no longer exports `control`, `card`, `panel`, `pill` — these were semantic decisions in disguise.
  - New definitions live in `semantic/shared.json` as `semantic.radius.control/card/panel/pill`.
  - CSS vars: `--davinci-radius-control` → `--davinci-semantic-radius-control` (same for `-card`, `-panel`, `-pill`).
  - Tailwind utilities unchanged (`rounded-control`, `rounded-card`, `rounded-panel`, `rounded-pill` still work — the preset re-wires them).

  **Spacing aliases removed**

  - The numeric shortcuts `spacing.1/2/3/4/6/8` (which pointed at `050/100/150/200/300/400`) are gone. Use the explicit numeric scale instead: `--davinci-spacing-050`, `--davinci-spacing-100`, …

  **Shadow primitive removed**

  - `primitive/shadow.json` no longer exists. The light/dark shadow values are now defined inline in `semantic/light.json` and `semantic/dark.json` under `semantic.shadow.*`.
  - No CSS var rename — `--davinci-semantic-shadow-card/raised/overlay/none` are unchanged.

  ### Additive changes

  - **`component.appShell.*`** tokens replace hardcoded layout magic numbers (top-bar height, sidebar width range, header height, aside width range, slot paddings, gaps).
  - **`component.detailLayout.*`** tokens for the two-column page layout (gap, aside width range, sticky offset).
  - **`component.card.toneInfo/toneSuccess/toneWarning/toneDanger`** — Card tone backgrounds and borders are now first-class tokens (previously hardcoded `color-mix()` calls in CSS).
  - **`component.card.selected.*`** — Card selected-state background and border similarly tokenized.

  ### Fixes

  - `component.dialog.zIndex` and `component.toast.zIndex` now declare `$value` as a JSON number (matching `$type: "number"`) instead of a string.

  ### Token-builder

  The build pipeline gains a new `semantic/shared.json` bucket for theme-independent semantic tokens. Existing consumers don't need to change anything; the new file is auto-emitted into `variables.css` under `:root`.

  ### Migration

  Find-replace covers most callers. The minimal migration:

  ```
  destructive       → danger
  toast.error(      → toast.danger(
  variant="error"   → variant="danger"      (in <Toast> calls)
  variant="surface" → variant="default"     (in <Card> calls)
  --davinci-focus-ring-          → --davinci-semantic-focus-ring-
  --davinci-radius-control       → --davinci-semantic-radius-control
  --davinci-radius-card          → --davinci-semantic-radius-card
  --davinci-radius-panel         → --davinci-semantic-radius-panel
  --davinci-radius-pill          → --davinci-semantic-radius-pill
  --davinci-component-card-surface- → --davinci-component-card-default-
  --davinci-spacing-1            → --davinci-spacing-050        (and so on)
  ```

- b99c5d2: Overhaul color-token naming across the three layers (primitive, semantic, component). Breaking — no aliases kept.

  **Semantic renames (Tier 1):**

  | Old                     | New                       |
  | ----------------------- | ------------------------- |
  | `textSubtle`            | `foregroundSubtle`        |
  | `textMuted`             | `foregroundSubtlest`      |
  | `textInverse`           | `foregroundInverse`       |
  | `textDisabled`          | `foregroundDisabled`      |
  | `muted`                 | `backgroundSubtle`        |
  | `mutedHovered`          | `backgroundSubtleHovered` |
  | `mutedPressed`          | `backgroundSubtlePressed` |
  | `information`           | `info`                    |
  | `informationForeground` | `infoForeground`          |
  | `borderStrong`          | `borderBoldest`           |

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
