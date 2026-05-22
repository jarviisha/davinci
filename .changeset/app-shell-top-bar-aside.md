---
"@jarviisha/davinci-react-ui": minor
---

Extend AppShell with optional `AppShellTopBar` and `AppShellAside` slots, and add the new `DetailLayout` primitive (`DetailLayout`, `DetailLayoutMain`, `DetailLayoutAside`) for two-column page layouts.

- `AppShellTopBar` renders a full-width global header above the sidebar — use it for app branding, global search, notifications, and the workspace avatar.
- `AppShellAside` renders a right rail next to `AppShellMain` — use it for persistent metadata, online team, AI assistants, or anything that needs to stay alongside the primary content.
- The AppShell grid auto-switches between four configurations (no extras / top-bar only / aside only / both) via CSS `:has()`. No React child inspection, slots remain composable. Responsive: aside drops below main under 1024px, sidebar drops above under 768px.
- `DetailLayout` pairs a primary content column with a meta rail for issue / detail / settings pages. Props: `asidePlacement="end" | "start"` and `asideSticky` (keeps the rail in view while main scrolls). Collapses to a single column under 1024px.
- `AppShellAside` joins the auto-applied hover-reveal scrollbar set.
