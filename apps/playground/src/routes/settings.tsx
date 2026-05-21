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

const DEFAULT_APP_RADIUS = 6;
const RADIUS_STORAGE_KEY = "davinci-playground-radius";

const appRadiusVars = [
  ["--davinci-radius-sm", 2 / 3],
  ["--davinci-radius-md", 1],
  ["--davinci-radius-lg", 4 / 3],
  ["--davinci-radius-xl", 2]
] as const;

const themeOptions: { value: Theme; label: string; hint: string }[] = [
  { value: "light", label: "Light", hint: "Always use the light palette." },
  { value: "dark", label: "Dark", hint: "Always use the dark palette." },
  { value: "system", label: "System", hint: "Match the operating system." }
];

export default function SettingsRoute() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [appRadius, setAppRadius] = useState(readInitialRadius);

  useEffect(() => {
    const root = document.documentElement;
    for (const [name, multiplier] of appRadiusVars) {
      root.style.setProperty(name, formatRadiusValue(appRadius * multiplier));
    }
    root.style.setProperty("--davinci-radius-control", "var(--davinci-radius-md)");
    root.style.setProperty("--davinci-radius-card", "var(--davinci-radius-lg)");
    root.style.setProperty("--davinci-radius-panel", "var(--davinci-radius-xl)");
    window.localStorage.setItem(RADIUS_STORAGE_KEY, String(appRadius));
  }, [appRadius]);

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
            <Badge variant="neutral">{formatRadiusValue(appRadius)}</Badge>
          </Inline>
        </CardHeader>
        <CardContent>
          <Stack gap="150">
            <label className="sr-only" htmlFor="app-radius">
              App radius
            </label>
            <input
              className="w-full"
              id="app-radius"
              max="20"
              min="0"
              onChange={(event) => setAppRadius(Number(event.currentTarget.value))}
              step="1"
              style={{ accentColor: "var(--davinci-semantic-color-primary)" }}
              type="range"
              value={appRadius}
            />
            <Inline align="center" justify="between">
              <span className="text-xs text-text-subtle">0px — sharp</span>
              <span className="text-xs text-text-subtle">20px — soft</span>
            </Inline>
            <Button
              disabled={appRadius === DEFAULT_APP_RADIUS}
              onClick={() => setAppRadius(DEFAULT_APP_RADIUS)}
              size="sm"
              tone="neutral"
              variant="outline"
            >
              Reset radius
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

function readInitialRadius(): number {
  const stored = window.localStorage.getItem(RADIUS_STORAGE_KEY);
  const parsed = Number(stored);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 20) {
    return DEFAULT_APP_RADIUS;
  }
  return parsed;
}

function formatRadiusValue(value: number): string {
  return `${Number(value.toFixed(2))}px`;
}
