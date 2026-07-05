import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { LANGUAGES, type Lang } from "../i18n/translations";
import {
  useSettings,
  type ContentWidth,
  type TextSize,
  type ThemePref,
} from "./SettingsProvider";

/** Header button that opens the settings dialog. */
export function SettingsButton() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <button
        type="button"
        className="settings-trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <span aria-hidden>⚙</span>
        <span className="settings-trigger-label">{t("nav.settings")}</span>
      </button>
      <SettingsDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("settings.title")}
      className="settings-overlay"
    >
      <div className="settings-backdrop" onClick={onClose} aria-hidden />
      <div className="settings-modal">
        <header className="settings-modal-header">
          <div>
            <p className="settings-modal-title">{t("settings.title")}</p>
            <p className="settings-modal-subtitle">{t("settings.subtitle")}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("settings.close")}
            className="settings-close"
          >
            ✕
          </button>
        </header>
        <div className="settings-modal-body">
          <SettingsPanel />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function OptionCard({
  selected,
  label,
  description,
  onClick,
}: {
  selected: boolean;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`option-card${selected ? " selected" : ""}`}
    >
      <span className="option-card-label">{label}</span>
      <span className="option-card-desc">{description}</span>
    </button>
  );
}

function SettingsSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="settings-section">
      <p className="settings-section-eyebrow">{eyebrow}</p>
      <h3 className="settings-section-title">{title}</h3>
      <p className="settings-section-desc">{description}</p>
      {children}
    </section>
  );
}

function SettingsPanel() {
  const { t, lang, setLang } = useLanguage();
  const {
    theme,
    resolvedTheme,
    contentWidth,
    textSize,
    setTheme,
    setContentWidth,
    setTextSize,
  } = useSettings();

  const themeOptions: { value: ThemePref; label: string; description: string }[] = [
    {
      value: "system",
      label: t("theme.system"),
      description: t("settings.theme.system.desc"),
    },
    {
      value: "light",
      label: t("theme.light"),
      description: t("settings.theme.light.desc"),
    },
    { value: "dark", label: t("theme.dark"), description: t("settings.theme.dark.desc") },
  ];

  const widthOptions: { value: ContentWidth; label: string; description: string }[] = [
    {
      value: "standard",
      label: t("settings.width.standard.label"),
      description: t("settings.width.standard.desc"),
    },
    {
      value: "wide",
      label: t("settings.width.wide.label"),
      description: t("settings.width.wide.desc"),
    },
    {
      value: "full",
      label: t("settings.width.full.label"),
      description: t("settings.width.full.desc"),
    },
  ];

  const textOptions: { value: TextSize; label: string; description: string }[] = [
    {
      value: "small",
      label: t("settings.text.small.label"),
      description: t("settings.text.small.desc"),
    },
    {
      value: "standard",
      label: t("settings.text.standard.label"),
      description: t("settings.text.standard.desc"),
    },
    {
      value: "large",
      label: t("settings.text.large.label"),
      description: t("settings.text.large.desc"),
    },
  ];

  return (
    <div className="settings-grid">
      <SettingsSection
        eyebrow={t("settings.language.eyebrow")}
        title={t("settings.language.title")}
        description={t("settings.language.description")}
      >
        <div className="option-cards">
          {LANGUAGES.map((option) => (
            <OptionCard
              key={option.value}
              selected={lang === option.value}
              label={option.native}
              description={option.value === "en" ? "English" : "繁體中文（台灣）"}
              onClick={() => setLang(option.value as Lang)}
            />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        eyebrow={t("settings.theme.eyebrow")}
        title={t("settings.theme.title")}
        description={t("settings.theme.description")}
      >
        <div className="option-cards cols-3">
          {themeOptions.map((option) => (
            <OptionCard
              key={option.value}
              selected={theme === option.value}
              label={option.label}
              description={option.description}
              onClick={() => setTheme(option.value)}
            />
          ))}
        </div>
        <p className="settings-note">
          {t("settings.currentlyShowing", {
            value: resolvedTheme === "dark" ? t("theme.dark") : t("theme.light"),
          })}
        </p>
      </SettingsSection>

      <SettingsSection
        eyebrow={t("settings.width.eyebrow")}
        title={t("settings.width.title")}
        description={t("settings.width.description")}
      >
        <div className="option-cards">
          {widthOptions.map((option) => (
            <OptionCard
              key={option.value}
              selected={contentWidth === option.value}
              label={option.label}
              description={option.description}
              onClick={() => setContentWidth(option.value)}
            />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        eyebrow={t("settings.text.eyebrow")}
        title={t("settings.text.title")}
        description={t("settings.text.description")}
      >
        <div className="option-cards cols-3">
          {textOptions.map((option) => (
            <OptionCard
              key={option.value}
              selected={textSize === option.value}
              label={option.label}
              description={option.description}
              onClick={() => setTextSize(option.value)}
            />
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}
