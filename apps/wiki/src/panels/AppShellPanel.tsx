import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
  Avatar,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Inline,
  Nav,
  NavGroup,
  NavItem,
  Stack
} from "@jarviisha/davinci-react-ui";

export function AppShellPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AppShell</CardTitle>
        <CardDescription>Dashboard layout primitive with sidebar, header, and main content slots.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ border: "1px solid var(--davinci-semantic-color-border)", borderRadius: "var(--davinci-radius-lg)", overflow: "hidden" }}>
          <AppShell style={{ minBlockSize: "34rem" }}>
            <AppShellSidebar>
              <Stack gap="300">
                <div>
                  <strong>Acme</strong>
                  <p style={{ color: "var(--davinci-semantic-color-text-subtle)", fontSize: "0.875rem", margin: "0.25rem 0 0" }}>
                    Growth workspace
                  </p>
                </div>
                <Nav aria-label="Example dashboard">
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
                <p style={{ color: "var(--davinci-semantic-color-text-subtle)", fontSize: "0.875rem", margin: "0.25rem 0 0" }}>
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
                    <CardDescription>AppShell keeps navigation and workspace content structurally separated.</CardDescription>
                  </CardHeader>
                </Card>
              </Stack>
            </AppShellMain>
          </AppShell>
        </div>
      </CardContent>
    </Card>
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
