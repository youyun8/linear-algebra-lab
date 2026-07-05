import { useState } from "react";
import type { Matrix } from "../lib/mathUtils";
import { applyMatrix, determinant2x2, fmt } from "../lib/mathUtils";
import { MatrixInput } from "./MatrixInput";
import { Equation } from "./Equation";
import { useLanguage } from "../i18n/LanguageProvider";

type Vec = [number, number];

const SIZE = 420;
const RANGE = 5;
const scale = SIZE / (2 * RANGE);

function toPx([x, y]: Vec): Vec {
  return [SIZE / 2 + x * scale, SIZE / 2 - y * scale];
}

const PRESETS: { labelKey: string; m: Matrix }[] = [
  {
    labelKey: "tf.preset.identity",
    m: [
      [1, 0],
      [0, 1],
    ],
  },
  {
    labelKey: "tf.preset.scale2",
    m: [
      [2, 0],
      [0, 2],
    ],
  },
  {
    labelKey: "tf.preset.rotate90",
    m: [
      [0, -1],
      [1, 0],
    ],
  },
  {
    labelKey: "tf.preset.shear",
    m: [
      [1, 1],
      [0, 1],
    ],
  },
  {
    labelKey: "tf.preset.reflectX",
    m: [
      [1, 0],
      [0, -1],
    ],
  },
  {
    labelKey: "tf.preset.collapse",
    m: [
      [1, 2],
      [2, 4],
    ],
  },
];

/**
 * Matrix linear-transformation visualizer. Shows how the unit grid, the basis
 * vectors î, ĵ, and a sample shape are mapped by a 2x2 matrix A. The
 * determinant is displayed as the area scaling factor.
 */
export function TransformVisualizer() {
  const { t: tr } = useLanguage();
  const [m, setM] = useState<Matrix>([
    [1, 1],
    [0, 1],
  ]);
  const [t, setT] = useState(1); // interpolation 0..1 for animation feel

  const det = determinant2x2(m);

  // Interpolate between identity and M so students see the motion.
  const lerp = (target: Matrix): Matrix => [
    [1 + (target[0][0] - 1) * t, target[0][1] * t],
    [target[1][0] * t, 1 + (target[1][1] - 1) * t],
  ];
  const M = lerp(m);
  const ap = (v: Vec) => applyMatrix(M, v) as Vec;

  // Transformed grid lines.
  const lines: React.ReactNode[] = [];
  for (let i = -RANGE; i <= RANGE; i++) {
    const p1 = toPx(ap([i, -RANGE]));
    const p2 = toPx(ap([i, RANGE]));
    const p3 = toPx(ap([-RANGE, i]));
    const p4 = toPx(ap([RANGE, i]));
    const w = i === 0 ? 2 : 1;
    const col = i === 0 ? "var(--axis)" : "var(--grid)";
    lines.push(
      <line
        key={`gv${i}`}
        x1={p1[0]}
        y1={p1[1]}
        x2={p2[0]}
        y2={p2[1]}
        stroke={col}
        strokeWidth={w}
      />,
      <line
        key={`gh${i}`}
        x1={p3[0]}
        y1={p3[1]}
        x2={p4[0]}
        y2={p4[1]}
        stroke={col}
        strokeWidth={w}
      />,
    );
  }

  const o = toPx([0, 0]);
  const iHat = toPx(ap([1, 0]));
  const jHat = toPx(ap([0, 1]));

  // Unit square mapped.
  const square = [ap([0, 0]), ap([1, 0]), ap([1, 1]), ap([0, 1])]
    .map((p) => toPx(p).join(","))
    .join(" ");

  return (
    <div className="canvas-wrap">
      <svg
        className="svg-canvas"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ maxWidth: SIZE }}
      >
        <defs>
          <marker
            id="tI"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--primary)" />
          </marker>
          <marker
            id="tJ"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--accent)" />
          </marker>
        </defs>
        {lines}
        <polygon
          points={square}
          fill="var(--primary)"
          opacity={0.14}
          stroke="var(--primary)"
          strokeWidth={1.5}
        />
        <line
          x1={o[0]}
          y1={o[1]}
          x2={iHat[0]}
          y2={iHat[1]}
          stroke="var(--primary)"
          strokeWidth={3.5}
          markerEnd="url(#tI)"
        />
        <line
          x1={o[0]}
          y1={o[1]}
          x2={jHat[0]}
          y2={jHat[1]}
          stroke="var(--accent)"
          strokeWidth={3.5}
          markerEnd="url(#tJ)"
        />
        <text
          x={iHat[0] + 8}
          y={iHat[1] + 4}
          fill="var(--primary)"
          fontWeight="700"
          fontSize="13"
        >
          î
        </text>
        <text
          x={jHat[0] + 8}
          y={jHat[1] + 4}
          fill="var(--accent)"
          fontWeight="700"
          fontSize="13"
        >
          ĵ
        </text>
      </svg>

      <div className="mtx-wrap">
        <MatrixInput value={m} onChange={setM} label={tr("tf.transformA")} />
        <div>
          <Equation>{`\\det A = ${fmt(det)}`}</Equation>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
            {det === 0
              ? tr("tf.det.zero")
              : det < 0
                ? tr("tf.det.negative")
                : tr("tf.det.positive")}
          </p>
        </div>
      </div>

      <div className="canvas-controls">
        <div className="control-row" style={{ flex: 1, minWidth: 220 }}>
          <label>{tr("tf.apply")}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span>{Math.round(t * 100)}%</span>
        </div>
      </div>

      <div className="tag-row">
        {PRESETS.map((p) => (
          <button
            key={p.labelKey}
            onClick={() => {
              setM(p.m);
              setT(1);
            }}
          >
            {tr(p.labelKey)}
          </button>
        ))}
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
        {tr("tf.caption")}
      </p>
    </div>
  );
}
