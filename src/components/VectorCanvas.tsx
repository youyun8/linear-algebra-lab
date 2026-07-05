import { useRef, useState } from "react";
import { dot, norm, cosineSimilarity, projection, fmt } from "../lib/mathUtils";
import { useLanguage } from "../i18n/LanguageProvider";

type Vec = [number, number];

interface VectorCanvasProps {
  /** Show the projection of a onto b. */
  showProjection?: boolean;
}

const SIZE = 420;
const RANGE = 6; // coordinate range: -RANGE..RANGE
const scale = SIZE / (2 * RANGE);

/** Convert math coordinates to SVG pixel coordinates (y flips). */
function toPx([x, y]: Vec): Vec {
  return [SIZE / 2 + x * scale, SIZE / 2 - y * scale];
}
/** Convert SVG pixel coordinates back to math coordinates. */
function toMath(px: number, py: number): Vec {
  return [(px - SIZE / 2) / scale, (SIZE / 2 - py) / scale];
}

/**
 * Interactive 2D vector playground. Drag the two arrow tips to change vectors a
 * and b; the panel live-updates dot product, magnitudes, angle, cosine
 * similarity, and (optionally) the projection of a onto b.
 */
export function VectorCanvas({ showProjection = true }: VectorCanvasProps) {
  const { t } = useLanguage();
  const [a, setA] = useState<Vec>([4, 1]);
  const [b, setB] = useState<Vec>([1, 3]);
  const [dragging, setDragging] = useState<null | "a" | "b">(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const pointerMove = (e: React.PointerEvent) => {
    if (!dragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * SIZE;
    const py = ((e.clientY - rect.top) / rect.height) * SIZE;
    let [mx, my] = toMath(px, py);
    // Snap to half-integers for cleaner numbers.
    mx = Math.max(-RANGE, Math.min(RANGE, Math.round(mx * 2) / 2));
    my = Math.max(-RANGE, Math.min(RANGE, Math.round(my * 2) / 2));
    if (dragging === "a") setA([mx, my]);
    else setB([mx, my]);
  };

  const d = dot(a, b);
  const cos = norm(a) > 0 && norm(b) > 0 ? cosineSimilarity(a, b) : 0;
  const angleDeg = (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
  const proj = norm(b) > 1e-9 ? (projection(a, b) as Vec) : ([0, 0] as Vec);

  const origin = toPx([0, 0]);
  const aEnd = toPx(a);
  const bEnd = toPx(b);
  const projEnd = toPx(proj);

  const gridLines = [];
  for (let i = -RANGE; i <= RANGE; i++) {
    const [vx] = toPx([i, 0]);
    const [, hy] = toPx([0, i]);
    gridLines.push(
      <line
        key={`v${i}`}
        x1={vx}
        y1={0}
        x2={vx}
        y2={SIZE}
        stroke="var(--grid)"
        strokeWidth={1}
      />,
      <line
        key={`h${i}`}
        x1={0}
        y1={hy}
        x2={SIZE}
        y2={hy}
        stroke="var(--grid)"
        strokeWidth={1}
      />,
    );
  }

  return (
    <div className="canvas-wrap vector-canvas">
      <div className="vector-canvas-plot">
        <svg
          ref={svgRef}
          className="svg-canvas"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          onPointerMove={pointerMove}
          onPointerUp={() => setDragging(null)}
          onPointerLeave={() => setDragging(null)}
        >
          <defs>
            <marker
              id="arrowA"
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L7,3 L0,6 Z" fill="var(--primary)" />
            </marker>
            <marker
              id="arrowB"
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L7,3 L0,6 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {gridLines}
          {/* axes */}
          <line
            x1={0}
            y1={SIZE / 2}
            x2={SIZE}
            y2={SIZE / 2}
            stroke="var(--axis)"
            strokeWidth={1.5}
          />
          <line
            x1={SIZE / 2}
            y1={0}
            x2={SIZE / 2}
            y2={SIZE}
            stroke="var(--axis)"
            strokeWidth={1.5}
          />

          {/* projection */}
          {showProjection && norm(b) > 1e-9 && (
            <>
              <line
                x1={aEnd[0]}
                y1={aEnd[1]}
                x2={projEnd[0]}
                y2={projEnd[1]}
                stroke="var(--text-muted)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
              <line
                x1={origin[0]}
                y1={origin[1]}
                x2={projEnd[0]}
                y2={projEnd[1]}
                stroke="#f59e0b"
                strokeWidth={5}
                opacity={0.8}
              />
            </>
          )}

          {/* vector a */}
          <line
            x1={origin[0]}
            y1={origin[1]}
            x2={aEnd[0]}
            y2={aEnd[1]}
            stroke="var(--primary)"
            strokeWidth={3}
            markerEnd="url(#arrowA)"
          />
          {/* vector b */}
          <line
            x1={origin[0]}
            y1={origin[1]}
            x2={bEnd[0]}
            y2={bEnd[1]}
            stroke="var(--accent)"
            strokeWidth={3}
            markerEnd="url(#arrowB)"
          />

          {/* draggable handles */}
          <circle
            cx={aEnd[0]}
            cy={aEnd[1]}
            r={10}
            fill="var(--primary)"
            opacity={0.9}
            style={{ cursor: "grab" }}
            onPointerDown={() => setDragging("a")}
          />
          <circle
            cx={bEnd[0]}
            cy={bEnd[1]}
            r={10}
            fill="var(--accent)"
            opacity={0.9}
            style={{ cursor: "grab" }}
            onPointerDown={() => setDragging("b")}
          />
          <text
            x={aEnd[0] + 10}
            y={aEnd[1] - 6}
            fill="var(--primary)"
            fontWeight="700"
            fontSize="14"
          >
            a
          </text>
          <text
            x={bEnd[0] + 10}
            y={bEnd[1] - 6}
            fill="var(--accent)"
            fontWeight="700"
            fontSize="14"
          >
            b
          </text>
        </svg>
      </div>

      <div className="vector-canvas-side">
        <div className="readout">
          {`a = (${fmt(a[0])}, ${fmt(a[1])})   b = (${fmt(b[0])}, ${fmt(b[1])})
a · b = ${fmt(d)}
‖a‖ = ${fmt(norm(a))}   ‖b‖ = ${fmt(norm(b))}
angle = ${fmt(angleDeg)}°   cos θ = ${fmt(cos)}${
            showProjection
              ? `\nproj_b(a) = (${fmt(proj[0])}, ${fmt(proj[1])})   length = ${fmt(norm(proj))}`
              : ""
          }`}
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          {t("vec.caption")}
        </p>
      </div>
    </div>
  );
}
