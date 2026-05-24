import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Divider,
  Inline,
  Stack
} from "@jarviisha/davinci-react-ui";
import { tokens } from "@jarviisha/davinci-tokens/js/tokens";

type ColorToken = { type: string; value: string; cssVar: string };
type ColorTokenEntry = ColorToken & { name: string };

const PALETTE_FAMILIES: { label: string; prefix: string }[] = [
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
  { label: "Neutral Dark", prefix: "color.neutralDark." }
];

const SEMANTIC_GROUPS: { title: string; description: string; entries: string[] }[] = [
  {
    title: "Surfaces",
    description: "Page canvas and raised content layers. Cards lift visually by stepping from surface to surfaceRaised.",
    entries: [
      "background",
      "surface",
      "surfaceRaised",
      "backgroundSubtle",
      "backgroundSubtleHovered",
      "backgroundSubtlePressed",
      "backgroundHovered",
      "backgroundPressed",
      "backgroundSelected",
      "backgroundDisabled"
    ]
  },
  {
    title: "Foreground",
    description: "Text colors in a hierarchy from prominent to subtlest, with state and inverse variants.",
    entries: [
      "foreground",
      "foregroundSubtle",
      "foregroundSubtlest",
      "foregroundInverse",
      "foregroundDisabled",
      "foregroundSelected"
    ]
  },
  {
    title: "Borders",
    description: "Four intensity tiers + states. Use border for default chrome, borderBold for inputs, borderBoldest only when needed.",
    entries: [
      "borderSubtle",
      "border",
      "borderBold",
      "borderBoldest",
      "borderHovered",
      "borderFocused",
      "borderSelected",
      "borderDisabled"
    ]
  },
  {
    title: "Brand and link",
    description: "Primary action and inline link, each with hover and pressed states.",
    entries: [
      "primary",
      "primaryHovered",
      "primaryPressed",
      "primaryForeground",
      "link",
      "linkHovered",
      "linkPressed"
    ]
  },
  {
    title: "Status",
    description: "Five intents: danger, success, warning, info, discovery — each paired with a foreground that meets WCAG AA.",
    entries: [
      "danger",
      "dangerForeground",
      "success",
      "successForeground",
      "warning",
      "warningForeground",
      "info",
      "infoForeground",
      "discovery",
      "discoveryForeground"
    ]
  },
  {
    title: "Overlay",
    description: "Modal and drawer scrim — black-tinted alpha in both themes.",
    entries: ["overlay"]
  }
];

const PRINCIPLES: { eyebrow: string; title: string; body: string }[] = [
  {
    eyebrow: "Restraint",
    title: "Jira-inspired neutrals",
    body: "Cool grays and a single blue primary keep the UI calm. Status colors carry the weight of meaning, not decoration."
  },
  {
    eyebrow: "Layering",
    title: "Two-tier surface elevation",
    body: "surface is the canvas. surfaceRaised sits a step above for cards. Floating panels add shadow.raised on top."
  },
  {
    eyebrow: "Hierarchy",
    title: "Foreground stepped from prominent to subtlest",
    body: "foreground → foregroundSubtle → foregroundSubtlest. Pick the lightest tier that still meets contrast for the content's importance."
  },
  {
    eyebrow: "Dark mode",
    title: "Raised surfaces are lighter, not darker",
    body: "Following Material 3, dark surfaces brighten as they elevate. Borders use alpha-on-white tints instead of hard lines."
  },
  {
    eyebrow: "Intent",
    title: "Five status colors, each with purpose",
    body: "danger for irreversible actions. success for confirmations. warning for risks. info for neutral context. discovery for new or AI-driven moments."
  },
  {
    eyebrow: "Access",
    title: "WCAG AA contrast or better, everywhere",
    body: "Body text clears 4.5:1 on every surface. Primary actions clear 5:1. Disabled states stay readable but visibly inactive."
  }
];

export default function FoundationsRoute() {
  return (
    <Stack gap="300">
      <Card>
        <CardHeader>
          <CardTitle>Foundations</CardTitle>
          <CardDescription>
            The color system and design principles powering this product. Every surface, text style, and accent is rooted in
            named tokens — change the token, the whole product follows.
          </CardDescription>
        </CardHeader>
      </Card>

      <PrinciplesSection />
      <PaletteSection />
      <SemanticSection />
    </Stack>
  );
}

function PrinciplesSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Design principles</CardTitle>
        <CardDescription>Six axes that guide every visual decision in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <article
              className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4"
              key={principle.title}
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-foreground-subtlest">
                {principle.eyebrow}
              </span>
              <strong className="text-sm font-semibold">{principle.title}</strong>
              <p className="m-0 text-sm leading-6 text-foreground-subtle">{principle.body}</p>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PaletteSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Primitive palette</CardTitle>
        <CardDescription>
          Eleven color families. Chromatic scales run 100 → 1000 with 250 / 850 half-steps. Neutrals add an extra 1100 step
          for the deepest text. Neutral Dark adds a "deepest" key for inverse text on bright accents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap="200">
          {PALETTE_FAMILIES.map((family) => (
            <PaletteRow key={family.label} label={family.label} prefix={family.prefix} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function PaletteRow({ label, prefix }: { label: string; prefix: string }) {
  const swatches = familyTokens(prefix);

  return (
    <div className="flex flex-col gap-2">
      <Inline align="center" justify="between">
        <strong className="text-sm font-semibold">{label}</strong>
        <span className="text-xs text-foreground-subtlest">{swatches.length} steps</span>
      </Inline>
      <div className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))]">
        {swatches.map((token) => (
          <Swatch key={token.name} step={tokenStep(token.name)} value={token.value} cssVar={token.cssVar} />
        ))}
      </div>
    </div>
  );
}

function Swatch({ step, value, cssVar }: { step: string; value: string; cssVar: string }) {
  return (
    <div className="flex flex-col gap-1" title={`${cssVar}: ${value}`}>
      <div
        aria-hidden
        className="h-10 rounded-md border border-border"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <Inline align="center" justify="between">
        <span className="text-xs font-medium">{step}</span>
        <span className="text-[0.65rem] font-mono text-foreground-subtlest">{value.replace("#", "")}</span>
      </Inline>
    </div>
  );
}

function SemanticSection() {
  return (
    <Stack gap="300">
      <div className="px-1">
        <h2 className="m-0 text-lg font-semibold tracking-normal">Semantic roles</h2>
        <p className="m-0 mt-1 text-sm text-foreground-subtle">
          The vocabulary your UI actually uses. Each role resolves to a primitive — and to different primitives in light vs
          dark, so you never write per-mode CSS.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {SEMANTIC_GROUPS.map((group) => (
          <SemanticGroup key={group.title} group={group} />
        ))}
      </div>
    </Stack>
  );
}

function SemanticGroup({ group }: { group: (typeof SEMANTIC_GROUPS)[number] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{group.title}</CardTitle>
        <CardDescription>{group.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap="100">
          {group.entries.map((name, index) => (
            <SemanticRow key={name} name={name} divider={index > 0} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function SemanticRow({ name, divider }: { name: string; divider: boolean }) {
  const cssVar = `--davinci-semantic-color-${camelToKebab(name)}`;
  const isForeground = name.toLowerCase().includes("foreground") || name === "foreground";
  const isOverlay = name === "overlay";

  return (
    <>
      {divider ? <Divider /> : null}
      <Inline align="center" gap="200" justify="between">
        <Inline align="center" gap="150">
          <div
            aria-hidden
            className="h-7 w-7 shrink-0 rounded-md border border-border"
            style={{
              background: isOverlay
                ? `linear-gradient(135deg, var(${cssVar}), var(${cssVar})), repeating-conic-gradient(var(--davinci-semantic-color-background-subtle) 0% 25%, var(--davinci-semantic-color-background) 0% 50%) 50% / 0.75rem 0.75rem`
                : `var(${cssVar})`
            }}
          />
          <Stack gap="025">
            <span className="text-sm font-medium">{name}</span>
            <span className="font-mono text-[0.7rem] text-foreground-subtlest">{cssVar}</span>
          </Stack>
        </Inline>
        {isForeground ? (
          <span
            className="rounded-md px-2 py-1 text-xs font-medium"
            style={{ color: `var(${cssVar})`, backgroundColor: "var(--davinci-semantic-color-background)" }}
          >
            Aa
          </span>
        ) : null}
      </Inline>
    </>
  );
}

function familyTokens(prefix: string): ColorTokenEntry[] {
  return Object.entries(tokens as Record<string, ColorToken>)
    .filter(([key]) => key.startsWith(prefix))
    .filter(([key]) => /^color\.[A-Za-z]+\.(\d+|deepest)$/.test(key))
    .map(([name, token]) => ({ ...(token as ColorToken), name }))
    .sort((a, b) => {
      const stepA = tokenStep(a.name);
      const stepB = tokenStep(b.name);
      if (stepA === "deepest") return -1;
      if (stepB === "deepest") return 1;
      const numA = Number(stepA);
      const numB = Number(stepB);
      if (Number.isNaN(numA) || Number.isNaN(numB)) return stepA.localeCompare(stepB);
      return numA - numB;
    });
}

function tokenStep(name: string): string {
  return name.split(".").at(-1) ?? name;
}

function camelToKebab(value: string): string {
  return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}
