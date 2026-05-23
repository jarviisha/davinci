import { Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import { tokensByPrefix, typographySamples, typographyStyle } from "../lib/tokens";
import { TokenTable } from "./TokenTable";
import type { PanelMeta } from "./types";

export const typographyPanelMeta: PanelMeta = {
  id: "typography",
  label: "Typography",
  group: "Foundations",
  description: "Text roles, font scale, line height, weight, and letter spacing."
};

export function TypographyPanel() {
  const typographyTokens = tokensByPrefix("typography.");
  const fontTokens = [
    ...tokensByPrefix("font.size."),
    ...tokensByPrefix("font.lineHeight."),
    ...tokensByPrefix("font.weight."),
    ...tokensByPrefix("font.letterSpacing.")
  ];

  return (
    <Stack gap="300">
      <PanelSection
        title="Type roles"
        description="Text roles are composed from primitive font size, line height, weight, and letter spacing tokens."
      >
        <div className="flex flex-col gap-(--davinci-spacing-300)">
          {typographySamples.map((sample) => (
            <div
              className="grid gap-2 border-b border-border pb-(--davinci-spacing-200) last:border-b-0 last:pb-0"
              key={sample.token}
            >
              <span className="font-medium text-foreground-subtlest" style={typographyStyle("label")}>
                {sample.label}
              </span>
              <p className={sample.role === "code" ? "font-mono" : undefined} style={typographyStyle(sample.role)}>
                The quick brown fox jumps over the lazy dog.
              </p>
              <span className="font-mono text-foreground-subtle" style={typographyStyle("code")}>
                {sample.token}
              </span>
            </div>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Typography role tokens" description="Composed role tokens.">
        <TokenTable title="Typography role tokens" tokens={typographyTokens} />
      </PanelSection>

      <PanelSection title="Primitive font tokens" description="Source font primitives composing the roles above.">
        <TokenTable title="Primitive font tokens" tokens={fontTokens} />
      </PanelSection>
    </Stack>
  );
}
