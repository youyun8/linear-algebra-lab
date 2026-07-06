import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { MLCallout } from "../components/MLCallout";
import { EigenVisualizer } from "../components/EigenVisualizer";
import { Figure } from "../components/Figure";
import { EigenvectorFigure, DiagonalizationFigure } from "../components/diagrams";
import { Eq, Equation } from "../components/Equation";
import { eigenQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

export function Eigen() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="eigen">
      <Section title={zh ? "直覺" : "Intuition"}>
        {zh ? (
          <p>
            當你套用一個矩陣時，大多數向量都會被推離原本的方向。但有少數特殊方向能倖存下來——矩陣只會拉伸或壓縮它們，絕不旋轉。那些方向就是
            <strong>特徵向量</strong>，而拉伸倍數就是<strong>特徵值</strong>
            。它們是一個變換的「自然軸」。
          </p>
        ) : (
          <p>
            Most vectors get knocked off their direction when you apply a matrix. But a
            few special directions survive — the matrix only stretches or shrinks them,
            never turns them. Those directions are <strong>eigenvectors</strong>, and the
            stretch factors are <strong>eigenvalues</strong>. They are the "natural axes"
            of a transformation.
          </p>
        )}
        <ConceptCard tone="intuition">
          {zh
            ? "想像把一張照片水平拉伸。水平軸上的點沿著它滑動（特徵值 > 1），垂直軸上的點維持不動（特徵值 = 1）。那些軸就是特徵向量——變換的骨架。"
            : "Picture stretching a photo horizontally. Points on the horizontal axis slide along it (eigenvalue > 1), points on the vertical axis stay put (eigenvalue = 1). Those axes are the eigenvectors — the skeleton of the transformation."}
        </ConceptCard>
      </Section>

      <Section title={zh ? "定義" : "Definition"}>
        {zh ? (
          <p>
            若一個非零向量 <Eq>{"v"}</Eq> 是 <Eq>{"A"}</Eq> 的特徵向量、特徵值為{" "}
            <Eq>{"\\lambda"}</Eq>，則
          </p>
        ) : (
          <p>
            A nonzero vector <Eq>{"v"}</Eq> is an eigenvector of <Eq>{"A"}</Eq> with
            eigenvalue <Eq>{"\\lambda"}</Eq> if
          </p>
        )}
        <Equation>{"A v = \\lambda v"}</Equation>
        <Figure
          caption={
            zh ? (
              <>
                沿特徵向量 <Eq>{"v"}</Eq> 的方向，<Eq>{"A"}</Eq> 只做拉伸：
                <Eq>{"Av = \\lambda v"}</Eq> 仍留在同一條虛線上。一般的向量 <Eq>{"w"}</Eq>{" "}
                則會被轉離原方向。
              </>
            ) : (
              <>
                Along an eigenvector <Eq>{"v"}</Eq>, <Eq>{"A"}</Eq> only stretches:{" "}
                <Eq>{"Av = \\lambda v"}</Eq> stays on the same dashed line. A generic
                vector <Eq>{"w"}</Eq> gets turned off its direction.
              </>
            )
          }
        >
          <EigenvectorFigure />
        </Figure>
        {zh ? (
          <p>
            重新整理，<Eq>{"(A - \\lambda I)v = 0"}</Eq> 必須有非零解，因此矩陣{" "}
            <Eq>{"A - \\lambda I"}</Eq> 是奇異的：
          </p>
        ) : (
          <p>
            Rearranging, <Eq>{"(A - \\lambda I)v = 0"}</Eq> must have a nonzero solution,
            so the matrix <Eq>{"A - \\lambda I"}</Eq> is singular:
          </p>
        )}
        <Equation>
          {"\\det(A - \\lambda I) = 0 \\quad\\text{(characteristic equation)}"}
        </Equation>
        {zh ? (
          <p>對於 2×2 矩陣，這是一個以跡與行列式表示的簡潔二次式：</p>
        ) : (
          <p>
            For a 2×2 matrix this is a tidy quadratic in terms of trace and determinant:
          </p>
        )}
        <Equation>
          {"\\lambda^2 - (\\operatorname{tr}A)\\,\\lambda + \\det A = 0"}
        </Equation>
        {zh ? (
          <p>
            <strong>對角化：</strong>若 <Eq>{"A"}</Eq> 有一組完整的獨立特徵向量，則{" "}
            <Eq>{"A = PDP^{-1}"}</Eq>，其中 <Eq>{"D"}</Eq> 是對角矩陣（特徵值），而{" "}
            <Eq>{"P"}</Eq> 的各行是特徵向量。
          </p>
        ) : (
          <p>
            <strong>Diagonalization:</strong> if <Eq>{"A"}</Eq> has a full set of
            independent eigenvectors, then <Eq>{"A = PDP^{-1}"}</Eq> where <Eq>{"D"}</Eq>{" "}
            is diagonal (eigenvalues) and <Eq>{"P"}</Eq>'s columns are eigenvectors.
          </p>
        )}
      </Section>

      <Section title={zh ? "對稱矩陣" : "Symmetric matrices"}>
        <ConceptCard tone="definition" title={zh ? "譜定理" : "Spectral theorem"}>
          {zh ? (
            <>
              實<strong>對稱</strong>矩陣（<Eq>{"A = A^{\\mathsf T}"}</Eq>
              ）一定有實數特徵值，且能由一組<em>正規正交</em>的特徵向量對角化：
              <Eq>{"A = Q D Q^{\\mathsf T}"}</Eq>，其中 <Eq>{"Q^{\\mathsf T}Q = I"}</Eq>
              。這是 PCA 與 SVD（第 9 節）背後的引擎。
            </>
          ) : (
            <>
              A real <strong>symmetric</strong> matrix (<Eq>{"A = A^{\\mathsf T}"}</Eq>)
              always has real eigenvalues and can be diagonalized by an{" "}
              <em>orthonormal</em> set of eigenvectors:{" "}
              <Eq>{"A = Q D Q^{\\mathsf T}"}</Eq> with <Eq>{"Q^{\\mathsf T}Q = I"}</Eq>.
              This is the engine behind PCA and behind SVD (Section 9).
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "對角化：A = PDP⁻¹" : "Diagonalization: A = PDP⁻¹"}>
        {zh ? (
          <p>
            對角化把一個矩陣改寫成「換到特徵基底 → 沿各軸縮放 → 換回來」。把各特徵向量當作{" "}
            <Eq>{"P"}</Eq> 的行、對應的特徵值放進對角矩陣 <Eq>{"D"}</Eq>：
          </p>
        ) : (
          <p>
            Diagonalization rewrites a matrix as "change to the eigenbasis → scale along
            each axis → change back." Put the eigenvectors as the columns of{" "}
            <Eq>{"P"}</Eq> and the matching eigenvalues on the diagonal of <Eq>{"D"}</Eq>:
          </p>
        )}
        <Equation>
          {
            "P = \\big[\\, v_1 \\ \\cdots \\ v_n \\,\\big], \\quad D = \\operatorname{diag}(\\lambda_1, \\dots, \\lambda_n), \\quad A = P D P^{-1}"
          }
        </Equation>
        {zh ? (
          <p>
            <strong>為什麼成立：</strong>對每個特徵向量，
            <Eq>{"Av_i = \\lambda_i v_i"}</Eq>
            ，把各行疊在一起就是 <Eq>{"AP = PD"}</Eq>。若 <Eq>{"P"}</Eq>{" "}
            可逆（即有一組完整的獨立特徵向量），右乘 <Eq>{"P^{-1}"}</Eq> 就得到{" "}
            <Eq>{"A = PDP^{-1}"}</Eq>。
          </p>
        ) : (
          <p>
            <strong>Why it holds:</strong> for each eigenvector,{" "}
            <Eq>{"Av_i = \\lambda_i v_i"}</Eq>, and stacking those columns gives{" "}
            <Eq>{"AP = PD"}</Eq>. If <Eq>{"P"}</Eq> is invertible (a full set of
            independent eigenvectors), multiply on the right by <Eq>{"P^{-1}"}</Eq> to get{" "}
            <Eq>{"A = PDP^{-1}"}</Eq>.
          </p>
        )}
        <Figure
          caption={
            zh ? (
              <>
                <Eq>{"A"}</Eq> 作用於任何向量，等於三步：<Eq>{"P^{-1}"}</Eq>{" "}
                換到特徵基底、<Eq>{"D"}</Eq> 沿各軸縮放、再用 <Eq>{"P"}</Eq> 換回來。
              </>
            ) : (
              <>
                Applying <Eq>{"A"}</Eq> to any vector is three moves: <Eq>{"P^{-1}"}</Eq>{" "}
                changes to the eigenbasis, <Eq>{"D"}</Eq> scales along each axis, and{" "}
                <Eq>{"P"}</Eq> changes back.
              </>
            )
          }
        >
          <DiagonalizationFigure />
        </Figure>
        <ConceptCard tone="intuition" title={zh ? "它為何好用" : "Why it's useful"}>
          {zh ? (
            <>
              在特徵基底裡，矩陣只是各軸的獨立縮放，所以<strong>取冪</strong>
              變得輕而易舉：
              <Eq>{"A^k = P D^k P^{-1}"}</Eq>，而 <Eq>{"D^k"}</Eq> 只是把每個對角元素各自{" "}
              <Eq>{"k"}</Eq> 次方。同樣的技巧能定義 <Eq>{"e^{A} = P e^{D} P^{-1}"}</Eq>
              ，並解釋反覆相乘時最大的 <Eq>{"|\\lambda|"}</Eq> 為何主導長期行為。
            </>
          ) : (
            <>
              In the eigenbasis the matrix is just independent scalings, so{" "}
              <strong>powers</strong> become trivial: <Eq>{"A^k = P D^k P^{-1}"}</Eq>,
              where <Eq>{"D^k"}</Eq> just raises each diagonal entry to the <Eq>{"k"}</Eq>
              th power. The same trick defines <Eq>{"e^{A} = P e^{D} P^{-1}"}</Eq> and
              explains why the largest <Eq>{"|\\lambda|"}</Eq> dominates the long-run
              behaviour of repeated multiplication.
            </>
          )}
        </ConceptCard>
        <ConceptCard tone="mistake">
          {zh ? (
            <>
              不是每個矩陣都能對角化。若缺少足夠的獨立特徵向量（<em>虧損</em>矩陣，例如{" "}
              <Eq>{"\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}"}</Eq>），
              <Eq>{"P"}</Eq> 不可逆，就無法寫成 <Eq>{"PDP^{-1}"}</Eq>。好消息：實對稱矩陣
              <em>一定</em>
              可對角化，而且能用正交的 <Eq>{"P = Q"}</Eq>（見上面的譜定理）。
            </>
          ) : (
            <>
              Not every matrix is diagonalizable. If there aren't enough independent
              eigenvectors (a <em>defective</em> matrix, e.g.{" "}
              <Eq>{"\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}"}</Eq>),{" "}
              <Eq>{"P"}</Eq> isn't invertible and there is no <Eq>{"PDP^{-1}"}</Eq>. The
              good news: a real symmetric matrix is <em>always</em> diagonalizable, and by
              an orthogonal <Eq>{"P = Q"}</Eq> (the spectral theorem above).
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "小範例" : "Small example"}>
        {zh ? (
          <p>
            求 <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}"}</Eq>{" "}
            的特徵值。
          </p>
        ) : (
          <p>
            Find eigenvalues of{" "}
            <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}"}</Eq>.
          </p>
        )}
        <Equation>
          {
            "\\operatorname{tr}A = 4,\\ \\det A = 3 \\ \\Rightarrow\\ \\lambda^2 - 4\\lambda + 3 = 0 \\ \\Rightarrow\\ \\lambda = 3,\\,1"
          }
        </Equation>
        {zh ? (
          <p>
            對於 <Eq>{"\\lambda = 3"}</Eq>：解 <Eq>{"(A-3I)v = 0"}</Eq> →{" "}
            <Eq>{"v = (1,1)"}</Eq>。對於 <Eq>{"\\lambda = 1"}</Eq>：
            <Eq>{"v = (1,-1)"}</Eq>。注意它們正交，正如譜定理所保證的。
          </p>
        ) : (
          <p>
            For <Eq>{"\\lambda = 3"}</Eq>: solve <Eq>{"(A-3I)v = 0"}</Eq> →{" "}
            <Eq>{"v = (1,1)"}</Eq>. For <Eq>{"\\lambda = 1"}</Eq>: <Eq>{"v = (1,-1)"}</Eq>
            . Note they're orthogonal, as the spectral theorem promises.
          </p>
        )}
      </Section>

      <Section title={zh ? "手算" : "Manual calculation"}>
        {zh ? (
          <p>
            對角化 <Eq>{"A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}"}</Eq>
            ：求它的特徵值以及各一個特徵向量。
          </p>
        ) : (
          <p>
            Diagonalize <Eq>{"A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}"}</Eq>:
            find its eigenvalues and one eigenvector each.
          </p>
        )}
        <Hint label={zh ? "提示" : "Hint"}>
          <Eq>{"\\operatorname{tr}A = 7"}</Eq>、<Eq>{"\\det A = 10"}</Eq>
          {zh ? "。以因式分解求解 " : ". Solve "}
          <Eq>{"\\lambda^2 - 7\\lambda + 10 = 0"}</Eq>
          {zh ? "。" : " by factoring."}
        </Hint>
        <StepSolution
          steps={[
            {
              title: zh ? "特徵方程" : "Characteristic equation",
              content: (
                <Equation>
                  {"\\lambda^2 - 7\\lambda + 10 = (\\lambda-5)(\\lambda-2) = 0"}
                </Equation>
              ),
            },
            {
              title: zh ? "特徵值" : "Eigenvalues",
              content: <Equation>{"\\lambda_1 = 5,\\quad \\lambda_2 = 2"}</Equation>,
            },
            {
              title: zh ? "λ=5 的特徵向量" : "Eigenvector for λ=5",
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
              title: zh ? "λ=2 的特徵向量" : "Eigenvector for λ=2",
              content: (
                <>
                  <Equation>
                    {
                      "(A - 2I)v = \\begin{bmatrix} 2 & 1 \\\\ 2 & 1 \\end{bmatrix}v = 0 \\Rightarrow v_2 = (1, -2)"
                    }
                  </Equation>
                  <p style={{ margin: 0 }}>
                    {zh ? "所以 " : "So "}
                    <Eq>{"A = PDP^{-1}"}</Eq>
                    {zh ? "，其中 " : " with "}
                    <Eq>
                      {"P = \\begin{bmatrix} 1 & 1 \\\\ 1 & -2\\end{bmatrix}"}
                    </Eq>、{" "}
                    <Eq>{"D = \\begin{bmatrix} 5 & 0 \\\\ 0 & 2\\end{bmatrix}"}</Eq>
                    {zh ? "。" : "."}
                  </p>
                </>
              ),
            },
          ]}
        />
        <ConceptCard tone="mistake">
          {zh ? (
            <>
              特徵向量是方向，而非唯一的向量：任何非零純量倍數也都是特徵向量。如果課本的特徵向量是{" "}
              <Eq>{"(2,2)"}</Eq> 而你的是 <Eq>{"(1,1)"}</Eq>
              ，不用驚慌——是同一條直線。另外，旋轉矩陣<em>沒有</em>
              實特徵向量（它會旋轉一切），這會表現為判別式為負。
            </>
          ) : (
            <>
              Eigenvectors are directions, not unique vectors: any nonzero scalar multiple
              is also an eigenvector. Don't be alarmed if your book's eigenvector is{" "}
              <Eq>{"(2,2)"}</Eq>
              and yours is <Eq>{"(1,1)"}</Eq> — same line. Also, a rotation matrix has{" "}
              <em>no</em>
              real eigenvectors (it turns everything), which shows up as a negative
              discriminant.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "互動特徵向量視覺化" : "Interactive eigenvector visualizer"}>
        {zh ? (
          <p>
            用滑桿旋轉藍色向量 <Eq>{"v"}</Eq>。綠色向量是 <Eq>{"Av"}</Eq>。當{" "}
            <Eq>{"v"}</Eq> 落在一條橙色虛線（特徵向量方向）上時，<Eq>{"Av"}</Eq>{" "}
            指向相同方向——只有長度改變，倍數即為特徵值。
          </p>
        ) : (
          <p>
            Rotate the blue vector <Eq>{"v"}</Eq> with the slider. The green vector is{" "}
            <Eq>{"Av"}</Eq>. When <Eq>{"v"}</Eq> lands on a dashed orange line (an
            eigenvector direction), <Eq>{"Av"}</Eq>
            points the same way — only its length changes, by the eigenvalue.
          </p>
        )}
        <EigenVisualizer />
      </Section>

      <Section title={zh ? "機器學習連結：PCA" : "ML connection: PCA"}>
        <MLCallout
          title={zh ? "主成分分析" : "Principal Component Analysis"}
          reviewed="2026-07"
        >
          {zh ? (
            <>
              <p>
                PCA 找出資料變異最大的方向。將資料置中，組出（對稱的）
                <strong>共變異數矩陣</strong>，再對它對角化。特徵向量是
                <strong>主成分</strong>
                ；特徵值是各成分所捕捉的變異量。保留最大的幾個，你就在保住最多結構的同時降低了維度。
              </p>
              <p>
                因為共變異數是對稱的，譜定理保證了乾淨、正交的軸——這正是 PCA
                給出不相關成分的原因。在第 9 節我們會看到，PCA 其實是偽裝的 SVD。
              </p>
            </>
          ) : (
            <>
              <p>
                PCA finds the directions along which your data varies most. Center the
                data, form the (symmetric) <strong>covariance matrix</strong>, and
                diagonalize it. The eigenvectors are the{" "}
                <strong>principal components</strong>; the eigenvalues are the variance
                captured by each. Keep the top few and you've reduced dimensions while
                preserving the most structure.
              </p>
              <p>
                Because covariance is symmetric, the spectral theorem guarantees clean,
                orthogonal axes — which is why PCA gives uncorrelated components. In
                Section 9 we'll see PCA is really SVD in disguise.
              </p>
            </>
          )}
        </MLCallout>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={zh ? "特徵值 — 概念檢查" : "Eigenvalues — concept check"}
          questions={eigenQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
