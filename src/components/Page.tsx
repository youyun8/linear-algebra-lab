import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { adjacentLessons, lessonBySlug } from "../lessons";
import { useLanguage } from "../i18n/LanguageProvider";
import { localizeLesson } from "../i18n/translations";

interface PageProps {
  slug: string;
  children: ReactNode;
}

/** Standard lesson page wrapper: eyebrow number, title, and prev/next footer. */
export function Page({ slug, children }: PageProps) {
  const { t, lang } = useLanguage();
  const rawMeta = lessonBySlug(slug);
  const meta = rawMeta ? localizeLesson(rawMeta, lang) : undefined;
  const { prev, next } = adjacentLessons(slug);
  const prevMeta = prev ? localizeLesson(prev, lang) : undefined;
  const nextMeta = next ? localizeLesson(next, lang) : undefined;

  return (
    <article className="page">
      {meta && (
        <header>
          <div className="page-eyebrow">
            {t("page.sectionGroup", { num: meta.num, group: t(`group.${meta.group}`) })}
          </div>
          <h1>{meta.title}</h1>
          <p className="page-lede">{meta.description}</p>
        </header>
      )}

      {children}

      <nav className="page-nav">
        {prevMeta ? (
          <Link to={`/${prevMeta.slug}`}>
            <div className="dir">{t("page.prev")}</div>
            <div className="ttl">{prevMeta.title}</div>
          </Link>
        ) : (
          <span />
        )}
        {nextMeta ? (
          <Link to={`/${nextMeta.slug}`} className="next">
            <div className="dir">{t("page.next")}</div>
            <div className="ttl">{nextMeta.title}</div>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

/**
 * The seven-part lesson rhythm the site follows. Renders a small labelled
 * section heading so every page keeps the same pedagogical structure:
 * Intuition → Definition → Example → Manual calc → Demo → ML → Practice.
 */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
