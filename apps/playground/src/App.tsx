import { useEffect, useState } from "react";
import { useTheme, type Theme } from "@jarviisha/davinci-react-theme-provider";
import { Badge, Button, Inline, Stack } from "@jarviisha/davinci-react-ui";
import { SaasDashboardPanel } from "./panels/SaasDashboardPanel";

const themes: Theme[] = ["light", "dark", "system"];
const DEFAULT_APP_RADIUS = 6;
const RADIUS_STORAGE_KEY = "davinci-playground-radius";

const appRadiusVars = [
  ["--davinci-radius-sm", 2 / 3],
  ["--davinci-radius-md", 1],
  ["--davinci-radius-lg", 4 / 3],
  ["--davinci-radius-xl", 2]
] as const;

function nextTheme(theme: Theme): Theme {
  const index = themes.indexOf(theme);
  return themes[(index + 1) % themes.length] ?? "system";
}

export default function App() {
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
    <main className="min-h-screen bg-background px-4 py-4 font-sans text-foreground sm:px-6 lg:px-8">
      <Stack gap="300">
        <header className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">SaaS Demo</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">Pulseboard revenue dashboard</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-text-subtle">
              Playground now focuses on a realistic SaaS product surface built from Davinci components.
            </p>
          </div>

          <Inline align="center" gap="150" wrap>
            <Badge variant={resolvedTheme === "dark" ? "discovery" : "primary"}>{resolvedTheme}</Badge>
            <Button onClick={() => setTheme(nextTheme(theme))} size="sm" tone="neutral" variant="outline">
              Switch to {nextTheme(theme)}
            </Button>
          </Inline>
        </header>

        <section className="grid gap-3 rounded-panel border border-border bg-surface-raised p-4 md:grid-cols-[minmax(0,1fr)_16rem]">
          <div>
            <p className="m-0 text-sm font-medium">Interface radius</p>
            <p className="m-0 mt-1 text-sm text-text-subtle">Adjust the same radius token previewed in the SaaS shell.</p>
          </div>
          <Stack gap="150">
            <Inline align="center" justify="between">
              <span className="text-sm text-text-subtle">Radius</span>
              <Badge variant="neutral">{formatRadiusValue(appRadius)}</Badge>
            </Inline>
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
        </section>

        <SaasDashboardPanel />
      </Stack>
    </main>
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
