import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { MLCallout } from "../components/MLCallout";
import { Figure } from "../components/Figure";
import {
  NullSpaceBasisFigure,
  NullSpaceCollapseFigure,
  SpanPlaneFigure,
} from "../components/diagrams";
import { Eq, Equation } from "../components/Equation";
import { subspacesQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

export function Subspaces() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="subspaces">
      <Section title={zh ? "直覺" : "Intuition"}>
        {zh ? (
          <p>
            子空間是通過原點的「平坦」區域，並對向量運算封閉：把其中兩個向量相加，仍在其中；把其中一個向量縮放，仍在其中。在{" "}
            <Eq>{"\\mathbb{R}^3"}</Eq>{" "}
            中，子空間有：只有原點、任何通過原點的直線、任何通過原點的平面，或整個空間。
          </p>
        ) : (
          <p>
            A subspace is a "flat" region through the origin that's closed under the
            vector operations: add two vectors in it, still in it; scale a vector in it,
            still in it. In <Eq>{"\\mathbb{R}^3"}</Eq> the subspaces are: just the origin,
            any line through the origin, any plane through the origin, or all of space.
          </p>
        )}
        <ConceptCard tone="intuition">
          {zh ? (
            <>
              <strong>生成（Span）</strong>＝你透過組合某些向量所能到達的所有位置。
              <strong>基底</strong>＝能到達一切的最小方向集合（沒有冗餘）。
              <strong>維度</strong>＝一組基底中有幾個向量（獨立方向的數目）。
            </>
          ) : (
            <>
              <strong>Span</strong> = every place you can reach by combining some vectors.
              <strong> Basis</strong> = a minimal set of directions that reaches
              everything (no redundancy). <strong>Dimension</strong> = how many vectors
              are in a basis (the number of independent directions).
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "定義" : "Definition"}>
        {zh ? (
          <p>
            向量 <Eq>{"v_1,\\dots,v_k"}</Eq> 的<strong>生成空間</strong>是所有線性組合：
          </p>
        ) : (
          <p>
            The <strong>span</strong> of vectors <Eq>{"v_1,\\dots,v_k"}</Eq> is all linear
            combinations:
          </p>
        )}
        <Equation>
          {
            "\\operatorname{span}\\{v_1,\\dots,v_k\\} = \\{\\, c_1 v_1 + \\cdots + c_k v_k : c_i \\in \\mathbb{R} \\,\\}"
          }
        </Equation>
        <Figure
          caption={
            zh ? (
              <>
                兩個獨立向量 <Eq>{"v_1, v_2"}</Eq> 在 <Eq>{"\\mathbb{R}^3"}</Eq>{" "}
                中生成一個通過原點的平面（一個二維子空間）——它們的所有線性組合恰好填滿這個平面。
              </>
            ) : (
              <>
                Two independent vectors <Eq>{"v_1, v_2"}</Eq> span a plane through the
                origin in <Eq>{"\\mathbb{R}^3"}</Eq> (a 2-dimensional subspace) — every
                linear combination of them fills exactly this plane.
              </>
            )
          }
        >
          <SpanPlaneFigure />
        </Figure>
        {zh ? (
          <p>
            若唯一能得到 <Eq>{"0"}</Eq> 的組合是係數全為零，它們就
            <strong>線性獨立</strong>。<strong>基底</strong>是一組獨立的生成集合。對於矩陣{" "}
            <Eq>{"A"}</Eq>，有三個關鍵子空間：
          </p>
        ) : (
          <p>
            They are <strong>linearly independent</strong> if the only combination giving{" "}
            <Eq>{"0"}</Eq> is all-zero coefficients. A <strong>basis</strong> is an
            independent spanning set. For a matrix <Eq>{"A"}</Eq> there are three key
            subspaces:
          </p>
        )}
        <ul>
          {zh ? (
            <>
              <li>
                <strong>行空間</strong> <Eq>{"C(A)"}</Eq>：各行的生成＝所有可達到的輸出{" "}
                <Eq>{"Ax"}</Eq>。
              </li>
              <li>
                <strong>列空間</strong> <Eq>{"C(A^{\\mathsf T})"}</Eq>：各列的生成。
              </li>
              <li>
                <strong>零空間</strong> <Eq>{"N(A)"}</Eq>：所有滿足 <Eq>{"Ax = 0"}</Eq> 的{" "}
                <Eq>{"x"}</Eq>。
              </li>
            </>
          ) : (
            <>
              <li>
                <strong>Column space</strong> <Eq>{"C(A)"}</Eq>: span of the columns = all
                reachable outputs <Eq>{"Ax"}</Eq>.
              </li>
              <li>
                <strong>Row space</strong> <Eq>{"C(A^{\\mathsf T})"}</Eq>: span of the
                rows.
              </li>
              <li>
                <strong>Null space</strong> <Eq>{"N(A)"}</Eq>: all <Eq>{"x"}</Eq> with{" "}
                <Eq>{"Ax = 0"}</Eq>.
              </li>
            </>
          )}
        </ul>
      </Section>

      <Section title={zh ? "秩–零度定理" : "Rank–nullity theorem"}>
        <ConceptCard tone="definition" title={zh ? "秩–零度" : "Rank–Nullity"}>
          <Equation>
            {
              "\\underbrace{\\dim C(A)}_{\\text{rank}} + \\underbrace{\\dim N(A)}_{\\text{nullity}} = n \\ (\\text{number of columns})"
            }
          </Equation>
          {zh
            ? "每一行都恰好被算到一次：它要嘛引入一個真正全新的輸出方向（主元行 → 秩），要嘛是一個自由變數（→ 零度）。"
            : "Every column is accounted for exactly once: either it introduces a genuinely new output direction (a pivot column → rank), or it's a free variable (→ nullity)."}
        </ConceptCard>
      </Section>

      <Section title={zh ? "如何求零空間的基底" : "How to find a null-space basis"}>
        {zh ? (
          <p>
            要求矩陣 <Eq>{"A"}</Eq> 的零空間基底，先解齊次方程 <Eq>{"Ax = 0"}</Eq>。把{" "}
            <Eq>{"A"}</Eq> 化到 RREF，找出主元變數與自由變數；每次讓一個自由變數等於{" "}
            <Eq>{"1"}</Eq>、其他自由變數等於 <Eq>{"0"}</Eq>
            ，得到的解向量就是一個基底向量。
          </p>
        ) : (
          <p>
            To find a basis for the null space of <Eq>{"A"}</Eq>, solve the homogeneous
            system <Eq>{"Ax = 0"}</Eq>. Row-reduce <Eq>{"A"}</Eq> to RREF, identify pivot
            variables and free variables, then set one free variable to <Eq>{"1"}</Eq> at
            a time while setting the other free variables to <Eq>{"0"}</Eq>. Each
            resulting solution vector is one basis vector.
          </p>
        )}
        <Figure
          caption={
            zh ? (
              <>
                RREF
                告訴你哪些變數受限制（主元變數），哪些變數可以自由選擇（自由變數）。自由變數的「單位選擇」產生零空間的基底向量。
              </>
            ) : (
              <>
                RREF separates constrained variables from free variables. Unit choices for
                the free variables produce the basis vectors of the null space.
              </>
            )
          }
        >
          <NullSpaceBasisFigure />
        </Figure>
        <StepSolution
          title={zh ? "通用流程" : "General recipe"}
          reveal={false}
          steps={[
            {
              title: zh ? "列化簡" : "Row-reduce",
              content: zh ? (
                <p style={{ margin: 0 }}>
                  將 <Eq>{"A"}</Eq> 化為最簡列梯形式。列運算不改變 <Eq>{"Ax=0"}</Eq>{" "}
                  的解集合。
                </p>
              ) : (
                <p style={{ margin: 0 }}>
                  Reduce <Eq>{"A"}</Eq> to reduced row echelon form. Row operations do not
                  change the solution set of <Eq>{"Ax=0"}</Eq>.
                </p>
              ),
            },
            {
              title: zh ? "找自由變數" : "Find free variables",
              content: zh ? (
                <p style={{ margin: 0 }}>
                  有主元的行給主元變數；沒有主元的行給自由變數。
                </p>
              ) : (
                <p style={{ margin: 0 }}>
                  Pivot columns give pivot variables; columns without pivots give free
                  variables.
                </p>
              ),
            },
            {
              title: zh ? "參數化" : "Parametrize",
              content: zh ? (
                <p style={{ margin: 0 }}>
                  用自由變數表示所有主元變數，寫出通解 <Eq>{"x"}</Eq>。
                </p>
              ) : (
                <p style={{ margin: 0 }}>
                  Express every pivot variable in terms of the free variables and write
                  the general solution <Eq>{"x"}</Eq>.
                </p>
              ),
            },
            {
              title: zh ? "抽出基底" : "Extract the basis",
              content: zh ? (
                <p style={{ margin: 0 }}>
                  將通解拆成自由參數的線性組合；參數前面的向量就是 <Eq>{"N(A)"}</Eq>{" "}
                  的基底。
                </p>
              ) : (
                <p style={{ margin: 0 }}>
                  Split the general solution into a linear combination of parameters. The
                  coefficient vectors of those parameters form a basis for{" "}
                  <Eq>{"N(A)"}</Eq>.
                </p>
              ),
            },
          ]}
        />
      </Section>

      <Section title={zh ? "零空間的性質" : "Properties of null spaces"}>
        <Figure
          caption={
            zh ? (
              <>
                零空間由所有被 <Eq>{"A"}</Eq>{" "}
                映到零向量的輸入組成。它一定通過原點，且本身是一個子空間。
              </>
            ) : (
              <>
                The null space contains exactly the input vectors that <Eq>{"A"}</Eq> maps
                to the zero vector. It always passes through the origin and is itself a
                subspace.
              </>
            )
          }
        >
          <NullSpaceCollapseFigure />
        </Figure>
        <ul>
          {zh ? (
            <>
              <li>
                <strong>它是子空間。</strong> 若 <Eq>{"Au=0"}</Eq> 且 <Eq>{"Av=0"}</Eq>
                ，則 <Eq>{"A(u+v)=0"}</Eq>；若 <Eq>{"c"}</Eq> 是純量，則{" "}
                <Eq>{"A(cu)=0"}</Eq>。
              </li>
              <li>
                <strong>它一定包含零向量。</strong> 因為 <Eq>{"A0=0"}</Eq>。
              </li>
              <li>
                <strong>零度等於自由變數的數目。</strong> 也就是 <Eq>{"\\dim N(A)"}</Eq>。
              </li>
              <li>
                <strong>滿列秩代表零空間只有零向量。</strong>{" "}
                若每一行都有主元，則沒有自由變數，所以 <Eq>{"N(A)=\\{0\\}"}</Eq>。
              </li>
              <li>
                <strong>零空間描述非唯一性。</strong> 若 <Eq>{"Ax=b"}</Eq> 有一個特解{" "}
                <Eq>{"x_p"}</Eq>，則所有解都是 <Eq>{"x_p + z"}</Eq>，其中{" "}
                <Eq>{"z\\in N(A)"}</Eq>。
              </li>
            </>
          ) : (
            <>
              <li>
                <strong>It is a subspace.</strong> If <Eq>{"Au=0"}</Eq> and{" "}
                <Eq>{"Av=0"}</Eq>, then <Eq>{"A(u+v)=0"}</Eq>; if <Eq>{"c"}</Eq> is a
                scalar, then <Eq>{"A(cu)=0"}</Eq>.
              </li>
              <li>
                <strong>It always contains the zero vector.</strong> This is because{" "}
                <Eq>{"A0=0"}</Eq>.
              </li>
              <li>
                <strong>Its dimension equals the number of free variables.</strong> That
                dimension is <Eq>{"\\dim N(A)"}</Eq>, the nullity of <Eq>{"A"}</Eq>.
              </li>
              <li>
                <strong>Full column rank means the null space is trivial.</strong> If
                every column has a pivot, there are no free variables, so{" "}
                <Eq>{"N(A)=\\{0\\}"}</Eq>.
              </li>
              <li>
                <strong>The null space describes non-uniqueness.</strong> If{" "}
                <Eq>{"Ax=b"}</Eq> has one particular solution <Eq>{"x_p"}</Eq>, then every
                solution has the form <Eq>{"x_p + z"}</Eq>, where <Eq>{"z\\in N(A)"}</Eq>.
              </li>
            </>
          )}
        </ul>
      </Section>

      <Section title={zh ? "小範例" : "Small example"}>
        {zh ? (
          <p>
            取 <Eq>{"A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\end{bmatrix}"}</Eq>
            。第 2 列是第 1 列的 <Eq>{"2\\times"}</Eq>，所以只有一列是獨立的。
          </p>
        ) : (
          <p>
            Take <Eq>{"A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\end{bmatrix}"}</Eq>
            . Row 2 is <Eq>{"2\\times"}</Eq> row 1, so there's only one independent row.
          </p>
        )}
        <ul>
          {zh ? (
            <>
              <li>
                秩 <Eq>{"= 1"}</Eq>（一個主元）。
              </li>
              <li>
                各行都是 <Eq>{"(1,2)"}</Eq> 的倍數，所以 <Eq>{"C(A)"}</Eq> 是{" "}
                <Eq>{"\\mathbb{R}^2"}</Eq> 中的一條直線。
              </li>
              <li>
                零度 <Eq>{"= n - \\text{rank} = 3 - 1 = 2"}</Eq>：零空間是{" "}
                <Eq>{"\\mathbb{R}^3"}</Eq> 中的一個平面。
              </li>
            </>
          ) : (
            <>
              <li>
                Rank <Eq>{"= 1"}</Eq> (one pivot).
              </li>
              <li>
                Columns are all multiples of <Eq>{"(1,2)"}</Eq>, so <Eq>{"C(A)"}</Eq> is a
                line in <Eq>{"\\mathbb{R}^2"}</Eq>.
              </li>
              <li>
                Nullity <Eq>{"= n - \\text{rank} = 3 - 1 = 2"}</Eq>: the null space is a
                plane in <Eq>{"\\mathbb{R}^3"}</Eq>.
              </li>
            </>
          )}
        </ul>
      </Section>

      <Section title={zh ? "手算" : "Manual calculation"}>
        {zh ? (
          <p>
            求 <Eq>{"A = \\begin{bmatrix} 1 & 2 & 1 \\\\ 0 & 0 & 1 \\end{bmatrix}"}</Eq>{" "}
            的零空間。
          </p>
        ) : (
          <p>
            Find the null space of{" "}
            <Eq>{"A = \\begin{bmatrix} 1 & 2 & 1 \\\\ 0 & 0 & 1 \\end{bmatrix}"}</Eq>.
          </p>
        )}
        <Hint label={zh ? "提示" : "Hint"}>
          {zh ? (
            <>
              找出主元行（1 與 3）與自由行（2）。設自由變數 <Eq>{"x_2 = t"}</Eq>
              ，再由主元方程解出 <Eq>{"x_1, x_3"}</Eq>。
            </>
          ) : (
            <>
              Identify pivot columns (1 and 3) and free columns (2). Set the free variable{" "}
              <Eq>{"x_2 = t"}</Eq> and solve the pivot equations for <Eq>{"x_1, x_3"}</Eq>
              .
            </>
          )}
        </Hint>
        <StepSolution
          steps={[
            {
              title: zh ? "主元 vs 自由" : "Pivots vs free",
              content: (
                <p style={{ margin: 0 }}>
                  {zh ? (
                    <>
                      第 1、3 行有主元；第 2 行是自由的。設 <Eq>{"x_2 = t"}</Eq>。
                    </>
                  ) : (
                    <>
                      Columns 1 and 3 have pivots; column 2 is free. Let{" "}
                      <Eq>{"x_2 = t"}</Eq>.
                    </>
                  )}
                </p>
              ),
            },
            {
              title: zh ? "第 2 列" : "Row 2",
              content: <Equation>{"x_3 = 0"}</Equation>,
            },
            {
              title: zh ? "第 1 列" : "Row 1",
              content: (
                <Equation>{"x_1 + 2x_2 + x_3 = 0 \\Rightarrow x_1 = -2t"}</Equation>
              ),
            },
            {
              title: zh ? "零空間" : "Null space",
              content: (
                <>
                  <Equation>{"x = t\\,(-2, 1, 0)"}</Equation>
                  <p style={{ margin: 0 }}>
                    {zh ? (
                      <>
                        零空間是由 <Eq>{"(-2,1,0)"}</Eq> 生成的直線；零度 = 1，秩 = 2，且{" "}
                        <Eq>{"2 + 1 = 3 = n"}</Eq> ✓。
                      </>
                    ) : (
                      <>
                        The null space is the line spanned by <Eq>{"(-2,1,0)"}</Eq>;
                        nullity = 1, rank = 2, and <Eq>{"2 + 1 = 3 = n"}</Eq> ✓.
                      </>
                    )}
                  </p>
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title={zh ? "機器學習連結" : "ML connection"}>
        <MLCallout
          title={zh ? "秩、冗餘與有效維度" : "Rank, redundancy, and effective dimension"}
          reviewed="2026-07"
        >
          {zh ? (
            <>
              如果兩個特徵完全相關，資料矩陣就是秩虧損的：其中一行不提供新資訊（它落在另一行的生成中）。「有效秩」——有多少個奇異值很大（第
              8 節）——衡量了資料或權重矩陣中真正獨立方向的數目。低有效秩正是使
              <strong>壓縮</strong>與 <strong>LoRA</strong> 成為可能的原因。
            </>
          ) : (
            <>
              If two features are perfectly correlated, the data matrix is rank-deficient:
              one column adds no new information (it's in the span of another). "Effective
              rank" — how many singular values are large (Section 9) — measures the true
              number of independent directions in data or in a weight matrix. Low
              effective rank is exactly what makes <strong>compression</strong> and{" "}
              <strong>LoRA</strong> possible.
            </>
          )}
        </MLCallout>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={zh ? "子空間 — 概念檢查" : "Subspaces — concept check"}
          questions={subspacesQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
