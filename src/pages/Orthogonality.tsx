import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { MLCallout } from "../components/MLCallout";
import { VectorCanvas } from "../components/VectorCanvas";
import { Eq, Equation } from "../components/Equation";
import { orthogonalityQuiz } from "../data/quizzes";

export function Orthogonality() {
  return (
    <Page slug="orthogonality">
      <Section title="Intuition">
        <p>
          Two vectors are orthogonal (perpendicular) when their dot product is zero.
          Orthogonality is the geometry of "no overlap" — an orthogonal direction carries
          information the other doesn't. The single most useful move in applied linear
          algebra is <strong>projection</strong>: find the closest point in a subspace to
          a target, by dropping a perpendicular.
        </p>
        <ConceptCard tone="intuition">
          Least squares = "I can't hit the target exactly, so I'll aim for the closest
          point I <em>can</em> reach." That closest point is the orthogonal projection of
          the target onto the reachable set (the column space).
        </ConceptCard>
      </Section>

      <Section title="Definition">
        <p>
          Orthogonal: <Eq>{"a \\cdot b = 0"}</Eq>. Projection of <Eq>{"b"}</Eq> onto a
          single vector <Eq>{"a"}</Eq>:
        </p>
        <Equation>
          {"\\operatorname{proj}_a(b) = \\frac{a\\cdot b}{a\\cdot a}\\,a"}
        </Equation>
        <p>
          For a full subspace = column space of <Eq>{"A"}</Eq>, the least-squares solution
          to <Eq>{"Ax \\approx b"}</Eq> solves the <strong>normal equations</strong>:
        </p>
        <Equation>{"A^{\\mathsf T}A\\,\\hat{x} = A^{\\mathsf T}b"}</Equation>
        <p>
          An <strong>orthonormal</strong> set has unit-length, mutually perpendicular
          vectors. <strong>Gram–Schmidt</strong> builds one from any basis by subtracting
          off projections:
        </p>
        <Equation>
          {
            "q_k = \\frac{v_k - \\sum_{j<k} (v_k\\cdot q_j)\\,q_j}{\\left\\| v_k - \\sum_{j<k}(v_k\\cdot q_j)\\,q_j \\right\\|}"
          }
        </Equation>
      </Section>

      <Section title="Small example — least squares line">
        <p>
          Fit <Eq>{"y = mx"}</Eq> through points <Eq>{"(1,1), (2,2), (3,2)"}</Eq>. Here{" "}
          <Eq>{"A = (1,2,3)^{\\mathsf T}"}</Eq>, <Eq>{"b = (1,2,2)^{\\mathsf T}"}</Eq>.
        </p>
        <Equation>
          {"A^{\\mathsf T}A = 1^2+2^2+3^2 = 14, \\quad A^{\\mathsf T}b = 1+4+6 = 11"}
        </Equation>
        <Equation>{"\\hat m = \\frac{11}{14} \\approx 0.786"}</Equation>
        <p>The best-fit slope minimizes the total squared vertical error.</p>
      </Section>

      <Section title="Manual calculation — Gram–Schmidt">
        <p>
          Orthonormalize <Eq>{"v_1 = (1,1,0)"}</Eq>, <Eq>{"v_2 = (1,0,1)"}</Eq>.
        </p>
        <Hint label="Hint">
          First normalize <Eq>{"v_1"}</Eq> to get <Eq>{"q_1"}</Eq>. Then subtract the part
          of <Eq>{"v_2"}</Eq> along <Eq>{"q_1"}</Eq> and normalize what remains.
        </Hint>
        <StepSolution
          steps={[
            {
              title: "q₁",
              content: <Equation>{"q_1 = \\tfrac{1}{\\sqrt2}(1,1,0)"}</Equation>,
            },
            {
              title: "Remove component along q₁",
              content: (
                <>
                  <Equation>{"v_2\\cdot q_1 = \\tfrac{1}{\\sqrt2}"}</Equation>
                  <Equation>
                    {
                      "w = v_2 - (v_2\\cdot q_1)q_1 = (1,0,1) - \\tfrac12(1,1,0) = (\\tfrac12, -\\tfrac12, 1)"
                    }
                  </Equation>
                </>
              ),
            },
            {
              title: "Normalize",
              content: (
                <>
                  <Equation>
                    {"\\|w\\| = \\sqrt{\\tfrac14 + \\tfrac14 + 1} = \\sqrt{\\tfrac32}"}
                  </Equation>
                  <Equation>{"q_2 = \\tfrac{1}{\\sqrt{6}}(1, -1, 2)"}</Equation>
                </>
              ),
            },
            {
              title: "Check",
              content: (
                <p style={{ margin: 0 }}>
                  <Eq>{"q_1 \\cdot q_2 = 0"}</Eq> ✓ and both are unit length. Same span,
                  now orthonormal.
                </p>
              ),
            },
          ]}
        />
        <ConceptCard tone="mistake">
          In the normal equations you multiply by <Eq>{"A^{\\mathsf T}"}</Eq> on the left
          of
          <em>both</em> sides. A frequent error is forgetting the transpose or trying to
          invert a non-square <Eq>{"A"}</Eq> directly — you can't; that's why we form the
          square matrix <Eq>{"A^{\\mathsf T}A"}</Eq>.
        </ConceptCard>
      </Section>

      <Section title="Interactive demo">
        <p>
          Reuse the vector playground: drag so that <Eq>{"a\\cdot b = 0"}</Eq>{" "}
          (perpendicular) and watch the projection (orange) shrink to nothing. That "no
          shadow" case is the heart of orthogonality.
        </p>
        <VectorCanvas />
      </Section>

      <Section title="ML connection: linear regression">
        <MLCallout title="Least squares = the original ML model" reviewed="2026-07">
          <p>
            Ordinary linear regression <em>is</em> the least-squares projection. Given a
            feature matrix <Eq>{"A"}</Eq> and targets <Eq>{"b"}</Eq>, the closed-form
            weights are
            <Eq>{"\\hat{x} = (A^{\\mathsf T}A)^{-1}A^{\\mathsf T}b"}</Eq> — projecting{" "}
            <Eq>{"b"}</Eq> onto what the features can express.
          </p>
          <p>
            Orthogonality also explains why <strong>uncorrelated features</strong> are
            nice (they don't fight each other) and motivates{" "}
            <strong>orthogonal / whitened representations</strong> used in normalization
            and PCA.
          </p>
        </MLCallout>
      </Section>

      <Section title="Practice questions">
        <Quiz title="Orthogonality — concept check" questions={orthogonalityQuiz} />
      </Section>
    </Page>
  );
}
