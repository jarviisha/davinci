import { useMemo, useState, type ReactNode } from "react";
import { Card, CardContent, Input, Stack } from "@jarviisha/davinci-react-ui";
import { PanelSection } from "../components/PanelSection";
import {
  themeTokenEntries,
  tokenEntries,
  type ResolvedTheme,
  type TokenEntry
} from "../lib/tokens";
import { TokenTable } from "./TokenTable";
import type { PanelMeta } from "./types";

export const allTokensPanelMeta: PanelMeta = {
  id: "all-tokens",
  label: "All tokens",
  group: "Reference",
  description: "Complete token reference grouped by primitives, semantic, typography, and components."
};

type Section = {
  title: string;
  description?: string;
  groups: Array<{ title: string; tokens: TokenEntry[] }>;
};

const palettePrefixes = [
  { label: "Red", prefix: "color.red." },
  { label: "Orange", prefix: "color.orange." },
  { label: "Yellow", prefix: "color.yellow." },
  { label: "Green", prefix: "color.green." },
  { label: "Teal", prefix: "color.teal." },
  { label: "Blue", prefix: "color.blue." },
  { label: "Purple", prefix: "color.purple." },
  { label: "Magenta", prefix: "color.magenta." },
  { label: "Lime", prefix: "color.lime." },
  { label: "Neutral", prefix: "color.neutral." },
  { label: "Neutral Alpha", prefix: "color.neutralAlpha." },
  { label: "Dark Neutral", prefix: "color.darkNeutral." },
  { label: "Dark Neutral Alpha", prefix: "color.darkNeutralAlpha." }
];

const componentNames = [
  "badge",
  "button",
  "card",
  "checkbox",
  "dialog",
  "formField",
  "input",
  "nav",
  "radio",
  "switch",
  "toast"
];

function filterByPrefix(tokens: TokenEntry[], prefix: string): TokenEntry[] {
  return tokens.filter((token) => token.name.startsWith(prefix));
}

function matchesQuery(token: TokenEntry, query: string): boolean {
  if (!query) {
    return true;
  }

  const lower = query.toLowerCase();
  return (
    token.name.toLowerCase().includes(lower) ||
    token.value.toLowerCase().includes(lower) ||
    token.cssVar.toLowerCase().includes(lower)
  );
}

type AllTokensPanelProps = { resolvedTheme: ResolvedTheme };

export function AllTokensPanel({ resolvedTheme }: AllTokensPanelProps) {
  const [query, setQuery] = useState("");

  const sections = useMemo<Section[]>(() => {
    const semanticEntries = themeTokenEntries(resolvedTheme);

    const paletteGroups = palettePrefixes.map(({ label, prefix }) => ({
      title: label,
      tokens: filterByPrefix(tokenEntries, prefix)
    }));

    const componentGroups = componentNames.map((name) => ({
      title: name,
      tokens: filterByPrefix(tokenEntries, `component.${name}.`)
    }));

    return [
      {
        title: "Primitives",
        description:
          "Theme-agnostic foundational values — colors, spacing, radius, shadow, focus, and font primitives.",
        groups: [
          ...paletteGroups,
          { title: "Spacing", tokens: filterByPrefix(tokenEntries, "spacing.") },
          { title: "Radius", tokens: filterByPrefix(tokenEntries, "radius.") },
          { title: "Shadow", tokens: filterByPrefix(tokenEntries, "shadow.") },
          { title: "Focus", tokens: filterByPrefix(tokenEntries, "focus.") },
          { title: "Font", tokens: filterByPrefix(tokenEntries, "font.") }
        ]
      },
      {
        title: "Semantic",
        description: `Theme-aware role tokens. Shown values resolved for the active "${resolvedTheme}" theme.`,
        groups: [
          { title: "Color", tokens: filterByPrefix(semanticEntries, "semantic.color.") },
          { title: "Shadow", tokens: filterByPrefix(semanticEntries, "semantic.shadow.") }
        ]
      },
      {
        title: "Typography Roles",
        description: "Composed type styles (font-size, line-height, weight, letter-spacing).",
        groups: [{ title: "Typography", tokens: filterByPrefix(tokenEntries, "typography.") }]
      },
      {
        title: "Components",
        description: "Component-level tokens — each references semantic tokens so themes flow through automatically.",
        groups: componentGroups
      }
    ];
  }, [resolvedTheme]);

  const filteredSections = useMemo(() => {
    if (!query) {
      return sections;
    }

    return sections
      .map((section) => ({
        ...section,
        groups: section.groups
          .map((group) => ({
            ...group,
            tokens: group.tokens.filter((token) => matchesQuery(token, query))
          }))
          .filter((group) => group.tokens.length > 0)
      }))
      .filter((section) => section.groups.length > 0);
  }, [sections, query]);

  const totalTokens = useMemo(
    () =>
      filteredSections.reduce(
        (sum, section) => sum + section.groups.reduce((s, g) => s + g.tokens.length, 0),
        0
      ),
    [filteredSections]
  );

  return (
    <Stack gap="400">
      <Stack gap="150">
        <Input
          aria-label="Search tokens"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tokens by name, value, or CSS variable…"
          type="search"
          value={query}
        />
        <p className="text-sm text-text-subtle">
          Showing <span className="font-medium text-foreground">{totalTokens}</span> tokens
          {query ? ` matching "${query}"` : ""}.
        </p>
      </Stack>

      {filteredSections.map((section) => (
        <SectionBlock description={section.description} key={section.title} title={section.title}>
          <Stack gap="300">
            {section.groups.map((group) => (
              <TokenTable key={group.title} title={group.title} tokens={group.tokens} />
            ))}
          </Stack>
        </SectionBlock>
      ))}

      {filteredSections.length === 0 ? (
        <Card variant="filled">
          <CardContent>
            <p className="text-sm text-text-subtle">No tokens match "{query}".</p>
          </CardContent>
        </Card>
      ) : null}
    </Stack>
  );
}

function SectionBlock({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <PanelSection title={title} description={description}>
      {children}
    </PanelSection>
  );
}
