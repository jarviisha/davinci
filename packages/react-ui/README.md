# @jarviisha/davinci-react-ui

Headless-friendly React UI components styled with Davinci CSS tokens. No Tailwind required — the package ships its own stylesheet that only depends on the Davinci CSS variables.

Part of the [Davinci](https://github.com/jarviisha/davinci) design system.

## Install

```bash
pnpm add @jarviisha/davinci-react-ui @jarviisha/davinci-tokens
```

Peer dependencies: `react ^18.3.1 || ^19.0.0`, `react-dom ^18.3.1 || ^19.0.0`, `@jarviisha/davinci-tokens ^0.1.0`.

## Usage

Import the token CSS and the component CSS once in your app entry:

```ts
import "@jarviisha/davinci-tokens/css/variables.css";
import "@jarviisha/davinci-tokens/css/light.css";
import "@jarviisha/davinci-tokens/css/dark.css";
import "@jarviisha/davinci-react-ui/styles.css";
```

Then use components directly:

```tsx
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Stack } from "@jarviisha/davinci-react-ui";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <Stack gap="200">
          <Badge variant="success">Active</Badge>
          <Button>Save changes</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
```

## Components

- **Layout** — `AppShell`, `AppShellSidebar`, `AppShellHeader`, `AppShellMain`, `Container`, `Stack`, `Inline`
- **Actions** — `Button`, `IconButton` (variants: `solid` / `outline` / `ghost` / `soft`; tones: `primary` / `neutral` / `danger`; sizes: `sm` / `md` / `lg`)
- **Navigation** — `Breadcrumbs`, `BreadcrumbsList`, `BreadcrumbsItem`, `BreadcrumbsLink`, `BreadcrumbsCurrent`, `Pagination`, `Nav`, `NavGroup`, `NavItem`, `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- **Forms** — `FormField`, `Label`, `Input`, `SearchInput`, `Select`, `Combobox`, `Textarea`, `Checkbox`, `RadioGroup`, `Radio`, `Switch`
- **Surfaces** — `Card` (variants: `elevated` / `outlined` / `filled` / `flat` / `floating`; tones: `info` / `success` / `warning` / `danger`; modifiers: `interactive`, `selected`), `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- **Data display** — `Avatar`, `EmptyState`, `Skeleton`, `Table`, `TableContainer`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`
- **Status** — `Alert`, `Badge` (variants: `neutral` / `primary` / `success` / `warning` / `destructive` / `discovery`)
- **Overlays** — `Dialog`, `Drawer`, `DropdownMenu`, `Popover`, `Tooltip`, `ToastProvider`, `useToast`
- **Structure** — `Divider`

All components forward refs and spread extra props onto the underlying DOM element. Add your own `className` to extend styles.

## Scrollbar

A thin, hover-reveal scrollbar style is shipped as a utility class. The thumb is transparent at rest and fades in when the container is hovered or receives focus, with `:hover` and `:active` states for direct thumb interaction. Colors and size are driven by the `--davinci-component-scrollbar-*` tokens, so they follow light / dark themes automatically.

Auto-applied (no extra class needed) to internal scroll containers: `AppShellSidebar`, `AppShellMain`, `Dialog`, `Drawer`, `Combobox` listbox, `TableContainer`.

Opt in elsewhere with `davinci-scrollbar`:

```tsx
<div className="davinci-scrollbar" style={{ maxBlockSize: "20rem", overflow: "auto" }}>
  {/* long content */}
</div>
```

Use the `davinci-scrollbar--always` modifier if you want the thumb visible at rest instead of only on hover:

```tsx
<div className="davinci-scrollbar davinci-scrollbar--always">{/* … */}</div>
```

Override per app by redefining the tokens at any layer:

```css
:root {
  --davinci-component-scrollbar-size: 0.625rem;
  --davinci-component-scrollbar-thumb-background: var(--davinci-semantic-color-border-bold);
}
```

> Firefox can only render `scrollbar-width: thin` (3-step `auto | thin | none`), so the size token is honored on Chromium / WebKit and approximated on Firefox.

## Overriding styles

Component styles are wrapped in `@layer davinci.components`, so any unlayered CSS or higher layer you author wins without specificity tricks:

```css
.davinci-button--solid.davinci-button--tone-primary {
  /* Wins automatically — your rules sit outside the davinci layer. */
  letter-spacing: 0.02em;
}
```

## Theming

Components render against the Davinci token CSS variables. Toggle dark mode by setting the `dark` class on `<html>`, or pair this package with [`@jarviisha/davinci-react-theme-provider`](https://www.npmjs.com/package/@jarviisha/davinci-react-theme-provider).

## License

MIT
