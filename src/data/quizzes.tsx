import type { QuizQuestion } from "../components/Quiz";
import { Eq } from "../components/Equation";

/**
 * Shared quiz bank. Each topic has a small set of questions used both on its
 * lesson page (concept check) and aggregated in the Practice Lab. Explanations
 * describe WHY an answer is right, not just which letter.
 */

export const diagnosticQuiz: QuizQuestion[] = [
  {
    id: "diag-1",
    question: (
      <>
        If <Eq>{"a = (1, 2)"}</Eq> and <Eq>{"b = (3, 4)"}</Eq>, what is{" "}
        <Eq>{"a \\cdot b"}</Eq>?
      </>
    ),
    options: ["7", "11", "(3, 8)", "25"],
    correct: 1,
    explanation: (
      <>
        Dot product multiplies matching components and sums:{" "}
        <Eq>{"1\\cdot3 + 2\\cdot4 = 3 + 8 = 11"}</Eq>. It is a single number, not a
        vector.
      </>
    ),
  },
  {
    id: "diag-2",
    question: (
      <>
        What is the magnitude (length) of <Eq>{"(3, 4)"}</Eq>?
      </>
    ),
    options: ["7", "12", "5", "25"],
    correct: 2,
    explanation: (
      <>
        Length is <Eq>{"\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5"}</Eq>. This is just the
        Pythagorean theorem.
      </>
    ),
  },
  {
    id: "diag-3",
    question: <>A matrix that leaves every vector unchanged is called the…</>,
    options: ["zero matrix", "identity matrix", "diagonal matrix", "inverse matrix"],
    correct: 1,
    explanation: (
      <>
        The identity matrix <Eq>{"I"}</Eq> has 1s on the diagonal and 0s elsewhere, so{" "}
        <Eq>{"Iv = v"}</Eq> for every <Eq>{"v"}</Eq>.
      </>
    ),
  },
  {
    id: "diag-4",
    question: (
      <>
        Roughly, what does an eigenvector of <Eq>{"A"}</Eq> represent?
      </>
    ),
    options: [
      "A vector that A sends to zero",
      "A direction A only stretches or shrinks (no turning)",
      "The largest column of A",
      "A vector with length 1",
    ],
    correct: 1,
    explanation: (
      <>
        An eigenvector keeps its direction under <Eq>{"A"}</Eq>:{" "}
        <Eq>{"Av = \\lambda v"}</Eq>. It may be stretched or flipped, but not rotated off
        its line.
      </>
    ),
  },
  {
    id: "diag-5",
    question: (
      <>In machine learning, comparing two embeddings for similarity most often uses…</>
    ),
    options: ["the determinant", "cosine similarity", "matrix rank", "the trace"],
    correct: 1,
    explanation: (
      <>
        Cosine similarity measures the angle between embedding vectors, ignoring their
        length — a direct application of the dot product.
      </>
    ),
  },
];

export const vectorsQuiz: QuizQuestion[] = [
  {
    id: "vec-1",
    question: (
      <>Two nonzero vectors are perpendicular exactly when their dot product is…</>
    ),
    options: ["1", "0", "negative", "equal to their lengths"],
    correct: 1,
    explanation: (
      <>
        <Eq>{"a\\cdot b = \\|a\\|\\|b\\|\\cos\\theta"}</Eq>. Perpendicular means{" "}
        <Eq>{"\\theta = 90^\\circ"}</Eq>, and <Eq>{"\\cos 90^\\circ = 0"}</Eq>, so the dot
        product is 0.
      </>
    ),
  },
  {
    id: "vec-2",
    question: (
      <>
        Cosine similarity of <Eq>{"(2,0)"}</Eq> and <Eq>{"(5,0)"}</Eq> is…
      </>
    ),
    options: ["0", "0.5", "1", "10"],
    correct: 2,
    explanation: (
      <>
        They point the same direction, so <Eq>{"\\cos\\theta = 1"}</Eq>. Cosine similarity
        ignores magnitude — only direction matters.
      </>
    ),
  },
  {
    id: "vec-3",
    question: (
      <>
        The projection of <Eq>{"(0,5)"}</Eq> onto the x-axis direction <Eq>{"(1,0)"}</Eq>{" "}
        is…
      </>
    ),
    options: [<>{"(0,0)"}</>, <>{"(5,0)"}</>, <>{"(0,5)"}</>, <>{"(1,0)"}</>],
    correct: 0,
    explanation: (
      <>
        The vector is perpendicular to the x-axis, so it casts no shadow on it: the
        projection is the zero vector.
      </>
    ),
  },
];

export const matricesQuiz: QuizQuestion[] = [
  {
    id: "mat-1",
    question: (
      <>
        To multiply <Eq>{"A"}</Eq> (2×3) by <Eq>{"B"}</Eq> (3×4), the result has shape…
      </>
    ),
    options: ["3×3", "2×4", "2×3", "undefined"],
    correct: 1,
    explanation: (
      <>
        Inner dimensions (3 and 3) match, so it's defined. The result takes the outer
        dimensions: 2×4.
      </>
    ),
  },
  {
    id: "mat-2",
    question: (
      <>
        The columns of a transformation matrix <Eq>{"A"}</Eq> tell you…
      </>
    ),
    options: [
      "the eigenvalues",
      "where the basis vectors î and ĵ land",
      "the determinant",
      "the inverse",
    ],
    correct: 1,
    explanation: (
      <>
        Column 1 is <Eq>{"A\\hat{i}"}</Eq> and column 2 is <Eq>{"A\\hat{j}"}</Eq>. Knowing
        where the basis lands defines the whole linear map.
      </>
    ),
  },
  {
    id: "mat-3",
    question: (
      <>
        If <Eq>{"\\det A = 0"}</Eq>, the transformation…
      </>
    ),
    options: [
      "preserves area",
      "collapses space onto a lower dimension",
      "is a pure rotation",
      "is the identity",
    ],
    correct: 1,
    explanation: (
      <>
        A zero determinant means area is scaled by 0 — the plane is squashed onto a line
        or point, and <Eq>{"A"}</Eq> is not invertible.
      </>
    ),
  },
];

export const systemsQuiz: QuizQuestion[] = [
  {
    id: "sys-1",
    question: <>In row echelon form, a "pivot" is…</>,
    options: [
      "any zero entry",
      "the leading nonzero entry of a row",
      "the last column",
      "a row of zeros",
    ],
    correct: 1,
    explanation: (
      <>
        A pivot is the first nonzero entry in a row after elimination. The number of
        pivots equals the rank.
      </>
    ),
  },
  {
    id: "sys-2",
    question: <>A column without a pivot corresponds to a…</>,
    options: ["free variable", "pivot variable", "contradiction", "zero row"],
    correct: 0,
    explanation: (
      <>
        Non-pivot columns are free variables — you can choose their values freely, giving
        infinitely many solutions.
      </>
    ),
  },
  {
    id: "sys-3",
    question: <>A system is inconsistent (no solution) when row reduction produces…</>,
    options: [
      "a free variable",
      "a row like [0 0 0 | 5]",
      "a pivot in every column",
      "a zero row",
    ],
    correct: 1,
    explanation: (
      <>
        The row <Eq>{"[0\\ 0\\ 0\\mid 5]"}</Eq> says <Eq>{"0 = 5"}</Eq>, which is
        impossible — so there is no solution.
      </>
    ),
  },
];

export const subspacesQuiz: QuizQuestion[] = [
  {
    id: "sub-1",
    question: <>A basis of a subspace is a set of vectors that is…</>,
    options: [
      "linearly dependent and spanning",
      "linearly independent and spanning",
      "orthogonal only",
      "all unit vectors",
    ],
    correct: 1,
    explanation: (
      <>
        A basis must span the space (reach every vector) and be independent (no
        redundancy). Its size is the dimension.
      </>
    ),
  },
  {
    id: "sub-2",
    question: (
      <>
        For an <Eq>{"m\\times n"}</Eq> matrix, rank–nullity says…
      </>
    ),
    options: [
      <>{"rank + nullity = m"}</>,
      <>{"rank + nullity = n"}</>,
      <>{"rank = nullity"}</>,
      <>{"rank \\times nullity = n"}</>,
    ],
    correct: 1,
    explanation: (
      <>
        <Eq>{"\\text{rank} + \\text{nullity} = n"}</Eq>, the number of columns: every
        column is either a pivot (rank) or free (nullity).
      </>
    ),
  },
  {
    id: "sub-3",
    question: (
      <>
        The null space of <Eq>{"A"}</Eq> is the set of all <Eq>{"x"}</Eq> with…
      </>
    ),
    options: [<>{"Ax = x"}</>, <>{"Ax = b"}</>, <>{"Ax = 0"}</>, <>{"x = 0"}</>],
    correct: 2,
    explanation: (
      <>
        The null space collects every vector the matrix sends to zero: <Eq>{"Ax = 0"}</Eq>
        .
      </>
    ),
  },
];

export const orthogonalityQuiz: QuizQuestion[] = [
  {
    id: "ort-1",
    question: (
      <>
        Least squares finds <Eq>{"\\hat{x}"}</Eq> minimizing <Eq>{"\\|Ax - b\\|"}</Eq> by
        solving…
      </>
    ),
    options: [
      <>{"Ax = b"}</>,
      <>{"A^{\\mathsf T}A\\hat{x} = A^{\\mathsf T}b"}</>,
      <>{"A\\hat{x} = 0"}</>,
      <>{"A^{\\mathsf T}x = b"}</>,
    ],
    correct: 1,
    explanation: (
      <>
        The normal equations <Eq>{"A^{\\mathsf T}A\\hat{x} = A^{\\mathsf T}b"}</Eq>{" "}
        project <Eq>{"b"}</Eq> onto the column space of <Eq>{"A"}</Eq>, giving the closest
        fit.
      </>
    ),
  },
  {
    id: "ort-2",
    question: <>Gram–Schmidt turns a basis into…</>,
    options: [
      "a bigger basis",
      "an orthonormal basis for the same space",
      "the eigenvectors",
      "a diagonal matrix",
    ],
    correct: 1,
    explanation: (
      <>
        Gram–Schmidt subtracts off projections to make vectors mutually perpendicular,
        then normalizes — same span, orthonormal vectors.
      </>
    ),
  },
];

export const eigenQuiz: QuizQuestion[] = [
  {
    id: "eig-1",
    question: (
      <>
        Eigenvalues of <Eq>{"A"}</Eq> solve which equation?
      </>
    ),
    options: [
      <>{"\\det(A) = 0"}</>,
      <>{"\\det(A - \\lambda I) = 0"}</>,
      <>{"A\\lambda = I"}</>,
      <>{"\\text{tr}(A) = \\lambda"}</>,
    ],
    correct: 1,
    explanation: (
      <>
        The characteristic equation <Eq>{"\\det(A - \\lambda I) = 0"}</Eq> yields the
        eigenvalues; for 2×2 it becomes{" "}
        <Eq>{"\\lambda^2 - (\\text{tr})\\lambda + \\det = 0"}</Eq>.
      </>
    ),
  },
  {
    id: "eig-2",
    question: <>Symmetric matrices always have…</>,
    options: [
      "complex eigenvalues",
      "real eigenvalues and orthogonal eigenvectors",
      "determinant 1",
      "no eigenvectors",
    ],
    correct: 1,
    explanation: (
      <>
        The spectral theorem guarantees a real symmetric matrix has real eigenvalues and
        an orthonormal eigenbasis — the foundation of PCA.
      </>
    ),
  },
  {
    id: "eig-3",
    question: <>PCA finds directions of maximum variance using the eigenvectors of…</>,
    options: [
      "the data matrix itself",
      "the covariance matrix",
      "the identity matrix",
      "a rotation matrix",
    ],
    correct: 1,
    explanation: (
      <>
        PCA diagonalizes the (symmetric) covariance matrix; its top eigenvectors are the
        principal components and eigenvalues give the variance explained.
      </>
    ),
  },
];

export const svdQuiz: QuizQuestion[] = [
  {
    id: "svd-1",
    question: (
      <>
        In <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq>, the singular values on the diagonal
        of <Eq>{"\\Sigma"}</Eq> are…
      </>
    ),
    options: [
      "the eigenvalues of A",
      "the square roots of the eigenvalues of AᵀA",
      "always 1",
      "the diagonal of A",
    ],
    correct: 1,
    explanation: (
      <>
        Singular values are <Eq>{"\\sigma_i = \\sqrt{\\lambda_i}"}</Eq> where{" "}
        <Eq>{"\\lambda_i"}</Eq> are eigenvalues of <Eq>{"A^{\\mathsf T}A"}</Eq> (always ≥
        0).
      </>
    ),
  },
  {
    id: "svd-2",
    question: <>Geometrically, every matrix acts as…</>,
    options: [
      "rotation only",
      "rotation/reflection, then scaling, then rotation/reflection",
      "scaling only",
      "a random shuffle",
    ],
    correct: 1,
    explanation: (
      <>
        SVD says any <Eq>{"A"}</Eq> = (orthogonal <Eq>{"V^{\\mathsf T}"}</Eq>) → (scale by{" "}
        <Eq>{"\\Sigma"}</Eq>) → (orthogonal <Eq>{"U"}</Eq>). Rotate/reflect, stretch,
        rotate/reflect.
      </>
    ),
  },
  {
    id: "svd-3",
    question: (
      <>
        A best rank-1 approximation of <Eq>{"A"}</Eq> keeps…
      </>
    ),
    options: [
      "the smallest singular value",
      "the largest singular value and its vectors",
      "all singular values",
      "the determinant",
    ],
    correct: 1,
    explanation: (
      <>
        Keeping the largest <Eq>{"\\sigma_1 u_1 v_1^{\\mathsf T}"}</Eq> gives the closest
        rank-1 matrix (Eckart–Young). This is the basis of compression, PCA, and LoRA.
      </>
    ),
  },
];

export const mlQuiz: QuizQuestion[] = [
  {
    id: "ml-1",
    question: <>A fully-connected neural network layer computes…</>,
    options: [
      <>
        <Eq>{"Wx + b"}</Eq>, a matrix–vector product then a nonlinearity
      </>,
      "only a dot product",
      "an eigen-decomposition",
      "a determinant",
    ],
    correct: 0,
    explanation: (
      <>
        Each layer is an affine map <Eq>{"Wx + b"}</Eq> (matrix multiply plus bias)
        followed by an activation. Deep nets stack these.
      </>
    ),
  },
  {
    id: "ml-2",
    question: <>In attention, the scores matrix comes from…</>,
    options: [
      <>{"QK^{\\mathsf T}"}</>,
      <>{"Q + K"}</>,
      "the determinant of Q",
      "the inverse of V",
    ],
    correct: 0,
    explanation: (
      <>
        Attention scores are dot products between queries and keys:{" "}
        <Eq>{"QK^{\\mathsf T}"}</Eq>, scaled and softmaxed, then used to combine values{" "}
        <Eq>{"V"}</Eq>.
      </>
    ),
  },
  {
    id: "ml-3",
    question: <>LoRA makes fine-tuning cheap by representing a weight update as…</>,
    options: [
      "a full dense matrix",
      "a low-rank product BA with tiny inner dimension",
      "a diagonal matrix",
      "the identity",
    ],
    correct: 1,
    explanation: (
      <>
        LoRA writes <Eq>{"\\Delta W = BA"}</Eq> where <Eq>{"B"}</Eq> and <Eq>{"A"}</Eq>{" "}
        are skinny — few parameters — exploiting that useful updates are approximately low
        rank.
      </>
    ),
  },
];
