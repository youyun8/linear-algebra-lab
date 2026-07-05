import { useState } from "react";
import type { ReactNode } from "react";

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
export function StepSolution({
  title = "Step-by-step solution",
  steps,
  reveal = true,
}: StepSolutionProps) {
  const [shown, setShown] = useState(reveal ? 0 : steps.length);

  const allShown = shown >= steps.length;

  return (
    <div className="steps">
      <div className="steps-header">
        <span>{title}</span>
        {reveal && (
          <div className="steps-controls">
            <button
              onClick={() => setShown((s) => Math.max(0, s - 1))}
              disabled={shown === 0}
            >
              ← Back
            </button>
            <button
              className="btn-primary"
              onClick={() => setShown((s) => Math.min(steps.length, s + 1))}
              disabled={allShown}
            >
              {shown === 0 ? "Reveal first step" : "Next step →"}
            </button>
            <button onClick={() => setShown(steps.length)} disabled={allShown}>
              Show all
            </button>
          </div>
        )}
      </div>
      {steps.map((step, i) => {
        const visible = i < shown;
        return (
          <div className={`step${visible ? "" : " dim"}`} key={i} aria-hidden={!visible}>
            <div className="step-num">
              Step {i + 1}
              {step.title ? ` — ${step.title}` : ""}
            </div>
            {visible ? step.content : <div style={{ height: "1.2rem" }}>· · ·</div>}
          </div>
        );
      })}
    </div>
  );
}
