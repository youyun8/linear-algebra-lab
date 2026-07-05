import { useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { LESSONS } from "../lessons";
import type { LessonMeta } from "../lessons";
import { ThemeToggle } from "./ThemeToggle";
import { SettingsButton } from "./Settings";
import { useLanguage } from "../i18n/LanguageProvider";
import { localizeLesson } from "../i18n/translations";

const GROUP_ORDER: LessonMeta["group"][] = [
  "Foundations",
  "Core Theory",
  "Decompositions",
  "Applications",
  "Practice",
];

/** App shell: sticky sidebar navigation, responsive mobile drawer, settings + theme controls. */
export function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t, lang } = useLanguage();

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    items: LESSONS.filter((l) => l.group === group).map((l) => localizeLesson(l, lang)),
  }));

  return (
    <div className="app-shell">
      <aside className={`sidebar${open ? " open" : ""}`}>
        <Link to="/" className="sidebar-brand" onClick={() => setOpen(false)}>
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" />
          {t("brand.name")}
        </Link>
        <nav>
          {grouped.map(({ group, items }) => (
            <div key={group}>
              <div className="nav-group-title">{t(`group.${group}`)}</div>
              {items.map((l) => (
                <NavLink
                  key={l.slug}
                  to={`/${l.slug}`}
                  className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="nav-num">{l.num}</span>
                  {l.short}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <SettingsButton />
          <ThemeToggle />
        </div>
      </aside>

      <div className={`scrim${open ? " show" : ""}`} onClick={() => setOpen(false)} />

      <div className="content">
        <div className="topbar">
          <button
            className="icon-btn menu-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label={t("nav.toggleMenu")}
          >
            ☰
          </button>
          <strong>{t("brand.name")}</strong>
          <div className="topbar-actions">
            <SettingsButton />
            <ThemeToggle />
          </div>
        </div>

        <main className="main">
          {/* Remount page content on route change so scroll/reveal state resets. */}
          <div key={location.pathname}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
