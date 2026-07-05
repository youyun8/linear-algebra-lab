import { useLanguage } from "../i18n/LanguageProvider";
import { useSettings, type ThemePref } from "./SettingsProvider";

const ICONS: Record<ThemePref, string> = {
  system: "🖥️",
  light: "☀️",
  dark: "🌙",
};

const NEXT: Record<ThemePref, ThemePref> = {
  system: "light",
  light: "dark",
  dark: "system",
};

/** Cycles system → light → dark → system, mirroring the reference site. */
export function ThemeToggle() {
  const { theme, setTheme } = useSettings();
  const { t } = useLanguage();

  const label = t(`theme.${theme}`);

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(NEXT[theme])}
      aria-label={label}
      title={label}
    >
      <span aria-hidden>{ICONS[theme]}</span>
      <span className="theme-toggle-label">{label}</span>
    </button>
  );
}
