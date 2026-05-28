---
"@jarviisha/davinci-react-ui": patch
---

Make the `Checkbox` check and indeterminate glyphs visually stronger. The shared tabler-style icons render with a sub-pixel stroke at the checkbox's small box sizes (~1px on a 16–18px box), so they looked anemic on the solid primary fill. The fix is scoped to `Checkbox`: the icon now occupies 85% of the box (up from 75%) and gets `stroke-width: 3` via CSS, leaving the shared icons untouched.
