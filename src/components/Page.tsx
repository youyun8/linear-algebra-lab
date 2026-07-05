import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { adjacentLessons, lessonBySlug } from "../lessons";

interface PageProps {
  slug: string;
  children: ReactNode;
}

/** Standard lesson page wrapper: eyebrow number, title, and prev/next footer. */
export function Page({ slug, children }: PageProps) {
  const meta = lessonBySlug(slug);
  const { prev, next } = adjacentLessons(slug);

  return (
    <article className="page">
      {meta && (
        <header>
          <div className="page-eyebrow">
            Section {meta.num} · {meta.group}
          </div>
          <h1>{meta.title}</h1>
          <p className="page-lede">{meta.description}</p>
        </header>
      )}

      {children}

      <nav className="page-nav">
        {prev ? (
          <Link to={`/${prev.slug}`}>
            <div className="dir">← Previous</div>
            <div className="ttl">{prev.title}</div>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/${next.slug}`} className="next">
            <div className="dir">Next →</div>
            <div className="ttl">{next.title}</div>
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
