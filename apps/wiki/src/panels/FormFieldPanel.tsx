import { useState } from "react";
import {
  FormErrorText,
  FormField,
  FormHelpText,
  Input,
  Label,
  Select,
  Stack,
  Textarea
} from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const formFieldPanelMeta: PanelMeta = {
  id: "form-field",
  label: "FormField",
  group: "Components",
  description: "Label + FormField composite with Input, Select, Textarea and auto-wired aria attributes."
};

export function FormFieldPanel() {
  const [email, setEmail] = useState("");
  const emailInvalid = email.length > 0 && !email.includes("@");

  return (
    <Stack gap="300">
      <PanelSection title="Label" description="Standalone label with size variants and required indicator.">
        <Stack gap="150">
          <Label htmlFor="lbl-sm" size="sm">
            Small label
          </Label>
          <Label htmlFor="lbl-md">Medium label (default)</Label>
          <Label htmlFor="lbl-lg" size="lg">
            Large label
          </Label>
          <Label htmlFor="lbl-req" required>
            Required field
          </Label>
        </Stack>
      </PanelSection>

      <PanelSection title="Sizes" description="Input, Select and Textarea all expose the same sm / md / lg API.">
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
      </PanelSection>

      <PanelSection
        title="Input types"
        description="Standard HTML types — all share border, radius, focus ring and disabled state."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <FormField label="Email">
            <Input placeholder="team@example.com" type="email" />
          </FormField>
          <FormField label="Password">
            <Input placeholder="••••••••" type="password" />
          </FormField>
          <FormField label="Number">
            <Input placeholder="42" type="number" />
          </FormField>
          <FormField label="Search">
            <Input placeholder="Search projects" type="search" />
          </FormField>
          <FormField label="URL">
            <Input placeholder="https://example.com" type="url" />
          </FormField>
          <FormField label="Date">
            <Input type="date" />
          </FormField>
        </div>
      </PanelSection>

      <PanelSection
        title="FormField composition (escape hatch)"
        description={
          <>
            Compose <code>Label</code>, <code>FormHelpText</code>, and <code>FormErrorText</code> as children directly
            when the shortcut props are not enough — custom icons inside the label, extra slots between rows,
            non-standard ordering. The id / aria wiring is identical to the prop-driven form.
          </>
        }
      >
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
      </PanelSection>

      <PanelSection
        title="FormField shortcut props"
        description={
          <>
            Pass <code>label</code>, <code>helpText</code>, and <code>errorText</code> directly on FormField instead of
            composing Label / FormHelpText / FormErrorText children. Render order is fixed (label → control → help →
            error); switch to composition when you need icons, custom layout, or extra slots.
          </>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <FormField helpText="We'll never share your email." label="Email" required>
            <Input placeholder="team@example.com" type="email" />
          </FormField>

          <FormField
            errorText="Email must contain &ldquo;@&rdquo;."
            helpText="Type without @ to see the error."
            invalid={emailInvalid}
            label="Email (live validation)"
          >
            <Input
              onChange={(event) => setEmail(event.target.value)}
              placeholder="team@example.com"
              type="email"
              value={email}
            />
          </FormField>

          <FormField helpText="Pick where this issue belongs." label="Project">
            <Select defaultValue="design">
              <option value="design">Design system</option>
              <option value="platform">Platform</option>
              <option value="playground">Playground</option>
            </Select>
          </FormField>

          <FormField disabled helpText="FormField passes disabled down to control." label="Disabled input">
            <Input placeholder="Cannot edit" />
          </FormField>
        </div>
      </PanelSection>

      <PanelSection title="Full form example" description="How the pieces compose into a real settings or signup flow.">
        <form
          className="grid gap-4"
          onSubmit={(event) => event.preventDefault()}
          style={{ maxInlineSize: "32rem" }}
        >
          <FormField helpText="Shown to all members in the sidebar." label="Workspace name" required>
            <Input placeholder="Acme Inc." />
          </FormField>

          <FormField label="Plan" required>
            <Select defaultValue="pro">
              <option value="starter">Starter — $9/mo</option>
              <option value="pro">Pro — $29/mo</option>
              <option value="enterprise">Enterprise</option>
            </Select>
          </FormField>

          <FormField helpText="Optional, used in workspace listings." label="Description">
            <Textarea placeholder="What is this workspace for?" size="sm" />
          </FormField>
        </form>
      </PanelSection>
    </Stack>
  );
}
