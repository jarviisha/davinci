import {
  matchPreset,
  RADIUS_PRESET_LABELS,
  radiusPresets,
  resolveScale,
  useTheme,
  type RadiusPreset,
  type RadiusValue,
  type Theme
} from "@jarviisha/davinci-react-theme-provider";
import {
  Badge,
  Button,
  Divider,
  Inline,
  Nav,
  NavGroup,
  NavItem,
  Select,
  Stack
} from "@jarviisha/davinci-react-ui";
import {
  fontPresets,
  type FontPreset
} from "../hooks/useFontPreset";
import type { PanelGroup, PanelMeta } from "../panels/types";

const themes: Theme[] = ["light", "dark", "system"];

function nextTheme(theme: Theme): Theme {
  const index = themes.indexOf(theme);
  return themes[(index + 1) % themes.length] ?? "system";
}

type WikiSidebarProps = {
  groups: ReadonlyArray<{ label: PanelGroup; panels: ReadonlyArray<PanelMeta> }>;
  activeId: string;
  fontPreset: FontPreset;
  onNavigate: (id: string) => void;
  onFontPresetChange: (preset: FontPreset) => void;
  radiusValue: RadiusValue;
  onRadiusChange: (value: RadiusValue) => void;
};

export function WikiSidebar({
  groups,
  activeId,
  fontPreset,
  onNavigate,
  onFontPresetChange,
  radiusValue,
  onRadiusChange
}: WikiSidebarProps) {
  const { theme, setTheme } = useTheme();
  const radiusScale = resolveScale(radiusValue);
  const matchedPreset = matchPreset(radiusValue);

  return (
    <aside className="davinci-scrollbar border-b border-border px-6 py-6 lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:w-80 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:bg-background lg:px-6 lg:py-8">
      <Stack gap="300">
        <div>
          <h2 className="text-xl font-semibold tracking-normal">Davinci</h2>
          <p className="mt-1 text-sm leading-6 text-foreground-subtle">Component wiki</p>
        </div>

        <Nav aria-label="Playground sections">
          {groups.map((group) => (
            <NavGroup
              defaultOpen={group.panels.some((panel) => panel.id === activeId)}
              key={group.label}
              label={group.label}
            >
              {group.panels.map((panel) => (
                <NavItem
                  active={panel.id === activeId}
                  key={panel.id}
                  onClick={() => onNavigate(panel.id)}
                >
                  {panel.label}
                </NavItem>
              ))}
            </NavGroup>
          ))}
        </Nav>

        <Stack gap="200">
          <Divider />
          <Inline align="center" justify="between">
            <span className="text-sm font-medium">Theme</span>
            <Badge variant="neutral">{theme}</Badge>
          </Inline>
          <Button onClick={() => setTheme(nextTheme(theme))} tone="neutral" variant="outline">
            Switch to {nextTheme(theme)}
          </Button>
        </Stack>

        <Stack gap="200">
          <Divider />
          <Inline align="center" justify="between">
            <span className="text-sm font-medium">Font</span>
            <Badge variant="neutral">{fontPresets[fontPreset].label}</Badge>
          </Inline>
          <Select
            aria-label="Font family"
            onChange={(event) => onFontPresetChange(event.target.value as FontPreset)}
            value={fontPreset}
          >
            {(Object.keys(fontPresets) as FontPreset[]).map((preset) => (
              <option key={preset} value={preset}>
                {fontPresets[preset].label}
              </option>
            ))}
          </Select>
        </Stack>

        <Stack gap="200">
          <Divider />
          <Inline align="center" justify="between">
            <span className="text-sm font-medium">Radius</span>
            <Badge variant="neutral">
              {matchedPreset ? RADIUS_PRESET_LABELS[matchedPreset] : "Custom"}
            </Badge>
          </Inline>
          <Inline gap="100" wrap>
            {(Object.keys(radiusPresets) as RadiusPreset[]).map((preset) => {
              const active = preset === matchedPreset;
              return (
                <Button
                  key={preset}
                  onClick={() => onRadiusChange(preset)}
                  size="sm"
                  tone={active ? "primary" : "neutral"}
                  variant={active ? "solid" : "outline"}
                >
                  {RADIUS_PRESET_LABELS[preset]}
                </Button>
              );
            })}
          </Inline>
          <Stack gap="100">
            {(["sm", "md", "lg", "xl"] as const).map((key) => (
              <label className="flex items-center gap-3 text-sm" key={key}>
                <span className="w-6 uppercase text-foreground-subtle">{key}</span>
                <input
                  className="flex-1 accent-(--davinci-semantic-color-primary)"
                  max={32}
                  min={0}
                  onChange={(event) =>
                    onRadiusChange({ ...radiusScale, [key]: Number(event.target.value) })
                  }
                  type="range"
                  value={radiusScale[key]}
                />
                <span className="w-10 text-right tabular-nums text-foreground-subtle">
                  {radiusScale[key]}px
                </span>
              </label>
            ))}
          </Stack>
          <div className="grid grid-cols-3 gap-2">
            <div
              className="h-9 border border-border bg-background-subtle"
              style={{ borderRadius: "var(--davinci-semantic-radius-control)" }}
            />
            <div
              className="h-9 border border-border bg-background-subtle"
              style={{ borderRadius: "var(--davinci-semantic-radius-card)" }}
            />
            <div
              className="h-9 border border-border bg-background-subtle"
              style={{ borderRadius: "var(--davinci-semantic-radius-panel)" }}
            />
          </div>
        </Stack>
      </Stack>
    </aside>
  );
}
