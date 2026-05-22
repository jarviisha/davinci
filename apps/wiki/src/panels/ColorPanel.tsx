import { Stack } from "@jarviisha/davinci-react-ui";
import type { Theme } from "@jarviisha/davinci-react-theme-provider";
import { PanelSection } from "../components/PanelSection";
import {
  copyText,
  paletteGroups,
  paletteTokens,
  semanticPreviews,
  tokenStep,
  varValue,
  type TokenEntry
} from "../lib/tokens";
import type { PanelMeta } from "./types";

export const colorPanelMeta: PanelMeta = {
  id: "color",
  label: "Color",
  group: "Foundations",
  description: "Primitive palette, semantic roles, and active theme mapping."
};

type ColorPanelProps = {
  resolvedTheme: Exclude<Theme, "system">;
  semanticEntries: TokenEntry[];
  semanticPrefix: string;
};

export function ColorPanel({ resolvedTheme, semanticEntries, semanticPrefix }: ColorPanelProps) {
  return (
    <Stack gap="300">
      <PanelSection
        title="Semantic tokens"
        description={`These roles resolve through the active ${resolvedTheme} theme.`}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {semanticPreviews.map((item) => (
            <button
              className="flex min-h-28 flex-col justify-between rounded-md border border-border p-3 text-left shadow-sm"
              key={item.token}
              onClick={() => void copyText(`var(${item.token})`)}
              style={{
                backgroundColor: varValue(item.token),
                color: item.foreground ? varValue(item.foreground) : undefined
              }}
              type="button"
            >
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="break-all text-xs font-medium opacity-80">{item.token}</span>
            </button>
          ))}
        </div>
      </PanelSection>

      <PanelSection
        title="Semantic mapping"
        description={`Active ${resolvedTheme} theme token names and their primitive references.`}
      >
        <div className="overflow-hidden rounded-lg border border-border bg-surface-raised">
          <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-border px-4 py-3 text-xs font-semibold uppercase text-text-muted">
            <span>Name</span>
            <span>Reference</span>
            <span>CSS variable</span>
          </div>
          {semanticEntries.map((token) => (
            <button
              className="grid w-full grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 border-b border-border px-4 py-3 text-left text-sm last:border-b-0"
              key={token.name}
              onClick={() => void copyText(token.cssVar)}
              type="button"
            >
              <span className="truncate font-medium">{token.name.replace(semanticPrefix, "")}</span>
              <span className="truncate text-text-subtle">{token.value}</span>
              <span className="truncate text-text-subtle">{token.cssVar}</span>
            </button>
          ))}
        </div>
      </PanelSection>

      <PanelSection
        title="Primitive palette"
        description="Swatches are rendered from generated CSS variables, not direct color values."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {paletteGroups.map((group) => {
            const groupTokens = paletteTokens(group.prefix);

            if (groupTokens.length === 0) {
              return null;
            }

            return (
              <article className="rounded-lg border border-border bg-surface-raised p-4" key={group.prefix}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">{group.label}</h3>
                  <span className="text-xs text-text-muted">{groupTokens.length} tokens</span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {groupTokens.map((token) => (
                    <button
                      className="overflow-hidden rounded-md border border-border bg-background text-left"
                      key={token.name}
                      onClick={() => void copyText(token.name)}
                      type="button"
                    >
                      <span
                        className="block h-14 border-b border-border"
                        style={{ backgroundColor: varValue(token.cssVar) }}
                      />
                      <span className="block p-2">
                        <span className="block text-xs font-semibold">{tokenStep(token.name)}</span>
                        <span className="block truncate text-xs text-text-subtle">{token.value}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </PanelSection>
    </Stack>
  );
}
