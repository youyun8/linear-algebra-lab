import type { Matrix } from "../lib/mathUtils";
import { Equation } from "./Equation";
import { matrixToLatex } from "../lib/mathUtils";

interface MatrixInputProps {
  value: Matrix;
  onChange: (m: Matrix) => void;
  label?: string;
  min?: number;
  max?: number;
}

/** Editable grid of number inputs representing a matrix. */
export function MatrixInput({ value, onChange, label }: MatrixInputProps) {
  const cols = value[0]?.length ?? 0;

  const setCell = (r: number, c: number, raw: string) => {
    const num = raw === "" || raw === "-" ? 0 : Number(raw);
    if (Number.isNaN(num)) return;
    const next = value.map((row) => row.slice());
    next[r][c] = num;
    onChange(next);
  };

  return (
    <div>
      {label && <div className="mtx-label">{label}</div>}
      <div
        className="matrix-input"
        style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}
      >
        {value.map((row, r) =>
          row.map((cell, c) => (
            <input
              key={`${r}-${c}`}
              type="number"
              step="any"
              value={Number.isFinite(cell) ? cell : 0}
              aria-label={`row ${r + 1} column ${c + 1}`}
              onChange={(e) => setCell(r, c, e.target.value)}
            />
          )),
        )}
      </div>
    </div>
  );
}

/** Read-only rendered matrix (LaTeX) with an optional label. */
export function MatrixDisplay({
  matrix,
  label,
  dp = 3,
}: {
  matrix: Matrix;
  label?: string;
  dp?: number;
}) {
  return (
    <div>
      {label && <div className="mtx-label">{label}</div>}
      <Equation>{matrixToLatex(matrix, dp)}</Equation>
    </div>
  );
}
