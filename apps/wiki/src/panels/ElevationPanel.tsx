import { copyText, themeTokensByPrefix, tokensByPrefix, typographyStyle, varValue } from "../lib/tokens";
import { TokenTable } from "./TokenTable";

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
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="font-semibold" style={typographyStyle("heading-md")}>
          Elevation
        </h2>
        <p className="mt-2 text-text-subtle" style={typographyStyle("body")}>
          Theme-aware shadows for layered surfaces. Values resolve through semantic shadow tokens.
        </p>
      </div>

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

      <TokenTable title="Semantic shadow tokens" tokens={semanticShadowTokens} />
      <TokenTable title="Primitive shadow tokens" tokens={primitiveShadowTokens} />
    </section>
  );
}
