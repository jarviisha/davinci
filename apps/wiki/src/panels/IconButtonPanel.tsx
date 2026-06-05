import { IconButton, Inline } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import { EditIcon, PlusIcon, RefreshIcon, SettingsIcon, StarIcon, XIcon } from "../icons";
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
          <RefreshIcon height={24} />
        </IconButton>
        <IconButton aria-label="Edit" variant="soft">
          <EditIcon height={24} />
        </IconButton>
        <IconButton aria-label="Favorite" variant="ghost">
          <StarIcon height={24} />
        </IconButton>
        <IconButton aria-label="Delete" tone="danger" variant="outline">
          <XIcon height={24} />
        </IconButton>
        <IconButton aria-label="Create" tone="primary" variant="solid">
          <PlusIcon height={24} />
        </IconButton>
      </Inline>
      <Inline gap="150" wrap>
        <IconButton aria-label="Small settings" size="sm" variant="outline">
          <SettingsIcon height={16} />
        </IconButton>
        <IconButton aria-label="Medium settings" size="md" variant="outline">
          <SettingsIcon height={20} />
        </IconButton>
        <IconButton aria-label="Large settings" size="lg" variant="outline">
          <SettingsIcon height={28} />
        </IconButton>
      </Inline>
    </PanelSection>
  );
}
