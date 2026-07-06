import { useMemo, useState } from "react";
import type { Matrix } from "../lib/mathUtils";
import { gaussianElimination, matrixToLatex } from "../lib/mathUtils";
import { MatrixInput } from "./MatrixInput";
import { Equation } from "./Equation";
import { useLanguage } from "../i18n/LanguageProvider";

const PRESETS: { labelKey: string; m: Matrix }[] = [
  {
    labelKey: "gauss.preset.unique",
    m: [
      [1, 1, 5],
      [2, -1, 1],
    ],
  },
  {
    labelKey: "gauss.preset.infinite",
    m: [
      [1, 2, 3],
      [2, 4, 6],
    ],
  },
  {
    labelKey: "gauss.preset.none",
    m: [
      [1, 1, 2],
      [1, 1, 5],
    ],
  },
  {
    labelKey: "gauss.preset.3x3",
    m: [
      [2, 1, -1, 8],
      [-3, -1, 2, -11],
      [-2, 1, 2, -3],
    ],
  },
];

/**
 * Interactive step-by-step Gaussian elimination. The last column is treated as
 * the augmented (right-hand-side) column and drawn with a divider so students
 * read it as [A | b]. Steps are revealed one at a time.
 */
export function GaussianDemo() {
  const { t } = useLanguage();
  const [m, setM] = useState<Matrix>([
    [1, 1, 5],
    [2, -1, 1],
  ]);
  const [shown, setShown] = useState(1);

  const result = useMemo(() => gaussianElimination(m, t), [m, t]);
  const steps = result.steps;
  const visible = Math.min(shown, steps.length);

  const load = (preset: Matrix) => {
    setM(preset);
    setShown(1);
  };

  return (
    <div className="canvas-wrap">
      <div className="mtx-wrap">
        <MatrixInput
          value={m}
          onChange={(x) => {
            setM(x);
            setShown(1);
          }}
          label={t("gauss.augmented")}
        />
        <div className="tag-row">
          {PRESETS.map((p) => (
            <button key={p.labelKey} onClick={() => load(p.m)}>
              {t(p.labelKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="steps">
        <div className="steps-header">
          <span>{t("gauss.header", { step: visible, total: steps.length })}</span>
          <div className="steps-controls">
            <button
              onClick={() => setShown((s) => Math.max(1, s - 1))}
              disabled={visible <= 1}
            >
              {t("steps.back")}
            </button>
            <button
              className="btn-primary"
              onClick={() => setShown((s) => Math.min(steps.length, s + 1))}
              disabled={visible >= steps.length}
            >
              {t("steps.next")}
            </button>
            <button
              onClick={() => setShown(steps.length)}
              disabled={visible >= steps.length}
            >
              {t("steps.showAll")}
            </button>
          </div>
        </div>
        {steps.slice(0, visible).map((step, i) => (
          <div className="step" key={i}>
            <div className="step-num">{t("steps.step", { num: i + 1 })}</div>
            <p style={{ marginTop: 0 }}>{step.description}</p>
            <Equation>{matrixToLatex(step.matrix)}</Equation>
          </div>
        ))}
      </div>

      <div className="readout">
        {t("gauss.readout", {
          rank: result.rank,
          cols: result.pivotColumns.map((c) => c + 1).join(", ") || t("gauss.none"),
        })}
      </div>
    </div>
  );
}
