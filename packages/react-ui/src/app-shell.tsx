import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type AppShellProps = HTMLAttributes<HTMLDivElement>;
export type AppShellSidebarProps = HTMLAttributes<HTMLElement>;
export type AppShellHeaderProps = HTMLAttributes<HTMLElement>;
export type AppShellMainProps = HTMLAttributes<HTMLElement>;

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { className, ...props },
  ref
) {
  return <div className={cn("davinci-app-shell", className)} ref={ref} {...props} />;
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
  { className, ...props },
  ref
) {
  return <main className={cn("davinci-app-shell__main", className)} ref={ref} {...props} />;
});
