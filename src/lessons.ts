/**
 * Central manifest of all lessons/sections. Used to build the sidebar, the
 * "next / previous" page navigation, and the home page grid — so adding a new
 * lesson is a one-line change here plus a route.
 */
export interface LessonMeta {
  slug: string;
  num: number;
  title: string;
  short: string;
  description: string;
  group: "Foundations" | "Core Theory" | "Decompositions" | "Applications" | "Practice";
}

export const LESSONS: LessonMeta[] = [
  {
    slug: "start-here",
    num: 1,
    title: "Start Here",
    short: "Start Here",
    description: "Why linear algebra matters for ML, a roadmap, and a diagnostic quiz.",
    group: "Foundations",
  },
  {
    slug: "vectors",
    num: 2,
    title: "Vectors",
    short: "Vectors",
    description:
      "Coordinates, magnitude, direction, dot product, cosine similarity, projection.",
    group: "Foundations",
  },
  {
    slug: "matrices",
    num: 3,
    title: "Matrices",
    short: "Matrices",
    description: "Matrices as data and as linear transformations; matrix multiplication.",
    group: "Foundations",
  },
  {
    slug: "systems",
    num: 4,
    title: "Systems of Linear Equations",
    short: "Linear Systems",
    description: "Gaussian elimination, row reduction, rank, pivots, and free variables.",
    group: "Core Theory",
  },
  {
    slug: "subspaces",
    num: 5,
    title: "Subspaces",
    short: "Subspaces",
    description: "Span, basis, dimension, the four fundamental subspaces, rank–nullity.",
    group: "Core Theory",
  },
  {
    slug: "orthogonality",
    num: 6,
    title: "Orthogonality",
    short: "Orthogonality",
    description: "Orthogonal vectors, projection, least squares, Gram–Schmidt.",
    group: "Core Theory",
  },
  {
    slug: "eigen",
    num: 7,
    title: "Eigenvalues & Eigenvectors",
    short: "Eigenvalues",
    description: "Geometric intuition, characteristic polynomial, diagonalization, PCA.",
    group: "Decompositions",
  },
  {
    slug: "svd",
    num: 8,
    title: "Singular Value Decomposition",
    short: "SVD",
    description:
      "SVD from scratch, manual 2×2 computation, low-rank approximation, LoRA.",
    group: "Decompositions",
  },
  {
    slug: "ml",
    num: 9,
    title: "Linear Algebra for Modern ML",
    short: "LA for ML",
    description:
      "Embeddings, attention, transformers, normalization, gradient descent, GEMM.",
    group: "Applications",
  },
  {
    slug: "practice",
    num: 10,
    title: "Practice Lab",
    short: "Practice Lab",
    description: "Quizzes, flashcards, and calculation drills with worked answers.",
    group: "Practice",
  },
  {
    slug: "cheatsheets",
    num: 11,
    title: "Cheat Sheets",
    short: "Cheat Sheets",
    description:
      "One-page summaries for vectors, matrices, projections, eigenvalues, SVD.",
    group: "Practice",
  },
];

export function lessonBySlug(slug: string): LessonMeta | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function adjacentLessons(slug: string): {
  prev?: LessonMeta;
  next?: LessonMeta;
} {
  const idx = LESSONS.findIndex((l) => l.slug === slug);
  return {
    prev: idx > 0 ? LESSONS[idx - 1] : undefined,
    next: idx >= 0 && idx < LESSONS.length - 1 ? LESSONS[idx + 1] : undefined,
  };
}
