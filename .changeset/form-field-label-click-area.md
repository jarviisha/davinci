---
"@jarviisha/davinci-react-ui": patch
---

Fix FormField label click area spanning the full field width. The flex column stretched the `<label>` to full width, so clicking empty space next to the label text focused the associated input. The label now shrinks to its content width.
