import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type ThemePref = "system" | "light" | "dark";
export type ContentWidth = "standard" | "wide" | "full";
export type TextSize = "small" | "standard" | "large";

const THEME_KEY = "la-lab-theme";
const WIDTH_KEY = "la-lab-width";
const TEXT_KEY = "la-lab-text-size";

interface SettingsContextValue {
  theme: ThemePref;
  resolvedTheme: "light" | "dark";
  contentWidth: ContentWidth;
  textSize: TextSize;
  setTheme: (value: ThemePref) => void;
  setContentWidth: (value: ContentWidth) => void;
  setTextSize: (value: TextSize) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

function readStored<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T,
): T {
  try {
    const saved = localStorage.getItem(key);
    if (saved && (allowed as readonly string[]).includes(saved)) return saved as T;
  } catch {
    /* storage unavailable */
  }
  return fallback;
}

function systemPrefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function resolveTheme(theme: ThemePref): "light" | "dark" {
  if (theme === "system") return systemPrefersDark() ? "dark" : "light";
  return theme;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePref>(() =>
    readStored(THEME_KEY, ["system", "light", "dark"] as const, "system"),
  );
  const [contentWidth, setContentWidthState] = useState<ContentWidth>(() =>
    readStored(WIDTH_KEY, ["standard", "wide", "full"] as const, "standard"),
  );
  const [textSize, setTextSizeState] = useState<TextSize>(() =>
    readStored(TEXT_KEY, ["small", "standard", "large"] as const, "standard"),
  );
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() =>
    resolveTheme(theme),
  );

  useEffect(() => {
    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const next = media.matches ? "dark" : "light";
      setResolvedTheme(next);
      document.documentElement.setAttribute("data-theme", next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (contentWidth === "standard") delete root.dataset.width;
    else root.dataset.width = contentWidth;
    try {
      localStorage.setItem(WIDTH_KEY, contentWidth);
    } catch {
      /* ignore */
    }
  }, [contentWidth]);

  useEffect(() => {
    const root = document.documentElement;
    if (textSize === "standard") delete root.dataset.textSize;
    else root.dataset.textSize = textSize;
    try {
      localStorage.setItem(TEXT_KEY, textSize);
    } catch {
      /* ignore */
    }
  }, [textSize]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        resolvedTheme,
        contentWidth,
        textSize,
        setTheme: setThemeState,
        setContentWidth: setContentWidthState,
        setTextSize: setTextSizeState,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
