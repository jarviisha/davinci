import { tokensByPrefix, typographySamples, typographyStyle } from "../lib/tokens";
import { TokenTable } from "./TokenTable";

export function TypographyPanel() {
  const typographyTokens = tokensByPrefix("typography.");
  const fontTokens = [
    ...tokensByPrefix("font.size."),
    ...tokensByPrefix("font.lineHeight."),
    ...tokensByPrefix("font.weight."),
    ...tokensByPrefix("font.letterSpacing.")
  ];

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="font-semibold" style={typographyStyle("heading-md")}>
          Typography
        </h2>
        <p className="mt-2 text-text-subtle" style={typographyStyle("body")}>
          Text roles are composed from primitive font size, line height, weight, and letter spacing tokens.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface-raised p-(--davinci-spacing-300) shadow-sm">
        <div className="flex flex-col gap-(--davinci-spacing-300)">
          {typographySamples.map((sample) => (
            <div
              className="grid gap-2 border-b border-border pb-(--davinci-spacing-200) last:border-b-0 last:pb-0"
              key={sample.token}
            >
              <span className="font-medium text-text-muted" style={typographyStyle("label")}>
                {sample.label}
              </span>
              <p className={sample.role === "code" ? "font-mono" : undefined} style={typographyStyle(sample.role)}>
                The quick brown fox jumps over the lazy dog.
              </p>
              <span className="font-mono text-text-subtle" style={typographyStyle("code")}>
                {sample.token}
              </span>
            </div>
          ))}
        </div>
      </div>

      <TokenTable title="Typography role tokens" tokens={typographyTokens} />
      <TokenTable title="Primitive font tokens" tokens={fontTokens} />
    </section>
  );
}
