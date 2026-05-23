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

type PolicyCategory = {
  title: string;
  steps: string[];
  reach: string;
  example: string;
};

const policyCategories: PolicyCategory[] = [
  {
    title: "Grid · multiples of 8",
    steps: ["100", "200", "300", "400", "500", "600", "800", "1000"],
    reach: "Default. Use for layout rhythm — page gaps, section padding, stack and inline spacing.",
    example: "Card padding, Stack gap, AppShell paddings, button md/lg height."
  },
  {
    title: "Fine-tune · 2 / 4",
    steps: ["025", "050"],
    reach: "Sub-pixel adjustments inside controls. Reach for these when alignment needs a nudge, not a step.",
    example: "Focus ring offset, icon-to-label gap, divider thickness areas."
  },
  {
    title: "Half-step · 6 / 12 / 20",
    steps: ["075", "150", "250"],
    reach: "Compact-control density. Use when 8 feels cramped and 16 feels loose — typically inside small/medium controls.",
    example: "Button sm padding, Nav item padding, Input paddingX, Toast gap, FormField label gap."
  }
];

export function SpacingPanel() {
  const spacingTokens = tokensByPrefix("spacing.").filter(
    (token) => !["1", "2", "3", "4", "6", "8"].includes(tokenStep(token.name))
  );

  function findToken(step: string) {
    return spacingTokens.find((token) => tokenStep(token.name) === step);
  }

  return (
    <Stack gap="300">
      <PanelSection
        title="Scale rhythm"
        description="The scale revolves around an 8px grid for layout, with 2/4px fine-tune for in-control nudges and three half-step values (6, 12, 20) for compact controls that fall between grid steps. Pick the smallest category that satisfies the design — do not introduce arbitrary values outside this set."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {policyCategories.map((category) => (
            <article
              className="flex flex-col gap-3 rounded-lg border border-border bg-surface-raised p-4"
              key={category.title}
            >
              <header>
                <h3 className="text-sm font-semibold">{category.title}</h3>
                <p className="mt-1 text-xs text-foreground-subtle">{category.reach}</p>
              </header>
              <div className="grid gap-1.5">
                {category.steps.map((step) => {
                  const token = findToken(step);

                  if (!token) {
                    return null;
                  }

                  return (
                    <button
                      className="grid grid-cols-[3rem_minmax(0,1fr)_3.5rem] items-center gap-2 rounded-md p-1 text-left hover:bg-background-subtle"
                      key={token.name}
                      onClick={() => void copyText(token.name)}
                      type="button"
                    >
                      <span className="font-mono text-xs text-foreground-subtlest">{step}</span>
                      <span
                        className="h-2 rounded-sm bg-primary"
                        style={{ width: varValue(token.cssVar) }}
                      />
                      <span className="truncate text-right text-xs text-foreground-subtle">{token.value}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-foreground-subtlest">
                <span className="font-medium text-foreground-subtle">e.g.</span> {category.example}
              </p>
            </article>
          ))}
        </div>
      </PanelSection>

      <PanelSection
        title="Full scale"
        description="Platform spacing scale for layout gaps, padding, and component rhythm."
      >
        <div className="grid gap-(--davinci-spacing-200)">
          {spacingTokens.map((token) => (
            <button
              className="grid grid-cols-[5rem_minmax(0,1fr)_7rem] items-center gap-(--davinci-spacing-200) rounded-md p-(--davinci-spacing-100) text-left hover:bg-background-subtle"
              key={token.name}
              onClick={() => void copyText(token.name)}
              type="button"
            >
              <span className="font-mono text-foreground-subtlest" style={typographyStyle("code")}>
                {tokenStep(token.name)}
              </span>
              <span
                className="h-(--davinci-spacing-300) rounded-sm bg-primary"
                style={{ width: varValue(token.cssVar) }}
              />
              <span className="truncate text-foreground-subtle" style={typographyStyle("body-small")}>
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
