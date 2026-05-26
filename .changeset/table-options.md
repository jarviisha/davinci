---
"@jarviisha/davinci-react-ui": minor
---

Add composable customization options to `Table`:

- **`Table`** — `density` (`comfortable` | `compact`) for row padding, and `stickyHeader` to pin the header while the body scrolls.
- **`TableContainer`** — `borderless` to drop the outer frame for a flush, lines-only table, and `overlayScrollbar` for a custom scrollbar that floats over the content and reserves zero layout width (pairs with `stickyHeader`).
- **`TableHeader`** — `tone` (`default` | `primary` | `neutral`) to recolor the header; colors derive from semantic tokens so they stay theme-aware.
- **`TableRow`** — composable `selected` and `interactive` states for selectable / clickable rows.
- **`TableHead` / `TableCell`** — `wrap` to opt out of the default single-line `nowrap` for long-form content.

All options are additive and default to the previous behavior.
