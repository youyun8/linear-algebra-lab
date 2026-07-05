import { Link } from "react-router-dom";
import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { MLCallout } from "../components/MLCallout";
import { Quiz } from "../components/Quiz";
import { Eq, Equation } from "../components/Equation";
import { diagnosticQuiz } from "../data/quizzes";

export function StartHere() {
  return (
    <Page slug="start-here">
      <Section title="Why linear algebra matters for machine learning">
        <p>
          Almost everything a modern ML model does is linear algebra wearing a costume. An
          image is a grid of numbers — a matrix. A word's "meaning" is a list of numbers —
          a vector. A neural network layer is a matrix multiply. Training is repeatedly
          nudging matrices. Attention in a transformer is a pile of dot products. If you
          understand vectors, matrices, and a handful of decompositions, you can read the
          actual math behind PCA, embeddings, transformers, and model compression.
        </p>
        <ConceptCard tone="intuition" title="The one-sentence version">
          Linear algebra is the language of "lots of numbers at once, transformed in
          predictable ways." ML is that idea applied at massive scale.
        </ConceptCard>
      </Section>

      <Section title="A roadmap: from vectors to SVD to ML">
        <p>We climb a ladder. Each rung uses the one below it.</p>
        <ol>
          <li>
            <strong>Vectors</strong> — points/arrows of numbers; dot products measure
            similarity. → embeddings.
          </li>
          <li>
            <strong>Matrices</strong> — tables of numbers <em>and</em> transformations. →
            neural-network layers.
          </li>
          <li>
            <strong>Linear systems</strong> — solving <Eq>{"Ax = b"}</Eq>; rank and
            pivots.
          </li>
          <li>
            <strong>Subspaces</strong> — span, basis, dimension; the four fundamental
            subspaces.
          </li>
          <li>
            <strong>Orthogonality</strong> — perpendicularity, projection, least squares.
            → linear regression.
          </li>
          <li>
            <strong>Eigenvalues &amp; eigenvectors</strong> — directions a matrix only
            stretches. → PCA.
          </li>
          <li>
            <strong>SVD</strong> — the master decomposition every matrix has. →
            compression, recommendation, LoRA.
          </li>
          <li>
            <strong>Modern ML</strong> — put it all together: attention, transformers,
            GEMM.
          </li>
        </ol>
        <Equation>
          {
            "\\text{vectors} \\to \\text{matrices} \\to \\text{eigen} \\to \\text{SVD} \\to \\text{ML}"
          }
        </Equation>
      </Section>

      <Section title="How to use this site">
        <ul>
          <li>
            Read the <strong>Intuition</strong> first. Don't skip to formulas.
          </li>
          <li>
            Do the <strong>manual calculations</strong> with a pencil before revealing
            hints.
          </li>
          <li>
            Play with every <strong>interactive demo</strong> — wiggle the numbers.
          </li>
          <li>
            Finish each page's <strong>practice questions</strong>; revisit the{" "}
            <Link to="/practice">Practice Lab</Link> weekly.
          </li>
        </ul>
        <MLCallout reviewed="2026-07">
          The ML sections stay anchored to stable math. Frameworks and model names change
          fast; dot products, projections, and eigenvalues do not. Where a topic is
          fast-moving (e.g. LoRA, attention variants) we mark a "Last reviewed" date and
          focus on the underlying linear algebra.
        </MLCallout>
      </Section>

      <Section title="Diagnostic quiz">
        <p>
          Not sure where to start? Try these five questions. Missing one is completely
          fine — it just tells you which early section to read carefully. Every answer
          comes with an explanation.
        </p>
        <Quiz title="Where are you starting from?" questions={diagnosticQuiz} />
        <p style={{ marginTop: "1.5rem" }}>
          Ready? Head to <Link to="/vectors">Section 2 · Vectors →</Link>
        </p>
      </Section>
    </Page>
  );
}
