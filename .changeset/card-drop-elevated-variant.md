---
"@jarviisha/davinci-tokens": minor
"@jarviisha/davinci-react-ui": minor
---

Drop the `elevated` Card variant in favor of fully flat page-level surfaces.

After previous releases moved shadow off page-level cards, `elevated` and `surface` became near-duplicates (same `surfaceRaised` background, same `border`, only `shadow` differed). The system now keeps shadow strictly for floating panels and overlays — page-level surfaces use border + background tint only.

**Breaking changes**

- `CardVariant` no longer includes `"elevated"`. Callers using `<Card variant="elevated">` should switch to `<Card variant="surface">`, which renders identically minus the shadow.
- The default Card variant is now `"surface"` (previously `"elevated"`).
- Token block `component.card.elevated.*` is removed from `@jarviisha/davinci-tokens`; the corresponding `--davinci-component-card-elevated-*` CSS variables no longer exist. Components that borrowed them (combobox listbox, dropdown menu, popover) now reference `--davinci-component-card-surface-*` instead — same values, supported name.

**Why**

Aligns Card with Jira / Atlassian / Linear / GitHub conventions: shadow communicates true z-axis lift (overlays), not visual decoration on grouped content. Reduces visual noise on dense product UI and keeps dark-mode rendering predictable.
