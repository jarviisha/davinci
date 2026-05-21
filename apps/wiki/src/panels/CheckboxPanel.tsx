import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  FormErrorText,
  FormField,
  FormHelpText,
  Label,
  Stack
} from "@jarviisha/davinci-react-ui";

export function CheckboxPanel() {
  const [items, setItems] = useState({ a: true, b: false, c: false });
  const allChecked = items.a && items.b && items.c;
  const someChecked = items.a || items.b || items.c;
  const indeterminate = !allChecked && someChecked;

  function toggleAll(checked: boolean) {
    setItems({ a: checked, b: checked, c: checked });
  }

  return (
    <Stack gap="300">
      <Card>
        <CardHeader>
          <CardTitle>Checkbox</CardTitle>
          <CardDescription>Native checkbox wrapped with token-driven custom styling.</CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="200">
            <Checkbox label="Unchecked" />
            <Checkbox defaultChecked label="Checked" />
            <Checkbox disabled label="Disabled" />
            <Checkbox defaultChecked disabled label="Disabled + checked" />
            <Checkbox size="sm" defaultChecked label="Small" />
            <Checkbox size="md" defaultChecked label="Medium (default)" />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Indeterminate state</CardTitle>
          <CardDescription>Parent toggles indeterminate when only some children are checked.</CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="150">
            <Checkbox
              checked={allChecked}
              indeterminate={indeterminate}
              label="Select all"
              onChange={(event) => toggleAll(event.target.checked)}
            />
            <Stack gap="100" style={{ paddingInlineStart: "1.5rem" }}>
              <Checkbox
                checked={items.a}
                label="Item A"
                onChange={(event) => setItems((prev) => ({ ...prev, a: event.target.checked }))}
              />
              <Checkbox
                checked={items.b}
                label="Item B"
                onChange={(event) => setItems((prev) => ({ ...prev, b: event.target.checked }))}
              />
              <Checkbox
                checked={items.c}
                label="Item C"
                onChange={(event) => setItems((prev) => ({ ...prev, c: event.target.checked }))}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inside FormField</CardTitle>
          <CardDescription>Inherits invalid + required state from FormField context.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField invalid required>
            <Label>Accept terms</Label>
            <Checkbox label="I agree to the terms of service" />
            <FormHelpText>Required to continue.</FormHelpText>
            <FormErrorText>You must accept the terms before continuing.</FormErrorText>
          </FormField>
        </CardContent>
      </Card>
    </Stack>
  );
}
