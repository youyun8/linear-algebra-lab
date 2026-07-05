import type { ReactNode } from "react";

interface HintProps {
  /** Label shown on the collapsed toggle. */
  label?: string;
  children: ReactNode;
}

/** Collapsible hint / reveal panel built on the native <details> element. */
export function Hint({ label = "Show hint", children }: HintProps) {
  return (
    <details className="hint">
      <summary>{label}</summary>
      <div className="hint-body">{children}</div>
    </details>
  );
}
