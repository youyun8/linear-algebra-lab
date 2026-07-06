import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { MLCallout } from "../components/MLCallout";
import { Figure } from "../components/Figure";
import { AxesCompareFigure, FactorizationPipelinesFigure } from "../components/diagrams";
import { DiagVsSVDExplorer } from "../components/DiagVsSVDExplorer";
import { Eq, Equation } from "../components/Equation";
import { diagVsSvdQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

/**
 * Diagonalization vs. SVD — a comparison lesson. Both factor a matrix into its
 * "natural axes," but they apply to different matrices and give different
 * guarantees. The page contrasts them, shows the spectral-theorem bridge, and
 * lets students run both factorizations on the same matrix side by side.
 */
export function DiagVsSVD() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="diag-vs-svd">
      <Section
        title={
          zh ? "直覺 — 同一個問題的兩種答案" : "Intuition — two answers to one question"
        }
      >
        {zh ? (
          <p>
            對角化與 SVD 都在回答同一個問題：「這個矩陣的<em>自然軸</em>是什麼？」
            沿著這些軸，複雜的變換退化成單純的縮放。差別在於它們
            <strong>適用於哪些矩陣</strong>， 以及它們<strong>給出什麼保證</strong>。
          </p>
        ) : (
          <p>
            Diagonalization and SVD both answer the same question: "What are this matrix's{" "}
            <em>natural axes</em>?" Along those axes a messy transformation collapses into
            simple scaling. They differ in <strong>which matrices they apply to</strong>{" "}
            and <strong>what they guarantee</strong>.
          </p>
        )}
        <Figure
          caption={
            zh ? (
              <>
                對角化把 <Eq>{"A"}</Eq> 讀成「換到特徵基底 → 縮放 → 換回來」；SVD 讀成
                「旋轉／反射 → 非負拉伸 → 旋轉／反射」。上排的軸可能斜交，下排恆為正交。
              </>
            ) : (
              <>
                Diagonalization reads <Eq>{"A"}</Eq> as "to the eigenbasis → scale →
                back"; SVD reads it as "rotate/reflect → non-negative stretch →
                rotate/reflect." The top axes may be oblique; the bottom ones are always
                orthogonal.
              </>
            )
          }
        >
          <FactorizationPipelinesFigure />
        </Figure>
        <ConceptCard tone="intuition">
          {zh ? (
            <>
              一句話記住：<strong>對角化</strong>用<em>一組</em>
              （可能斜交的）特徵基底、允許負或複數的特徵值；
              <strong>SVD</strong>用<em>兩組</em>正規正交基底、奇異值恆為實數且非負。SVD
              是那個 「對稱化、隨時可用、永遠正交」的推廣版本。
            </>
          ) : (
            <>
              One line to remember it: <strong>diagonalization</strong> uses <em>one</em>{" "}
              (possibly oblique) eigenbasis with eigenvalues that can be negative or
              complex; <strong>SVD</strong> uses <em>two</em> orthonormal bases with
              singular values that are always real and non-negative. SVD is the
              "symmetrized, always-available, always-orthogonal" generalization.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "並排比較" : "Side by side"}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{zh ? "對角化 A = PDP⁻¹" : "Diagonalization A = PDP⁻¹"}</th>
              <th>{zh ? "SVD A = UΣVᵀ" : "SVD A = UΣVᵀ"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{zh ? "適用於" : "Applies to"}</th>
              <td>{zh ? "方陣、非虧損" : "square, non-defective"}</td>
              <td>
                {zh
                  ? "任意矩陣（含長方形、缺秩）"
                  : "any matrix (incl. rectangular, rank-deficient)"}
              </td>
            </tr>
            <tr>
              <th>{zh ? "基底" : "Bases"}</th>
              <td>
                {zh
                  ? "一組（P, P⁻¹），一般不正交"
                  : "one (P, P⁻¹), generally not orthogonal"}
              </td>
              <td>{zh ? "兩組（U, V），都正交" : "two (U, V), both orthogonal"}</td>
            </tr>
            <tr>
              <th>{zh ? "對角元素" : "Diagonal entries"}</th>
              <td>{zh ? "特徵值（可為負／複數）" : "eigenvalues (can be −/complex)"}</td>
              <td>{zh ? "奇異值（實數、≥ 0）" : "singular values (real, ≥ 0)"}</td>
            </tr>
            <tr>
              <th>{zh ? "逆映射" : "Inverse map"}</th>
              <td>
                <Eq>{"P^{-1} \\neq P^{\\mathsf T}"}</Eq>
                {zh ? "（一般情況）" : " in general"}
              </td>
              <td>
                <Eq>{"U^{-1} = U^{\\mathsf T},\\ V^{-1} = V^{\\mathsf T}"}</Eq>
              </td>
            </tr>
            <tr>
              <th>{zh ? "幾何" : "Geometry"}</th>
              <td>
                {zh ? "換基底 → 縮放 → 換回" : "change basis → scale → change back"}
              </td>
              <td>
                {zh
                  ? "旋轉/反射 → 拉伸 → 旋轉/反射"
                  : "rotate/reflect → stretch → rotate/reflect"}
              </td>
            </tr>
            <tr>
              <th>{zh ? "存在性可能失敗" : "Can fail to exist"}</th>
              <td>
                {zh ? "虧損或複數特徵值時" : "when defective or complex eigenvalues"}
              </td>
              <td>{zh ? "永不失敗" : "never"}</td>
            </tr>
            <tr>
              <th>{zh ? "對稱 PSD 情況" : "Symmetric PSD case"}</th>
              <td>
                <Eq>{"A = QDQ^{\\mathsf T}"}</Eq>
              </td>
              <td>{zh ? "完全相同：U = V = Q, σ = λ" : "identical: U = V = Q, σ = λ"}</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section
        title={
          zh ? "軸的形狀：斜交 vs 正交" : "The shape of the axes: oblique vs orthogonal"
        }
      >
        {zh ? (
          <p>
            這是兩者最直觀的差別。對角化的軸是<strong>特徵向量</strong>
            ——它們指出「只被縮放、不被轉向」的方向， 但彼此<em>不必垂直</em>。SVD
            的輸入軸是<strong>右奇異向量</strong>， 依建構方式<em>一定正交</em>。
          </p>
        ) : (
          <p>
            This is the most visual difference. Diagonalization's axes are{" "}
            <strong>eigenvectors</strong> — the directions that are only scaled, never
            turned — but they <em>need not be perpendicular</em>. SVD's input axes are the{" "}
            <strong>right singular vectors</strong>, which are <em>always orthogonal</em>{" "}
            by construction.
          </p>
        )}
        <Figure
          caption={
            zh ? (
              <>
                左：一般矩陣的特徵向量 <Eq>{"v_1, v_2"}</Eq>{" "}
                可以斜交。右：奇異向量恆彼此垂直。 當 <Eq>{"A"}</Eq>{" "}
                對稱時，左圖也會變成直角——兩者重合。
              </>
            ) : (
              <>
                Left: eigenvectors <Eq>{"v_1, v_2"}</Eq> of a general matrix can be
                oblique. Right: singular vectors are always perpendicular. When{" "}
                <Eq>{"A"}</Eq> is symmetric, the left picture also becomes a right angle —
                the two coincide.
              </>
            )
          }
        >
          <AxesCompareFigure />
        </Figure>
      </Section>

      <Section title={zh ? "橋樑：譜定理" : "The bridge: the spectral theorem"}>
        {zh ? (
          <p>
            兩者在<strong>對稱矩陣</strong>上相遇。若 <Eq>{"A = A^{\\mathsf T}"}</Eq>，
            則可用<em>正交</em>的 <Eq>{"P = Q"}</Eq> 對角化：
          </p>
        ) : (
          <p>
            The two meet on <strong>symmetric matrices</strong>. If{" "}
            <Eq>{"A = A^{\\mathsf T}"}</Eq>, it can be diagonalized with an{" "}
            <em>orthogonal</em> <Eq>{"P = Q"}</Eq>:
          </p>
        )}
        <Equation>
          {
            "A = Q D Q^{\\mathsf T}, \\quad Q^{\\mathsf T}Q = I, \\quad \\lambda_i \\in \\mathbb{R}"
          }
        </Equation>
        <ConceptCard
          tone="definition"
          title={zh ? "從 QDQᵀ 到 UΣVᵀ" : "From QDQᵀ to UΣVᵀ"}
        >
          {zh ? (
            <>
              <p style={{ marginTop: 0 }}>
                <Eq>{"A = QDQ^{\\mathsf T}"}</Eq> 已經<em>幾乎</em>是一個
                SVD，差別只在符號：
              </p>
              <ul style={{ margin: 0 }}>
                <li>
                  若所有 <Eq>{"\\lambda_i \\ge 0"}</Eq>（對稱<strong>半正定</strong>），則{" "}
                  <Eq>{"U = V = Q"}</Eq> 且 <Eq>{"\\sigma_i = \\lambda_i"}</Eq>——SVD ＝
                  對角化，一模一樣。
                </li>
                <li>
                  若某個 <Eq>{"\\lambda_i < 0"}</Eq>，把負號推進 <Eq>{"U"}</Eq>：
                  <Eq>{"\\sigma_i = |\\lambda_i|"}</Eq>，且 <Eq>{"U"}</Eq> 對應那一行取{" "}
                  <Eq>{"-q_i"}</Eq>。
                </li>
              </ul>
            </>
          ) : (
            <>
              <p style={{ marginTop: 0 }}>
                <Eq>{"A = QDQ^{\\mathsf T}"}</Eq> is <em>already</em> an SVD, up to signs:
              </p>
              <ul style={{ margin: 0 }}>
                <li>
                  If all <Eq>{"\\lambda_i \\ge 0"}</Eq> (symmetric{" "}
                  <strong>positive-semidefinite</strong>), then <Eq>{"U = V = Q"}</Eq> and{" "}
                  <Eq>{"\\sigma_i = \\lambda_i"}</Eq> — SVD = diagonalization, exactly.
                </li>
                <li>
                  If some <Eq>{"\\lambda_i < 0"}</Eq>, push the sign into <Eq>{"U"}</Eq>:{" "}
                  <Eq>{"\\sigma_i = |\\lambda_i|"}</Eq> and that column of <Eq>{"U"}</Eq>{" "}
                  becomes <Eq>{"-q_i"}</Eq>.
                </li>
              </ul>
            </>
          )}
        </ConceptCard>
      </Section>

      <Section
        title={zh ? "一般矩陣的精確連結" : "The precise connection for a general A"}
      >
        {zh ? (
          <p>
            對任意 <Eq>{"A"}</Eq>，SVD 其實是對你能由 <Eq>{"A"}</Eq> 造出的兩個
            <strong>對稱</strong>矩陣做對角化：
          </p>
        ) : (
          <p>
            For any <Eq>{"A"}</Eq>, the SVD is really diagonalization applied to the two{" "}
            <strong>symmetric</strong> matrices you can build from <Eq>{"A"}</Eq>:
          </p>
        )}
        <Equation>
          {
            "A^{\\mathsf T}A = V\\,\\Sigma^2\\,V^{\\mathsf T}, \\qquad A A^{\\mathsf T} = U\\,\\Sigma^2\\,U^{\\mathsf T}"
          }
        </Equation>
        {zh ? (
          <p>
            右奇異向量 <Eq>{"V"}</Eq> ＝ <Eq>{"A^{\\mathsf T}A"}</Eq>{" "}
            的特徵向量、左奇異向量 <Eq>{"U"}</Eq> ＝ <Eq>{"AA^{\\mathsf T}"}</Eq>{" "}
            的特徵向量，而 <Eq>{"\\sigma_i^2 = \\lambda_i(A^{\\mathsf T}A)"}</Eq>。所以
            SVD 就是對 <Eq>{"A^{\\mathsf T}A"}</Eq>／<Eq>{"AA^{\\mathsf T}"}</Eq>{" "}
            做特徵對角化——正是 SVD 頁面上的手算作法。
          </p>
        ) : (
          <p>
            The right singular vectors <Eq>{"V"}</Eq> are the eigenvectors of{" "}
            <Eq>{"A^{\\mathsf T}A"}</Eq>, the left singular vectors <Eq>{"U"}</Eq> are the
            eigenvectors of <Eq>{"AA^{\\mathsf T}"}</Eq>, and{" "}
            <Eq>{"\\sigma_i^2 = \\lambda_i(A^{\\mathsf T}A)"}</Eq>. So SVD reduces to
            eigen-diagonalizing <Eq>{"A^{\\mathsf T}A"}</Eq> /{" "}
            <Eq>{"AA^{\\mathsf T}"}</Eq> — exactly the manual recipe on the SVD page.
          </p>
        )}
        <Hint
          label={zh ? "為什麼特徵值變成平方？" : "Why do the eigenvalues get squared?"}
        >
          {zh ? (
            <>
              代入 <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq>：
              <Eq>
                {
                  "A^{\\mathsf T}A = V\\Sigma U^{\\mathsf T} U \\Sigma V^{\\mathsf T} = V\\Sigma^2 V^{\\mathsf T}"
                }
              </Eq>
              （因為 <Eq>{"U^{\\mathsf T}U = I"}</Eq>）。所以 <Eq>{"A^{\\mathsf T}A"}</Eq>{" "}
              的特徵值是 <Eq>{"\\sigma_i^2"}</Eq>，這也解釋了{" "}
              <Eq>{"\\sigma_i = \\sqrt{\\lambda_i}"}</Eq>。
            </>
          ) : (
            <>
              Substitute <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq>:{" "}
              <Eq>
                {
                  "A^{\\mathsf T}A = V\\Sigma U^{\\mathsf T} U \\Sigma V^{\\mathsf T} = V\\Sigma^2 V^{\\mathsf T}"
                }
              </Eq>{" "}
              (because <Eq>{"U^{\\mathsf T}U = I"}</Eq>). So the eigenvalues of{" "}
              <Eq>{"A^{\\mathsf T}A"}</Eq> are <Eq>{"\\sigma_i^2"}</Eq>, which is why{" "}
              <Eq>{"\\sigma_i = \\sqrt{\\lambda_i}"}</Eq>.
            </>
          )}
        </Hint>
      </Section>

      <Section
        title={
          zh
            ? "互動：對同一個矩陣做兩種分解"
            : "Interactive: both factorizations, one matrix"
        }
      >
        {zh ? (
          <p>
            輸入任意 2×2 矩陣，同時看到 <Eq>{"A = PDP^{-1}"}</Eq> 與{" "}
            <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq>
            。圖上：藍色實線是右奇異向量（恆正交），
            橙色虛線是特徵向量方向，綠色橢圓是單位圓的像。試試各個預設，注意特徵軸何時與奇異軸重合、
            以及對角化何時直接放棄（虧損或旋轉）。
          </p>
        ) : (
          <p>
            Enter any 2×2 matrix and watch both <Eq>{"A = PDP^{-1}"}</Eq> and{" "}
            <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq> at once. In the plot: blue solid
            lines are the right singular vectors (always orthogonal), orange dashed lines
            are the eigenvector directions, and the green ellipse is the image of the unit
            circle. Try the presets and watch when the eigen-axes line up with the
            singular axes — and when diagonalization gives up entirely (defective or
            rotation).
          </p>
        )}
        <DiagVsSVDExplorer />
      </Section>

      <Section
        title={
          zh
            ? "詳解範例 — 對稱且含負特徵值"
            : "Worked example — symmetric with a negative eigenvalue"
        }
      >
        {zh ? (
          <p>
            取 <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 1 \\end{bmatrix}"}</Eq>
            （對稱但非半正定）。看看負特徵值如何在 SVD 裡變成一個正奇異值。
          </p>
        ) : (
          <p>
            Take <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 1 \\end{bmatrix}"}</Eq>{" "}
            (symmetric but not PSD). Watch the negative eigenvalue turn into a positive
            singular value.
          </p>
        )}
        <StepSolution
          reveal={false}
          steps={[
            {
              title: zh ? "特徵值（對角化）" : "Eigenvalues (diagonalization)",
              content: (
                <Equation>
                  {
                    "\\operatorname{tr}=2,\\ \\det=-3 \\Rightarrow \\lambda^2 - 2\\lambda - 3 = 0 \\Rightarrow \\lambda = 3,\\,-1"
                  }
                </Equation>
              ),
            },
            {
              title: zh ? "正交特徵向量" : "Orthonormal eigenvectors",
              content: (
                <>
                  <Equation>
                    {
                      "q_1 = \\tfrac{1}{\\sqrt2}(1,1)\\ (\\lambda=3),\\quad q_2 = \\tfrac{1}{\\sqrt2}(1,-1)\\ (\\lambda=-1)"
                    }
                  </Equation>
                  <p style={{ margin: 0 }}>
                    {zh
                      ? "它們正交（譜定理保證），所以 A = QDQᵀ。"
                      : "They are orthogonal (spectral theorem), so A = QDQᵀ."}
                  </p>
                </>
              ),
            },
            {
              title: zh ? "轉成奇異值" : "Convert to singular values",
              content: (
                <>
                  <Equation>
                    {"\\sigma_1 = |3| = 3, \\quad \\sigma_2 = |-1| = 1"}
                  </Equation>
                  <p style={{ margin: 0 }}>
                    {zh ? (
                      <>
                        <Eq>{"\\lambda_2 = -1 < 0"}</Eq>，把負號推進 <Eq>{"U"}</Eq>：
                        <Eq>{"u_2 = -q_2"}</Eq>，而 <Eq>{"u_1 = q_1"}</Eq>、
                        <Eq>{"V = Q"}</Eq>。
                      </>
                    ) : (
                      <>
                        Since <Eq>{"\\lambda_2 = -1 < 0"}</Eq>, push the sign into{" "}
                        <Eq>{"U"}</Eq>: <Eq>{"u_2 = -q_2"}</Eq>, with{" "}
                        <Eq>{"u_1 = q_1"}</Eq> and <Eq>{"V = Q"}</Eq>.
                      </>
                    )}
                  </p>
                </>
              ),
            },
            {
              title: zh ? "兩種分解" : "Both factorizations",
              content: (
                <>
                  <Equation>
                    {
                      "A = Q\\begin{bmatrix}3&0\\\\0&-1\\end{bmatrix}Q^{\\mathsf T} = U\\begin{bmatrix}3&0\\\\0&1\\end{bmatrix}V^{\\mathsf T}"
                    }
                  </Equation>
                  <p style={{ margin: 0 }}>
                    {zh
                      ? "對角化保留符號資訊；SVD 把它藏進了正交矩陣 U。"
                      : "Diagonalization keeps the sign; SVD hides it inside the orthogonal U."}
                  </p>
                </>
              ),
            },
          ]}
        />
        <ConceptCard tone="mistake">
          {zh ? (
            <>
              常見誤解：以為「對稱 ⇒ SVD 與對角化完全相同」。只有在<strong>半正定</strong>
              （所有 <Eq>{"\\lambda_i \\ge 0"}</Eq>）時才逐項相等。有負特徵值時， 奇異值是
              <em>絕對值</em>，且 <Eq>{"U \\neq V"}</Eq>。
            </>
          ) : (
            <>
              Common trap: assuming "symmetric ⇒ SVD equals diagonalization." They match
              entry-for-entry only when <strong>positive-semidefinite</strong> (all{" "}
              <Eq>{"\\lambda_i \\ge 0"}</Eq>). With a negative eigenvalue the singular
              values are <em>absolute values</em> and <Eq>{"U \\neq V"}</Eq>.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "何時該用哪一個" : "Which one to reach for"}>
        <div className="dvs-grid">
          <ConceptCard
            tone="example"
            title={zh ? "選對角化，當你要……" : "Diagonalize when you want…"}
          >
            <ul style={{ margin: 0 }}>
              {zh ? (
                <>
                  <li>
                    矩陣<strong>冪次</strong> <Eq>{"A^k = PD^kP^{-1}"}</Eq>、矩陣指數{" "}
                    <Eq>{"e^A"}</Eq>。
                  </li>
                  <li>解線性遞迴／微分方程組（模態分解）。</li>
                  <li>
                    分析長期動態：最大的 <Eq>{"|\\lambda|"}</Eq> 主導。
                  </li>
                  <li>對稱矩陣的 PCA（共變異數的特徵分解）。</li>
                </>
              ) : (
                <>
                  <li>
                    Matrix <strong>powers</strong> <Eq>{"A^k = PD^kP^{-1}"}</Eq> and the
                    exponential <Eq>{"e^A"}</Eq>.
                  </li>
                  <li>
                    Solving linear recurrences / systems of ODEs (modal decomposition).
                  </li>
                  <li>
                    Long-run dynamics: the largest <Eq>{"|\\lambda|"}</Eq> dominates.
                  </li>
                  <li>PCA on a symmetric covariance matrix.</li>
                </>
              )}
            </ul>
          </ConceptCard>
          <ConceptCard
            tone="example"
            title={zh ? "選 SVD，當你要……" : "Use SVD when you want…"}
          >
            <ul style={{ margin: 0 }}>
              {zh ? (
                <>
                  <li>
                    <strong>長方形</strong>或缺秩矩陣——對角化根本用不了。
                  </li>
                  <li>
                    <strong>低秩近似</strong>／壓縮（Eckart–Young）。
                  </li>
                  <li>
                    秩、值域、零空間、<strong>偽逆</strong>、條件數。
                  </li>
                  <li>數值穩定性——正交因子不會放大誤差。</li>
                  <li>PCA（對資料矩陣直接做，不必先組共變異數）、推薦系統、LoRA。</li>
                </>
              ) : (
                <>
                  <li>
                    <strong>Rectangular</strong> or rank-deficient matrices —
                    diagonalization can't apply.
                  </li>
                  <li>
                    <strong>Low-rank approximation</strong> / compression (Eckart–Young).
                  </li>
                  <li>
                    Rank, range, null space, the <strong>pseudo-inverse</strong>,
                    condition number.
                  </li>
                  <li>Numerical stability — orthogonal factors don't amplify error.</li>
                  <li>
                    PCA (straight on the data matrix), recommendation systems, LoRA.
                  </li>
                </>
              )}
            </ul>
          </ConceptCard>
        </div>
      </Section>

      <Section title={zh ? "機器學習連結" : "ML connection"}>
        <MLCallout
          title={zh ? "為什麼 ML 幾乎總是選 SVD" : "Why ML almost always reaches for SVD"}
          reviewed="2026-07"
        >
          {zh ? (
            <p>
              真實資料矩陣通常是長方形、含雜訊、且可能缺秩——對角化在這裡根本不適用， 但
              SVD 永遠存在，還給你正交因子與有序的奇異值。PCA 可寫成置中資料矩陣的 SVD；
              壓縮與 <Eq>{"\\Delta W = BA"}</Eq> 形式的 LoRA 依賴低秩截斷；偽逆{" "}
              <Eq>{"A^+ = V\\Sigma^+U^{\\mathsf T}"}</Eq>
              給出最小平方解。對角化仍在對稱情境發光：共變異數的特徵分解、二次型、以及理解重複相乘的動態。
            </p>
          ) : (
            <p>
              Real data matrices are usually rectangular, noisy, and possibly
              rank-deficient — diagonalization simply doesn't apply, but the SVD always
              exists and hands you orthogonal factors with ordered singular values. PCA is
              the SVD of the centered data matrix; compression and LoRA's{" "}
              <Eq>{"\\Delta W = BA"}</Eq> rely on low-rank truncation; the pseudo-inverse{" "}
              <Eq>{"A^+ = V\\Sigma^+U^{\\mathsf T}"}</Eq> gives least-squares solutions.
              Diagonalization still shines in the symmetric world: covariance
              eigen-decomposition, quadratic forms, and understanding the dynamics of
              repeated multiplication.
            </p>
          )}
        </MLCallout>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={
            zh ? "對角化 vs SVD — 概念檢查" : "Diagonalization vs SVD — concept check"
          }
          questions={diagVsSvdQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
