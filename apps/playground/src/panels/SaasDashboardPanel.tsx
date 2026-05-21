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
  SearchInput,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from "@jarviisha/davinci-react-ui";

const metrics = [
  { label: "MRR", value: "$128.4k", delta: "+12.8%", tone: "success" },
  { label: "Active accounts", value: "2,418", delta: "+8.1%", tone: "success" },
  { label: "Net retention", value: "118%", delta: "+3.4%", tone: "primary" },
  { label: "Open risk", value: "14", delta: "-5 this week", tone: "warning" }
] as const;

const accounts = [
  { name: "Northstar Labs", plan: "Enterprise", owner: "Mina Park", mrr: "$18,400", health: "Healthy", usage: "86%" },
  { name: "Orbit Systems", plan: "Scale", owner: "Theo Grant", mrr: "$12,900", health: "Watch", usage: "64%" },
  { name: "Clearbit Studio", plan: "Growth", owner: "Ari Chen", mrr: "$8,750", health: "Healthy", usage: "79%" },
  { name: "Pioneer Ops", plan: "Enterprise", owner: "Nora Lee", mrr: "$22,100", health: "At risk", usage: "41%" }
] as const;

const activity = [
  { title: "Northstar renewed annual contract", time: "12 min ago", status: "success" },
  { title: "Pioneer Ops crossed risk threshold", time: "38 min ago", status: "warning" },
  { title: "Orbit requested SSO rollout", time: "2 hr ago", status: "primary" },
  { title: "Clearbit invited 18 teammates", time: "4 hr ago", status: "neutral" }
] as const;

const chartBars = [42, 58, 51, 74, 68, 88, 79, 94, 86, 101, 96, 112];

export function SaasDashboardPanel() {
  return (
    <div className="overflow-hidden rounded-panel border border-border bg-background">
      <AppShell className="min-h-[48rem]">
        <AppShellSidebar className="davinci-scrollbar">
          <Stack gap="300">
            <div>
              <p className="text-base font-semibold tracking-normal">Pulseboard</p>
              <p className="mt-1 text-sm leading-6 text-text-subtle">Revenue workspace</p>
            </div>

            <Nav aria-label="SaaS dashboard demo">
              <NavGroup defaultOpen label="Workspace">
                <NavItem active>Overview</NavItem>
                <NavItem>Accounts</NavItem>
                <NavItem>Pipeline</NavItem>
                <NavItem>Reports</NavItem>
              </NavGroup>
              <NavGroup defaultOpen label="Operations">
                <NavItem>Health scores</NavItem>
                <NavItem>Renewals</NavItem>
                <NavItem>Integrations</NavItem>
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
            <h2 className="m-0 text-xl font-semibold tracking-normal">Executive overview</h2>
            <p className="m-0 mt-1 text-sm text-text-subtle">May 2026 reporting period</p>
          </div>
          <Inline align="center" gap="150">
            <Badge variant="success">Live</Badge>
            <Button size="sm" tone="neutral" variant="outline">
              Export
            </Button>
            <Avatar name="Mina Park" size="sm" />
          </Inline>
        </AppShellHeader>

        <AppShellMain className="davinci-scrollbar bg-muted/40">
          <Stack gap="300">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)]">
              <Card variant="elevated">
                <CardHeader>
                  <Inline align="start" justify="between" wrap>
                    <div>
                      <CardTitle>Revenue trend</CardTitle>
                      <CardDescription>New, expansion, and renewal revenue by month.</CardDescription>
                    </div>
                    <Badge variant="primary">Forecast +9.6%</Badge>
                  </Inline>
                </CardHeader>
                <CardContent>
                  <div className="flex h-64 items-end gap-2 rounded-lg border border-border bg-background p-4">
                    {chartBars.map((value, index) => (
                      <div className="flex min-w-0 flex-1 flex-col items-center gap-2" key={value + index}>
                        <div
                          aria-label={`Month ${index + 1}: ${value} thousand dollars`}
                          className="w-full rounded-t-md bg-primary"
                          style={{ height: `${Math.max(18, (value / 112) * 100)}%` }}
                        />
                        <span className="text-[0.7rem] text-text-muted">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Activity</CardTitle>
                  <CardDescription>Latest customer and revenue events.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Stack gap="200">
                    {activity.map((item) => (
                      <Inline align="start" gap="150" key={item.title}>
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                        <div className="min-w-0">
                          <p className="m-0 text-sm font-medium">{item.title}</p>
                          <p className="m-0 mt-1 text-xs text-text-subtle">{item.time}</p>
                        </div>
                        <Badge className="ml-auto" variant={item.status}>
                          {item.status}
                        </Badge>
                      </Inline>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </div>

            <Card variant="elevated">
              <CardHeader>
                <Inline align="start" justify="between" wrap>
                  <div>
                    <CardTitle>Account health</CardTitle>
                    <CardDescription>Prioritized customer accounts for the revenue team.</CardDescription>
                  </div>
                  <Inline gap="150" wrap>
                    <SearchInput aria-label="Search accounts" placeholder="Search accounts" size="sm" />
                    <Select aria-label="Health filter" size="sm" defaultValue="all">
                      <option value="all">All health</option>
                      <option value="healthy">Healthy</option>
                      <option value="watch">Watch</option>
                      <option value="risk">At risk</option>
                    </Select>
                  </Inline>
                </Inline>
              </CardHeader>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead className="text-right">MRR</TableHead>
                        <TableHead>Health</TableHead>
                        <TableHead className="text-right">Usage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accounts.map((account) => (
                        <TableRow key={account.name}>
                          <TableCell>
                            <span className="font-medium">{account.name}</span>
                          </TableCell>
                          <TableCell>{account.plan}</TableCell>
                          <TableCell>{account.owner}</TableCell>
                          <TableCell className="text-right font-medium">{account.mrr}</TableCell>
                          <TableCell>
                            <Badge variant={healthVariant(account.health)}>{account.health}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{account.usage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Stack>
        </AppShellMain>
      </AppShell>
    </div>
  );
}

function MetricCard({
  delta,
  label,
  tone,
  value
}: {
  delta: string;
  label: string;
  tone: "success" | "primary" | "warning";
  value: string;
}) {
  return (
    <Card variant="elevated">
      <CardContent>
        <Inline align="center" justify="between">
          <span className="text-sm font-medium text-text-subtle">{label}</span>
          <Badge variant={tone}>{delta}</Badge>
        </Inline>
        <strong className="text-2xl font-semibold tracking-normal">{value}</strong>
      </CardContent>
    </Card>
  );
}

function healthVariant(health: string) {
  if (health === "Healthy") return "success";
  if (health === "Watch") return "warning";
  return "destructive";
}
