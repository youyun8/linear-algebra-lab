import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { MLCallout } from "../components/MLCallout";
import { Figure } from "../components/Figure";
import { EigenspaceCompareFigure, MultiplicityBarsFigure } from "../components/diagrams";
import { MultiplicityExplorer } from "../components/MultiplicityExplorer";
import { Eq, Equation } from "../components/Equation";
import { multiplicityQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

/**
 * Multiplicity & Defective Matrices. Bridges the eigenvalue lesson and
 * diagonalization: an eigenvalue can appear k times in the characteristic
 * polynomial (algebraic multiplicity) yet supply fewer than k independent
 * eigenvectors (geometric multiplicity). When the geometric count falls short,
 * the matrix is defective and cannot be diagonalized. The page defines both
 * multiplicities, shows worked examples, offers pencil-and-paper exercises with
 * reveal-one-step solutions, and an interactive explorer.
 */
export function Multiplicity() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="multiplicity">
      <Section
        title={
          zh ? "直覺 — 一個數字，兩種計數" : "Intuition — one number, two ways to count"
        }
      >
        {zh ? (
          <p>
            上一節裡，特徵值來自解特徵方程 <Eq>{"\\det(A - \\lambda I) = 0"}</Eq>
            。但一個特徵值可能<strong>重複出現</strong>
            ，而重複的方式其實有兩種不同的計數。
            一種數它作為多項式根出現幾次；另一種數它實際提供了幾個獨立方向。這兩個數字
            <em>通常</em>相等——但當它們不相等時，矩陣就會「壞掉」，無法對角化。
          </p>
        ) : (
          <p>
            In the last section, eigenvalues came from solving{" "}
            <Eq>{"\\det(A - \\lambda I) = 0"}</Eq>. But an eigenvalue can{" "}
            <strong>repeat</strong>, and there are two genuinely different ways to count
            that repetition. One counts how often it shows up as a root of a polynomial;
            the other counts how many independent directions it actually supplies. Those
            two numbers are <em>usually</em> equal — and when they are not, the matrix
            "breaks" and cannot be diagonalized.
          </p>
        )}
        <ConceptCard tone="intuition">
          {zh
            ? "把特徵值想成一張「你欠幾個特徵向量」的帳單。代數重數是帳單上的金額；幾何重數是你實際收到的。付清了就能對角化；短少了就是虧損矩陣。"
            : "Think of an eigenvalue as an invoice for eigenvectors. Algebraic multiplicity is the amount billed; geometric multiplicity is what actually arrives. Paid in full → diagonalizable. Short → a defective matrix."}
        </ConceptCard>
      </Section>

      <Section title={zh ? "兩個定義" : "The two definitions"}>
        <ConceptCard tone="definition" title={zh ? "代數重數" : "Algebraic multiplicity"}>
          {zh ? (
            <p style={{ margin: 0 }}>
              特徵值 <Eq>{"\\lambda"}</Eq> 作為特徵多項式{" "}
              <Eq>{"\\det(A - \\lambda I) = 0"}</Eq> 的根，重複出現的次數。
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              How many times <Eq>{"\\lambda"}</Eq> appears as a root of the characteristic
              polynomial <Eq>{"\\det(A - \\lambda I) = 0"}</Eq>.
            </p>
          )}
        </ConceptCard>
        <ConceptCard tone="definition" title={zh ? "幾何重數" : "Geometric multiplicity"}>
          {zh ? (
            <p style={{ margin: 0 }}>
              對應 <Eq>{"\\lambda"}</Eq> 的線性獨立特徵向量個數，也就是特徵空間的維度{" "}
              <Eq>
                {
                  "\\dim\\operatorname{null}(A - \\lambda I) = n - \\operatorname{rank}(A - \\lambda I)"
                }
              </Eq>
              。
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              The number of linearly independent eigenvectors for <Eq>{"\\lambda"}</Eq>,
              i.e. the dimension of the eigenspace{" "}
              <Eq>
                {
                  "\\dim\\operatorname{null}(A - \\lambda I) = n - \\operatorname{rank}(A - \\lambda I)"
                }
              </Eq>
              .
            </p>
          )}
        </ConceptCard>
        {zh ? (
          <p>
            兩者永遠滿足這條夾擠不等式——每個特徵值至少有一個特徵向量，而特徵向量的數目不可能超過那張帳單：
          </p>
        ) : (
          <p>
            The two always obey this squeeze — every eigenvalue has at least one
            eigenvector, and you can never get more than the invoice asked for:
          </p>
        )}
        <Equation>
          {
            "1 \\le \\underbrace{\\dim\\operatorname{null}(A - \\lambda I)}_{\\text{geometric}} \\le \\underbrace{\\text{mult. as a root}}_{\\text{algebraic}}"
          }
        </Equation>
        <Figure
          caption={
            zh ? (
              <>
                重根 <Eq>{"\\lambda"}</Eq> 的兩種計數。左：代數重數
                ＝根的重數。右：幾何重數＝特徵空間維度。虛線框是「缺少的特徵向量」，也就是虧損的來源。
              </>
            ) : (
              <>
                The two counts for a repeated <Eq>{"\\lambda"}</Eq>. Left bar: algebraic
                multiplicity (root count). Right bar: geometric multiplicity (eigenspace
                dimension). The dashed box is the "missing eigenvector" — the source of
                defectiveness.
              </>
            )
          }
        >
          <MultiplicityBarsFigure />
        </Figure>
      </Section>

      <Section title={zh ? "「虧損」是什麼意思" : "What 'defective' means"}>
        {zh ? (
          <p>
            若<strong>某個</strong>特徵值的幾何重數<em>嚴格小於</em>
            其代數重數，這個矩陣就稱為<strong>虧損（defective）</strong>
            。缺了特徵向量，就湊不出一組完整的特徵基底，於是 <Eq>{"P"}</Eq> 不可逆、
            <Eq>{"A = PDP^{-1}"}</Eq>
            無法成立——矩陣不可對角化。
          </p>
        ) : (
          <p>
            A matrix is <strong>defective</strong> if, for <strong>some</strong>{" "}
            eigenvalue, the geometric multiplicity is <em>strictly less</em> than the
            algebraic multiplicity. With eigenvectors missing, you cannot assemble a full
            eigenbasis, so <Eq>{"P"}</Eq> is not invertible and <Eq>{"A = PDP^{-1}"}</Eq>{" "}
            fails — the matrix is not diagonalizable.
          </p>
        )}
        <Figure
          caption={
            zh ? (
              <>
                同一個重複特徵值 <Eq>{"\\lambda"}</Eq>{" "}
                的兩種情境。左：整個平面都是特徵空間 （幾何 ＝
                2），可對角化。右：只剩一條特徵線（幾何 ＝ 1），一般向量 <Eq>{"w"}</Eq>{" "}
                會被剪離該線——虧損。
              </>
            ) : (
              <>
                Two fates for the same repeated <Eq>{"\\lambda"}</Eq>. Left: the whole
                plane is the eigenspace (geometric = 2), diagonalizable. Right: only one
                eigen-line survives (geometric = 1); a generic vector <Eq>{"w"}</Eq> gets
                sheared off it — defective.
              </>
            )
          }
        >
          <EigenspaceCompareFigure />
        </Figure>
        <ConceptCard
          tone="definition"
          title={zh ? "可對角化的判準" : "Diagonalizability test"}
        >
          {zh ? (
            <p style={{ margin: 0 }}>
              <Eq>{"n \\times n"}</Eq> 矩陣可對角化 <strong>⟺</strong>{" "}
              每個特徵值的幾何重數都等於其代數重數（等價地，幾何重數之和為 <Eq>{"n"}</Eq>
              ）。<em>相異</em>特徵值與<em>實對稱</em>都是充分條件。
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              An <Eq>{"n \\times n"}</Eq> matrix is diagonalizable <strong>⟺</strong>{" "}
              every eigenvalue's geometric multiplicity equals its algebraic multiplicity
              (equivalently, the geometric multiplicities sum to <Eq>{"n"}</Eq>).{" "}
              <em>Distinct</em> eigenvalues and <em>real symmetry</em> are each
              sufficient.
            </p>
          )}
        </ConceptCard>
        <ConceptCard tone="mistake">
          {zh ? (
            <>
              重根<strong>不等於</strong>虧損。純量矩陣{" "}
              <Eq>{"2I = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}"}</Eq>{" "}
              也有重複特徵值 <Eq>{"\\lambda = 2"}</Eq>，但它的幾何重數是 2（整個平面），
              完全可對角化。只有當幾何重數<em>短少</em>時才虧損。
            </>
          ) : (
            <>
              A repeated eigenvalue does <strong>not</strong> mean defective. The scalar
              matrix <Eq>{"2I = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}"}</Eq>{" "}
              also repeats <Eq>{"\\lambda = 2"}</Eq>, yet its geometric multiplicity is 2
              (the whole plane) — perfectly diagonalizable. Defectiveness needs the
              geometric count to fall <em>short</em>.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section
        title={zh ? "詳解範例 — 一個虧損的剪切" : "Worked example — a defective shear"}
      >
        {zh ? (
          <p>
            取 <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 0 & 2 \\end{bmatrix}"}</Eq>
            。逐步算出它的兩種重數。
          </p>
        ) : (
          <p>
            Take <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 0 & 2 \\end{bmatrix}"}</Eq>.
            Compute both multiplicities step by step.
          </p>
        )}
        <StepSolution
          reveal={false}
          steps={[
            {
              title: zh ? "特徵多項式" : "Characteristic polynomial",
              content: (
                <Equation>{"\\det(A - \\lambda I) = (2-\\lambda)^2 = 0"}</Equation>
              ),
            },
            {
              title: zh ? "代數重數" : "Algebraic multiplicity",
              content: (
                <>
                  <Equation>{"\\lambda = 2 \\ \\text{(a double root)}"}</Equation>
                  <p style={{ margin: 0 }}>
                    {zh
                      ? "因為是二重根，代數重數 = 2。"
                      : "The double root gives algebraic multiplicity 2."}
                  </p>
                </>
              ),
            },
            {
              title: zh ? "幾何重數" : "Geometric multiplicity",
              content: (
                <>
                  <Equation>
                    {
                      "A - 2I = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}, \\quad \\operatorname{rank} = 1"
                    }
                  </Equation>
                  <Equation>{"\\dim\\operatorname{null}(A - 2I) = 2 - 1 = 1"}</Equation>
                  <p style={{ margin: 0 }}>
                    {zh ? (
                      <>
                        解 <Eq>{"(A-2I)v = 0"}</Eq> 只得到一條方向 <Eq>{"v = (1, 0)"}</Eq>
                        。幾何重數 = 1。
                      </>
                    ) : (
                      <>
                        Solving <Eq>{"(A-2I)v = 0"}</Eq> yields a single direction{" "}
                        <Eq>{"v = (1, 0)"}</Eq>. Geometric multiplicity = 1.
                      </>
                    )}
                  </p>
                </>
              ),
            },
            {
              title: zh ? "結論" : "Verdict",
              content: (
                <p style={{ margin: 0 }}>
                  {zh ? (
                    <>
                      幾何重數 <Eq>{"1 < 2"}</Eq> 代數重數 ⇒ <strong>虧損</strong>
                      ，不可對角化。它少了一個特徵向量。
                    </>
                  ) : (
                    <>
                      geometric <Eq>{"1 < 2"}</Eq> algebraic ⇒ <strong>defective</strong>,
                      not diagonalizable. It is one eigenvector short.
                    </>
                  )}
                </p>
              ),
            },
          ]}
        />
      </Section>

      <Section
        title={zh ? "對照範例 — 重根但不虧損" : "Contrast — repeated but not defective"}
      >
        {zh ? (
          <p>
            換成 <Eq>{"B = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}"}</Eq>
            ，特徵多項式一模一樣，但結局相反。
          </p>
        ) : (
          <p>
            Now use <Eq>{"B = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}"}</Eq>.
            Same characteristic polynomial, opposite ending.
          </p>
        )}
        <Equation>
          {
            "\\det(B - \\lambda I) = (2-\\lambda)^2,\\quad B - 2I = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}"
          }
        </Equation>
        {zh ? (
          <p>
            這裡 <Eq>{"\\operatorname{rank}(B - 2I) = 0"}</Eq>，所以幾何重數{" "}
            <Eq>{"= 2 - 0 = 2"}</Eq>，與代數重數相等。<em>每個</em>非零向量都是特徵向量，
            <Eq>{"B"}</Eq> 早已是對角矩陣。重根本身無罪；有罪的是短缺的特徵空間。
          </p>
        ) : (
          <p>
            Here <Eq>{"\\operatorname{rank}(B - 2I) = 0"}</Eq>, so geometric multiplicity{" "}
            <Eq>{"= 2 - 0 = 2"}</Eq>, matching the algebraic one. <em>Every</em> nonzero
            vector is an eigenvector and <Eq>{"B"}</Eq> is already diagonal. The repeat is
            innocent; the crime is a short eigenspace.
          </p>
        )}
      </Section>

      <Section
        title={zh ? "互動：代數 vs 幾何重數" : "Interactive: algebraic vs geometric"}
      >
        {zh ? (
          <p>
            輸入任意 2×2
            矩陣，即時看到每個特徵值的代數與幾何重數、特徵多項式，以及特徵向量方向線。
            試試各個預設：注意「重根、可對角化」與「重根、虧損」有相同的特徵多項式，卻有不同的幾何重數。
            當兩者相等時狀態列變綠；短缺時變色警示。
          </p>
        ) : (
          <p>
            Enter any 2×2 matrix and watch, per eigenvalue, the algebraic and geometric
            multiplicities, the characteristic polynomial, and the eigen-line directions.
            Try the presets: "repeat, diagonalizable" and "repeat, defective" share a
            characteristic polynomial but differ in geometric multiplicity. The status bar
            turns green when they match and warns when the eigenspace comes up short.
          </p>
        )}
        <MultiplicityExplorer />
      </Section>

      <Section title={zh ? "紙筆練習" : "Pencil-and-paper exercises"}>
        {zh ? (
          <p>
            先自己動手，再展開解答。目標是養成反射動作：算根 → 算{" "}
            <Eq>{"\\operatorname{rank}(A - \\lambda I)"}</Eq> → 比較兩個重數。
          </p>
        ) : (
          <p>
            Try each by hand before revealing. The goal is a reflex: find roots → compute{" "}
            <Eq>{"\\operatorname{rank}(A - \\lambda I)"}</Eq> → compare the two
            multiplicities.
          </p>
        )}

        <h3>{zh ? "練習 1 — 判斷是否虧損" : "Exercise 1 — defective or not?"}</h3>
        {zh ? (
          <p>
            對 <Eq>{"A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 3 \\end{bmatrix}"}</Eq>
            ，求每個特徵值的代數與幾何重數，並判斷它是否可對角化。
          </p>
        ) : (
          <p>
            For <Eq>{"A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 3 \\end{bmatrix}"}</Eq>, find
            the algebraic and geometric multiplicity of each eigenvalue and decide whether
            it is diagonalizable.
          </p>
        )}
        <Hint label={zh ? "提示" : "Hint"}>
          {zh ? (
            <>
              三角矩陣的特徵值就在對角線上。接著檢查 <Eq>{"A - 3I"}</Eq> 的秩。
            </>
          ) : (
            <>
              A triangular matrix wears its eigenvalues on the diagonal. Then inspect the
              rank of <Eq>{"A - 3I"}</Eq>.
            </>
          )}
        </Hint>
        <StepSolution
          reveal={false}
          steps={[
            {
              title: zh ? "特徵值" : "Eigenvalue",
              content: (
                <Equation>
                  {"(3-\\lambda)^2 = 0 \\Rightarrow \\lambda = 3\\ (\\text{alg } 2)"}
                </Equation>
              ),
            },
            {
              title: zh ? "幾何重數" : "Geometric multiplicity",
              content: (
                <Equation>
                  {
                    "A - 3I = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix},\\ \\operatorname{rank} = 1 \\Rightarrow \\dim\\operatorname{null} = 1"
                  }
                </Equation>
              ),
            },
            {
              title: zh ? "結論" : "Verdict",
              content: (
                <p style={{ margin: 0 }}>
                  {zh
                    ? "幾何 1 < 代數 2 ⇒ 虧損，不可對角化。"
                    : "geometric 1 < algebraic 2 ⇒ defective, not diagonalizable."}
                </p>
              ),
            },
          ]}
        />

        <h3>
          {zh ? "練習 2 — 兩個 3×3 三角矩陣" : "Exercise 2 — two 3×3 triangular matrices"}
        </h3>
        {zh ? (
          <p>
            比較{" "}
            <Eq>
              {
                "M = \\begin{bmatrix} 5 & 1 & 0 \\\\ 0 & 5 & 0 \\\\ 0 & 0 & 5 \\end{bmatrix}"
              }
            </Eq>{" "}
            與{" "}
            <Eq>
              {
                "N = \\begin{bmatrix} 5 & 1 & 0 \\\\ 0 & 5 & 1 \\\\ 0 & 0 & 5 \\end{bmatrix}"
              }
            </Eq>
            。兩者的 <Eq>{"\\lambda = 5"}</Eq> 代數重數都是 3；它們的幾何重數各是多少？
          </p>
        ) : (
          <p>
            Compare{" "}
            <Eq>
              {
                "M = \\begin{bmatrix} 5 & 1 & 0 \\\\ 0 & 5 & 0 \\\\ 0 & 0 & 5 \\end{bmatrix}"
              }
            </Eq>{" "}
            and{" "}
            <Eq>
              {
                "N = \\begin{bmatrix} 5 & 1 & 0 \\\\ 0 & 5 & 1 \\\\ 0 & 0 & 5 \\end{bmatrix}"
              }
            </Eq>
            . Both have <Eq>{"\\lambda = 5"}</Eq> with algebraic multiplicity 3. What is
            each geometric multiplicity?
          </p>
        )}
        <Hint label={zh ? "提示" : "Hint"}>
          {zh
            ? "算 rank(M − 5I) 與 rank(N − 5I)，再用 3 − rank。"
            : "Compute rank(M − 5I) and rank(N − 5I), then use 3 − rank."}
        </Hint>
        <StepSolution
          reveal={false}
          steps={[
            {
              title: zh ? "M 的零空間" : "Null space of M",
              content: (
                <>
                  <Equation>
                    {
                      "M - 5I = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix},\\ \\operatorname{rank} = 1"
                    }
                  </Equation>
                  <p style={{ margin: 0 }}>
                    {zh
                      ? "幾何重數 = 3 − 1 = 2。"
                      : "Geometric multiplicity = 3 − 1 = 2."}
                  </p>
                </>
              ),
            },
            {
              title: zh ? "N 的零空間" : "Null space of N",
              content: (
                <>
                  <Equation>
                    {
                      "N - 5I = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix},\\ \\operatorname{rank} = 2"
                    }
                  </Equation>
                  <p style={{ margin: 0 }}>
                    {zh
                      ? "幾何重數 = 3 − 2 = 1。"
                      : "Geometric multiplicity = 3 − 2 = 1."}
                  </p>
                </>
              ),
            },
            {
              title: zh ? "結論" : "Verdict",
              content: (
                <p style={{ margin: 0 }}>
                  {zh ? (
                    <>
                      兩者都虧損（幾何 &lt; 3），但 <Eq>{"N"}</Eq> 更嚴重（幾何僅
                      1）。這正是不同 Jordan 塊結構的差別。
                    </>
                  ) : (
                    <>
                      Both are defective (geometric &lt; 3), but <Eq>{"N"}</Eq> is "more"
                      defective (geometric only 1). This is the difference in their Jordan
                      block structure.
                    </>
                  )}
                </p>
              ),
            },
          ]}
        />

        <h3>{zh ? "練習 3 — 由重數反推" : "Exercise 3 — reason backwards"}</h3>
        {zh ? (
          <p>
            一個 <Eq>{"2 \\times 2"}</Eq> 矩陣只有單一特徵值 <Eq>{"\\lambda = 4"}</Eq>
            （代數重數 2）且<em>可</em>對角化。它必定是什麼矩陣？
          </p>
        ) : (
          <p>
            A <Eq>{"2 \\times 2"}</Eq> matrix has the single eigenvalue{" "}
            <Eq>{"\\lambda = 4"}</Eq> (algebraic multiplicity 2) and <em>is</em>{" "}
            diagonalizable. What must it be?
          </p>
        )}
        <Hint label={zh ? "提示" : "Hint"}>
          {zh
            ? "可對角化 ⇒ 幾何重數 = 2 ⇒ A − 4I 的零空間是整個平面。"
            : "Diagonalizable ⇒ geometric multiplicity 2 ⇒ the null space of A − 4I is the whole plane."}
        </Hint>
        <StepSolution
          reveal={false}
          steps={[
            {
              title: zh ? "強制條件" : "Force the condition",
              content: (
                <Equation>
                  {"\\dim\\operatorname{null}(A - 4I) = 2 \\Rightarrow A - 4I = 0"}
                </Equation>
              ),
            },
            {
              title: zh ? "唯一可能" : "The only option",
              content: (
                <>
                  <Equation>
                    {"A = 4I = \\begin{bmatrix} 4 & 0 \\\\ 0 & 4 \\end{bmatrix}"}
                  </Equation>
                  <p style={{ margin: 0 }}>
                    {zh
                      ? "任何非純量的 A（如剪切）都會虧損。可對角化 + 單一特徵值 ⇒ 純量矩陣。"
                      : "Any non-scalar A (like a shear) would be defective. Diagonalizable + a single eigenvalue ⇒ a scalar matrix."}
                  </p>
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title={zh ? "機器學習連結" : "ML connection"}>
        <MLCallout
          title={zh ? "為什麼虧損矩陣讓人頭痛" : "Why defective matrices are trouble"}
          reviewed="2026-07"
        >
          {zh ? (
            <p>
              虧損矩陣沒有特徵基底，所以 <Eq>{"A = PDP^{-1}"}</Eq> 的乾淨技巧（矩陣冪、
              <Eq>{"e^{A}"}</Eq>、模態分析）全都失效，只能退回到更複雜的 Jordan
              形式。更麻煩的是它們<strong>數值上很敏感</strong>
              ：微小的擾動就會把重根拆成相異根，讓幾何重數 「跳」回滿載，於是{" "}
              <Eq>{"P"}</Eq> 的條件數暴衝、計算誤差被放大。這正是為什麼在資料與 ML
              裡我們幾乎總是改用永遠存在、且用正交因子的 <strong>SVD</strong>
              （下一節），而 PCA 依賴的對稱共變異數矩陣由譜定理保證<em>永不虧損</em>。
            </p>
          ) : (
            <p>
              A defective matrix has no eigenbasis, so the clean tricks of{" "}
              <Eq>{"A = PDP^{-1}"}</Eq> (matrix powers, <Eq>{"e^{A}"}</Eq>, modal
              analysis) all break and you fall back to the messier Jordan form. Worse,
              they are <strong>numerically delicate</strong>: a tiny perturbation splits
              the repeated root into distinct ones, the geometric multiplicity "jumps"
              back to full, and the condition number of <Eq>{"P"}</Eq> blows up,
              amplifying error. This is a big reason data and ML lean on the
              always-available, orthogonal <strong>SVD</strong> (next section), while
              PCA's symmetric covariance matrix is guaranteed by the spectral theorem to
              be <em>never</em> defective.
            </p>
          )}
        </MLCallout>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={
            zh ? "重數與虧損 — 概念檢查" : "Multiplicity & defectiveness — concept check"
          }
          questions={multiplicityQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
