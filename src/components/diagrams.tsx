/**
 * Static, theme-aware SVG concept diagrams used across the lessons. Each is a
 * self-contained figure (no interaction) that illustrates one idea at a glance.
 * Colours come from CSS variables so the diagrams read correctly in both light
 * and dark themes. Text labels are kept to short math symbols so a single
 * diagram works for both the English and Chinese versions of a page — the
 * descriptive caption lives on the page (via <Figure caption=...>).
 */

import { Eq } from "./Equation";

const ORANGE = "#f59e0b";

/** A reusable arrowhead marker. `id` must be unique within the document. */
function Arrow({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6 Z" fill={color} />
    </marker>
  );
}

function SvgTex({
  x,
  y,
  width,
  height = 24,
  tex,
  color = "var(--text)",
  align = "left",
  weight = 400,
}: {
  x: number | string;
  y: number | string;
  width: number | string;
  height?: number | string;
  tex: string;
  color?: string;
  align?: "left" | "center" | "right";
  weight?: number;
}) {
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      style={{ overflow: "visible" }}
    >
      <div className={`svg-tex svg-tex-${align}`} style={{ color, fontWeight: weight }}>
        <Eq>{tex}</Eq>
      </div>
    </foreignObject>
  );
}

/* -------------------- Vectors: dot product & projection ------------------ */

export function VectorDotFigure() {
  return (
    <svg className="svg-figure" viewBox="0 0 300 230" role="img">
      <defs>
        <Arrow id="vf-a" color="var(--primary)" />
        <Arrow id="vf-b" color="var(--accent)" />
      </defs>
      {/* axes */}
      <line x1="40" y1="200" x2="270" y2="200" stroke="var(--axis)" strokeWidth="1.5" />
      <line x1="40" y1="215" x2="40" y2="40" stroke="var(--axis)" strokeWidth="1.5" />
      {/* projection shadow of a onto b (x-axis) */}
      <line
        x1="40"
        y1="200"
        x2="130"
        y2="200"
        stroke={ORANGE}
        strokeWidth="6"
        opacity="0.85"
      />
      {/* dashed drop line */}
      <line
        x1="130"
        y1="110"
        x2="130"
        y2="200"
        stroke="var(--text-muted)"
        strokeWidth="1.4"
        strokeDasharray="4 4"
      />
      {/* right-angle mark */}
      <path
        d="M118,200 L118,188 L130,188"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.2"
      />
      {/* angle arc */}
      <path
        d="M74,200 A34,34 0 0 0 64,176"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.2"
      />
      <text x="78" y="184" fontSize="12" fill="var(--text-muted)">
        θ
      </text>
      {/* vector b */}
      <line
        x1="40"
        y1="200"
        x2="190"
        y2="200"
        stroke="var(--accent)"
        strokeWidth="2.5"
        markerEnd="url(#vf-b)"
      />
      {/* vector a */}
      <line
        x1="40"
        y1="200"
        x2="130"
        y2="110"
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#vf-a)"
      />
      <text x="128" y="104" fontSize="13" fontWeight="700" fill="var(--primary)">
        a
      </text>
      <text x="196" y="196" fontSize="13" fontWeight="700" fill="var(--accent)">
        b
      </text>
      <text x="70" y="222" fontSize="11" fill={ORANGE}>
        proj_b(a)
      </text>
    </svg>
  );
}

/* ------------------- Matrices: transform of the basis -------------------- */

export function MatrixTransformFigure() {
  // A = [[1, -0.5], [0.5, 1]]; columns are the new basis images.
  const O = [110, 150];
  const s = 55;
  const iP = [O[0] + s * 1, O[1] - s * 0.5]; // î' = (1, 0.5)
  const jP = [O[0] + s * -0.5, O[1] - s * 1]; // ĵ' = (-0.5, 1)
  const far = [iP[0] + jP[0] - O[0], iP[1] + jP[1] - O[1]];
  return (
    <svg className="svg-figure" viewBox="0 0 300 230" role="img">
      <defs>
        <Arrow id="mf-i" color="var(--primary)" />
        <Arrow id="mf-j" color="var(--accent)" />
      </defs>
      {/* original unit square (faint) */}
      <rect
        x={O[0]}
        y={O[1] - s}
        width={s}
        height={s}
        fill="none"
        stroke="var(--grid)"
        strokeWidth="1.5"
      />
      <line
        x1={O[0]}
        y1={O[1]}
        x2={O[0] + s}
        y2={O[1]}
        stroke="var(--text-muted)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      <line
        x1={O[0]}
        y1={O[1]}
        x2={O[0]}
        y2={O[1] - s}
        stroke="var(--text-muted)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      {/* transformed parallelogram */}
      <polygon
        points={`${O[0]},${O[1]} ${iP[0]},${iP[1]} ${far[0]},${far[1]} ${jP[0]},${jP[1]}`}
        fill="var(--primary-soft)"
        stroke="var(--primary)"
        strokeWidth="1.2"
        opacity="0.85"
      />
      {/* transformed basis */}
      <line
        x1={O[0]}
        y1={O[1]}
        x2={iP[0]}
        y2={iP[1]}
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#mf-i)"
      />
      <line
        x1={O[0]}
        y1={O[1]}
        x2={jP[0]}
        y2={jP[1]}
        stroke="var(--accent)"
        strokeWidth="2.5"
        markerEnd="url(#mf-j)"
      />
      <text
        x={iP[0] + 6}
        y={iP[1] + 2}
        fontSize="12"
        fontWeight="700"
        fill="var(--primary)"
      >
        Aî
      </text>
      <text
        x={jP[0] - 26}
        y={jP[1] - 2}
        fontSize="12"
        fontWeight="700"
        fill="var(--accent)"
      >
        Aĵ
      </text>
      <text x={O[0] + 4} y={O[1] + 16} fontSize="11" fill="var(--text-muted)">
        unit square
      </text>
    </svg>
  );
}

/* ----------------- Systems: two lines meet at the solution --------------- */

export function LinesFigure() {
  const O = [40, 200];
  const s = 30;
  const px = (x: number) => O[0] + x * s;
  const py = (y: number) => O[1] - y * s;
  return (
    <svg className="svg-figure" viewBox="0 -12 280 244" role="img">
      {/* axes */}
      <line x1="20" y1={O[1]} x2="270" y2={O[1]} stroke="var(--axis)" strokeWidth="1.5" />
      <line x1={O[0]} y1="215" x2={O[0]} y2="30" stroke="var(--axis)" strokeWidth="1.5" />
      {/* line x + y = 5 */}
      <line
        x1={px(0)}
        y1={py(5)}
        x2={px(6)}
        y2={py(-1)}
        stroke="var(--primary)"
        strokeWidth="2.5"
      />
      {/* line 2x - y = 1 */}
      <line
        x1={px(0)}
        y1={py(-1)}
        x2={px(4)}
        y2={py(7)}
        stroke="var(--accent)"
        strokeWidth="2.5"
      />
      {/* intersection (2,3) */}
      <line
        x1={px(2)}
        y1={py(3)}
        x2={px(2)}
        y2={O[1]}
        stroke="var(--text-muted)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <line
        x1={px(2)}
        y1={py(3)}
        x2={O[0]}
        y2={py(3)}
        stroke="var(--text-muted)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <circle cx={px(2)} cy={py(3)} r="5" fill={ORANGE} />
      <text x={px(2) + 8} y={py(3) - 6} fontSize="12" fontWeight="700" fill={ORANGE}>
        (2, 3)
      </text>
      <text x={px(4.2)} y={py(1.1)} fontSize="11" fill="var(--primary)">
        x + y = 5
      </text>
      <text x={px(3.1)} y={py(6.4)} fontSize="11" fill="var(--accent)">
        2x − y = 1
      </text>
    </svg>
  );
}

/* ------------------ Subspaces: a plane through the origin ---------------- */

export function SpanPlaneFigure() {
  const C = [150, 120];
  const p = [86, 30];
  const q = [30, -58];
  const corner = (a: number, b: number) =>
    `${C[0] + a * p[0] + b * q[0]},${C[1] + a * p[1] + b * q[1]}`;
  return (
    <svg className="svg-figure" viewBox="0 0 300 230" role="img">
      <defs>
        <Arrow id="sp-1" color="var(--primary)" />
        <Arrow id="sp-2" color="var(--accent)" />
      </defs>
      {/* the plane = span{v1, v2} */}
      <polygon
        points={`${corner(1, 1)} ${corner(1, -1)} ${corner(-1, -1)} ${corner(-1, 1)}`}
        fill="var(--primary-soft)"
        stroke="var(--primary)"
        strokeWidth="1.2"
        opacity="0.8"
      />
      {/* origin */}
      <circle cx={C[0]} cy={C[1]} r="3.5" fill="var(--text)" />
      {/* spanning vectors */}
      <line
        x1={C[0]}
        y1={C[1]}
        x2={C[0] + p[0]}
        y2={C[1] + p[1]}
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#sp-1)"
      />
      <line
        x1={C[0]}
        y1={C[1]}
        x2={C[0] + q[0]}
        y2={C[1] + q[1]}
        stroke="var(--accent)"
        strokeWidth="2.5"
        markerEnd="url(#sp-2)"
      />
      <text
        x={C[0] + p[0] + 4}
        y={C[1] + p[1] + 4}
        fontSize="13"
        fontWeight="700"
        fill="var(--primary)"
      >
        v₁
      </text>
      <text
        x={C[0] + q[0] - 4}
        y={C[1] + q[1] - 6}
        fontSize="13"
        fontWeight="700"
        fill="var(--accent)"
      >
        v₂
      </text>
      <text x={C[0] - 14} y={C[1] + 20} fontSize="12" fill="var(--text)">
        0
      </text>
      <text x="86" y="212" fontSize="12" fill="var(--text-muted)">
        span{"{"}v₁, v₂{"}"} — a plane
      </text>
    </svg>
  );
}

/* ---------------- Subspaces: extracting a null-space basis -------------- */

export function NullSpaceBasisFigure() {
  return (
    <svg className="svg-figure" viewBox="0 0 360 230" role="img">
      <defs>
        <Arrow id="nsb-flow" color="var(--text-muted)" />
      </defs>
      <rect
        x="16"
        y="28"
        width="122"
        height="72"
        rx="8"
        fill="var(--bg-subtle)"
        stroke="var(--border)"
      />
      <SvgTex
        x="30"
        y="37"
        width="74"
        height="22"
        tex={"\\operatorname{RREF}(A)"}
        weight={700}
      />
      <text x="30" y="78" fontSize="15" fill="var(--text)">
        [ 1 2 −1 ]
      </text>
      <text x="30" y="96" fontSize="15" fill="var(--text)">
        [ 0 0 0 ]
      </text>
      <line
        x1="172"
        y1="64"
        x2="216"
        y2="64"
        stroke="var(--text-muted)"
        strokeWidth="1.6"
        markerEnd="url(#nsb-flow)"
      />
      <rect
        x="226"
        y="28"
        width="118"
        height="72"
        rx="8"
        fill="var(--bg-subtle)"
        stroke="var(--border)"
      />
      <text x="240" y="52" fontSize="13" fontWeight="700" fill="var(--text)">
        free vars
      </text>
      <SvgTex x="240" y="65" width="48" height="20" tex="x_2=s" color="var(--accent)" />
      <SvgTex x="292" y="65" width="48" height="20" tex="x_3=t" color="var(--primary)" />

      <SvgTex x="42" y="127" width="190" height="24" tex="x_1+2x_2-x_3=0" />
      <SvgTex x="42" y="151" width="250" height="24" tex="x=s(-2,1,0)+t(1,0,1)" />
      <line
        x1="162"
        y1="180"
        x2="162"
        y2="202"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#nsb-flow)"
      />
      <SvgTex
        x="64"
        y="207"
        width="250"
        height="24"
        tex={"\\text{basis: }\\{(-2,1,0),(1,0,1)\\}"}
        weight={700}
      />

      <circle cx="75" cy="115" r="5" fill="var(--primary)" />
      <text x="86" y="119" fontSize="12" fill="var(--text-muted)">
        pivot column
      </text>
      <circle cx="204" cy="115" r="5" fill="var(--accent)" />
      <text x="215" y="119" fontSize="12" fill="var(--text-muted)">
        free columns
      </text>
    </svg>
  );
}

export function NullSpaceCollapseFigure() {
  const C = [135, 126];
  const p = [72, 18];
  const q = [24, -46];
  const corner = (a: number, b: number) =>
    `${C[0] + a * p[0] + b * q[0]},${C[1] + a * p[1] + b * q[1]}`;
  return (
    <svg className="svg-figure" viewBox="0 0 390 230" role="img">
      <defs>
        <Arrow id="nsc-map" color="var(--text-muted)" />
        <Arrow id="nsc-1" color="var(--primary)" />
        <Arrow id="nsc-2" color="var(--accent)" />
      </defs>
      <text x="88" y="24" fontSize="13" fontWeight="700" fill="var(--text)">
        input space
      </text>
      <polygon
        points={`${corner(1, 1)} ${corner(1, -1)} ${corner(-1, -1)} ${corner(-1, 1)}`}
        fill="var(--primary-soft)"
        stroke="var(--primary)"
        strokeWidth="1.2"
        opacity="0.82"
      />
      <line
        x1={C[0]}
        y1={C[1]}
        x2={C[0] + p[0]}
        y2={C[1] + p[1]}
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#nsc-1)"
      />
      <line
        x1={C[0]}
        y1={C[1]}
        x2={C[0] + q[0]}
        y2={C[1] + q[1]}
        stroke="var(--accent)"
        strokeWidth="2.5"
        markerEnd="url(#nsc-2)"
      />
      <circle cx={C[0]} cy={C[1]} r="3.5" fill="var(--text)" />
      <SvgTex
        x={C[0] - 42}
        y={C[1] + 55}
        width="150"
        height="22"
        tex={"\\mathcal{N}(A)=\\operatorname{span}\\{n_1,n_2\\}"}
        color="var(--text-muted)"
      />
      <SvgTex
        x={C[0] + p[0] + 4}
        y={C[1] + p[1] - 10}
        width="28"
        height="22"
        tex="n_1"
        color="var(--primary)"
        weight={700}
      />
      <SvgTex
        x={C[0] + q[0] - 4}
        y={C[1] + q[1] - 19}
        width="28"
        height="22"
        tex="n_2"
        color="var(--accent)"
        weight={700}
      />

      <line
        x1="232"
        y1="118"
        x2="280"
        y2="118"
        stroke="var(--text-muted)"
        strokeWidth="1.6"
        markerEnd="url(#nsc-map)"
      />
      <SvgTex
        x="244"
        y="84"
        width="22"
        height="26"
        tex="A"
        color="var(--text-muted)"
        weight={700}
      />

      <text
        x="312"
        y="24"
        fontSize="13"
        fontWeight="700"
        textAnchor="middle"
        fill="var(--text)"
      >
        output space
      </text>
      <line x1="296" y1="162" x2="348" y2="162" stroke="var(--axis)" strokeWidth="1.5" />
      <line x1="322" y1="188" x2="322" y2="136" stroke="var(--axis)" strokeWidth="1.5" />
      <circle cx="322" cy="162" r="6" fill={ORANGE} />
      <SvgTex
        x="332"
        y="144"
        width="18"
        height="22"
        tex="0"
        color={ORANGE}
        weight={700}
      />
      <text x="290" y="208" fontSize="12" textAnchor="middle" fill="var(--text-muted)">
        null vectors map here
      </text>
    </svg>
  );
}

/* -------------- Orthogonality: projection onto a subspace ---------------- */

export function ProjectionFigure() {
  const O = [40, 180];
  const s = 32;
  const px = (x: number) => O[0] + x * s;
  const py = (y: number) => O[1] - y * s;
  // line C(A) along d = (4,1); b = (3.5,3); p = proj of b onto line = (4,1)
  const b = [px(3.5), py(3)];
  const p = [px(4), py(1)];
  return (
    <svg className="svg-figure" viewBox="0 0 300 210" role="img">
      <defs>
        <Arrow id="pr-b" color="var(--primary)" />
      </defs>
      {/* column space line */}
      <line
        x1={px(-0.4)}
        y1={py(-0.1)}
        x2={px(5.6)}
        y2={py(1.4)}
        stroke="var(--accent)"
        strokeWidth="2.5"
      />
      <text x={px(5)} y={py(1.9)} fontSize="12" fill="var(--accent)">
        C(A)
      </text>
      {/* origin */}
      <circle cx={O[0]} cy={O[1]} r="3" fill="var(--text)" />
      {/* target b */}
      <line
        x1={O[0]}
        y1={O[1]}
        x2={b[0]}
        y2={b[1]}
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#pr-b)"
      />
      {/* projection p (orange, along the line) */}
      <line
        x1={O[0]}
        y1={O[1]}
        x2={p[0]}
        y2={p[1]}
        stroke={ORANGE}
        strokeWidth="5"
        opacity="0.85"
      />
      {/* error e = b - p, dashed and perpendicular */}
      <line
        x1={b[0]}
        y1={b[1]}
        x2={p[0]}
        y2={p[1]}
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      {/* right-angle mark at p */}
      <path
        d="M156,148 l-9,-4 l-4,9"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.2"
        transform={`translate(${p[0] - 152},${p[1] - 148})`}
      />
      <text
        x={b[0] + 4}
        y={b[1] - 4}
        fontSize="13"
        fontWeight="700"
        fill="var(--primary)"
      >
        b
      </text>
      <text x={p[0] + 6} y={p[1] + 14} fontSize="12" fontWeight="700" fill={ORANGE}>
        p = proj b
      </text>
      <text
        x={(b[0] + p[0]) / 2 + 6}
        y={(b[1] + p[1]) / 2}
        fontSize="12"
        fill="var(--text-muted)"
      >
        e
      </text>
    </svg>
  );
}

/* --------- Orthogonal matrices: rotation (+1) and reflection (−1) -------- */

export function OrthogonalMatrixFigure() {
  const rad = (d: number) => (d * Math.PI) / 180;
  // Panel A: rotation. Orthonormal columns q1, q2 on the unit circle.
  const A = [85, 108];
  const r = 58;
  const q1 = [A[0] + r * Math.cos(rad(35)), A[1] - r * Math.sin(rad(35))];
  const q2 = [A[0] - r * Math.sin(rad(35)), A[1] - r * Math.cos(rad(35))];
  // Panel B: reflection across a mirror line.
  const B = [255, 108];
  const phi = 22; // mirror angle
  const m1 = [B[0] + 66 * Math.cos(rad(phi)), B[1] - 66 * Math.sin(rad(phi))];
  const m2 = [B[0] - 66 * Math.cos(rad(phi)), B[1] + 66 * Math.sin(rad(phi))];
  const va = 82; // vector angle
  const v = [B[0] + r * Math.cos(rad(va)), B[1] - r * Math.sin(rad(va))];
  const vr = 2 * phi - va; // reflected angle
  const vp = [B[0] + r * Math.cos(rad(vr)), B[1] - r * Math.sin(rad(vr))];
  return (
    <svg className="svg-figure" viewBox="0 0 340 210" role="img">
      <defs>
        <Arrow id="om-1" color="var(--primary)" />
        <Arrow id="om-2" color="var(--accent)" />
        <Arrow id="om-3" color="var(--primary)" />
        <Arrow id="om-4" color={ORANGE} />
      </defs>
      {/* Panel A: rotation */}
      <circle
        cx={A[0]}
        cy={A[1]}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <line
        x1={A[0]}
        y1={A[1]}
        x2={q1[0]}
        y2={q1[1]}
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#om-1)"
      />
      <line
        x1={A[0]}
        y1={A[1]}
        x2={q2[0]}
        y2={q2[1]}
        stroke="var(--accent)"
        strokeWidth="2.5"
        markerEnd="url(#om-2)"
      />
      <text
        x={q1[0] + 4}
        y={q1[1] + 4}
        fontSize="12"
        fontWeight="700"
        fill="var(--primary)"
      >
        q₁
      </text>
      <text x={q2[0] - 20} y={q2[1]} fontSize="12" fontWeight="700" fill="var(--accent)">
        q₂
      </text>
      <text x={A[0] - 42} y="196" fontSize="11" fill="var(--text-muted)">
        rotation · det = +1
      </text>
      {/* Panel B: reflection */}
      <circle
        cx={B[0]}
        cy={B[1]}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <line
        x1={m1[0]}
        y1={m1[1]}
        x2={m2[0]}
        y2={m2[1]}
        stroke="var(--text-muted)"
        strokeWidth="1.4"
        strokeDasharray="5 4"
      />
      <line
        x1={B[0]}
        y1={B[1]}
        x2={v[0]}
        y2={v[1]}
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#om-3)"
      />
      <line
        x1={B[0]}
        y1={B[1]}
        x2={vp[0]}
        y2={vp[1]}
        stroke={ORANGE}
        strokeWidth="2.5"
        markerEnd="url(#om-4)"
      />
      <text
        x={v[0] - 4}
        y={v[1] - 6}
        fontSize="12"
        fontWeight="700"
        fill="var(--primary)"
      >
        x
      </text>
      <text x={vp[0] + 4} y={vp[1] + 4} fontSize="12" fontWeight="700" fill={ORANGE}>
        Qx
      </text>
      <text x={B[0] - 46} y="196" fontSize="11" fill="var(--text-muted)">
        reflection · det = −1
      </text>
    </svg>
  );
}

/* ----------------- Eigen: eigen-direction vs a generic one --------------- */

export function EigenvectorFigure() {
  const O = [90, 160];
  const s = 16;
  const px = (x: number) => O[0] + x * s;
  const py = (y: number) => O[1] - y * s;
  return (
    <svg className="svg-figure" viewBox="0 0 300 220" role="img">
      <defs>
        <Arrow id="ev-v" color="var(--primary)" />
        <Arrow id="ev-av" color="var(--primary)" />
        <Arrow id="ev-w" color="var(--accent)" />
        <Arrow id="ev-aw" color="var(--text-muted)" />
      </defs>
      {/* eigen-line along (1,1) */}
      <line
        x1={px(-2.5)}
        y1={py(-2.5)}
        x2={px(7.5)}
        y2={py(7.5)}
        stroke={ORANGE}
        strokeWidth="1.4"
        strokeDasharray="5 4"
      />
      <text x={px(6)} y={py(6.7)} fontSize="11" fill={ORANGE}>
        eigen-line
      </text>
      {/* eigenvector v and Av (same line, only scaled) */}
      <line
        x1={O[0]}
        y1={O[1]}
        x2={px(2)}
        y2={py(2)}
        stroke="var(--primary)"
        strokeWidth="3"
        markerEnd="url(#ev-v)"
      />
      <line
        x1={O[0]}
        y1={O[1]}
        x2={px(6)}
        y2={py(6)}
        stroke="var(--primary)"
        strokeWidth="1.6"
        markerEnd="url(#ev-av)"
        opacity="0.55"
      />
      {/* generic w and Aw (turned off its line) */}
      <line
        x1={O[0]}
        y1={O[1]}
        x2={px(3)}
        y2={py(-1)}
        stroke="var(--accent)"
        strokeWidth="2.5"
        markerEnd="url(#ev-w)"
      />
      <line
        x1={O[0]}
        y1={O[1]}
        x2={px(5)}
        y2={py(1)}
        stroke="var(--text-muted)"
        strokeWidth="2"
        markerEnd="url(#ev-aw)"
        strokeDasharray="4 3"
      />
      <text x={px(2) + 4} y={py(2)} fontSize="12" fontWeight="700" fill="var(--primary)">
        v
      </text>
      <text
        x={px(6) + 2}
        y={py(6) + 2}
        fontSize="12"
        fontWeight="700"
        fill="var(--primary)"
      >
        Av = λv
      </text>
      <text
        x={px(3) + 4}
        y={py(-1) + 14}
        fontSize="12"
        fontWeight="700"
        fill="var(--accent)"
      >
        w
      </text>
      <text
        x={px(5) + 4}
        y={py(1)}
        fontSize="12"
        fontWeight="700"
        fill="var(--text-muted)"
      >
        Aw
      </text>
    </svg>
  );
}

/* ------------------- SVD: unit circle maps to an ellipse ----------------- */

export function SVDFigure() {
  const rad = (d: number) => (d * Math.PI) / 180;
  const A = [78, 100];
  const rC = 55;
  const B = [258, 100];
  const s1 = 66;
  const s2 = 30;
  const ang = -25;
  const u1 = [B[0] + s1 * Math.cos(rad(ang)), B[1] - s1 * Math.sin(rad(ang))];
  const u2 = [B[0] + s2 * Math.cos(rad(ang + 90)), B[1] - s2 * Math.sin(rad(ang + 90))];
  return (
    <svg className="svg-figure" viewBox="0 0 340 200" role="img">
      <defs>
        <Arrow id="sv-1" color="var(--accent)" />
        <Arrow id="sv-2" color="var(--primary)" />
        <Arrow id="sv-3" color="var(--accent)" />
        <Arrow id="sv-4" color="var(--primary)" />
        <Arrow id="sv-big" color="var(--text-muted)" />
      </defs>
      {/* unit circle with orthonormal input directions */}
      <circle
        cx={A[0]}
        cy={A[1]}
        r={rC}
        fill="var(--primary-soft)"
        stroke="var(--primary)"
        strokeWidth="1.4"
        opacity="0.85"
      />
      <line
        x1={A[0]}
        y1={A[1]}
        x2={A[0] + rC}
        y2={A[1]}
        stroke="var(--accent)"
        strokeWidth="2.5"
        markerEnd="url(#sv-1)"
      />
      <line
        x1={A[0]}
        y1={A[1]}
        x2={A[0]}
        y2={A[1] - rC}
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#sv-2)"
      />
      <text
        x={A[0] + rC - 10}
        y={A[1] + 16}
        fontSize="12"
        fontWeight="700"
        fill="var(--accent)"
      >
        v₁
      </text>
      <text
        x={A[0] + 6}
        y={A[1] - rC + 12}
        fontSize="12"
        fontWeight="700"
        fill="var(--primary)"
      >
        v₂
      </text>
      {/* big arrow A */}
      <line
        x1="150"
        y1="100"
        x2="182"
        y2="100"
        stroke="var(--text-muted)"
        strokeWidth="2"
        markerEnd="url(#sv-big)"
      />
      <text x="152" y="90" fontSize="12" fontWeight="700" fill="var(--text)">
        A
      </text>
      {/* ellipse with singular axes */}
      <ellipse
        cx={B[0]}
        cy={B[1]}
        rx={s1}
        ry={s2}
        transform={`rotate(${ang} ${B[0]} ${B[1]})`}
        fill="var(--primary-soft)"
        stroke="var(--primary)"
        strokeWidth="1.4"
        opacity="0.85"
      />
      <line
        x1={B[0]}
        y1={B[1]}
        x2={u1[0]}
        y2={u1[1]}
        stroke="var(--accent)"
        strokeWidth="2.5"
        markerEnd="url(#sv-3)"
      />
      <line
        x1={B[0]}
        y1={B[1]}
        x2={u2[0]}
        y2={u2[1]}
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#sv-4)"
      />
      <text
        x={u1[0] - 8}
        y={u1[1] + 18}
        fontSize="12"
        fontWeight="700"
        fill="var(--accent)"
      >
        σ₁u₁
      </text>
      <text
        x={u2[0] - 30}
        y={u2[1] - 2}
        fontSize="12"
        fontWeight="700"
        fill="var(--primary)"
      >
        σ₂u₂
      </text>
    </svg>
  );
}

/* ------------- Matrix calculus: gradient normal to level sets ------------ */

export function GradientFigure() {
  const C = [150, 112];
  const rad = (d: number) => (d * Math.PI) / 180;
  const ang = 38;
  // point on the middle contour (rx=92, ry=54)
  const rx = 92;
  const ry = 54;
  const P = [C[0] + rx * Math.cos(rad(ang)), C[1] - ry * Math.sin(rad(ang))];
  // outward normal direction (gradient of the ellipse form)
  const nx = Math.cos(rad(ang)) / rx;
  const ny = Math.sin(rad(ang)) / ry;
  const nlen = Math.hypot(nx, ny);
  const gx = nx / nlen;
  const gy = ny / nlen;
  const grad = [P[0] + 42 * gx, P[1] - 42 * gy];
  const desc = [P[0] - 42 * gx, P[1] + 42 * gy];
  return (
    <svg className="svg-figure" viewBox="0 0 300 220" role="img">
      <defs>
        <Arrow id="gr-up" color="var(--primary)" />
        <Arrow id="gr-dn" color="var(--accent)" />
      </defs>
      {/* nested level sets */}
      {[1.6, 1.0, 0.55, 0.22].map((k, i) => (
        <ellipse
          key={i}
          cx={C[0]}
          cy={C[1]}
          rx={rx * k}
          ry={ry * k}
          fill="none"
          stroke="var(--grid)"
          strokeWidth="1.4"
        />
      ))}
      <ellipse
        cx={C[0]}
        cy={C[1]}
        rx={rx}
        ry={ry}
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.6"
      />
      <circle cx={C[0]} cy={C[1]} r="3" fill={ORANGE} />
      <text x={C[0] + 6} y={C[1] + 14} fontSize="11" fill="var(--text-muted)">
        min
      </text>
      {/* point and gradient / descent arrows */}
      <circle cx={P[0]} cy={P[1]} r="4" fill="var(--text)" />
      <line
        x1={P[0]}
        y1={P[1]}
        x2={grad[0]}
        y2={grad[1]}
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#gr-up)"
      />
      <line
        x1={P[0]}
        y1={P[1]}
        x2={desc[0]}
        y2={desc[1]}
        stroke="var(--accent)"
        strokeWidth="2.5"
        markerEnd="url(#gr-dn)"
      />
      <text
        x={grad[0] + 4}
        y={grad[1] - 4}
        fontSize="12"
        fontWeight="700"
        fill="var(--primary)"
      >
        ∇L
      </text>
      <text
        x={desc[0] - 36}
        y={desc[1] + 12}
        fontSize="12"
        fontWeight="700"
        fill="var(--accent)"
      >
        −∇L
      </text>
      <text x="14" y="210" fontSize="11" fill="var(--text-muted)">
        level sets of L
      </text>
    </svg>
  );
}

/* --------------------- ML: attention weight heatmap ---------------------- */

export function AttentionFigure() {
  const weights = [
    [0.72, 0.12, 0.1, 0.06],
    [0.05, 0.08, 0.78, 0.09],
    [0.22, 0.24, 0.16, 0.38],
  ];
  const x0 = 74;
  const y0 = 34;
  const cell = 40;
  return (
    <svg className="svg-figure" viewBox="0 0 300 200" role="img">
      {weights.map((row, i) =>
        row.map((w, j) => {
          const strong = w > 0.5;
          return (
            <g key={`${i}-${j}`}>
              <rect
                x={x0 + j * cell}
                y={y0 + i * cell}
                width={cell - 3}
                height={cell - 3}
                rx="3"
                fill="var(--primary)"
                fillOpacity={Math.max(0.08, w)}
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x={x0 + j * cell + (cell - 3) / 2}
                y={y0 + i * cell + (cell - 3) / 2 + 4}
                fontSize="10"
                textAnchor="middle"
                fill={strong ? "#fff" : "var(--text-muted)"}
              >
                {w.toFixed(2)}
              </text>
            </g>
          );
        }),
      )}
      {/* row labels (queries) */}
      {["q₁", "q₂", "q₃"].map((q, i) => (
        <text
          key={q}
          x={x0 - 12}
          y={y0 + i * cell + (cell - 3) / 2 + 4}
          fontSize="12"
          textAnchor="middle"
          fill="var(--primary)"
          fontWeight="700"
        >
          {q}
        </text>
      ))}
      {/* column labels (keys) */}
      {["k₁", "k₂", "k₃", "k₄"].map((k, j) => (
        <text
          key={k}
          x={x0 + j * cell + (cell - 3) / 2}
          y={y0 - 8}
          fontSize="12"
          textAnchor="middle"
          fill="var(--accent)"
          fontWeight="700"
        >
          {k}
        </text>
      ))}
      <text x="150" y="192" fontSize="11" textAnchor="middle" fill="var(--text-muted)">
        softmax(QKᵀ / √d) — each row sums to 1
      </text>
    </svg>
  );
}

/* ---------- Eigen: diagonalization as change of basis, scale, back ------- */

export function DiagonalizationFigure() {
  const stages = [
    { t: "P⁻¹", s: "to eigenbasis" },
    { t: "D", s: "scale axes" },
    { t: "P", s: "back" },
  ];
  const w = 70;
  const gap = 20;
  const x0 = 40;
  const y = 40;
  const h = 34;
  const lastRight = x0 + stages.length * (w + gap) - gap;
  return (
    <svg className="svg-figure" viewBox="0 0 340 100" role="img">
      <defs>
        <Arrow id="dg-a" color="var(--text-muted)" />
      </defs>
      {/* input */}
      <text x="14" y={y + h / 2 + 4} fontSize="13" fontWeight="700" fill="var(--text)">
        x
      </text>
      <line
        x1="24"
        y1={y + h / 2}
        x2={x0 - 3}
        y2={y + h / 2}
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#dg-a)"
      />
      {stages.map((st, i) => {
        const x = x0 + i * (w + gap);
        return (
          <g key={st.t}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx="7"
              fill="var(--primary-soft)"
              stroke="var(--primary)"
              strokeWidth="1.3"
            />
            <text
              x={x + w / 2}
              y={y + h / 2 + 5}
              fontSize="14"
              textAnchor="middle"
              fill="var(--primary-strong)"
              fontWeight="700"
            >
              {st.t}
            </text>
            <text
              x={x + w / 2}
              y={y + h + 15}
              fontSize="9.5"
              textAnchor="middle"
              fill="var(--text-muted)"
            >
              {st.s}
            </text>
            {i < stages.length - 1 && (
              <line
                x1={x + w + 1}
                y1={y + h / 2}
                x2={x + w + gap - 3}
                y2={y + h / 2}
                stroke="var(--text-muted)"
                strokeWidth="1.5"
                markerEnd="url(#dg-a)"
              />
            )}
          </g>
        );
      })}
      {/* output */}
      <line
        x1={lastRight + 1}
        y1={y + h / 2}
        x2={lastRight + 17}
        y2={y + h / 2}
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#dg-a)"
      />
      <text
        x={lastRight + 22}
        y={y + h / 2 + 4}
        fontSize="12"
        fontWeight="700"
        fill="var(--text)"
      >
        Ax
      </text>
    </svg>
  );
}

/* ---------- Diag vs SVD: oblique eigen-axes vs orthogonal singular axes --- */

export function AxesCompareFigure() {
  const rad = (d: number) => (d * Math.PI) / 180;
  // Panel A: diagonalization — eigenvectors need not be perpendicular.
  const A = [90, 108];
  const r = 60;
  const e1 = [A[0] + r * Math.cos(rad(20)), A[1] - r * Math.sin(rad(20))];
  const e2 = [A[0] + r * Math.cos(rad(115)), A[1] - r * Math.sin(rad(115))];
  // Panel B: SVD — singular vectors are always orthogonal.
  const B = [258, 108];
  const v1 = [B[0] + r * Math.cos(rad(30)), B[1] - r * Math.sin(rad(30))];
  const v2 = [B[0] + r * Math.cos(rad(120)), B[1] - r * Math.sin(rad(120))];
  return (
    <svg className="svg-figure" viewBox="0 0 340 210" role="img">
      <defs>
        <Arrow id="ax-1" color="var(--primary)" />
        <Arrow id="ax-2" color="var(--accent)" />
        <Arrow id="ax-3" color="var(--primary)" />
        <Arrow id="ax-4" color="var(--accent)" />
      </defs>
      {/* Panel A: oblique eigen-axes */}
      <circle
        cx={A[0]}
        cy={A[1]}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.4"
        strokeDasharray="4 3"
      />
      <line
        x1={A[0]}
        y1={A[1]}
        x2={e1[0]}
        y2={e1[1]}
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#ax-1)"
      />
      <line
        x1={A[0]}
        y1={A[1]}
        x2={e2[0]}
        y2={e2[1]}
        stroke="var(--accent)"
        strokeWidth="2.5"
        markerEnd="url(#ax-2)"
      />
      {/* angle wedge to stress non-perpendicularity */}
      <path
        d={`M${A[0] + 22 * Math.cos(rad(20))},${A[1] - 22 * Math.sin(rad(20))} A22,22 0 0 0 ${A[0] + 22 * Math.cos(rad(115))},${A[1] - 22 * Math.sin(rad(115))}`}
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.1"
      />
      <text x={A[0] - 6} y={A[1] - 26} fontSize="10" fill="var(--text-muted)">
        ≠ 90°
      </text>
      <text
        x={e1[0] - 2}
        y={e1[1] - 6}
        fontSize="12"
        fontWeight="700"
        fill="var(--primary)"
      >
        v₁
      </text>
      <text
        x={e2[0] - 18}
        y={e2[1] - 4}
        fontSize="12"
        fontWeight="700"
        fill="var(--accent)"
      >
        v₂
      </text>
      <text x={A[0] - 52} y="196" fontSize="11" fill="var(--text-muted)">
        eigenvectors (P) · oblique
      </text>
      {/* Panel B: orthogonal singular axes */}
      <circle
        cx={B[0]}
        cy={B[1]}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.4"
        strokeDasharray="4 3"
      />
      <line
        x1={B[0]}
        y1={B[1]}
        x2={v1[0]}
        y2={v1[1]}
        stroke="var(--primary)"
        strokeWidth="2.5"
        markerEnd="url(#ax-3)"
      />
      <line
        x1={B[0]}
        y1={B[1]}
        x2={v2[0]}
        y2={v2[1]}
        stroke="var(--accent)"
        strokeWidth="2.5"
        markerEnd="url(#ax-4)"
      />
      {/* right-angle mark */}
      <path
        d={`M${B[0] + 16 * Math.cos(rad(30))},${B[1] - 16 * Math.sin(rad(30))} L${B[0] + 16 * Math.cos(rad(30)) + 16 * Math.cos(rad(120))},${B[1] - 16 * Math.sin(rad(30)) - 16 * Math.sin(rad(120))} L${B[0] + 16 * Math.cos(rad(120))},${B[1] - 16 * Math.sin(rad(120))}`}
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.1"
      />
      <text
        x={v1[0] - 2}
        y={v1[1] - 6}
        fontSize="12"
        fontWeight="700"
        fill="var(--primary)"
      >
        v₁
      </text>
      <text
        x={v2[0] - 18}
        y={v2[1] - 4}
        fontSize="12"
        fontWeight="700"
        fill="var(--accent)"
      >
        v₂
      </text>
      <text x={B[0] - 44} y="196" fontSize="11" fill="var(--text-muted)">
        singular vectors (V) · ⟂
      </text>
    </svg>
  );
}

/* ---------- Diag vs SVD: the two three-step pipelines, stacked ----------- */

export function FactorizationPipelinesFigure() {
  const stagesTop = [
    { t: "P⁻¹", s: "to eigenbasis" },
    { t: "D", s: "scale (λ, ±)" },
    { t: "P", s: "back (oblique)" },
  ];
  const stagesBot = [
    { t: "Vᵀ", s: "rotate/reflect" },
    { t: "Σ", s: "stretch (σ ≥ 0)" },
    { t: "U", s: "rotate/reflect" },
  ];
  const w = 66;
  const gap = 18;
  const x0 = 58;
  const h = 30;
  const rowY = (y: number) => y;

  const renderRow = (
    stages: { t: string; s: string }[],
    y: number,
    inLabel: string,
    outLabel: string,
    tone: "primary" | "accent",
  ) => {
    const fill = tone === "primary" ? "var(--primary-soft)" : "var(--accent-soft)";
    const stroke = tone === "primary" ? "var(--primary)" : "var(--accent)";
    const txt = tone === "primary" ? "var(--primary-strong)" : "var(--accent)";
    const lastRight = x0 + stages.length * (w + gap) - gap;
    return (
      <g>
        <text x="16" y={y + h / 2 + 4} fontSize="12" fontWeight="700" fill="var(--text)">
          {inLabel}
        </text>
        <line
          x1="30"
          y1={y + h / 2}
          x2={x0 - 3}
          y2={y + h / 2}
          stroke="var(--text-muted)"
          strokeWidth="1.4"
          markerEnd="url(#fp-a)"
        />
        {stages.map((st, i) => {
          const x = x0 + i * (w + gap);
          return (
            <g key={st.t}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx="6"
                fill={fill}
                stroke={stroke}
                strokeWidth="1.3"
              />
              <text
                x={x + w / 2}
                y={y + h / 2 + 5}
                fontSize="13"
                textAnchor="middle"
                fill={txt}
                fontWeight="700"
              >
                {st.t}
              </text>
              <text
                x={x + w / 2}
                y={y + h + 13}
                fontSize="8.6"
                textAnchor="middle"
                fill="var(--text-muted)"
              >
                {st.s}
              </text>
              {i < stages.length - 1 && (
                <line
                  x1={x + w + 1}
                  y1={y + h / 2}
                  x2={x + w + gap - 3}
                  y2={y + h / 2}
                  stroke="var(--text-muted)"
                  strokeWidth="1.4"
                  markerEnd="url(#fp-a)"
                />
              )}
            </g>
          );
        })}
        <line
          x1={lastRight + 1}
          y1={y + h / 2}
          x2={lastRight + 15}
          y2={y + h / 2}
          stroke="var(--text-muted)"
          strokeWidth="1.4"
          markerEnd="url(#fp-a)"
        />
        <text
          x={lastRight + 20}
          y={y + h / 2 + 4}
          fontSize="12"
          fontWeight="700"
          fill="var(--text)"
        >
          {outLabel}
        </text>
      </g>
    );
  };

  return (
    <svg className="svg-figure" viewBox="0 0 360 160" role="img">
      <defs>
        <Arrow id="fp-a" color="var(--text-muted)" />
      </defs>
      <text x="16" y="16" fontSize="10.5" fill="var(--primary-strong)" fontWeight="700">
        A = P D P⁻¹
      </text>
      {renderRow(stagesTop, rowY(26), "x", "Ax", "primary")}
      <text x="16" y="98" fontSize="10.5" fill="var(--accent)" fontWeight="700">
        A = U Σ Vᵀ
      </text>
      {renderRow(stagesBot, rowY(108), "x", "Ax", "accent")}
    </svg>
  );
}

export function PipelineFigure() {
  const steps = ["Vectors", "Matrices", "Eigen", "SVD", "ML"];
  const w = 54;
  const gap = 12;
  const x0 = 12;
  const y = 34;
  const h = 32;
  return (
    <svg className="svg-figure" viewBox="0 0 340 90" role="img">
      <defs>
        <Arrow id="pl-a" color="var(--text-muted)" />
      </defs>
      {steps.map((label, i) => {
        const x = x0 + i * (w + gap);
        return (
          <g key={label}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx="7"
              fill="var(--primary-soft)"
              stroke="var(--primary)"
              strokeWidth="1.3"
            />
            <text
              x={x + w / 2}
              y={y + h / 2 + 4}
              fontSize="10.5"
              textAnchor="middle"
              fill="var(--primary-strong)"
              fontWeight="600"
            >
              {label}
            </text>
            {i < steps.length - 1 && (
              <line
                x1={x + w + 1}
                y1={y + h / 2}
                x2={x + w + gap - 2}
                y2={y + h / 2}
                stroke="var(--text-muted)"
                strokeWidth="1.5"
                markerEnd="url(#pl-a)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* -------------------- Multiplicity: eigenspaces compared ------------------ */

/**
 * Two side-by-side planes for a repeated eigenvalue. Left: geometric = 2, the
 * whole plane is an eigenspace (diagonalizable). Right: geometric = 1, only a
 * single eigen-line survives while a generic vector is sheared off it — the
 * defective case where an eigenvector is "missing."
 */
export function EigenspaceCompareFigure() {
  const panel = (ox: number, full: boolean) => {
    const cx = ox + 70;
    const cy = 120;
    const R = 52;
    return (
      <g key={ox}>
        <rect
          x={ox}
          y={40}
          width={140}
          height={160}
          rx="8"
          fill="var(--bg-subtle)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        {full ? (
          /* whole plane shaded = every direction is an eigenvector */
          <>
            <circle cx={cx} cy={cy} r={R} fill={ORANGE} opacity="0.18" />
            {[0, 45, 90, 135].map((deg) => {
              const r = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={cx - R * Math.cos(r)}
                  y1={cy - R * Math.sin(r)}
                  x2={cx + R * Math.cos(r)}
                  y2={cy + R * Math.sin(r)}
                  stroke={ORANGE}
                  strokeWidth="1.4"
                  strokeDasharray="4 3"
                  opacity="0.85"
                />
              );
            })}
          </>
        ) : (
          /* single eigen-line + a generic vector turned off it */
          <>
            <line
              x1={cx - R}
              y1={cy}
              x2={cx + R}
              y2={cy}
              stroke={ORANGE}
              strokeWidth="2.4"
              strokeDasharray="5 4"
            />
            <line
              x1={cx}
              y1={cy}
              x2={cx + 40}
              y2={cy - 34}
              stroke="var(--accent)"
              strokeWidth="2.2"
              markerEnd="url(#mc-w)"
            />
            <line
              x1={cx}
              y1={cy}
              x2={cx + 50}
              y2={cy - 12}
              stroke="var(--text-muted)"
              strokeWidth="1.8"
              strokeDasharray="4 3"
              markerEnd="url(#mc-aw)"
            />
          </>
        )}
        <text x={cx} y={214} fontSize="11" textAnchor="middle" fill="var(--text-muted)">
          {full ? "geo = 2" : "geo = 1"}
        </text>
        <text
          x={cx}
          y={30}
          fontSize="11"
          textAnchor="middle"
          fontWeight="700"
          fill="var(--text)"
        >
          {full ? "full eigenspace" : "defective"}
        </text>
      </g>
    );
  };
  return (
    <svg className="svg-figure" viewBox="0 0 320 230" role="img">
      <defs>
        <Arrow id="mc-w" color="var(--accent)" />
        <Arrow id="mc-aw" color="var(--text-muted)" />
      </defs>
      {panel(20, true)}
      {panel(160, false)}
    </svg>
  );
}

/* -------------------- Multiplicity: alg vs geo bars ---------------------- */

/**
 * A tiny bar chart contrasting algebraic and geometric multiplicity for a
 * repeated eigenvalue. The geometric bar can only ever be shorter or equal —
 * the gap (hatched) is the number of missing eigenvectors.
 */
export function MultiplicityBarsFigure() {
  const baseY = 150;
  const unit = 44;
  const bar = (x: number, height: number, color: string, label: string) => (
    <g key={label}>
      <rect
        x={x}
        y={baseY - height}
        width="46"
        height={height}
        rx="4"
        fill={color}
        opacity="0.85"
      />
      <text
        x={x + 23}
        y={baseY + 16}
        fontSize="11"
        textAnchor="middle"
        fill="var(--text-muted)"
      >
        {label}
      </text>
    </g>
  );
  return (
    <svg className="svg-figure" viewBox="0 0 300 180" role="img">
      {/* baseline */}
      <line
        x1="30"
        y1={baseY}
        x2="270"
        y2={baseY}
        stroke="var(--axis)"
        strokeWidth="1.5"
      />
      {bar(50, 2 * unit, "var(--primary)", "algebraic = 2")}
      {bar(160, 1 * unit, ORANGE, "geometric = 1")}
      {/* the gap = missing eigenvector */}
      <rect
        x={160}
        y={baseY - 2 * unit}
        width="46"
        height={unit}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.4"
        strokeDasharray="4 3"
      />
      <text
        x={183}
        y={baseY - 2 * unit - 6}
        fontSize="10.5"
        textAnchor="middle"
        fill="var(--accent)"
      >
        missing
      </text>
    </svg>
  );
}
