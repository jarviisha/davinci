import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  FormField,
  FormHelpText,
  Inline,
  Input,
  Label,
  Stack
} from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const drawerPanelMeta: PanelMeta = {
  id: "drawer",
  label: "Drawer",
  group: "Overlays",
  description: "Side panel for detail views and compact edit forms."
};

export function DrawerPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PanelSection title="Drawer" description={drawerPanelMeta.description}>
        <Button onClick={() => setOpen(true)} tone="neutral" variant="outline">
          Open drawer
        </Button>
      </PanelSection>

      <Drawer onOpenChange={setOpen} open={open}>
        <DrawerHeader>
          <DrawerTitle>Edit customer</DrawerTitle>
          <DrawerDescription>Update account details without leaving the dashboard.</DrawerDescription>
        </DrawerHeader>
        <DrawerContent>
          <Stack gap="200">
            <FormField>
              <Label>Company</Label>
              <Input defaultValue="Acme Inc." />
              <FormHelpText>Shown in reports and invoices.</FormHelpText>
            </FormField>
            <FormField>
              <Label>Owner</Label>
              <Input defaultValue="Mina Park" />
            </FormField>
          </Stack>
        </DrawerContent>
        <DrawerFooter>
          <Inline gap="100">
            <Button onClick={() => setOpen(false)} tone="neutral" variant="soft">
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </Inline>
        </DrawerFooter>
      </Drawer>
    </>
  );
}
