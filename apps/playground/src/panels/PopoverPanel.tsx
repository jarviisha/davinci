import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormField,
  Inline,
  Label,
  Popover,
  Select,
  Stack
} from "@jarviisha/davinci-react-ui";

export function PopoverPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popover</CardTitle>
        <CardDescription>Generic anchored panel for filters, quick settings, and compact forms.</CardDescription>
      </CardHeader>
      <CardContent>
        <Inline gap="150" wrap>
          <Popover trigger={<Button tone="neutral" variant="outline">Filter</Button>}>
            <Stack gap="200" style={{ minWidth: "16rem" }}>
              <FormField>
                <Label>Status</Label>
                <Select defaultValue="active">
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="archived">Archived</option>
                </Select>
              </FormField>
              <FormField>
                <Label>Owner</Label>
                <Select defaultValue="all">
                  <option value="all">All owners</option>
                  <option value="me">Assigned to me</option>
                  <option value="unassigned">Unassigned</option>
                </Select>
              </FormField>
            </Stack>
          </Popover>
          <Popover align="end" trigger={<Button tone="neutral" variant="soft">Quick settings</Button>}>
            <Stack gap="100" style={{ minWidth: "14rem" }}>
              <strong>Density</strong>
              <span style={{ color: "var(--davinci-semantic-color-text-subtle)", fontSize: "0.875rem" }}>
                Compact table layout is enabled for this workspace.
              </span>
            </Stack>
          </Popover>
        </Inline>
      </CardContent>
    </Card>
  );
}
