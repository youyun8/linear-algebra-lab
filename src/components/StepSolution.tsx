import { useState } from "react";
import type { ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

export interface SolutionStep {
  title?: string;
  content: ReactNode;
}

interface StepSolutionProps {
  title?: string;
  steps: SolutionStep[];
  /** Start with all steps hidden and reveal one at a time. */
  reveal?: boolean;
}

/**
 * Step-by-step solution panel. Supports a "reveal one step at a time" mode so
 * students can attempt each step before seeing the answer.
 */
export function StepSolution({ title, steps, reveal = true }: StepSolutionProps) {
  const { t } = useLanguage();
  const [shown, setShown] = useState(reveal ? 0 : steps.length);

  const allShown = shown >= steps.length;

  return (
    <div className="steps">
      <div className="steps-header">
        <span>{title ?? t("steps.title")}</span>
        {reveal && (
          <div className="steps-controls">
            <button
              onClick={() => setShown((s) => Math.max(0, s - 1))}
              disabled={shown === 0}
            >
              {t("steps.back")}
            </button>
            <button
              className="btn-primary"
              onClick={() => setShown((s) => Math.min(steps.length, s + 1))}
              disabled={allShown}
            >
              {shown === 0 ? t("steps.revealFirst") : t("steps.next")}
            </button>
            <button onClick={() => setShown(steps.length)} disabled={allShown}>
              {t("steps.showAll")}
            </button>
          </div>
        )}
      </div>
      {steps.map((step, i) => {
        const visible = i < shown;
        return (
          <div className={`step${visible ? "" : " dim"}`} key={i} aria-hidden={!visible}>
            <div className="step-num">
              {t("steps.step", { num: i + 1 })}
              {step.title ? ` — ${step.title}` : ""}
            </div>
            {visible ? step.content : <div style={{ height: "1.2rem" }}>· · ·</div>}
          </div>
        );
      })}
    </div>
  );
}
