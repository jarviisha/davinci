import { useState } from "react";
import { FormField, FormHelpText, Label, Stack, Switch } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const switchPanelMeta: PanelMeta = {
  id: "switch",
  label: "Switch",
  group: "Inputs",
  description: "Toggle switch backed by a native checkbox with role=switch."
};

export function SwitchPanel() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <Stack gap="300">
      <PanelSection
        title="Switch"
        description={
          <>Native checkbox with role=&ldquo;switch&rdquo; — works inside &lt;form&gt;, exposes a name/value.</>
        }
      >
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
      </PanelSection>

      <PanelSection title="Inside FormField" description="FormField context provides id + describedby wiring.">
        <FormField>
          <Label>Two-factor authentication</Label>
          <Switch label="Require 2FA for this workspace" />
          <FormHelpText>Members will be asked to verify on their next sign-in.</FormHelpText>
        </FormField>
      </PanelSection>
    </Stack>
  );
}
