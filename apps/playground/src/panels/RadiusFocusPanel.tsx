import { copyText, tokensByPrefix, tokenStep, typographyStyle, varValue } from "../lib/tokens";
import { TokenTable } from "./TokenTable";

const radiusPreviewTokens = ["radius.none", "radius.sm", "radius.md", "radius.lg", "radius.xl", "radius.full"];

export function RadiusFocusPanel() {
  const radiusTokens = tokensByPrefix("radius.");
  const focusTokens = tokensByPrefix("focus.");

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="font-semibold" style={typographyStyle("heading-md")}>
          Radius & Focus
        </h2>
        <p className="mt-2 text-text-subtle" style={typographyStyle("body")}>
          Shape roles and keyboard focus ring tokens for controls and surfaces.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface-raised p-(--davinci-spacing-300) shadow-sm">
          <h3 className="font-semibold" style={typographyStyle("heading-sm")}>
            Radius scale
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
        </section>

        <section className="rounded-lg border border-border bg-surface-raised p-(--davinci-spacing-300) shadow-sm">
          <h3 className="font-semibold" style={typographyStyle("heading-sm")}>
            Focus ring
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
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
          <p className="mt-4 text-text-subtle" style={typographyStyle("body-small")}>
            Use keyboard focus to inspect ring width, offset, and color.
          </p>
        </section>
      </div>

      <TokenTable title="Radius tokens" tokens={radiusTokens} />
      <TokenTable title="Focus tokens" tokens={focusTokens} />
    </section>
  );
}
