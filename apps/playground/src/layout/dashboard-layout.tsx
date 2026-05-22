import { useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppShell,
  AppShellAside,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
  AppShellTopBar,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Divider,
  IconButton,
  Inline,
  Nav,
  NavGroup,
  NavItem,
  SearchInput,
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

const recentActivity = [
  { id: 1, name: "Ada Lovelace", action: "closed deal", target: "Orbit Studio" },
  { id: 2, name: "Mina Park", action: "updated forecast for", target: "Q2 pipeline" },
  { id: 3, name: "Lin Chen", action: "flagged risk on", target: "Northstar Labs" },
  { id: 4, name: "Grace Hopper", action: "opened", target: "Acme renewal" }
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, resolvedTheme, setTheme } = useTheme();

  const pageMeta = useMemo(() => resolvePageMeta(location.pathname), [location.pathname]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <AppShell className="min-h-screen">
        <AppShellTopBar>
          <Inline align="center" gap="200">
            <p className="m-0 text-base font-semibold tracking-normal">Pulseboard</p>
            <Badge variant="neutral">workspace</Badge>
          </Inline>
          <div className="hidden flex-1 md:block" style={{ maxInlineSize: "28rem" }}>
            <SearchInput placeholder="Search accounts, deals, people…" size="sm" />
          </div>
          <Inline align="center" gap="100">
            <Badge variant={resolvedTheme === "dark" ? "discovery" : "primary"}>{resolvedTheme}</Badge>
            <Button onClick={() => setTheme(nextTheme(theme))} size="sm" tone="neutral" variant="outline">
              Switch to {nextTheme(theme)}
            </Button>
            <IconButton aria-label="Notifications" variant="ghost">
              ●
            </IconButton>
            <Avatar name="Mina Park" size="sm" />
          </Inline>
        </AppShellTopBar>

        <AppShellSidebar className="davinci-scrollbar">
          <Stack gap="300">
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
          </Stack>
        </AppShellSidebar>

        <AppShellHeader>
          <div className="min-w-0">
            <p className="m-0 text-xs font-medium uppercase tracking-wide text-text-subtle">
              {pageMeta.eyebrow}
            </p>
            <h1 className="m-0 mt-1 text-xl font-semibold tracking-normal">{pageMeta.title}</h1>
          </div>
          <Inline align="center" gap="100">
            <Button size="sm" tone="neutral" variant="outline">
              Export
            </Button>
            <Button size="sm">New report</Button>
          </Inline>
        </AppShellHeader>

        <AppShellMain className="davinci-scrollbar">
          <Outlet />
        </AppShellMain>

        <AppShellAside className="davinci-scrollbar">
          <Stack gap="300">
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

            <Stack gap="150">
              <Inline align="center" justify="between">
                <strong className="text-sm">Recent activity</strong>
                <span className="text-xs text-text-subtle">last 24h</span>
              </Inline>
              <Divider />
              <Stack gap="200">
                {recentActivity.map((event) => (
                  <Inline align="start" gap="150" key={event.id}>
                    <Avatar name={event.name} size="sm" />
                    <div className="min-w-0">
                      <p className="m-0 text-sm">
                        <span className="font-medium">{event.name}</span>{" "}
                        <span className="text-text-subtle">{event.action}</span>{" "}
                        <span className="font-medium">{event.target}</span>
                      </p>
                    </div>
                  </Inline>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </AppShellAside>
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
