import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { MLCallout } from "../components/MLCallout";
import { EigenVisualizer } from "../components/EigenVisualizer";
import { Eq, Equation } from "../components/Equation";
import { eigenQuiz } from "../data/quizzes";

export function Eigen() {
  return (
    <Page slug="eigen">
      <Section title="Intuition">
        <p>
          Most vectors get knocked off their direction when you apply a matrix. But a few
          special directions survive — the matrix only stretches or shrinks them, never
          turns them. Those directions are <strong>eigenvectors</strong>, and the stretch
          factors are <strong>eigenvalues</strong>. They are the "natural axes" of a
          transformation.
        </p>
        <ConceptCard tone="intuition">
          Picture stretching a photo horizontally. Points on the horizontal axis slide
          along it (eigenvalue &gt; 1), points on the vertical axis stay put (eigenvalue =
          1). Those axes are the eigenvectors — the skeleton of the transformation.
        </ConceptCard>
      </Section>

      <Section title="Definition">
        <p>
          A nonzero vector <Eq>{"v"}</Eq> is an eigenvector of <Eq>{"A"}</Eq> with
          eigenvalue <Eq>{"\\lambda"}</Eq> if
        </p>
        <Equation>{"A v = \\lambda v"}</Equation>
        <p>
          Rearranging, <Eq>{"(A - \\lambda I)v = 0"}</Eq> must have a nonzero solution, so
          the matrix <Eq>{"A - \\lambda I"}</Eq> is singular:
        </p>
        <Equation>
          {"\\det(A - \\lambda I) = 0 \\quad\\text{(characteristic equation)}"}
        </Equation>
        <p>
          For a 2×2 matrix this is a tidy quadratic in terms of trace and determinant:
        </p>
        <Equation>
          {"\\lambda^2 - (\\operatorname{tr}A)\\,\\lambda + \\det A = 0"}
        </Equation>
        <p>
          <strong>Diagonalization:</strong> if <Eq>{"A"}</Eq> has a full set of
          independent eigenvectors, then <Eq>{"A = PDP^{-1}"}</Eq> where <Eq>{"D"}</Eq> is
          diagonal (eigenvalues) and <Eq>{"P"}</Eq>'s columns are eigenvectors.
        </p>
      </Section>

      <Section title="Symmetric matrices">
        <ConceptCard tone="definition" title="Spectral theorem">
          A real <strong>symmetric</strong> matrix (<Eq>{"A = A^{\\mathsf T}"}</Eq>)
          always has real eigenvalues and can be diagonalized by an <em>orthonormal</em>{" "}
          set of eigenvectors: <Eq>{"A = Q D Q^{\\mathsf T}"}</Eq> with{" "}
          <Eq>{"Q^{\\mathsf T}Q = I"}</Eq>. This is the engine behind PCA and behind SVD
          (Section 8).
        </ConceptCard>
      </Section>

      <Section title="Small example">
        <p>
          Find eigenvalues of{" "}
          <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}"}</Eq>.
        </p>
        <Equation>
          {
            "\\operatorname{tr}A = 4,\\ \\det A = 3 \\ \\Rightarrow\\ \\lambda^2 - 4\\lambda + 3 = 0 \\ \\Rightarrow\\ \\lambda = 3,\\,1"
          }
        </Equation>
        <p>
          For <Eq>{"\\lambda = 3"}</Eq>: solve <Eq>{"(A-3I)v = 0"}</Eq> →{" "}
          <Eq>{"v = (1,1)"}</Eq>. For <Eq>{"\\lambda = 1"}</Eq>: <Eq>{"v = (1,-1)"}</Eq>.
          Note they're orthogonal, as the spectral theorem promises.
        </p>
      </Section>

      <Section title="Manual calculation">
        <p>
          Diagonalize <Eq>{"A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}"}</Eq>:
          find its eigenvalues and one eigenvector each.
        </p>
        <Hint label="Hint">
          <Eq>{"\\operatorname{tr}A = 7"}</Eq>, <Eq>{"\\det A = 10"}</Eq>. Solve{" "}
          <Eq>{"\\lambda^2 - 7\\lambda + 10 = 0"}</Eq> by factoring.
        </Hint>
        <StepSolution
          steps={[
            {
              title: "Characteristic equation",
              content: (
                <Equation>
                  {"\\lambda^2 - 7\\lambda + 10 = (\\lambda-5)(\\lambda-2) = 0"}
                </Equation>
              ),
            },
            {
              title: "Eigenvalues",
              content: <Equation>{"\\lambda_1 = 5,\\quad \\lambda_2 = 2"}</Equation>,
            },
            {
              title: "Eigenvector for λ=5",
              content: (
                <>
                  <Equation>
                    {
                      "(A - 5I)v = \\begin{bmatrix} -1 & 1 \\\\ 2 & -2 \\end{bmatrix}v = 0 \\Rightarrow v_1 = (1, 1)"
                    }
                  </Equation>
                </>
              ),
            },
            {
              title: "Eigenvector for λ=2",
              content: (
                <>
                  <Equation>
                    {
                      "(A - 2I)v = \\begin{bmatrix} 2 & 1 \\\\ 2 & 1 \\end{bmatrix}v = 0 \\Rightarrow v_2 = (1, -2)"
                    }
                  </Equation>
                  <p style={{ margin: 0 }}>
                    So <Eq>{"A = PDP^{-1}"}</Eq> with{" "}
                    <Eq>{"P = \\begin{bmatrix} 1 & 1 \\\\ 1 & -2\\end{bmatrix}"}</Eq>,{" "}
                    <Eq>{"D = \\begin{bmatrix} 5 & 0 \\\\ 0 & 2\\end{bmatrix}"}</Eq>.
                  </p>
                </>
              ),
            },
          ]}
        />
        <ConceptCard tone="mistake">
          Eigenvectors are directions, not unique vectors: any nonzero scalar multiple is
          also an eigenvector. Don't be alarmed if your book's eigenvector is{" "}
          <Eq>{"(2,2)"}</Eq>
          and yours is <Eq>{"(1,1)"}</Eq> — same line. Also, a rotation matrix has{" "}
          <em>no</em>
          real eigenvectors (it turns everything), which shows up as a negative
          discriminant.
        </ConceptCard>
      </Section>

      <Section title="Interactive eigenvector visualizer">
        <p>
          Rotate the blue vector <Eq>{"v"}</Eq> with the slider. The green vector is{" "}
          <Eq>{"Av"}</Eq>. When <Eq>{"v"}</Eq> lands on a dashed orange line (an
          eigenvector direction), <Eq>{"Av"}</Eq>
          points the same way — only its length changes, by the eigenvalue.
        </p>
        <EigenVisualizer />
      </Section>

      <Section title="ML connection: PCA">
        <MLCallout title="Principal Component Analysis" reviewed="2026-07">
          <p>
            PCA finds the directions along which your data varies most. Center the data,
            form the (symmetric) <strong>covariance matrix</strong>, and diagonalize it.
            The eigenvectors are the <strong>principal components</strong>; the
            eigenvalues are the variance captured by each. Keep the top few and you've
            reduced dimensions while preserving the most structure.
          </p>
          <p>
            Because covariance is symmetric, the spectral theorem guarantees clean,
            orthogonal axes — which is why PCA gives uncorrelated components. In Section 8
            we'll see PCA is really SVD in disguise.
          </p>
        </MLCallout>
      </Section>

      <Section title="Practice questions">
        <Quiz title="Eigenvalues — concept check" questions={eigenQuiz} />
      </Section>
    </Page>
  );
}
