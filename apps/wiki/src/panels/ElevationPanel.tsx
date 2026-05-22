import { Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import { copyText, themeTokensByPrefix, tokensByPrefix, typographyStyle, varValue } from "../lib/tokens";
import { TokenTable } from "./TokenTable";
import type { PanelMeta } from "./types";

export const elevationPanelMeta: PanelMeta = {
  id: "elevation",
  label: "Elevation",
  group: "Foundations",
  description: "Theme-aware shadows and layered surface depth."
};

const elevationPreviews = [
  {
    label: "Card",
    token: "--davinci-semantic-shadow-card",
    description: "Low emphasis surface shadow for cards and contained regions."
  },
  {
    label: "Raised",
    token: "--davinci-semantic-shadow-raised",
    description: "Medium emphasis shadow for popovers, sticky panels, and floating controls."
  },
  {
    label: "Overlay",
    token: "--davinci-semantic-shadow-overlay",
    description: "High emphasis shadow for dialogs, overlays, and temporary layers."
  }
];

export function ElevationPanel() {
  const primitiveShadowTokens = tokensByPrefix("shadow.");
  const semanticShadowTokens = themeTokensByPrefix("light", "semantic.shadow.");

  return (
    <Stack gap="300">
      <PanelSection
        title="Elevation"
        description="Theme-aware shadows for layered surfaces. Values resolve through semantic shadow tokens."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {elevationPreviews.map((item) => (
            <button
              className="rounded-panel border border-border bg-surface-raised p-300 text-left"
              key={item.token}
              onClick={() => void copyText(`var(${item.token})`)}
              style={{ boxShadow: varValue(item.token) }}
              type="button"
            >
              <span className="block font-semibold" style={typographyStyle("heading-sm")}>
                {item.label}
              </span>
              <span className="mt-2 block text-text-subtle" style={typographyStyle("body-small")}>
                {item.description}
              </span>
              <span className="mt-4 block truncate font-mono text-text-muted" style={typographyStyle("code")}>
                {item.token}
              </span>
            </button>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Semantic shadow tokens" description="Active theme resolves these to primitive shadow values.">
        <TokenTable title="Semantic shadow tokens" tokens={semanticShadowTokens} />
      </PanelSection>

      <PanelSection title="Primitive shadow tokens" description="Theme-agnostic source values.">
        <TokenTable title="Primitive shadow tokens" tokens={primitiveShadowTokens} />
      </PanelSection>
    </Stack>
  );
}
