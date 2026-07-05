import { Link } from "react-router-dom";
import { LESSONS } from "../lessons";

export function Home() {
  return (
    <div className="page">
      <div className="hero">
        <span className="pill">Linear Algebra × Machine Learning</span>
        <h1>Linear Algebra Lab</h1>
        <p>
          Start from zero. Build real intuition for vectors, matrices, eigenvalues, and
          SVD — then see exactly how they power PCA, embeddings, attention, transformers,
          and LoRA. Visual first, formulas second, and lots of worked examples.
        </p>
        <div className="hero-actions">
          <Link to="/start-here" className="btn btn-primary">
            Start here →
          </Link>
          <Link to="/svd" className="btn">
            Jump to the SVD calculator
          </Link>
        </div>
      </div>

      <h2>What you'll be able to do</h2>
      <ul>
        <li>Read and manipulate vectors and matrices without fear.</li>
        <li>Compute a 2×2 SVD by hand, step by step.</li>
        <li>
          Explain PCA, embeddings, attention, low-rank approximation, and LoRA using the
          math you learned.
        </li>
      </ul>

      <h2>The course</h2>
      <div className="card-grid">
        {LESSONS.map((l) => (
          <Link key={l.slug} to={`/${l.slug}`} className="link-card">
            <div className="lc-num">Section {l.num}</div>
            <div className="lc-title">{l.title}</div>
            <div className="lc-desc">{l.description}</div>
          </Link>
        ))}
      </div>

      <h2>How each lesson is structured</h2>
      <p>Every topic follows the same rhythm, so you always know where you are:</p>
      <ol>
        <li>
          <strong>Intuition</strong> — a picture or story before any symbols.
        </li>
        <li>
          <strong>Definition</strong> — the precise statement.
        </li>
        <li>
          <strong>Small example</strong> — concrete numbers.
        </li>
        <li>
          <strong>Manual calculation</strong> — do it by hand, with hints.
        </li>
        <li>
          <strong>Interactive demo</strong> — play with it.
        </li>
        <li>
          <strong>ML connection</strong> — why it matters for modern AI.
        </li>
        <li>
          <strong>Practice questions</strong> — check yourself.
        </li>
      </ol>
    </div>
  );
}
