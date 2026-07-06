import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Matrix, Vector } from "../lib/mathUtils";
import {
  applyMatrix,
  eigen2x2,
  eigenvectorFor2x2,
  fmt,
  identity,
  normalize,
  rank,
  roundNear,
  scaleVector,
} from "../lib/mathUtils";
import { MatrixInput } from "./MatrixInput";
import { Eq } from "./Equation";
import { useLanguage } from "../i18n/LanguageProvider";

type Vec = [number, number];

const SIZE = 340;
const RANGE = 3.2;
const scale = SIZE / (2 * RANGE);
function toPx([x, y]: Vec): Vec {
  return [SIZE / 2 + x * scale, SIZE / 2 - y * scale];
}

const PRESETS: { labelKey: string; m: Matrix }[] = [
  {
    labelKey: "mult.preset.distinct",
    m: [
      [2, 0],
      [0, 3],
    ],
  },
  {
    labelKey: "mult.preset.diagRepeat",
    m: [
      [2, 0],
      [0, 2],
    ],
  },
  {
    labelKey: "mult.preset.defective",
    m: [
      [2, 1],
      [0, 2],
    ],
  },
  {
    labelKey: "mult.preset.symRepeat",
    m: [
      [3, 0],
      [0, 3],
    ],
  },
];

/**
 * Multiplicity explorer. For a 2x2 matrix it reports, per distinct eigenvalue,
 * the algebraic multiplicity (root count of the characteristic polynomial) and
 * the geometric multiplicity (dim of the null space of A - lambda I, i.e.
 * 2 - rank). When the two disagree the eigenvalue is flagged as defective, and
 * the plot draws the eigen-line(s) so a missing direction is visible at a glance.
 */
export function MultiplicityExplorer() {
  const { t } = useLanguage();
  const [A, setA] = useState<Matrix>([
    [2, 1],
    [0, 2],
  ]);

  const info = useMemo(() => {
    const eig = eigen2x2(A);
    if (eig.complex) {
      return { complex: true as const, trace: eig.trace, det: eig.determinant };
    }
    const I = identity(2);
    const entries = eig.eigenvalues.map((lambda) => {
      const alg = eig.eigenvalues.length === 1 ? 2 : 1;
      const shifted: Matrix = A.map((row, i) => row.map((v, j) => v - lambda * I[i][j]));
      const geo = 2 - rank(shifted);
      const dirs: Vec[] =
        geo >= 2
          ? [
              [1, 0],
              [0, 1],
            ]
          : [eigenvectorFor2x2(A, lambda) as Vec];
      return { lambda, alg, geo, dirs, defective: geo < alg };
    });
    return {
      complex: false as const,
      trace: eig.trace,
      det: eig.determinant,
      entries,
    };
  }, [A]);

  const o = toPx([0, 0]);

  const N = 72;
  const ellipsePts: string = Array.from({ length: N + 1 }, (_, i) => {
    const a = (i / N) * 2 * Math.PI;
    const p = applyMatrix(A, [Math.cos(a), Math.sin(a)]) as Vec;
    return toPx(p).join(",");
  }).join(" ");

  const eigenLines: ReactNode[] = [];
  if (!info.complex) {
    const palette = ["#f59e0b", "var(--primary)", "var(--accent)"];
    let colorIdx = 0;
    info.entries.forEach((e) => {
      e.dirs.forEach((d) => {
        const dir = normalize(d as Vector) as Vec;
        const p1 = toPx(scaleVector(dir, RANGE) as Vec);
        const p2 = toPx(scaleVector(dir, -RANGE) as Vec);
        eigenLines.push(
          <line
            key={`el-${colorIdx}`}
            x1={p1[0]}
            y1={p1[1]}
            x2={p2[0]}
            y2={p2[1]}
            stroke={palette[colorIdx % palette.length]}
            strokeWidth={2}
            strokeDasharray="7 5"
            opacity={0.9}
          />,
        );
        colorIdx += 1;
      });
    });
  }

  const anyDefective = !info.complex && info.entries.some((e) => e.defective);
  const defectiveLambda =
    !info.complex && anyDefective ? info.entries.find((e) => e.defective)!.lambda : 0;

  const statusClass = info.complex || anyDefective ? "differ" : "match";

  const charPoly = `\\lambda^2 - (${fmt(info.trace)})\\lambda + (${fmt(info.det)})`;

  return (
    <div className="canvas-wrap">
      <div className="mtx-wrap">
        <MatrixInput value={A} onChange={setA} label={t("mult.matrixA")} />
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
          <line x1={0} y1={SIZE / 2} x2={SIZE} y2={SIZE / 2} stroke="var(--grid)" />
          <line x1={SIZE / 2} y1={0} x2={SIZE / 2} y2={SIZE} stroke="var(--grid)" />
          <circle
            cx={o[0]}
            cy={o[1]}
            r={scale}
            fill="var(--primary-soft)"
            stroke="var(--primary)"
            strokeWidth={1}
            opacity={0.4}
          />
          <polyline
            points={ellipsePts}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={1.4}
            opacity={0.8}
          />
          {eigenLines}
        </svg>

        <div className="mult-cards">
          <div className="mult-chareq">
            <span className="mult-chareq-label">{t("mult.chareq")}</span>
            <Eq>{charPoly}</Eq>
          </div>
          {info.complex ? (
            <p className="dvs-note">{t("mult.complexNote")}</p>
          ) : (
            info.entries.map((e, i) => (
              <div
                key={i}
                className={`mult-eig${e.defective ? " mult-eig-defective" : ""}`}
              >
                <div className="mult-eig-head">
                  {t("mult.eigenvalue", { value: fmt(roundNear(e.lambda)) })}
                </div>
                <div className="mult-eig-row">
                  <span>{t("mult.algebraic")}</span>
                  <span className="mult-num">{e.alg}</span>
                </div>
                <div className="mult-eig-row">
                  <span>{t("mult.geometric")}</span>
                  <span className="mult-num">{e.geo}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {!info.complex && (
        <div className={`dvs-status dvs-status-${statusClass}`}>
          {anyDefective
            ? t("mult.gapNote", { value: fmt(roundNear(defectiveLambda)) })
            : t("mult.okNote")}
        </div>
      )}
    </div>
  );
}
