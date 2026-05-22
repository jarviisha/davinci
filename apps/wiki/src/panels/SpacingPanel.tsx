import { Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import { copyText, tokensByPrefix, tokenStep, typographyStyle, varValue } from "../lib/tokens";
import { TokenTable } from "./TokenTable";
import type { PanelMeta } from "./types";

export const spacingPanelMeta: PanelMeta = {
  id: "spacing",
  label: "Spacing",
  group: "Foundations",
  description: "Spacing scale for layout rhythm, padding, and gaps."
};

export function SpacingPanel() {
  const spacingTokens = tokensByPrefix("spacing.").filter(
    (token) => !["1", "2", "3", "4", "6", "8"].includes(tokenStep(token.name))
  );

  return (
    <Stack gap="300">
      <PanelSection
        title="Scale preview"
        description="Platform spacing scale for layout gaps, padding, and component rhythm."
      >
        <div className="grid gap-(--davinci-spacing-200)">
          {spacingTokens.map((token) => (
            <button
              className="grid grid-cols-[5rem_minmax(0,1fr)_7rem] items-center gap-(--davinci-spacing-200) rounded-md p-(--davinci-spacing-100) text-left hover:bg-muted"
              key={token.name}
              onClick={() => void copyText(token.name)}
              type="button"
            >
              <span className="font-mono text-text-muted" style={typographyStyle("code")}>
                {tokenStep(token.name)}
              </span>
              <span
                className="h-(--davinci-spacing-300) rounded-sm bg-primary"
                style={{ width: varValue(token.cssVar) }}
              />
              <span className="truncate text-text-subtle" style={typographyStyle("body-small")}>
                {token.value}
              </span>
            </button>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Tokens" description="Full spacing token list.">
        <TokenTable title="Spacing tokens" tokens={spacingTokens} />
      </PanelSection>
    </Stack>
  );
}
