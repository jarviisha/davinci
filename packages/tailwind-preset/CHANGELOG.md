# @jarviisha/davinci-tailwind-preset

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
