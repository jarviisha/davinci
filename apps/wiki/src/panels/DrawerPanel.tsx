import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

export function DrawerPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Drawer</CardTitle>
          <CardDescription>Side panel for detail views and compact edit forms.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setOpen(true)} tone="neutral" variant="outline">Open drawer</Button>
        </CardContent>
      </Card>

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
            <Button onClick={() => setOpen(false)} tone="neutral" variant="soft">Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </Inline>
        </DrawerFooter>
      </Drawer>
    </>
  );
}
