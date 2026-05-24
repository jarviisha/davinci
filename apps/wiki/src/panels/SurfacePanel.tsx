import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Stack
} from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const surfacePanelMeta: PanelMeta = {
  id: "surface",
  label: "Surface",
  group: "Foundations",
  description: "Single-canvas surface philosophy: borders separate, fills emphasize."
};

export function SurfacePanel() {
  return (
    <Stack gap="300">
      <PanelSection
        title="Single canvas"
        description="The whole app reads as one color. Sidebars, headers, main, and default cards all share background. Separation is done with borders, not surface tiers. Fills are reserved for intentional emphasis."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-border p-5">
            <h4 className="text-sm font-semibold">background</h4>
            <p className="mt-2 text-sm text-foreground-subtle">
              The canvas. Everything — AppShell regions, default cards, panels — defaults here. Light: <code className="font-mono">#FFFFFF</code>. Dark: <code className="font-mono">#18191A</code>.
            </p>
          </article>
          <article className="rounded-lg border border-border p-5">
            <h4 className="text-sm font-semibold">surface</h4>
            <p className="mt-2 text-sm text-foreground-subtle">
              Alias of <code className="font-mono">background</code> in defaults. Kept as a stable API so custom themes can re-introduce a tiered chrome layer without changing component code.
            </p>
          </article>
        </div>
      </PanelSection>

      <PanelSection
        title="Role-based exceptions"
        description="Two surfaces deviate from the canvas — each tied to a specific role."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-border bg-surface-sunken p-5">
            <h4 className="text-sm font-semibold">surface-sunken</h4>
            <p className="mt-2 text-sm text-foreground-subtle">
              Inset wells — code blocks, comparison panes, zebra rows. One step darker than canvas. Use when content should feel <em>set into</em> the page.
            </p>
          </article>
          <article
            className="rounded-lg border border-border p-5"
            style={{
              background: "var(--davinci-semantic-color-surface-raised)",
              boxShadow: "var(--davinci-semantic-shadow-overlay)"
            }}
          >
            <h4 className="text-sm font-semibold">surface-raised</h4>
            <p className="mt-2 text-sm text-foreground-subtle">
              True float overlays — popovers, dropdown menus, dialogs. Always paired with an overlay shadow. In light mode it equals canvas (shadow does the lift); in dark it sits lighter for clarity.
            </p>
          </article>
        </div>
      </PanelSection>

      <PanelSection
        title="Card emphasis ladder"
        description="Pick the lightest variant that conveys the intent. Default is border-only — escalate to a filled variant only when the content needs to stand out."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>Border on canvas — the baseline.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground-subtle">
                No fill. Use for most grouped content — lists, sections, settings groups.
              </p>
            </CardContent>
          </Card>
          <Card variant="filled">
            <CardHeader>
              <CardTitle>Filled</CardTitle>
              <CardDescription>Mild emphasis — backgroundSubtle fill.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground-subtle">
                Sub-panels and neutral callouts. Subtle enough to nest inside another container.
              </p>
            </CardContent>
          </Card>
          <Card tone="info" variant="outlined">
            <CardHeader>
              <CardTitle>Tone (info / success / warning / danger)</CardTitle>
              <CardDescription>Status is the message — not decoration.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground-subtle">
                Reserved for cards where the status meaningfully changes the read: blocked, succeeded, attention required.
              </p>
            </CardContent>
          </Card>
          <Card selected variant="outlined">
            <CardHeader>
              <CardTitle>Selected</CardTitle>
              <CardDescription>Primary tint — current selection in a list or grid.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground-subtle">
                Composes with any variant. Pair with <code className="font-mono">interactive</code> for picker grids.
              </p>
            </CardContent>
          </Card>
        </div>
      </PanelSection>

      <PanelSection
        title="Interaction states"
        description="Hovered, pressed, selected, disabled, and status surfaces."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-(--davinci-semantic-color-background-hovered) px-3 py-2 text-sm font-medium text-foreground">
            Hovered
          </div>
          <div className="rounded-md bg-(--davinci-semantic-color-background-pressed) px-3 py-2 text-sm font-medium text-foreground">
            Pressed
          </div>
          <div className="rounded-md bg-(--davinci-semantic-color-background-selected) px-3 py-2 text-sm font-medium text-foreground">
            Selected
          </div>
          <div className="rounded-md bg-(--davinci-semantic-color-background-disabled) px-3 py-2 text-sm font-medium text-(--davinci-semantic-color-foreground-disabled)">
            Disabled
          </div>
          <div className="rounded-md bg-success px-3 py-2 text-sm font-medium text-success-foreground">Success</div>
          <div className="rounded-md bg-warning px-3 py-2 text-sm font-medium text-warning-foreground">Warning</div>
          <div className="rounded-md bg-info px-3 py-2 text-sm font-medium text-info-foreground">
            Information
          </div>
          <div className="rounded-md bg-discovery px-3 py-2 text-sm font-medium text-discovery-foreground">
            Discovery
          </div>
        </div>
      </PanelSection>
    </Stack>
  );
}
