import { useEffect, useState } from "react";

const STORAGE_KEY = "davinci-wiki-font";

export const fontPresets = {
  inter: {
    family: "\"Inter\", ui-sans-serif, system-ui, sans-serif",
    label: "Inter"
  },
  jakarta: {
    family: "\"Plus Jakarta Sans\", ui-sans-serif, system-ui, sans-serif",
    label: "Plus Jakarta Sans"
  },
  sourceSans: {
    family: "\"Source Sans 3\", ui-sans-serif, system-ui, sans-serif",
    label: "Source Sans 3"
  }
} as const;

export type FontPreset = keyof typeof fontPresets;

const DEFAULT_PRESET: FontPreset = "inter";

function readInitial(): FontPreset {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && stored in fontPresets) {
    return stored as FontPreset;
  }
  return DEFAULT_PRESET;
}

export function useFontPreset(): [FontPreset, (preset: FontPreset) => void] {
  const [preset, setPreset] = useState<FontPreset>(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--davinci-font-family-sans", fontPresets[preset].family);
    window.localStorage.setItem(STORAGE_KEY, preset);
  }, [preset]);

  return [preset, setPreset];
}
