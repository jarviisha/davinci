import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getThemeScript, ThemeProvider, useTheme } from "./index";
import type { PropsWithChildren } from "react";

function setMatchMedia(prefersDark: boolean): void {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("dark") ? prefersDark : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });
}

function wrap(props: Parameters<typeof ThemeProvider>[0]) {
  return function Wrapper({ children }: PropsWithChildren) {
    return <ThemeProvider {...props}>{children}</ThemeProvider>;
  };
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = "";
    setMatchMedia(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("resolves system preference when defaultTheme is 'system'", () => {
    setMatchMedia(true);

    const { result } = renderHook(() => useTheme(), {
      wrapper: wrap({ defaultTheme: "system", children: null })
    });

    expect(result.current.theme).toBe("system");
    expect(result.current.resolvedTheme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("uses defaultTheme when localStorage is empty", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: wrap({ defaultTheme: "dark", children: null })
    });

    expect(result.current.theme).toBe("dark");
    expect(result.current.resolvedTheme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("falls back to defaultTheme when localStorage contains garbage", () => {
    window.localStorage.setItem("davinci-theme", "not-a-real-theme");

    const { result } = renderHook(() => useTheme(), {
      wrapper: wrap({ defaultTheme: "light", children: null })
    });

    expect(result.current.theme).toBe("light");
    expect(result.current.resolvedTheme).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists theme to localStorage when setTheme is called", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: wrap({ defaultTheme: "light", children: null })
    });

    act(() => {
      result.current.setTheme("dark");
    });

    expect(window.localStorage.getItem("davinci-theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(result.current.resolvedTheme).toBe("dark");
  });

  it("reads the previously stored theme on next mount", () => {
    window.localStorage.setItem("davinci-theme", "dark");

    const { result } = renderHook(() => useTheme(), {
      wrapper: wrap({ defaultTheme: "light", children: null })
    });

    expect(result.current.theme).toBe("dark");
    expect(result.current.resolvedTheme).toBe("dark");
  });

  it("honors a custom storageKey", () => {
    window.localStorage.setItem("my-app-theme", "dark");

    const { result } = renderHook(() => useTheme(), {
      wrapper: wrap({ defaultTheme: "light", storageKey: "my-app-theme", children: null })
    });

    expect(result.current.theme).toBe("dark");

    act(() => {
      result.current.setTheme("light");
    });

    expect(window.localStorage.getItem("my-app-theme")).toBe("light");
    expect(window.localStorage.getItem("davinci-theme")).toBeNull();
  });

  it("throws when useTheme is called outside the provider", () => {
    expect(() => renderHook(() => useTheme())).toThrowError(/inside ThemeProvider/);
  });
});

describe("getThemeScript", () => {
  it("emits a script that reads the configured storage key", () => {
    const script = getThemeScript({ defaultTheme: "dark", storageKey: "k" });
    expect(script).toContain('localStorage.getItem("k")');
    expect(script).toContain('"dark"');
  });

  it("emits a script that ignores invalid stored values", () => {
    const script = getThemeScript({ defaultTheme: "light" });
    expect(script).toMatch(/s==="light"\|\|s==="dark"\|\|s==="system"/);
  });
});
