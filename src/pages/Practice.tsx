import { useState } from "react";
import { Page, Section } from "../components/Page";
import { Quiz } from "../components/Quiz";
import { Flashcards } from "../components/Flashcards";
import type { Flashcard } from "../components/Flashcards";
import { StepSolution } from "../components/StepSolution";
import { Hint } from "../components/Hint";
import { ConceptCard } from "../components/ConceptCard";
import { Eq } from "../components/Equation";
import { Figure } from "../components/Figure";
import { PipelineFigure } from "../components/diagrams";
import {
  vectorsQuiz,
  matricesQuiz,
  systemsQuiz,
  subspacesQuiz,
  orthogonalityQuiz,
  eigenQuiz,
  multiplicityQuiz,
  svdQuiz,
  diagVsSvdQuiz,
  matrixCalculusQuiz,
  mlQuiz,
  loraQuiz,
} from "../data/quizzes";
import type { QuizQuestion } from "../components/Quiz";
import { drillTopics } from "../data/drills";
import type { Drill } from "../data/drills";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Lang } from "../i18n/translations";

function getTopics(lang: Lang): { label: string; questions: QuizQuestion[] }[] {
  const zh = lang === "zh";
  return [
    { label: zh ? "向量" : "Vectors", questions: vectorsQuiz(lang) },
    { label: zh ? "矩陣" : "Matrices", questions: matricesQuiz(lang) },
    { label: zh ? "線性方程組" : "Linear Systems", questions: systemsQuiz(lang) },
    { label: zh ? "子空間" : "Subspaces", questions: subspacesQuiz(lang) },
    { label: zh ? "正交性" : "Orthogonality", questions: orthogonalityQuiz(lang) },
    { label: zh ? "特徵值" : "Eigenvalues", questions: eigenQuiz(lang) },
    { label: zh ? "重數" : "Multiplicity", questions: multiplicityQuiz(lang) },
    { label: "SVD", questions: svdQuiz(lang) },
    {
      label: zh ? "對角化 vs SVD" : "Diag vs SVD",
      questions: diagVsSvdQuiz(lang),
    },
    { label: zh ? "矩陣微積分" : "Matrix Calculus", questions: matrixCalculusQuiz(lang) },
    { label: zh ? "機器學習" : "ML", questions: mlQuiz(lang) },
    { label: "LoRA", questions: loraQuiz(lang) },
  ];
}

function getFlashcards(zh: boolean): Flashcard[] {
  return [
    {
      front: (
        <>
          {zh ? "內積 " : "Dot product "}
          <Eq>{"a\\cdot b"}</Eq>
        </>
      ),
      back: (
        <>
          <Eq>{"\\sum_i a_i b_i = \\|a\\|\\|b\\|\\cos\\theta"}</Eq>
          <div>{zh ? "衡量對齊程度的一個數字。" : "A number measuring alignment."}</div>
        </>
      ),
    },
    {
      front: <>{zh ? "餘弦相似度" : "Cosine similarity"}</>,
      back: <Eq>{"\\dfrac{a\\cdot b}{\\|a\\|\\,\\|b\\|}"}</Eq>,
    },
    {
      front: <>{zh ? "a 在 b 上的投影" : "Projection of a onto b"}</>,
      back: <Eq>{"\\dfrac{a\\cdot b}{b\\cdot b}\\,b"}</Eq>,
    },
    {
      front: <>{zh ? "矩陣的各行代表什麼？" : "What do the columns of a matrix mean?"}</>,
      back: (
        <>
          {zh
            ? "基底向量 î、ĵ 在此變換下的落點。"
            : "Where the basis vectors î, ĵ land under the transformation."}
        </>
      ),
    },
    {
      front: (
        <>
          <Eq>{"\\det = 0"}</Eq> {zh ? "代表……" : "means…"}
        </>
      ),
      back: (
        <>
          {zh
            ? "此變換把空間壓縮到更低維度；不可逆。"
            : "The transformation collapses space to a lower dimension; not invertible."}
        </>
      ),
    },
    {
      front: <>{zh ? "特徵方程（2×2）" : "Characteristic equation (2×2)"}</>,
      back: <Eq>{"\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0"}</Eq>,
    },
    {
      front: <>{zh ? "秩–零度" : "Rank–nullity"}</>,
      back: <Eq>{"\\text{rank} + \\text{nullity} = n"}</Eq>,
    },
    {
      front: <>{zh ? "正規方程（最小平方）" : "Normal equations (least squares)"}</>,
      back: <Eq>{"A^{\\mathsf T}A\\hat{x} = A^{\\mathsf T}b"}</Eq>,
    },
    {
      front: <>SVD</>,
      back: (
        <>
          <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq>
          <div>{zh ? "旋轉 · 縮放 · 旋轉" : "rotate · scale · rotate"}</div>
        </>
      ),
    },
    {
      front: <>{zh ? "奇異值關聯到……" : "Singular values relate to…"}</>,
      back: (
        <>
          <Eq>{"\\sigma_i = \\sqrt{\\lambda_i(A^{\\mathsf T}A)}"}</Eq>
        </>
      ),
    },
    {
      front: <>{zh ? "注意力分數矩陣" : "Attention score matrix"}</>,
      back: <Eq>{"\\operatorname{softmax}(QK^{\\mathsf T}/\\sqrt{d_k})V"}</Eq>,
    },
    {
      front: <>{zh ? "LoRA 更新" : "LoRA update"}</>,
      back: (
        <>
          <Eq>{"\\Delta W = BA"}</Eq>{" "}
          {zh ? "（低秩、參數少）" : "(low rank, few parameters)"}
        </>
      ),
    },
    {
      front: (
        <>
          <Eq>{"\\nabla_x (x^{\\mathsf T}Ax)"}</Eq> {zh ? "（A 對稱）" : "(A symmetric)"}
        </>
      ),
      back: <Eq>{"2Ax"}</Eq>,
    },
    {
      front: (
        <>
          {zh ? "最小平方梯度" : "Least-squares gradient"}{" "}
          <Eq>{"\\nabla_x\\tfrac12\\|Ax-b\\|^2"}</Eq>
        </>
      ),
      back: (
        <>
          <Eq>{"A^{\\mathsf T}(Ax - b)"}</Eq>
          <div>{zh ? "設為零 → 正規方程" : "set to 0 → normal equations"}</div>
        </>
      ),
    },
    {
      front: <>{zh ? "反向傳播是……" : "Backpropagation is…"}</>,
      back: (
        <>
          {zh
            ? "連鎖律：各層 Jacobian 相乘"
            : "the chain rule: per-layer Jacobians multiplied"}
        </>
      ),
    },
  ];
}

/** A single pencil-and-paper exercise: prompt, optional hint, and a hidden step-by-step answer. */
function DrillCard({ drill, hintLabel }: { drill: Drill; hintLabel: string }) {
  return (
    <div style={{ margin: "1.5rem 0" }}>
      <h3>{drill.title}</h3>
      <p>{drill.prompt}</p>
      {drill.hint && <Hint label={hintLabel}>{drill.hint}</Hint>}
      <StepSolution reveal steps={drill.steps} />
    </div>
  );
}

export function Practice() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  const TOPICS = getTopics(lang);
  const DRILL_TOPICS = drillTopics(lang);
  const flashcards = getFlashcards(zh);
  const allQuestions = TOPICS.flatMap((t) => t.questions);
  const totalDrills = DRILL_TOPICS.reduce((n, t) => n + t.drills.length, 0);

  const [topic, setTopic] = useState(0);
  const [drillTopic, setDrillTopic] = useState(0);
  const current = TOPICS[topic];
  const currentDrills = DRILL_TOPICS[drillTopic];

  return (
    <Page slug="practice">
      <Section title={zh ? "如何練習" : "How to practice"}>
        {zh ? (
          <p>
            下面每個主題給你四樣東西：一個<strong>概念檢查</strong>（測驗）、一個
            <strong>計算練習</strong>（親手算，再揭曉）、一個<strong>視覺直覺</strong>
            提示，以及一個
            <strong>機器學習連結</strong>問題。解釋會告訴你<em>為什麼</em>
            ，所以答錯是一堂課，而非死路。
          </p>
        ) : (
          <p>
            Each topic below gives you four things: a <strong>concept check</strong> (the
            quiz), a <strong>calculation drill</strong> (do it by hand, then reveal), a
            <strong> visual intuition</strong> prompt, and an{" "}
            <strong>ML connection</strong>
            question. Explanations tell you <em>why</em>, so a wrong answer is a lesson,
            not a dead end.
          </p>
        )}
        <Figure
          caption={
            zh
              ? "複習時記得每個主題如何串起來：向量與矩陣打底，特徵值與 SVD 提供結構，最後全部匯入機器學習。"
              : "As you review, keep the whole ladder in view: vectors and matrices at the base, eigenvalues and SVD for structure, all feeding into ML."
          }
        >
          <PipelineFigure />
        </Figure>
      </Section>

      <Section title={zh ? "概念檢查測驗" : "Concept-check quizzes"}>
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
          title={zh ? `${current.label} — 測驗` : `${current.label} — quiz`}
          questions={current.questions}
        />
      </Section>

      <Section title={zh ? "綜合總複習" : "Mixed final review"}>
        {zh ? (
          <p>把每個主題的全部 {allQuestions.length} 道概念檢查題，打散成一輪。</p>
        ) : (
          <p>
            All {allQuestions.length} concept-check questions across every topic, shuffled
            into one run.
          </p>
        )}
        <Quiz title={zh ? "全課程複習" : "Full-course review"} questions={allQuestions} />
      </Section>

      <Section title={zh ? "字卡" : "Flashcards"}>
        {zh ? (
          <p>反覆翻閱核心公式，直到它們變得自動化。</p>
        ) : (
          <p>Flip through the core formulas until they're automatic.</p>
        )}
        <Flashcards cards={flashcards} />
      </Section>

      <Section title={zh ? "計算練習" : "Calculation drills"}>
        {zh ? (
          <p>
            {totalDrills}{" "}
            道手算練習。讀題目、在紙上做，然後一次揭曉一步解答來檢查你的推理。挑一個主題：
          </p>
        ) : (
          <p>
            {totalDrills} worked-by-hand exercises. Read the problem, do it on paper, then
            reveal the solution one step at a time to check your reasoning. Pick a topic:
          </p>
        )}
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
            <DrillCard key={d.id} drill={d} hintLabel={zh ? "提示" : "Hint"} />
          ))}
        </div>
      </Section>

      <Section
        title={
          zh ? "視覺直覺與機器學習連結提示" : "Visual intuition & ML connection prompts"
        }
      >
        <ConceptCard
          tone="intuition"
          title={
            zh ? "視覺直覺 — 試著在腦中描繪" : "Visual intuition — try to picture it"
          }
        >
          <ul style={{ margin: 0 }}>
            {zh ? (
              <>
                <li>畫出內積為正、為零、為負的兩個向量。每種各暗示什麼夾角？</li>
                <li>
                  畫出 <Eq>{"\\hat i, \\hat j"}</Eq> 在剪切{" "}
                  <Eq>{"\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}"}</Eq> 下的落點。
                </li>
                <li>
                  想像一個單位圓被某矩陣變換——畫出輸出的橢圓並標出它的軸（奇異向量）。
                </li>
              </>
            ) : (
              <>
                <li>
                  Sketch two vectors with a positive, zero, and negative dot product. What
                  angle does each imply?
                </li>
                <li>
                  Draw where <Eq>{"\\hat i, \\hat j"}</Eq> go under a shear{" "}
                  <Eq>{"\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}"}</Eq>.
                </li>
                <li>
                  Imagine a unit circle transformed by a matrix — sketch the output
                  ellipse and mark its axes (the singular vectors).
                </li>
              </>
            )}
          </ul>
        </ConceptCard>
        <ConceptCard
          tone="example"
          title={
            zh
              ? "機器學習連結 — 每題用一句話解釋"
              : "ML connection — explain in one sentence each"
          }
        >
          <ul style={{ margin: 0 }}>
            {zh ? (
              <>
                <li>為什麼嵌入使用餘弦相似度，而非原始距離？</li>
                <li>為什麼稠密層是一次矩陣乘法，而分批為什麼對 GPU 有幫助？</li>
                <li>為什麼保留最大的幾個奇異值能壓縮一張影像或一個權重矩陣？</li>
                <li>為什麼 LoRA 只訓練這麼少的參數卻仍然有效？</li>
              </>
            ) : (
              <>
                <li>Why is cosine similarity, not raw distance, used for embeddings?</li>
                <li>
                  Why is a dense layer a matrix multiply, and why does batching help GPUs?
                </li>
                <li>
                  Why does keeping the top singular values compress an image or a weight
                  matrix?
                </li>
                <li>Why does LoRA train so few parameters yet work well?</li>
              </>
            )}
          </ul>
        </ConceptCard>
      </Section>
    </Page>
  );
}
