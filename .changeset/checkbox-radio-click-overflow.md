---
"@jarviisha/davinci-react-ui": patch
---

Fix `Checkbox` and `Radio` stretching to fill the full width of a flex/grid parent (e.g. `Stack`, `RadioGroup`), which made the entire row clickable instead of just the control and its label. Both now set `inline-size: fit-content`, matching the existing `Switch` fix, so the clickable area hugs its content while still respecting the parent's cross-axis alignment in row layouts.
