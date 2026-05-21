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
  Input,
  Label,
  Select,
  Stack,
  Textarea
} from "@jarviisha/davinci-react-ui";

export function FormFieldPanel() {
  const [email, setEmail] = useState("");
  const emailInvalid = email.length > 0 && !email.includes("@");

  return (
    <Stack gap="300">
      <Card>
        <CardHeader>
          <CardTitle>Label</CardTitle>
          <CardDescription>Standalone label with size variants and required indicator.</CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="150">
            <Label htmlFor="lbl-sm" size="sm">Small label</Label>
            <Label htmlFor="lbl-md">Medium label (default)</Label>
            <Label htmlFor="lbl-lg" size="lg">Large label</Label>
            <Label htmlFor="lbl-req" required>Required field</Label>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
          <CardDescription>Input, Select and Textarea all expose the same sm / md / lg API.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-3">
            <Stack gap="150">
              <Label size="sm">Small</Label>
              <Input placeholder="sm input" size="sm" />
              <Select size="sm" defaultValue="a">
                <option value="a">Option A</option>
                <option value="b">Option B</option>
              </Select>
              <Textarea placeholder="sm textarea" size="sm" />
            </Stack>
            <Stack gap="150">
              <Label>Medium (default)</Label>
              <Input placeholder="md input" />
              <Select defaultValue="a">
                <option value="a">Option A</option>
                <option value="b">Option B</option>
              </Select>
              <Textarea placeholder="md textarea" />
            </Stack>
            <Stack gap="150">
              <Label size="lg">Large</Label>
              <Input placeholder="lg input" size="lg" />
              <Select size="lg" defaultValue="a">
                <option value="a">Option A</option>
                <option value="b">Option B</option>
              </Select>
              <Textarea placeholder="lg textarea" size="lg" />
            </Stack>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Input types</CardTitle>
          <CardDescription>Standard HTML types — all share border, radius, focus ring and disabled state.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <FormField>
              <Label>Email</Label>
              <Input placeholder="team@example.com" type="email" />
            </FormField>
            <FormField>
              <Label>Password</Label>
              <Input placeholder="••••••••" type="password" />
            </FormField>
            <FormField>
              <Label>Number</Label>
              <Input placeholder="42" type="number" />
            </FormField>
            <FormField>
              <Label>Search</Label>
              <Input placeholder="Search projects" type="search" />
            </FormField>
            <FormField>
              <Label>URL</Label>
              <Input placeholder="https://example.com" type="url" />
            </FormField>
            <FormField>
              <Label>Date</Label>
              <Input type="date" />
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>FormField composite</CardTitle>
          <CardDescription>
            Auto-wires id / aria-describedby / aria-invalid between Label, control, help and error text.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <FormField required>
              <Label>Email</Label>
              <Input
                onChange={(event) => setEmail(event.target.value)}
                placeholder="team@example.com"
                type="email"
                value={email}
              />
              <FormHelpText>We&apos;ll never share your email.</FormHelpText>
              <FormErrorText>Email must contain &ldquo;@&rdquo;.</FormErrorText>
            </FormField>

            <FormField invalid={emailInvalid}>
              <Label>Email (live validation)</Label>
              <Input
                onChange={(event) => setEmail(event.target.value)}
                placeholder="team@example.com"
                type="email"
                value={email}
              />
              <FormHelpText>Type something without &ldquo;@&rdquo; to see the error state.</FormHelpText>
              <FormErrorText>Email must contain &ldquo;@&rdquo;.</FormErrorText>
            </FormField>

            <FormField>
              <Label>Project</Label>
              <Select defaultValue="design">
                <option value="design">Design system</option>
                <option value="platform">Platform</option>
                <option value="playground">Playground</option>
              </Select>
              <FormHelpText>Pick where this issue belongs.</FormHelpText>
            </FormField>

            <FormField invalid>
              <Label>Notes</Label>
              <Textarea placeholder="Write a short note" />
              <FormHelpText>Hidden because field is invalid.</FormHelpText>
              <FormErrorText>This field is required.</FormErrorText>
            </FormField>

            <FormField disabled>
              <Label>Disabled input</Label>
              <Input placeholder="Cannot edit" />
              <FormHelpText>FormField passes disabled down to control.</FormHelpText>
            </FormField>

            <FormField disabled>
              <Label>Disabled select</Label>
              <Select defaultValue="a">
                <option value="a">Cannot pick</option>
              </Select>
              <FormHelpText>Same disabled treatment as Input.</FormHelpText>
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Full form example</CardTitle>
          <CardDescription>How the pieces compose into a real settings or signup flow.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            onSubmit={(event) => event.preventDefault()}
            style={{ maxInlineSize: "32rem" }}
          >
            <FormField required>
              <Label>Workspace name</Label>
              <Input placeholder="Acme Inc." />
              <FormHelpText>Shown to all members in the sidebar.</FormHelpText>
            </FormField>

            <FormField required>
              <Label>Plan</Label>
              <Select defaultValue="pro">
                <option value="starter">Starter — $9/mo</option>
                <option value="pro">Pro — $29/mo</option>
                <option value="enterprise">Enterprise</option>
              </Select>
            </FormField>

            <FormField>
              <Label>Description</Label>
              <Textarea placeholder="What is this workspace for?" size="sm" />
              <FormHelpText>Optional, used in workspace listings.</FormHelpText>
            </FormField>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
}
