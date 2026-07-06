import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { MLCallout } from "../components/MLCallout";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { TransformVisualizer } from "../components/TransformVisualizer";
import { MatrixCalculator } from "../components/MatrixCalculator";
import { Figure } from "../components/Figure";
import { MatrixTransformFigure } from "../components/diagrams";
import { Eq, Equation } from "../components/Equation";
import { matricesQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

export function Matrices() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="matrices">
      <Section title={zh ? "直覺" : "Intuition"}>
        {zh ? (
          <p>
            矩陣有兩種性格。第一，它是一張<strong>資料表</strong>
            ：列是樣本，行是特徵（一張試算表）。第二——這才是深刻的想法——矩陣是一個
            <strong>變換向量的函數</strong>
            ：餵給它一個向量，它會把向量拉伸、旋轉或剪切成一個新的向量。
          </p>
        ) : (
          <p>
            A matrix has two personalities. First, it's a <strong>data table</strong>:
            rows are examples, columns are features (a spreadsheet). Second — and this is
            the deep idea — a matrix is a{" "}
            <strong>function that transforms vectors</strong>: feed it a vector, it
            stretches, rotates, or shears it into a new vector.
          </p>
        )}
        <ConceptCard tone="intuition" title={zh ? "關鍵洞見" : "The key insight"}>
          {zh ? (
            <>
              矩陣的各行告訴你基底箭頭 <Eq>{"\\hat{i}=(1,0)"}</Eq> 與
              <Eq>{"\\hat{j}=(0,1)"}</Eq> 的落點。一旦知道基底去了哪裡，你就知道
              <em>一切</em>去了哪裡——因為每個向量都是基底的組合。
            </>
          ) : (
            <>
              The columns of a matrix tell you where the basis arrows{" "}
              <Eq>{"\\hat{i}=(1,0)"}</Eq> and
              <Eq>{"\\hat{j}=(0,1)"}</Eq> land. Once you know where the basis goes, you
              know where
              <em>everything</em> goes — because every vector is a combination of the
              basis.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "定義" : "Definition"}>
        {zh ? (
          <p>
            一個 <Eq>{"m\\times n"}</Eq> 矩陣把{" "}
            <Eq>{"\\mathbb{R}^n \\to \\mathbb{R}^m"}</Eq>。將它作用在一個向量上：
          </p>
        ) : (
          <p>
            An <Eq>{"m\\times n"}</Eq> matrix maps{" "}
            <Eq>{"\\mathbb{R}^n \\to \\mathbb{R}^m"}</Eq>. Applying it to a vector:
          </p>
        )}
        <Equation>
          {
            "A x = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = x_1\\begin{bmatrix} a \\\\ c \\end{bmatrix} + x_2\\begin{bmatrix} b \\\\ d \\end{bmatrix}"
          }
        </Equation>
        <Figure
          caption={
            zh ? (
              <>
                矩陣的各行告訴你基底 <Eq>{"\\hat{i}"}</Eq>、<Eq>{"\\hat{j}"}</Eq>{" "}
                的落點：單位正方形被映射成一個平行四邊形。知道基底去哪，就知道一切去哪。
              </>
            ) : (
              <>
                A matrix's columns tell you where the basis <Eq>{"\\hat{i}"}</Eq>,{" "}
                <Eq>{"\\hat{j}"}</Eq> land: the unit square is mapped to a parallelogram.
                Know where the basis goes and you know where everything goes.
              </>
            )
          }
        >
          <MatrixTransformFigure />
        </Figure>
        {zh ? (
          <p>
            看右邊：輸出是<strong>各行的組合</strong>
            ，權重是輸入的座標。矩陣乘法把變換串接起來：
          </p>
        ) : (
          <p>
            Read that right side: the output is a{" "}
            <strong>combination of the columns</strong>, weighted by the input's
            coordinates. Matrix multiplication chains transformations:
          </p>
        )}
        <Equation>
          {"(AB)x = A(Bx) \\quad\\Rightarrow\\quad (AB)_{ij} = \\sum_k A_{ik} B_{kj}"}
        </Equation>
        {zh ? (
          <p>
            <Eq>{"AB"}</Eq> 的第 <Eq>{"(i,j)"}</Eq> 個元素，是 <Eq>{"A"}</Eq> 第{" "}
            <Eq>{"i"}</Eq> 列與 <Eq>{"B"}</Eq> 第 <Eq>{"j"}</Eq> 行的內積。
          </p>
        ) : (
          <p>
            Entry <Eq>{"(i,j)"}</Eq> of <Eq>{"AB"}</Eq> is the dot product of row{" "}
            <Eq>{"i"}</Eq> of <Eq>{"A"}</Eq> with column <Eq>{"j"}</Eq> of <Eq>{"B"}</Eq>.
          </p>
        )}
      </Section>

      <Section title={zh ? "小範例" : "Small example"}>
        {zh ? (
          <p>逆時針旋轉 90°，然後看看基底去了哪裡：</p>
        ) : (
          <p>Rotate 90° counter-clockwise, then look at where the basis goes:</p>
        )}
        <Equation>
          {
            "R = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}, \\quad R\\hat{i} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}, \\quad R\\hat{j} = \\begin{bmatrix} -1 \\\\ 0 \\end{bmatrix}"
          }
        </Equation>
        {zh ? (
          <p>
            <Eq>{"\\hat i"}</Eq>（指向右）變成「上」；<Eq>{"\\hat j"}</Eq>
            （指向上）變成「左」。這就是四分之一圈。
          </p>
        ) : (
          <p>
            <Eq>{"\\hat i"}</Eq> (pointing right) becomes "up"; <Eq>{"\\hat j"}</Eq>{" "}
            (pointing up) becomes "left". That's a quarter turn.
          </p>
        )}
      </Section>

      <Section title={zh ? "手算" : "Manual calculation"}>
        {zh ? (
          <p>
            計算 <Eq>{"AB"}</Eq>，其中{" "}
            <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}"}</Eq>、
            <Eq>{"B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}"}</Eq>。
          </p>
        ) : (
          <p>
            Multiply <Eq>{"AB"}</Eq> where{" "}
            <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}"}</Eq> and{" "}
            <Eq>{"B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}"}</Eq>.
          </p>
        )}
        <Hint label={zh ? "提示：列 × 行" : "Hint: row × column"}>
          {zh ? (
            <>
              每個輸出元素是（A 的一列）·（B 的一行）。左上 = A 第 1 列與 B 第 1 行的內積
              = <Eq>{"1\\cdot5 + 2\\cdot7"}</Eq>。
            </>
          ) : (
            <>
              Each output entry is (row of A) · (column of B). Top-left = row 1 of A
              dotted with column 1 of B = <Eq>{"1\\cdot5 + 2\\cdot7"}</Eq>.
            </>
          )}
        </Hint>
        <StepSolution
          steps={[
            {
              title: zh ? "左上" : "Top-left",
              content: <Equation>{"1\\cdot5 + 2\\cdot7 = 19"}</Equation>,
            },
            {
              title: zh ? "右上" : "Top-right",
              content: <Equation>{"1\\cdot6 + 2\\cdot8 = 22"}</Equation>,
            },
            {
              title: zh ? "左下" : "Bottom-left",
              content: <Equation>{"3\\cdot5 + 4\\cdot7 = 43"}</Equation>,
            },
            {
              title: zh ? "右下" : "Bottom-right",
              content: <Equation>{"3\\cdot6 + 4\\cdot8 = 50"}</Equation>,
            },
            {
              title: zh ? "組合" : "Assemble",
              content: (
                <Equation>
                  {"AB = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}"}
                </Equation>
              ),
            },
          ]}
        />
        <ConceptCard tone="mistake">
          {zh ? (
            <>
              矩陣乘法<strong>不可交換</strong>：一般而言 <Eq>{"AB \\neq BA"}</Eq>
              。順序很重要，因為「先旋轉再剪切」不同於「先剪切再旋轉」。另外，內維度必須相符：一個{" "}
              <Eq>{"m\\times n"}</Eq> 乘上一個
              <Eq>{"n\\times p"}</Eq> 得到 <Eq>{"m\\times p"}</Eq>。
            </>
          ) : (
            <>
              Matrix multiplication is <strong>not commutative</strong>:{" "}
              <Eq>{"AB \\neq BA"}</Eq> in general. Order matters because "rotate then
              shear" differs from "shear then rotate". Also, inner dimensions must match:
              an <Eq>{"m\\times n"}</Eq> times an
              <Eq>{"n\\times p"}</Eq> gives <Eq>{"m\\times p"}</Eq>.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "互動示範" : "Interactive demo"}>
        {zh ? (
          <p>
            編輯變換矩陣或挑選一個預設，然後拖動「套用」來動畫呈現網格、單位正方形與基底向量如何移動。觀察行列式——它是面積被縮放的倍率。
          </p>
        ) : (
          <p>
            Edit the transformation matrix or pick a preset, then slide "Apply" to animate
            how the grid, unit square, and basis vectors move. Watch the determinant —
            it's the factor by which area is scaled.
          </p>
        )}
        <TransformVisualizer />
        <p style={{ marginTop: "2rem" }}>
          {zh
            ? "還有一個計算乘積、轉置與行列式的簡易計算器："
            : "And a plain calculator for products, transpose, and determinant:"}
        </p>
        <MatrixCalculator />
      </Section>

      <Section
        title={
          zh
            ? "機器學習連結：層作為矩陣運算"
            : "ML connection: layers as matrix operations"
        }
      >
        <MLCallout
          title={
            zh
              ? "一個神經網路層就是一次矩陣乘法"
              : "A neural network layer is a matrix multiply"
          }
          reviewed="2026-07"
        >
          {zh ? (
            <>
              <p>
                一個稠密（全連接）層計算 <Eq>{"y = \\sigma(Wx + b)"}</Eq>：把輸入向量{" "}
                <Eq>{"x"}</Eq> 乘上權重矩陣 <Eq>{"W"}</Eq>，加上偏差，再套用一個非線性函數{" "}
                <Eq>{"\\sigma"}</Eq>。把許多這樣的層堆疊起來，就是一個深層網路。
              </p>
              <p>
                當你一次處理整批資料時，<Eq>{"x"}</Eq> 變成一個矩陣 <Eq>{"X"}</Eq>
                （每個樣本一列），而此層是 <Eq>{"XW^{\\mathsf T}"}</Eq>
                ——一次大型矩陣乘法。GPU 之所以快，正是因為它們能平行地做這些乘法（見第 9
                節的
                <em>GEMM</em> 討論）。
              </p>
            </>
          ) : (
            <>
              <p>
                A dense (fully-connected) layer computes <Eq>{"y = \\sigma(Wx + b)"}</Eq>:
                multiply the input vector <Eq>{"x"}</Eq> by a weight matrix <Eq>{"W"}</Eq>
                , add a bias, then apply a nonlinearity <Eq>{"\\sigma"}</Eq>. Stack many
                such layers and you have a deep network.
              </p>
              <p>
                When you process a whole batch at once, <Eq>{"x"}</Eq> becomes a matrix{" "}
                <Eq>{"X"}</Eq>
                (one row per example) and the layer is <Eq>{"XW^{\\mathsf T}"}</Eq> — a
                big matrix multiply. GPUs are fast precisely because they do these
                multiplies in parallel (see the <em>GEMM</em> discussion in Section 9).
              </p>
            </>
          )}
        </MLCallout>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={zh ? "矩陣 — 概念檢查" : "Matrices — concept check"}
          questions={matricesQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
