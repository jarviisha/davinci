import { useState } from "react";
import {
  FormErrorText,
  FormField,
  FormHelpText,
  Label,
  Radio,
  RadioGroup,
  Stack
} from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const radioPanelMeta: PanelMeta = {
  id: "radio",
  label: "Radio",
  group: "Inputs",
  description: "RadioGroup + Radio with horizontal and vertical orientations."
};

export function RadioPanel() {
  const [plan, setPlan] = useState("pro");
  const [billing, setBilling] = useState("monthly");

  return (
    <Stack gap="300">
      <PanelSection
        title="RadioGroup (vertical)"
        description="Group manages name + value; child Radio reads from context."
      >
        <RadioGroup name="plan" onValueChange={setPlan} value={plan}>
          <Radio label="Starter — $9/mo" value="starter" />
          <Radio label="Pro — $29/mo" value="pro" />
          <Radio label="Enterprise — Talk to sales" value="enterprise" />
          <Radio disabled label="Legacy (disabled)" value="legacy" />
        </RadioGroup>
        <p
          style={{
            color: "var(--davinci-semantic-color-foreground-subtle)",
            fontSize: "0.875rem",
            marginBlockStart: "0.75rem"
          }}
        >
          Selected: {plan}
        </p>
      </PanelSection>

      <PanelSection
        title="Horizontal layout"
        description={<>Use orientation=&ldquo;horizontal&rdquo; for inline radio choices.</>}
      >
        <RadioGroup name="billing" onValueChange={setBilling} orientation="horizontal" value={billing}>
          <Radio label="Monthly" value="monthly" />
          <Radio label="Yearly (save 20%)" value="yearly" />
        </RadioGroup>
      </PanelSection>

      <PanelSection title="Inside FormField" description="Invalid state propagates to all radios in the group.">
        <FormField invalid required>
          <Label>Pick a tier</Label>
          <RadioGroup name="tier">
            <Radio label="Free" value="free" />
            <Radio label="Paid" value="paid" />
          </RadioGroup>
          <FormHelpText>Choose one option.</FormHelpText>
          <FormErrorText>Please select a tier.</FormErrorText>
        </FormField>
      </PanelSection>
    </Stack>
  );
}
