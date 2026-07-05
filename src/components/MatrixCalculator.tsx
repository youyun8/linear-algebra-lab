import { useMemo, useState } from "react";
import type { Matrix } from "../lib/mathUtils";
import { multiplyMatrices, transpose, determinant2x2, shape } from "../lib/mathUtils";
import { MatrixInput, MatrixDisplay } from "./MatrixInput";
import { Equation } from "./Equation";

type Op = "multiply" | "transposeA" | "detA";

const OPS: { id: Op; label: string }[] = [
  { id: "multiply", label: "A × B" },
  { id: "transposeA", label: "Aᵀ" },
  { id: "detA", label: "det(A)" },
];

/**
 * General-purpose 2x2 matrix calculator used in the Matrices lesson. Lets the
 * student edit A and B and see the result of common operations.
 */
export function MatrixCalculator() {
  const [a, setA] = useState<Matrix>([
    [2, 1],
    [1, 3],
  ]);
  const [b, setB] = useState<Matrix>([
    [1, 0],
    [-1, 2],
  ]);
  const [op, setOp] = useState<Op>("multiply");

  const result = useMemo(() => {
    try {
      if (op === "multiply") return { matrix: multiplyMatrices(a, b) };
      if (op === "transposeA") return { matrix: transpose(a) };
      if (op === "detA") return { scalar: determinant2x2(a) };
    } catch (e) {
      return { error: (e as Error).message };
    }
    return {};
  }, [a, b, op]);

  const [ar, ac] = shape(a);

  return (
    <div className="canvas-wrap">
      <div className="mtx-wrap">
        <MatrixInput value={a} onChange={setA} label="Matrix A" />
        {op === "multiply" && <MatrixInput value={b} onChange={setB} label="Matrix B" />}
      </div>

      <div className="tag-row">
        {OPS.map((o) => (
          <button
            key={o.id}
            className={op === o.id ? "btn-primary" : ""}
            onClick={() => setOp(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "1rem" }}>
        {"error" in result && result.error ? (
          <p style={{ color: "#ef4444" }}>{result.error}</p>
        ) : "matrix" in result && result.matrix ? (
          <MatrixDisplay matrix={result.matrix} label="Result" />
        ) : "scalar" in result && result.scalar !== undefined ? (
          <Equation>{`\\det(A) = ${result.scalar}`}</Equation>
        ) : null}
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
        A is {ar}×{ac}. Try making a row of A a multiple of another and watch{" "}
        <code>det(A)</code> drop to 0 — that means A collapses the plane onto a line.
      </p>
    </div>
  );
}
