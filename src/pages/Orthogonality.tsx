import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { MLCallout } from "../components/MLCallout";
import { VectorCanvas } from "../components/VectorCanvas";
import { Figure } from "../components/Figure";
import { ProjectionFigure, OrthogonalMatrixFigure } from "../components/diagrams";
import { Eq, Equation } from "../components/Equation";
import { orthogonalityQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

export function Orthogonality() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="orthogonality">
      <Section title={zh ? "直覺" : "Intuition"}>
        {zh ? (
          <p>
            當兩個向量的內積為零時，它們正交（垂直）。正交性是「沒有重疊」的幾何——一個正交方向所攜帶的資訊，是另一個所沒有的。應用線性代數中最有用的一招是
            <strong>投影</strong>：透過作一條垂線，找出子空間中最接近目標的點。
          </p>
        ) : (
          <p>
            Two vectors are orthogonal (perpendicular) when their dot product is zero.
            Orthogonality is the geometry of "no overlap" — an orthogonal direction
            carries information the other doesn't. The single most useful move in applied
            linear algebra is <strong>projection</strong>: find the closest point in a
            subspace to a target, by dropping a perpendicular.
          </p>
        )}
        <ConceptCard tone="intuition">
          {zh ? (
            <>
              最小平方法＝「我無法精確命中目標，所以我瞄準我<em>能</em>
              到達的最接近的點。」那個最接近的點，就是目標在可達集合（行空間）上的正交投影。
            </>
          ) : (
            <>
              Least squares = "I can't hit the target exactly, so I'll aim for the closest
              point I <em>can</em> reach." That closest point is the orthogonal projection
              of the target onto the reachable set (the column space).
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "定義" : "Definition"}>
        {zh ? (
          <p>
            正交：<Eq>{"a \\cdot b = 0"}</Eq>。把 <Eq>{"b"}</Eq> 投影到單一向量{" "}
            <Eq>{"a"}</Eq> 上：
          </p>
        ) : (
          <p>
            Orthogonal: <Eq>{"a \\cdot b = 0"}</Eq>. Projection of <Eq>{"b"}</Eq> onto a
            single vector <Eq>{"a"}</Eq>:
          </p>
        )}
        <Equation>
          {"\\operatorname{proj}_a(b) = \\frac{a\\cdot b}{a\\cdot a}\\,a"}
        </Equation>
        {zh ? (
          <p>
            對於整個子空間＝<Eq>{"A"}</Eq> 的行空間，<Eq>{"Ax \\approx b"}</Eq>{" "}
            的最小平方解由
            <strong>正規方程</strong>求得：
          </p>
        ) : (
          <p>
            For a full subspace = column space of <Eq>{"A"}</Eq>, the least-squares
            solution to <Eq>{"Ax \\approx b"}</Eq> solves the{" "}
            <strong>normal equations</strong>:
          </p>
        )}
        <Equation>{"A^{\\mathsf T}A\\,\\hat{x} = A^{\\mathsf T}b"}</Equation>
        <Figure
          caption={
            zh ? (
              <>
                投影 <Eq>{"p"}</Eq> 是 <Eq>{"b"}</Eq> 在行空間 <Eq>{"C(A)"}</Eq>{" "}
                上最接近的點；誤差 <Eq>{"e = b - p"}</Eq>{" "}
                與該子空間垂直。這個「垂直」正是正規方程的來源。
              </>
            ) : (
              <>
                The projection <Eq>{"p"}</Eq> is the closest point to <Eq>{"b"}</Eq> in
                the column space <Eq>{"C(A)"}</Eq>; the error <Eq>{"e = b - p"}</Eq> is
                perpendicular to that subspace. That right angle is exactly what the
                normal equations encode.
              </>
            )
          }
        >
          <ProjectionFigure />
        </Figure>
        {zh ? (
          <p>
            <strong>正規正交</strong>集合由單位長度、彼此垂直的向量組成。
            <strong>Gram–Schmidt</strong> 藉由減去投影，從任何基底建立出一組正規正交集合：
          </p>
        ) : (
          <p>
            An <strong>orthonormal</strong> set has unit-length, mutually perpendicular
            vectors. <strong>Gram–Schmidt</strong> builds one from any basis by
            subtracting off projections:
          </p>
        )}
        <Equation>
          {
            "q_k = \\frac{v_k - \\sum_{j<k} (v_k\\cdot q_j)\\,q_j}{\\left\\| v_k - \\sum_{j<k}(v_k\\cdot q_j)\\,q_j \\right\\|}"
          }
        </Equation>
      </Section>

      <Section
        title={zh ? "小範例 — 最小平方直線" : "Small example — least squares line"}
      >
        {zh ? (
          <p>
            將 <Eq>{"y = mx"}</Eq> 擬合通過點 <Eq>{"(1,1), (2,2), (3,2)"}</Eq>。此處{" "}
            <Eq>{"A = (1,2,3)^{\\mathsf T}"}</Eq>、<Eq>{"b = (1,2,2)^{\\mathsf T}"}</Eq>。
          </p>
        ) : (
          <p>
            Fit <Eq>{"y = mx"}</Eq> through points <Eq>{"(1,1), (2,2), (3,2)"}</Eq>. Here{" "}
            <Eq>{"A = (1,2,3)^{\\mathsf T}"}</Eq>, <Eq>{"b = (1,2,2)^{\\mathsf T}"}</Eq>.
          </p>
        )}
        <Equation>
          {"A^{\\mathsf T}A = 1^2+2^2+3^2 = 14, \\quad A^{\\mathsf T}b = 1+4+6 = 11"}
        </Equation>
        <Equation>{"\\hat m = \\frac{11}{14} \\approx 0.786"}</Equation>
        {zh ? (
          <p>最佳擬合斜率使垂直方向的平方誤差總和最小。</p>
        ) : (
          <p>The best-fit slope minimizes the total squared vertical error.</p>
        )}
      </Section>

      <Section title={zh ? "手算 — Gram–Schmidt" : "Manual calculation — Gram–Schmidt"}>
        {zh ? (
          <p>
            將 <Eq>{"v_1 = (1,1,0)"}</Eq>、<Eq>{"v_2 = (1,0,1)"}</Eq> 正規正交化。
          </p>
        ) : (
          <p>
            Orthonormalize <Eq>{"v_1 = (1,1,0)"}</Eq>, <Eq>{"v_2 = (1,0,1)"}</Eq>.
          </p>
        )}
        <Hint label={zh ? "提示" : "Hint"}>
          {zh ? (
            <>
              先把 <Eq>{"v_1"}</Eq> 正規化得到 <Eq>{"q_1"}</Eq>。再減去 <Eq>{"v_2"}</Eq>{" "}
              沿 <Eq>{"q_1"}</Eq> 的分量，並把剩下的部分正規化。
            </>
          ) : (
            <>
              First normalize <Eq>{"v_1"}</Eq> to get <Eq>{"q_1"}</Eq>. Then subtract the
              part of <Eq>{"v_2"}</Eq> along <Eq>{"q_1"}</Eq> and normalize what remains.
            </>
          )}
        </Hint>
        <StepSolution
          steps={[
            {
              title: "q₁",
              content: <Equation>{"q_1 = \\tfrac{1}{\\sqrt2}(1,1,0)"}</Equation>,
            },
            {
              title: zh ? "移除沿 q₁ 的分量" : "Remove component along q₁",
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
              title: zh ? "正規化" : "Normalize",
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
              title: zh ? "檢查" : "Check",
              content: (
                <p style={{ margin: 0 }}>
                  <Eq>{"q_1 \\cdot q_2 = 0"}</Eq> ✓{" "}
                  {zh
                    ? "，且兩者都是單位長度。生成空間相同，現已正規正交。"
                    : "and both are unit length. Same span, now orthonormal."}
                </p>
              ),
            },
          ]}
        />
        <ConceptCard tone="mistake">
          {zh ? (
            <>
              在正規方程中，你要在<em>兩</em>邊的左側都乘上 <Eq>{"A^{\\mathsf T}"}</Eq>
              。常見的錯誤是忘了轉置，或試圖直接對非方陣 <Eq>{"A"}</Eq>{" "}
              求逆——你辦不到；這正是我們要組出方陣 <Eq>{"A^{\\mathsf T}A"}</Eq> 的原因。
            </>
          ) : (
            <>
              In the normal equations you multiply by <Eq>{"A^{\\mathsf T}"}</Eq> on the
              left of
              <em>both</em> sides. A frequent error is forgetting the transpose or trying
              to invert a non-square <Eq>{"A"}</Eq> directly — you can't; that's why we
              form the square matrix <Eq>{"A^{\\mathsf T}A"}</Eq>.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "正交矩陣" : "Orthogonal matrices"}>
        {zh ? (
          <p>
            當 Gram–Schmidt 得到的正規正交向量成為一個方陣 <Eq>{"Q"}</Eq>{" "}
            的各行時，這個矩陣就特別好用。<strong>正交矩陣</strong>
            是各行（因而各列也）構成正規正交集合的方陣。用一條方程就能總括：
          </p>
        ) : (
          <p>
            When the orthonormal vectors from Gram–Schmidt become the columns of a square
            matrix <Eq>{"Q"}</Eq>, that matrix is especially nice to work with. An{" "}
            <strong>orthogonal matrix</strong> is a square matrix whose columns (and
            therefore rows) form an orthonormal set. One equation captures it:
          </p>
        )}
        <Equation>
          {
            "Q^{\\mathsf T}Q = Q\\,Q^{\\mathsf T} = I \\quad\\Longleftrightarrow\\quad Q^{-1} = Q^{\\mathsf T}"
          }
        </Equation>
        <ConceptCard tone="definition" title={zh ? "核心性質" : "Key properties"}>
          <ul style={{ margin: 0 }}>
            {zh ? (
              <>
                <li>
                  <strong>逆矩陣是免費的：</strong>
                  <Eq>{"Q^{-1} = Q^{\\mathsf T}"}</Eq>——不需要做消去法。
                </li>
                <li>
                  <strong>保長度（等距）：</strong>
                  <Eq>{"\\|Qx\\| = \\|x\\|"}</Eq>，因為{" "}
                  <Eq>
                    {"\\|Qx\\|^2 = x^{\\mathsf T}Q^{\\mathsf T}Qx = x^{\\mathsf T}x"}
                  </Eq>
                  。
                </li>
                <li>
                  <strong>保內積與夾角：</strong>
                  <Eq>{"(Qx)\\cdot(Qy) = x\\cdot y"}</Eq>——正交性因此被保留。
                </li>
                <li>
                  <strong>行列式為 </strong>
                  <Eq>{"\\det Q = \\pm 1"}</Eq>：<Eq>{"+1"}</Eq> 是旋轉，<Eq>{"-1"}</Eq>{" "}
                  是反射。
                </li>
                <li>
                  <strong>封閉性：</strong>
                  兩個正交矩陣的乘積仍是正交矩陣；其特徵值的絕對值皆為 1。
                </li>
              </>
            ) : (
              <>
                <li>
                  <strong>The inverse is free:</strong>{" "}
                  <Eq>{"Q^{-1} = Q^{\\mathsf T}"}</Eq> — no elimination needed.
                </li>
                <li>
                  <strong>Length-preserving (an isometry):</strong>{" "}
                  <Eq>{"\\|Qx\\| = \\|x\\|"}</Eq>, since{" "}
                  <Eq>
                    {"\\|Qx\\|^2 = x^{\\mathsf T}Q^{\\mathsf T}Qx = x^{\\mathsf T}x"}
                  </Eq>
                  .
                </li>
                <li>
                  <strong>Dot-product- and angle-preserving:</strong>{" "}
                  <Eq>{"(Qx)\\cdot(Qy) = x\\cdot y"}</Eq> — so orthogonality survives.
                </li>
                <li>
                  <strong>Determinant </strong>
                  <Eq>{"\\det Q = \\pm 1"}</Eq>: <Eq>{"+1"}</Eq> is a rotation,{" "}
                  <Eq>{"-1"}</Eq> a reflection.
                </li>
                <li>
                  <strong>Closed under products:</strong> a product of orthogonal matrices
                  is orthogonal; every eigenvalue has absolute value 1.
                </li>
              </>
            )}
          </ul>
        </ConceptCard>
        <Figure
          caption={
            zh ? (
              <>
                正交矩陣只會<strong>旋轉或反射</strong>
                ——長度與夾角不變，所以單位圓映射到單位圓。
                <Eq>{"\\det = +1"}</Eq> 是純旋轉；<Eq>{"\\det = -1"}</Eq>{" "}
                則翻轉了定向（一次反射）。
              </>
            ) : (
              <>
                An orthogonal matrix only <strong>rotates or reflects</strong> — lengths
                and angles are untouched, so the unit circle maps to the unit circle.{" "}
                <Eq>{"\\det = +1"}</Eq> is a pure rotation; <Eq>{"\\det = -1"}</Eq> flips
                orientation (a reflection).
              </>
            )
          }
        >
          <OrthogonalMatrixFigure />
        </Figure>
        {zh ? (
          <p>
            <strong>小範例。</strong>逆時針旋轉 <Eq>{"\\theta"}</Eq> 的矩陣是正交的：
          </p>
        ) : (
          <p>
            <strong>Small example.</strong> The counter-clockwise rotation by{" "}
            <Eq>{"\\theta"}</Eq> is orthogonal:
          </p>
        )}
        <Equation>
          {
            "Q = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}, \\quad Q^{\\mathsf T}Q = \\begin{bmatrix} \\cos^2\\theta + \\sin^2\\theta & 0 \\\\ 0 & \\cos^2\\theta + \\sin^2\\theta \\end{bmatrix} = I"
          }
        </Equation>
        {zh ? (
          <p>
            各行是單位向量 <Eq>{"(\\cos\\theta, \\sin\\theta)"}</Eq> 與{" "}
            <Eq>{"(-\\sin\\theta, \\cos\\theta)"}</Eq>，彼此垂直，<Eq>{"\\det Q = 1"}</Eq>
            。把 <Eq>{"-\\sin\\theta"}</Eq> 那一行改號就會得到一個 <Eq>{"\\det = -1"}</Eq>{" "}
            的反射。
          </p>
        ) : (
          <p>
            The columns are the unit vectors <Eq>{"(\\cos\\theta, \\sin\\theta)"}</Eq> and{" "}
            <Eq>{"(-\\sin\\theta, \\cos\\theta)"}</Eq>, perpendicular to each other, with{" "}
            <Eq>{"\\det Q = 1"}</Eq>. Flipping the sign of that second column instead
            gives a reflection with <Eq>{"\\det = -1"}</Eq>.
          </p>
        )}
        <ConceptCard tone="mistake">
          {zh ? (
            <>
              「正交矩陣」要求各行是<em>單位長度</em>
              （正規正交），不只是彼此垂直。若各行僅正交但未正規化，則{" "}
              <Eq>{"Q^{\\mathsf T}Q"}</Eq> 會是對角矩陣但不是 <Eq>{"I"}</Eq>
              ——這時 <Eq>{"Q^{-1} \\neq Q^{\\mathsf T}"}</Eq>。
            </>
          ) : (
            <>
              An "orthogonal matrix" needs columns that are <em>unit length</em>{" "}
              (orthonormal), not merely perpendicular. If the columns are orthogonal but
              not normalized, <Eq>{"Q^{\\mathsf T}Q"}</Eq> is diagonal but not{" "}
              <Eq>{"I"}</Eq> — and then <Eq>{"Q^{-1} \\neq Q^{\\mathsf T}"}</Eq>.
            </>
          )}
        </ConceptCard>
        <MLCallout
          title={zh ? "為什麼機器學習偏愛正交矩陣" : "Why ML loves orthogonal matrices"}
          reviewed="2026-07"
        >
          {zh ? (
            <>
              <p>
                正交矩陣<strong>不改變長度</strong>
                ，因此在反覆相乘時不會放大或縮小訊號——這正是 SVD 的 <Eq>{"U"}</Eq>、
                <Eq>{"V"}</Eq>（第 9 節）、QR 分解，以及 PCA 白化都以它們為骨架的原因。
              </p>
              <p>
                在深度學習中，<strong>正交初始化</strong>
                與對權重的正交性約束能維持梯度的範數，緩解梯度爆炸／消失——這是保長度性質的直接後果。
              </p>
            </>
          ) : (
            <>
              <p>
                Because an orthogonal matrix <strong>never changes lengths</strong>, it
                won't amplify or shrink a signal under repeated multiplication — which is
                why they are the backbone of the <Eq>{"U"}</Eq>, <Eq>{"V"}</Eq> in SVD
                (Section 9), the QR factorization, and PCA whitening.
              </p>
              <p>
                In deep learning, <strong>orthogonal initialization</strong> and
                orthogonality constraints on weights preserve the norm of gradients,
                easing exploding/vanishing gradients — a direct consequence of the
                length-preserving property.
              </p>
            </>
          )}
        </MLCallout>
      </Section>

      <Section title={zh ? "互動示範" : "Interactive demo"}>
        {zh ? (
          <p>
            再次使用向量遊樂場：拖動使 <Eq>{"a\\cdot b = 0"}</Eq>
            （垂直），並觀察投影（橙色）縮小到消失。那個「沒有影子」的情況，正是正交性的核心。
          </p>
        ) : (
          <p>
            Reuse the vector playground: drag so that <Eq>{"a\\cdot b = 0"}</Eq>{" "}
            (perpendicular) and watch the projection (orange) shrink to nothing. That "no
            shadow" case is the heart of orthogonality.
          </p>
        )}
        <VectorCanvas />
      </Section>

      <Section title={zh ? "機器學習連結：線性迴歸" : "ML connection: linear regression"}>
        <MLCallout
          title={
            zh
              ? "最小平方法＝最初的機器學習模型"
              : "Least squares = the original ML model"
          }
          reviewed="2026-07"
        >
          {zh ? (
            <>
              <p>
                一般線性迴歸<em>就是</em>最小平方投影。給定特徵矩陣 <Eq>{"A"}</Eq> 與目標{" "}
                <Eq>{"b"}</Eq>，封閉形式的權重是
                <Eq>{"\\hat{x} = (A^{\\mathsf T}A)^{-1}A^{\\mathsf T}b"}</Eq>——把{" "}
                <Eq>{"b"}</Eq> 投影到特徵所能表達的範圍上。
              </p>
              <p>
                正交性也解釋了為什麼<strong>不相關的特徵</strong>
                很好（它們不會互相干擾），並且啟發了正規化與 PCA 中使用的
                <strong>正交／白化表示</strong>。
              </p>
            </>
          ) : (
            <>
              <p>
                Ordinary linear regression <em>is</em> the least-squares projection. Given
                a feature matrix <Eq>{"A"}</Eq> and targets <Eq>{"b"}</Eq>, the
                closed-form weights are
                <Eq>{"\\hat{x} = (A^{\\mathsf T}A)^{-1}A^{\\mathsf T}b"}</Eq> — projecting{" "}
                <Eq>{"b"}</Eq> onto what the features can express.
              </p>
              <p>
                Orthogonality also explains why <strong>uncorrelated features</strong> are
                nice (they don't fight each other) and motivates{" "}
                <strong>orthogonal / whitened representations</strong> used in
                normalization and PCA.
              </p>
            </>
          )}
        </MLCallout>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={zh ? "正交性 — 概念檢查" : "Orthogonality — concept check"}
          questions={orthogonalityQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
