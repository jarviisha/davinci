---
"@jarviisha/davinci-react-ui": patch
"@jarviisha/davinci-tokens": patch
---

Refine form and combobox styling. Focus indication for input, select, textarea, search, and combobox now uses a border-color change plus a soft box-shadow ring instead of an outline, and the invalid state is driven solely by `aria-invalid` (suppressing the native browser `:invalid` glow). The combobox chevron renders as an SVG, `--sm` field variants use the body-small font size, and the primary mono font family token is now IBM Plex Mono.
