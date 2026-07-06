import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Quiz } from "../components/Quiz";
import { MLCallout } from "../components/MLCallout";
import { Figure } from "../components/Figure";
import { AttentionFigure } from "../components/diagrams";
import { Eq, Equation } from "../components/Equation";
import { mlQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

export function ML() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="ml">
      <Section title={zh ? "宏觀全貌" : "The big picture"}>
        {zh ? (
          <p>
            現代機器學習是一座由矩陣乘法堆成的高塔，中間點綴著少數幾個非線性。本頁把前面每一章連結到一個真實模型的具體部件。名稱與框架每年都在變；底下的線性代數則很穩定。這正是我們所倚賴的。
          </p>
        ) : (
          <p>
            Modern ML is a tower of matrix multiplications with a few nonlinearities
            sprinkled in. This page connects each earlier chapter to a concrete piece of a
            real model. The names and frameworks change every year; the linear algebra
            underneath is stable. That's what we lean on.
          </p>
        )}
        <MLCallout
          title={zh ? "如何閱讀本頁" : "How to read this page"}
          reviewed="2026-07"
        >
          {zh
            ? "對於每個主題，我們先給出穩定的數學，再給出機器學習的框架。凡是快速演變的主題（注意力變體、轉接器方法），請把具體作法當成底層想法的一個範例，而非金科玉律。"
            : "For each topic we give the stable math first and the ML framing second. Where a topic evolves quickly (attention variants, adapter methods), treat the specific recipe as an example of the underlying idea, not gospel."}
        </MLCallout>
      </Section>

      <Section title={zh ? "嵌入" : "Embeddings"}>
        {zh ? (
          <p>
            透過查表把一個 token（字、像素塊、使用者）轉成向量：嵌入矩陣 <Eq>{"E"}</Eq>{" "}
            的每一列對應一個詞彙項目。「token <Eq>{"t"}</Eq> 的嵌入」就是 <Eq>{"E"}</Eq>{" "}
            的第 <Eq>{"t"}</Eq> 列。token 之間的相似度是餘弦相似度（第 2
            節）。訓練會微調這些列，讓相關的意義指向相似的方向。
          </p>
        ) : (
          <p>
            Turn a token (word, pixel patch, user) into a vector by a lookup: the
            embedding matrix <Eq>{"E"}</Eq> has one row per vocabulary item. "Embedding of
            token <Eq>{"t"}</Eq>" is just row <Eq>{"t"}</Eq> of <Eq>{"E"}</Eq>. Similarity
            between tokens is cosine similarity (Section 2). Training nudges these rows so
            related meanings point similar ways.
          </p>
        )}
        <Equation>{"\\text{embed}(t) = E_{t,:} \\in \\mathbb{R}^d"}</Equation>
      </Section>

      <Section title={zh ? "注意力" : "Attention"}>
        {zh ? (
          <p>
            注意力是由內積來決定「誰該聽誰的」。從輸入 <Eq>{"X"}</Eq>{" "}
            我們透過三次矩陣乘法製造查詢、鍵、值：<Eq>{"Q = XW_Q"}</Eq>、
            <Eq>{"K = XW_K"}</Eq>、<Eq>{"V = XW_V"}</Eq>。然後：
          </p>
        ) : (
          <p>
            Attention is dot products deciding "who should listen to whom". From input{" "}
            <Eq>{"X"}</Eq>
            we make queries, keys, values by three matrix multiplies:{" "}
            <Eq>{"Q = XW_Q"}</Eq>,<Eq>{"K = XW_K"}</Eq>, <Eq>{"V = XW_V"}</Eq>. Then:
          </p>
        )}
        <Equation>
          {
            "\\operatorname{Attention}(Q,K,V) = \\operatorname{softmax}\\!\\left(\\frac{QK^{\\mathsf T}}{\\sqrt{d_k}}\\right)V"
          }
        </Equation>
        <Figure
          caption={
            zh ? (
              <>
                <Eq>{"QK^{\\mathsf T}"}</Eq> 的每一格是一個查詢與一個鍵的內積；經過
                softmax 後成為注意力權重（每列總和為 1）。顏色越深＝關注越多。
              </>
            ) : (
              <>
                Each cell of <Eq>{"QK^{\\mathsf T}"}</Eq> is a dot product of one query
                with one key; after softmax it becomes an attention weight (each row sums
                to 1). Darker = more attention.
              </>
            )
          }
        >
          <AttentionFigure />
        </Figure>
        {zh ? (
          <p>
            <Eq>{"QK^{\\mathsf T}"}</Eq>{" "}
            是一格格的內積——每個查詢與每個鍵的匹配程度。Softmax 把分數轉成權重；乘上{" "}
            <Eq>{"V"}</Eq> 就形成值向量的加權平均。你需要的一切都在第 2–3 節裡。
          </p>
        ) : (
          <p>
            <Eq>{"QK^{\\mathsf T}"}</Eq> is a grid of dot products — how well each query
            matches each key. Softmax turns scores into weights; multiplying by{" "}
            <Eq>{"V"}</Eq> forms a weighted average of value vectors. Everything you need
            was in Sections 2–3.
          </p>
        )}
        <ConceptCard tone="example" title={zh ? "小數值範例" : "Tiny numerical example"}>
          {zh ? (
            <>
              以一個查詢 <Eq>{"q = (1, 0)"}</Eq> 與兩個鍵{" "}
              <Eq>{"k_1 = (1,0), k_2 = (0,1)"}</Eq> 為例，分數為{" "}
              <Eq>{"q\\cdot k_1 = 1"}</Eq> 與 <Eq>{"q\\cdot k_2 = 0"}</Eq>。Softmax(1, 0)
              ≈ (0.73, 0.27)，所以此查詢大多關注第一個 token。
            </>
          ) : (
            <>
              With one query <Eq>{"q = (1, 0)"}</Eq> and two keys{" "}
              <Eq>{"k_1 = (1,0), k_2 = (0,1)"}</Eq>, scores are{" "}
              <Eq>{"q\\cdot k_1 = 1"}</Eq> and <Eq>{"q\\cdot k_2 = 0"}</Eq>. Softmax(1, 0)
              ≈ (0.73, 0.27), so the query mostly attends to the first token.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "Transformer" : "Transformers"}>
        {zh ? (
          <p>
            一個 Transformer 區塊堆疊了：注意力（跨位置混合資訊）→
            前饋網路（兩次矩陣乘法加上一個非線性）→
            殘差相加與正規化。每一個箭頭都是一個矩陣運算。堆疊 <Eq>{"N"}</Eq>{" "}
            個區塊，你就得到 GPT 式的模型。這個深度不過是反覆的 <Eq>{"Wx+b"}</Eq>
            ，中間夾著注意力。
          </p>
        ) : (
          <p>
            A transformer block stacks: attention (mix information across positions) → a
            feed-forward network (two matrix multiplies with a nonlinearity) → residual
            adds and normalization. Every arrow is a matrix operation. Stack{" "}
            <Eq>{"N"}</Eq> blocks and you have GPT-style models. The depth is just
            repeated <Eq>{"Wx+b"}</Eq> with attention in between.
          </p>
        )}
      </Section>

      <Section title={zh ? "正規化" : "Normalization"}>
        {zh ? (
          <p>
            Layer／RMS
            正規化會重新縮放一個向量，使其統計量在進入下一次矩陣乘法之前保持穩定。概念上它是逐向量套用的仿射映射：減去平均、除以離散度，再以學到的參數縮放與平移。從幾何上看，它讓激勵值不至於爆增或崩塌，從而使梯度表現良好。
          </p>
        ) : (
          <p>
            Layer/RMS normalization rescales a vector so its statistics are stable before
            the next matrix multiply. Conceptually it's an affine map applied per-vector:
            subtract a mean, divide by a spread, then scale and shift by learned
            parameters. Geometrically it keeps activations from blowing up or collapsing,
            which keeps gradients well-behaved.
          </p>
        )}
        <Equation>
          {
            "\\hat{x} = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\odot \\gamma + \\beta"
          }
        </Equation>
      </Section>

      <Section title={zh ? "梯度下降" : "Gradient descent"}>
        {zh ? (
          <p>
            訓練透過沿下坡邁步來最小化損失 <Eq>{"L(W)"}</Eq>：
            <Eq>{"W \\leftarrow W - \\eta\\,\\nabla_W L"}</Eq>。梯度{" "}
            <Eq>{"\\nabla_W L"}</Eq>{" "}
            本身也是用矩陣乘法算出來的（反向傳播就是以矩陣乘積表達的連鎖律）。曲率——斜率變化的快慢——由
            Hessian
            的特徵值描述；那些特徵值的差距過大會讓最佳化變難，這也是正規化與良好條件性很重要的原因。
          </p>
        ) : (
          <p>
            Training minimizes a loss <Eq>{"L(W)"}</Eq> by stepping downhill:{" "}
            <Eq>{"W \\leftarrow W - \\eta\\,\\nabla_W L"}</Eq>. The gradient{" "}
            <Eq>{"\\nabla_W L"}</Eq> is itself computed with matrix multiplications
            (backpropagation is the chain rule expressed as matrix products). Curvature —
            how fast the slope changes — is described by eigenvalues of the Hessian; big
            spreads in those eigenvalues make optimization hard, which is why
            normalization and good conditioning matter.
          </p>
        )}
      </Section>

      <Section
        title={zh ? "模型壓縮與低秩調適" : "Model compression & low-rank adaptation"}
      >
        {zh ? (
          <p>
            權重矩陣的奇異值往往快速衰減，因此低秩近似（第 8
            節）能用少得多的數字捕捉其大部分行為。
          </p>
        ) : (
          <p>
            Weight matrices often have quickly-decaying singular values, so a low-rank
            approximation (Section 9) captures most of their behavior with far fewer
            numbers.
          </p>
        )}
        <ul>
          {zh ? (
            <>
              <li>
                <strong>壓縮</strong>：用 <Eq>{"U_k \\Sigma_k V_k^{\\mathsf T}"}</Eq> 取代{" "}
                <Eq>{"W"}</Eq>，只儲存最大的 <Eq>{"k"}</Eq> 個成分。
              </li>
              <li>
                <strong>LoRA</strong>：凍結 <Eq>{"W"}</Eq>，學習一個內秩為 <Eq>{"r"}</Eq>{" "}
                的小型 <Eq>{"\\Delta W = BA"}</Eq>。前向傳播變成 <Eq>{"(W + BA)x"}</Eq>
                ；只有 <Eq>{"B, A"}</Eq> 參與訓練。
              </li>
              <li>
                <strong>量化</strong>（相關想法）：以更少的位元儲存相同的矩陣。
              </li>
            </>
          ) : (
            <>
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
                <strong>Quantization</strong> (related idea): store the same matrices in
                fewer bits.
              </li>
            </>
          )}
        </ul>
        <MLCallout
          title={zh ? "為什麼低秩有效" : "Why low rank works"}
          reviewed="2026-07"
        >
          {zh ? (
            <>
              一次微調更新中真正有用的部分，往往只存在於少數幾個方向。如果{" "}
              <Eq>{"\\Delta W"}</Eq> 近似為秩 <Eq>{"r"}</Eq>，那麼內維度為 <Eq>{"r"}</Eq>{" "}
              的 <Eq>{"BA"}</Eq> 就能用 <Eq>{"r(m+n)"}</Eq> 個參數（而非 <Eq>{"mn"}</Eq>
              ）重現它——常常是 100 倍的縮減。這正是 SVD 中同樣的 Eckart–Young 直覺。
            </>
          ) : (
            <>
              The useful part of a fine-tuning update tends to live in a few directions.
              If <Eq>{"\\Delta W"}</Eq> is approximately rank <Eq>{"r"}</Eq>, then{" "}
              <Eq>{"BA"}</Eq> with inner dimension
              <Eq>{"r"}</Eq> reproduces it with <Eq>{"r(m+n)"}</Eq> parameters instead of{" "}
              <Eq>{"mn"}</Eq> — often a 100× reduction. This is the same Eckart–Young
              intuition from SVD.
            </>
          )}
        </MLCallout>
      </Section>

      <Section title={zh ? "GPU GEMM 核心" : "GPU GEMM kernels"}>
        {zh ? (
          <p>
            GEMM ＝ <strong>GE</strong>neral <strong>M</strong>atrix <strong>M</strong>
            ultiply（一般矩陣乘法），<Eq>{"C = \\alpha AB + \\beta C"}</Eq>
            。訓練與推論中幾乎所有的運算都是 GEMM。GPU
            之所以快，是因為它們平行地做數千次乘加，並在快速的晶片上記憶體中重複利用資料（分塊，tiling）。當人們說一個模型需要「更多
            FLOPs」時，他們多半是指「更多、更大的矩陣乘法」。理解一個層就是{" "}
            <Eq>{"XW^{\\mathsf T}"}</Eq>，就是理解硬體為何而最佳化。
          </p>
        ) : (
          <p>
            GEMM = <strong>GE</strong>neral <strong>M</strong>atrix <strong>M</strong>
            ultiply,
            <Eq>{"C = \\alpha AB + \\beta C"}</Eq>. Nearly all the compute in training and
            inference is GEMM. GPUs are fast because they do thousands of multiply-adds in
            parallel and reuse data in fast on-chip memory (tiling). When people say a
            model needs "more FLOPs," they mostly mean "more and bigger matrix
            multiplies." Understanding that a layer is <Eq>{"XW^{\\mathsf T}"}</Eq> is
            understanding what the hardware is optimized for.
          </p>
        )}
        <ConceptCard tone="intuition">
          {zh
            ? "把許多輸入分批成一個矩陣，就把許多小的矩陣–向量乘積變成一個大的矩陣–矩陣乘積——在 GPU 上高效得多。這就是我們用矩陣、而非迴圈來思考的原因。"
            : "Batching many inputs into one matrix turns many small matrix–vector products into one big matrix–matrix product — far more efficient on a GPU. That's why we think in matrices, not loops."}
        </ConceptCard>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={
            zh
              ? "機器學習中的線性代數 — 概念檢查"
              : "Linear algebra for ML — concept check"
          }
          questions={mlQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
