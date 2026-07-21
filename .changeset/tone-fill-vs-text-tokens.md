---
"@jarviisha/davinci-tokens": minor
"@jarviisha/davinci-react-ui": minor
"@jarviisha/davinci-tailwind-preset": minor
---

Unify tone color between Button and Badge, and split each tone into a fill token and a text token.

Every tone (`primary`, `danger`, `success`, `warning`, `info`, `discovery`) now resolves to the same 700-step fill in **both** light and dark, and every tone fill carries white text — a blue Badge and a solid blue Button are now the same blue with the same label color in every mode. Previously dark mode flipped tone fills to a light 400-step with near-black text, so the two components disagreed across modes and Badge tones read as neon in dark.

New `<tone>Text` semantic tokens (800 in light, 300 in dark) carry the tone wherever it is drawn on the canvas instead of behind white text: outline/ghost/soft Button labels, Alert/Toast icons and tints, tone Card tints, invalid input borders, the active tab underline, the active nav item. This also fixes the dark-mode contrast failures those spots had, where the fill-tuned tone was used as a text color (soft primary at rest was 3.25:1, ghost tone buttons dropped to ~2.6:1 while pressed). The full ladder now clears 4.5:1 in both modes.

Also in this change:

- Tone fill hover/pressed steps are 800/850 in both modes (previously light went to 900, dark went lighter).
- `warning` moves from `orange.400` + near-black text to `orange.700` + white text so it follows the same rule as the other tones.
- `focus.ringColor` points at `border-focused` instead of `primary`, so the ring keeps its own brightness now that `primary` is a fill color.
- Badge `primary` uses the tone fill instead of `background-selected`, which also stops primary badges from disappearing inside a selected table row.
- The Tailwind preset exposes the new tokens as `*-text` color utilities.

Consumers who used `semantic.color.<tone>` as a text or icon color should switch to `semantic.color.<tone>Text`.
