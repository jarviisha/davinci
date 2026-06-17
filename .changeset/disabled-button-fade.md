---
"@jarviisha/davinci-react-ui": minor
"@jarviisha/davinci-tokens": minor
---

Disabled buttons now keep their variant/tone colors and fade via opacity instead of collapsing to a flat neutral gray.

- `react-ui`: `:disabled` buttons apply `--davinci-component-button-disabled-opacity` and no longer override background/border/text with the neutral disabled tokens.
- `tokens`: replaced `component.button.disabled.{background,border,foreground}` with `component.button.disabled.opacity` (0.45).
