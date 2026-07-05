import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { MLCallout } from "../components/MLCallout";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { TransformVisualizer } from "../components/TransformVisualizer";
import { MatrixCalculator } from "../components/MatrixCalculator";
import { Eq, Equation } from "../components/Equation";
import { matricesQuiz } from "../data/quizzes";

export function Matrices() {
  return (
    <Page slug="matrices">
      <Section title="Intuition">
        <p>
          A matrix has two personalities. First, it's a <strong>data table</strong>: rows
          are examples, columns are features (a spreadsheet). Second — and this is the
          deep idea — a matrix is a <strong>function that transforms vectors</strong>:
          feed it a vector, it stretches, rotates, or shears it into a new vector.
        </p>
        <ConceptCard tone="intuition" title="The key insight">
          The columns of a matrix tell you where the basis arrows{" "}
          <Eq>{"\\hat{i}=(1,0)"}</Eq> and
          <Eq>{"\\hat{j}=(0,1)"}</Eq> land. Once you know where the basis goes, you know
          where
          <em>everything</em> goes — because every vector is a combination of the basis.
        </ConceptCard>
      </Section>

      <Section title="Definition">
        <p>
          An <Eq>{"m\\times n"}</Eq> matrix maps{" "}
          <Eq>{"\\mathbb{R}^n \\to \\mathbb{R}^m"}</Eq>. Applying it to a vector:
        </p>
        <Equation>
          {
            "A x = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = x_1\\begin{bmatrix} a \\\\ c \\end{bmatrix} + x_2\\begin{bmatrix} b \\\\ d \\end{bmatrix}"
          }
        </Equation>
        <p>
          Read that right side: the output is a{" "}
          <strong>combination of the columns</strong>, weighted by the input's
          coordinates. Matrix multiplication chains transformations:
        </p>
        <Equation>
          {"(AB)x = A(Bx) \\quad\\Rightarrow\\quad (AB)_{ij} = \\sum_k A_{ik} B_{kj}"}
        </Equation>
        <p>
          Entry <Eq>{"(i,j)"}</Eq> of <Eq>{"AB"}</Eq> is the dot product of row{" "}
          <Eq>{"i"}</Eq> of <Eq>{"A"}</Eq> with column <Eq>{"j"}</Eq> of <Eq>{"B"}</Eq>.
        </p>
      </Section>

      <Section title="Small example">
        <p>Rotate 90° counter-clockwise, then look at where the basis goes:</p>
        <Equation>
          {
            "R = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}, \\quad R\\hat{i} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}, \\quad R\\hat{j} = \\begin{bmatrix} -1 \\\\ 0 \\end{bmatrix}"
          }
        </Equation>
        <p>
          <Eq>{"\\hat i"}</Eq> (pointing right) becomes "up"; <Eq>{"\\hat j"}</Eq>{" "}
          (pointing up) becomes "left". That's a quarter turn.
        </p>
      </Section>

      <Section title="Manual calculation">
        <p>
          Multiply <Eq>{"AB"}</Eq> where{" "}
          <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}"}</Eq> and{" "}
          <Eq>{"B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}"}</Eq>.
        </p>
        <Hint label="Hint: row × column">
          Each output entry is (row of A) · (column of B). Top-left = row 1 of A dotted
          with column 1 of B = <Eq>{"1\\cdot5 + 2\\cdot7"}</Eq>.
        </Hint>
        <StepSolution
          steps={[
            {
              title: "Top-left",
              content: <Equation>{"1\\cdot5 + 2\\cdot7 = 19"}</Equation>,
            },
            {
              title: "Top-right",
              content: <Equation>{"1\\cdot6 + 2\\cdot8 = 22"}</Equation>,
            },
            {
              title: "Bottom-left",
              content: <Equation>{"3\\cdot5 + 4\\cdot7 = 43"}</Equation>,
            },
            {
              title: "Bottom-right",
              content: <Equation>{"3\\cdot6 + 4\\cdot8 = 50"}</Equation>,
            },
            {
              title: "Assemble",
              content: (
                <Equation>
                  {"AB = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}"}
                </Equation>
              ),
            },
          ]}
        />
        <ConceptCard tone="mistake">
          Matrix multiplication is <strong>not commutative</strong>:{" "}
          <Eq>{"AB \\neq BA"}</Eq> in general. Order matters because "rotate then shear"
          differs from "shear then rotate". Also, inner dimensions must match: an{" "}
          <Eq>{"m\\times n"}</Eq> times an
          <Eq>{"n\\times p"}</Eq> gives <Eq>{"m\\times p"}</Eq>.
        </ConceptCard>
      </Section>

      <Section title="Interactive demo">
        <p>
          Edit the transformation matrix or pick a preset, then slide "Apply" to animate
          how the grid, unit square, and basis vectors move. Watch the determinant — it's
          the factor by which area is scaled.
        </p>
        <TransformVisualizer />
        <p style={{ marginTop: "2rem" }}>
          And a plain calculator for products, transpose, and determinant:
        </p>
        <MatrixCalculator />
      </Section>

      <Section title="ML connection: layers as matrix operations">
        <MLCallout title="A neural network layer is a matrix multiply" reviewed="2026-07">
          <p>
            A dense (fully-connected) layer computes <Eq>{"y = \\sigma(Wx + b)"}</Eq>:
            multiply the input vector <Eq>{"x"}</Eq> by a weight matrix <Eq>{"W"}</Eq>,
            add a bias, then apply a nonlinearity <Eq>{"\\sigma"}</Eq>. Stack many such
            layers and you have a deep network.
          </p>
          <p>
            When you process a whole batch at once, <Eq>{"x"}</Eq> becomes a matrix{" "}
            <Eq>{"X"}</Eq>
            (one row per example) and the layer is <Eq>{"XW^{\\mathsf T}"}</Eq> — a big
            matrix multiply. GPUs are fast precisely because they do these multiplies in
            parallel (see the <em>GEMM</em> discussion in Section 9).
          </p>
        </MLCallout>
      </Section>

      <Section title="Practice questions">
        <Quiz title="Matrices — concept check" questions={matricesQuiz} />
      </Section>
    </Page>
  );
}
