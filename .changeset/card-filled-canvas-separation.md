---
"@jarviisha/davinci-tokens": patch
"@jarviisha/davinci-react-ui": patch
---

Fix `Card variant="filled"` blending into the page canvas.

Since AppShell uses `semantic.color.surface` as the page canvas, `component.card.filled.background` (also `surface`) was rendering invisible. Re-point it to `semantic.color.backgroundSubtle` so the filled variant always sits one shade off the canvas in both light and dark.
