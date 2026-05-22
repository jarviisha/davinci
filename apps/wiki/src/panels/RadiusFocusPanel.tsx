import { Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import { copyText, tokensByPrefix, tokenStep, typographyStyle, varValue } from "../lib/tokens";
import { TokenTable } from "./TokenTable";
import type { PanelMeta } from "./types";

export const radiusFocusPanelMeta: PanelMeta = {
  id: "radius-focus",
  label: "Radius & Focus",
  group: "Foundations",
  description: "Shape tokens and keyboard focus ring behavior."
};

const radiusPreviewTokens = ["radius.none", "radius.sm", "radius.md", "radius.lg", "radius.xl", "radius.full"];

export function RadiusFocusPanel() {
  const radiusTokens = tokensByPrefix("radius.");
  const focusTokens = tokensByPrefix("focus.");

  return (
    <Stack gap="300">
      <PanelSection
        title="Radius scale"
        description="Shape roles for surfaces and controls. Click a swatch to copy its CSS variable."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {radiusPreviewTokens.map((name) => {
            const token = radiusTokens.find((item) => item.name === name);

            if (!token) {
              return null;
            }

            return (
              <button
                className="border border-border bg-background p-(--davinci-spacing-200) text-left"
                key={token.name}
                onClick={() => void copyText(token.cssVar)}
                style={{ borderRadius: varValue(token.cssVar) }}
                type="button"
              >
                <span className="block font-medium">{tokenStep(token.name)}</span>
                <span className="mt-1 block text-text-subtle" style={typographyStyle("body-small")}>
                  {token.value}
                </span>
              </button>
            );
          })}
        </div>
      </PanelSection>

      <PanelSection title="Focus ring" description="Use keyboard focus to inspect ring width, offset, and color.">
        <div className="flex flex-wrap gap-3">
          <button
            className="davinci-focus-ring inline-flex h-10 items-center justify-center rounded-(--davinci-radius-control) border border-transparent bg-primary px-4 text-sm font-medium leading-none text-primary-foreground outline-none"
            type="button"
          >
            Focusable primary
          </button>
          <button
            className="davinci-focus-ring inline-flex h-10 items-center justify-center rounded-(--davinci-radius-control) border border-border bg-background px-4 text-sm font-medium leading-none text-foreground outline-none"
            type="button"
          >
            Focusable secondary
          </button>
        </div>
      </PanelSection>

      <PanelSection title="Tokens" description="Full radius and focus token list.">
        <Stack gap="300">
          <TokenTable title="Radius tokens" tokens={radiusTokens} />
          <TokenTable title="Focus tokens" tokens={focusTokens} />
        </Stack>
      </PanelSection>
    </Stack>
  );
}
