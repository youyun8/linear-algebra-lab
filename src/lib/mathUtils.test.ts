import { describe, it, expect } from "vitest";
import {
  addVectors,
  subtractVectors,
  scaleVector,
  dot,
  norm,
  normalize,
  cosineSimilarity,
  projection,
  transpose,
  multiplyMatrices,
  applyMatrix,
  identity,
  determinant2x2,
  determinant3x3,
  gaussianElimination,
  rank,
  gramSchmidt,
  eigen2x2,
  svd2x2,
  matrixToLatex,
  vectorToLatex,
} from "./mathUtils";

const closeTo = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) < tol;
const vecCloseTo = (a: number[], b: number[], tol = 1e-6) =>
  a.length === b.length && a.every((x, i) => closeTo(x, b[i], tol));

describe("vector operations", () => {
  it("adds and subtracts vectors", () => {
    expect(addVectors([1, 2, 3], [4, 5, 6])).toEqual([5, 7, 9]);
    expect(subtractVectors([4, 5, 6], [1, 2, 3])).toEqual([3, 3, 3]);
  });

  it("throws on length mismatch", () => {
    expect(() => addVectors([1, 2], [1, 2, 3])).toThrow();
  });

  it("scales vectors", () => {
    expect(scaleVector([1, -2, 3], 2)).toEqual([2, -4, 6]);
  });

  it("computes dot product and norm", () => {
    expect(dot([1, 2, 3], [4, 5, 6])).toBe(32);
    expect(norm([3, 4])).toBe(5);
  });

  it("normalizes to unit length", () => {
    const u = normalize([3, 4]);
    expect(closeTo(norm(u), 1)).toBe(true);
    expect(vecCloseTo(u, [0.6, 0.8])).toBe(true);
  });

  it("throws when normalizing the zero vector", () => {
    expect(() => normalize([0, 0])).toThrow();
  });

  it("computes cosine similarity", () => {
    expect(closeTo(cosineSimilarity([1, 0], [0, 1]), 0)).toBe(true);
    expect(closeTo(cosineSimilarity([1, 1], [2, 2]), 1)).toBe(true);
    expect(closeTo(cosineSimilarity([1, 0], [-1, 0]), -1)).toBe(true);
  });

  it("projects one vector onto another", () => {
    // proj of (2,3) onto x-axis is (2,0)
    expect(vecCloseTo(projection([2, 3], [1, 0]), [2, 0])).toBe(true);
    // projecting onto a longer vector gives the same result as its direction
    expect(vecCloseTo(projection([2, 3], [5, 0]), [2, 0])).toBe(true);
  });
});

describe("matrix operations", () => {
  it("transposes", () => {
    expect(
      transpose([
        [1, 2, 3],
        [4, 5, 6],
      ]),
    ).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });

  it("multiplies matrices", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    expect(multiplyMatrices(a, b)).toEqual([
      [19, 22],
      [43, 50],
    ]);
  });

  it("throws on incompatible multiplication", () => {
    expect(() => multiplyMatrices([[1, 2, 3]], [[1, 2]])).toThrow();
  });

  it("applies a matrix to a vector", () => {
    expect(
      applyMatrix(
        [
          [1, 0],
          [0, 1],
        ],
        [3, 5],
      ),
    ).toEqual([3, 5]);
    expect(
      applyMatrix(
        [
          [0, -1],
          [1, 0],
        ],
        [1, 0],
      ),
    ).toEqual([0, 1]);
  });

  it("builds the identity matrix", () => {
    expect(identity(3)).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  it("computes determinants", () => {
    expect(
      determinant2x2([
        [1, 2],
        [3, 4],
      ]),
    ).toBe(-2);
    expect(
      determinant3x3([
        [6, 1, 1],
        [4, -2, 5],
        [2, 8, 7],
      ]),
    ).toBe(-306);
    expect(determinant3x3(identity(3))).toBe(1);
  });
});

describe("gaussian elimination and rank", () => {
  it("reduces a full-rank system to identity-like RREF", () => {
    const {
      rref,
      rank: r,
      pivotColumns,
    } = gaussianElimination([
      [2, 1, -1],
      [-3, -1, 2],
      [-2, 1, 2],
    ]);
    expect(r).toBe(3);
    expect(pivotColumns).toEqual([0, 1, 2]);
    // Diagonal should be 1s in RREF for an invertible matrix.
    expect(closeTo(rref[0][0], 1)).toBe(true);
    expect(closeTo(rref[1][1], 1)).toBe(true);
    expect(closeTo(rref[2][2], 1)).toBe(true);
  });

  it("detects rank deficiency", () => {
    // Row 3 = Row1 + Row2, so rank is 2.
    expect(
      rank([
        [1, 2, 3],
        [4, 5, 6],
        [5, 7, 9],
      ]),
    ).toBe(2);
  });

  it("records human-readable steps", () => {
    const { steps } = gaussianElimination([
      [0, 1],
      [1, 0],
    ]);
    expect(steps.length).toBeGreaterThan(1);
    expect(steps[0].description).toMatch(/Starting/);
  });
});

describe("gram-schmidt", () => {
  it("produces an orthonormal set", () => {
    const q = gramSchmidt([
      [1, 1, 0],
      [1, 0, 1],
    ]);
    expect(q.length).toBe(2);
    expect(closeTo(norm(q[0]), 1)).toBe(true);
    expect(closeTo(norm(q[1]), 1)).toBe(true);
    expect(closeTo(dot(q[0], q[1]), 0)).toBe(true);
  });

  it("drops linearly dependent vectors", () => {
    const q = gramSchmidt([
      [1, 0],
      [2, 0],
    ]);
    expect(q.length).toBe(1);
  });
});

describe("eigenvalues (2x2)", () => {
  it("finds eigenvalues of a diagonal matrix", () => {
    const e = eigen2x2([
      [3, 0],
      [0, 2],
    ]);
    expect(e.eigenvalues.sort((a, b) => b - a)).toEqual([3, 2]);
  });

  it("finds eigenvalues of a symmetric matrix", () => {
    const e = eigen2x2([
      [2, 1],
      [1, 2],
    ]);
    expect(e.eigenvalues.sort((a, b) => b - a)).toEqual([3, 1]);
    // eigenvectors should satisfy A v = λ v
    e.eigenvalues.forEach((lambda, i) => {
      const v = e.eigenvectors[i];
      const av = applyMatrix(
        [
          [2, 1],
          [1, 2],
        ],
        v,
      );
      expect(vecCloseTo(av, scaleVector(v, lambda), 1e-6)).toBe(true);
    });
  });

  it("flags complex eigenvalues for a rotation", () => {
    const e = eigen2x2([
      [0, -1],
      [1, 0],
    ]);
    expect(e.complex).toBe(true);
    expect(e.eigenvalues.length).toBe(0);
  });
});

describe("svd (2x2)", () => {
  const reconstructs = (A: number[][]) => {
    const { reconstruction } = svd2x2(A);
    return reconstruction.every((row, i) => vecCloseTo(row, A[i], 1e-5));
  };

  it("reconstructs a diagonal matrix", () => {
    const A = [
      [3, 0],
      [0, 2],
    ];
    const { singularValues } = svd2x2(A);
    expect(vecCloseTo(singularValues, [3, 2])).toBe(true);
    expect(reconstructs(A)).toBe(true);
  });

  it("reconstructs a general matrix", () => {
    expect(
      reconstructs([
        [2, 0],
        [0, -3],
      ]),
    ).toBe(true);
    expect(
      reconstructs([
        [1, 1],
        [0, 1],
      ]),
    ).toBe(true);
    expect(
      reconstructs([
        [4, 0],
        [3, -5],
      ]),
    ).toBe(true);
  });

  it("orders singular values descending and non-negative", () => {
    const { singularValues } = svd2x2([
      [1, 2],
      [3, 4],
    ]);
    expect(singularValues[0]).toBeGreaterThanOrEqual(singularValues[1]);
    expect(singularValues[1]).toBeGreaterThanOrEqual(0);
  });

  it("singular values squared match eigenvalues of AᵀA", () => {
    const A = [
      [2, 1],
      [1, 3],
    ];
    const { singularValues, ATA } = svd2x2(A);
    const eig = eigen2x2(ATA).eigenvalues.sort((a, b) => b - a);
    const sq = singularValues.map((s) => s * s).sort((a, b) => b - a);
    expect(vecCloseTo(sq, eig, 1e-5)).toBe(true);
  });
});

describe("latex formatting", () => {
  it("renders matrices and vectors", () => {
    expect(
      matrixToLatex([
        [1, 2],
        [3, 4],
      ]),
    ).toContain("\\begin{bmatrix}");
    expect(vectorToLatex([1, 2, 3])).toContain("1 \\\\ 2 \\\\ 3");
  });
});
