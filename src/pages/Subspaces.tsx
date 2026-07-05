import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { MLCallout } from "../components/MLCallout";
import { Eq, Equation } from "../components/Equation";
import { subspacesQuiz } from "../data/quizzes";

export function Subspaces() {
  return (
    <Page slug="subspaces">
      <Section title="Intuition">
        <p>
          A subspace is a "flat" region through the origin that's closed under the vector
          operations: add two vectors in it, still in it; scale a vector in it, still in
          it. In <Eq>{"\\mathbb{R}^3"}</Eq> the subspaces are: just the origin, any line
          through the origin, any plane through the origin, or all of space.
        </p>
        <ConceptCard tone="intuition">
          <strong>Span</strong> = every place you can reach by combining some vectors.
          <strong> Basis</strong> = a minimal set of directions that reaches everything
          (no redundancy). <strong>Dimension</strong> = how many vectors are in a basis
          (the number of independent directions).
        </ConceptCard>
      </Section>

      <Section title="Definition">
        <p>
          The <strong>span</strong> of vectors <Eq>{"v_1,\\dots,v_k"}</Eq> is all linear
          combinations:
        </p>
        <Equation>
          {
            "\\operatorname{span}\\{v_1,\\dots,v_k\\} = \\{\\, c_1 v_1 + \\cdots + c_k v_k : c_i \\in \\mathbb{R} \\,\\}"
          }
        </Equation>
        <p>
          They are <strong>linearly independent</strong> if the only combination giving{" "}
          <Eq>{"0"}</Eq> is all-zero coefficients. A <strong>basis</strong> is an
          independent spanning set. For a matrix <Eq>{"A"}</Eq> there are three key
          subspaces:
        </p>
        <ul>
          <li>
            <strong>Column space</strong> <Eq>{"C(A)"}</Eq>: span of the columns = all
            reachable outputs <Eq>{"Ax"}</Eq>.
          </li>
          <li>
            <strong>Row space</strong> <Eq>{"C(A^{\\mathsf T})"}</Eq>: span of the rows.
          </li>
          <li>
            <strong>Null space</strong> <Eq>{"N(A)"}</Eq>: all <Eq>{"x"}</Eq> with{" "}
            <Eq>{"Ax = 0"}</Eq>.
          </li>
        </ul>
      </Section>

      <Section title="Rank–nullity theorem">
        <ConceptCard tone="definition" title="Rank–Nullity">
          <Equation>
            {
              "\\underbrace{\\dim C(A)}_{\\text{rank}} + \\underbrace{\\dim N(A)}_{\\text{nullity}} = n \\ (\\text{number of columns})"
            }
          </Equation>
          Every column is accounted for exactly once: either it introduces a genuinely new
          output direction (a pivot column → rank), or it's a free variable (→ nullity).
        </ConceptCard>
      </Section>

      <Section title="Small example">
        <p>
          Take <Eq>{"A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\end{bmatrix}"}</Eq>.
          Row 2 is <Eq>{"2\\times"}</Eq> row 1, so there's only one independent row.
        </p>
        <ul>
          <li>
            Rank <Eq>{"= 1"}</Eq> (one pivot).
          </li>
          <li>
            Columns are all multiples of <Eq>{"(1,2)"}</Eq>, so <Eq>{"C(A)"}</Eq> is a
            line in <Eq>{"\\mathbb{R}^2"}</Eq>.
          </li>
          <li>
            Nullity <Eq>{"= n - \\text{rank} = 3 - 1 = 2"}</Eq>: the null space is a plane
            in <Eq>{"\\mathbb{R}^3"}</Eq>.
          </li>
        </ul>
      </Section>

      <Section title="Manual calculation">
        <p>
          Find the null space of{" "}
          <Eq>{"A = \\begin{bmatrix} 1 & 2 & 1 \\\\ 0 & 0 & 1 \\end{bmatrix}"}</Eq>.
        </p>
        <Hint label="Hint">
          Identify pivot columns (1 and 3) and free columns (2). Set the free variable{" "}
          <Eq>{"x_2 = t"}</Eq> and solve the pivot equations for <Eq>{"x_1, x_3"}</Eq>.
        </Hint>
        <StepSolution
          steps={[
            {
              title: "Pivots vs free",
              content: (
                <p style={{ margin: 0 }}>
                  Columns 1 and 3 have pivots; column 2 is free. Let <Eq>{"x_2 = t"}</Eq>.
                </p>
              ),
            },
            { title: "Row 2", content: <Equation>{"x_3 = 0"}</Equation> },
            {
              title: "Row 1",
              content: (
                <Equation>{"x_1 + 2x_2 + x_3 = 0 \\Rightarrow x_1 = -2t"}</Equation>
              ),
            },
            {
              title: "Null space",
              content: (
                <>
                  <Equation>{"x = t\\,(-2, 1, 0)"}</Equation>
                  <p style={{ margin: 0 }}>
                    The null space is the line spanned by <Eq>{"(-2,1,0)"}</Eq>; nullity =
                    1, rank = 2, and <Eq>{"2 + 1 = 3 = n"}</Eq> ✓.
                  </p>
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="ML connection">
        <MLCallout title="Rank, redundancy, and effective dimension" reviewed="2026-07">
          If two features are perfectly correlated, the data matrix is rank-deficient: one
          column adds no new information (it's in the span of another). "Effective rank" —
          how many singular values are large (Section 8) — measures the true number of
          independent directions in data or in a weight matrix. Low effective rank is
          exactly what makes <strong>compression</strong> and <strong>LoRA</strong>{" "}
          possible.
        </MLCallout>
      </Section>

      <Section title="Practice questions">
        <Quiz title="Subspaces — concept check" questions={subspacesQuiz} />
      </Section>
    </Page>
  );
}
