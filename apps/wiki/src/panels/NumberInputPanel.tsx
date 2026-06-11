import { useState } from "react";
import { FormField, Label, NumberInput, Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const numberInputPanelMeta: PanelMeta = {
  id: "number-input",
  label: "NumberInput",
  group: "Inputs",
  description: "Number field with custom themed steppers replacing the native browser spinners."
};

export function NumberInputPanel() {
  const [quantity, setQuantity] = useState(1);

  return (
    <Stack gap="300">
      <PanelSection
        title="NumberInput"
        description="Controlled number field. The ▲ / ▼ steppers respect min, max and step, and fire onChange like typing."
      >
        <Stack gap="200" style={{ maxInlineSize: "16rem" }}>
          <NumberInput
            min={0}
            max={10}
            onChange={(event) => setQuantity(event.target.valueAsNumber)}
            step={1}
            value={Number.isNaN(quantity) ? "" : quantity}
          />
          <span style={{ color: "var(--davinci-semantic-color-foreground-subtle)" }}>Value: {quantity}</span>
        </Stack>
      </PanelSection>

      <PanelSection title="Sizes" description="Same sm / md / lg API as the other input controls.">
        <div className="grid gap-6 lg:grid-cols-3">
          <Stack gap="150">
            <Label size="sm">Small</Label>
            <NumberInput defaultValue={5} size="sm" />
          </Stack>
          <Stack gap="150">
            <Label>Medium (default)</Label>
            <NumberInput defaultValue={5} />
          </Stack>
          <Stack gap="150">
            <Label size="lg">Large</Label>
            <NumberInput defaultValue={5} size="lg" />
          </Stack>
        </div>
      </PanelSection>

      <PanelSection
        title="Constraints & states"
        description="min / max / step constrain the steppers; disabled greys out the field and both buttons."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <FormField helpText="Steps by 5, clamped between 0 and 100." label="Percentage">
            <NumberInput defaultValue={20} max={100} min={0} step={5} />
          </FormField>

          <FormField helpText="Decimal step." label="Price">
            <NumberInput defaultValue={9.99} min={0} step={0.01} />
          </FormField>

          <FormField disabled helpText="Disabled passes down to the field and steppers." label="Disabled">
            <NumberInput defaultValue={42} />
          </FormField>

          <FormField invalid errorText="Must be at least 1." label="Invalid">
            <NumberInput defaultValue={0} min={1} />
          </FormField>
        </div>
      </PanelSection>
    </Stack>
  );
}
