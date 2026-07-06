import type { ReactNode } from "react";

interface FigureProps {
  /** Localized caption rendered under the diagram. */
  caption?: ReactNode;
  children: ReactNode;
}

/**
 * Lightweight wrapper for a static, illustrative diagram (an SVG) plus a
 * caption. Distinct from the interactive `canvas-wrap` demos: figures explain a
 * concept at a glance and don't take input. Theme-aware via CSS variables.
 */
export function Figure({ caption, children }: FigureProps) {
  return (
    <figure className="concept-figure">
      <div className="concept-figure-plot">{children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
