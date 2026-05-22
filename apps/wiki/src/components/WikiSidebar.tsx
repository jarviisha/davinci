import { useTheme, type Theme } from "@jarviisha/davinci-react-theme-provider";
import {
  Badge,
  Button,
  Divider,
  Inline,
  Nav,
  NavGroup,
  NavItem,
  Stack
} from "@jarviisha/davinci-react-ui";
import {
  PRESET_LABELS,
  radiusPresets,
  type RadiusPreset
} from "../hooks/useRadiusPreset";
import type { PanelGroup, PanelMeta } from "../panels/types";

const themes: Theme[] = ["light", "dark", "system"];

function nextTheme(theme: Theme): Theme {
  const index = themes.indexOf(theme);
  return themes[(index + 1) % themes.length] ?? "system";
}

type WikiSidebarProps = {
  groups: ReadonlyArray<{ label: PanelGroup; panels: ReadonlyArray<PanelMeta> }>;
  activeId: string;
  onNavigate: (id: string) => void;
  radiusPreset: RadiusPreset;
  onRadiusPresetChange: (preset: RadiusPreset) => void;
};

export function WikiSidebar({
  groups,
  activeId,
  onNavigate,
  radiusPreset,
  onRadiusPresetChange
}: WikiSidebarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <aside className="davinci-scrollbar border-b border-border px-6 py-6 lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:w-80 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:bg-background lg:px-6 lg:py-8">
      <Stack gap="300">
        <div>
          <h2 className="text-xl font-semibold tracking-normal">Davinci</h2>
          <p className="mt-1 text-sm leading-6 text-text-subtle">Component wiki</p>
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
            <span className="text-sm font-medium">Radius</span>
            <Badge variant="neutral">{PRESET_LABELS[radiusPreset]}</Badge>
          </Inline>
          <Inline gap="100" wrap>
            {(Object.keys(radiusPresets) as RadiusPreset[]).map((preset) => {
              const active = preset === radiusPreset;
              return (
                <Button
                  key={preset}
                  onClick={() => onRadiusPresetChange(preset)}
                  size="sm"
                  tone={active ? "primary" : "neutral"}
                  variant={active ? "solid" : "outline"}
                >
                  {PRESET_LABELS[preset]}
                </Button>
              );
            })}
          </Inline>
          <div className="grid grid-cols-3 gap-2">
            <div
              className="h-9 border border-border bg-surface-raised"
              style={{ borderRadius: "var(--davinci-radius-control)" }}
            />
            <div
              className="h-9 border border-border bg-surface-raised"
              style={{ borderRadius: "var(--davinci-radius-card)" }}
            />
            <div
              className="h-9 border border-border bg-surface-raised"
              style={{ borderRadius: "var(--davinci-radius-panel)" }}
            />
          </div>
        </Stack>
      </Stack>
    </aside>
  );
}
