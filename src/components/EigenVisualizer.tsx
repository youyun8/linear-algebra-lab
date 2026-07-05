import { useState } from "react";
import type { Matrix } from "../lib/mathUtils";
import { applyMatrix, eigen2x2, fmt, normalize, scaleVector } from "../lib/mathUtils";
import { MatrixInput } from "./MatrixInput";
import { useLanguage } from "../i18n/LanguageProvider";

type Vec = [number, number];

const SIZE = 420;
const RANGE = 5;
const scale = SIZE / (2 * RANGE);
function toPx([x, y]: Vec): Vec {
  return [SIZE / 2 + x * scale, SIZE / 2 - y * scale];
}

/**
 * Eigenvector visualizer. A vector v (draggable via slider angle) is drawn
 * alongside A·v. When v points along an eigenvector, A·v stays on the same line
 * — only stretched by the eigenvalue. Eigenvector directions are drawn as
 * dashed guide lines.
 */
export function EigenVisualizer() {
  const { t } = useLanguage();
  const [m, setM] = useState<Matrix>([
    [2, 1],
    [1, 2],
  ]);
  const [angle, setAngle] = useState(30);

  const rad = (angle * Math.PI) / 180;
  const v: Vec = [Math.cos(rad) * 2.5, Math.sin(rad) * 2.5];
  const Av = applyMatrix(m, v) as Vec;

  const eig = eigen2x2(m);
  const o = toPx([0, 0]);
  const vPx = toPx(v);
  const AvPx = toPx(Av);

  const eigenLines = eig.eigenvectors.map((ev, i) => {
    const u = normalize(ev) as Vec;
    const p1 = toPx(scaleVector(u, RANGE) as Vec);
    const p2 = toPx(scaleVector(u, -RANGE) as Vec);
    return (
      <line
        key={i}
        x1={p1[0]}
        y1={p1[1]}
        x2={p2[0]}
        y2={p2[1]}
        stroke="#f59e0b"
        strokeWidth={1.5}
        strokeDasharray="6 5"
        opacity={0.8}
      />
    );
  });

  return (
    <div className="canvas-wrap">
      <svg
        className="svg-canvas"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ maxWidth: SIZE }}
      >
        <defs>
          <marker
            id="evV"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--primary)" />
          </marker>
          <marker
            id="evAv"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--accent)" />
          </marker>
        </defs>
        <line x1={0} y1={SIZE / 2} x2={SIZE} y2={SIZE / 2} stroke="var(--grid)" />
        <line x1={SIZE / 2} y1={0} x2={SIZE / 2} y2={SIZE} stroke="var(--grid)" />
        {eigenLines}
        <line
          x1={o[0]}
          y1={o[1]}
          x2={AvPx[0]}
          y2={AvPx[1]}
          stroke="var(--accent)"
          strokeWidth={3}
          markerEnd="url(#evAv)"
        />
        <line
          x1={o[0]}
          y1={o[1]}
          x2={vPx[0]}
          y2={vPx[1]}
          stroke="var(--primary)"
          strokeWidth={3}
          markerEnd="url(#evV)"
        />
        <text
          x={vPx[0] + 8}
          y={vPx[1]}
          fill="var(--primary)"
          fontWeight="700"
          fontSize="13"
        >
          v
        </text>
        <text
          x={AvPx[0] + 8}
          y={AvPx[1]}
          fill="var(--accent)"
          fontWeight="700"
          fontSize="13"
        >
          Av
        </text>
      </svg>

      <div className="mtx-wrap">
        <MatrixInput value={m} onChange={setM} label={t("mtx.matrixA")} />
      </div>

      <div className="canvas-controls">
        <div className="control-row" style={{ flex: 1, minWidth: 220 }}>
          <label>{t("eigenviz.angle")}</label>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span>{angle}°</span>
        </div>
      </div>

      <div className="readout">
        {eig.complex
          ? t("eigenviz.complex")
          : t("eigenviz.real", {
              values: eig.eigenvalues.map((l) => fmt(l)).join(", "),
            })}
      </div>
    </div>
  );
}
