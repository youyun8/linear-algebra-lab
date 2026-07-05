import { useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { LESSONS } from "../lessons";
import type { LessonMeta } from "../lessons";
import { ThemeToggle } from "./ThemeToggle";

const GROUP_ORDER: LessonMeta["group"][] = [
  "Foundations",
  "Core Theory",
  "Decompositions",
  "Applications",
  "Practice",
];

/** App shell: sticky sidebar navigation, responsive mobile drawer, theme toggle. */
export function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    items: LESSONS.filter((l) => l.group === group),
  }));

  return (
    <div className="app-shell">
      <aside className={`sidebar${open ? " open" : ""}`}>
        <Link to="/" className="sidebar-brand" onClick={() => setOpen(false)}>
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" />
          Linear Algebra Lab
        </Link>
        <nav>
          {grouped.map(({ group, items }) => (
            <div key={group}>
              <div className="nav-group-title">{group}</div>
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
      </aside>

      <div className={`scrim${open ? " show" : ""}`} onClick={() => setOpen(false)} />

      <div className="content">
        <div className="topbar">
          <button
            className="icon-btn menu-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <strong>Linear Algebra Lab</strong>
          <ThemeToggle />
        </div>

        <main className="main">
          <div
            style={{ display: "flex", justifyContent: "flex-end", marginBottom: "-1rem" }}
            className="desktop-theme"
          >
            <ThemeToggle />
          </div>
          {/* Remount page content on route change so scroll/reveal state resets. */}
          <div key={location.pathname}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
