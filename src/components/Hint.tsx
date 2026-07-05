import type { ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

interface HintProps {
  /** Label shown on the collapsed toggle. */
  label?: string;
  children: ReactNode;
}

/** Collapsible hint / reveal panel built on the native <details> element. */
export function Hint({ label, children }: HintProps) {
  const { t } = useLanguage();
  return (
    <details className="hint">
      <summary>{label ?? t("hint.show")}</summary>
      <div className="hint-body">{children}</div>
    </details>
  );
}
