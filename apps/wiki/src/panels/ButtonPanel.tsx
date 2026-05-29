import { Button, Inline, Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const buttonPanelMeta: PanelMeta = {
  id: "button",
  label: "Button",
  group: "Inputs",
  description: "Button variants, sizes, and disabled states backed by component tokens."
};

export function ButtonPanel() {
  return (
    <Stack gap="300">
      <PanelSection title="Button" description="Button treatment variants combine with semantic color tones.">
        <Inline gap="150" wrap>
          <Button>Solid primary</Button>
          <Button tone="neutral">Solid neutral</Button>
          <Button tone="danger">Solid danger</Button>
          <Button tone="neutral" variant="outline">
            Outline neutral
          </Button>
          <Button tone="neutral" variant="soft">
            Soft neutral
          </Button>
          <Button tone="neutral" variant="ghost">
            Ghost neutral
          </Button>
        </Inline>
        <Inline gap="150" wrap>
          <Button variant="outline">Outline primary</Button>
          <Button tone="danger" variant="outline">
            Outline danger
          </Button>
          <Button variant="soft">Soft primary</Button>
          <Button tone="danger" variant="soft">
            Soft danger
          </Button>
          <Button variant="ghost">Ghost primary</Button>
          <Button tone="danger" variant="ghost">
            Ghost danger
          </Button>
        </Inline>
        <Inline gap="150" wrap>
          <Button size="sm" tone="neutral" variant="outline">
            Small
          </Button>
          <Button size="md" tone="neutral" variant="outline">
            Medium
          </Button>
          <Button size="lg" tone="neutral" variant="outline">
            Large
          </Button>
        </Inline>
      </PanelSection>

      <PanelSection
        title="Disabled states"
        description="Every variant and tone shares the same disabled tokens, so the disabled treatment stays consistent while each variant keeps its own chrome shape."
      >
        <Inline gap="150" wrap>
          <Button disabled>Solid primary</Button>
          <Button disabled tone="neutral">
            Solid neutral
          </Button>
          <Button disabled tone="danger">
            Solid danger
          </Button>
        </Inline>
        <Inline gap="150" wrap>
          <Button disabled variant="outline">
            Outline primary
          </Button>
          <Button disabled tone="neutral" variant="outline">
            Outline neutral
          </Button>
          <Button disabled tone="danger" variant="outline">
            Outline danger
          </Button>
        </Inline>
        <Inline gap="150" wrap>
          <Button disabled variant="soft">
            Soft primary
          </Button>
          <Button disabled tone="neutral" variant="soft">
            Soft neutral
          </Button>
          <Button disabled tone="danger" variant="soft">
            Soft danger
          </Button>
        </Inline>
        <Inline gap="150" wrap>
          <Button disabled variant="ghost">
            Ghost primary
          </Button>
          <Button disabled tone="neutral" variant="ghost">
            Ghost neutral
          </Button>
          <Button disabled tone="danger" variant="ghost">
            Ghost danger
          </Button>
        </Inline>
      </PanelSection>
    </Stack>
  );
}
