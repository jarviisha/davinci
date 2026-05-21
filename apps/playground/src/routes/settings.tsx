import { useEffect, useState } from "react";
import { useTheme, type Theme } from "@jarviisha/davinci-react-theme-provider";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Inline,
  Radio,
  RadioGroup,
  Stack
} from "@jarviisha/davinci-react-ui";

const RADIUS_STORAGE_KEY = "davinci-playground-radius";

const radiusPresets = {
  none: { sm: 0, md: 0, lg: 0, xl: 0 },
  subtle: { sm: 2, md: 3, lg: 4, xl: 6 },
  default: { sm: 4, md: 6, lg: 8, xl: 12 },
  bold: { sm: 8, md: 12, lg: 16, xl: 24 }
} as const;

type RadiusPreset = keyof typeof radiusPresets;
const DEFAULT_PRESET: RadiusPreset = "default";
const PRESET_LABELS: Record<RadiusPreset, string> = {
  none: "None",
  subtle: "Subtle",
  default: "Default",
  bold: "Bold"
};

const themeOptions: { value: Theme; label: string; hint: string }[] = [
  { value: "light", label: "Light", hint: "Always use the light palette." },
  { value: "dark", label: "Dark", hint: "Always use the dark palette." },
  { value: "system", label: "System", hint: "Match the operating system." }
];

export default function SettingsRoute() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [radiusPreset, setRadiusPreset] = useState<RadiusPreset>(readInitialPreset);

  useEffect(() => {
    const root = document.documentElement;
    const values = radiusPresets[radiusPreset];

    root.style.setProperty("--davinci-radius-sm", `${values.sm}px`);
    root.style.setProperty("--davinci-radius-md", `${values.md}px`);
    root.style.setProperty("--davinci-radius-lg", `${values.lg}px`);
    root.style.setProperty("--davinci-radius-xl", `${values.xl}px`);
    root.style.setProperty("--davinci-radius-control", "var(--davinci-radius-md)");
    root.style.setProperty("--davinci-radius-card", "var(--davinci-radius-lg)");
    root.style.setProperty("--davinci-radius-panel", "var(--davinci-radius-xl)");
    window.localStorage.setItem(RADIUS_STORAGE_KEY, radiusPreset);
  }, [radiusPreset]);

  return (
    <Stack gap="300">
      <Card variant="elevated">
        <CardHeader>
          <Inline align="start" justify="between" wrap>
            <div>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Switch between light, dark, and system palettes.</CardDescription>
            </div>
            <Badge variant={resolvedTheme === "dark" ? "discovery" : "primary"}>{resolvedTheme}</Badge>
          </Inline>
        </CardHeader>
        <CardContent>
          <RadioGroup
            aria-label="Theme"
            name="theme"
            onValueChange={(value) => setTheme(value as Theme)}
            value={theme}
          >
            <Stack gap="150">
              {themeOptions.map((option) => (
                <Radio
                  key={option.value}
                  label={
                    <span className="flex flex-col">
                      <span className="text-sm font-medium">{option.label}</span>
                      <span className="text-xs text-text-subtle">{option.hint}</span>
                    </span>
                  }
                  value={option.value}
                />
              ))}
            </Stack>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <Inline align="start" justify="between" wrap>
            <div>
              <CardTitle>Interface radius</CardTitle>
              <CardDescription>Controls how rounded controls, cards, and panels appear.</CardDescription>
            </div>
            <Badge variant="neutral">{PRESET_LABELS[radiusPreset]}</Badge>
          </Inline>
        </CardHeader>
        <CardContent>
          <Inline gap="100" wrap>
            {(Object.keys(radiusPresets) as RadiusPreset[]).map((preset) => {
              const active = preset === radiusPreset;
              return (
                <Button
                  key={preset}
                  onClick={() => setRadiusPreset(preset)}
                  size="sm"
                  tone={active ? "primary" : "neutral"}
                  variant={active ? "solid" : "outline"}
                >
                  {PRESET_LABELS[preset]}
                </Button>
              );
            })}
          </Inline>
        </CardContent>
      </Card>
    </Stack>
  );
}

function readInitialPreset(): RadiusPreset {
  const stored = window.localStorage.getItem(RADIUS_STORAGE_KEY);
  if (stored && stored in radiusPresets) {
    return stored as RadiusPreset;
  }
  return DEFAULT_PRESET;
}
