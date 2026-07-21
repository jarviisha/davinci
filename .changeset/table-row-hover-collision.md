---
"@jarviisha/davinci-tokens": patch
"@jarviisha/davinci-react-ui": patch
---

Fix table row hover colliding with components rendered inside the row. Row hover used `semantic.color.background-hovered`, which resolves to the same value as `background-subtle` — the resting fill of neutral Badge, soft neutral Button, Switch tracks and the table's own header/footer — so those elements disappeared into a hovered row. Hover now uses a new `component.table.row.backgroundHovered` token that sits halfway between the canvas and `background-subtle`, keeping the hover readable without swallowing row content.
