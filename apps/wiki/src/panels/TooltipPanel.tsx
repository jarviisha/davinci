import { Button, Inline, Tooltip } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const tooltipPanelMeta: PanelMeta = {
  id: "tooltip",
  label: "Tooltip",
  group: "Overlays",
  description: "Contextual help for compact controls and dense dashboard UI."
};

export function TooltipPanel() {
  return (
    <PanelSection title="Tooltip" description="Short contextual help for compact dashboard controls.">
      <Inline gap="150" wrap>
        <Tooltip content="Export the current filtered report as CSV.">
          <Button tone="neutral" variant="outline">
            Export
          </Button>
        </Tooltip>
        <Tooltip content="Sync can run once every 15 minutes." placement="bottom">
          <Button tone="neutral" variant="soft">
            Sync now
          </Button>
        </Tooltip>
      </Inline>
    </PanelSection>
  );
}
