import { useMemo, useState } from "react";
import type { Matrix } from "../lib/mathUtils";
import {
  applyMatrix,
  diagonalize2x2,
  fmt,
  matrixToLatex,
  normalize,
  scaleVector,
  svd2x2,
  transpose,
} from "../lib/mathUtils";
import { MatrixInput } from "./MatrixInput";
import { Equation } from "./Equation";
import { useLanguage } from "../i18n/LanguageProvider";

type Vec = [number, number];

const SIZE = 360;
const RANGE = 3.2;
const scale = SIZE / (2 * RANGE);
function toPx([x, y]: Vec): Vec {
  return [SIZE / 2 + x * scale, SIZE / 2 - y * scale];
}

const PRESETS: { labelKey: string; m: Matrix }[] = [
  {
    // Symmetric PSD → SVD equals diagonalization exactly.
    labelKey: "dvs.preset.sympsd",
    m: [
      [2, 1],
      [1, 2],
    ],
  },
  {
    // Symmetric but indefinite (a negative eigenvalue) → sign pushed into U.
    labelKey: "dvs.preset.symind",
    m: [
      [1, 2],
      [2, 1],
    ],
  },
  {
    // Non-symmetric, diagonalizable → P oblique, U/V orthogonal.
    labelKey: "dvs.preset.nonsym",
    m: [
      [4, 1],
      [2, 3],
    ],
  },
  {
    // Defective (shear) → not diagonalizable, but SVD still exists.
    labelKey: "dvs.preset.defective",
    m: [
      [1, 1],
      [0, 1],
    ],
  },
  {
    // Rotation → complex eigenvalues, SVD is Σ = I.
    labelKey: "dvs.preset.rotation",
    m: [
      [0, -1],
      [1, 0],
    ],
  },
];

/**
 * Side-by-side explorer that runs BOTH factorizations on the same 2x2 matrix.
 * The left panel diagonalizes A = P D P⁻¹ (and says so honestly when A is
 * defective or has complex eigenvalues); the right panel computes A = U Σ Vᵀ,
 * which always exists. The plot overlays the (possibly oblique) eigenvector
 * directions against the always-orthogonal right singular vectors, so students
 * can see exactly when the two sets of "natural axes" coincide.
 */
export function DiagVsSVDExplorer() {
  const { t } = useLanguage();
  const [A, setA] = useState<Matrix>([
    [4, 1],
    [2, 3],
  ]);

  const data = useMemo(() => {
    try {
      return { diag: diagonalize2x2(A), svd: svd2x2(A), error: null as string | null };
    } catch (e) {
      return { diag: null, svd: null, error: (e as Error).message };
    }
  }, [A]);

  if (data.error || !data.diag || !data.svd) {
    return (
      <div className="canvas-wrap">
        <MatrixInput value={A} onChange={setA} label={t("mtx.matrixA")} />
        <p style={{ color: "#ef4444" }}>{data.error}</p>
      </div>
    );
  }

  const { diag, svd } = data;

  // Right singular vector directions (columns of V).
  const vCols: Vec[] = [
    [svd.V[0][0], svd.V[1][0]],
    [svd.V[0][1], svd.V[1][1]],
  ];
  // Eigenvector directions (columns of P), if any real eigenvectors exist.
  const pCols: Vec[] = diag.complex
    ? []
    : [
        [diag.P[0][0], diag.P[1][0]],
        [diag.P[0][1], diag.P[1][1]],
      ];

  const o = toPx([0, 0]);

  // Unit circle sampled and mapped to the output ellipse.
  const N = 72;
  const ellipsePts: string = Array.from({ length: N + 1 }, (_, i) => {
    const a = (i / N) * 2 * Math.PI;
    const p = applyMatrix(A, [Math.cos(a), Math.sin(a)]) as Vec;
    return toPx(p).join(",");
  }).join(" ");

  const axisLine = (u: Vec, color: string, key: string, dashed: boolean) => {
    const dir = normalize(u) as Vec;
    const p1 = toPx(scaleVector(dir, RANGE) as Vec);
    const p2 = toPx(scaleVector(dir, -RANGE) as Vec);
    return (
      <line
        key={key}
        x1={p1[0]}
        y1={p1[1]}
        x2={p2[0]}
        y2={p2[1]}
        stroke={color}
        strokeWidth={dashed ? 1.8 : 2.4}
        strokeDasharray={dashed ? "7 5" : undefined}
        opacity={dashed ? 0.95 : 0.85}
      />
    );
  };

  // Singular output axes: A vᵢ (length σᵢ) trace the output ellipse's axes.
  const sigmaArrows = vCols.map((v, i) => {
    const sigma = svd.singularValues[i];
    const mapped = applyMatrix(A, v) as Vec;
    const tip = toPx(mapped);
    return (
      <line
        key={`sig-${i}`}
        x1={o[0]}
        y1={o[1]}
        x2={tip[0]}
        y2={tip[1]}
        stroke="var(--accent)"
        strokeWidth={2.6}
        markerEnd="url(#dvsU)"
        opacity={sigma > 1e-6 ? 0.9 : 0.3}
      />
    );
  });

  // Symmetric ⇒ eigenvectors orthonormal ⇒ they align with the singular axes.
  const sameAxes = !diag.complex && diag.diagonalizable && diag.symmetric;

  const statusKey = diag.complex
    ? "dvs.status.complex"
    : !diag.diagonalizable
      ? "dvs.status.defective"
      : diag.symmetric
        ? "dvs.status.symmetric"
        : "dvs.status.nonsym";

  return (
    <div className="canvas-wrap">
      <div className="mtx-wrap">
        <MatrixInput value={A} onChange={setA} label={t("mtx.matrixA")} />
        <div className="tag-row">
          {PRESETS.map((p) => (
            <button key={p.labelKey} onClick={() => setA(p.m)}>
              {t(p.labelKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="dvs-plot-wrap">
        <svg
          className="svg-canvas"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ maxWidth: SIZE }}
        >
          <defs>
            <marker
              id="dvsU"
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L7,3 L0,6 Z" fill="var(--accent)" />
            </marker>
          </defs>
          {/* grid axes */}
          <line x1={0} y1={SIZE / 2} x2={SIZE} y2={SIZE / 2} stroke="var(--grid)" />
          <line x1={SIZE / 2} y1={0} x2={SIZE / 2} y2={SIZE} stroke="var(--grid)" />
          {/* unit circle (input) */}
          <circle
            cx={o[0]}
            cy={o[1]}
            r={scale}
            fill="var(--primary-soft)"
            stroke="var(--primary)"
            strokeWidth={1.2}
            opacity={0.5}
          />
          {/* output ellipse A·(unit circle) */}
          <polyline
            points={ellipsePts}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={1.6}
            opacity={0.85}
          />
          {/* eigenvector directions (orange dashed) */}
          {pCols.map((v, i) => axisLine(v, "#f59e0b", `eig-${i}`, true))}
          {/* right singular vector directions (blue solid) */}
          {vCols.map((v, i) => axisLine(v, "var(--primary)", `sv-${i}`, false))}
          {/* singular output axes σᵢ uᵢ */}
          {sigmaArrows}
        </svg>

        <div className="dvs-legend">
          <div>
            <span className="dvs-swatch" style={{ background: "var(--primary)" }} />
            {t("dvs.legend.v")}
          </div>
          <div>
            <span
              className="dvs-swatch"
              style={{ background: "#f59e0b", opacity: diag.complex ? 0.35 : 1 }}
            />
            {diag.complex ? t("dvs.legend.eigNone") : t("dvs.legend.eig")}
          </div>
          <div>
            <span className="dvs-swatch" style={{ background: "var(--accent)" }} />
            {t("dvs.legend.ellipse")}
          </div>
        </div>
      </div>

      <div className={`dvs-status dvs-status-${sameAxes ? "match" : "differ"}`}>
        {t(statusKey)}
      </div>

      <div className="dvs-grid">
        <div className="dvs-col">
          <div className="dvs-col-head dvs-head-diag">{t("dvs.col.diag")}</div>
          {diag.complex ? (
            <p className="dvs-note">{t("dvs.diag.complexNote")}</p>
          ) : !diag.diagonalizable ? (
            <p className="dvs-note">{t("dvs.diag.defectiveNote")}</p>
          ) : (
            <>
              <Equation>{`P = ${matrixToLatex(diag.P)}`}</Equation>
              <Equation>{`D = ${matrixToLatex(diag.D)}`}</Equation>
              <Equation>{`P^{-1} = ${matrixToLatex(diag.Pinv as Matrix)}`}</Equation>
              <Equation>{`PDP^{-1} = ${matrixToLatex(diag.reconstruction as Matrix)} = A`}</Equation>
              <p className="dvs-note">
                {diag.symmetric ? t("dvs.diag.orthoNote") : t("dvs.diag.obliqueNote")}
              </p>
            </>
          )}
        </div>

        <div className="dvs-col">
          <div className="dvs-col-head dvs-head-svd">{t("dvs.col.svd")}</div>
          <Equation>{`U = ${matrixToLatex(svd.U)}`}</Equation>
          <Equation>{`\\Sigma = ${matrixToLatex(svd.S)}`}</Equation>
          <Equation>{`V^{\\mathsf T} = ${matrixToLatex(transpose(svd.V))}`}</Equation>
          <Equation>{`U\\Sigma V^{\\mathsf T} = ${matrixToLatex(svd.reconstruction)} = A`}</Equation>
          <p className="dvs-note">
            {t("dvs.svd.sigmaNote", {
              s1: fmt(svd.singularValues[0]),
              s2: fmt(svd.singularValues[1]),
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
