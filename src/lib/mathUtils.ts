/**
 * mathUtils — small, dependency-free linear algebra helpers used throughout the
 * Linear Algebra Lab site (demos, calculators, and worked examples).
 *
 * Design goals:
 *  - Readable over clever. These functions double as teaching material.
 *  - Pure functions: inputs are never mutated.
 *  - Honest about numerical limits (see `roundNear` and the 2x2 SVD helper).
 */

export type Vector = number[];
export type Matrix = number[][];

const EPS = 1e-9;

/** Round values that are within `tol` of a "nice" number to reduce float noise. */
export function roundNear(x: number, tol = 1e-9): number {
  const r = Math.round(x);
  if (Math.abs(x - r) < tol) return r === 0 ? 0 : r; // avoid -0
  return x;
}

// ---------------------------------------------------------------------------
// Vectors
// ---------------------------------------------------------------------------

function assertSameLength(a: Vector, b: Vector): void {
  if (a.length !== b.length) {
    throw new Error(
      `Vectors must have the same length (got ${a.length} and ${b.length}).`,
    );
  }
}

/** Element-wise sum: (a + b). */
export function addVectors(a: Vector, b: Vector): Vector {
  assertSameLength(a, b);
  return a.map((ai, i) => ai + b[i]);
}

/** Element-wise difference: (a - b). */
export function subtractVectors(a: Vector, b: Vector): Vector {
  assertSameLength(a, b);
  return a.map((ai, i) => ai - b[i]);
}

/** Scale every component of a vector by a scalar. */
export function scaleVector(v: Vector, s: number): Vector {
  return v.map((vi) => vi * s);
}

/** Dot product a·b = sum of component-wise products. */
export function dot(a: Vector, b: Vector): number {
  assertSameLength(a, b);
  return a.reduce((acc, ai, i) => acc + ai * b[i], 0);
}

/** Euclidean length (2-norm) of a vector. */
export function norm(v: Vector): number {
  return Math.sqrt(dot(v, v));
}

/** Return a unit-length vector in the same direction as v (throws on zero vector). */
export function normalize(v: Vector): Vector {
  const n = norm(v);
  if (n < EPS) throw new Error("Cannot normalize the zero vector.");
  return scaleVector(v, 1 / n);
}

/**
 * Cosine similarity between two vectors: cosθ = (a·b) / (‖a‖‖b‖).
 * Ranges from -1 (opposite) to 1 (same direction). Used everywhere in ML for
 * comparing embeddings.
 */
export function cosineSimilarity(a: Vector, b: Vector): number {
  const denom = norm(a) * norm(b);
  if (denom < EPS) throw new Error("Cosine similarity is undefined for a zero vector.");
  return dot(a, b) / denom;
}

/** Angle between two vectors in radians. */
export function angleBetween(a: Vector, b: Vector): number {
  const c = Math.min(1, Math.max(-1, cosineSimilarity(a, b)));
  return Math.acos(c);
}

/**
 * Orthogonal projection of a onto b: proj_b(a) = ((a·b)/(b·b)) b.
 * This is the "shadow" of a in the direction of b.
 */
export function projection(a: Vector, b: Vector): Vector {
  const bb = dot(b, b);
  if (bb < EPS) throw new Error("Cannot project onto the zero vector.");
  const scalar = dot(a, b) / bb;
  return scaleVector(b, scalar);
}

// ---------------------------------------------------------------------------
// Matrices
// ---------------------------------------------------------------------------

/** Number of rows and columns of a matrix. */
export function shape(m: Matrix): [number, number] {
  const rows = m.length;
  const cols = rows === 0 ? 0 : m[0].length;
  return [rows, cols];
}

/** Transpose Aᵀ: rows become columns. */
export function transpose(m: Matrix): Matrix {
  const [rows, cols] = shape(m);
  const out: Matrix = [];
  for (let c = 0; c < cols; c++) {
    const row: Vector = [];
    for (let r = 0; r < rows; r++) row.push(m[r][c]);
    out.push(row);
  }
  return out;
}

/** Matrix product A·B. Columns of A must equal rows of B. */
export function multiplyMatrices(a: Matrix, b: Matrix): Matrix {
  const [ar, ac] = shape(a);
  const [br, bc] = shape(b);
  if (ac !== br) {
    throw new Error(
      `Cannot multiply: A is ${ar}x${ac} but B is ${br}x${bc} (inner dimensions differ).`,
    );
  }
  const out: Matrix = [];
  for (let i = 0; i < ar; i++) {
    const row: Vector = [];
    for (let j = 0; j < bc; j++) {
      let sum = 0;
      for (let k = 0; k < ac; k++) sum += a[i][k] * b[k][j];
      row.push(sum);
    }
    out.push(row);
  }
  return out;
}

/** Apply a matrix to a column vector: A·v. */
export function applyMatrix(m: Matrix, v: Vector): Vector {
  const [rows, cols] = shape(m);
  if (cols !== v.length) {
    throw new Error(
      `Cannot apply ${rows}x${cols} matrix to a vector of length ${v.length}.`,
    );
  }
  return m.map((row) => dot(row, v));
}

/** n×n identity matrix. */
export function identity(n: number): Matrix {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );
}

/** Determinant of a 2x2 matrix: ad − bc. */
export function determinant2x2(m: Matrix): number {
  const [rows, cols] = shape(m);
  if (rows !== 2 || cols !== 2) throw new Error("determinant2x2 requires a 2x2 matrix.");
  const [[a, b], [c, d]] = m;
  return a * d - b * c;
}

/** Inverse of a 2x2 matrix (throws when the matrix is singular). */
export function inverse2x2(m: Matrix): Matrix {
  const [rows, cols] = shape(m);
  if (rows !== 2 || cols !== 2) throw new Error("inverse2x2 requires a 2x2 matrix.");
  const [[a, b], [c, d]] = m;
  const det = a * d - b * c;
  if (Math.abs(det) < EPS) throw new Error("Matrix is singular (determinant ≈ 0).");
  return [
    [d / det, -b / det],
    [-c / det, a / det],
  ].map((row) => row.map((x) => roundNear(x)));
}

/** Determinant of a 3x3 matrix via cofactor (Sarrus) expansion. */
export function determinant3x3(m: Matrix): number {
  const [rows, cols] = shape(m);
  if (rows !== 3 || cols !== 3) throw new Error("determinant3x3 requires a 3x3 matrix.");
  const [[a, b, c], [d, e, f], [g, h, i]] = m;
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

// ---------------------------------------------------------------------------
// Gaussian elimination / rank
// ---------------------------------------------------------------------------

export interface EliminationStep {
  description: string;
  matrix: Matrix;
}

export interface EliminationResult {
  rref: Matrix;
  steps: EliminationStep[];
  pivotColumns: number[];
  rank: number;
}

function cloneMatrix(m: Matrix): Matrix {
  return m.map((row) => row.slice());
}

/**
 * Translator used to localize the human-readable elimination step descriptions.
 * Mirrors the signature of the i18n `t` helper so callers can pass it straight
 * in; when omitted the English source templates are used.
 */
export type StepTranslator = (
  key: string,
  vars?: Record<string, string | number>,
) => string;

const DEFAULT_STEP_LABELS: Record<string, string> = {
  "gauss.op.start": "Starting matrix.",
  "gauss.op.swap": "Swap R{a} ↔ R{b} to bring a nonzero pivot to the top.",
  "gauss.op.scale": "Scale R{row} by 1/{factor} so the pivot in column {col} is 1.",
  "gauss.op.eliminate": "R{r} → R{r} − ({factor})·R{pivot} to clear column {col}.",
  "gauss.op.rref": "Reduced row echelon form (RREF) reached.",
};

function fillTemplate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_m, name: string) =>
    name in vars ? String(vars[name]) : `{${name}}`,
  );
}

/**
 * Reduce a matrix to Reduced Row Echelon Form (RREF) using Gauss–Jordan
 * elimination with partial pivoting. Records a human-readable step for each row
 * operation so the UI can render a step-by-step solution. Pass a translator to
 * localize the step descriptions.
 */
export function gaussianElimination(
  input: Matrix,
  t?: StepTranslator,
): EliminationResult {
  const translate: StepTranslator =
    t ?? ((key, vars) => fillTemplate(DEFAULT_STEP_LABELS[key] ?? key, vars));
  const m = cloneMatrix(input);
  const [rows, cols] = shape(m);
  const steps: EliminationStep[] = [];
  const pivotColumns: number[] = [];
  let pivotRow = 0;

  const record = (description: string) =>
    steps.push({ description, matrix: cloneMatrix(m) });

  record(translate("gauss.op.start"));

  for (let col = 0; col < cols && pivotRow < rows; col++) {
    // Partial pivoting: find the row (at or below pivotRow) with the largest |value|.
    let best = pivotRow;
    for (let r = pivotRow + 1; r < rows; r++) {
      if (Math.abs(m[r][col]) > Math.abs(m[best][col])) best = r;
    }
    if (Math.abs(m[best][col]) < EPS) continue; // no pivot in this column

    if (best !== pivotRow) {
      [m[pivotRow], m[best]] = [m[best], m[pivotRow]];
      record(translate("gauss.op.swap", { a: pivotRow + 1, b: best + 1 }));
    }

    // Scale pivot row so the pivot becomes 1.
    const pivot = m[pivotRow][col];
    if (Math.abs(pivot - 1) > EPS) {
      m[pivotRow] = m[pivotRow].map((x) => roundNear(x / pivot));
      record(
        translate("gauss.op.scale", {
          row: pivotRow + 1,
          factor: formatNum(pivot),
          col: col + 1,
        }),
      );
    }

    // Eliminate the pivot column from all other rows.
    for (let r = 0; r < rows; r++) {
      if (r === pivotRow) continue;
      const factor = m[r][col];
      if (Math.abs(factor) < EPS) continue;
      m[r] = m[r].map((x, j) => roundNear(x - factor * m[pivotRow][j]));
      record(
        translate("gauss.op.eliminate", {
          r: r + 1,
          factor: formatNum(factor),
          pivot: pivotRow + 1,
          col: col + 1,
        }),
      );
    }

    pivotColumns.push(col);
    pivotRow++;
  }

  record(translate("gauss.op.rref"));
  return { rref: m, steps, pivotColumns, rank: pivotColumns.length };
}

function formatNum(x: number): string {
  const r = roundNear(x);
  if (Number.isInteger(r)) return String(r);
  return r.toFixed(3).replace(/\.?0+$/, "");
}

/** Rank = number of pivots after row reduction. */
export function rank(m: Matrix): number {
  return gaussianElimination(m).rank;
}

// ---------------------------------------------------------------------------
// Gram–Schmidt
// ---------------------------------------------------------------------------

/**
 * Gram–Schmidt orthogonalization. Returns an orthonormal set spanning the same
 * space as the input vectors. Linearly dependent vectors are dropped.
 */
export function gramSchmidt(vectors: Vector[]): Vector[] {
  const out: Vector[] = [];
  for (const v of vectors) {
    let w = v.slice();
    for (const q of out) {
      const proj = scaleVector(q, dot(v, q));
      w = subtractVectors(w, proj);
    }
    const n = norm(w);
    if (n > 1e-8) out.push(scaleVector(w, 1 / n));
  }
  return out;
}

// ---------------------------------------------------------------------------
// Eigenvalues (2x2)
// ---------------------------------------------------------------------------

export interface Eigen2x2 {
  /** Real eigenvalues (empty if the matrix has complex eigenvalues). */
  eigenvalues: number[];
  /** One eigenvector per real eigenvalue (unit length where possible). */
  eigenvectors: Vector[];
  /** True when the discriminant is negative (rotation-like matrices). */
  complex: boolean;
  trace: number;
  determinant: number;
  discriminant: number;
}

/**
 * Eigenvalues/eigenvectors of a 2x2 matrix via the characteristic polynomial
 *   λ² − (trace)·λ + det = 0.
 */
export function eigen2x2(m: Matrix): Eigen2x2 {
  const [rows, cols] = shape(m);
  if (rows !== 2 || cols !== 2) throw new Error("eigen2x2 requires a 2x2 matrix.");
  const [[a, b], [c, d]] = m;
  const trace = a + d;
  const det = a * d - b * c;
  const disc = trace * trace - 4 * det;

  if (disc < -EPS) {
    return {
      eigenvalues: [],
      eigenvectors: [],
      complex: true,
      trace,
      determinant: det,
      discriminant: disc,
    };
  }

  const sqrtDisc = Math.sqrt(Math.max(0, disc));
  const l1 = roundNear((trace + sqrtDisc) / 2);
  const l2 = roundNear((trace - sqrtDisc) / 2);
  const eigenvalues = Math.abs(l1 - l2) < EPS ? [l1] : [l1, l2];

  const eigenvectors = eigenvalues.map((lambda) => eigenvectorFor2x2(m, lambda));

  return {
    eigenvalues,
    eigenvectors,
    complex: false,
    trace,
    determinant: det,
    discriminant: disc,
  };
}

/**
 * Find a unit eigenvector for a 2x2 matrix given eigenvalue λ by solving
 * (A − λI)x = 0.
 */
export function eigenvectorFor2x2(m: Matrix, lambda: number): Vector {
  const [[a, b], [, d]] = m;
  const c = m[1][0];
  // (A - λI) = [[a-λ, b], [c, d-λ]]. Rows are proportional; use whichever is nonzero.
  const r1 = [a - lambda, b];
  const r2 = [c, d - lambda];
  let v: Vector;
  if (Math.abs(r1[0]) > EPS || Math.abs(r1[1]) > EPS) {
    // (a-λ)x + b y = 0  ->  direction (b, -(a-λ)) = (-b, a-λ) up to sign
    v = [-r1[1], r1[0]];
  } else if (Math.abs(r2[0]) > EPS || Math.abs(r2[1]) > EPS) {
    v = [-r2[1], r2[0]];
  } else {
    v = [1, 0]; // A = λI: every vector is an eigenvector.
  }
  if (norm(v) < EPS) v = [1, 0];
  const unit = normalize(v);
  // Prefer a canonical sign (first nonzero component positive) for stable display.
  const lead = Math.abs(unit[0]) > EPS ? unit[0] : unit[1];
  return lead < 0 ? scaleVector(unit, -1) : unit.map((x) => roundNear(x));
}

// ---------------------------------------------------------------------------
// SVD helper (2x2)
// ---------------------------------------------------------------------------

export interface SVD2x2 {
  A: Matrix;
  /** AᵀA, whose eigenvalues are the squared singular values. */
  ATA: Matrix;
  /** Singular values σ1 ≥ σ2 ≥ 0. */
  singularValues: number[];
  /** Right singular vectors (columns of V). */
  V: Matrix;
  /** Left singular vectors (columns of U). */
  U: Matrix;
  /** Diagonal matrix of singular values. */
  S: Matrix;
  /** Reconstruction U Σ Vᵀ (should match A up to rounding). */
  reconstruction: Matrix;
}

/**
 * Compute the SVD of a 2x2 matrix from scratch, following the same manual
 * recipe taught on the SVD page:
 *   1. Form AᵀA.
 *   2. Its eigenvalues are σ².  Singular values σ = sqrt(eigenvalue).
 *   3. Eigenvectors of AᵀA are the right singular vectors (columns of V).
 *   4. u_i = (1/σ_i) A v_i are the left singular vectors (columns of U).
 *
 * This is intended for teaching small examples, not for production numerics.
 */
export function svd2x2(A: Matrix): SVD2x2 {
  const [rows, cols] = shape(A);
  if (rows !== 2 || cols !== 2) throw new Error("svd2x2 requires a 2x2 matrix.");

  const AT = transpose(A);
  const ATA = multiplyMatrices(AT, A);

  const eig = eigen2x2(ATA);
  // AᵀA is symmetric positive semidefinite, so eigenvalues are real and ≥ 0.
  const pairs = eig.eigenvalues
    .map((lambda, i) => ({
      value: Math.max(0, lambda),
      vector: eig.eigenvectors[i],
    }))
    .sort((p, q) => q.value - p.value);

  // If AᵀA had a repeated eigenvalue, eigen2x2 returns a single entry — expand it.
  while (pairs.length < 2) {
    const only = pairs[0];
    // Pick an orthogonal companion direction.
    const v = only ? [-only.vector[1], only.vector[0]] : [0, 1];
    pairs.push({ value: only ? only.value : 0, vector: normalize(v) });
  }

  const singularValues = pairs.map((p) => roundNear(Math.sqrt(p.value)));

  // Right singular vectors as columns of V.
  const v1 = pairs[0].vector;
  const v2 = orthogonalUnitCompanion(v1, pairs[1].vector);
  const V: Matrix = [
    [v1[0], v2[0]],
    [v1[1], v2[1]],
  ];

  // Left singular vectors u_i = (1/σ_i) A v_i.
  const uCols: Vector[] = pairs.map((_p, i) => {
    const vi = i === 0 ? v1 : v2;
    const sigma = singularValues[i];
    if (sigma > EPS) return normalize(applyMatrix(A, vi));
    return null as unknown as Vector;
  });

  // Handle zero singular values: complete U to an orthonormal basis.
  if (!uCols[0]) uCols[0] = [1, 0];
  if (!uCols[1])
    uCols[1] = orthogonalUnitCompanion(uCols[0], [-uCols[0][1], uCols[0][0]]);
  else uCols[1] = orthogonalUnitCompanion(uCols[0], uCols[1]);

  const U: Matrix = [
    [uCols[0][0], uCols[1][0]],
    [uCols[0][1], uCols[1][1]],
  ];

  const S: Matrix = [
    [singularValues[0], 0],
    [0, singularValues[1]],
  ];

  const reconstruction = multiplyMatrices(multiplyMatrices(U, S), transpose(V)).map(
    (row) => row.map((x) => roundNear(x, 1e-6)),
  );

  return {
    A,
    ATA,
    singularValues,
    V: V.map((row) => row.map((x) => roundNear(x))),
    U: U.map((row) => row.map((x) => roundNear(x))),
    S,
    reconstruction,
  };
}

/**
 * Return a unit vector orthogonal to `base`, using `candidate` only to pick the
 * sign/orientation. Keeps V and U proper orthonormal for display.
 */
function orthogonalUnitCompanion(base: Vector, candidate: Vector): Vector {
  const perp = [-base[1], base[0]];
  const oriented = dot(perp, candidate) < 0 ? scaleVector(perp, -1) : perp;
  return normalize(oriented).map((x) => roundNear(x));
}

// ---------------------------------------------------------------------------
// Diagonalization helper (2x2) — the companion to svd2x2
// ---------------------------------------------------------------------------

export interface Diagonalization2x2 {
  A: Matrix;
  /** True when A has two independent real eigenvectors (so A = P D P⁻¹ exists). */
  diagonalizable: boolean;
  /** True when A = Aᵀ (eigenvectors can be chosen orthonormal, P = Q). */
  symmetric: boolean;
  /** Real eigenvalues, largest-magnitude first (empty when complex). */
  eigenvalues: number[];
  /** True when the characteristic polynomial has complex roots. */
  complex: boolean;
  /** Change-of-basis matrix P whose columns are eigenvectors. */
  P: Matrix;
  /** Diagonal matrix D of eigenvalues. */
  D: Matrix;
  /** Inverse of P (null when A is defective / not diagonalizable). */
  Pinv: Matrix | null;
  /** Reconstruction P D P⁻¹ (null when not diagonalizable). */
  reconstruction: Matrix | null;
}

/**
 * Diagonalize a 2x2 matrix following the eigenvalue recipe taught on the Eigen
 * page: solve the characteristic polynomial, collect one eigenvector per
 * eigenvalue as the columns of P, and place the eigenvalues on the diagonal of
 * D so that A = P D P⁻¹.
 *
 * Reports honestly when A cannot be diagonalized over the reals: a defective
 * matrix (repeated eigenvalue with only one independent eigenvector) or a
 * rotation-like matrix with complex eigenvalues.
 */
export function diagonalize2x2(A: Matrix): Diagonalization2x2 {
  const [rows, cols] = shape(A);
  if (rows !== 2 || cols !== 2) throw new Error("diagonalize2x2 requires a 2x2 matrix.");

  const symmetric = Math.abs(A[0][1] - A[1][0]) < EPS;
  const eig = eigen2x2(A);

  const base: Diagonalization2x2 = {
    A,
    diagonalizable: false,
    symmetric,
    eigenvalues: eig.eigenvalues,
    complex: eig.complex,
    P: identity(2),
    D: identity(2),
    Pinv: null,
    reconstruction: null,
  };

  if (eig.complex) return base;

  // Order eigenpairs by descending magnitude for a stable, readable display.
  const pairs = eig.eigenvalues
    .map((value, i) => ({ value, vector: eig.eigenvectors[i] }))
    .sort((p, q) => Math.abs(q.value) - Math.abs(p.value));

  // A repeated eigenvalue that is a scalar multiple of I (e.g. 2I) is still
  // diagonalizable — every direction is an eigenvector. A repeated eigenvalue
  // with a single eigenvector direction is defective.
  if (pairs.length < 2) {
    const lambda = pairs[0]?.value ?? 0;
    const isScalarMatrix =
      Math.abs(A[0][1]) < EPS &&
      Math.abs(A[1][0]) < EPS &&
      Math.abs(A[0][0] - A[1][1]) < EPS;
    if (!isScalarMatrix) {
      return { ...base, eigenvalues: [lambda] };
    }
    // Scalar matrix: use the standard basis as eigenvectors.
    pairs.push({ value: lambda, vector: [1, 0] });
    pairs[0] = { value: lambda, vector: [1, 0] };
    pairs[1] = { value: lambda, vector: [0, 1] };
  }

  const v1 = pairs[0].vector;
  let v2 = pairs[1].vector;
  // For symmetric matrices, force exact orthonormal columns (spectral theorem).
  if (symmetric && Math.abs(pairs[0].value - pairs[1].value) > EPS) {
    v2 = orthogonalUnitCompanion(v1, v2);
  }

  const P: Matrix = [
    [v1[0], v2[0]],
    [v1[1], v2[1]],
  ];

  if (Math.abs(determinant2x2(P)) < EPS) {
    return { ...base, eigenvalues: pairs.map((p) => p.value) };
  }

  const D: Matrix = [
    [pairs[0].value, 0],
    [0, pairs[1].value],
  ];
  const Pinv = inverse2x2(P);
  const reconstruction = multiplyMatrices(multiplyMatrices(P, D), Pinv).map((row) =>
    row.map((x) => roundNear(x, 1e-6)),
  );

  return {
    A,
    diagonalizable: true,
    symmetric,
    eigenvalues: pairs.map((p) => p.value),
    complex: false,
    P: P.map((row) => row.map((x) => roundNear(x))),
    D,
    Pinv: Pinv.map((row) => row.map((x) => roundNear(x))),
    reconstruction,
  };
}

// ---------------------------------------------------------------------------
// Formatting helpers used by UI components
// ---------------------------------------------------------------------------

/** Format a number for display: integers stay clean, decimals trimmed to 3dp. */
export function fmt(x: number, dp = 3): string {
  const r = roundNear(x);
  if (Number.isInteger(r)) return String(r);
  return Number(r.toFixed(dp)).toString();
}

/** Render a matrix as a LaTeX bmatrix body (no surrounding $...$). */
export function matrixToLatex(m: Matrix, dp = 3): string {
  const body = m.map((row) => row.map((x) => fmt(x, dp)).join(" & ")).join(" \\\\ ");
  return `\\begin{bmatrix} ${body} \\end{bmatrix}`;
}

/** Render a column vector as LaTeX. */
export function vectorToLatex(v: Vector, dp = 3): string {
  const body = v.map((x) => fmt(x, dp)).join(" \\\\ ");
  return `\\begin{bmatrix} ${body} \\end{bmatrix}`;
}
