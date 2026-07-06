import { Page, Section } from "../components/Page";
import { Eq, Equation } from "../components/Equation";
import { Figure } from "../components/Figure";
import { ProjectionFigure } from "../components/diagrams";
import { useLanguage } from "../i18n/LanguageProvider";

function Sheet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="concept-card" style={{ borderLeftColor: "var(--accent)" }}>
      <div className="cc-title">📄 {title}</div>
      <div>{children}</div>
    </div>
  );
}

export function CheatSheets() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="cheatsheets">
      <Section title={zh ? "一頁摘要" : "One-page summaries"}>
        {zh ? (
          <p>一切濃縮於此。適合列印；做練習時可搭配使用。</p>
        ) : (
          <p>Everything condensed. Print-friendly; use these while doing the drills.</p>
        )}

        <Figure
          caption={
            zh
              ? "貫穿全書的一張圖：投影＝丟一條垂線，找出子空間中最接近的點。最小平方、正交性與 SVD 都以它為核心。"
              : "One picture ties it together: projection = drop a perpendicular to the closest point in a subspace. Least squares, orthogonality, and SVD all turn on it."
          }
        >
          <ProjectionFigure />
        </Figure>

        <Sheet title={zh ? "向量" : "Vectors"}>
          <ul>
            {zh ? (
              <>
                <li>
                  加法／縮放：逐分量；<Eq>{"c\\,a = (ca_1, ca_2)"}</Eq>。
                </li>
                <li>
                  內積：
                  <Eq>{"a\\cdot b = \\sum a_i b_i = \\|a\\|\\|b\\|\\cos\\theta"}</Eq>。
                </li>
                <li>
                  範數：<Eq>{"\\|a\\| = \\sqrt{a\\cdot a}"}</Eq>。
                </li>
                <li>
                  餘弦相似度：
                  <Eq>{"\\cos\\theta = \\dfrac{a\\cdot b}{\\|a\\|\\|b\\|}"}</Eq>（−1 到
                  1）。
                </li>
                <li>
                  投影：
                  <Eq>{"\\operatorname{proj}_b(a) = \\dfrac{a\\cdot b}{b\\cdot b} b"}</Eq>
                  。
                </li>
                <li>
                  垂直 ⇔ <Eq>{"a\\cdot b = 0"}</Eq>。
                </li>
              </>
            ) : (
              <>
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
                  <Eq>{"\\cos\\theta = \\dfrac{a\\cdot b}{\\|a\\|\\|b\\|}"}</Eq> (−1 to
                  1).
                </li>
                <li>
                  Projection:{" "}
                  <Eq>{"\\operatorname{proj}_b(a) = \\dfrac{a\\cdot b}{b\\cdot b} b"}</Eq>
                  .
                </li>
                <li>
                  Perpendicular ⇔ <Eq>{"a\\cdot b = 0"}</Eq>.
                </li>
              </>
            )}
          </ul>
        </Sheet>

        <Sheet title={zh ? "矩陣乘法" : "Matrix multiplication"}>
          <ul>
            {zh ? (
              <>
                <li>
                  形狀：<Eq>{"(m\\times n)(n\\times p) = (m\\times p)"}</Eq>
                  ；內維度必須相符。
                </li>
                <li>
                  元素：<Eq>{"(AB)_{ij} = \\sum_k A_{ik}B_{kj}"}</Eq> ＝列·行。
                </li>
                <li>
                  <Eq>{"A"}</Eq> 的各行＝基底向量的像。
                </li>
                <li>
                  不可交換：<Eq>{"AB \\ne BA"}</Eq>。
                </li>
                <li>
                  轉置：<Eq>{"(AB)^{\\mathsf T} = B^{\\mathsf T}A^{\\mathsf T}"}</Eq>。
                </li>
                <li>
                  2×2 行列式：<Eq>{"ad - bc"}</Eq>；<Eq>{"|\\det|"}</Eq> ＝面積縮放。
                </li>
              </>
            ) : (
              <>
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
                  Transpose: <Eq>{"(AB)^{\\mathsf T} = B^{\\mathsf T}A^{\\mathsf T}"}</Eq>
                  .
                </li>
                <li>
                  2×2 determinant: <Eq>{"ad - bc"}</Eq>; <Eq>{"|\\det|"}</Eq> = area
                  scale.
                </li>
              </>
            )}
          </ul>
        </Sheet>

        <Sheet title={zh ? "投影與最小平方" : "Projections & least squares"}>
          <ul>
            {zh ? (
              <>
                <li>
                  投影到一個向量：<Eq>{"\\dfrac{a\\cdot b}{a\\cdot a}a"}</Eq>。
                </li>
                <li>
                  投影到行空間：求解正規方程{" "}
                  <Eq>{"A^{\\mathsf T}A\\hat x = A^{\\mathsf T}b"}</Eq>。
                </li>
                <li>
                  權重：<Eq>{"\\hat x = (A^{\\mathsf T}A)^{-1}A^{\\mathsf T}b"}</Eq>。
                </li>
                <li>Gram–Schmidt：減去投影，再正規化 → 正規正交基底。</li>
                <li>
                  殘差 <Eq>{"b - A\\hat x"}</Eq> 與行空間正交。
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </Sheet>

        <Sheet title={zh ? "特徵值與特徵向量" : "Eigenvalues & eigenvectors"}>
          <ul>
            {zh ? (
              <>
                <li>
                  定義：<Eq>{"Av = \\lambda v"}</Eq>，<Eq>{"v \\ne 0"}</Eq>。
                </li>
                <li>
                  特徵方程：<Eq>{"\\det(A - \\lambda I) = 0"}</Eq>。
                </li>
                <li>
                  2×2 捷徑：
                  <Eq>{"\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0"}</Eq>。
                </li>
                <li>
                  <Eq>{"\\lambda"}</Eq> 之和＝跡；乘積＝行列式。
                </li>
                <li>
                  對角化：<Eq>{"A = PDP^{-1}"}</Eq>。
                </li>
                <li>
                  對稱 ⇒ 實 <Eq>{"\\lambda"}</Eq>、正交特徵向量、
                  <Eq>{"A = QDQ^{\\mathsf T}"}</Eq>。
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </Sheet>

        <Sheet title="SVD">
          <ul>
            {zh ? (
              <>
                <li>
                  <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq>：旋轉 · 縮放 · 旋轉。
                </li>
                <li>
                  <Eq>{"V"}</Eq> ＝ <Eq>{"A^{\\mathsf T}A"}</Eq>{" "}
                  的特徵向量（右奇異向量）。
                </li>
                <li>
                  <Eq>{"\\sigma_i = \\sqrt{\\lambda_i(A^{\\mathsf T}A)}"}</Eq>，排序{" "}
                  <Eq>{"\\ge 0"}</Eq>。
                </li>
                <li>
                  <Eq>{"u_i = Av_i/\\sigma_i"}</Eq>（左奇異向量）。
                </li>
                <li>
                  秩 <Eq>{"k"}</Eq> 最佳擬合：保留{" "}
                  <Eq>{"\\sum \\sigma_i u_i v_i^{\\mathsf T}"}</Eq> 最大的 <Eq>{"k"}</Eq>{" "}
                  項。
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
          <Equation>
            {
              "A = \\sigma_1 u_1 v_1^{\\mathsf T} + \\sigma_2 u_2 v_2^{\\mathsf T} + \\cdots"
            }
          </Equation>
        </Sheet>

        <Sheet title={zh ? "矩陣與向量微積分" : "Matrix & vector calculus"}>
          <ul>
            {zh ? (
              <>
                <li>
                  梯度與變數同形：<Eq>{"\\nabla_x f \\in \\mathbb{R}^n"}</Eq>。
                </li>
                <li>
                  <Eq>{"\\nabla_x (a^{\\mathsf T}x) = a"}</Eq>、
                  <Eq>{"\\nabla_x \\|x\\|^2 = 2x"}</Eq>。
                </li>
                <li>
                  <Eq>{"\\nabla_x (x^{\\mathsf T}Ax) = (A + A^{\\mathsf T})x"}</Eq>
                  ；對稱時 <Eq>{"= 2Ax"}</Eq>。
                </li>
                <li>
                  最小平方：
                  <Eq>{"\\nabla_x \\tfrac12\\|Ax-b\\|^2 = A^{\\mathsf T}(Ax-b)"}</Eq>。
                </li>
                <li>
                  Jacobian：<Eq>{"J_{ij} = \\partial F_i/\\partial x_j"}</Eq>；
                  <Eq>{"\\partial(Wx)/\\partial x = W"}</Eq>。
                </li>
                <li>連鎖律／反向傳播＝各層 Jacobian 相乘。</li>
              </>
            ) : (
              <>
                <li>
                  Gradient matches the variable:{" "}
                  <Eq>{"\\nabla_x f \\in \\mathbb{R}^n"}</Eq>.
                </li>
                <li>
                  <Eq>{"\\nabla_x (a^{\\mathsf T}x) = a"}</Eq>,{" "}
                  <Eq>{"\\nabla_x \\|x\\|^2 = 2x"}</Eq>.
                </li>
                <li>
                  <Eq>{"\\nabla_x (x^{\\mathsf T}Ax) = (A + A^{\\mathsf T})x"}</Eq>;
                  symmetric ⇒ <Eq>{"2Ax"}</Eq>.
                </li>
                <li>
                  Least squares:{" "}
                  <Eq>{"\\nabla_x \\tfrac12\\|Ax-b\\|^2 = A^{\\mathsf T}(Ax-b)"}</Eq>.
                </li>
                <li>
                  Jacobian: <Eq>{"J_{ij} = \\partial F_i/\\partial x_j"}</Eq>;{" "}
                  <Eq>{"\\partial(Wx)/\\partial x = W"}</Eq>.
                </li>
                <li>Chain rule / backprop = product of per-layer Jacobians.</li>
              </>
            )}
          </ul>
        </Sheet>

        <Sheet title={zh ? "機器學習連結" : "ML connections"}>
          <ul>
            {zh ? (
              <>
                <li>
                  <strong>嵌入</strong>：嵌入矩陣的各列；以餘弦相似度比較。
                </li>
                <li>
                  <strong>稠密層</strong>：<Eq>{"y = \\sigma(Wx + b)"}</Eq>。
                </li>
                <li>
                  <strong>注意力</strong>：
                  <Eq>{"\\operatorname{softmax}(QK^{\\mathsf T}/\\sqrt{d_k})V"}</Eq>。
                </li>
                <li>
                  <strong>PCA</strong>：共變異數的特徵／SVD；最大成分＝最多變異。
                </li>
                <li>
                  <strong>壓縮／LoRA</strong>：低秩{" "}
                  <Eq>{"A \\approx U_k\\Sigma_k V_k^{\\mathsf T}"}</Eq>、
                  <Eq>{"\\Delta W = BA"}</Eq>。
                </li>
                <li>
                  <strong>GPU GEMM</strong>：<Eq>{"C = \\alpha AB + \\beta C"}</Eq>
                  ——大部分的運算。
                </li>
              </>
            ) : (
              <>
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
                  <strong>GPU GEMM</strong>: <Eq>{"C = \\alpha AB + \\beta C"}</Eq> — most
                  of the compute.
                </li>
              </>
            )}
          </ul>
        </Sheet>
      </Section>
    </Page>
  );
}
