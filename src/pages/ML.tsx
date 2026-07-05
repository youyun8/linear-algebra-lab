import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { MLCallout } from "../components/MLCallout";
import { Eq, Equation } from "../components/Equation";
import { mlQuiz } from "../data/quizzes";

export function ML() {
  return (
    <Page slug="ml">
      <Section title="The big picture">
        <p>
          Modern ML is a tower of matrix multiplications with a few nonlinearities
          sprinkled in. This page connects each earlier chapter to a concrete piece of a
          real model. The names and frameworks change every year; the linear algebra
          underneath is stable. That's what we lean on.
        </p>
        <MLCallout title="How to read this page" reviewed="2026-07">
          For each topic we give the <em>stable math</em> first and the ML framing second.
          Where a topic evolves quickly (attention variants, adapter methods), treat the
          specific recipe as an example of the underlying idea, not gospel.
        </MLCallout>
      </Section>

      <Section title="Embeddings">
        <p>
          Turn a token (word, pixel patch, user) into a vector by a lookup: the embedding
          matrix <Eq>{"E"}</Eq> has one row per vocabulary item. "Embedding of token{" "}
          <Eq>{"t"}</Eq>" is just row <Eq>{"t"}</Eq> of <Eq>{"E"}</Eq>. Similarity between
          tokens is cosine similarity (Section 2). Training nudges these rows so related
          meanings point similar ways.
        </p>
        <Equation>{"\\text{embed}(t) = E_{t,:} \\in \\mathbb{R}^d"}</Equation>
      </Section>

      <Section title="Attention">
        <p>
          Attention is dot products deciding "who should listen to whom". From input{" "}
          <Eq>{"X"}</Eq>
          we make queries, keys, values by three matrix multiplies: <Eq>{"Q = XW_Q"}</Eq>,
          <Eq>{"K = XW_K"}</Eq>, <Eq>{"V = XW_V"}</Eq>. Then:
        </p>
        <Equation>
          {
            "\\operatorname{Attention}(Q,K,V) = \\operatorname{softmax}\\!\\left(\\frac{QK^{\\mathsf T}}{\\sqrt{d_k}}\\right)V"
          }
        </Equation>
        <p>
          <Eq>{"QK^{\\mathsf T}"}</Eq> is a grid of dot products — how well each query
          matches each key. Softmax turns scores into weights; multiplying by{" "}
          <Eq>{"V"}</Eq> forms a weighted average of value vectors. Everything you need
          was in Sections 2–3.
        </p>
        <ConceptCard tone="example" title="Tiny numerical example">
          With one query <Eq>{"q = (1, 0)"}</Eq> and two keys{" "}
          <Eq>{"k_1 = (1,0), k_2 = (0,1)"}</Eq>, scores are <Eq>{"q\\cdot k_1 = 1"}</Eq>{" "}
          and <Eq>{"q\\cdot k_2 = 0"}</Eq>. Softmax(1, 0) ≈ (0.73, 0.27), so the query
          mostly attends to the first token.
        </ConceptCard>
      </Section>

      <Section title="Transformers">
        <p>
          A transformer block stacks: attention (mix information across positions) → a
          feed-forward network (two matrix multiplies with a nonlinearity) → residual adds
          and normalization. Every arrow is a matrix operation. Stack <Eq>{"N"}</Eq>{" "}
          blocks and you have GPT-style models. The depth is just repeated{" "}
          <Eq>{"Wx+b"}</Eq> with attention in between.
        </p>
      </Section>

      <Section title="Normalization">
        <p>
          Layer/RMS normalization rescales a vector so its statistics are stable before
          the next matrix multiply. Conceptually it's an affine map applied per-vector:
          subtract a mean, divide by a spread, then scale and shift by learned parameters.
          Geometrically it keeps activations from blowing up or collapsing, which keeps
          gradients well-behaved.
        </p>
        <Equation>
          {
            "\\hat{x} = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\odot \\gamma + \\beta"
          }
        </Equation>
      </Section>

      <Section title="Gradient descent">
        <p>
          Training minimizes a loss <Eq>{"L(W)"}</Eq> by stepping downhill:{" "}
          <Eq>{"W \\leftarrow W - \\eta\\,\\nabla_W L"}</Eq>. The gradient{" "}
          <Eq>{"\\nabla_W L"}</Eq> is itself computed with matrix multiplications
          (backpropagation is the chain rule expressed as matrix products). Curvature —
          how fast the slope changes — is described by eigenvalues of the Hessian; big
          spreads in those eigenvalues make optimization hard, which is why normalization
          and good conditioning matter.
        </p>
      </Section>

      <Section title="Model compression & low-rank adaptation">
        <p>
          Weight matrices often have quickly-decaying singular values, so a low-rank
          approximation (Section 8) captures most of their behavior with far fewer
          numbers.
        </p>
        <ul>
          <li>
            <strong>Compression</strong>: replace <Eq>{"W"}</Eq> with{" "}
            <Eq>{"U_k \\Sigma_k V_k^{\\mathsf T}"}</Eq>, storing only the top{" "}
            <Eq>{"k"}</Eq> components.
          </li>
          <li>
            <strong>LoRA</strong>: freeze <Eq>{"W"}</Eq>, learn a small{" "}
            <Eq>{"\\Delta W = BA"}</Eq> with inner rank <Eq>{"r"}</Eq>. Forward pass
            becomes <Eq>{"(W + BA)x"}</Eq>; only <Eq>{"B, A"}</Eq> train.
          </li>
          <li>
            <strong>Quantization</strong> (related idea): store the same matrices in fewer
            bits.
          </li>
        </ul>
        <MLCallout title="Why low rank works" reviewed="2026-07">
          The useful part of a fine-tuning update tends to live in a few directions. If
          <Eq>{"\\Delta W"}</Eq> is approximately rank <Eq>{"r"}</Eq>, then{" "}
          <Eq>{"BA"}</Eq> with inner dimension
          <Eq>{"r"}</Eq> reproduces it with <Eq>{"r(m+n)"}</Eq> parameters instead of{" "}
          <Eq>{"mn"}</Eq> — often a 100× reduction. This is the same Eckart–Young
          intuition from SVD.
        </MLCallout>
      </Section>

      <Section title="GPU GEMM kernels">
        <p>
          GEMM = <strong>GE</strong>neral <strong>M</strong>atrix <strong>M</strong>
          ultiply,
          <Eq>{"C = \\alpha AB + \\beta C"}</Eq>. Nearly all the compute in training and
          inference is GEMM. GPUs are fast because they do thousands of multiply-adds in
          parallel and reuse data in fast on-chip memory (tiling). When people say a model
          needs "more FLOPs," they mostly mean "more and bigger matrix multiplies."
          Understanding that a layer is <Eq>{"XW^{\\mathsf T}"}</Eq> is understanding what
          the hardware is optimized for.
        </p>
        <ConceptCard tone="intuition">
          Batching many inputs into one matrix turns many small matrix–vector products
          into one big matrix–matrix product — far more efficient on a GPU. That's why we
          think in matrices, not loops.
        </ConceptCard>
      </Section>

      <Section title="Practice questions">
        <Quiz title="Linear algebra for ML — concept check" questions={mlQuiz} />
      </Section>
    </Page>
  );
}
