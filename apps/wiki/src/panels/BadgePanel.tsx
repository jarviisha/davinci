import { Badge, Inline } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import type { PanelMeta } from "./types";

export const badgePanelMeta: PanelMeta = {
  id: "badge",
  label: "Badge",
  group: "Data display",
  description: "Badge variants for status and metadata labels."
};

export function BadgePanel() {
  return (
    <PanelSection title="Badge" description="Status and metadata labels rendered from component badge tokens.">
      <Inline gap="100" wrap>
        <Badge>Neutral</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="discovery">Discovery</Badge>
      </Inline>
    </PanelSection>
  );
}
