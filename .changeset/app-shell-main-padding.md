---
"@jarviisha/davinci-react-ui": minor
---

Add a `padding` prop to `AppShellMain` so consumers can opt out of the baked-in inline padding without reaching for `className`/style overrides. Accepts `"none" | "compact" | "default" | "spacious"`, mapped to the spacing scale (`0`, `spacing.200`, `spacing.300`, `spacing.400`). Defaults to `"default"` so existing call sites are unaffected. Modifier classes override the existing `--davinci-component-app-shell-main-padding` CSS variable, so theme overrides still cascade.
