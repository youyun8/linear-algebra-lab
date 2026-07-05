import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface EquationProps {
  /** LaTeX source (without surrounding $ or $$). */
  children: string;
  /** Display (block, centered) vs inline. Defaults to block. */
  inline?: boolean;
}

/**
 * Reusable equation block. Renders LaTeX with KaTeX. Use <Eq> for inline math
 * inside a sentence and <Equation> for standalone display equations.
 */
export function Equation({ children, inline = false }: EquationProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, {
        displayMode: !inline,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return children;
    }
  }, [children, inline]);

  if (inline) {
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <div className="equation-block" dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Convenience wrapper for inline math. */
export function Eq({ children }: { children: string }) {
  return <Equation inline>{children}</Equation>;
}
