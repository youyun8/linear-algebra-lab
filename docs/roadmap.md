# Curriculum Roadmap

This roadmap shows the learning path, prerequisites, and the ML payoff for each
stage. The guiding principle: **intuition → definition → example → manual
calculation → interactive demo → ML connection → practice** on every page.

## Learning goals

By the end, a student who started from zero can:

1. Understand vectors, matrices, linear transformations, eigenvalues, eigenvectors,
   and orthogonality.
2. Compute a small (2×2) SVD manually, step by step.
3. Explain how linear algebra powers PCA, embeddings, attention, transformers,
   low-rank approximation, LoRA, recommendation systems, and model compression.

## Prerequisites

- Comfortable with high-school algebra (solving equations, substitution).
- No prior linear algebra, no proof experience required.
- Curiosity about machine learning and GPUs helps but is not needed.

## The ladder

```
Vectors ─▶ Matrices ─▶ Linear Systems ─▶ Subspaces ─▶ Orthogonality
                                                            │
                                                            ▼
        Modern ML ◀── SVD ◀── Eigenvalues & Eigenvectors ──┘
```

| #   | Section          | Prereqs | Core ideas                                                     | ML payoff                       |
| --- | ---------------- | ------- | -------------------------------------------------------------- | ------------------------------- |
| 1   | Start Here       | none    | Why LA for ML; roadmap; diagnostic                             | Orientation                     |
| 2   | Vectors          | 1       | Coordinates, dot product, norm, cosine, projection             | Embeddings, similarity search   |
| 3   | Matrices         | 2       | Data table vs. transformation; multiplication; determinant     | Neural-net layers               |
| 4   | Linear Systems   | 3       | Gaussian elimination, rank, pivots, free variables             | Well-posed problems             |
| 5   | Subspaces        | 4       | Span, basis, dimension, four subspaces, rank–nullity           | Effective dimension             |
| 6   | Orthogonality    | 2, 5    | Projection, least squares, Gram–Schmidt                        | Linear regression               |
| 7   | Eigenvalues      | 3, 6    | Characteristic polynomial, diagonalization, symmetric matrices | PCA                             |
| 8   | SVD              | 7       | `A = UΣVᵀ`, manual 2×2, low-rank approximation                 | Compression, recommenders, LoRA |
| 9   | LA for Modern ML | 2–8     | Embeddings, attention, transformers, normalization, GEMM       | Putting it together             |
| 10  | Practice Lab     | any     | Quizzes, flashcards, drills                                    | Retention                       |
| 11  | Cheat Sheets     | any     | One-page summaries                                             | Reference                       |

## Suggested pacing

A comfortable pace for a semester or self-study:

- **Week 1–2:** Sections 1–3 (vectors and matrices). Play with the vector and
  transformation demos daily.
- **Week 3–4:** Sections 4–5 (systems and subspaces). Do the Gaussian elimination
  stepper drills.
- **Week 5–6:** Section 6 (orthogonality) + start Section 7 (eigenvalues).
- **Week 7–8:** Finish Section 7, then Section 8 (SVD). Compute several 2×2 SVDs by
  hand and verify with the calculator.
- **Week 9:** Section 9 (LA for ML). Revisit earlier demos with ML eyes.
- **Ongoing:** Practice Lab weekly; keep the Cheat Sheets nearby.

## Depth vs. rigor

We favor visual intuition and concrete numbers over formal proofs. Where a proof
would help (e.g. why `u_i = Av_i/σ_i`), we give a short justification in a hint
rather than a full theorem–proof block. Students who want rigor can follow the same
sequence in a formal textbook; the mental models here transfer directly.

## Extending the roadmap

Natural follow-ups beyond this course: QR decomposition and numerical stability,
the pseudoinverse, positive-definite matrices and quadratic forms, matrix calculus
for backprop, and iterative solvers. See `CONTRIBUTING.md` to propose a new section.
