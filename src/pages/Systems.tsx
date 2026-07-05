import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { GaussianDemo } from "../components/GaussianDemo";
import { MLCallout } from "../components/MLCallout";
import { Eq, Equation } from "../components/Equation";
import { systemsQuiz } from "../data/quizzes";

export function Systems() {
  return (
    <Page slug="systems">
      <Section title="Intuition">
        <p>
          A system of linear equations asks: "which values make all these straight-line
          constraints true at once?" In 2D, each equation is a line; the solution is where
          they cross. Three outcomes: lines cross at one point (unique), lie on top of
          each other (infinitely many), or are parallel (no solution).
        </p>
        <ConceptCard tone="intuition">
          Gaussian elimination is just <em>organized substitution</em>: use one equation
          to knock a variable out of the others, repeat, then read off the answer.
        </ConceptCard>
      </Section>

      <Section title="Definition">
        <p>
          Write the system <Eq>{"Ax = b"}</Eq> as an augmented matrix{" "}
          <Eq>{"[A \\mid b]"}</Eq> and apply three{" "}
          <strong>elementary row operations</strong>:
        </p>
        <ul>
          <li>Swap two rows.</li>
          <li>Multiply a row by a nonzero scalar.</li>
          <li>Add a multiple of one row to another.</li>
        </ul>
        <p>
          Reduce to <strong>row echelon form</strong> (staircase of leading 1s = pivots),
          or all the way to <strong>reduced row echelon form (RREF)</strong>. A
          <strong> pivot</strong> is a leading nonzero entry; a column without a pivot is
          a<strong> free variable</strong>. The number of pivots is the{" "}
          <strong>rank</strong>.
        </p>
      </Section>

      <Section title="Small example">
        <p>
          Solve <Eq>{"x + y = 5"}</Eq> and <Eq>{"2x - y = 1"}</Eq>.
        </p>
        <Equation>
          {
            "\\left[\\begin{array}{cc|c} 1 & 1 & 5 \\\\ 2 & -1 & 1 \\end{array}\\right] \\xrightarrow{R_2 - 2R_1} \\left[\\begin{array}{cc|c} 1 & 1 & 5 \\\\ 0 & -3 & -9 \\end{array}\\right]"
          }
        </Equation>
        <p>
          Row 2 gives <Eq>{"-3y = -9 \\Rightarrow y = 3"}</Eq>. Back-substitute:{" "}
          <Eq>{"x = 5 - 3 = 2"}</Eq>. Solution <Eq>{"(2, 3)"}</Eq>.
        </p>
      </Section>

      <Section title="Manual calculation">
        <p>Solve the 3×3 system by elimination:</p>
        <Equation>
          {"2x + y - z = 8,\\quad -3x - y + 2z = -11,\\quad -2x + y + 2z = -3"}
        </Equation>
        <Hint label="Hint: where to start">
          Use row 1 as the pivot row for column 1. Add <Eq>{"\\tfrac32 R_1"}</Eq> to{" "}
          <Eq>{"R_2"}</Eq> and <Eq>{"R_1"}</Eq> to <Eq>{"R_3"}</Eq> to clear the first
          column below the pivot.
        </Hint>
        <StepSolution
          steps={[
            {
              title: "Eliminate x from rows 2 and 3",
              content: (
                <p style={{ margin: 0 }}>
                  After clearing column 1 you get a 2×2 system in <Eq>{"y, z"}</Eq>.
                </p>
              ),
            },
            { title: "Solve for z", content: <Equation>{"z = -1"}</Equation> },
            { title: "Back-substitute for y", content: <Equation>{"y = 3"}</Equation> },
            {
              title: "Back-substitute for x",
              content: (
                <>
                  <Equation>{"x = 2"}</Equation>
                  <p style={{ margin: 0 }}>
                    Check: <Eq>{"2(2) + 3 - (-1) = 8"}</Eq> ✓. Solution{" "}
                    <Eq>{"(2, 3, -1)"}</Eq>.
                  </p>
                </>
              ),
            },
          ]}
        />
        <ConceptCard tone="mistake">
          When you scale a row, scale <em>every</em> entry including the augmented column.
          And a row like <Eq>{"[0\\ 0\\ 0 \\mid 4]"}</Eq> means <Eq>{"0 = 4"}</Eq> —
          that's a contradiction, so the system has no solution. A zero row{" "}
          <Eq>{"[0\\ 0\\ 0 \\mid 0]"}</Eq>
          is fine and signals a free variable.
        </ConceptCard>
      </Section>

      <Section title="Interactive step-by-step solver">
        <p>
          Edit the augmented matrix (the last column is <Eq>{"b"}</Eq>) or load a preset,
          then step through Gauss–Jordan elimination one operation at a time. The three
          presets show the three possible outcomes.
        </p>
        <GaussianDemo />
      </Section>

      <Section title="ML connection">
        <MLCallout title="Solving vs. approximating" reviewed="2026-07">
          Exact solving of <Eq>{"Ax=b"}</Eq> underlies closed-form linear regression (the
          "normal equations" in Section 6). In practice ML data is noisy and
          over-determined (more equations than unknowns), so we rarely solve exactly — we
          find the <em>least-squares</em> best fit. Rank and pivots tell you whether a
          problem is well-posed or has redundant/collinear features.
        </MLCallout>
      </Section>

      <Section title="Practice questions">
        <Quiz title="Linear systems — concept check" questions={systemsQuiz} />
      </Section>
    </Page>
  );
}
