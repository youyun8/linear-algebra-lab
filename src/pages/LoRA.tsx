import { Link } from "react-router-dom";
import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { Figure } from "../components/Figure";
import { MLCallout } from "../components/MLCallout";
import { Quiz } from "../components/Quiz";
import { StepSolution } from "../components/StepSolution";
import {
  LoRAForwardFigure,
  LoRAOuterProductsFigure,
  LoRAParameterFigure,
} from "../components/diagrams";
import { Eq, Equation } from "../components/Equation";
import { loraQuiz } from "../data/quizzes";
import { useLanguage } from "../i18n/LanguageProvider";

export function LoRA() {
  const { lang } = useLanguage();
  const zh = lang === "zh";

  return (
    <Page slug="lora">
      <Section title={zh ? "核心想法" : "The core idea"}>
        {zh ? (
          <p>
            LoRA（Low-Rank
            Adaptation，低秩調適）是一種微調大型模型的方法。原本完整微調會更新一個巨大的權重矩陣{" "}
            <Eq>{"W"}</Eq>；LoRA 則凍結 <Eq>{"W"}</Eq>，只訓練一個小很多的低秩更新{" "}
            <Eq>{"\\Delta W"}</Eq>。
          </p>
        ) : (
          <p>
            LoRA (Low-Rank Adaptation) is a way to fine-tune a large model. Full
            fine-tuning updates a huge weight matrix <Eq>{"W"}</Eq>; LoRA freezes{" "}
            <Eq>{"W"}</Eq> and trains a much smaller low-rank update{" "}
            <Eq>{"\\Delta W"}</Eq>.
          </p>
        )}
        <Equation>
          {
            "\\Delta W = sBA, \\quad A\\in\\mathbb{R}^{r\\times n},\\ B\\in\\mathbb{R}^{m\\times r},\\ s=\\frac{\\alpha}{r}"
          }
        </Equation>
        <Equation>{"y = (W + sBA)x = Wx + sB(Ax)"}</Equation>
        <Figure
          caption={
            zh ? (
              <>
                主路徑 <Eq>{"Wx"}</Eq> 保持凍結；LoRA 新增一條窄路徑{" "}
                <Eq>{"x \\mapsto Ax \\mapsto B(Ax)"}</Eq>，最後加回輸出。
              </>
            ) : (
              <>
                The main path <Eq>{"Wx"}</Eq> stays frozen; LoRA adds a narrow path{" "}
                <Eq>{"x \\mapsto Ax \\mapsto B(Ax)"}</Eq> and adds it back to the output.
              </>
            )
          }
        >
          <LoRAForwardFigure />
        </Figure>
        <ConceptCard tone="intuition">
          {zh ? (
            <>
              把 <Eq>{"A"}</Eq> 想成「先把輸入壓到 <Eq>{"r"}</Eq> 個調整座標」，再把{" "}
              <Eq>{"B"}</Eq>{" "}
              想成「把這些調整座標展開到輸出空間」。如果任務只需要沿少數方向改變模型，這條窄路就足夠。
            </>
          ) : (
            <>
              Think of <Eq>{"A"}</Eq> as compressing the input into <Eq>{"r"}</Eq> adapter
              coordinates, then <Eq>{"B"}</Eq> expands those coordinates back into output
              space. If the task only needs to change the model along a few directions,
              this narrow path is enough.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section title={zh ? "為什麼這是低秩" : "Why this is low rank"}>
        {zh ? (
          <p>
            若 <Eq>{"W"}</Eq> 是 <Eq>{"m\\times n"}</Eq>，完整更新需要 <Eq>{"mn"}</Eq>{" "}
            個數字。LoRA 把更新寫成 <Eq>{"BA"}</Eq>，內維度只有 <Eq>{"r"}</Eq>
            ，因此最多只有秩 <Eq>{"r"}</Eq>。
          </p>
        ) : (
          <p>
            If <Eq>{"W"}</Eq> is <Eq>{"m\\times n"}</Eq>, a full update needs{" "}
            <Eq>{"mn"}</Eq> numbers. LoRA writes the update as <Eq>{"BA"}</Eq> with inner
            dimension <Eq>{"r"}</Eq>, so the update has rank at most <Eq>{"r"}</Eq>.
          </p>
        )}
        <Equation>{"\\operatorname{rank}(BA) \\le r"}</Equation>
        <Figure
          caption={
            zh ? (
              <>
                <Eq>{"BA"}</Eq> 可看成 <Eq>{"r"}</Eq> 個秩 1 外積的總和：
                <Eq>{"b_i a_i"}</Eq>。增加 <Eq>{"r"}</Eq> 就是增加可調整的方向數。
              </>
            ) : (
              <>
                <Eq>{"BA"}</Eq> is a sum of <Eq>{"r"}</Eq> rank-1 outer products{" "}
                <Eq>{"b_i a_i"}</Eq>. Increasing <Eq>{"r"}</Eq> adds more directions the
                update can control.
              </>
            )
          }
        >
          <LoRAOuterProductsFigure />
        </Figure>
        <ConceptCard tone="definition" title={zh ? "參數數量" : "Parameter count"}>
          <Equation>
            {
              "\\underbrace{mn}_{\\text{full update}}\\quad\\text{vs.}\\quad\\underbrace{r(m+n)}_{\\text{LoRA update}}"
            }
          </Equation>
          {zh ? (
            <p style={{ margin: 0 }}>
              當 <Eq>{"r \\ll \\min(m,n)"}</Eq>{" "}
              時，訓練參數、優化器狀態與梯度記憶體都會大幅下降。
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              When <Eq>{"r \\ll \\min(m,n)"}</Eq>, trainable parameters, optimizer state,
              and gradient memory all drop sharply.
            </p>
          )}
        </ConceptCard>
      </Section>

      <Section
        title={zh ? "數值範例 1 — 參數省多少" : "Numerical example 1 — parameter savings"}
      >
        {zh ? (
          <p>
            假設一層投影矩陣 <Eq>{"W"}</Eq> 的大小是 <Eq>{"4096\\times4096"}</Eq>
            。完整微調會訓練：
          </p>
        ) : (
          <p>
            Suppose a projection matrix <Eq>{"W"}</Eq> has shape{" "}
            <Eq>{"4096\\times4096"}</Eq>. Full fine-tuning trains:
          </p>
        )}
        <Equation>{"4096\\cdot4096 = 16{,}777{,}216\\text{ parameters}"}</Equation>
        {zh ? (
          <p>
            若使用 <Eq>{"r=8"}</Eq> 的 LoRA，則 <Eq>{"A"}</Eq> 是{" "}
            <Eq>{"8\\times4096"}</Eq>，<Eq>{"B"}</Eq> 是 <Eq>{"4096\\times8"}</Eq>：
          </p>
        ) : (
          <p>
            With LoRA rank <Eq>{"r=8"}</Eq>, <Eq>{"A"}</Eq> is <Eq>{"8\\times4096"}</Eq>{" "}
            and <Eq>{"B"}</Eq> is <Eq>{"4096\\times8"}</Eq>:
          </p>
        )}
        <Equation>{"8\\cdot4096 + 4096\\cdot8 = 65{,}536\\text{ parameters}"}</Equation>
        <Figure
          caption={
            zh
              ? "同一個 4096×4096 矩陣：完整更新是 1678 萬個參數；r = 8 的 LoRA 只訓練 6.55 萬個，剛好是 256 倍縮減。"
              : "Same 4096×4096 matrix: a full update is 16.8M parameters; rank-8 LoRA trains 65.5K, a 256× reduction."
          }
        >
          <LoRAParameterFigure />
        </Figure>
        <ConceptCard
          tone="example"
          title={zh ? "四個投影一起算" : "Four projections together"}
        >
          {zh ? (
            <>
              Transformer 常見的 <Eq>{"W_Q,W_K,W_V,W_O"}</Eq> 若都為{" "}
              <Eq>{"4096\\times4096"}</Eq>，完整微調是{" "}
              <Eq>{"4\\cdot16{,}777{,}216 = 67{,}108{,}864"}</Eq> 個參數；rank-8 LoRA 是{" "}
              <Eq>{"4\\cdot65{,}536 = 262{,}144"}</Eq> 個參數。
            </>
          ) : (
            <>
              If the common transformer projections <Eq>{"W_Q,W_K,W_V,W_O"}</Eq> are each{" "}
              <Eq>{"4096\\times4096"}</Eq>, full fine-tuning trains{" "}
              <Eq>{"4\\cdot16{,}777{,}216 = 67{,}108{,}864"}</Eq> parameters; rank-8 LoRA
              trains <Eq>{"4\\cdot65{,}536 = 262{,}144"}</Eq>.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section
        title={
          zh ? "數值範例 2 — 一次前向傳播" : "Numerical example 2 — one forward pass"
        }
      >
        {zh ? (
          <p>
            令 <Eq>{"s=1"}</Eq>，也就是暫時不使用額外縮放。取
          </p>
        ) : (
          <p>
            Let <Eq>{"s=1"}</Eq>, so there is no extra scaling for the moment. Take
          </p>
        )}
        <Equation>
          {
            "W=\\begin{bmatrix}2&0&-1\\\\1&3&0\\end{bmatrix},\\quad A=\\begin{bmatrix}1&-2&0.5\\end{bmatrix},\\quad B=\\begin{bmatrix}0.2\\\\-0.1\\end{bmatrix},\\quad x=\\begin{bmatrix}3\\\\1\\\\2\\end{bmatrix}"
          }
        </Equation>
        <StepSolution
          reveal={false}
          steps={[
            {
              title: zh ? "先算凍結模型輸出" : "Compute the frozen model output",
              content: (
                <Equation>
                  {
                    "Wx = \\begin{bmatrix}2&0&-1\\\\1&3&0\\end{bmatrix}\\begin{bmatrix}3\\\\1\\\\2\\end{bmatrix}=\\begin{bmatrix}4\\\\6\\end{bmatrix}"
                  }
                </Equation>
              ),
            },
            {
              title: zh ? "通過低秩瓶頸 A" : "Pass through the low-rank bottleneck A",
              content: (
                <Equation>{"Ax = 1\\cdot3 + (-2)\\cdot1 + 0.5\\cdot2 = 2"}</Equation>
              ),
            },
            {
              title: zh ? "用 B 展開回輸出空間" : "Expand back to output space with B",
              content: (
                <Equation>
                  {
                    "B(Ax)=\\begin{bmatrix}0.2\\\\-0.1\\end{bmatrix}2=\\begin{bmatrix}0.4\\\\-0.2\\end{bmatrix}"
                  }
                </Equation>
              ),
            },
            {
              title: zh ? "加回原本輸出" : "Add the adapter output back",
              content: (
                <Equation>
                  {"y = Wx + B(Ax)=\\begin{bmatrix}4.4\\\\5.8\\end{bmatrix}"}
                </Equation>
              ),
            },
          ]}
        />
        <ConceptCard tone="intuition">
          {zh ? (
            <>
              注意這裡沒有真的形成完整的 <Eq>{"\\Delta W"}</Eq>{" "}
              也能算出輸出。實作上通常直接做 <Eq>{"Ax"}</Eq> 再做 <Eq>{"B(Ax)"}</Eq>
              ，避免建立大型更新矩陣。
            </>
          ) : (
            <>
              Notice that we did not need to form the full <Eq>{"\\Delta W"}</Eq> to get
              the output. Implementations usually compute <Eq>{"Ax"}</Eq> and then{" "}
              <Eq>{"B(Ax)"}</Eq>, avoiding a large update matrix.
            </>
          )}
        </ConceptCard>
      </Section>

      <Section
        title={zh ? "數值範例 3 — rank-2 更新" : "Numerical example 3 — a rank-2 update"}
      >
        {zh ? (
          <p>
            令 <Eq>{"A"}</Eq> 有兩列，<Eq>{"B"}</Eq> 有兩行內維度：
          </p>
        ) : (
          <p>
            Let <Eq>{"A"}</Eq> have two rows and <Eq>{"B"}</Eq> have inner dimension two:
          </p>
        )}
        <Equation>
          {
            "A=\\begin{bmatrix}1&0&2\\\\0&1&-1\\end{bmatrix},\\quad B=\\begin{bmatrix}2&0\\\\1&1\\\\0&-1\\end{bmatrix}"
          }
        </Equation>
        <Equation>{"BA=\\begin{bmatrix}2&0&4\\\\1&1&1\\\\0&-1&1\\end{bmatrix}"}</Equation>
        {zh ? (
          <p>
            這是一個 <Eq>{"3\\times3"}</Eq> 更新矩陣，但它由兩個秩 1
            外積相加而成，所以秩最多為 2。事實上它的行列式為 0：
          </p>
        ) : (
          <p>
            This is a <Eq>{"3\\times3"}</Eq> update matrix, but it is built from two
            rank-1 outer products, so its rank is at most 2. Its determinant is indeed 0:
          </p>
        )}
        <Equation>
          {"\\det\\!\\begin{bmatrix}2&0&4\\\\1&1&1\\\\0&-1&1\\end{bmatrix}=0"}
        </Equation>
        <MLCallout title={zh ? "和 SVD 的連結" : "Connection to SVD"} reviewed="2026-07">
          {zh ? (
            <>
              在 <Link to="/svd">SVD</Link> 中，低秩近似保留最大的幾個奇異方向。LoRA
              則反過來：不先分解 <Eq>{"W"}</Eq>
              ，而是直接限制訓練出的更新只能住在低秩子空間裡。
            </>
          ) : (
            <>
              In the <Link to="/svd">SVD</Link>, a low-rank approximation keeps the
              largest singular directions. LoRA turns that idea around: instead of
              decomposing <Eq>{"W"}</Eq> first, it constrains the trained update to live
              in a low-rank subspace.
            </>
          )}
        </MLCallout>
      </Section>

      <Section
        title={zh ? "數值範例 4 — 縮放 alpha" : "Numerical example 4 — alpha scaling"}
      >
        {zh ? (
          <p>
            實務上 LoRA 常使用 <Eq>{"s=\\alpha/r"}</Eq>。若 <Eq>{"r=8"}</Eq> 且{" "}
            <Eq>{"\\alpha=16"}</Eq>，則 <Eq>{"s=2"}</Eq>。
          </p>
        ) : (
          <p>
            In practice, LoRA often uses <Eq>{"s=\\alpha/r"}</Eq>. If <Eq>{"r=8"}</Eq> and{" "}
            <Eq>{"\\alpha=16"}</Eq>, then <Eq>{"s=2"}</Eq>.
          </p>
        )}
        <Equation>
          {
            "\\text{if } BAx=\\begin{bmatrix}0.04\\\\-0.06\\end{bmatrix},\\quad sBAx=2\\begin{bmatrix}0.04\\\\-0.06\\end{bmatrix}=\\begin{bmatrix}0.08\\\\-0.12\\end{bmatrix}"
          }
        </Equation>
        <ConceptCard tone="example" title={zh ? "如何解讀" : "How to read it"}>
          {zh
            ? "rank r 控制可學方向的數量；alpha 控制這條低秩路徑加回主模型時的整體強度。"
            : "The rank r controls how many directions can be learned; alpha controls the overall strength of the low-rank path when it is added back to the main model."}
        </ConceptCard>
      </Section>

      <Section title={zh ? "LoRA 放在哪裡" : "Where LoRA goes"}>
        {zh ? (
          <p>
            LoRA 可以加在任何線性層上。在 transformer 中，最常見位置是注意力投影{" "}
            <Eq>{"W_Q,W_K,W_V,W_O"}</Eq>
            ，也可能加在前饋網路的投影矩陣上。每個被選中的矩陣都有自己的 <Eq>{"A,B"}</Eq>
            。
          </p>
        ) : (
          <p>
            LoRA can be attached to any linear layer. In a transformer, common targets are
            the attention projections <Eq>{"W_Q,W_K,W_V,W_O"}</Eq>, and sometimes the
            feed-forward projection matrices. Each selected matrix gets its own{" "}
            <Eq>{"A,B"}</Eq>.
          </p>
        )}
        <ul>
          {zh ? (
            <>
              <li>
                <strong>小 rank</strong>（例如 4 或
                8）：便宜、記憶體少，但可調整方向較少。
              </li>
              <li>
                <strong>大 rank</strong>（例如 32 或
                64）：表達力更強，但成本更接近完整微調。
              </li>
              <li>
                <strong>推論合併</strong>：訓練後可把 <Eq>{"sBA"}</Eq> 加進 <Eq>{"W"}</Eq>
                ，得到 <Eq>{"W' = W+sBA"}</Eq>。
              </li>
            </>
          ) : (
            <>
              <li>
                <strong>Small rank</strong> (say 4 or 8): cheap and memory-light, but
                fewer directions can change.
              </li>
              <li>
                <strong>Larger rank</strong> (say 32 or 64): more expressive, but closer
                to full fine-tuning cost.
              </li>
              <li>
                <strong>Inference merge</strong>: after training, add <Eq>{"sBA"}</Eq>{" "}
                into <Eq>{"W"}</Eq> to get <Eq>{"W' = W+sBA"}</Eq>.
              </li>
            </>
          )}
        </ul>
      </Section>

      <Section title={zh ? "練習題" : "Practice questions"}>
        <Quiz
          title={zh ? "LoRA — 概念檢查" : "LoRA — concept check"}
          questions={loraQuiz(lang)}
        />
      </Section>
    </Page>
  );
}
