---
"@jarviisha/davinci-tokens": patch
"@jarviisha/davinci-react-ui": patch
---

Add a dedicated `component.table.radius` token (referencing `semantic.radius.card`) and use it in the table container instead of the hardcoded `radius-lg` primitive. No visual change — this aligns the table with the component-token convention used by card, dialog, and button, making the table corner radius themeable.
