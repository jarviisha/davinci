import { useEffect, useState } from "react";

const DEFAULT_STORAGE_KEY = "davinci-radius";

export const radiusPresets = {
  minimum: { sm: 4, md: 4, lg: 4, xl: 4 },
  subtle: { sm: 4, md: 4, lg: 8, xl: 8 },
  default: { sm: 4, md: 8, lg: 12, xl: 16 },
  bold: { sm: 8, md: 12, lg: 16, xl: 24 }
} as const;

export type RadiusPreset = keyof typeof radiusPresets;
export type RadiusScale = { sm: number; md: number; lg: number; xl: number };
export type RadiusValue = RadiusPreset | RadiusScale;

export const RADIUS_PRESET_LABELS: Record<RadiusPreset, string> = {
  minimum: "Minimum",
  subtle: "Subtle",
  default: "Default",
  bold: "Bold"
};

const DEFAULT_PRESET: RadiusPreset = "default";

function isScale(value: unknown): value is RadiusScale {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return (["sm", "md", "lg", "xl"] as const).every(
    (key) => typeof (value as Record<string, unknown>)[key] === "number"
  );
}

/** Resolve a preset key or raw scale into concrete pixel values. */
export function resolveScale(value: RadiusValue): RadiusScale {
  return typeof value === "string" ? radiusPresets[value] : value;
}

/** Return the preset key a value matches exactly, or null if it is custom. */
export function matchPreset(value: RadiusValue): RadiusPreset | null {
  if (typeof value === "string") {
    return value;
  }
  const found = (Object.keys(radiusPresets) as RadiusPreset[]).find((key) => {
    const preset = radiusPresets[key];
    return (
      preset.sm === value.sm &&
      preset.md === value.md &&
      preset.lg === value.lg &&
      preset.xl === value.xl
    );
  });
  return found ?? null;
}

function applyRadius(scale: RadiusScale): void {
  const root = document.documentElement;
  root.style.setProperty("--davinci-radius-sm", `${scale.sm}px`);
  root.style.setProperty("--davinci-radius-md", `${scale.md}px`);
  root.style.setProperty("--davinci-radius-lg", `${scale.lg}px`);
  root.style.setProperty("--davinci-radius-xl", `${scale.xl}px`);
  root.style.setProperty("--davinci-semantic-radius-control", "var(--davinci-radius-md)");
  root.style.setProperty("--davinci-semantic-radius-card", "var(--davinci-radius-lg)");
  root.style.setProperty("--davinci-semantic-radius-panel", "var(--davinci-radius-xl)");
}

function readStoredRadius(storageKey: string, fallback: RadiusValue): RadiusValue {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return fallback;
    }
    if (stored in radiusPresets) {
      return stored as RadiusPreset;
    }
    const parsed: unknown = JSON.parse(stored);
    if (isScale(parsed)) {
      return parsed;
    }
  } catch {
    // fall through to fallback
  }
  return fallback;
}

export type UseRadiusOptions = {
  defaultValue?: RadiusValue;
  storageKey?: string;
};

/**
 * Manage the Davinci radius scale at runtime. Accepts a named preset or a raw
 * `{ sm, md, lg, xl }` scale (pixels), applies it as CSS custom properties on
 * `document.documentElement`, and persists the choice to localStorage.
 */
export function useRadiusPreset(
  options: UseRadiusOptions = {}
): [RadiusValue, (value: RadiusValue) => void] {
  const storageKey = options.storageKey ?? DEFAULT_STORAGE_KEY;
  const [value, setValue] = useState<RadiusValue>(() =>
    readStoredRadius(storageKey, options.defaultValue ?? DEFAULT_PRESET)
  );

  useEffect(() => {
    applyRadius(resolveScale(value));
    try {
      window.localStorage.setItem(
        storageKey,
        typeof value === "string" ? value : JSON.stringify(value)
      );
    } catch {
      // ignore quota or private-mode errors
    }
  }, [storageKey, value]);

  return [value, setValue];
}

export type RadiusScriptOptions = {
  defaultValue?: RadiusValue;
  storageKey?: string;
};

/**
 * Build an inline script that applies the stored radius before paint, avoiding a
 * flash of the default scale on load. Inject its return value into a synchronous
 * `<script>` in the document head, or render {@link RadiusScript}.
 */
export function getRadiusScript(options: RadiusScriptOptions = {}): string {
  const storageKey = JSON.stringify(options.storageKey ?? DEFAULT_STORAGE_KEY);
  const presets = JSON.stringify(radiusPresets);
  const fallback = JSON.stringify(resolveScale(options.defaultValue ?? DEFAULT_PRESET));
  return `(function(){try{var P=${presets};var v=null;var s=localStorage.getItem(${storageKey});if(s&&P[s])v=P[s];else if(s){try{var p=JSON.parse(s);if(p&&typeof p.sm==="number")v=p;}catch(e){}}if(!v)v=${fallback};var r=document.documentElement.style;r.setProperty("--davinci-radius-sm",v.sm+"px");r.setProperty("--davinci-radius-md",v.md+"px");r.setProperty("--davinci-radius-lg",v.lg+"px");r.setProperty("--davinci-radius-xl",v.xl+"px");r.setProperty("--davinci-semantic-radius-control","var(--davinci-radius-md)");r.setProperty("--davinci-semantic-radius-card","var(--davinci-radius-lg)");r.setProperty("--davinci-semantic-radius-panel","var(--davinci-radius-xl)");}catch(e){}})();`;
}

export function RadiusScript(options: RadiusScriptOptions = {}) {
  return <script dangerouslySetInnerHTML={{ __html: getRadiusScript(options) }} />;
}
