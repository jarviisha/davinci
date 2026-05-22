import { useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Divider,
  Inline,
  Nav,
  NavGroup,
  NavItem,
  Stack
} from "@jarviisha/davinci-react-ui";
import { useTheme, type Theme } from "@jarviisha/davinci-react-theme-provider";

type NavEntry = { to: string; label: string; end?: boolean };

const workspaceNav: NavEntry[] = [
  { to: "/", label: "Overview", end: true },
  { to: "/accounts", label: "Accounts" }
];

const systemNav: NavEntry[] = [{ to: "/settings", label: "Settings" }];

const themes: Theme[] = ["light", "dark", "system"];

function nextTheme(theme: Theme): Theme {
  const index = themes.indexOf(theme);
  return themes[(index + 1) % themes.length] ?? "system";
}

function isEntryActive(entry: NavEntry, pathname: string) {
  if (entry.end) return pathname === entry.to;
  return pathname === entry.to || pathname.startsWith(`${entry.to}/`);
}

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, resolvedTheme, setTheme } = useTheme();

  const pageMeta = useMemo(() => resolvePageMeta(location.pathname), [location.pathname]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <AppShell className="min-h-screen">
        <AppShellSidebar className="davinci-scrollbar">
          <Stack gap="300">
            <div>
              <p className="text-base font-semibold tracking-normal">Pulseboard</p>
              <p className="mt-1 text-sm leading-6 text-text-subtle">Revenue workspace</p>
            </div>

            <Nav aria-label="Primary">
              <NavGroup defaultOpen label="Workspace">
                {workspaceNav.map((entry) => (
                  <NavItem
                    active={isEntryActive(entry, location.pathname)}
                    key={entry.to}
                    onClick={() => navigate(entry.to)}
                  >
                    {entry.label}
                  </NavItem>
                ))}
              </NavGroup>
              <NavGroup defaultOpen label="System">
                {systemNav.map((entry) => (
                  <NavItem
                    active={isEntryActive(entry, location.pathname)}
                    key={entry.to}
                    onClick={() => navigate(entry.to)}
                  >
                    {entry.label}
                  </NavItem>
                ))}
              </NavGroup>
            </Nav>

            <Divider />

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Q2 target</CardTitle>
                <CardDescription>$410k ARR committed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[72%] rounded-full bg-primary" />
                </div>
                <Inline align="center" justify="between">
                  <span className="text-sm text-text-subtle">Progress</span>
                  <span className="text-sm font-medium">72%</span>
                </Inline>
              </CardContent>
            </Card>
          </Stack>
        </AppShellSidebar>

        <AppShellHeader>
          <div className="min-w-0">
            <p className="m-0 text-xs font-medium uppercase tracking-wide text-text-subtle">
              {pageMeta.eyebrow}
            </p>
            <h1 className="m-0 mt-1 text-xl font-semibold tracking-normal">{pageMeta.title}</h1>
          </div>
          <Inline align="center" gap="150">
            <Badge variant={resolvedTheme === "dark" ? "discovery" : "primary"}>{resolvedTheme}</Badge>
            <Button onClick={() => setTheme(nextTheme(theme))} size="sm" tone="neutral" variant="outline">
              Switch to {nextTheme(theme)}
            </Button>
            <Avatar name="Mina Park" size="sm" />
          </Inline>
        </AppShellHeader>

        <AppShellMain className="davinci-scrollbar">
          <Outlet />
        </AppShellMain>
      </AppShell>
    </div>
  );
}

type PageMeta = { eyebrow: string; title: string };

function resolvePageMeta(pathname: string): PageMeta {
  if (pathname.startsWith("/accounts")) {
    return { eyebrow: "Customers", title: "Account health" };
  }
  if (pathname.startsWith("/settings")) {
    return { eyebrow: "Workspace", title: "Settings" };
  }
  return { eyebrow: "Pulseboard", title: "Executive overview" };
}
