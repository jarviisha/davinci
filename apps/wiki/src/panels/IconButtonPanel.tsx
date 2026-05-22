import { IconButton, Inline } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const iconButtonPanelMeta: PanelMeta = {
  id: "icon-button",
  label: "IconButton",
  group: "Inputs",
  description: "Icon-only action button with enforced accessible label."
};

export function IconButtonPanel() {
  return (
    <PanelSection title="IconButton" description={iconButtonPanelMeta.description}>
      <Inline gap="150" wrap>
        <IconButton aria-label="Refresh" variant="outline">
          ↻
        </IconButton>
        <IconButton aria-label="Edit" variant="soft">
          ✎
        </IconButton>
        <IconButton aria-label="Favorite" variant="ghost">
          ☆
        </IconButton>
        <IconButton aria-label="Delete" tone="danger" variant="outline">
          ×
        </IconButton>
        <IconButton aria-label="Create" tone="primary" variant="solid">
          +
        </IconButton>
      </Inline>
      <Inline gap="150" wrap>
        <IconButton aria-label="Small settings" size="sm" variant="outline">
          ⚙
        </IconButton>
        <IconButton aria-label="Medium settings" size="md" variant="outline">
          ⚙
        </IconButton>
        <IconButton aria-label="Large settings" size="lg" variant="outline">
          ⚙
        </IconButton>
      </Inline>
    </PanelSection>
  );
}
