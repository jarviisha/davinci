import type { CSSProperties } from "react";
import { darkTokens, lightTokens, tokens } from "@jarviisha/davinci-tokens/js/tokens";

export type TokenEntry = {
  name: string;
  type: string;
  value: string;
  cssVar: string;
};

export type ResolvedTheme = "light" | "dark";

export type PaletteGroup = {
  label: string;
  prefix: string;
};

export type SemanticPreview = {
  label: string;
  token: string;
  foreground?: string;
};

export const paletteGroups: PaletteGroup[] = [
  { label: "Red", prefix: "color.red." },
  { label: "Orange", prefix: "color.orange." },
  { label: "Yellow", prefix: "color.yellow." },
  { label: "Green", prefix: "color.green." },
  { label: "Blue", prefix: "color.blue." },
  { label: "Purple", prefix: "color.purple." },
  { label: "Magenta", prefix: "color.magenta." },
  { label: "Teal", prefix: "color.teal." },
  { label: "Lime", prefix: "color.lime." },
  { label: "Neutral", prefix: "color.neutral." },
  { label: "Neutral Alpha", prefix: "color.neutralAlpha." },
  { label: "Neutral Dark", prefix: "color.neutralDark." },
  { label: "Neutral Dark Alpha", prefix: "color.neutralDarkAlpha." }
];

export const semanticPreviews: SemanticPreview[] = [
  { label: "Background", token: "--davinci-semantic-color-background", foreground: "--davinci-semantic-color-foreground" },
  { label: "Surface", token: "--davinci-semantic-color-surface", foreground: "--davinci-semantic-color-foreground" },
  {
    label: "Surface raised",
    token: "--davinci-semantic-color-surface-raised",
    foreground: "--davinci-semantic-color-foreground"
  },
  {
    label: "Hovered",
    token: "--davinci-semantic-color-background-hovered",
    foreground: "--davinci-semantic-color-foreground"
  },
  {
    label: "Pressed",
    token: "--davinci-semantic-color-background-pressed",
    foreground: "--davinci-semantic-color-foreground"
  },
  {
    label: "Selected",
    token: "--davinci-semantic-color-background-selected",
    foreground: "--davinci-semantic-color-foreground"
  },
  {
    label: "Disabled",
    token: "--davinci-semantic-color-background-disabled",
    foreground: "--davinci-semantic-color-foreground-disabled"
  },
  {
    label: "Background subtle",
    token: "--davinci-semantic-color-background-subtle",
    foreground: "--davinci-semantic-color-foreground"
  },
  { label: "Primary", token: "--davinci-semantic-color-primary", foreground: "--davinci-semantic-color-primary-foreground" },
  {
    label: "Primary hovered",
    token: "--davinci-semantic-color-primary-hovered",
    foreground: "--davinci-semantic-color-primary-foreground"
  },
  {
    label: "Primary pressed",
    token: "--davinci-semantic-color-primary-pressed",
    foreground: "--davinci-semantic-color-primary-foreground"
  },
  {
    label: "Destructive",
    token: "--davinci-semantic-color-destructive",
    foreground: "--davinci-semantic-color-destructive-foreground"
  },
  {
    label: "Destructive hovered",
    token: "--davinci-semantic-color-destructive-hovered",
    foreground: "--davinci-semantic-color-destructive-foreground"
  },
  {
    label: "Destructive pressed",
    token: "--davinci-semantic-color-destructive-pressed",
    foreground: "--davinci-semantic-color-destructive-foreground"
  },
  { label: "Success", token: "--davinci-semantic-color-success", foreground: "--davinci-semantic-color-success-foreground" },
  { label: "Warning", token: "--davinci-semantic-color-warning", foreground: "--davinci-semantic-color-warning-foreground" },
  {
    label: "Info",
    token: "--davinci-semantic-color-info",
    foreground: "--davinci-semantic-color-info-foreground"
  },
  { label: "Discovery", token: "--davinci-semantic-color-discovery", foreground: "--davinci-semantic-color-discovery-foreground" }
];

export const typographySamples = [
  { label: "Heading large", role: "heading-lg", token: "typography.headingLg" },
  { label: "Heading medium", role: "heading-md", token: "typography.headingMd" },
  { label: "Heading small", role: "heading-sm", token: "typography.headingSm" },
  { label: "Body", role: "body", token: "typography.body" },
  { label: "Body small", role: "body-small", token: "typography.bodySmall" },
  { label: "Label", role: "label", token: "typography.label" },
  { label: "Code", role: "code", token: "typography.code" }
];

export function typographyStyle(role: string): CSSProperties {
  return {
    fontSize: `var(--davinci-typography-${role}-font-size)`,
    fontWeight: `var(--davinci-typography-${role}-font-weight)`,
    letterSpacing: `var(--davinci-typography-${role}-letter-spacing)`,
    lineHeight: `var(--davinci-typography-${role}-line-height)`
  };
}

export const tokenEntries: TokenEntry[] = Object.entries(tokens).map(([name, token]) => ({
  name,
  ...token
}));

export const lightTokenEntries: TokenEntry[] = Object.entries(lightTokens).map(([name, token]) => ({
  name,
  ...token
}));

export const darkTokenEntries: TokenEntry[] = Object.entries(darkTokens).map(([name, token]) => ({
  name,
  ...token
}));

export function themeTokenEntries(theme: ResolvedTheme): TokenEntry[] {
  return theme === "dark" ? darkTokenEntries : lightTokenEntries;
}

export function tokensByPrefix(prefix: string): TokenEntry[] {
  return tokenEntries.filter((token) => token.name.startsWith(prefix)).sort(compareTokenSteps);
}

export function themeTokensByPrefix(theme: ResolvedTheme, prefix: string): TokenEntry[] {
  return themeTokenEntries(theme)
    .filter((token) => token.name.startsWith(prefix))
    .sort(compareTokenSteps);
}

export function paletteTokens(prefix: string): TokenEntry[] {
  return tokensByPrefix(prefix);
}

export function tokenStep(name: string): string {
  return name.split(".").at(-1) ?? name;
}

export function varValue(cssVar: string): string {
  return `var(${cssVar})`;
}

export async function copyText(value: string): Promise<void> {
  if (!navigator.clipboard) {
    return;
  }

  await navigator.clipboard.writeText(value);
}

function compareTokenSteps(a: TokenEntry, b: TokenEntry): number {
  const aStep = Number(tokenStep(a.name));
  const bStep = Number(tokenStep(b.name));

  if (Number.isNaN(aStep) || Number.isNaN(bStep)) {
    return a.name.localeCompare(b.name);
  }

  return aStep - bStep;
}
