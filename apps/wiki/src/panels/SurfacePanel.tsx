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
  description: "Semantic surface, border, muted, and status roles in context."
};

export function SurfacePanel() {
  return (
    <Stack gap="300">
      <PanelSection
        title="Semantic tiers"
        description="Three background levels carry hierarchy via luminance steps."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-border bg-background p-5">
            <h4 className="text-sm font-semibold">Background</h4>
            <p className="mt-2 text-sm text-text-subtle">Base application canvas.</p>
          </article>
          <article className="rounded-lg border border-border bg-surface p-5">
            <h4 className="text-sm font-semibold">Surface</h4>
            <p className="mt-2 text-sm text-text-subtle">Grouped content area.</p>
          </article>
          <article className="rounded-lg border border-border bg-surface-raised p-5">
            <h4 className="text-sm font-semibold">Surface raised</h4>
            <p className="mt-2 text-sm text-text-subtle">Raised content area for grouped panels.</p>
          </article>
        </div>
      </PanelSection>

      <PanelSection
        title="Card variants"
        description={
          <>
            <code className="font-mono text-foreground">surface</code> uses a raised background for grouped content.{" "}
            <code className="font-mono text-foreground">outlined</code> sits on the base background with a bold border.
            Shadow is reserved for floating panels and overlays — page-level surfaces stay flat for dense product UI.
          </>
        }
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card variant="surface">
            <CardHeader>
              <CardTitle>Surface card</CardTitle>
              <CardDescription>Raised background, no shadow — quiet grouped content.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-subtle">
                The default Card treatment. Pair with the base background for two-tier hierarchy.
              </p>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Outlined card</CardTitle>
              <CardDescription>Bold border + flat background — flat aesthetic for dense layouts.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-subtle">
                Shares the parent background so cards visually integrate with the page.
              </p>
            </CardContent>
          </Card>
        </div>
      </PanelSection>

      <PanelSection title="Interaction states" description="Hovered, pressed, selected, disabled, and status surfaces.">
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
          <div className="rounded-md bg-(--davinci-semantic-color-background-disabled) px-3 py-2 text-sm font-medium text-(--davinci-semantic-color-text-disabled)">
            Disabled
          </div>
          <div className="rounded-md bg-success px-3 py-2 text-sm font-medium text-success-foreground">Success</div>
          <div className="rounded-md bg-warning px-3 py-2 text-sm font-medium text-warning-foreground">Warning</div>
          <div className="rounded-md bg-information px-3 py-2 text-sm font-medium text-information-foreground">
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
