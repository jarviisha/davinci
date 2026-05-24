---
"@jarviisha/davinci-react-ui": patch
---

Lock AppShell sidebar, header, and aside in place when main content scrolls.

`.davinci-app-shell` now uses `block-size: 100dvh` (was `min-block-size`) plus `overflow: hidden` so the grid container fits the viewport exactly. Only the `__main`, `__sidebar`, and `__aside` slots scroll internally (they already had `overflow: auto`). At the mobile breakpoint (<768px) the lock is reset to `block-size: auto; min-block-size: 100dvh` so the stacked layout scrolls as one page.

Before: long page content pushed the shell taller than the viewport — sidebar and header scrolled away. Now they stay pinned.
