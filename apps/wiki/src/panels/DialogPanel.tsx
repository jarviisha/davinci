import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormField,
  FormHelpText,
  Inline,
  Input,
  Label,
  Stack
} from "@jarviisha/davinci-react-ui";

export function DialogPanel() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <Stack gap="300">
      <Card>
        <CardHeader>
          <CardTitle>Dialog sizes</CardTitle>
          <CardDescription>
            Portal + focus trap + ESC to close + click-outside to dismiss. Try keyboard: Tab cycles within the
            dialog, focus returns to trigger on close.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Inline gap="150" wrap>
            <Button onClick={() => setBasicOpen(true)} tone="neutral" variant="outline">
              Open small (sm)
            </Button>
            <Button onClick={() => setConfirmOpen(true)} tone="danger">
              Open destructive confirm
            </Button>
            <Button onClick={() => setLargeOpen(true)} tone="neutral" variant="outline">
              Open large (lg) with form
            </Button>
          </Inline>
        </CardContent>
      </Card>

      <Dialog onOpenChange={setBasicOpen} open={basicOpen} size="sm">
        <DialogHeader>
          <DialogTitle>Small dialog</DialogTitle>
          <DialogDescription>
            A compact dialog. ESC, backdrop click, or the close button can dismiss it.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <p style={{ margin: 0 }}>
            This dialog renders into <code>document.body</code> via a portal. The backdrop animates in and the
            panel scales up. Focus is trapped — try pressing Tab.
          </p>
        </DialogContent>
        <DialogFooter>
          <Button onClick={() => setBasicOpen(false)} tone="neutral" variant="soft">
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog onOpenChange={setConfirmOpen} open={confirmOpen} size="sm">
        <DialogHeader>
          <DialogTitle>Delete workspace?</DialogTitle>
          <DialogDescription>
            This will permanently remove the workspace and all its data. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setConfirmOpen(false)} tone="neutral" variant="soft">
            Cancel
          </Button>
          <Button onClick={() => setConfirmOpen(false)} tone="danger">
            Delete workspace
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog onOpenChange={setLargeOpen} open={largeOpen} size="lg">
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>Fill out the project details below.</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <FormField required>
            <Label>Project name</Label>
            <Input
              onChange={(event) => setName(event.target.value)}
              placeholder="My SaaS dashboard"
              value={name}
            />
            <FormHelpText>This is shown to all workspace members.</FormHelpText>
          </FormField>
        </DialogContent>
        <DialogFooter>
          <Button onClick={() => setLargeOpen(false)} tone="neutral" variant="soft">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setLargeOpen(false);
              setName("");
            }}
          >
            Create project
          </Button>
        </DialogFooter>
      </Dialog>
    </Stack>
  );
}
