import { useMemo, useState } from "react";
import type { Matrix } from "../lib/mathUtils";
import { svd2x2, eigen2x2, matrixToLatex, fmt } from "../lib/mathUtils";
import { MatrixInput } from "./MatrixInput";
import { Equation } from "./Equation";

const PRESETS: { label: string; m: Matrix }[] = [
  {
    label: "Textbook",
    m: [
      [3, 0],
      [4, 5],
    ],
  },
  {
    label: "Diagonal",
    m: [
      [3, 0],
      [0, 2],
    ],
  },
  {
    label: "Shear",
    m: [
      [1, 1],
      [0, 1],
    ],
  },
  {
    label: "Rank 1",
    m: [
      [2, 4],
      [1, 2],
    ],
  },
];

/**
 * Interactive step-by-step 2x2 SVD calculator. Walks through the manual recipe:
 * form AᵀA, find its eigenvalues (= σ²), get right singular vectors V, then
 * left singular vectors U, and finally reconstruct A = U Σ Vᵀ.
 */
export function SVDCalculator() {
  const [A, setA] = useState<Matrix>([
    [3, 0],
    [4, 5],
  ]);

  const data = useMemo(() => {
    try {
      const svd = svd2x2(A);
      const eig = eigen2x2(svd.ATA);
      return { svd, eig, error: null as string | null };
    } catch (e) {
      return { svd: null, eig: null, error: (e as Error).message };
    }
  }, [A]);

  if (data.error || !data.svd || !data.eig) {
    return (
      <div className="canvas-wrap">
        <MatrixInput value={A} onChange={setA} label="Matrix A" />
        <p style={{ color: "#ef4444" }}>{data.error}</p>
      </div>
    );
  }

  const { svd, eig } = data;
  const lambdas = [...eig.eigenvalues].sort((a, b) => b - a);
  while (lambdas.length < 2) lambdas.push(lambdas[0] ?? 0);

  return (
    <div className="canvas-wrap">
      <div className="mtx-wrap">
        <MatrixInput value={A} onChange={setA} label="Matrix A" />
        <div className="tag-row">
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => setA(p.m)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="steps" style={{ marginTop: "1rem" }}>
        <div className="steps-header">
          <span>SVD, step by step</span>
        </div>

        <div className="step">
          <div className="step-num">Step 1 — Form AᵀA</div>
          <Equation>{`A^{\\mathsf T}A = ${matrixToLatex(svd.ATA)}`}</Equation>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
            AᵀA is symmetric, so it has real, non-negative eigenvalues.
          </p>
        </div>

        <div className="step">
          <div className="step-num">Step 2 — Eigenvalues of AᵀA</div>
          <Equation>{`\\lambda_1 = ${fmt(lambdas[0])}, \\quad \\lambda_2 = ${fmt(lambdas[1])}`}</Equation>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Solved from det(AᵀA − λI) = 0. Trace = {fmt(eig.trace)}, det ={" "}
            {fmt(eig.determinant)}.
          </p>
        </div>

        <div className="step">
          <div className="step-num">Step 3 — Singular values σ = √λ</div>
          <Equation>{`\\sigma_1 = ${fmt(svd.singularValues[0])}, \\quad \\sigma_2 = ${fmt(svd.singularValues[1])}`}</Equation>
        </div>

        <div className="step">
          <div className="step-num">
            Step 4 — Right singular vectors V (eigenvectors of AᵀA)
          </div>
          <Equation>{`V = ${matrixToLatex(svd.V)}`}</Equation>
        </div>

        <div className="step">
          <div className="step-num">Step 5 — Left singular vectors U (uᵢ = Avᵢ / σᵢ)</div>
          <Equation>{`U = ${matrixToLatex(svd.U)}`}</Equation>
        </div>

        <div className="step">
          <div className="step-num">Step 6 — Assemble Σ</div>
          <Equation>{`\\Sigma = ${matrixToLatex(svd.S)}`}</Equation>
        </div>

        <div className="step">
          <div className="step-num">Step 7 — Reconstruct A = U Σ Vᵀ</div>
          <Equation>
            {`U\\,\\Sigma\\,V^{\\mathsf T} = ${matrixToLatex(svd.reconstruction)} = A \\; ✓`}
          </Equation>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Small rounding may appear in the last digits; the decomposition is exact in
            theory.
          </p>
        </div>
      </div>
    </div>
  );
}
