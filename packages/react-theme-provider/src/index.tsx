import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from "react";

export type Theme = "light" | "dark" | "system";

const DEFAULT_STORAGE_KEY = "davinci-theme";
const DEFAULT_THEME: Theme = "system";
const VALID_THEMES: ReadonlySet<Theme> = new Set(["light", "dark", "system"]);

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && VALID_THEMES.has(value as Theme);
}

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: Exclude<Theme, "system">;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = PropsWithChildren<{
  defaultTheme?: Theme;
  storageKey?: string;
}>;

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function getSystemTheme(): Exclude<Theme, "system"> {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Exclude<Theme, "system">): void {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

function readStoredTheme(storageKey: string, fallback: Theme): Theme {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    return isTheme(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = DEFAULT_STORAGE_KEY
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme(storageKey, defaultTheme));
  const [resolvedTheme, setResolvedTheme] = useState<Exclude<Theme, "system">>(() =>
    theme === "system" ? getSystemTheme() : theme
  );

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    function syncTheme(): void {
      const nextResolvedTheme = theme === "system" ? getSystemTheme() : theme;
      setResolvedTheme(nextResolvedTheme);
      applyTheme(nextResolvedTheme);
    }

    syncTheme();
    media.addEventListener("change", syncTheme);

    return () => media.removeEventListener("change", syncTheme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      theme,
      resolvedTheme,
      setTheme(nextTheme) {
        try {
          window.localStorage.setItem(storageKey, nextTheme);
        } catch {
          // ignore quota or private-mode errors
        }
        setThemeState(nextTheme);
      }
    };
  }, [resolvedTheme, storageKey, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

export type ThemeScriptOptions = {
  defaultTheme?: Theme;
  storageKey?: string;
};

export function getThemeScript(options: ThemeScriptOptions = {}): string {
  const storageKey = JSON.stringify(options.storageKey ?? DEFAULT_STORAGE_KEY);
  const defaultTheme = JSON.stringify(options.defaultTheme ?? DEFAULT_THEME);
  return `(function(){try{var s=localStorage.getItem(${storageKey});var t=(s==="light"||s==="dark"||s==="system")?s:${defaultTheme};var r=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;var c=document.documentElement.classList;c.remove("light","dark");c.add(r);}catch(e){}})();`;
}

export function ThemeScript(options: ThemeScriptOptions = {}) {
  return <script dangerouslySetInnerHTML={{ __html: getThemeScript(options) }} />;
}

export {
  getRadiusScript,
  matchPreset,
  RADIUS_PRESET_LABELS,
  RadiusScript,
  radiusPresets,
  resolveScale,
  useRadiusPreset,
  type RadiusPreset,
  type RadiusScale,
  type RadiusScriptOptions,
  type RadiusValue,
  type UseRadiusOptions
} from "./radius";
