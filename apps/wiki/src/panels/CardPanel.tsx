import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Inline,
  Stack
} from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const cardPanelMeta: PanelMeta = {
  id: "card",
  label: "Card",
  group: "Components",
  description: "Container surface with variants, semantic tones, interactive and selected states."
};

export function CardPanel() {
  return (
    <Stack gap="300">
      <PanelSection
        title="Variants"
        description="Surface treatments — elevated, surface, outlined, filled, flat, floating."
      >
        <Inline gap="200" wrap>
          <Card variant="elevated">
            <CardContent>Elevated</CardContent>
          </Card>
          <Card variant="surface">
            <CardContent>Surface</CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>Outlined</CardContent>
          </Card>
          <Card variant="filled">
            <CardContent>Filled</CardContent>
          </Card>
          <Card variant="flat">
            <CardContent>Flat</CardContent>
          </Card>
          <Card variant="floating">
            <CardContent>Floating</CardContent>
          </Card>
        </Inline>
      </PanelSection>

      <PanelSection
        title="Outlined border weight"
        description="Outlined cards can use subtle, default, or bold border emphasis."
      >
        <Inline gap="200" wrap>
          <Card outlineWeight="subtle" variant="outlined">
            <CardContent>Subtle</CardContent>
          </Card>
          <Card outlineWeight="default" variant="outlined">
            <CardContent>Default</CardContent>
          </Card>
          <Card outlineWeight="bold" variant="outlined">
            <CardContent>Bold</CardContent>
          </Card>
        </Inline>
      </PanelSection>

      <PanelSection title="Tones" description="Semantic tint applied via color-mix on background and border.">
        <Inline gap="200" wrap>
          <Card variant="outlined">
            <CardContent>Neutral</CardContent>
          </Card>
          <Card tone="info" variant="outlined">
            <CardContent>Info</CardContent>
          </Card>
          <Card tone="success" variant="outlined">
            <CardContent>Success</CardContent>
          </Card>
          <Card tone="warning" variant="outlined">
            <CardContent>Warning</CardContent>
          </Card>
          <Card tone="danger" variant="outlined">
            <CardContent>Danger</CardContent>
          </Card>
        </Inline>
      </PanelSection>

      <PanelSection
        title="Interactive"
        description={
          <>
            Adds hover, focus ring, and pointer cursor. Combines with any variant. Wrap in a button or use
            role=&ldquo;button&rdquo; for full semantics.
          </>
        }
      >
        <Inline gap="200" wrap>
          <Card interactive tabIndex={0} variant="elevated">
            <CardContent>Hover or focus</CardContent>
          </Card>
          <Card interactive tabIndex={0} variant="outlined">
            <CardContent>Hover or focus</CardContent>
          </Card>
          <Card interactive tabIndex={0} variant="filled">
            <CardContent>Hover or focus</CardContent>
          </Card>
        </Inline>
      </PanelSection>

      <PanelSection
        title="Selected"
        description="Highlighted state for picker grids — composes with any variant or tone."
      >
        <Inline gap="200" wrap>
          <Card variant="outlined">
            <CardContent>Default</CardContent>
          </Card>
          <Card selected variant="outlined">
            <CardContent>Selected</CardContent>
          </Card>
          <Card interactive selected tabIndex={0} variant="filled">
            <CardContent>Selected + interactive</CardContent>
          </Card>
        </Inline>
      </PanelSection>

      <PanelSection
        title="Composition"
        description="CardHeader, CardTitle, CardDescription, CardContent, and CardFooter sub-parts."
      >
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Project Phoenix</CardTitle>
            <CardDescription>Cross-team initiative tracker.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>32 contributors · 184 open issues · 4 milestones this quarter.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" tone="neutral" variant="ghost">
              Details
            </Button>
            <Button size="sm" variant="solid">
              Open
            </Button>
          </CardFooter>
        </Card>
      </PanelSection>
    </Stack>
  );
}
