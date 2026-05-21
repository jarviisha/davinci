import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Inline,
  Tooltip
} from "@jarviisha/davinci-react-ui";

export function TooltipPanel() {
  return (
    <Card variant="filled">
      <CardHeader>
        <CardTitle>Tooltip</CardTitle>
        <CardDescription>Short contextual help for compact dashboard controls.</CardDescription>
      </CardHeader>
      <CardContent>
        <Inline gap="150" wrap>
          <Tooltip content="Export the current filtered report as CSV.">
            <Button tone="neutral" variant="outline">Export</Button>
          </Tooltip>
          <Tooltip content="Sync can run once every 15 minutes." placement="bottom">
            <Button tone="neutral" variant="soft">Sync now</Button>
          </Tooltip>
        </Inline>
      </CardContent>
    </Card>
  );
}
