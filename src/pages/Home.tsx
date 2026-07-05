import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { localizedLessons } from "../i18n/translations";

export function Home() {
  const { t, lang } = useLanguage();
  const lessons = localizedLessons(lang);

  const rhythm = [
    { k: t("home.rhythm.intuition.k"), v: t("home.rhythm.intuition.v") },
    { k: t("home.rhythm.definition.k"), v: t("home.rhythm.definition.v") },
    { k: t("home.rhythm.example.k"), v: t("home.rhythm.example.v") },
    { k: t("home.rhythm.manual.k"), v: t("home.rhythm.manual.v") },
    { k: t("home.rhythm.demo.k"), v: t("home.rhythm.demo.v") },
    { k: t("home.rhythm.ml.k"), v: t("home.rhythm.ml.v") },
    { k: t("home.rhythm.practice.k"), v: t("home.rhythm.practice.v") },
  ];

  return (
    <div className="page">
      <div className="hero">
        <span className="pill">{t("home.pill")}</span>
        <h1>{t("home.h1")}</h1>
        <p>{t("home.lede")}</p>
        <div className="hero-actions">
          <Link to="/start-here" className="btn btn-primary">
            {t("home.cta.start")}
          </Link>
          <Link to="/svd" className="btn">
            {t("home.cta.svd")}
          </Link>
        </div>
      </div>

      <h2>{t("home.able.title")}</h2>
      <ul>
        <li>{t("home.able.1")}</li>
        <li>{t("home.able.2")}</li>
        <li>{t("home.able.3")}</li>
      </ul>

      <h2>{t("home.course.title")}</h2>
      <div className="card-grid">
        {lessons.map((l) => (
          <Link key={l.slug} to={`/${l.slug}`} className="link-card">
            <div className="lc-num">{t("page.section", { num: l.num })}</div>
            <div className="lc-title">{l.title}</div>
            <div className="lc-desc">{l.description}</div>
          </Link>
        ))}
      </div>

      <h2>{t("home.structure.title")}</h2>
      <p>{t("home.structure.intro")}</p>
      <ol>
        {rhythm.map((r) => (
          <li key={r.k}>
            <strong>{r.k}</strong> — {r.v}
          </li>
        ))}
      </ol>
    </div>
  );
}
