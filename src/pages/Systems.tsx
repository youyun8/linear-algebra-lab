import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { GaussianDemo } from "../components/GaussianDemo";
import { MLCallout } from "../components/MLCallout";
import { Figure } from "../components/Figure";
import { LinesFigure } from "../components/diagrams";
import { Eq, Equation } from "../components/Equation";
import { systemsQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

export function Systems() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="systems">
      <Section title={zh ? "直覺" : "Intuition"}>
        {zh ? (
          <p>
            線性方程組問的是：「哪些值能讓所有這些直線約束同時成立？」在二維中，每條方程式是一條直線；解就是它們相交之處。三種結果：直線交於一點（唯一）、彼此重合（無限多），或平行（無解）。
          </p>
        ) : (
          <p>
            A system of linear equations asks: "which values make all these straight-line
            constraints true at once?" In 2D, each equation is a line; the solution is
            where they cross. Three outcomes: lines cross at one point (unique), lie on
            top of each other (infinitely many), or are parallel (no solution).
          </p>
        )}
        <ConceptCard tone="intuition">
          {zh ? (
            <>
              高斯消去法其實就是<em>有條理的代入</em>
              ：用一條方程式把某個變數從其他方程式中消去，重複進行，然後讀出答案。
            </>
          ) : (
            <>
              Gaussian elimination is just <em>organized substitution</em>: use one
              equation to knock a variable out of the others, repeat, then read off the
              answer.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "定義" : "Definition"}>
        {zh ? (
          <p>
            把方程組 <Eq>{"Ax = b"}</Eq> 寫成增廣矩陣 <Eq>{"[A \\mid b]"}</Eq>，並套用三種
            <strong>基本列運算</strong>：
          </p>
        ) : (
          <p>
            Write the system <Eq>{"Ax = b"}</Eq> as an augmented matrix{" "}
            <Eq>{"[A \\mid b]"}</Eq> and apply three{" "}
            <strong>elementary row operations</strong>:
          </p>
        )}
        <ul>
          {zh ? (
            <>
              <li>交換兩列。</li>
              <li>將一列乘上一個非零純量。</li>
              <li>將某一列的倍數加到另一列。</li>
            </>
          ) : (
            <>
              <li>Swap two rows.</li>
              <li>Multiply a row by a nonzero scalar.</li>
              <li>Add a multiple of one row to another.</li>
            </>
          )}
        </ul>
        {zh ? (
          <p>
            化簡到<strong>列梯形式</strong>（主元 1 排成階梯狀），或一路化到
            <strong>最簡列梯形式（RREF）</strong>。<strong>主元</strong>
            是一列中的第一個非零元素；沒有主元的一行是
            <strong>自由變數</strong>。主元的數目即為<strong>秩</strong>。
          </p>
        ) : (
          <p>
            Reduce to <strong>row echelon form</strong> (staircase of leading 1s =
            pivots), or all the way to <strong>reduced row echelon form (RREF)</strong>. A
            <strong> pivot</strong> is a leading nonzero entry; a column without a pivot
            is a<strong> free variable</strong>. The number of pivots is the{" "}
            <strong>rank</strong>.
          </p>
        )}
      </Section>

      <Section title={zh ? "小範例" : "Small example"}>
        {zh ? (
          <p>
            求解 <Eq>{"x + y = 5"}</Eq> 與 <Eq>{"2x - y = 1"}</Eq>。
          </p>
        ) : (
          <p>
            Solve <Eq>{"x + y = 5"}</Eq> and <Eq>{"2x - y = 1"}</Eq>.
          </p>
        )}
        <Equation>
          {
            "\\left[\\begin{array}{cc|c} 1 & 1 & 5 \\\\ 2 & -1 & 1 \\end{array}\\right] \\xrightarrow{R_2 - 2R_1} \\left[\\begin{array}{cc|c} 1 & 1 & 5 \\\\ 0 & -3 & -9 \\end{array}\\right]"
          }
        </Equation>
        {zh ? (
          <p>
            第 2 列給出 <Eq>{"-3y = -9 \\Rightarrow y = 3"}</Eq>。回代：
            <Eq>{"x = 5 - 3 = 2"}</Eq>。解為 <Eq>{"(2, 3)"}</Eq>。
          </p>
        ) : (
          <p>
            Row 2 gives <Eq>{"-3y = -9 \\Rightarrow y = 3"}</Eq>. Back-substitute:{" "}
            <Eq>{"x = 5 - 3 = 2"}</Eq>. Solution <Eq>{"(2, 3)"}</Eq>.
          </p>
        )}
        <Figure
          caption={
            zh ? (
              <>
                每個方程式是一條直線；解 <Eq>{"(2, 3)"}</Eq>{" "}
                就是兩條直線相交之處。平行則無解，重合則有無限多解。
              </>
            ) : (
              <>
                Each equation is a line; the solution <Eq>{"(2, 3)"}</Eq> is where the two
                lines cross. Parallel lines give no solution, coincident lines give
                infinitely many.
              </>
            )
          }
        >
          <LinesFigure />
        </Figure>
      </Section>

      <Section title={zh ? "手算" : "Manual calculation"}>
        {zh ? (
          <p>用消去法求解這個 3×3 方程組：</p>
        ) : (
          <p>Solve the 3×3 system by elimination:</p>
        )}
        <Equation>
          {"2x + y - z = 8,\\quad -3x - y + 2z = -11,\\quad -2x + y + 2z = -3"}
        </Equation>
        <Hint label={zh ? "提示：從哪裡開始" : "Hint: where to start"}>
          {zh ? (
            <>
              以第 1 列作為第 1 行的主元列。把 <Eq>{"\\tfrac32 R_1"}</Eq> 加到{" "}
              <Eq>{"R_2"}</Eq>、把 <Eq>{"R_1"}</Eq> 加到 <Eq>{"R_3"}</Eq>
              ，以清除主元下方的第一行。
            </>
          ) : (
            <>
              Use row 1 as the pivot row for column 1. Add <Eq>{"\\tfrac32 R_1"}</Eq> to{" "}
              <Eq>{"R_2"}</Eq> and <Eq>{"R_1"}</Eq> to <Eq>{"R_3"}</Eq> to clear the first
              column below the pivot.
            </>
          )}
        </Hint>
        <StepSolution
          steps={[
            {
              title: zh ? "從第 2、3 列消去 x" : "Eliminate x from rows 2 and 3",
              content: (
                <p style={{ margin: 0 }}>
                  {zh ? (
                    <>
                      清除第 1 行後，你會得到一個關於 <Eq>{"y, z"}</Eq> 的 2×2 方程組。
                    </>
                  ) : (
                    <>
                      After clearing column 1 you get a 2×2 system in <Eq>{"y, z"}</Eq>.
                    </>
                  )}
                </p>
              ),
            },
            {
              title: zh ? "解出 z" : "Solve for z",
              content: <Equation>{"z = -1"}</Equation>,
            },
            {
              title: zh ? "回代求 y" : "Back-substitute for y",
              content: <Equation>{"y = 3"}</Equation>,
            },
            {
              title: zh ? "回代求 x" : "Back-substitute for x",
              content: (
                <>
                  <Equation>{"x = 2"}</Equation>
                  <p style={{ margin: 0 }}>
                    {zh ? "檢查：" : "Check: "}
                    <Eq>{"2(2) + 3 - (-1) = 8"}</Eq> ✓{zh ? "。解為 " : ". Solution "}
                    <Eq>{"(2, 3, -1)"}</Eq>
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
              當你縮放某一列時，要縮放<em>每一個</em>元素，包括增廣行。而像{" "}
              <Eq>{"[0\\ 0\\ 0 \\mid 4]"}</Eq> 的一列代表 <Eq>{"0 = 4"}</Eq>
              ——這是矛盾，因此方程組無解。零列 <Eq>{"[0\\ 0\\ 0 \\mid 0]"}</Eq>{" "}
              沒問題，它代表一個自由變數。
            </>
          ) : (
            <>
              When you scale a row, scale <em>every</em> entry including the augmented
              column. And a row like <Eq>{"[0\\ 0\\ 0 \\mid 4]"}</Eq> means{" "}
              <Eq>{"0 = 4"}</Eq> — that's a contradiction, so the system has no solution.
              A zero row <Eq>{"[0\\ 0\\ 0 \\mid 0]"}</Eq>
              is fine and signals a free variable.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "互動逐步求解器" : "Interactive step-by-step solver"}>
        {zh ? (
          <p>
            編輯增廣矩陣（最後一行是 <Eq>{"b"}</Eq>
            ）或載入預設，然後一次一個運算地逐步執行 Gauss–Jordan
            消去法。三個預設分別展示三種可能的結果。
          </p>
        ) : (
          <p>
            Edit the augmented matrix (the last column is <Eq>{"b"}</Eq>) or load a
            preset, then step through Gauss–Jordan elimination one operation at a time.
            The three presets show the three possible outcomes.
          </p>
        )}
        <GaussianDemo />
      </Section>

      <Section title={zh ? "機器學習連結" : "ML connection"}>
        <MLCallout
          title={zh ? "精確求解 vs. 近似" : "Solving vs. approximating"}
          reviewed="2026-07"
        >
          {zh ? (
            <>
              精確求解 <Eq>{"Ax=b"}</Eq> 是封閉形式線性迴歸（第 6
              節的「正規方程」）的基礎。實務上機器學習資料充滿雜訊且過度決定（方程式多於未知數），因此我們很少精確求解——而是找出
              <em>最小平方</em>
              最佳擬合。秩與主元告訴你一個問題是否適定，或是否有冗餘／共線的特徵。
            </>
          ) : (
            <>
              Exact solving of <Eq>{"Ax=b"}</Eq> underlies closed-form linear regression
              (the "normal equations" in Section 6). In practice ML data is noisy and
              over-determined (more equations than unknowns), so we rarely solve exactly —
              we find the <em>least-squares</em> best fit. Rank and pivots tell you
              whether a problem is well-posed or has redundant/collinear features.
            </>
          )}
        </MLCallout>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={zh ? "線性方程組 — 概念檢查" : "Linear systems — concept check"}
          questions={systemsQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
