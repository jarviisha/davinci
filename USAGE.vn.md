# Hướng dẫn sử dụng Davinci trong dự án của bạn

> 🇬🇧 English version: [USAGE.md](./USAGE.md)

Document này dành cho **người dùng cuối** muốn install các package `@jarviisha/davinci-*` từ npm và dùng trong dự án của họ (React app, Next.js, Vite, plain HTML, …).

> Nếu bạn là maintainer muốn release một version mới, xem [RELEASING.md](./RELEASING.md).

---

## Các package có sẵn

| Package | Mô tả | Bắt buộc? |
| --- | --- | --- |
| `@jarviisha/davinci-tokens` | CSS variables (`--davinci-*`) + typed JS tokens. Framework-agnostic. | Bắt buộc — các package khác đều phụ thuộc vào CSS variables ở đây. |
| `@jarviisha/davinci-tailwind-preset` | Tailwind CSS v4 preset map token → utility class (`bg-background`, `text-foreground`, …). | Chỉ khi bạn dùng Tailwind. |
| `@jarviisha/davinci-react-theme-provider` | `<ThemeProvider>` + `<ThemeScript>` cho light / dark / system. | Chỉ khi cần toggle theme. |
| `@jarviisha/davinci-react-ui` | Bộ React components (`Button`, `Dialog`, `Input`, …) styled bằng CSS tokens, **không cần Tailwind**. | Chỉ khi muốn dùng components có sẵn. |

Yêu cầu chung: **Node ≥ 20**, React 18.3.1 hoặc 19 (nếu dùng package React).

---

## Cài đặt

Chọn một trong các combo dưới đây tuỳ stack của bạn.

### Combo A — Chỉ dùng tokens (CSS variables thuần)

Hợp với: HTML thuần, Vue, Svelte, hoặc bất kỳ framework nào — bạn tự viết CSS dùng `var(--davinci-*)`.

```bash
npm install @jarviisha/davinci-tokens
# hoặc
pnpm add @jarviisha/davinci-tokens
```

### Combo B — Tokens + Tailwind preset

Hợp với: dự án dùng Tailwind CSS v4.

```bash
npm install @jarviisha/davinci-tokens @jarviisha/davinci-tailwind-preset
npm install -D tailwindcss@^4.1.0
```

### Combo C — Tokens + React UI (không cần Tailwind)

Hợp với: dự án React muốn dùng ngay components có sẵn.

```bash
npm install @jarviisha/davinci-tokens @jarviisha/davinci-react-ui @jarviisha/davinci-react-theme-provider
```

(`react`, `react-dom` là peer deps — phải có sẵn trong dự án.)

---

## Bước 1 — Import CSS variables

Bắt buộc cho mọi combo. Thêm vào file CSS entry của app (thường là `src/index.css`, `src/main.css`, hoặc `app/globals.css`):

```css
@import "@jarviisha/davinci-tokens/css/variables.css";
@import "@jarviisha/davinci-tokens/css/light.css";
@import "@jarviisha/davinci-tokens/css/dark.css";
```

Sau import này, document đã có toàn bộ biến `--davinci-color-*`, `--davinci-spacing-*`, `--davinci-radius-*`, …

Nếu thêm **Tailwind preset (Combo B)**, thêm dòng nữa:

```css
@import "@jarviisha/davinci-tokens/css/variables.css";
@import "@jarviisha/davinci-tokens/css/light.css";
@import "@jarviisha/davinci-tokens/css/dark.css";
@import "tailwindcss";
```

Nếu thêm **React UI (Combo C)**:

```css
@import "@jarviisha/davinci-tokens/css/variables.css";
@import "@jarviisha/davinci-tokens/css/light.css";
@import "@jarviisha/davinci-tokens/css/dark.css";
@import "@jarviisha/davinci-react-ui/styles.css";
```

Thứ tự quan trọng: `variables.css` phải trước `light.css` / `dark.css`; UI hoặc Tailwind import sau cùng.

---

## Bước 2 — Cấu hình Tailwind preset (chỉ Combo B)

Trong `tailwind.config.ts` (hoặc `.js`):

```ts
import preset from "@jarviisha/davinci-tailwind-preset";
import type { Config } from "tailwindcss";

export default {
  presets: [preset],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"]
} satisfies Config;
```

Sau bước này, bạn có các utility class map đến semantic token:

```tsx
<div className="bg-background text-foreground">
  <button className="rounded-md bg-primary text-primary-foreground px-4 py-2">
    Save
  </button>
</div>
```

---

## Bước 3 — Thêm ThemeProvider (light / dark / system)

Bọc app bằng `ThemeProvider`:

```tsx
import { ThemeProvider } from "@jarviisha/davinci-react-theme-provider";

export function Root() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
      {/* app của bạn */}
    </ThemeProvider>
  );
}
```

Props chính:

- `defaultTheme`: `"light" | "dark" | "system"` (default `"system"`).
- `storageKey`: key trong `localStorage` để remember lựa chọn (default `"davinci-theme"`).

Dùng hook `useTheme` để toggle:

```tsx
import { useTheme } from "@jarviisha/davinci-react-theme-provider";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      Đang dùng: {theme} (resolved: {resolvedTheme})
    </button>
  );
}
```

### Chống flash khi reload (quan trọng cho user dark mode)

`ThemeProvider` apply class sau khi React mount → có flash sáng → tối. Inject script sync vào `<head>` để class được set **trước first paint**.

**Vite / CRA / HTML thuần** — gọi `getThemeScript()` và inline string trả về vào `index.html`:

```html
<head>
  <script>
    /* dán string từ getThemeScript({ defaultTheme: "system", storageKey: "my-app-theme" }) */
  </script>
</head>
```

**Next.js / Remix / Astro** — render `<ThemeScript />` trong `<head>`:

```tsx
import { ThemeScript } from "@jarviisha/davinci-react-theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="system" storageKey="my-app-theme" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

> Nhớ truyền **đúng cùng** `defaultTheme` và `storageKey` cho cả `<ThemeScript />` và `<ThemeProvider>` — nếu lệch nhau, theme đọc sai.

---

## Bước 4 — Dùng React UI components (Combo C)

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@jarviisha/davinci-react-ui";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Xin chào</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Lưu</Button>
      </CardContent>
    </Card>
  );
}
```

Components có sẵn (xem chi tiết types khi import):

- **Form**: `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Combobox`, `SearchInput`, `Label`, `FormField`, `FormHelpText`, `FormErrorText`.
- **Layout**: `AppShell`, `Container`, `Stack`, `Inline`, `Divider`, `Card`.
- **Navigation**: `Nav`, `Breadcrumbs`, `Pagination`, `Tabs`, `DropdownMenu`.
- **Overlay**: `Dialog`, `Drawer`, `Popover`, `Tooltip`, `Toast` (qua `ToastProvider` + `useToast`).
- **Feedback**: `Alert`, `Badge`, `Skeleton`, `EmptyState`, `Avatar`.
- **Data**: `Table` (`TableHeader`, `TableBody`, `TableRow`, …).
- **Hook**: `useFocusTrap`.

### Thanh scrollbar thon, ẩn cho đến khi hover

`@jarviisha/davinci-react-ui/styles.css` cung cấp sẵn utility class cho scrollbar thon, fade-in khi hover. Thumb trong suốt lúc nghỉ, fade-in khi container được hover hoặc nhận focus. Màu và kích thước lấy từ token `--davinci-component-scrollbar-*` nên tự đổi theo light / dark.

Đã tự động áp dụng cho `AppShellSidebar`, `AppShellMain`, `Dialog`, `Drawer`, listbox của `Combobox`, và `TableContainer` — không cần thêm class.

Để bật cho các vùng scroll khác, thêm class `davinci-scrollbar`:

```tsx
<aside className="davinci-scrollbar" style={{ overflow: "auto" }}>
  {/* sidebar items */}
</aside>
```

Thêm `davinci-scrollbar--always` nếu muốn thumb luôn hiện (không cần hover):

```tsx
<div className="davinci-scrollbar davinci-scrollbar--always">{/* … */}</div>
```

Override token ở cấp app:

```css
:root {
  --davinci-component-scrollbar-size: 0.625rem;
  --davinci-component-scrollbar-thumb-background: var(--davinci-semantic-color-border-bold);
}
```

> Firefox chỉ hỗ trợ `scrollbar-width: thin` (không chỉnh được size chính xác) nên size token chính xác trên Chromium / WebKit, gần đúng trên Firefox.

---

Toast cần một `ToastProvider` đặt gần root:

```tsx
import { ToastProvider, useToast } from "@jarviisha/davinci-react-ui";

function Root() {
  return (
    <ToastProvider position="top-right">
      <App />
    </ToastProvider>
  );
}

function SaveButton() {
  const toast = useToast();
  return <Button onClick={() => toast.show({ title: "Đã lưu" })}>Lưu</Button>;
}
```

---

## Dùng tokens trong JavaScript / TypeScript

Khi cần value của token ngoài CSS (ví dụ chart library, canvas, inline style):

```ts
import { tokens } from "@jarviisha/davinci-tokens/js/tokens";

const red500 = tokens["color.red.500"];
// { type: "color", value: "#F15B50", cssVar: "--davinci-color-red-500" }

element.style.color = `var(${red500.cssVar})`;
// hoặc value cứng (không theme-aware):
element.style.color = red500.value;
```

Type của `tokens` là `as const` → autocomplete đầy đủ trong IDE.

---

## Cập nhật version

Các package version được release đồng bộ thông qua changesets. Nâng cấp đồng thời để tránh peer-dep mismatch:

```bash
npm install \
  @jarviisha/davinci-tokens@latest \
  @jarviisha/davinci-tailwind-preset@latest \
  @jarviisha/davinci-react-theme-provider@latest \
  @jarviisha/davinci-react-ui@latest
```

Changelog xem ở GitHub Release của repo, hoặc file `CHANGELOG.md` trong từng folder package trên npm.

---

## Troubleshooting

### Class `dark` không apply → màu không đổi

- Kiểm tra đã import cả 3 file CSS (`variables.css`, `light.css`, `dark.css`) chưa.
- Kiểm tra `<html>` có class `light` hoặc `dark` (mở DevTools) khi `ThemeProvider` mount.
- Nếu chỉ import `variables.css`: thiếu giá trị semantic — bắt buộc thêm `light.css` và `dark.css`.

### Vẫn còn flash sáng → tối khi reload

- Chưa add `<ThemeScript />` (Next/Remix/Astro) hoặc chưa inline `getThemeScript()` (Vite/CRA).
- `<ThemeScript />` đang nằm ở `<body>` thay vì `<head>` — phải ở `<head>` để chạy trước paint.
- `storageKey` / `defaultTheme` lệch giữa `ThemeScript` và `ThemeProvider`.

### Tailwind không nhận class `bg-background`, `text-foreground`, …

- Thiếu `presets: [preset]` trong `tailwind.config`.
- `content` glob chưa cover file dùng class đó.
- Đang dùng Tailwind v3 — preset yêu cầu Tailwind **v4.1+**.

### TypeScript báo lỗi resolve `@jarviisha/davinci-tokens/js/tokens`

- `tsconfig.json` cần `"moduleResolution": "Bundler"` hoặc `"NodeNext"` để hiểu subpath exports.

### `peer dependency` warning với react

- React UI yêu cầu React 18.3.1+ hoặc 19. Nếu dự án dùng React 18.2 trở xuống thì nâng lên.
