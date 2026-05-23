import { useEffect, useState } from "react";

const STORAGE_KEY = "davinci-wiki-radius";

export const radiusPresets = {
  minimum: { sm: 4, md: 4, lg: 4, xl: 4 },
  subtle: { sm: 4, md: 4, lg: 8, xl: 8 },
  default: { sm: 4, md: 8, lg: 12, xl: 16 },
  bold: { sm: 8, md: 12, lg: 16, xl: 24 }
} as const;

export type RadiusPreset = keyof typeof radiusPresets;

export const PRESET_LABELS: Record<RadiusPreset, string> = {
  minimum: "Minimum",
  subtle: "Subtle",
  default: "Default",
  bold: "Bold"
};

const DEFAULT_PRESET: RadiusPreset = "default";

function readInitial(): RadiusPreset {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && stored in radiusPresets) {
    return stored as RadiusPreset;
  }
  return DEFAULT_PRESET;
}

export function useRadiusPreset(): [RadiusPreset, (preset: RadiusPreset) => void] {
  const [preset, setPreset] = useState<RadiusPreset>(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    const values = radiusPresets[preset];

    root.style.setProperty("--davinci-radius-sm", `${values.sm}px`);
    root.style.setProperty("--davinci-radius-md", `${values.md}px`);
    root.style.setProperty("--davinci-radius-lg", `${values.lg}px`);
    root.style.setProperty("--davinci-radius-xl", `${values.xl}px`);
    root.style.setProperty("--davinci-semantic-radius-control", "var(--davinci-radius-md)");
    root.style.setProperty("--davinci-semantic-radius-card", "var(--davinci-radius-lg)");
    root.style.setProperty("--davinci-semantic-radius-panel", "var(--davinci-radius-xl)");
    window.localStorage.setItem(STORAGE_KEY, preset);
  }, [preset]);

  return [preset, setPreset];
}
