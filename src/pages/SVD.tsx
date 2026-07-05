import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { MLCallout } from "../components/MLCallout";
import { SVDCalculator } from "../components/SVDCalculator";
import { Eq, Equation } from "../components/Equation";
import { svdQuiz } from "../data/quizzes";

export function SVD() {
  return (
    <Page slug="svd">
      <Section title="Intuition — every matrix is three simple moves">
        <p>
          Here's the big secret of linear algebra: <em>any</em> matrix, no matter how
          messy, does exactly three things in a row when it transforms space:
        </p>
        <ol>
          <li>
            <strong>Rotate or reflect</strong> (an orthogonal move that doesn't change
            lengths) — this is <Eq>{"V^{\\mathsf T}"}</Eq>.
          </li>
          <li>
            <strong>Stretch along the axes</strong> by non-negative amounts — this is{" "}
            <Eq>{"\\Sigma"}</Eq>.
          </li>
          <li>
            <strong>Rotate or reflect again</strong> — this is <Eq>{"U"}</Eq>.
          </li>
        </ol>
        <Equation>{"A = U\\,\\Sigma\\,V^{\\mathsf T}"}</Equation>
        <ConceptCard tone="intuition">
          A unit circle goes in, an ellipse comes out. SVD finds the axes of that ellipse
          (columns of <Eq>{"U"}</Eq>), how long each axis is (the singular values{" "}
          <Eq>{"\\sigma_i"}</Eq>), and which input directions map to them (columns of{" "}
          <Eq>{"V"}</Eq>).
        </ConceptCard>
      </Section>

      <Section title="Definition">
        <p>
          For any <Eq>{"m\\times n"}</Eq> matrix <Eq>{"A"}</Eq>:
        </p>
        <Equation>
          {
            "A = U\\Sigma V^{\\mathsf T}, \\quad U^{\\mathsf T}U = I,\\ V^{\\mathsf T}V = I,\\ \\Sigma = \\operatorname{diag}(\\sigma_1 \\ge \\sigma_2 \\ge \\cdots \\ge 0)"
          }
        </Equation>
        <p>
          The <Eq>{"\\sigma_i"}</Eq> are the <strong>singular values</strong>; columns of{" "}
          <Eq>{"U"}</Eq> and <Eq>{"V"}</Eq> are the <strong>left</strong> and{" "}
          <strong>right singular vectors</strong>. They connect to eigenvalues like this:
        </p>
        <Equation>
          {
            "A^{\\mathsf T}A = V\\Sigma^{\\mathsf T}\\Sigma V^{\\mathsf T} \\Rightarrow \\text{eigenvalues of } A^{\\mathsf T}A = \\sigma_i^2"
          }
        </Equation>
      </Section>

      <Section title="How to compute a 2×2 SVD by hand">
        <p>The recipe (used exactly by the calculator below):</p>
        <ConceptCard tone="definition" title="The manual recipe">
          <ol style={{ margin: 0 }}>
            <li>
              Form <Eq>{"A^{\\mathsf T}A"}</Eq> (symmetric, 2×2).
            </li>
            <li>
              Find its eigenvalues <Eq>{"\\lambda_1 \\ge \\lambda_2 \\ge 0"}</Eq>.
            </li>
            <li>
              Singular values: <Eq>{"\\sigma_i = \\sqrt{\\lambda_i}"}</Eq>.
            </li>
            <li>
              Right singular vectors <Eq>{"v_i"}</Eq> = unit eigenvectors of{" "}
              <Eq>{"A^{\\mathsf T}A"}</Eq> → columns of <Eq>{"V"}</Eq>.
            </li>
            <li>
              Left singular vectors <Eq>{"u_i = \\tfrac{1}{\\sigma_i} A v_i"}</Eq> →
              columns of <Eq>{"U"}</Eq>.
            </li>
            <li>
              Assemble <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq>.
            </li>
          </ol>
        </ConceptCard>
      </Section>

      <Section title="Worked example — A = [[3,0],[4,5]]">
        <StepSolution
          reveal={false}
          steps={[
            {
              title: "Form AᵀA",
              content: (
                <>
                  <Equation>
                    {
                      "A^{\\mathsf T}A = \\begin{bmatrix} 3 & 4 \\\\ 0 & 5\\end{bmatrix}\\begin{bmatrix} 3 & 0 \\\\ 4 & 5\\end{bmatrix} = \\begin{bmatrix} 25 & 20 \\\\ 20 & 25 \\end{bmatrix}"
                    }
                  </Equation>
                </>
              ),
            },
            {
              title: "Eigenvalues of AᵀA",
              content: (
                <>
                  <Equation>
                    {"\\operatorname{tr} = 50,\\ \\det = 625 - 400 = 225"}
                  </Equation>
                  <Equation>
                    {"\\lambda^2 - 50\\lambda + 225 = 0 \\Rightarrow \\lambda = 45,\\ 5"}
                  </Equation>
                </>
              ),
            },
            {
              title: "Singular values",
              content: (
                <Equation>
                  {
                    "\\sigma_1 = \\sqrt{45} = 3\\sqrt5 \\approx 6.708,\\quad \\sigma_2 = \\sqrt5 \\approx 2.236"
                  }
                </Equation>
              ),
            },
            {
              title: "Right singular vectors V",
              content: (
                <>
                  <p style={{ marginTop: 0 }}>
                    Eigenvectors of the symmetric <Eq>{"A^{\\mathsf T}A"}</Eq> are along{" "}
                    <Eq>{"(1,1)"}</Eq> and <Eq>{"(1,-1)"}</Eq>:
                  </p>
                  <Equation>
                    {
                      "v_1 = \\tfrac{1}{\\sqrt2}(1,1),\\quad v_2 = \\tfrac{1}{\\sqrt2}(1,-1)"
                    }
                  </Equation>
                </>
              ),
            },
            {
              title: "Left singular vectors U",
              content: (
                <>
                  <Equation>
                    {
                      "u_1 = \\tfrac{1}{\\sigma_1}Av_1 = \\tfrac{1}{3\\sqrt5}\\cdot\\tfrac{1}{\\sqrt2}(3, 9) = \\tfrac{1}{\\sqrt{10}}(1, 3)"
                    }
                  </Equation>
                  <Equation>
                    {
                      "u_2 = \\tfrac{1}{\\sigma_2}Av_2 = \\tfrac{1}{\\sqrt5}\\cdot\\tfrac{1}{\\sqrt2}(3, -1) = \\tfrac{1}{\\sqrt{10}}(3, -1)"
                    }
                  </Equation>
                </>
              ),
            },
            {
              title: "Assemble and check",
              content: (
                <>
                  <Equation>
                    {
                      "A = U\\Sigma V^{\\mathsf T},\\quad \\Sigma = \\begin{bmatrix} 3\\sqrt5 & 0 \\\\ 0 & \\sqrt5\\end{bmatrix}"
                    }
                  </Equation>
                  <p style={{ margin: 0 }}>
                    Multiply back to recover{" "}
                    <Eq>{"\\begin{bmatrix}3&0\\\\4&5\\end{bmatrix}"}</Eq>. The calculator
                    below verifies this numerically.
                  </p>
                </>
              ),
            },
          ]}
        />
        <Hint label="Why does u = Av/σ work?">
          From <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq> we get <Eq>{"AV = U\\Sigma"}</Eq>,
          i.e. <Eq>{"Av_i = \\sigma_i u_i"}</Eq>. Divide by <Eq>{"\\sigma_i"}</Eq> (when
          nonzero) to recover each left singular vector.
        </Hint>
        <ConceptCard tone="mistake">
          Singular values are the <strong>square roots</strong> of eigenvalues of{" "}
          <Eq>{"A^{\\mathsf T}A"}</Eq>, not the eigenvalues themselves — and they are
          always <Eq>{"\\ge 0"}</Eq>. Also order them largest-first, and keep{" "}
          <Eq>{"U"}</Eq> and <Eq>{"V"}</Eq> orthonormal (unit columns).
        </ConceptCard>
      </Section>

      <Section title="Interactive SVD calculator">
        <p>
          Enter any 2×2 matrix. The calculator shows <Eq>{"A"}</Eq>,{" "}
          <Eq>{"A^{\\mathsf T}A"}</Eq>, its eigenvalues, the singular values, the right
          singular vectors <Eq>{"V"}</Eq>, the left singular vectors <Eq>{"U"}</Eq>, and
          the reconstruction <Eq>{"U\\Sigma V^{\\mathsf T}"}</Eq>.
        </p>
        <SVDCalculator />
      </Section>

      <Section title="Low-rank approximation — the reason SVD rules ML">
        <p>
          Write <Eq>{"A"}</Eq> as a sum of rank-1 pieces, biggest first:
        </p>
        <Equation>
          {
            "A = \\sigma_1 u_1 v_1^{\\mathsf T} + \\sigma_2 u_2 v_2^{\\mathsf T} + \\cdots"
          }
        </Equation>
        <p>
          Keep only the largest <Eq>{"k"}</Eq> terms and you get <Eq>{"A_k"}</Eq>, the
          <strong>
            {" "}
            best possible rank-<Eq>{"k"}</Eq> approximation
          </strong>{" "}
          (Eckart–Young theorem). If the small singular values are tiny, you lose almost
          nothing while storing far fewer numbers.
        </p>
      </Section>

      <Section title="ML connections">
        <MLCallout title="PCA, compression, recommendation, LoRA" reviewed="2026-07">
          <ul style={{ margin: 0 }}>
            <li>
              <strong>PCA</strong> = SVD of the centered data matrix; right singular
              vectors are principal components, <Eq>{"\\sigma_i^2"}</Eq> are variances.
            </li>
            <li>
              <strong>Image compression</strong>: an image is a matrix; keep the top{" "}
              <Eq>{"k"}</Eq> singular values to shrink it with little visible loss.
            </li>
            <li>
              <strong>Recommendation systems</strong>: factor the sparse user×item ratings
              matrix into low-rank user and item factors (latent taste dimensions).
            </li>
            <li>
              <strong>Low-rank approximation</strong> is the general tool; model weights
              often have rapidly decaying singular values.
            </li>
            <li>
              <strong>LoRA</strong>: instead of updating a full weight matrix{" "}
              <Eq>{"W"}</Eq> during fine-tuning, learn a low-rank correction{" "}
              <Eq>{"\\Delta W = BA"}</Eq> (rank <Eq>{"r \\ll"}</Eq> dimensions), training
              a tiny fraction of the parameters.
            </li>
          </ul>
        </MLCallout>
      </Section>

      <Section title="Practice questions">
        <Quiz title="SVD — concept check" questions={svdQuiz} />
      </Section>
    </Page>
  );
}
