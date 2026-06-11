import {
  matchPreset,
  RADIUS_PRESET_LABELS,
  radiusPresets,
  useRadiusPreset,
  useTheme,
  type RadiusPreset,
  type Theme
} from "@jarviisha/davinci-react-theme-provider";
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

const themeOptions: { value: Theme; label: string; hint: string }[] = [
  { value: "light", label: "Light", hint: "Always use the light palette." },
  { value: "dark", label: "Dark", hint: "Always use the dark palette." },
  { value: "system", label: "System", hint: "Match the operating system." }
];

export default function SettingsRoute() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [radiusValue, setRadiusValue] = useRadiusPreset({ storageKey: RADIUS_STORAGE_KEY });
  const radiusPreset = matchPreset(radiusValue);

  return (
    <Stack gap="300">
      <Card>
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
                      <span className="text-xs text-foreground-subtle">{option.hint}</span>
                    </span>
                  }
                  value={option.value}
                />
              ))}
            </Stack>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Inline align="start" justify="between" wrap>
            <div>
              <CardTitle>Interface radius</CardTitle>
              <CardDescription>Controls how rounded controls, cards, and panels appear.</CardDescription>
            </div>
            <Badge variant="neutral">
              {radiusPreset ? RADIUS_PRESET_LABELS[radiusPreset] : "Custom"}
            </Badge>
          </Inline>
        </CardHeader>
        <CardContent>
          <Inline gap="100" wrap>
            {(Object.keys(radiusPresets) as RadiusPreset[]).map((preset) => {
              const active = preset === radiusPreset;
              return (
                <Button
                  key={preset}
                  onClick={() => setRadiusValue(preset)}
                  size="sm"
                  tone={active ? "primary" : "neutral"}
                  variant={active ? "solid" : "outline"}
                >
                  {RADIUS_PRESET_LABELS[preset]}
                </Button>
              );
            })}
          </Inline>
        </CardContent>
      </Card>
    </Stack>
  );
}
