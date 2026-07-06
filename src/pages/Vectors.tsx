import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { MLCallout } from "../components/MLCallout";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { VectorCanvas } from "../components/VectorCanvas";
import { Eq, Equation } from "../components/Equation";
import { vectorsQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

export function Vectors() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="vectors">
      <Section title={zh ? "直覺" : "Intuition"}>
        {zh ? (
          <p>
            向量就是一串數字。就這樣。但有兩張圖能讓它變得強大。像 <Eq>{"(3, 2)"}</Eq>{" "}
            這樣的向量可以是一個<strong>點</strong>（走到向右 3、向上 2
            的位置），也可以是一個
            <strong>箭頭</strong>（一個指令：向右移 3、向上移
            2）。在機器學習中我們用第三張圖：向量是描述某事物的
            <strong>特徵清單</strong>
            ——一個字的「意義」、一張影像的像素、一位使用者的喜好。
          </p>
        ) : (
          <p>
            A vector is a list of numbers. That's it. But two pictures make it powerful. A
            vector like <Eq>{"(3, 2)"}</Eq> can be a <strong>point</strong> (go to
            location 3 across, 2 up) or an <strong>arrow</strong> (an instruction: move 3
            right and 2 up). In ML we use a third picture: a vector is a{" "}
            <strong>list of features</strong> describing something — the "meaning" of a
            word, the pixels of an image, a user's taste.
          </p>
        )}
        <ConceptCard tone="intuition">
          {zh
            ? "座標回答「在哪裡／每種成分各有多少？」大小回答「箭頭有多長？」方向回答「它指向哪一邊？」"
            : 'Coordinates answer "where / how much of each ingredient?" Magnitude answers "how long is the arrow?" Direction answers "which way does it point?"'}
        </ConceptCard>
      </Section>

      <Section title={zh ? "定義" : "Definition"}>
        {zh ? (
          <p>
            <Eq>{"\\mathbb{R}^n"}</Eq> 中的向量是 <Eq>{"n"}</Eq>{" "}
            個實數的有序清單。核心運算：
          </p>
        ) : (
          <p>
            A vector in <Eq>{"\\mathbb{R}^n"}</Eq> is an ordered list of <Eq>{"n"}</Eq>{" "}
            real numbers. Core operations:
          </p>
        )}
        <Equation>
          {
            "a + b = (a_1 + b_1,\\ \\dots,\\ a_n + b_n) \\qquad c\\,a = (c\\,a_1,\\ \\dots,\\ c\\,a_n)"
          }
        </Equation>
        {zh ? (
          <p>
            <strong>內積</strong>把兩個向量合成一個數字：
          </p>
        ) : (
          <p>
            The <strong>dot product</strong> combines two vectors into one number:
          </p>
        )}
        <Equation>
          {
            "a \\cdot b = a_1 b_1 + a_2 b_2 + \\cdots + a_n b_n = \\|a\\|\\,\\|b\\|\\cos\\theta"
          }
        </Equation>
        {zh ? (
          <p>
            <strong>大小</strong>（長度，或 2-範數）與 <strong>餘弦相似度</strong>：
          </p>
        ) : (
          <p>
            The <strong>magnitude</strong> (length, or 2-norm) and{" "}
            <strong>cosine similarity</strong>:
          </p>
        )}
        <Equation>
          {
            "\\|a\\| = \\sqrt{a \\cdot a}, \\qquad \\cos\\theta = \\frac{a\\cdot b}{\\|a\\|\\,\\|b\\|}"
          }
        </Equation>
        {zh ? (
          <p>
            <Eq>{"a"}</Eq> 在 <Eq>{"b"}</Eq> 上的<strong>投影</strong>是 <Eq>{"a"}</Eq> 沿{" "}
            <Eq>{"b"}</Eq> 的「影子」：
          </p>
        ) : (
          <p>
            The <strong>projection</strong> of <Eq>{"a"}</Eq> onto <Eq>{"b"}</Eq> is the
            "shadow" of <Eq>{"a"}</Eq> along <Eq>{"b"}</Eq>:
          </p>
        )}
        <Equation>
          {"\\operatorname{proj}_b(a) = \\frac{a\\cdot b}{b\\cdot b}\\,b"}
        </Equation>
      </Section>

      <Section title={zh ? "小範例" : "Small example"}>
        {zh ? (
          <p>
            設 <Eq>{"a = (3, 4)"}</Eq>，<Eq>{"b = (4, 0)"}</Eq>。
          </p>
        ) : (
          <p>
            Let <Eq>{"a = (3, 4)"}</Eq> and <Eq>{"b = (4, 0)"}</Eq>.
          </p>
        )}
        <ul>
          {zh ? (
            <>
              <li>
                內積：<Eq>{"a\\cdot b = 3\\cdot4 + 4\\cdot0 = 12"}</Eq>。
              </li>
              <li>
                <Eq>{"a"}</Eq> 的長度：<Eq>{"\\|a\\| = \\sqrt{9+16} = 5"}</Eq>。
              </li>
              <li>
                餘弦相似度：<Eq>{"\\cos\\theta = \\tfrac{12}{5\\cdot 4} = 0.6"}</Eq>，所以{" "}
                <Eq>{"\\theta \\approx 53^\\circ"}</Eq>。
              </li>
            </>
          ) : (
            <>
              <li>
                Dot product: <Eq>{"a\\cdot b = 3\\cdot4 + 4\\cdot0 = 12"}</Eq>.
              </li>
              <li>
                Length of <Eq>{"a"}</Eq>: <Eq>{"\\|a\\| = \\sqrt{9+16} = 5"}</Eq>.
              </li>
              <li>
                Cosine similarity:{" "}
                <Eq>{"\\cos\\theta = \\tfrac{12}{5\\cdot 4} = 0.6"}</Eq>, so{" "}
                <Eq>{"\\theta \\approx 53^\\circ"}</Eq>.
              </li>
            </>
          )}
        </ul>
      </Section>

      <Section title={zh ? "手算" : "Manual calculation"}>
        {zh ? (
          <p>
            <strong>試試看：</strong>把 <Eq>{"a = (2, 3)"}</Eq> 投影到{" "}
            <Eq>{"b = (4, 0)"}</Eq> 上。在揭曉步驟前先自己算算看。
          </p>
        ) : (
          <p>
            <strong>Try it:</strong> project <Eq>{"a = (2, 3)"}</Eq> onto{" "}
            <Eq>{"b = (4, 0)"}</Eq>. Work it out before revealing the steps.
          </p>
        )}
        <Hint label={zh ? "提示：用哪個公式？" : "Hint: which formula?"}>
          {zh ? (
            <>
              使用{" "}
              <Eq>{"\\operatorname{proj}_b(a) = \\frac{a\\cdot b}{b\\cdot b}\\,b"}</Eq>
              。先算出兩個內積，再縮放 <Eq>{"b"}</Eq>。
            </>
          ) : (
            <>
              Use{" "}
              <Eq>{"\\operatorname{proj}_b(a) = \\frac{a\\cdot b}{b\\cdot b}\\,b"}</Eq>.
              Compute the two dot products first, then scale <Eq>{"b"}</Eq>.
            </>
          )}
        </Hint>
        <StepSolution
          steps={[
            {
              title: zh ? "分子 a·b" : "Numerator a·b",
              content: <Equation>{"a\\cdot b = 2\\cdot 4 + 3\\cdot 0 = 8"}</Equation>,
            },
            {
              title: zh ? "分母 b·b" : "Denominator b·b",
              content: <Equation>{"b\\cdot b = 4\\cdot 4 + 0\\cdot 0 = 16"}</Equation>,
            },
            {
              title: zh ? "純量" : "Scalar",
              content: (
                <Equation>
                  {"\\frac{a\\cdot b}{b\\cdot b} = \\frac{8}{16} = \\tfrac12"}
                </Equation>
              ),
            },
            {
              title: zh ? "縮放 b" : "Scale b",
              content: (
                <>
                  <Equation>
                    {"\\operatorname{proj}_b(a) = \\tfrac12 (4, 0) = (2, 0)"}
                  </Equation>
                  <p style={{ margin: 0 }}>
                    {zh ? (
                      <>
                        影子落在 (2, 0)：只有 <Eq>{"a"}</Eq> 的 x
                        分量留下來，這很合理，因為 <Eq>{"b"}</Eq> 就在 x 軸上。
                      </>
                    ) : (
                      <>
                        The shadow lands at (2, 0): only the x-part of <Eq>{"a"}</Eq>{" "}
                        survives, which makes sense since <Eq>{"b"}</Eq> lies on the
                        x-axis.
                      </>
                    )}
                  </p>
                </>
              ),
            },
          ]}
        />
        <ConceptCard tone="mistake">
          {zh ? (
            <>
              內積回傳的是一個<em>數字</em>，而非向量。常見的失誤是寫成
              <Eq>{"a\\cdot b = (12, 0)"}</Eq>
              。另外：餘弦相似度不是夾角本身——它是夾角的餘弦，範圍在 −1 到 1 之間。
            </>
          ) : (
            <>
              A dot product returns a <em>number</em>, not a vector. A common slip is
              writing
              <Eq>{"a\\cdot b = (12, 0)"}</Eq>. Also: cosine similarity is not the angle
              itself — it's the cosine of the angle, ranging from −1 to 1.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "互動示範" : "Interactive demo"}>
        {zh ? (
          <p>
            拖動箭頭尖端。觀察內積如何在兩箭頭恰好垂直時歸零，以及餘弦相似度如何在它們對齊時達到
            1。橙色的橫桿是 <Eq>{"a"}</Eq> 在 <Eq>{"b"}</Eq> 上的投影。
          </p>
        ) : (
          <p>
            Drag the arrow tips. Watch how the dot product hits 0 exactly when the arrows
            are perpendicular, and how cosine similarity reaches 1 when they align. The
            orange bar is the projection of <Eq>{"a"}</Eq> onto <Eq>{"b"}</Eq>.
          </p>
        )}
        <VectorCanvas />
      </Section>

      <Section
        title={
          zh
            ? "機器學習連結：嵌入與相似度搜尋"
            : "ML connection: embeddings & similarity search"
        }
      >
        <MLCallout
          title={zh ? "嵌入與餘弦相似度" : "Embeddings and cosine similarity"}
          reviewed="2026-07"
        >
          {zh ? (
            <>
              <p>
                模型把字、影像與使用者轉成<strong>嵌入向量</strong>：幾百個數字，其
                <em>方向</em>
                編碼了意義。要問「這兩個項目有多相似？」我們就計算餘弦相似度——正是本頁的公式。
              </p>
              <p>
                「king」與「queen」的嵌入指向幾乎相同的方向（餘弦接近
                1）；「king」與「banana」則接近垂直（餘弦接近 0）。
                <strong>相似度搜尋</strong>／向量資料庫會依 <Eq>{"\\cos\\theta"}</Eq>{" "}
                對查詢向量替結果排名。歸根究柢，全都是內積。
              </p>
            </>
          ) : (
            <>
              <p>
                Models turn words, images, and users into{" "}
                <strong>embedding vectors</strong>: a few hundred numbers whose{" "}
                <em>direction</em> encodes meaning. To ask "how similar are these two
                items?" we compute cosine similarity — the exact formula from this page.
              </p>
              <p>
                "king" and "queen" have embeddings pointing in nearly the same direction
                (cosine near 1); "king" and "banana" are close to perpendicular (cosine
                near 0). A <strong>similarity search</strong> / vector database ranks
                results by
                <Eq>{"\\cos\\theta"}</Eq> against a query vector. That's dot products all
                the way down.
              </p>
            </>
          )}
        </MLCallout>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={zh ? "向量 — 概念檢查" : "Vectors — concept check"}
          questions={vectorsQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
