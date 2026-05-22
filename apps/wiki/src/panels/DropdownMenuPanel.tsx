import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Inline
} from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const dropdownMenuPanelMeta: PanelMeta = {
  id: "dropdown-menu",
  label: "DropdownMenu",
  group: "Navigation",
  description: "Action menus for account controls, filters, and row actions."
};

export function DropdownMenuPanel() {
  return (
    <PanelSection
      title="DropdownMenu"
      description="Action menu for account controls, row actions, filters, and bulk operations."
    >
      <Inline gap="150" wrap>
        <DropdownMenu
          menuLabel="Workspace actions"
          trigger={
            <Button tone="neutral" variant="outline">
              Workspace actions
            </Button>
          }
        >
          <DropdownMenuLabel>Workspace</DropdownMenuLabel>
          <DropdownMenuItem>Invite members</DropdownMenuItem>
          <DropdownMenuItem>Billing settings</DropdownMenuItem>
          <DropdownMenuItem disabled>Transfer ownership</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View audit log</DropdownMenuItem>
        </DropdownMenu>

        <DropdownMenu
          align="end"
          menuLabel="Row actions"
          trigger={
            <Button tone="neutral" variant="soft">
              Row actions
            </Button>
          }
        >
          <DropdownMenuItem>Open details</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Archive</DropdownMenuItem>
        </DropdownMenu>
      </Inline>
    </PanelSection>
  );
}
