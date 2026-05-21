import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Inline
} from "@jarviisha/davinci-react-ui";

export function DropdownMenuPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>DropdownMenu</CardTitle>
        <CardDescription>Action menu for account controls, row actions, filters, and bulk operations.</CardDescription>
      </CardHeader>
      <CardContent>
        <Inline gap="150" wrap>
          <DropdownMenu
            menuLabel="Workspace actions"
            trigger={<Button tone="neutral" variant="outline">Workspace actions</Button>}
          >
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuItem>Invite members</DropdownMenuItem>
            <DropdownMenuItem>Billing settings</DropdownMenuItem>
            <DropdownMenuItem disabled>Transfer ownership</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View audit log</DropdownMenuItem>
          </DropdownMenu>

          <DropdownMenu align="end" menuLabel="Row actions" trigger={<Button tone="neutral" variant="soft">Row actions</Button>}>
            <DropdownMenuItem>Open details</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenu>
        </Inline>
      </CardContent>
    </Card>
  );
}
