import type { ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

interface MLCalloutProps {
  title?: string;
  /** Optional "Last reviewed" date for fast-changing ML topics. */
  reviewed?: string;
  children: ReactNode;
}

/**
 * ML connection callout. Every major topic links back to machine learning
 * through one of these. For fast-moving ML topics we show a "Last reviewed"
 * note and keep the explanation anchored to stable mathematical foundations.
 */
export function MLCallout({ title, reviewed, children }: MLCalloutProps) {
  const { t } = useLanguage();
  return (
    <div className="callout callout-ml">
      <div className="callout-title">
        <span aria-hidden>🤖</span> {title ?? t("callout.ml")}
      </div>
      <div>{children}</div>
      {reviewed && (
        <div className="reviewed-note">{t("callout.reviewed", { date: reviewed })}</div>
      )}
    </div>
  );
}

/** Generic warning / heads-up callout. */
export function Warn({ children }: { children: ReactNode }) {
  return (
    <div className="callout callout-warn">
      <div>{children}</div>
    </div>
  );
}
