import { useState } from "react";
import { Page, Section } from "../components/Page";
import { Quiz } from "../components/Quiz";
import { Flashcards } from "../components/Flashcards";
import type { Flashcard } from "../components/Flashcards";
import { StepSolution } from "../components/StepSolution";
import { Hint } from "../components/Hint";
import { ConceptCard } from "../components/ConceptCard";
import { Eq, Equation } from "../components/Equation";
import {
  vectorsQuiz,
  matricesQuiz,
  systemsQuiz,
  subspacesQuiz,
  orthogonalityQuiz,
  eigenQuiz,
  svdQuiz,
  mlQuiz,
} from "../data/quizzes";
import type { QuizQuestion } from "../components/Quiz";

const TOPICS: { label: string; questions: QuizQuestion[] }[] = [
  { label: "Vectors", questions: vectorsQuiz },
  { label: "Matrices", questions: matricesQuiz },
  { label: "Linear Systems", questions: systemsQuiz },
  { label: "Subspaces", questions: subspacesQuiz },
  { label: "Orthogonality", questions: orthogonalityQuiz },
  { label: "Eigenvalues", questions: eigenQuiz },
  { label: "SVD", questions: svdQuiz },
  { label: "ML", questions: mlQuiz },
];

const allQuestions = TOPICS.flatMap((t) => t.questions);

const flashcards: Flashcard[] = [
  {
    front: (
      <>
        Dot product <Eq>{"a\\cdot b"}</Eq>
      </>
    ),
    back: (
      <>
        <Eq>{"\\sum_i a_i b_i = \\|a\\|\\|b\\|\\cos\\theta"}</Eq>
        <div>A number measuring alignment.</div>
      </>
    ),
  },
  {
    front: <>Cosine similarity</>,
    back: <Eq>{"\\dfrac{a\\cdot b}{\\|a\\|\\,\\|b\\|}"}</Eq>,
  },
  {
    front: <>Projection of a onto b</>,
    back: <Eq>{"\\dfrac{a\\cdot b}{b\\cdot b}\\,b"}</Eq>,
  },
  {
    front: <>What do the columns of a matrix mean?</>,
    back: <>Where the basis vectors î, ĵ land under the transformation.</>,
  },
  {
    front: (
      <>
        <Eq>{"\\det = 0"}</Eq> means…
      </>
    ),
    back: <>The transformation collapses space to a lower dimension; not invertible.</>,
  },
  {
    front: <>Characteristic equation (2×2)</>,
    back: <Eq>{"\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0"}</Eq>,
  },
  { front: <>Rank–nullity</>, back: <Eq>{"\\text{rank} + \\text{nullity} = n"}</Eq> },
  {
    front: <>Normal equations (least squares)</>,
    back: <Eq>{"A^{\\mathsf T}A\\hat{x} = A^{\\mathsf T}b"}</Eq>,
  },
  {
    front: <>SVD</>,
    back: (
      <>
        <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq>
        <div>rotate · scale · rotate</div>
      </>
    ),
  },
  {
    front: <>Singular values relate to…</>,
    back: (
      <>
        <Eq>{"\\sigma_i = \\sqrt{\\lambda_i(A^{\\mathsf T}A)}"}</Eq>
      </>
    ),
  },
  {
    front: <>Attention score matrix</>,
    back: <Eq>{"\\operatorname{softmax}(QK^{\\mathsf T}/\\sqrt{d_k})V"}</Eq>,
  },
  {
    front: <>LoRA update</>,
    back: (
      <>
        <Eq>{"\\Delta W = BA"}</Eq> (low rank, few parameters)
      </>
    ),
  },
];

export function Practice() {
  const [topic, setTopic] = useState(0);
  const current = TOPICS[topic];

  return (
    <Page slug="practice">
      <Section title="How to practice">
        <p>
          Each topic below gives you four things: a <strong>concept check</strong> (the
          quiz), a <strong>calculation drill</strong> (do it by hand, then reveal), a
          <strong> visual intuition</strong> prompt, and an <strong>ML connection</strong>
          question. Explanations tell you <em>why</em>, so a wrong answer is a lesson, not
          a dead end.
        </p>
      </Section>

      <Section title="Concept-check quizzes">
        <div className="tag-row" style={{ marginBottom: "0.5rem" }}>
          {TOPICS.map((t, i) => (
            <button
              key={t.label}
              className={i === topic ? "btn-primary" : ""}
              onClick={() => setTopic(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Quiz
          key={current.label}
          title={`${current.label} — quiz`}
          questions={current.questions}
        />
      </Section>

      <Section title="Mixed final review">
        <p>
          All {allQuestions.length} concept-check questions across every topic, shuffled
          into one run.
        </p>
        <Quiz title="Full-course review" questions={allQuestions} />
      </Section>

      <Section title="Flashcards">
        <p>Flip through the core formulas until they're automatic.</p>
        <Flashcards cards={flashcards} />
      </Section>

      <Section title="Calculation drills">
        <h3>Drill 1 — Dot product & angle</h3>
        <p>
          Compute <Eq>{"a\\cdot b"}</Eq> and the angle for <Eq>{"a = (1, 2)"}</Eq>,{" "}
          <Eq>{"b = (2, -1)"}</Eq>.
        </p>
        <Hint label="Hint">If the dot product is 0, the angle is 90°.</Hint>
        <StepSolution
          reveal={false}
          steps={[
            { content: <Equation>{"a\\cdot b = 1\\cdot2 + 2\\cdot(-1) = 0"}</Equation> },
            {
              content: (
                <>
                  Since the dot product is 0, <Eq>{"\\theta = 90^\\circ"}</Eq> — the
                  vectors are orthogonal.
                </>
              ),
            },
          ]}
        />

        <h3>Drill 2 — 2×2 determinant & invertibility</h3>
        <p>
          Is <Eq>{"A = \\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}"}</Eq> invertible?
        </p>
        <StepSolution
          reveal={false}
          steps={[
            { content: <Equation>{"\\det A = 2\\cdot2 - 4\\cdot1 = 0"}</Equation> },
            {
              content: (
                <>
                  det = 0, so <strong>not invertible</strong>. Row 2 is half of row 1 —
                  the columns are collinear (rank 1).
                </>
              ),
            },
          ]}
        />

        <h3>Drill 3 — Eigenvalues</h3>
        <p>
          Eigenvalues of{" "}
          <Eq>{"A = \\begin{bmatrix} 2 & 0 \\\\ 0 & -3 \\end{bmatrix}"}</Eq>?
        </p>
        <StepSolution
          reveal={false}
          steps={[
            { content: <>A diagonal matrix has its eigenvalues on the diagonal.</> },
            { content: <Equation>{"\\lambda = 2,\\ -3"}</Equation> },
          ]}
        />

        <h3>Drill 4 — Singular values</h3>
        <p>
          Singular values of{" "}
          <Eq>{"A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 2 \\end{bmatrix}"}</Eq>?
        </p>
        <StepSolution
          reveal={false}
          steps={[
            {
              content: (
                <>
                  <Eq>
                    {"A^{\\mathsf T}A = \\begin{bmatrix} 9 & 0 \\\\ 0 & 4\\end{bmatrix}"}
                  </Eq>
                  , eigenvalues 9 and 4.
                </>
              ),
            },
            { content: <Equation>{"\\sigma_1 = 3,\\ \\sigma_2 = 2"}</Equation> },
          ]}
        />
      </Section>

      <Section title="Visual intuition & ML connection prompts">
        <ConceptCard tone="intuition" title="Visual intuition — try to picture it">
          <ul style={{ margin: 0 }}>
            <li>
              Sketch two vectors with a positive, zero, and negative dot product. What
              angle does each imply?
            </li>
            <li>
              Draw where <Eq>{"\\hat i, \\hat j"}</Eq> go under a shear{" "}
              <Eq>{"\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}"}</Eq>.
            </li>
            <li>
              Imagine a unit circle transformed by a matrix — sketch the output ellipse
              and mark its axes (the singular vectors).
            </li>
          </ul>
        </ConceptCard>
        <ConceptCard tone="example" title="ML connection — explain in one sentence each">
          <ul style={{ margin: 0 }}>
            <li>Why is cosine similarity, not raw distance, used for embeddings?</li>
            <li>
              Why is a dense layer a matrix multiply, and why does batching help GPUs?
            </li>
            <li>
              Why does keeping the top singular values compress an image or a weight
              matrix?
            </li>
            <li>Why does LoRA train so few parameters yet work well?</li>
          </ul>
        </ConceptCard>
      </Section>
    </Page>
  );
}
