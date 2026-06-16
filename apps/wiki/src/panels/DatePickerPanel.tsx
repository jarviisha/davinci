import { useState } from "react";
import { DatePicker, FormField, Label, Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const datePickerPanelMeta: PanelMeta = {
  id: "date-picker",
  label: "DatePicker",
  group: "Inputs",
  description: "Theme-aware calendar popover replacing the native date input, with optional time selection."
};

export function DatePickerPanel() {
  const [date, setDate] = useState<Date | null>(null);
  const [dateTime, setDateTime] = useState<Date | null>(null);

  const today = new Date();
  const rangeStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const rangeEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  return (
    <Stack gap="300">
      <PanelSection
        title="DatePicker"
        description="Click the field to open the calendar. Month and year are separate dropdowns; pick a day then confirm with OK."
      >
        <Stack gap="200" style={{ maxInlineSize: "20rem" }}>
          <DatePicker clearable onChange={setDate} value={date} />
          <span style={{ color: "var(--davinci-semantic-color-foreground-subtle)" }}>
            Value: {date ? date.toDateString() : "—"}
          </span>
        </Stack>
      </PanelSection>

      <PanelSection
        title="With time"
        description="Opt in with showTime to add hour / minute / AM–PM selects below the calendar. minuteStep sets the granularity."
      >
        <Stack gap="200" style={{ maxInlineSize: "20rem" }}>
          <DatePicker clearable minuteStep={5} onChange={setDateTime} showTime value={dateTime} />
          <span style={{ color: "var(--davinci-semantic-color-foreground-subtle)" }}>
            Value: {dateTime ? dateTime.toLocaleString() : "—"}
          </span>
        </Stack>
      </PanelSection>

      <PanelSection title="Sizes" description="Same sm / md / lg API as the other input controls.">
        <div className="grid gap-6 lg:grid-cols-3">
          <Stack gap="150">
            <Label size="sm">Small</Label>
            <DatePicker size="sm" />
          </Stack>
          <Stack gap="150">
            <Label>Medium (default)</Label>
            <DatePicker />
          </Stack>
          <Stack gap="150">
            <Label size="lg">Large</Label>
            <DatePicker size="lg" />
          </Stack>
        </div>
      </PanelSection>

      <PanelSection
        title="Constraints & states"
        description="min / max limit the selectable days; disabled and invalid match the other form controls."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <FormField helpText="Only days within the current and next month are selectable." label="Bounded range">
            <DatePicker clearable max={rangeEnd} min={rangeStart} />
          </FormField>

          <FormField helpText="FormField wires the label, help text and disabled state." label="Required" required>
            <DatePicker />
          </FormField>

          <FormField disabled helpText="Disabled passes down to the trigger." label="Disabled">
            <DatePicker />
          </FormField>

          <FormField errorText="Please choose a date." invalid label="Invalid">
            <DatePicker />
          </FormField>
        </div>
      </PanelSection>
    </Stack>
  );
}
