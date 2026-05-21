import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormField,
  FormHelpText,
  Label,
  Stack,
  Switch
} from "@jarviisha/davinci-react-ui";

export function SwitchPanel() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <Stack gap="300">
      <Card variant="filled">
        <CardHeader>
          <CardTitle>Switch</CardTitle>
          <CardDescription>
            Native checkbox with role=&ldquo;switch&rdquo; — works inside &lt;form&gt;, exposes a name/value.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="200">
            <Switch
              checked={notifications}
              label="Email notifications"
              onChange={(event) => setNotifications(event.target.checked)}
            />
            <Switch
              checked={marketing}
              label="Marketing emails"
              onChange={(event) => setMarketing(event.target.checked)}
            />
            <Switch disabled label="Disabled (off)" />
            <Switch defaultChecked disabled label="Disabled (on)" />
            <Switch size="sm" defaultChecked label="Small" />
            <Switch size="md" defaultChecked label="Medium (default)" />
          </Stack>
        </CardContent>
      </Card>

      <Card variant="filled">
        <CardHeader>
          <CardTitle>Inside FormField</CardTitle>
          <CardDescription>FormField context provides id + describedby wiring.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField>
            <Label>Two-factor authentication</Label>
            <Switch label="Require 2FA for this workspace" />
            <FormHelpText>Members will be asked to verify on their next sign-in.</FormHelpText>
          </FormField>
        </CardContent>
      </Card>
    </Stack>
  );
}
