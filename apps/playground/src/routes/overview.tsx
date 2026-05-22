import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Inline,
  Stack
} from "@jarviisha/davinci-react-ui";
import {
  activity,
  chartBars,
  metrics,
  type Metric
} from "../data/dashboard";

export default function OverviewRoute() {
  return (
    <Stack gap="300">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)]">
        <Card>
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
                <div className="flex min-w-0 flex-1 flex-col items-center gap-2" key={value + "-" + index}>
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

        <Card>
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
    </Stack>
  );
}

function MetricCard({ delta, label, tone, value }: Metric) {
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
