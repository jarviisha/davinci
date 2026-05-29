---
"@jarviisha/davinci-react-ui": patch
---

Fix `Checkbox` rendering both the check and minus glyphs at once. Previously both SVGs were always in the DOM and only hidden via CSS `opacity`, so the inactive icon showed whenever styles weren't fully applied. The component now renders only the icon matching the current state (minus when `indeterminate`, check when `checked`, nothing otherwise), tracking checked state for both controlled and uncontrolled usage.
