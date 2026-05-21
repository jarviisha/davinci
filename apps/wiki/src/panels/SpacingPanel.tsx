import { copyText, tokensByPrefix, tokenStep, typographyStyle, varValue } from "../lib/tokens";
import { TokenTable } from "./TokenTable";

export function SpacingPanel() {
  const spacingTokens = tokensByPrefix("spacing.").filter(
    (token) => !["1", "2", "3", "4", "6", "8"].includes(tokenStep(token.name))
  );

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="font-semibold" style={typographyStyle("heading-md")}>
          Spacing
        </h2>
        <p className="mt-2 text-text-subtle" style={typographyStyle("body")}>
          Platform spacing scale for layout gaps, padding, and component rhythm.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface-raised p-(--davinci-spacing-300) shadow-sm">
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
              <span className="h-(--davinci-spacing-300) rounded-sm bg-primary" style={{ width: varValue(token.cssVar) }} />
              <span className="truncate text-text-subtle" style={typographyStyle("body-small")}>
                {token.value}
              </span>
            </button>
          ))}
        </div>
      </div>

      <TokenTable title="Spacing tokens" tokens={spacingTokens} />
    </section>
  );
}
