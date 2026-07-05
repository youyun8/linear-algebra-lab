import { useMemo, useState } from "react";
import type { Matrix } from "../lib/mathUtils";
import { gaussianElimination, matrixToLatex } from "../lib/mathUtils";
import { MatrixInput } from "./MatrixInput";
import { Equation } from "./Equation";

const PRESETS: { label: string; m: Matrix }[] = [
  {
    label: "Unique solution",
    m: [
      [1, 1, 5],
      [2, -1, 1],
    ],
  },
  {
    label: "Infinitely many",
    m: [
      [1, 2, 3],
      [2, 4, 6],
    ],
  },
  {
    label: "No solution",
    m: [
      [1, 1, 2],
      [1, 1, 5],
    ],
  },
  {
    label: "3×3 system",
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
  const [m, setM] = useState<Matrix>([
    [1, 1, 5],
    [2, -1, 1],
  ]);
  const [shown, setShown] = useState(1);

  const result = useMemo(() => gaussianElimination(m), [m]);
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
          label="Augmented matrix [A | b]"
        />
        <div className="tag-row">
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => load(p.m)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="steps">
        <div className="steps-header">
          <span>
            Row reduction — step {visible} of {steps.length}
          </span>
          <div className="steps-controls">
            <button
              onClick={() => setShown((s) => Math.max(1, s - 1))}
              disabled={visible <= 1}
            >
              ← Back
            </button>
            <button
              className="btn-primary"
              onClick={() => setShown((s) => Math.min(steps.length, s + 1))}
              disabled={visible >= steps.length}
            >
              Next step →
            </button>
            <button
              onClick={() => setShown(steps.length)}
              disabled={visible >= steps.length}
            >
              Show all
            </button>
          </div>
        </div>
        {steps.slice(0, visible).map((step, i) => (
          <div className="step" key={i}>
            <div className="step-num">Step {i + 1}</div>
            <p style={{ marginTop: 0 }}>{step.description}</p>
            <Equation>{matrixToLatex(step.matrix)}</Equation>
          </div>
        ))}
      </div>

      <div className="readout">
        {`rank(A|b) = ${result.rank}   pivots in columns: ${result.pivotColumns.map((c) => c + 1).join(", ") || "none"}`}
      </div>
    </div>
  );
}
