import { useState } from "react";
import { Combobox, FormField, FormHelpText, Label } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const comboboxPanelMeta: PanelMeta = {
  id: "combobox",
  label: "Combobox",
  group: "Inputs",
  description: "Filterable single-select input for users, projects, and tags."
};

const owners = [
  { label: "Ada Lovelace", value: "ada" },
  { label: "Grace Hopper", value: "grace" },
  { label: "Katherine Johnson", value: "katherine" },
  { label: "Mina Park", value: "mina" },
  { disabled: true, label: "Archived owner", value: "archived" }
];

export function ComboboxPanel() {
  const [owner, setOwner] = useState("mina");

  return (
    <PanelSection title="Combobox" description={comboboxPanelMeta.description}>
      <FormField>
        <Label>Owner</Label>
        <Combobox onValueChange={setOwner} options={owners} placeholder="Select owner" value={owner} />
        <FormHelpText>Type to filter, use arrow keys, then press Enter.</FormHelpText>
      </FormField>
    </PanelSection>
  );
}
