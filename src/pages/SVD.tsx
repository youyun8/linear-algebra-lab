import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { MLCallout } from "../components/MLCallout";
import { SVDCalculator } from "../components/SVDCalculator";
import { Figure } from "../components/Figure";
import { SVDFigure } from "../components/diagrams";
import { Eq, Equation } from "../components/Equation";
import { svdQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

export function SVD() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="svd">
      <Section
        title={
          zh
            ? "直覺 — 每個矩陣都是三個簡單動作"
            : "Intuition — every matrix is three simple moves"
        }
      >
        {zh ? (
          <p>
            這是線性代數的大秘密：<em>任何</em>
            矩陣，無論多麼雜亂，在變換空間時都恰好依序做三件事：
          </p>
        ) : (
          <p>
            Here's the big secret of linear algebra: <em>any</em> matrix, no matter how
            messy, does exactly three things in a row when it transforms space:
          </p>
        )}
        <ol>
          {zh ? (
            <>
              <li>
                <strong>旋轉或反射</strong>（一個不改變長度的正交動作）——這是{" "}
                <Eq>{"V^{\\mathsf T}"}</Eq>。
              </li>
              <li>
                <strong>沿各軸拉伸</strong>非負的量——這是 <Eq>{"\\Sigma"}</Eq>。
              </li>
              <li>
                <strong>再次旋轉或反射</strong>——這是 <Eq>{"U"}</Eq>。
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ol>
        <Equation>{"A = U\\,\\Sigma\\,V^{\\mathsf T}"}</Equation>
        <Figure
          caption={
            zh ? (
              <>
                單位圓進、橢圓出。<Eq>{"V"}</Eq> 的各行是輸入方向，<Eq>{"U"}</Eq>{" "}
                的各行是輸出橢圓的軸，奇異值 <Eq>{"\\sigma_i"}</Eq> 是各軸的長度。
              </>
            ) : (
              <>
                A unit circle in, an ellipse out. The columns of <Eq>{"V"}</Eq> are the
                input directions, the columns of <Eq>{"U"}</Eq> are the axes of the output
                ellipse, and the singular values <Eq>{"\\sigma_i"}</Eq> are their lengths.
              </>
            )
          }
        >
          <SVDFigure />
        </Figure>
        <ConceptCard tone="intuition">
          {zh ? (
            <>
              一個單位圓進去，一個橢圓出來。SVD 找出該橢圓的軸（<Eq>{"U"}</Eq>{" "}
              的各行）、每個軸有多長（奇異值 <Eq>{"\\sigma_i"}</Eq>
              ），以及哪些輸入方向映射到它們（<Eq>{"V"}</Eq> 的各行）。
            </>
          ) : (
            <>
              A unit circle goes in, an ellipse comes out. SVD finds the axes of that
              ellipse (columns of <Eq>{"U"}</Eq>), how long each axis is (the singular
              values <Eq>{"\\sigma_i"}</Eq>), and which input directions map to them
              (columns of <Eq>{"V"}</Eq>).
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "定義" : "Definition"}>
        {zh ? (
          <p>
            對於任何 <Eq>{"m\\times n"}</Eq> 矩陣 <Eq>{"A"}</Eq>：
          </p>
        ) : (
          <p>
            For any <Eq>{"m\\times n"}</Eq> matrix <Eq>{"A"}</Eq>:
          </p>
        )}
        <Equation>
          {
            "A = U\\Sigma V^{\\mathsf T}, \\quad U^{\\mathsf T}U = I,\\ V^{\\mathsf T}V = I,\\ \\Sigma = \\operatorname{diag}(\\sigma_1 \\ge \\sigma_2 \\ge \\cdots \\ge 0)"
          }
        </Equation>
        {zh ? (
          <p>
            <Eq>{"\\sigma_i"}</Eq> 是<strong>奇異值</strong>；<Eq>{"U"}</Eq> 與{" "}
            <Eq>{"V"}</Eq> 的各行分別是<strong>左</strong>與<strong>右奇異向量</strong>
            。它們與特徵值的關聯如下：
          </p>
        ) : (
          <p>
            The <Eq>{"\\sigma_i"}</Eq> are the <strong>singular values</strong>; columns
            of <Eq>{"U"}</Eq> and <Eq>{"V"}</Eq> are the <strong>left</strong> and{" "}
            <strong>right singular vectors</strong>. They connect to eigenvalues like
            this:
          </p>
        )}
        <Equation>
          {
            "A^{\\mathsf T}A = V\\Sigma^{\\mathsf T}\\Sigma V^{\\mathsf T} \\Rightarrow \\text{eigenvalues of } A^{\\mathsf T}A = \\sigma_i^2"
          }
        </Equation>
      </Section>

      <Section title={zh ? "如何手算 2×2 的 SVD" : "How to compute a 2×2 SVD by hand"}>
        {zh ? (
          <p>作法（下方計算器完全依此進行）：</p>
        ) : (
          <p>The recipe (used exactly by the calculator below):</p>
        )}
        <ConceptCard tone="definition" title={zh ? "手算作法" : "The manual recipe"}>
          <ol style={{ margin: 0 }}>
            {zh ? (
              <>
                <li>
                  組出 <Eq>{"A^{\\mathsf T}A"}</Eq>（對稱、2×2）。
                </li>
                <li>
                  求它的特徵值 <Eq>{"\\lambda_1 \\ge \\lambda_2 \\ge 0"}</Eq>。
                </li>
                <li>
                  奇異值：<Eq>{"\\sigma_i = \\sqrt{\\lambda_i}"}</Eq>。
                </li>
                <li>
                  右奇異向量 <Eq>{"v_i"}</Eq>＝<Eq>{"A^{\\mathsf T}A"}</Eq> 的單位特徵向量
                  → <Eq>{"V"}</Eq> 的各行。
                </li>
                <li>
                  左奇異向量 <Eq>{"u_i = \\tfrac{1}{\\sigma_i} A v_i"}</Eq> →{" "}
                  <Eq>{"U"}</Eq> 的各行。
                </li>
                <li>
                  組合 <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq>。
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ol>
        </ConceptCard>
      </Section>

      <Section
        title={zh ? "詳解範例 — A = [[3,0],[4,5]]" : "Worked example — A = [[3,0],[4,5]]"}
      >
        <StepSolution
          reveal={false}
          steps={[
            {
              title: zh ? "組出 AᵀA" : "Form AᵀA",
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
              title: zh ? "AᵀA 的特徵值" : "Eigenvalues of AᵀA",
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
              title: zh ? "奇異值" : "Singular values",
              content: (
                <Equation>
                  {
                    "\\sigma_1 = \\sqrt{45} = 3\\sqrt5 \\approx 6.708,\\quad \\sigma_2 = \\sqrt5 \\approx 2.236"
                  }
                </Equation>
              ),
            },
            {
              title: zh ? "右奇異向量 V" : "Right singular vectors V",
              content: (
                <>
                  <p style={{ marginTop: 0 }}>
                    {zh ? (
                      <>
                        對稱矩陣 <Eq>{"A^{\\mathsf T}A"}</Eq> 的特徵向量沿{" "}
                        <Eq>{"(1,1)"}</Eq> 與 <Eq>{"(1,-1)"}</Eq>：
                      </>
                    ) : (
                      <>
                        Eigenvectors of the symmetric <Eq>{"A^{\\mathsf T}A"}</Eq> are
                        along <Eq>{"(1,1)"}</Eq> and <Eq>{"(1,-1)"}</Eq>:
                      </>
                    )}
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
              title: zh ? "左奇異向量 U" : "Left singular vectors U",
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
              title: zh ? "組合並驗證" : "Assemble and check",
              content: (
                <>
                  <Equation>
                    {
                      "A = U\\Sigma V^{\\mathsf T},\\quad \\Sigma = \\begin{bmatrix} 3\\sqrt5 & 0 \\\\ 0 & \\sqrt5\\end{bmatrix}"
                    }
                  </Equation>
                  <p style={{ margin: 0 }}>
                    {zh ? "相乘回去以還原 " : "Multiply back to recover "}
                    <Eq>{"\\begin{bmatrix}3&0\\\\4&5\\end{bmatrix}"}</Eq>
                    {zh
                      ? "。下方的計算器會以數值驗證這一點。"
                      : ". The calculator below verifies this numerically."}
                  </p>
                </>
              ),
            },
          ]}
        />
        <Hint label={zh ? "為什麼 u = Av/σ 有效？" : "Why does u = Av/σ work?"}>
          {zh ? (
            <>
              由 <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq> 得到 <Eq>{"AV = U\\Sigma"}</Eq>
              ，即 <Eq>{"Av_i = \\sigma_i u_i"}</Eq>。除以 <Eq>{"\\sigma_i"}</Eq>
              （當它非零時）即可還原每個左奇異向量。
            </>
          ) : (
            <>
              From <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq> we get{" "}
              <Eq>{"AV = U\\Sigma"}</Eq>, i.e. <Eq>{"Av_i = \\sigma_i u_i"}</Eq>. Divide
              by <Eq>{"\\sigma_i"}</Eq> (when nonzero) to recover each left singular
              vector.
            </>
          )}
        </Hint>
        <ConceptCard tone="mistake">
          {zh ? (
            <>
              奇異值是 <Eq>{"A^{\\mathsf T}A"}</Eq> 特徵值的<strong>平方根</strong>
              ，而非特徵值本身——而且它們恆 <Eq>
                {"\\ge 0"}
              </Eq>。另外要由大到小排序，並保持 <Eq>{"U"}</Eq> 與 <Eq>{"V"}</Eq>{" "}
              正規正交（各行為單位向量）。
            </>
          ) : (
            <>
              Singular values are the <strong>square roots</strong> of eigenvalues of{" "}
              <Eq>{"A^{\\mathsf T}A"}</Eq>, not the eigenvalues themselves — and they are
              always <Eq>{"\\ge 0"}</Eq>. Also order them largest-first, and keep{" "}
              <Eq>{"U"}</Eq> and <Eq>{"V"}</Eq> orthonormal (unit columns).
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "互動 SVD 計算器" : "Interactive SVD calculator"}>
        {zh ? (
          <p>
            輸入任意 2×2 矩陣。計算器會顯示 <Eq>{"A"}</Eq>、<Eq>{"A^{\\mathsf T}A"}</Eq>
            、它的特徵值、奇異值、右奇異向量 <Eq>{"V"}</Eq>、左奇異向量 <Eq>{"U"}</Eq>
            ，以及重建結果 <Eq>{"U\\Sigma V^{\\mathsf T}"}</Eq>。
          </p>
        ) : (
          <p>
            Enter any 2×2 matrix. The calculator shows <Eq>{"A"}</Eq>,{" "}
            <Eq>{"A^{\\mathsf T}A"}</Eq>, its eigenvalues, the singular values, the right
            singular vectors <Eq>{"V"}</Eq>, the left singular vectors <Eq>{"U"}</Eq>, and
            the reconstruction <Eq>{"U\\Sigma V^{\\mathsf T}"}</Eq>.
          </p>
        )}
        <SVDCalculator />
      </Section>

      <Section
        title={
          zh
            ? "低秩近似 — SVD 稱霸機器學習的原因"
            : "Low-rank approximation — the reason SVD rules ML"
        }
      >
        {zh ? (
          <p>
            把 <Eq>{"A"}</Eq> 寫成秩 1 片段的總和，由大到小：
          </p>
        ) : (
          <p>
            Write <Eq>{"A"}</Eq> as a sum of rank-1 pieces, biggest first:
          </p>
        )}
        <Equation>
          {
            "A = \\sigma_1 u_1 v_1^{\\mathsf T} + \\sigma_2 u_2 v_2^{\\mathsf T} + \\cdots"
          }
        </Equation>
        {zh ? (
          <p>
            只保留最大的 <Eq>{"k"}</Eq> 項，你就得到 <Eq>{"A_k"}</Eq>，即
            <strong>
              {" "}
              最佳的秩 <Eq>{"k"}</Eq> 近似
            </strong>
            （Eckart–Young
            定理）。如果那些小的奇異值很微小，你幾乎不會有損失，卻能儲存少得多的數字。
          </p>
        ) : (
          <p>
            Keep only the largest <Eq>{"k"}</Eq> terms and you get <Eq>{"A_k"}</Eq>, the
            <strong>
              {" "}
              best possible rank-<Eq>{"k"}</Eq> approximation
            </strong>{" "}
            (Eckart–Young theorem). If the small singular values are tiny, you lose almost
            nothing while storing far fewer numbers.
          </p>
        )}
      </Section>

      <Section title={zh ? "機器學習連結" : "ML connections"}>
        <MLCallout
          title={zh ? "PCA、壓縮、推薦、LoRA" : "PCA, compression, recommendation, LoRA"}
          reviewed="2026-07"
        >
          <ul style={{ margin: 0 }}>
            {zh ? (
              <>
                <li>
                  <strong>PCA</strong>＝置中資料矩陣的 SVD；右奇異向量是主成分，
                  <Eq>{"\\sigma_i^2"}</Eq> 是變異量。
                </li>
                <li>
                  <strong>影像壓縮</strong>：影像是一個矩陣；保留最大的 <Eq>{"k"}</Eq>{" "}
                  個奇異值即可縮小它，肉眼幾乎看不出損失。
                </li>
                <li>
                  <strong>推薦系統</strong>
                  ：把稀疏的使用者×項目評分矩陣分解成低秩的使用者與項目因子（潛在的喜好維度）。
                </li>
                <li>
                  <strong>低秩近似</strong>是通用工具；模型權重的奇異值往往快速衰減。
                </li>
                <li>
                  <strong>LoRA</strong>：在微調期間，不更新完整的權重矩陣 <Eq>{"W"}</Eq>
                  ，而是學習一個低秩修正 <Eq>{"\\Delta W = BA"}</Eq>（秩{" "}
                  <Eq>{"r \\ll"}</Eq> 維度），只訓練極小部分的參數。
                </li>
              </>
            ) : (
              <>
                <li>
                  <strong>PCA</strong> = SVD of the centered data matrix; right singular
                  vectors are principal components, <Eq>{"\\sigma_i^2"}</Eq> are
                  variances.
                </li>
                <li>
                  <strong>Image compression</strong>: an image is a matrix; keep the top{" "}
                  <Eq>{"k"}</Eq> singular values to shrink it with little visible loss.
                </li>
                <li>
                  <strong>Recommendation systems</strong>: factor the sparse user×item
                  ratings matrix into low-rank user and item factors (latent taste
                  dimensions).
                </li>
                <li>
                  <strong>Low-rank approximation</strong> is the general tool; model
                  weights often have rapidly decaying singular values.
                </li>
                <li>
                  <strong>LoRA</strong>: instead of updating a full weight matrix{" "}
                  <Eq>{"W"}</Eq> during fine-tuning, learn a low-rank correction{" "}
                  <Eq>{"\\Delta W = BA"}</Eq> (rank <Eq>{"r \\ll"}</Eq> dimensions),
                  training a tiny fraction of the parameters.
                </li>
              </>
            )}
          </ul>
        </MLCallout>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={zh ? "SVD — 概念檢查" : "SVD — concept check"}
          questions={svdQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
