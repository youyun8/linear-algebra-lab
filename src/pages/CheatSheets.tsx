import { Page, Section } from "../components/Page";
import { Eq, Equation } from "../components/Equation";

function Sheet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="concept-card" style={{ borderLeftColor: "var(--accent)" }}>
      <div className="cc-title">📄 {title}</div>
      <div>{children}</div>
    </div>
  );
}

export function CheatSheets() {
  return (
    <Page slug="cheatsheets">
      <Section title="One-page summaries">
        <p>Everything condensed. Print-friendly; use these while doing the drills.</p>

        <Sheet title="Vectors">
          <ul>
            <li>
              Add / scale: componentwise; <Eq>{"c\\,a = (ca_1, ca_2)"}</Eq>.
            </li>
            <li>
              Dot product:{" "}
              <Eq>{"a\\cdot b = \\sum a_i b_i = \\|a\\|\\|b\\|\\cos\\theta"}</Eq>.
            </li>
            <li>
              Norm: <Eq>{"\\|a\\| = \\sqrt{a\\cdot a}"}</Eq>.
            </li>
            <li>
              Cosine similarity:{" "}
              <Eq>{"\\cos\\theta = \\dfrac{a\\cdot b}{\\|a\\|\\|b\\|}"}</Eq> (−1 to 1).
            </li>
            <li>
              Projection:{" "}
              <Eq>{"\\operatorname{proj}_b(a) = \\dfrac{a\\cdot b}{b\\cdot b} b"}</Eq>.
            </li>
            <li>
              Perpendicular ⇔ <Eq>{"a\\cdot b = 0"}</Eq>.
            </li>
          </ul>
        </Sheet>

        <Sheet title="Matrix multiplication">
          <ul>
            <li>
              Shapes: <Eq>{"(m\\times n)(n\\times p) = (m\\times p)"}</Eq>; inner dims
              must match.
            </li>
            <li>
              Entry: <Eq>{"(AB)_{ij} = \\sum_k A_{ik}B_{kj}"}</Eq> = row·column.
            </li>
            <li>
              Columns of <Eq>{"A"}</Eq> = images of basis vectors.
            </li>
            <li>
              Not commutative: <Eq>{"AB \\ne BA"}</Eq>.
            </li>
            <li>
              Transpose: <Eq>{"(AB)^{\\mathsf T} = B^{\\mathsf T}A^{\\mathsf T}"}</Eq>.
            </li>
            <li>
              2×2 determinant: <Eq>{"ad - bc"}</Eq>; <Eq>{"|\\det|"}</Eq> = area scale.
            </li>
          </ul>
        </Sheet>

        <Sheet title="Projections & least squares">
          <ul>
            <li>
              Onto a vector: <Eq>{"\\dfrac{a\\cdot b}{a\\cdot a}a"}</Eq>.
            </li>
            <li>
              Onto column space: solve normal equations{" "}
              <Eq>{"A^{\\mathsf T}A\\hat x = A^{\\mathsf T}b"}</Eq>.
            </li>
            <li>
              Weights: <Eq>{"\\hat x = (A^{\\mathsf T}A)^{-1}A^{\\mathsf T}b"}</Eq>.
            </li>
            <li>
              Gram–Schmidt: subtract projections, then normalize → orthonormal basis.
            </li>
            <li>
              Residual <Eq>{"b - A\\hat x"}</Eq> is orthogonal to the column space.
            </li>
          </ul>
        </Sheet>

        <Sheet title="Eigenvalues & eigenvectors">
          <ul>
            <li>
              Definition: <Eq>{"Av = \\lambda v"}</Eq>, <Eq>{"v \\ne 0"}</Eq>.
            </li>
            <li>
              Characteristic eq.: <Eq>{"\\det(A - \\lambda I) = 0"}</Eq>.
            </li>
            <li>
              2×2 shortcut:{" "}
              <Eq>{"\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0"}</Eq>.
            </li>
            <li>
              Sum of <Eq>{"\\lambda"}</Eq> = trace; product = determinant.
            </li>
            <li>
              Diagonalize: <Eq>{"A = PDP^{-1}"}</Eq>.
            </li>
            <li>
              Symmetric ⇒ real <Eq>{"\\lambda"}</Eq>, orthogonal eigenvectors,{" "}
              <Eq>{"A = QDQ^{\\mathsf T}"}</Eq>.
            </li>
          </ul>
        </Sheet>

        <Sheet title="SVD">
          <ul>
            <li>
              <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq>: rotate · scale · rotate.
            </li>
            <li>
              <Eq>{"V"}</Eq> = eigenvectors of <Eq>{"A^{\\mathsf T}A"}</Eq> (right
              singular vectors).
            </li>
            <li>
              <Eq>{"\\sigma_i = \\sqrt{\\lambda_i(A^{\\mathsf T}A)}"}</Eq>, ordered{" "}
              <Eq>{"\\ge 0"}</Eq>.
            </li>
            <li>
              <Eq>{"u_i = Av_i/\\sigma_i"}</Eq> (left singular vectors).
            </li>
            <li>
              Rank-<Eq>{"k"}</Eq> best fit: keep top <Eq>{"k"}</Eq> terms of{" "}
              <Eq>{"\\sum \\sigma_i u_i v_i^{\\mathsf T}"}</Eq>.
            </li>
          </ul>
          <Equation>
            {
              "A = \\sigma_1 u_1 v_1^{\\mathsf T} + \\sigma_2 u_2 v_2^{\\mathsf T} + \\cdots"
            }
          </Equation>
        </Sheet>

        <Sheet title="ML connections">
          <ul>
            <li>
              <strong>Embeddings</strong>: rows of an embedding matrix; compare with
              cosine similarity.
            </li>
            <li>
              <strong>Dense layer</strong>: <Eq>{"y = \\sigma(Wx + b)"}</Eq>.
            </li>
            <li>
              <strong>Attention</strong>:{" "}
              <Eq>{"\\operatorname{softmax}(QK^{\\mathsf T}/\\sqrt{d_k})V"}</Eq>.
            </li>
            <li>
              <strong>PCA</strong>: eigen/SVD of covariance; top components = most
              variance.
            </li>
            <li>
              <strong>Compression / LoRA</strong>: low-rank{" "}
              <Eq>{"A \\approx U_k\\Sigma_k V_k^{\\mathsf T}"}</Eq>,{" "}
              <Eq>{"\\Delta W = BA"}</Eq>.
            </li>
            <li>
              <strong>GPU GEMM</strong>: <Eq>{"C = \\alpha AB + \\beta C"}</Eq> — most of
              the compute.
            </li>
          </ul>
        </Sheet>
      </Section>
    </Page>
  );
}
