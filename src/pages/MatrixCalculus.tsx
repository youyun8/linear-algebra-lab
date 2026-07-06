import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { MLCallout, Warn } from "../components/MLCallout";
import { Eq, Equation } from "../components/Equation";
import { StepSolution } from "../components/StepSolution";
import { Quiz } from "../components/Quiz";
import { Figure } from "../components/Figure";
import { GradientFigure } from "../components/diagrams";
import { matrixCalculusQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

export function MatrixCalculus() {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  return (
    <Page slug="matrix-calculus">
      <Section title={zh ? "為什麼機器學習需要它" : "Why ML needs it"}>
        {zh ? (
          <p>
            訓練一個模型，就是最小化一個把「參數」對應到「一個數字」的
            <strong>損失函數</strong>
            <Eq>{"L"}</Eq>
            。但參數不是單一數字——它們是成千上萬個排成向量與矩陣的權重。所以我們需要的不是單變數的
            <Eq>{"dy/dx"}</Eq>
            ，而是損失對一整個向量、甚至一整個矩陣的導數。這正是矩陣（向量）微積分：把你熟悉的微分，升級到向量與矩陣。
          </p>
        ) : (
          <p>
            Training a model means minimizing a <strong>loss</strong> <Eq>{"L"}</Eq> that
            maps parameters to a single number. But the parameters aren't a single number
            — they're thousands of weights arranged in vectors and matrices. So instead of
            the single-variable <Eq>{"dy/dx"}</Eq>, we need the derivative of the loss
            with respect to a whole vector, or even a whole matrix. That's matrix (vector)
            calculus: ordinary differentiation, lifted to vectors and matrices.
          </p>
        )}
        <ConceptCard tone="intuition">
          {zh
            ? "一切都建立在前面各章之上：梯度就是「往哪個方向損失上升最快」的向量；連鎖律把它變成一串矩陣乘法。你不需要新的魔法，只需要把 dx 換成向量，並小心記帳。"
            : "It all sits on top of the earlier chapters: a gradient is just the vector pointing in the direction of steepest increase, and the chain rule turns it into a chain of matrix multiplies. No new magic — just replace dx with a vector and keep careful books."}
        </ConceptCard>
      </Section>

      <Section
        title={zh ? "梯度、Jacobian 與 Hessian" : "Gradient, Jacobian, and Hessian"}
      >
        {zh ? (
          <p>微分的三種形狀，取決於「輸入是純量還是向量」以及「輸出是純量還是向量」：</p>
        ) : (
          <p>
            Three shapes of derivative, depending on whether the input and output are
            scalars or vectors:
          </p>
        )}
        <ConceptCard
          tone="definition"
          title={zh ? "梯度（純量 → 向量輸入）" : "Gradient (scalar of a vector)"}
        >
          {zh ? (
            <>
              對純量函數 <Eq>{"f:\\mathbb{R}^n \\to \\mathbb{R}"}</Eq>
              ，梯度收集所有偏導數：
            </>
          ) : (
            <>
              For a scalar function <Eq>{"f:\\mathbb{R}^n \\to \\mathbb{R}"}</Eq>, the
              gradient collects all partial derivatives:
            </>
          )}
          <Equation>
            {
              "\\nabla_x f = \\left(\\frac{\\partial f}{\\partial x_1}, \\dots, \\frac{\\partial f}{\\partial x_n}\\right)^{\\mathsf T} \\in \\mathbb{R}^n"
            }
          </Equation>
          {zh
            ? "它和 x 同形，並指向 f 上升最快的方向。"
            : "It has the same shape as x and points in the direction of steepest increase of f."}
        </ConceptCard>
        <Figure
          caption={
            zh ? (
              <>
                梯度 <Eq>{"\\nabla L"}</Eq>{" "}
                與損失的等高線垂直，指向上升最快的方向；梯度下降則沿{" "}
                <Eq>{"-\\nabla L"}</Eq> 邁步走向最小值。
              </>
            ) : (
              <>
                The gradient <Eq>{"\\nabla L"}</Eq> is perpendicular to the level sets of
                the loss and points uphill; gradient descent steps along{" "}
                <Eq>{"-\\nabla L"}</Eq> toward the minimum.
              </>
            )
          }
        >
          <GradientFigure />
        </Figure>
        <ConceptCard
          tone="definition"
          title={zh ? "Jacobian（向量 → 向量）" : "Jacobian (vector of a vector)"}
        >
          {zh ? (
            <>
              對向量函數 <Eq>{"F:\\mathbb{R}^n \\to \\mathbb{R}^m"}</Eq>，Jacobian 是一個
              <Eq>{"m\\times n"}</Eq> 矩陣，第 <Eq>{"(i,j)"}</Eq> 個元素為：
            </>
          ) : (
            <>
              For a vector function <Eq>{"F:\\mathbb{R}^n \\to \\mathbb{R}^m"}</Eq>, the
              Jacobian is an <Eq>{"m\\times n"}</Eq> matrix with entry <Eq>{"(i,j)"}</Eq>:
            </>
          )}
          <Equation>
            {
              "J_{ij} = \\frac{\\partial F_i}{\\partial x_j},\\qquad J \\in \\mathbb{R}^{m\\times n}"
            }
          </Equation>
          {zh
            ? "它是 F 在一點附近的最佳線性近似——局部看，F 的作用就是乘上這個矩陣。"
            : "It's the best linear approximation of F near a point — locally, F acts by multiplying by this matrix."}
        </ConceptCard>
        <ConceptCard
          tone="definition"
          title={zh ? "Hessian（二階，曲率）" : "Hessian (second order, curvature)"}
        >
          {zh ? (
            <>
              純量 f 的二階偏導數排成的對稱矩陣{" "}
              <Eq>{"H_{ij} = \\partial^2 f/\\partial x_i\\partial x_j"}</Eq>
              ，描述損失曲面的曲率。它的特徵值告訴你各方向的彎曲快慢——這正是第 7
              節的特徵值又回來了。
            </>
          ) : (
            <>
              The symmetric matrix of second partials{" "}
              <Eq>{"H_{ij} = \\partial^2 f/\\partial x_i\\partial x_j"}</Eq> describes the
              curvature of the loss surface. Its eigenvalues tell you how fast the loss
              bends in each direction — the eigenvalues of Section 7, returning.
            </>
          )}
        </ConceptCard>
        <Warn>
          {zh ? (
            <>
              <strong>版面慣例：</strong>
              本頁採用「分母版面」——把純量對向量的梯度寫成和該向量同形的<em>行向量</em>
              （直欄）。有些教科書用「分子版面」（Jacobian
              慣例），會讓某些公式多一個轉置。務必和自己所讀的資料保持一致。
            </>
          ) : (
            <>
              <strong>Layout convention:</strong> this page uses{" "}
              <em>denominator layout</em> — the gradient of a scalar is a <em>column</em>{" "}
              vector shaped like the variable. Some books use <em>numerator layout</em>{" "}
              (the Jacobian convention), which adds a transpose to some formulas. Just
              stay consistent with whatever source you read.
            </>
          )}
        </Warn>
      </Section>

      <Section title={zh ? "必備的求導公式" : "The essential identities"}>
        {zh ? (
          <p>
            這幾條就是機器學習裡九成推導所依賴的公式。每一條都是把單變數的規則升級：常數、
            <Eq>{"x^2 \\to 2x"}</Eq>、連鎖律。<Eq>{"a"}</Eq> 是常向量，<Eq>{"A"}</Eq>{" "}
            是常矩陣，<Eq>{"x"}</Eq> 是變數向量。
          </p>
        ) : (
          <p>
            These few identities power nine-tenths of the derivations you'll meet in ML.
            Each is a lifted single-variable rule: constant, <Eq>{"x^2 \\to 2x"}</Eq>,
            chain rule. Here <Eq>{"a"}</Eq> is a constant vector, <Eq>{"A"}</Eq> a
            constant matrix, and <Eq>{"x"}</Eq> the variable vector.
          </p>
        )}
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>{zh ? "函數" : "Function"}</th>
                <th>{zh ? "對 x 的導數" : "Derivative w.r.t. x"}</th>
                <th>{zh ? "純量類比" : "Scalar analogue"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Eq>{"a^{\\mathsf T}x"}</Eq>
                </td>
                <td>
                  <Eq>{"a"}</Eq>
                </td>
                <td>
                  <Eq>{"(ax)' = a"}</Eq>
                </td>
              </tr>
              <tr>
                <td>
                  <Eq>{"x^{\\mathsf T}x = \\|x\\|^2"}</Eq>
                </td>
                <td>
                  <Eq>{"2x"}</Eq>
                </td>
                <td>
                  <Eq>{"(x^2)' = 2x"}</Eq>
                </td>
              </tr>
              <tr>
                <td>
                  <Eq>{"x^{\\mathsf T}Ax"}</Eq>
                </td>
                <td>
                  <Eq>{"(A + A^{\\mathsf T})x"}</Eq>
                </td>
                <td>
                  <Eq>{"(ax^2)' = 2ax"}</Eq>
                </td>
              </tr>
              <tr>
                <td>
                  <Eq>{"x^{\\mathsf T}Ax\\ (A=A^{\\mathsf T})"}</Eq>
                </td>
                <td>
                  <Eq>{"2Ax"}</Eq>
                </td>
                <td>
                  <Eq>{"(ax^2)' = 2ax"}</Eq>
                </td>
              </tr>
              <tr>
                <td>
                  <Eq>{"\\|Ax - b\\|^2"}</Eq>
                </td>
                <td>
                  <Eq>{"2A^{\\mathsf T}(Ax - b)"}</Eq>
                </td>
                <td>
                  <Eq>{"((ax-b)^2)' = 2a(ax-b)"}</Eq>
                </td>
              </tr>
              <tr>
                <td>
                  <Eq>{"Ax\\ (\\text{Jacobian})"}</Eq>
                </td>
                <td>
                  <Eq>{"A"}</Eq>
                </td>
                <td>
                  <Eq>{"(ax)' = a"}</Eq>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ConceptCard tone="example" title={zh ? "推導一條：xᵀx" : "Deriving one: xᵀx"}>
          {zh ? (
            <>
              寫成分量和 <Eq>{"x^{\\mathsf T}x = \\sum_k x_k^2"}</Eq>。對 <Eq>{"x_i"}</Eq>{" "}
              偏微分， 只有 <Eq>{"x_i^2"}</Eq> 這一項留下：
              <Eq>{"\\partial/\\partial x_i = 2x_i"}</Eq>。把各分量疊起來就得到
              <Eq>{"\\nabla = 2x"}</Eq>
              。其它每一條都能用同樣「先展開分量、再偏微分、再疊回向量」的方法驗證。
            </>
          ) : (
            <>
              Write it as a sum of components:{" "}
              <Eq>{"x^{\\mathsf T}x = \\sum_k x_k^2"}</Eq>. Differentiating with respect
              to <Eq>{"x_i"}</Eq>, only the <Eq>{"x_i^2"}</Eq> term survives:{" "}
              <Eq>{"\\partial/\\partial x_i = 2x_i"}</Eq>. Stack the components and you
              get <Eq>{"\\nabla = 2x"}</Eq>. Every other row can be checked the same way —
              expand into components, differentiate, restack into a vector.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "完整範例：線性迴歸" : "Worked example: linear regression"}>
        {zh ? (
          <p>
            這是矩陣微積分在機器學習裡最經典的一次亮相。我們要最小化平方誤差{" "}
            <Eq>{"L(w) = \\tfrac12\\|Xw - y\\|^2"}</Eq>，其中 <Eq>{"X"}</Eq> 是資料矩陣、
            <Eq>{"y"}</Eq> 是目標、<Eq>{"w"}</Eq>{" "}
            是我們要學的權重。求梯度、設為零，就得到閉式解。
          </p>
        ) : (
          <p>
            This is matrix calculus's most famous appearance in ML. We minimize the
            squared error <Eq>{"L(w) = \\tfrac12\\|Xw - y\\|^2"}</Eq>, where{" "}
            <Eq>{"X"}</Eq> is the data matrix, <Eq>{"y"}</Eq> the targets, and{" "}
            <Eq>{"w"}</Eq> the weights we learn. Take the gradient, set it to zero, and
            out drops the closed-form solution.
          </p>
        )}
        <StepSolution
          title={zh ? "最小化平方損失" : "Minimizing the squared loss"}
          steps={[
            {
              title: zh ? "把範數展開" : "Expand the norm",
              content: (
                <Equation>{"L(w) = \\tfrac12 (Xw - y)^{\\mathsf T}(Xw - y)"}</Equation>
              ),
            },
            {
              title: zh ? "用連鎖律" : "Apply the chain rule",
              content: (
                <>
                  {zh ? "令 " : "Let "}
                  <Eq>{"r = Xw - y"}</Eq>
                  {zh ? "。外層 " : ". The outer part "}
                  <Eq>{"\\tfrac12 r^{\\mathsf T}r"}</Eq>
                  {zh
                    ? " 對 r 的梯度是 r；內層 "
                    : " has gradient r; the inner Jacobian is "}
                  <Eq>{"\\partial r/\\partial w = X"}</Eq>
                  {zh ? "。相乘（記得轉置）：" : ". Multiply (mind the transpose): "}
                  <Equation>
                    {"\\nabla_w L = X^{\\mathsf T} r = X^{\\mathsf T}(Xw - y)"}
                  </Equation>
                </>
              ),
            },
            {
              title: zh ? "令梯度為零" : "Set the gradient to zero",
              content: (
                <>
                  <Equation>
                    {
                      "X^{\\mathsf T}(Xw - y) = 0 \\;\\Longrightarrow\\; X^{\\mathsf T}Xw = X^{\\mathsf T}y"
                    }
                  </Equation>
                  {zh
                    ? "這正是第 6 節的正規方程！微積分與正交投影給出同一個答案。"
                    : "These are the normal equations from Section 6! Calculus and orthogonal projection give the same answer."}
                </>
              ),
            },
            {
              title: zh ? "解出 w" : "Solve for w",
              content: (
                <>
                  <Equation>{"w = (X^{\\mathsf T}X)^{-1}X^{\\mathsf T}y"}</Equation>
                  {zh
                    ? "當 XᵀX 可逆時成立。資料量大時我們改用梯度下降，反覆沿 −∇L 邁步，避免求這個逆。"
                    : "valid when XᵀX is invertible. For large data we instead run gradient descent, stepping repeatedly along −∇L to avoid forming that inverse."}
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title={zh ? "連鎖律與反向傳播" : "The chain rule & backpropagation"}>
        {zh ? (
          <p>
            神經網路是一層層函數的合成：<Eq>{"L = \\ell(f_N(\\cdots f_2(f_1(x))))"}</Eq>
            。多變數連鎖律說：合成函數的 Jacobian，就是各層 Jacobian 的
            <strong>乘積</strong>。
          </p>
        ) : (
          <p>
            A neural network is a composition of layers:{" "}
            <Eq>{"L = \\ell(f_N(\\cdots f_2(f_1(x))))"}</Eq>. The multivariate chain rule
            says the Jacobian of a composition is the <strong>product</strong> of the
            per-layer Jacobians.
          </p>
        )}
        <Equation>
          {
            "\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial z_N}\\,\\frac{\\partial z_N}{\\partial z_{N-1}}\\cdots\\frac{\\partial z_1}{\\partial x}"
          }
        </Equation>
        {zh ? (
          <p>
            反向傳播只是<em>從右往左</em>算這串乘積：從輸出端的梯度出發，逐層乘上該層的
            Jacobian，把梯度「傳回」輸入。 對一個稠密層 <Eq>{"z = Wx"}</Eq>，它的 Jacobian
            就是 <Eq>{"W"}</Eq>，所以往回傳一步就是乘上 <Eq>{"W^{\\mathsf T}"}</Eq>
            ——整條反向傳遞不過是一連串矩陣–向量乘法。
          </p>
        ) : (
          <p>
            Backpropagation is just evaluating that product <em>right to left</em>: start
            from the gradient at the output and multiply by each layer's Jacobian to push
            the gradient back toward the input. For a dense layer <Eq>{"z = Wx"}</Eq> the
            Jacobian is <Eq>{"W"}</Eq>, so one step backward is a multiply by{" "}
            <Eq>{"W^{\\mathsf T}"}</Eq> — the whole backward pass is a chain of
            matrix–vector products.
          </p>
        )}
        <MLCallout
          title={zh ? "自動微分做的事" : "What autodiff does"}
          reviewed="2026-07"
        >
          {zh
            ? "PyTorch、JAX、TensorFlow 的 autograd 會替你把這些 Jacobian–向量乘積串起來——你幾乎不必手推梯度。但知道每個因子是什麼（權重的轉置、激勵函數的導數對角矩陣），能讓你看懂梯度爆炸／消失、選對初始化，也能讀懂為何 LayerNorm 與殘差連接能穩住這串乘積。"
            : "Autograd in PyTorch, JAX, and TensorFlow chains these Jacobian–vector products for you — you rarely differentiate by hand. But knowing what each factor is (a transposed weight, a diagonal of activation derivatives) is what lets you reason about exploding/vanishing gradients, pick good initializations, and see why LayerNorm and residual connections keep that product stable."}
        </MLCallout>
        <ConceptCard tone="mistake" title={zh ? "常見陷阱" : "Common pitfalls"}>
          <ul style={{ margin: 0 }}>
            {zh ? (
              <>
                <li>
                  忘記轉置：梯度的形狀必須和變數相同，形狀對不上通常就是漏了一個 ᵀ。
                </li>
                <li>
                  把 <Eq>{"x^{\\mathsf T}Ax"}</Eq> 的梯度寫成 <Eq>{"Ax"}</Eq>——只有 A
                  對稱時才對，一般情形是 <Eq>{"(A + A^{\\mathsf T})x"}</Eq>。
                </li>
                <li>混用分子／分母版面，導致公式莫名其妙多或少一個轉置。</li>
              </>
            ) : (
              <>
                <li>
                  Forgetting a transpose: the gradient must match the variable's shape; a
                  shape mismatch usually means a missing ᵀ.
                </li>
                <li>
                  Writing the gradient of <Eq>{"x^{\\mathsf T}Ax"}</Eq> as <Eq>{"Ax"}</Eq>{" "}
                  — that's only right when A is symmetric; in general it's{" "}
                  <Eq>{"(A + A^{\\mathsf T})x"}</Eq>.
                </li>
                <li>
                  Mixing numerator and denominator layout, so a transpose mysteriously
                  appears or vanishes.
                </li>
              </>
            )}
          </ul>
        </ConceptCard>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={zh ? "矩陣微積分 — 概念檢查" : "Matrix calculus — concept check"}
          questions={matrixCalculusQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
