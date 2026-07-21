---
"@jarviisha/davinci-react-ui": patch
---

Hide the native browser spinners on `Input` with `type="number"`. The browser-drawn increment/decrement arrows ignore the design tokens and break the single-canvas look. Keyboard arrow keys still step the value; use `NumberInput` when a visible, tokened stepper is wanted.
