import type { ReactNode } from "react";
import type { SolutionStep } from "../components/StepSolution";
import { Eq, Equation } from "../components/Equation";

/**
 * Pencil-and-paper exercise bank. Each drill is meant to be attempted by hand
 * first; the StepSolution renders in reveal mode so answers stay hidden until
 * the student is ready. Grouped by topic so the Practice Lab can filter them.
 */
export interface Drill {
  id: string;
  title: string;
  prompt: ReactNode;
  hint?: ReactNode;
  steps: SolutionStep[];
}

export interface DrillTopic {
  label: string;
  drills: Drill[];
}

const vectors: Drill[] = [
  {
    id: "v1",
    title: "Dot product, length, and angle",
    prompt: (
      <>
        For <Eq>{"a = (3, 4)"}</Eq> and <Eq>{"b = (4, 3)"}</Eq>, compute{" "}
        <Eq>{"a\\cdot b"}</Eq>, <Eq>{"\\|a\\|"}</Eq>, <Eq>{"\\|b\\|"}</Eq>, and{" "}
        <Eq>{"\\cos\\theta"}</Eq>.
      </>
    ),
    hint: <>Length is the square root of the sum of squares; cosθ = (a·b)/(‖a‖‖b‖).</>,
    steps: [
      { content: <Equation>{"a\\cdot b = 3\\cdot4 + 4\\cdot3 = 24"}</Equation> },
      {
        content: (
          <Equation>
            {"\\|a\\| = \\sqrt{9+16} = 5,\\quad \\|b\\| = \\sqrt{16+9} = 5"}
          </Equation>
        ),
      },
      { content: <Equation>{"\\cos\\theta = \\dfrac{24}{5\\cdot5} = 0.96"}</Equation> },
    ],
  },
  {
    id: "v2",
    title: "Orthogonality check",
    prompt: (
      <>
        Are <Eq>{"a = (1, 2)"}</Eq> and <Eq>{"b = (2, -1)"}</Eq> perpendicular?
      </>
    ),
    hint: <>Perpendicular vectors have a dot product of exactly 0.</>,
    steps: [
      { content: <Equation>{"a\\cdot b = 1\\cdot2 + 2\\cdot(-1) = 0"}</Equation> },
      {
        content: (
          <>
            The dot product is 0, so <Eq>{"\\theta = 90^\\circ"}</Eq> — the vectors are
            orthogonal.
          </>
        ),
      },
    ],
  },
  {
    id: "v3",
    title: "Normalize to a unit vector",
    prompt: (
      <>
        Find the unit vector in the direction of <Eq>{"v = (6, 8)"}</Eq>.
      </>
    ),
    hint: <>Divide the vector by its own length.</>,
    steps: [
      { content: <Equation>{"\\|v\\| = \\sqrt{36+64} = \\sqrt{100} = 10"}</Equation> },
      {
        content: <Equation>{"\\hat v = \\dfrac{1}{10}(6, 8) = (0.6,\\ 0.8)"}</Equation>,
      },
    ],
  },
  {
    id: "v4",
    title: "Projection onto a vector",
    prompt: (
      <>
        Project <Eq>{"a = (2, 3)"}</Eq> onto <Eq>{"b = (1, 1)"}</Eq>.
      </>
    ),
    hint: (
      <>
        Use <Eq>{"\\operatorname{proj}_b a = \\dfrac{a\\cdot b}{b\\cdot b}\\,b"}</Eq>.
      </>
    ),
    steps: [
      {
        content: (
          <Equation>{"a\\cdot b = 2 + 3 = 5,\\quad b\\cdot b = 1 + 1 = 2"}</Equation>
        ),
      },
      {
        content: (
          <Equation>
            {"\\operatorname{proj}_b a = \\tfrac{5}{2}(1,1) = (2.5,\\ 2.5)"}
          </Equation>
        ),
      },
    ],
  },
  {
    id: "v5",
    title: "Cosine similarity in 3D",
    prompt: (
      <>
        Cosine similarity of <Eq>{"a = (1, 1, 0)"}</Eq> and <Eq>{"b = (0, 1, 1)"}</Eq>?
      </>
    ),
    steps: [
      { content: <Equation>{"a\\cdot b = 0 + 1 + 0 = 1"}</Equation> },
      { content: <Equation>{"\\|a\\| = \\|b\\| = \\sqrt{2}"}</Equation> },
      {
        content: (
          <>
            <Equation>
              {"\\cos\\theta = \\dfrac{1}{\\sqrt2\\cdot\\sqrt2} = \\tfrac12"}
            </Equation>
            so <Eq>{"\\theta = 60^\\circ"}</Eq>.
          </>
        ),
      },
    ],
  },
  {
    id: "v6",
    title: "Linear combination",
    prompt: (
      <>
        Compute <Eq>{"2(1, -1) + 3(0, 2)"}</Eq>.
      </>
    ),
    steps: [
      { content: <Equation>{"2(1,-1) = (2,-2),\\quad 3(0,2) = (0,6)"}</Equation> },
      { content: <Equation>{"(2,-2) + (0,6) = (2,\\ 4)"}</Equation> },
    ],
  },
  {
    id: "v7",
    title: "Distance between two points",
    prompt: (
      <>
        Distance from <Eq>{"p = (1, 2)"}</Eq> to <Eq>{"q = (4, 6)"}</Eq>?
      </>
    ),
    hint: <>Distance is the length of the difference vector q − p.</>,
    steps: [
      { content: <Equation>{"q - p = (3,\\ 4)"}</Equation> },
      { content: <Equation>{"\\|q - p\\| = \\sqrt{9 + 16} = 5"}</Equation> },
    ],
  },
];

const matrices: Drill[] = [
  {
    id: "m1",
    title: "Matrix–vector product",
    prompt: (
      <>
        Compute <Eq>{"Ax"}</Eq> for{" "}
        <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}"}</Eq>,{" "}
        <Eq>{"x = (1, 1)"}</Eq>.
      </>
    ),
    hint: <>Each output entry is a row of A dotted with x.</>,
    steps: [
      { content: <Equation>{"\\text{row 1}: 1\\cdot1 + 2\\cdot1 = 3"}</Equation> },
      { content: <Equation>{"\\text{row 2}: 3\\cdot1 + 4\\cdot1 = 7"}</Equation> },
      { content: <Equation>{"Ax = (3,\\ 7)"}</Equation> },
    ],
  },
  {
    id: "m2",
    title: "2×2 matrix multiplication",
    prompt: (
      <>
        Compute <Eq>{"AB"}</Eq> for{" "}
        <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}"}</Eq>,{" "}
        <Eq>{"B = \\begin{bmatrix} 1 & 0 \\\\ 3 & 1 \\end{bmatrix}"}</Eq>.
      </>
    ),
    hint: <>Entry (i, j) is row i of A dotted with column j of B.</>,
    steps: [
      {
        content: (
          <Equation>
            {"\\text{row 1}: [1\\cdot1 + 2\\cdot3,\\ 1\\cdot0 + 2\\cdot1] = [7,\\ 2]"}
          </Equation>
        ),
      },
      {
        content: (
          <Equation>
            {"\\text{row 2}: [0\\cdot1 + 1\\cdot3,\\ 0\\cdot0 + 1\\cdot1] = [3,\\ 1]"}
          </Equation>
        ),
      },
      {
        content: (
          <Equation>{"AB = \\begin{bmatrix} 7 & 2 \\\\ 3 & 1 \\end{bmatrix}"}</Equation>
        ),
      },
    ],
  },
  {
    id: "m3",
    title: "Determinant & invertibility",
    prompt: (
      <>
        Is <Eq>{"A = \\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}"}</Eq> invertible?
      </>
    ),
    steps: [
      { content: <Equation>{"\\det A = 2\\cdot2 - 4\\cdot1 = 0"}</Equation> },
      {
        content: (
          <>
            det = 0, so <strong>not invertible</strong>. Row 2 is half of row 1 — the
            columns are collinear (rank 1).
          </>
        ),
      },
    ],
  },
  {
    id: "m4",
    title: "Inverse of a 2×2",
    prompt: (
      <>
        Find <Eq>{"A^{-1}"}</Eq> for{" "}
        <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}"}</Eq>.
      </>
    ),
    hint: (
      <>
        <Eq>
          {
            "\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}^{-1} = \\tfrac1{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}"
          }
        </Eq>
      </>
    ),
    steps: [
      { content: <Equation>{"\\det A = 2\\cdot1 - 1\\cdot1 = 1"}</Equation> },
      {
        content: (
          <Equation>
            {
              "A^{-1} = \\tfrac11\\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix} = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}"
            }
          </Equation>
        ),
      },
    ],
  },
  {
    id: "m5",
    title: "Trace and determinant",
    prompt: (
      <>
        Find the trace and determinant of{" "}
        <Eq>{"A = \\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}"}</Eq>.
      </>
    ),
    steps: [
      { content: <Equation>{"\\operatorname{tr}A = 3 + 4 = 7"}</Equation> },
      { content: <Equation>{"\\det A = 3\\cdot4 - 1\\cdot2 = 10"}</Equation> },
    ],
  },
  {
    id: "m6",
    title: "Apply a rotation matrix",
    prompt: (
      <>
        Where does the 90° rotation{" "}
        <Eq>{"R = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}"}</Eq> send{" "}
        <Eq>{"(1, 0)"}</Eq>?
      </>
    ),
    hint: <>The columns of R show where î and ĵ land.</>,
    steps: [
      {
        content: (
          <Equation>
            {"R\\,(1,0) = (0\\cdot1 - 1\\cdot0,\\ 1\\cdot1 + 0\\cdot0) = (0,\\ 1)"}
          </Equation>
        ),
      },
      { content: <>The x-axis vector rotates a quarter turn onto the y-axis.</> },
    ],
  },
  {
    id: "m7",
    title: "Is the matrix symmetric?",
    prompt: (
      <>
        Is <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 3 \\end{bmatrix}"}</Eq> symmetric?
      </>
    ),
    hint: (
      <>
        Symmetric means <Eq>{"A = A^{\\mathsf T}"}</Eq> — mirror across the diagonal.
      </>
    ),
    steps: [
      {
        content: (
          <>
            The off-diagonal entries match (<Eq>{"a_{12} = a_{21} = 2"}</Eq>), so{" "}
            <Eq>{"A = A^{\\mathsf T}"}</Eq> — yes, symmetric.
          </>
        ),
      },
    ],
  },
];

const systems: Drill[] = [
  {
    id: "s1",
    title: "Solve a 2×2 system",
    prompt: (
      <>
        Solve <Eq>{"x + y = 5"}</Eq>, <Eq>{"x - y = 1"}</Eq>.
      </>
    ),
    hint: <>Add the two equations to eliminate y.</>,
    steps: [
      { content: <Equation>{"(x+y) + (x-y) = 5 + 1 \\Rightarrow 2x = 6"}</Equation> },
      { content: <Equation>{"x = 3,\\quad y = 5 - 3 = 2"}</Equation> },
    ],
  },
  {
    id: "s2",
    title: "Row reduction & back-substitution",
    prompt: (
      <>
        Solve <Eq>{"x + 2y = 3"}</Eq>, <Eq>{"2x + 5y = 8"}</Eq> by elimination.
      </>
    ),
    hint: <>Subtract 2×(row 1) from row 2.</>,
    steps: [
      {
        content: (
          <Equation>{"R_2 - 2R_1:\\quad (5-4)y = 8-6 \\Rightarrow y = 2"}</Equation>
        ),
      },
      { content: <Equation>{"x = 3 - 2(2) = -1"}</Equation> },
      { content: <Equation>{"(x, y) = (-1,\\ 2)"}</Equation> },
    ],
  },
  {
    id: "s3",
    title: "Rank from pivots",
    prompt: (
      <>
        What is the rank of{" "}
        <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}"}</Eq>?
      </>
    ),
    steps: [
      { content: <Equation>{"R_2 - 2R_1 = [0\\ \\ 0]"}</Equation> },
      { content: <>Only one nonzero row (one pivot), so the rank is 1.</> },
    ],
  },
  {
    id: "s4",
    title: "Detect an inconsistent system",
    prompt: (
      <>
        Solve <Eq>{"x + y = 2"}</Eq>, <Eq>{"2x + 2y = 5"}</Eq>.
      </>
    ),
    hint: <>What happens to the left side if you halve the second equation?</>,
    steps: [
      { content: <Equation>{"R_2 - 2R_1:\\quad 0 = 5 - 4 = 1"}</Equation> },
      {
        content: (
          <>
            The row <Eq>{"[0\\ 0\\mid 1]"}</Eq> says <Eq>{"0 = 1"}</Eq> — impossible. The
            system has <strong>no solution</strong>.
          </>
        ),
      },
    ],
  },
  {
    id: "s5",
    title: "Count free variables",
    prompt: (
      <>
        For <Eq>{"x + y + z = 0"}</Eq> (one equation, three unknowns), how many free
        variables are there, and what is the dimension of the solution set?
      </>
    ),
    steps: [
      { content: <>One pivot (say x), leaving y and z free → 2 free variables.</> },
      {
        content: (
          <>
            The solution set is a plane through the origin, dimension{" "}
            <Eq>{"3 - 1 = 2"}</Eq>.
          </>
        ),
      },
    ],
  },
  {
    id: "s6",
    title: "Infinitely many solutions",
    prompt: (
      <>
        Solve <Eq>{"x + 2y = 3"}</Eq>, <Eq>{"2x + 4y = 6"}</Eq>.
      </>
    ),
    hint: <>Are the two equations really different?</>,
    steps: [
      { content: <>Row 2 is exactly 2×(row 1), so it adds no new information.</> },
      {
        content: (
          <>
            y is free; <Eq>{"x = 3 - 2y"}</Eq>. Infinitely many solutions along a line.
          </>
        ),
      },
    ],
  },
];

const subspaces: Drill[] = [
  {
    id: "u1",
    title: "Rank–nullity",
    prompt: (
      <>
        A <Eq>{"3\\times 4"}</Eq> matrix has rank 2. What is its nullity?
      </>
    ),
    hint: (
      <>
        <Eq>{"\\text{rank} + \\text{nullity} = n"}</Eq>, the number of columns.
      </>
    ),
    steps: [{ content: <Equation>{"\\text{nullity} = 4 - 2 = 2"}</Equation> }],
  },
  {
    id: "u2",
    title: "Membership in a span",
    prompt: (
      <>
        Is <Eq>{"(2, 4)"}</Eq> in <Eq>{"\\operatorname{span}\\{(1, 2)\\}"}</Eq>?
      </>
    ),
    steps: [
      { content: <Equation>{"(2, 4) = 2\\,(1, 2)"}</Equation> },
      { content: <>Yes — it is a scalar multiple, so it lies on the same line.</> },
    ],
  },
  {
    id: "u3",
    title: "Linear independence",
    prompt: (
      <>
        Are <Eq>{"(1, 0)"}</Eq> and <Eq>{"(1, 1)"}</Eq> linearly independent?
      </>
    ),
    hint: <>Two 2D vectors are independent iff the determinant they form is nonzero.</>,
    steps: [
      {
        content: (
          <Equation>
            {"\\det\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix} = 1 \\ne 0"}
          </Equation>
        ),
      },
      { content: <>Nonzero determinant → independent (they span the whole plane).</> },
    ],
  },
  {
    id: "u4",
    title: "Null space of a row vector",
    prompt: (
      <>
        Describe the null space of <Eq>{"A = \\begin{bmatrix} 1 & 1 \\end{bmatrix}"}</Eq>.
      </>
    ),
    hint: (
      <>
        Solve <Eq>{"Ax = 0"}</Eq>, i.e. <Eq>{"x_1 + x_2 = 0"}</Eq>.
      </>
    ),
    steps: [
      { content: <Equation>{"x_1 = -x_2"}</Equation> },
      {
        content: (
          <>
            Null space <Eq>{"= \\operatorname{span}\\{(1, -1)\\}"}</Eq>, dimension 1.
          </>
        ),
      },
    ],
  },
  {
    id: "u5",
    title: "Column space & dimension",
    prompt: (
      <>
        What is the column space of{" "}
        <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}"}</Eq>, and its
        dimension?
      </>
    ),
    steps: [
      { content: <>Column 2 = 2 × column 1, so both columns lie on one line.</> },
      {
        content: (
          <>
            Column space <Eq>{"= \\operatorname{span}\\{(1, 2)\\}"}</Eq>, dimension 1 (=
            rank).
          </>
        ),
      },
    ],
  },
];

const orthogonality: Drill[] = [
  {
    id: "o1",
    title: "Orthonormalize a pair",
    prompt: (
      <>
        Show <Eq>{"(1, 1)"}</Eq> and <Eq>{"(1, -1)"}</Eq> are orthogonal, then normalize
        them.
      </>
    ),
    steps: [
      { content: <Equation>{"(1,1)\\cdot(1,-1) = 1 - 1 = 0 \\ \\checkmark"}</Equation> },
      {
        content: (
          <Equation>{"\\tfrac1{\\sqrt2}(1,1),\\quad \\tfrac1{\\sqrt2}(1,-1)"}</Equation>
        ),
      },
    ],
  },
  {
    id: "o2",
    title: "Least-squares slope",
    prompt: (
      <>
        Fit <Eq>{"y = cx"}</Eq> through <Eq>{"(1,1), (2,2), (3,2)"}</Eq> by least squares.
      </>
    ),
    hint: (
      <>
        For a line through the origin,{" "}
        <Eq>{"c = \\dfrac{\\sum x_i y_i}{\\sum x_i^2}"}</Eq>.
      </>
    ),
    steps: [
      { content: <Equation>{"\\textstyle\\sum x_i y_i = 1 + 4 + 6 = 11"}</Equation> },
      { content: <Equation>{"\\textstyle\\sum x_i^2 = 1 + 4 + 9 = 14"}</Equation> },
      { content: <Equation>{"c = \\tfrac{11}{14} \\approx 0.79"}</Equation> },
    ],
  },
  {
    id: "o3",
    title: "One Gram–Schmidt step",
    prompt: (
      <>
        Orthogonalize <Eq>{"v_2 = (1, 0)"}</Eq> against <Eq>{"v_1 = (1, 1)"}</Eq>.
      </>
    ),
    hint: (
      <>
        Subtract the projection:{" "}
        <Eq>{"v_2 - \\dfrac{v_2\\cdot v_1}{v_1\\cdot v_1}v_1"}</Eq>.
      </>
    ),
    steps: [
      {
        content: (
          <Equation>{"\\dfrac{v_2\\cdot v_1}{v_1\\cdot v_1} = \\dfrac{1}{2}"}</Equation>
        ),
      },
      {
        content: (
          <Equation>
            {
              "v_2 - \\tfrac12(1,1) = (1,0) - (\\tfrac12,\\tfrac12) = (\\tfrac12,\\ -\\tfrac12)"
            }
          </Equation>
        ),
      },
    ],
  },
  {
    id: "o4",
    title: "Build the normal equations",
    prompt: (
      <>
        For <Eq>{"A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\\\ 1 & 3 \\end{bmatrix}"}</Eq>,{" "}
        <Eq>{"b = (1, 2, 2)"}</Eq>, form and solve{" "}
        <Eq>{"A^{\\mathsf T}A\\hat x = A^{\\mathsf T}b"}</Eq>.
      </>
    ),
    hint: <>This fits the best line y = a + m x through the three points.</>,
    steps: [
      {
        content: (
          <Equation>
            {
              "A^{\\mathsf T}A = \\begin{bmatrix} 3 & 6 \\\\ 6 & 14 \\end{bmatrix},\\quad A^{\\mathsf T}b = \\begin{bmatrix} 5 \\\\ 11 \\end{bmatrix}"
            }
          </Equation>
        ),
      },
      { content: <Equation>{"3a + 6m = 5,\\quad 6a + 14m = 11"}</Equation> },
      {
        content: (
          <Equation>
            {"m = 0.5,\\quad a = \\tfrac23 \\Rightarrow y = \\tfrac23 + \\tfrac12 x"}
          </Equation>
        ),
      },
    ],
  },
];

const eigen: Drill[] = [
  {
    id: "e1",
    title: "Eigenvalues of a diagonal matrix",
    prompt: (
      <>
        Eigenvalues of <Eq>{"A = \\begin{bmatrix} 2 & 0 \\\\ 0 & -3 \\end{bmatrix}"}</Eq>?
      </>
    ),
    steps: [
      { content: <>A diagonal matrix has its eigenvalues on the diagonal.</> },
      { content: <Equation>{"\\lambda = 2,\\ -3"}</Equation> },
    ],
  },
  {
    id: "e2",
    title: "Characteristic polynomial (2×2)",
    prompt: (
      <>
        Find the eigenvalues of{" "}
        <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}"}</Eq>.
      </>
    ),
    hint: (
      <>
        Use <Eq>{"\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0"}</Eq>.
      </>
    ),
    steps: [
      { content: <Equation>{"\\operatorname{tr}A = 4,\\quad \\det A = 3"}</Equation> },
      {
        content: (
          <Equation>
            {"\\lambda^2 - 4\\lambda + 3 = 0 \\Rightarrow (\\lambda-1)(\\lambda-3)=0"}
          </Equation>
        ),
      },
      { content: <Equation>{"\\lambda = 1,\\ 3"}</Equation> },
    ],
  },
  {
    id: "e3",
    title: "Find an eigenvector",
    prompt: (
      <>
        Find an eigenvector of{" "}
        <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}"}</Eq> for{" "}
        <Eq>{"\\lambda = 3"}</Eq>.
      </>
    ),
    hint: (
      <>
        Solve <Eq>{"(A - 3I)v = 0"}</Eq>.
      </>
    ),
    steps: [
      {
        content: (
          <Equation>
            {"A - 3I = \\begin{bmatrix} -1 & 1 \\\\ 1 & -1 \\end{bmatrix}"}
          </Equation>
        ),
      },
      { content: <Equation>{"-v_1 + v_2 = 0 \\Rightarrow v_1 = v_2"}</Equation> },
      { content: <Equation>{"v = (1,\\ 1)"}</Equation> },
    ],
  },
  {
    id: "e4",
    title: "Eigenvalues of a triangular matrix",
    prompt: (
      <>
        Eigenvalues of <Eq>{"A = \\begin{bmatrix} 4 & 7 \\\\ 0 & 5 \\end{bmatrix}"}</Eq>?
      </>
    ),
    hint: <>For a triangular matrix, read them straight off the diagonal.</>,
    steps: [{ content: <Equation>{"\\lambda = 4,\\ 5"}</Equation> }],
  },
  {
    id: "e5",
    title: "Verify an eigenvector",
    prompt: (
      <>
        Is <Eq>{"(1, 1)"}</Eq> an eigenvector of{" "}
        <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}"}</Eq>? If so, find{" "}
        <Eq>{"\\lambda"}</Eq>.
      </>
    ),
    steps: [
      { content: <Equation>{"A\\,(1,1) = (2+1,\\ 1+2) = (3,\\ 3)"}</Equation> },
      {
        content: (
          <>
            <Eq>{"(3,3) = 3(1,1)"}</Eq>, so yes — eigenvalue <Eq>{"\\lambda = 3"}</Eq>.
          </>
        ),
      },
    ],
  },
  {
    id: "e6",
    title: "Recover a matrix from trace & det",
    prompt: (
      <>A 2×2 matrix has eigenvalues 5 and 2. What are its trace and determinant?</>
    ),
    hint: <>Trace is the sum of eigenvalues; determinant is their product.</>,
    steps: [
      { content: <Equation>{"\\operatorname{tr} = 5 + 2 = 7"}</Equation> },
      { content: <Equation>{"\\det = 5 \\cdot 2 = 10"}</Equation> },
    ],
  },
];

const svd: Drill[] = [
  {
    id: "sv1",
    title: "Singular values of a diagonal matrix",
    prompt: (
      <>
        Singular values of{" "}
        <Eq>{"A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 2 \\end{bmatrix}"}</Eq>?
      </>
    ),
    steps: [
      {
        content: (
          <>
            <Eq>{"A^{\\mathsf T}A = \\begin{bmatrix} 9 & 0 \\\\ 0 & 4\\end{bmatrix}"}</Eq>
            , eigenvalues 9 and 4.
          </>
        ),
      },
      { content: <Equation>{"\\sigma_1 = 3,\\ \\sigma_2 = 2"}</Equation> },
    ],
  },
  {
    id: "sv2",
    title: "σ from eigenvalues of AᵀA",
    prompt: (
      <>
        If <Eq>{"A^{\\mathsf T}A"}</Eq> has eigenvalues 16 and 9, what are the singular
        values of <Eq>{"A"}</Eq>?
      </>
    ),
    hint: (
      <>
        <Eq>{"\\sigma_i = \\sqrt{\\lambda_i(A^{\\mathsf T}A)}"}</Eq>.
      </>
    ),
    steps: [
      { content: <Equation>{"\\sigma = \\sqrt{16},\\ \\sqrt9 = 4,\\ 3"}</Equation> },
    ],
  },
  {
    id: "sv3",
    title: "Singular values of a rank-deficient matrix",
    prompt: (
      <>
        Singular values of{" "}
        <Eq>{"A = \\begin{bmatrix} 0 & 2 \\\\ 0 & 0 \\end{bmatrix}"}</Eq>?
      </>
    ),
    steps: [
      {
        content: (
          <Equation>
            {"A^{\\mathsf T}A = \\begin{bmatrix} 0 & 0 \\\\ 0 & 4 \\end{bmatrix}"}
          </Equation>
        ),
      },
      { content: <>Eigenvalues 0 and 4, so σ = 2 and 0 (rank 1).</> },
    ],
  },
  {
    id: "sv4",
    title: "Best rank-1 approximation error",
    prompt: (
      <>
        A matrix has singular values <Eq>{"\\sigma_1 = 5,\\ \\sigma_2 = 0.1"}</Eq>. What
        is the Frobenius error of the best rank-1 approximation?
      </>
    ),
    hint: (
      <>
        Eckart–Young: dropping the smaller singular values leaves error{" "}
        <Eq>{"\\sqrt{\\sum_{i>1}\\sigma_i^2}"}</Eq>.
      </>
    ),
    steps: [
      {
        content: (
          <>
            Keep <Eq>{"\\sigma_1 u_1 v_1^{\\mathsf T}"}</Eq>; drop <Eq>{"\\sigma_2"}</Eq>.
          </>
        ),
      },
      { content: <Equation>{"\\text{error} = \\sigma_2 = 0.1"}</Equation> },
    ],
  },
  {
    id: "sv5",
    title: "Singular values of a rotation",
    prompt: <>What are the singular values of any 2×2 rotation matrix?</>,
    hint: <>A rotation preserves every length.</>,
    steps: [
      {
        content: (
          <>
            <Eq>{"R^{\\mathsf T}R = I"}</Eq>, whose eigenvalues are all 1, so every{" "}
            <Eq>{"\\sigma_i = 1"}</Eq>.
          </>
        ),
      },
    ],
  },
];

export const DRILL_TOPICS: DrillTopic[] = [
  { label: "Vectors", drills: vectors },
  { label: "Matrices", drills: matrices },
  { label: "Linear Systems", drills: systems },
  { label: "Subspaces", drills: subspaces },
  { label: "Orthogonality", drills: orthogonality },
  { label: "Eigenvalues", drills: eigen },
  { label: "SVD", drills: svd },
];
