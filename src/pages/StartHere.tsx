import { Link } from "react-router-dom";
import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { MLCallout } from "../components/MLCallout";
import { Quiz } from "../components/Quiz";
import { Eq, Equation } from "../components/Equation";
import { diagnosticQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

export function StartHere() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="start-here">
      <Section
        title={
          zh
            ? "為什麼線性代數對機器學習很重要"
            : "Why linear algebra matters for machine learning"
        }
      >
        {zh ? (
          <p>
            現代機器學習模型所做的幾乎一切，都是穿了戲服的線性代數。一張影像是一格格的數字——一個矩陣。一個字的「意義」是一串數字——一個向量。一個神經網路層就是一次矩陣乘法。訓練就是反覆微調矩陣。Transformer
            中的注意力是一堆內積。只要你理解向量、矩陣，以及少數幾種分解，就能讀懂
            PCA、嵌入、Transformer 與模型壓縮背後真正的數學。
          </p>
        ) : (
          <p>
            Almost everything a modern ML model does is linear algebra wearing a costume.
            An image is a grid of numbers — a matrix. A word's "meaning" is a list of
            numbers — a vector. A neural network layer is a matrix multiply. Training is
            repeatedly nudging matrices. Attention in a transformer is a pile of dot
            products. If you understand vectors, matrices, and a handful of
            decompositions, you can read the actual math behind PCA, embeddings,
            transformers, and model compression.
          </p>
        )}
        <ConceptCard
          tone="intuition"
          title={zh ? "一句話版本" : "The one-sentence version"}
        >
          {zh
            ? "線性代數是「一次處理大量數字，並以可預測的方式加以變換」的語言。機器學習正是把這個想法應用在龐大的規模上。"
            : 'Linear algebra is the language of "lots of numbers at once, transformed in predictable ways." ML is that idea applied at massive scale.'}
        </ConceptCard>
      </Section>

      <Section
        title={
          zh
            ? "路線圖：從向量到 SVD 再到機器學習"
            : "A roadmap: from vectors to SVD to ML"
        }
      >
        {zh ? (
          <p>我們一階一階往上爬。每一階都用到下一階的內容。</p>
        ) : (
          <p>We climb a ladder. Each rung uses the one below it.</p>
        )}
        <ol>
          {zh ? (
            <>
              <li>
                <strong>向量</strong>——由數字構成的點／箭頭；內積衡量相似度。→ 嵌入。
              </li>
              <li>
                <strong>矩陣</strong>——數字的表格<em>以及</em>變換。→ 神經網路層。
              </li>
              <li>
                <strong>線性方程組</strong>——求解 <Eq>{"Ax = b"}</Eq>；秩與主元。
              </li>
              <li>
                <strong>子空間</strong>——生成、基底、維度；四個基本子空間。
              </li>
              <li>
                <strong>正交性</strong>——垂直、投影、最小平方法。→ 線性迴歸。
              </li>
              <li>
                <strong>特徵值與特徵向量</strong>——矩陣只會拉伸的方向。→ PCA。
              </li>
              <li>
                <strong>SVD</strong>——每個矩陣都有的萬用分解。→ 壓縮、推薦、LoRA。
              </li>
              <li>
                <strong>現代機器學習</strong>——把一切組合起來：注意力、Transformer、GEMM。
              </li>
            </>
          ) : (
            <>
              <li>
                <strong>Vectors</strong> — points/arrows of numbers; dot products measure
                similarity. → embeddings.
              </li>
              <li>
                <strong>Matrices</strong> — tables of numbers <em>and</em>{" "}
                transformations. → neural-network layers.
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
                <strong>Orthogonality</strong> — perpendicularity, projection, least
                squares. → linear regression.
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
            </>
          )}
        </ol>
        <Equation>
          {
            "\\text{vectors} \\to \\text{matrices} \\to \\text{eigen} \\to \\text{SVD} \\to \\text{ML}"
          }
        </Equation>
      </Section>

      <Section title={zh ? "如何使用這個網站" : "How to use this site"}>
        <ul>
          {zh ? (
            <>
              <li>
                先讀<strong>直覺</strong>。不要直接跳到公式。
              </li>
              <li>
                在揭曉提示之前，先用鉛筆親手完成<strong>手算</strong>。
              </li>
              <li>
                玩玩每一個<strong>互動示範</strong>——動手調整數字。
              </li>
              <li>
                完成每頁的<strong>練習題</strong>；每週回到{" "}
                <Link to="/practice">練習實驗室</Link>。
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
        <MLCallout reviewed="2026-07">
          {zh
            ? "機器學習章節始終錨定在穩定的數學上。框架與模型名稱變化很快；內積、投影與特徵值則不會。凡是變動快速的主題（例如 LoRA、注意力的各種變體），我們會標註「最後審閱」日期，並聚焦於底層的線性代數。"
            : 'The ML sections stay anchored to stable math. Frameworks and model names change fast; dot products, projections, and eigenvalues do not. Where a topic is fast-moving (e.g. LoRA, attention variants) we mark a "Last reviewed" date and focus on the underlying linear algebra.'}
        </MLCallout>
      </Section>

      <Section title={zh ? "診斷測驗" : "Diagnostic quiz"}>
        {zh ? (
          <p>
            不確定該從哪裡開始？試試這五題。答錯也完全沒關係——它只是告訴你該仔細閱讀哪個前面的章節。每個答案都附有解釋。
          </p>
        ) : (
          <p>
            Not sure where to start? Try these five questions. Missing one is completely
            fine — it just tells you which early section to read carefully. Every answer
            comes with an explanation.
          </p>
        )}
        <Quiz
          title={zh ? "你從哪裡開始？" : "Where are you starting from?"}
          questions={diagnosticQuiz(lang)}
        />
        <p style={{ marginTop: "1.5rem" }}>
          {zh ? (
            <>
              準備好了嗎？前往 <Link to="/vectors">第 2 節 · 向量 →</Link>
            </>
          ) : (
            <>
              Ready? Head to <Link to="/vectors">Section 2 · Vectors →</Link>
            </>
          )}
        </p>
      </Section>
    </Page>
  );
}
