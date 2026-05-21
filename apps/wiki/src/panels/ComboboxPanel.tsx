import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Combobox,
  FormField,
  FormHelpText,
  Label
} from "@jarviisha/davinci-react-ui";

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
    <Card>
      <CardHeader>
        <CardTitle>Combobox</CardTitle>
        <CardDescription>Filterable single-select input for users, projects, and tags.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField>
          <Label>Owner</Label>
          <Combobox onValueChange={setOwner} options={owners} placeholder="Select owner" value={owner} />
          <FormHelpText>Type to filter, use arrow keys, then press Enter.</FormHelpText>
        </FormField>
      </CardContent>
    </Card>
  );
}
