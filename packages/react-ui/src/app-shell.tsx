import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type AppShellProps = HTMLAttributes<HTMLDivElement>;
export type AppShellTopBarProps = HTMLAttributes<HTMLElement>;
export type AppShellSidebarProps = HTMLAttributes<HTMLElement>;
export type AppShellHeaderProps = HTMLAttributes<HTMLElement>;
/**
 * Inline padding around the main content area.
 *
 * - `default` — the baseline (`spacing.300`). What you get if the prop is omitted.
 * - `none` — full-bleed; the consumer pads its own content (e.g. dashboards, flush data tables).
 * - `compact` — tighter (`spacing.200`) for denser layouts.
 * - `spacious` — roomier (`spacing.400`) for breathing room around long-form content.
 */
export type AppShellMainPadding = "none" | "compact" | "default" | "spacious";

export type AppShellMainProps = HTMLAttributes<HTMLElement> & {
  /** Inline padding around the main content area. Defaults to `default`. */
  padding?: AppShellMainPadding;
};
export type AppShellAsideProps = HTMLAttributes<HTMLElement>;

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-app-shell", className)} ref={ref} {...props} />;
});

export const AppShellTopBar = forwardRef<HTMLElement, AppShellTopBarProps>(function AppShellTopBar(
  { className, ...props },
  ref
) {
  return <header className={cn("davinci-app-shell__top-bar", className)} ref={ref} {...props} />;
});

export const AppShellSidebar = forwardRef<HTMLElement, AppShellSidebarProps>(function AppShellSidebar(
  { className, ...props },
  ref
) {
  return <aside className={cn("davinci-app-shell__sidebar", className)} ref={ref} {...props} />;
});

export const AppShellHeader = forwardRef<HTMLElement, AppShellHeaderProps>(function AppShellHeader(
  { className, ...props },
  ref
) {
  return <header className={cn("davinci-app-shell__header", className)} ref={ref} {...props} />;
});

export const AppShellMain = forwardRef<HTMLElement, AppShellMainProps>(function AppShellMain(
  { className, padding = "default", ...props },
  ref
) {
  return (
    <main
      className={cn(
        "davinci-app-shell__main",
        padding !== "default" && `davinci-app-shell__main--padding-${padding}`,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export const AppShellAside = forwardRef<HTMLElement, AppShellAsideProps>(function AppShellAside(
  { className, ...props },
  ref
) {
  return <aside className={cn("davinci-app-shell__aside", className)} ref={ref} {...props} />;
});
