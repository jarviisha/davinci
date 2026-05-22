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
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const appShellPanelMeta: PanelMeta = {
  id: "app-shell",
  label: "AppShell",
  group: "Navigation",
  description: "Dashboard layout primitive with optional global top bar, left sidebar, header, main, and right rail."
};

const shellFrameStyle = {
  border: "1px solid var(--davinci-semantic-color-border)",
  borderRadius: "var(--davinci-radius-lg)",
  overflow: "hidden"
} as const;

export function AppShellPanel() {
  return (
    <Stack gap="300">
      <PanelSection
        title="Default shell"
        description="Sidebar + header + main — the minimum configuration. Top bar and aside are opt-in."
      >
        <div style={shellFrameStyle}>
          <AppShell style={{ minBlockSize: "32rem" }}>
            <AppShellSidebar>
              <Stack gap="300">
                <div>
                  <strong>Acme</strong>
                  <p
                    style={{
                      color: "var(--davinci-semantic-color-text-subtle)",
                      fontSize: "0.875rem",
                      margin: "0.25rem 0 0"
                    }}
                  >
                    Growth workspace
                  </p>
                </div>
                <Nav aria-label="Default shell example">
                  <NavGroup label="Workspace">
                    <NavItem active>Overview</NavItem>
                    <NavItem>Customers</NavItem>
                    <NavItem>Billing</NavItem>
                  </NavGroup>
                </Nav>
              </Stack>
            </AppShellSidebar>
            <AppShellHeader>
              <div>
                <strong>Overview</strong>
                <p
                  style={{
                    color: "var(--davinci-semantic-color-text-subtle)",
                    fontSize: "0.875rem",
                    margin: "0.25rem 0 0"
                  }}
                >
                  May 2026 reporting
                </p>
              </div>
              <Inline gap="150">
                <Badge variant="success">Live</Badge>
                <Avatar name="Mina Park" />
              </Inline>
            </AppShellHeader>
            <AppShellMain>
              <Stack gap="200">
                <Inline gap="200" wrap>
                  <Metric label="Revenue" value="$48.2k" />
                  <Metric label="Active users" value="12,804" />
                  <Metric label="Churn" value="1.8%" />
                </Inline>
                <Card variant="outlined">
                  <CardHeader>
                    <CardTitle>Pipeline health</CardTitle>
                    <CardDescription>
                      AppShell keeps navigation and workspace content structurally separated.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Stack>
            </AppShellMain>
          </AppShell>
        </div>
      </PanelSection>

      <PanelSection
        title="With global top bar"
        description="Add AppShellTopBar for app switcher, global search, and account controls. The bar spans the full width above the sidebar."
      >
        <div style={shellFrameStyle}>
          <AppShell style={{ minBlockSize: "32rem" }}>
            <AppShellTopBar>
              <Inline gap="200">
                <strong>Davinci</strong>
                <Badge variant="neutral">workspace</Badge>
              </Inline>
              <div style={{ flex: 1, maxInlineSize: "28rem" }}>
                <SearchInput placeholder="Search anything…" size="sm" />
              </div>
              <Inline gap="100">
                <IconButton aria-label="Notifications" variant="ghost">
                  ●
                </IconButton>
                <IconButton aria-label="Help" variant="ghost">
                  ?
                </IconButton>
                <Avatar name="Mina Park" size="sm" />
              </Inline>
            </AppShellTopBar>
            <AppShellSidebar>
              <Stack gap="200">
                <Nav aria-label="Top-bar shell example">
                  <NavGroup label="Project">
                    <NavItem active>Board</NavItem>
                    <NavItem>Backlog</NavItem>
                    <NavItem>Roadmap</NavItem>
                  </NavGroup>
                  <NavGroup label="Insights">
                    <NavItem>Reports</NavItem>
                    <NavItem>Releases</NavItem>
                  </NavGroup>
                </Nav>
              </Stack>
            </AppShellSidebar>
            <AppShellHeader>
              <strong>Board</strong>
              <Inline gap="100">
                <Button size="sm" tone="neutral" variant="outline">
                  Filter
                </Button>
                <Button size="sm">New issue</Button>
              </Inline>
            </AppShellHeader>
            <AppShellMain>
              <Card variant="outlined">
                <CardContent>
                  <p>Board cards would render here. The top bar stays pinned across the whole app.</p>
                </CardContent>
              </Card>
            </AppShellMain>
          </AppShell>
        </div>
      </PanelSection>

      <PanelSection
        title="With right rail"
        description="Add AppShellAside for a persistent details panel — e.g. project metadata, online users, AI assistant. Collapses to a bottom block under 1024px."
      >
        <div style={shellFrameStyle}>
          <AppShell style={{ minBlockSize: "32rem" }}>
            <AppShellSidebar>
              <Nav aria-label="Aside shell example">
                <NavGroup label="Inbox">
                  <NavItem active>Mentions</NavItem>
                  <NavItem>Assigned</NavItem>
                  <NavItem>Watching</NavItem>
                </NavGroup>
              </Nav>
            </AppShellSidebar>
            <AppShellHeader>
              <strong>Mentions</strong>
              <Badge variant="primary">3 new</Badge>
            </AppShellHeader>
            <AppShellMain>
              <Stack gap="200">
                <Card variant="outlined">
                  <CardContent>
                    <p>Inbox items here.</p>
                  </CardContent>
                </Card>
              </Stack>
            </AppShellMain>
            <AppShellAside>
              <Stack gap="200">
                <strong>Online (4)</strong>
                <Divider />
                <Inline gap="100">
                  <Avatar name="Ada Lovelace" size="sm" />
                  <span style={{ fontSize: "0.875rem" }}>Ada Lovelace</span>
                </Inline>
                <Inline gap="100">
                  <Avatar name="Grace Hopper" size="sm" />
                  <span style={{ fontSize: "0.875rem" }}>Grace Hopper</span>
                </Inline>
                <Inline gap="100">
                  <Avatar name="Lin Chen" size="sm" />
                  <span style={{ fontSize: "0.875rem" }}>Lin Chen</span>
                </Inline>
                <Inline gap="100">
                  <Avatar name="Mina Park" size="sm" />
                  <span style={{ fontSize: "0.875rem" }}>Mina Park</span>
                </Inline>
              </Stack>
            </AppShellAside>
          </AppShell>
        </div>
      </PanelSection>

      <PanelSection
        title="All four regions"
        description="Top bar + sidebar + header + main + aside — the full Jira-style shell."
      >
        <div style={shellFrameStyle}>
          <AppShell style={{ minBlockSize: "34rem" }}>
            <AppShellTopBar>
              <Inline gap="200">
                <strong>Davinci</strong>
                <Badge variant="neutral">DAV</Badge>
              </Inline>
              <div style={{ flex: 1, maxInlineSize: "28rem" }}>
                <SearchInput placeholder="Search issues, projects, people…" size="sm" />
              </div>
              <Inline gap="100">
                <IconButton aria-label="Notifications" variant="ghost">
                  ●
                </IconButton>
                <Avatar name="Mina Park" size="sm" />
              </Inline>
            </AppShellTopBar>
            <AppShellSidebar>
              <Nav aria-label="Full shell example">
                <NavGroup label="Planning">
                  <NavItem active>Board</NavItem>
                  <NavItem>Backlog</NavItem>
                  <NavItem>Timeline</NavItem>
                </NavGroup>
                <NavGroup label="Settings">
                  <NavItem>General</NavItem>
                  <NavItem>Members</NavItem>
                </NavGroup>
              </Nav>
            </AppShellSidebar>
            <AppShellHeader>
              <div>
                <strong>DAV-1284 · Refactor app shell</strong>
                <p
                  style={{
                    color: "var(--davinci-semantic-color-text-subtle)",
                    fontSize: "0.875rem",
                    margin: "0.25rem 0 0"
                  }}
                >
                  In progress
                </p>
              </div>
              <Inline gap="100">
                <Button size="sm" tone="neutral" variant="outline">
                  Edit
                </Button>
                <Button size="sm">Comment</Button>
              </Inline>
            </AppShellHeader>
            <AppShellMain>
              <Stack gap="200">
                <Card variant="outlined">
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Issue body, comments, and activity timeline render in the main column.</p>
                  </CardContent>
                </Card>
              </Stack>
            </AppShellMain>
            <AppShellAside>
              <Stack gap="200">
                <strong>Details</strong>
                <Divider />
                <Stack gap="100">
                  <MetaRow label="Assignee" value="Mina Park" />
                  <MetaRow label="Reporter" value="Ada Lovelace" />
                  <MetaRow label="Priority" value="High" />
                  <MetaRow label="Sprint" value="Sprint 24" />
                  <MetaRow label="Due" value="May 28, 2026" />
                </Stack>
              </Stack>
            </AppShellAside>
          </AppShell>
        </div>
      </PanelSection>
    </Stack>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card style={{ minWidth: "11rem" }} variant="outlined">
      <CardContent>
        <span style={{ color: "var(--davinci-semantic-color-text-subtle)", fontSize: "0.875rem" }}>{label}</span>
        <strong style={{ fontSize: "1.5rem" }}>{value}</strong>
      </CardContent>
    </Card>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <Inline align="start" gap="200" justify="between">
      <span style={{ color: "var(--davinci-semantic-color-text-subtle)", fontSize: "0.875rem" }}>{label}</span>
      <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{value}</span>
    </Inline>
  );
}
