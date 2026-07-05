import { useState } from "react";
import { Page, Section } from "../components/Page";
import { Quiz } from "../components/Quiz";
import { Flashcards } from "../components/Flashcards";
import type { Flashcard } from "../components/Flashcards";
import { StepSolution } from "../components/StepSolution";
import { Hint } from "../components/Hint";
import { ConceptCard } from "../components/ConceptCard";
import { Eq } from "../components/Equation";
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
import { DRILL_TOPICS } from "../data/drills";
import type { Drill } from "../data/drills";

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

const totalDrills = DRILL_TOPICS.reduce((n, t) => n + t.drills.length, 0);

/** A single pencil-and-paper exercise: prompt, optional hint, and a hidden step-by-step answer. */
function DrillCard({ drill }: { drill: Drill }) {
  return (
    <div style={{ margin: "1.5rem 0" }}>
      <h3>{drill.title}</h3>
      <p>{drill.prompt}</p>
      {drill.hint && <Hint label="Hint">{drill.hint}</Hint>}
      <StepSolution reveal steps={drill.steps} />
    </div>
  );
}

export function Practice() {
  const [topic, setTopic] = useState(0);
  const [drillTopic, setDrillTopic] = useState(0);
  const current = TOPICS[topic];
  const currentDrills = DRILL_TOPICS[drillTopic];

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
        <p>
          {totalDrills} worked-by-hand exercises. Read the problem, do it on paper, then
          reveal the solution one step at a time to check your reasoning. Pick a topic:
        </p>
        <div className="tag-row" style={{ marginBottom: "0.5rem" }}>
          {DRILL_TOPICS.map((t, i) => (
            <button
              key={t.label}
              className={i === drillTopic ? "btn-primary" : ""}
              onClick={() => setDrillTopic(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div key={currentDrills.label}>
          {currentDrills.drills.map((d) => (
            <DrillCard key={d.id} drill={d} />
          ))}
        </div>
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
