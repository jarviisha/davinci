---
"@jarviisha/davinci-tokens": minor
"@jarviisha/davinci-react-ui": minor
---

Add thin hover-reveal scrollbar styling.

- New `component.scrollbar.*` tokens (`size`, `radius`, `track.background`, `thumb.background`, `thumb.backgroundHovered`, `thumb.backgroundActive`) emitted to `--davinci-component-scrollbar-*` CSS variables.
- New `davinci-scrollbar` utility class in `@jarviisha/davinci-react-ui/styles.css` for opt-in use on any scroll container, plus a `davinci-scrollbar--always` modifier to keep the thumb visible at rest.
- The same hover-reveal styling is now auto-applied to `AppShellSidebar`, `AppShellMain`, `Dialog`, `Drawer`, `Combobox` listbox, and `TableContainer` — no class needed.
