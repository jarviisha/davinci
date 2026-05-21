import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormErrorText,
  FormField,
  FormHelpText,
  Label,
  Radio,
  RadioGroup,
  Stack
} from "@jarviisha/davinci-react-ui";

export function RadioPanel() {
  const [plan, setPlan] = useState("pro");
  const [billing, setBilling] = useState("monthly");

  return (
    <Stack gap="300">
      <Card variant="filled">
        <CardHeader>
          <CardTitle>RadioGroup (vertical)</CardTitle>
          <CardDescription>Group manages name + value; child Radio reads from context.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup name="plan" onValueChange={setPlan} value={plan}>
            <Radio label="Starter — $9/mo" value="starter" />
            <Radio label="Pro — $29/mo" value="pro" />
            <Radio label="Enterprise — Talk to sales" value="enterprise" />
            <Radio disabled label="Legacy (disabled)" value="legacy" />
          </RadioGroup>
          <p style={{ color: "var(--davinci-semantic-color-text-subtle)", fontSize: "0.875rem", marginBlockStart: "0.75rem" }}>
            Selected: {plan}
          </p>
        </CardContent>
      </Card>

      <Card variant="filled">
        <CardHeader>
          <CardTitle>Horizontal layout</CardTitle>
          <CardDescription>Use orientation=&ldquo;horizontal&rdquo; for inline radio choices.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup name="billing" onValueChange={setBilling} orientation="horizontal" value={billing}>
            <Radio label="Monthly" value="monthly" />
            <Radio label="Yearly (save 20%)" value="yearly" />
          </RadioGroup>
        </CardContent>
      </Card>

      <Card variant="filled">
        <CardHeader>
          <CardTitle>Inside FormField</CardTitle>
          <CardDescription>Invalid state propagates to all radios in the group.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField invalid required>
            <Label>Pick a tier</Label>
            <RadioGroup name="tier">
              <Radio label="Free" value="free" />
              <Radio label="Paid" value="paid" />
            </RadioGroup>
            <FormHelpText>Choose one option.</FormHelpText>
            <FormErrorText>Please select a tier.</FormErrorText>
          </FormField>
        </CardContent>
      </Card>
    </Stack>
  );
}
