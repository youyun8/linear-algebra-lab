import type { QuizQuestion } from "../components/Quiz";
import { Eq } from "../components/Equation";
import type { Lang } from "../i18n/translations";

/**
 * Shared quiz bank. Each topic is a function of the active language so the
 * lesson pages and the Practice Lab render questions, options, and explanations
 * in English or Traditional Chinese. Math (LaTeX) and proper nouns are kept in
 * their original form. Explanations describe WHY an answer is right.
 */

export function diagnosticQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "diag-1",
      question: (
        <>
          {zh ? "若 " : "If "}
          <Eq>{"a = (1, 2)"}</Eq>
          {zh ? " 且 " : " and "}
          <Eq>{"b = (3, 4)"}</Eq>
          {zh ? "，則 " : ", what is "}
          <Eq>{"a \\cdot b"}</Eq>
          {zh ? " 是多少？" : "?"}
        </>
      ),
      options: ["7", "11", "(3, 8)", "25"],
      correct: 1,
      explanation: (
        <>
          {zh
            ? "內積把對應分量相乘再相加："
            : "Dot product multiplies matching components and sums: "}
          <Eq>{"1\\cdot3 + 2\\cdot4 = 3 + 8 = 11"}</Eq>
          {zh ? "。它是單一數字，而非向量。" : ". It is a single number, not a vector."}
        </>
      ),
    },
    {
      id: "diag-2",
      question: (
        <>
          {zh ? "向量 " : "What is the magnitude (length) of "}
          <Eq>{"(3, 4)"}</Eq>
          {zh ? " 的長度（大小）是多少？" : "?"}
        </>
      ),
      options: ["7", "12", "5", "25"],
      correct: 2,
      explanation: (
        <>
          {zh ? "長度為 " : "Length is "}
          <Eq>{"\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5"}</Eq>
          {zh ? "。這正是畢氏定理。" : ". This is just the Pythagorean theorem."}
        </>
      ),
    },
    {
      id: "diag-3",
      question: zh ? (
        <>會讓每個向量維持不變的矩陣稱為……</>
      ) : (
        <>A matrix that leaves every vector unchanged is called the…</>
      ),
      options: zh
        ? ["零矩陣", "單位矩陣", "對角矩陣", "反矩陣"]
        : ["zero matrix", "identity matrix", "diagonal matrix", "inverse matrix"],
      correct: 1,
      explanation: (
        <>
          {zh ? "單位矩陣 " : "The identity matrix "}
          <Eq>{"I"}</Eq>
          {zh
            ? " 的對角線是 1、其餘為 0，因此對每個 "
            : " has 1s on the diagonal and 0s elsewhere, so "}
          <Eq>{"Iv = v"}</Eq>
          {zh ? " 對每個 " : " for every "}
          <Eq>{"v"}</Eq>
          {zh ? " 都成立。" : "."}
        </>
      ),
    },
    {
      id: "diag-4",
      question: (
        <>
          {zh ? "大致而言，" : "Roughly, what does an eigenvector of "}
          <Eq>{"A"}</Eq>
          {zh ? " 的特徵向量代表什麼？" : " represent?"}
        </>
      ),
      options: zh
        ? [
            "被 A 送到零的向量",
            "A 只會拉伸或壓縮（不旋轉）的方向",
            "A 中最大的一行",
            "長度為 1 的向量",
          ]
        : [
            "A vector that A sends to zero",
            "A direction A only stretches or shrinks (no turning)",
            "The largest column of A",
            "A vector with length 1",
          ],
      correct: 1,
      explanation: (
        <>
          {zh ? "特徵向量在 " : "An eigenvector keeps its direction under "}
          <Eq>{"A"}</Eq>
          {zh ? " 作用下維持方向：" : ": "}
          <Eq>{"Av = \\lambda v"}</Eq>
          {zh
            ? "。它可能被拉伸或翻轉，但不會偏離它所在的直線。"
            : ". It may be stretched or flipped, but not rotated off its line."}
        </>
      ),
    },
    {
      id: "diag-5",
      question: zh ? (
        <>在機器學習中，比較兩個嵌入是否相似時最常使用……</>
      ) : (
        <>In machine learning, comparing two embeddings for similarity most often uses…</>
      ),
      options: zh
        ? ["行列式", "餘弦相似度", "矩陣的秩", "跡"]
        : ["the determinant", "cosine similarity", "matrix rank", "the trace"],
      correct: 1,
      explanation: zh ? (
        <>餘弦相似度衡量嵌入向量之間的夾角，忽略其長度——這是內積的直接應用。</>
      ) : (
        <>
          Cosine similarity measures the angle between embedding vectors, ignoring their
          length — a direct application of the dot product.
        </>
      ),
    },
  ];
}

export function vectorsQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "vec-1",
      question: zh ? (
        <>兩個非零向量恰好垂直，當它們的內積為……</>
      ) : (
        <>Two nonzero vectors are perpendicular exactly when their dot product is…</>
      ),
      options: zh
        ? ["1", "0", "負值", "等於它們的長度"]
        : ["1", "0", "negative", "equal to their lengths"],
      correct: 1,
      explanation: (
        <>
          <Eq>{"a\\cdot b = \\|a\\|\\|b\\|\\cos\\theta"}</Eq>
          {zh ? "。垂直代表 " : ". Perpendicular means "}
          <Eq>{"\\theta = 90^\\circ"}</Eq>
          {zh ? "，而 " : ", and "}
          <Eq>{"\\cos 90^\\circ = 0"}</Eq>
          {zh ? "，所以內積為 0。" : ", so the dot product is 0."}
        </>
      ),
    },
    {
      id: "vec-2",
      question: (
        <>
          <Eq>{"(2,0)"}</Eq>
          {zh ? " 與 " : " and "}
          <Eq>{"(5,0)"}</Eq>
          {zh ? " 的餘弦相似度是……" : " cosine similarity is…"}
        </>
      ),
      options: ["0", "0.5", "1", "10"],
      correct: 2,
      explanation: (
        <>
          {zh ? "它們指向相同方向，因此 " : "They point the same direction, so "}
          <Eq>{"\\cos\\theta = 1"}</Eq>
          {zh
            ? "。餘弦相似度忽略大小——只看方向。"
            : ". Cosine similarity ignores magnitude — only direction matters."}
        </>
      ),
    },
    {
      id: "vec-3",
      question: (
        <>
          {zh ? "將 " : "The projection of "}
          <Eq>{"(0,5)"}</Eq>
          {zh ? " 投影到 x 軸方向 " : " onto the x-axis direction "}
          <Eq>{"(1,0)"}</Eq>
          {zh ? " 的結果是……" : " is…"}
        </>
      ),
      options: [
        <Eq>{"(0,0)"}</Eq>,
        <Eq>{"(5,0)"}</Eq>,
        <Eq>{"(0,5)"}</Eq>,
        <Eq>{"(1,0)"}</Eq>,
      ],
      correct: 0,
      explanation: zh ? (
        <>此向量與 x 軸垂直，因此在其上沒有投影：投影為零向量。</>
      ) : (
        <>
          The vector is perpendicular to the x-axis, so it casts no shadow on it: the
          projection is the zero vector.
        </>
      ),
    },
  ];
}

export function matricesQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "mat-1",
      question: (
        <>
          {zh ? "將 " : "To multiply "}
          <Eq>{"A"}</Eq>
          {zh ? "（2×3）乘以 " : " (2×3) by "}
          <Eq>{"B"}</Eq>
          {zh ? "（3×4），結果的形狀是……" : " (3×4), the result has shape…"}
        </>
      ),
      options: ["3×3", "2×4", "2×3", zh ? "未定義" : "undefined"],
      correct: 1,
      explanation: zh ? (
        <>內維度（3 與 3）相符，所以有定義。結果取外維度：2×4。</>
      ) : (
        <>
          Inner dimensions (3 and 3) match, so it's defined. The result takes the outer
          dimensions: 2×4.
        </>
      ),
    },
    {
      id: "mat-2",
      question: (
        <>
          {zh ? "變換矩陣 " : "The columns of a transformation matrix "}
          <Eq>{"A"}</Eq>
          {zh ? " 的各行告訴你……" : " tell you…"}
        </>
      ),
      options: zh
        ? ["特徵值", "基底向量 î 與 ĵ 的落點", "行列式", "反矩陣"]
        : [
            "the eigenvalues",
            "where the basis vectors î and ĵ land",
            "the determinant",
            "the inverse",
          ],
      correct: 1,
      explanation: (
        <>
          {zh ? "第 1 行是 " : "Column 1 is "}
          <Eq>{"A\\hat{i}"}</Eq>
          {zh ? "，第 2 行是 " : " and column 2 is "}
          <Eq>{"A\\hat{j}"}</Eq>
          {zh
            ? "。知道基底的落點就決定了整個線性映射。"
            : ". Knowing where the basis lands defines the whole linear map."}
        </>
      ),
    },
    {
      id: "mat-3",
      question: (
        <>
          {zh ? "若 " : "If "}
          <Eq>{"\\det A = 0"}</Eq>
          {zh ? "，此變換……" : ", the transformation…"}
        </>
      ),
      options: zh
        ? ["保持面積", "把空間壓縮到更低維度", "是純旋轉", "是單位變換"]
        : [
            "preserves area",
            "collapses space onto a lower dimension",
            "is a pure rotation",
            "is the identity",
          ],
      correct: 1,
      explanation: (
        <>
          {zh
            ? "行列式為零表示面積被縮放為 0——平面被壓成一條線或一個點，且 "
            : "A zero determinant means area is scaled by 0 — the plane is squashed onto a line or point, and "}
          <Eq>{"A"}</Eq>
          {zh ? " 不可逆。" : " is not invertible."}
        </>
      ),
    },
  ];
}

export function systemsQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "sys-1",
      question: zh ? (
        <>在列梯形式中，「主元（pivot）」是……</>
      ) : (
        <>In row echelon form, a "pivot" is…</>
      ),
      options: zh
        ? ["任何零元素", "一列中的第一個非零元素", "最後一行", "一整列的零"]
        : [
            "any zero entry",
            "the leading nonzero entry of a row",
            "the last column",
            "a row of zeros",
          ],
      correct: 1,
      explanation: zh ? (
        <>主元是消去後一列中的第一個非零元素。主元的數目等於秩。</>
      ) : (
        <>
          A pivot is the first nonzero entry in a row after elimination. The number of
          pivots equals the rank.
        </>
      ),
    },
    {
      id: "sys-2",
      question: zh ? (
        <>沒有主元的一行對應到一個……</>
      ) : (
        <>A column without a pivot corresponds to a…</>
      ),
      options: zh
        ? ["自由變數", "主元變數", "矛盾", "零列"]
        : ["free variable", "pivot variable", "contradiction", "zero row"],
      correct: 0,
      explanation: zh ? (
        <>非主元行對應自由變數——你可以任意選其值，因而有無限多解。</>
      ) : (
        <>
          Non-pivot columns are free variables — you can choose their values freely,
          giving infinitely many solutions.
        </>
      ),
    },
    {
      id: "sys-3",
      question: zh ? (
        <>當列化簡產生下列何者時，方程組無解（不一致）……</>
      ) : (
        <>A system is inconsistent (no solution) when row reduction produces…</>
      ),
      options: zh
        ? ["一個自由變數", "類似 [0 0 0 | 5] 的一列", "每一行都有主元", "一整列的零"]
        : [
            "a free variable",
            "a row like [0 0 0 | 5]",
            "a pivot in every column",
            "a zero row",
          ],
      correct: 1,
      explanation: (
        <>
          {zh ? "這一列 " : "The row "}
          <Eq>{"[0\\ 0\\ 0\\mid 5]"}</Eq>
          {zh ? " 表示 " : " says "}
          <Eq>{"0 = 5"}</Eq>
          {zh
            ? "，這不可能——因此無解。"
            : ", which is impossible — so there is no solution."}
        </>
      ),
    },
  ];
}

export function subspacesQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "sub-1",
      question: zh ? (
        <>子空間的一組基底是一組向量，且它……</>
      ) : (
        <>A basis of a subspace is a set of vectors that is…</>
      ),
      options: zh
        ? ["線性相依且能生成", "線性獨立且能生成", "只有正交", "全為單位向量"]
        : [
            "linearly dependent and spanning",
            "linearly independent and spanning",
            "orthogonal only",
            "all unit vectors",
          ],
      correct: 1,
      explanation: zh ? (
        <>
          基底必須能生成整個空間（可達到每個向量）且線性獨立（無冗餘）。其大小即為維度。
        </>
      ) : (
        <>
          A basis must span the space (reach every vector) and be independent (no
          redundancy). Its size is the dimension.
        </>
      ),
    },
    {
      id: "sub-2",
      question: (
        <>
          {zh ? "對於一個 " : "For an "}
          <Eq>{"m\\times n"}</Eq>
          {zh ? " 矩陣，秩–零度定理指出……" : " matrix, rank–nullity says…"}
        </>
      ),
      options: [
        <Eq>{"\\text{rank} + \\text{nullity} = m"}</Eq>,
        <Eq>{"\\text{rank} + \\text{nullity} = n"}</Eq>,
        <Eq>{"\\text{rank} = \\text{nullity}"}</Eq>,
        <Eq>{"\\text{rank} \\times \\text{nullity} = n"}</Eq>,
      ],
      correct: 1,
      explanation: (
        <>
          <Eq>{"\\text{rank} + \\text{nullity} = n"}</Eq>
          {zh
            ? "，即行的數目：每一行不是主元（秩），就是自由（零度）。"
            : ", the number of columns: every column is either a pivot (rank) or free (nullity)."}
        </>
      ),
    },
    {
      id: "sub-3",
      question: (
        <>
          <Eq>{"A"}</Eq>
          {zh ? " 的零空間是所有滿足下列條件的 " : " null space is the set of all "}
          <Eq>{"x"}</Eq>
          {zh ? " 所成的集合……" : " with…"}
        </>
      ),
      options: [
        <Eq>{"Ax = x"}</Eq>,
        <Eq>{"Ax = b"}</Eq>,
        <Eq>{"Ax = 0"}</Eq>,
        <Eq>{"x = 0"}</Eq>,
      ],
      correct: 2,
      explanation: (
        <>
          {zh
            ? "零空間收集所有被矩陣送到零的向量："
            : "The null space collects every vector the matrix sends to zero: "}
          <Eq>{"Ax = 0"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
    },
  ];
}

export function orthogonalityQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "ort-1",
      question: (
        <>
          {zh ? "最小平方法藉由求解下列何者，找到使 " : "Least squares finds "}
          <Eq>{"\\hat{x}"}</Eq>
          {zh ? " 最小化 " : " minimizing "}
          <Eq>{"\\|Ax - b\\|"}</Eq>
          {zh ? " 的 " : " by solving…"}
          {zh ? "……" : ""}
        </>
      ),
      options: [
        <Eq>{"Ax = b"}</Eq>,
        <Eq>{"A^{\\mathsf T}A\\hat{x} = A^{\\mathsf T}b"}</Eq>,
        <Eq>{"A\\hat{x} = 0"}</Eq>,
        <Eq>{"A^{\\mathsf T}x = b"}</Eq>,
      ],
      correct: 1,
      explanation: (
        <>
          {zh ? "正規方程 " : "The normal equations "}
          <Eq>{"A^{\\mathsf T}A\\hat{x} = A^{\\mathsf T}b"}</Eq>
          {zh ? " 把 " : " project "}
          <Eq>{"b"}</Eq>
          {zh ? " 投影到 " : " onto the column space of "}
          <Eq>{"A"}</Eq>
          {zh ? " 的行空間，得到最接近的擬合。" : ", giving the closest fit."}
        </>
      ),
    },
    {
      id: "ort-2",
      question: zh ? (
        <>Gram–Schmidt 把一組基底轉換成……</>
      ) : (
        <>Gram–Schmidt turns a basis into…</>
      ),
      options: zh
        ? ["更大的基底", "同一空間的一組正規正交基底", "特徵向量", "對角矩陣"]
        : [
            "a bigger basis",
            "an orthonormal basis for the same space",
            "the eigenvectors",
            "a diagonal matrix",
          ],
      correct: 1,
      explanation: zh ? (
        <>Gram–Schmidt 減去投影使向量互相垂直，再正規化——生成空間不變，向量正規正交。</>
      ) : (
        <>
          Gram–Schmidt subtracts off projections to make vectors mutually perpendicular,
          then normalizes — same span, orthonormal vectors.
        </>
      ),
    },
    {
      id: "ort-3",
      question: (
        <>
          {zh ? "對於一個正交矩陣 " : "For an orthogonal matrix "}
          <Eq>{"Q"}</Eq>
          {zh ? "，它的逆矩陣是……" : ", its inverse is…"}
        </>
      ),
      options: [
        <Eq>{"Q^{\\mathsf T}"}</Eq>,
        <Eq>{"-Q"}</Eq>,
        <Eq>{"Q^2"}</Eq>,
        <Eq>{"\\tfrac{1}{\\det Q}Q"}</Eq>,
      ],
      correct: 0,
      explanation: (
        <>
          {zh ? "由定義 " : "By definition "}
          <Eq>{"Q^{\\mathsf T}Q = I"}</Eq>
          {zh ? "，所以 " : ", so "}
          <Eq>{"Q^{-1} = Q^{\\mathsf T}"}</Eq>
          {zh
            ? "——無需消去法即可求逆。"
            : " — the inverse is just the transpose, no elimination needed."}
        </>
      ),
    },
    {
      id: "ort-4",
      question: zh ? (
        <>下列哪一項對每一個正交矩陣 Q 都成立？</>
      ) : (
        <>Which is true of every orthogonal matrix Q?</>
      ),
      options: zh
        ? [
            "它會改變向量的長度",
            "它保持長度：‖Qx‖ = ‖x‖",
            "它的行列式一定是 +1",
            "它一定是對稱的",
          ]
        : [
            "it changes vector lengths",
            "it preserves length: ‖Qx‖ = ‖x‖",
            "its determinant is always +1",
            "it must be symmetric",
          ],
      correct: 1,
      explanation: zh ? (
        <>
          正交矩陣是等距變換：
          <Eq>{"\\|Qx\\|^2 = x^{\\mathsf T}Q^{\\mathsf T}Qx = \\|x\\|^2"}</Eq>
          。行列式為 <Eq>{"\\pm 1"}</Eq>（旋轉為 +1，反射為 −1），且它未必對稱。
        </>
      ) : (
        <>
          Orthogonal matrices are isometries:{" "}
          <Eq>{"\\|Qx\\|^2 = x^{\\mathsf T}Q^{\\mathsf T}Qx = \\|x\\|^2"}</Eq>. The
          determinant is <Eq>{"\\pm 1"}</Eq> (+1 for a rotation, −1 for a reflection), and
          it need not be symmetric.
        </>
      ),
    },
  ];
}

export function eigenQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "eig-1",
      question: (
        <>
          <Eq>{"A"}</Eq>
          {zh ? " 的特徵值滿足哪個方程式？" : " eigenvalues solve which equation?"}
        </>
      ),
      options: [
        <Eq>{"\\det(A) = 0"}</Eq>,
        <Eq>{"\\det(A - \\lambda I) = 0"}</Eq>,
        <Eq>{"A\\lambda = I"}</Eq>,
        <Eq>{"\\text{tr}(A) = \\lambda"}</Eq>,
      ],
      correct: 1,
      explanation: (
        <>
          {zh ? "特徵方程 " : "The characteristic equation "}
          <Eq>{"\\det(A - \\lambda I) = 0"}</Eq>
          {zh
            ? " 給出特徵值；對於 2×2 會化為 "
            : " yields the eigenvalues; for 2×2 it becomes "}
          <Eq>{"\\lambda^2 - (\\text{tr})\\lambda + \\det = 0"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
    },
    {
      id: "eig-2",
      question: zh ? <>對稱矩陣一定具有……</> : <>Symmetric matrices always have…</>,
      options: zh
        ? ["複數特徵值", "實數特徵值與正交特徵向量", "行列式為 1", "沒有特徵向量"]
        : [
            "complex eigenvalues",
            "real eigenvalues and orthogonal eigenvectors",
            "determinant 1",
            "no eigenvectors",
          ],
      correct: 1,
      explanation: zh ? (
        <>譜定理保證實對稱矩陣具有實數特徵值與一組正規正交特徵基底——這是 PCA 的基礎。</>
      ) : (
        <>
          The spectral theorem guarantees a real symmetric matrix has real eigenvalues and
          an orthonormal eigenbasis — the foundation of PCA.
        </>
      ),
    },
    {
      id: "eig-3",
      question: zh ? (
        <>PCA 使用下列何者的特徵向量來尋找變異量最大的方向……</>
      ) : (
        <>PCA finds directions of maximum variance using the eigenvectors of…</>
      ),
      options: zh
        ? ["資料矩陣本身", "共變異數矩陣", "單位矩陣", "旋轉矩陣"]
        : [
            "the data matrix itself",
            "the covariance matrix",
            "the identity matrix",
            "a rotation matrix",
          ],
      correct: 1,
      explanation: zh ? (
        <>
          PCA
          對（對稱的）共變異數矩陣做對角化；其最大的特徵向量為主成分，特徵值給出所解釋的變異量。
        </>
      ) : (
        <>
          PCA diagonalizes the (symmetric) covariance matrix; its top eigenvectors are the
          principal components and eigenvalues give the variance explained.
        </>
      ),
    },
  ];
}

export function multiplicityQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "mult-1",
      question: zh ? (
        <>「代數重數」是指……</>
      ) : (
        <>The "algebraic multiplicity" of an eigenvalue is…</>
      ),
      options: zh
        ? [
            "λ 作為特徵多項式根的重複次數",
            "λ 的獨立特徵向量個數",
            "A 的秩",
            "λ 的數值大小",
          ]
        : [
            "how many times λ repeats as a root of the characteristic polynomial",
            "the number of independent eigenvectors for λ",
            "the rank of A",
            "the size of λ",
          ],
      correct: 0,
      explanation: (
        <>
          {zh ? "代數重數 = " : "Algebraic multiplicity = the multiplicity of "}
          <Eq>{"\\lambda"}</Eq>
          {zh
            ? " 作為 det(A − λI) = 0 的根的重複次數。"
            : " as a root of det(A − λI) = 0."}
        </>
      ),
    },
    {
      id: "mult-2",
      question: (
        <>{zh ? "λ 的幾何重數等於……" : "The geometric multiplicity of λ equals…"}</>
      ),
      options: [
        <Eq>{"\\dim \\operatorname{null}(A - \\lambda I)"}</Eq>,
        <Eq>{"\\operatorname{rank}(A)"}</Eq>,
        <Eq>{"\\det(A)"}</Eq>,
        <Eq>{"\\operatorname{tr}(A)"}</Eq>,
      ],
      correct: 0,
      explanation: (
        <>
          {zh ? "它是特徵空間的維度，即 " : "It is the dimension of the eigenspace, "}
          <Eq>
            {
              "\\dim\\operatorname{null}(A-\\lambda I) = n - \\operatorname{rank}(A-\\lambda I)"
            }
          </Eq>
          {zh ? "。" : "."}
        </>
      ),
    },
    {
      id: "mult-3",
      question: zh ? (
        <>對每個特徵值，下列哪個關係一定成立？</>
      ) : (
        <>For every eigenvalue, which relationship always holds?</>
      ),
      options: zh
        ? [
            "1 ≤ 幾何重數 ≤ 代數重數",
            "幾何重數 ≥ 代數重數",
            "幾何重數 = 代數重數",
            "代數重數 = 1",
          ]
        : [
            "1 ≤ geometric ≤ algebraic",
            "geometric ≥ algebraic",
            "geometric = algebraic always",
            "algebraic = 1",
          ],
      correct: 0,
      explanation: zh ? (
        <>
          每個特徵值至少有一個特徵向量（幾何 ≥
          1），且幾何重數絕不超過代數重數。相等時該特徵值「行為良好」。
        </>
      ) : (
        <>
          Every eigenvalue has at least one eigenvector (geometric ≥ 1), and the geometric
          multiplicity never exceeds the algebraic one. Equality means that eigenvalue is
          "well behaved."
        </>
      ),
    },
    {
      id: "mult-4",
      question: (
        <>
          {zh ? "矩陣 " : "The matrix "}
          <Eq>{"\\begin{bmatrix} 5 & 1 \\\\ 0 & 5 \\end{bmatrix}"}</Eq>
          {zh ? " 是……" : " is…"}
        </>
      ),
      options: zh
        ? ["虧損的（幾何 1 < 代數 2）", "可對角化的", "對稱的", "有兩個相異特徵值"]
        : [
            "defective (geometric 1 < algebraic 2)",
            "diagonalizable",
            "symmetric",
            "having two distinct eigenvalues",
          ],
      correct: 0,
      explanation: (
        <>
          {zh ? "唯一特徵值 " : "The only eigenvalue is "}
          <Eq>{"\\lambda = 5"}</Eq>
          {zh ? "（代數重數 2），但 " : " (algebraic 2), but "}
          <Eq>{"A - 5I = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}"}</Eq>
          {zh
            ? " 的零空間只有一維，故幾何重數 1——虧損。"
            : " has a 1-D null space, so geometric multiplicity is 1 — defective."}
        </>
      ),
    },
    {
      id: "mult-5",
      question: zh ? (
        <>一個 n×n 矩陣可對角化，當且僅當……</>
      ) : (
        <>An n×n matrix is diagonalizable if and only if…</>
      ),
      options: zh
        ? [
            "每個特徵值的幾何重數都等於其代數重數",
            "它有 n 個相異特徵值",
            "它是對稱的",
            "它可逆",
          ]
        : [
            "every eigenvalue's geometric multiplicity equals its algebraic multiplicity",
            "it has n distinct eigenvalues",
            "it is symmetric",
            "it is invertible",
          ],
      correct: 0,
      explanation: zh ? (
        <>
          幾何重數之和 = n 時才有完整的特徵基底。相異特徵值與對稱都是<em>充分</em>
          條件，但非必要；可逆與此無關。
        </>
      ) : (
        <>
          You get a full eigenbasis exactly when the geometric multiplicities sum to n.
          Distinct eigenvalues and symmetry are <em>sufficient</em> but not necessary;
          invertibility is unrelated.
        </>
      ),
    },
  ];
}

export function svdQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "svd-1",
      question: (
        <>
          {zh ? "在 " : "In "}
          <Eq>{"A = U\\Sigma V^{\\mathsf T}"}</Eq>
          {zh ? " 中，位於 " : ", the singular values on the diagonal of "}
          <Eq>{"\\Sigma"}</Eq>
          {zh ? " 對角線上的奇異值是……" : " are…"}
        </>
      ),
      options: zh
        ? ["A 的特徵值", "AᵀA 特徵值的平方根", "永遠是 1", "A 的對角線"]
        : [
            "the eigenvalues of A",
            "the square roots of the eigenvalues of AᵀA",
            "always 1",
            "the diagonal of A",
          ],
      correct: 1,
      explanation: (
        <>
          {zh ? "奇異值為 " : "Singular values are "}
          <Eq>{"\\sigma_i = \\sqrt{\\lambda_i}"}</Eq>
          {zh ? "，其中 " : " where "}
          <Eq>{"\\lambda_i"}</Eq>
          {zh ? " 是 " : " are eigenvalues of "}
          <Eq>{"A^{\\mathsf T}A"}</Eq>
          {zh ? " 的特徵值（恆 ≥ 0）。" : " (always ≥ 0)."}
        </>
      ),
    },
    {
      id: "svd-2",
      question: zh ? (
        <>從幾何上看，每個矩陣都作用為……</>
      ) : (
        <>Geometrically, every matrix acts as…</>
      ),
      options: zh
        ? ["只有旋轉", "旋轉／反射，再縮放，再旋轉／反射", "只有縮放", "隨機洗牌"]
        : [
            "rotation only",
            "rotation/reflection, then scaling, then rotation/reflection",
            "scaling only",
            "a random shuffle",
          ],
      correct: 1,
      explanation: (
        <>
          {zh ? "SVD 指出任何 " : "SVD says any "}
          <Eq>{"A"}</Eq>
          {zh ? " ＝（正交的 " : " = (orthogonal "}
          <Eq>{"V^{\\mathsf T}"}</Eq>
          {zh ? "）→（用 " : ") → (scale by "}
          <Eq>{"\\Sigma"}</Eq>
          {zh ? " 縮放）→（正交的 " : ") → (orthogonal "}
          <Eq>{"U"}</Eq>
          {zh
            ? "）。旋轉／反射、拉伸、旋轉／反射。"
            : "). Rotate/reflect, stretch, rotate/reflect."}
        </>
      ),
    },
    {
      id: "svd-3",
      question: (
        <>
          <Eq>{"A"}</Eq>
          {zh ? " 的最佳秩 1 近似會保留……" : " best rank-1 approximation of keeps…"}
        </>
      ),
      options: zh
        ? ["最小的奇異值", "最大的奇異值及其向量", "所有奇異值", "行列式"]
        : [
            "the smallest singular value",
            "the largest singular value and its vectors",
            "all singular values",
            "the determinant",
          ],
      correct: 1,
      explanation: (
        <>
          {zh ? "保留最大的 " : "Keeping the largest "}
          <Eq>{"\\sigma_1 u_1 v_1^{\\mathsf T}"}</Eq>
          {zh
            ? " 可得到最接近的秩 1 矩陣（Eckart–Young 定理）。這是壓縮、PCA 與 LoRA 的基礎。"
            : " gives the closest rank-1 matrix (Eckart–Young). This is the basis of compression, PCA, and LoRA."}
        </>
      ),
    },
  ];
}

export function diagVsSvdQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "dvs-1",
      question: zh ? (
        <>下列哪一項對任意（含長方形、虧損）矩陣都成立？</>
      ) : (
        <>
          Which factorization exists for any matrix, including rectangular and defective
          ones?
        </>
      ),
      options: zh
        ? ["對角化 A = PDP⁻¹", "SVD A = UΣVᵀ", "兩者皆是", "兩者皆非"]
        : ["Diagonalization A = PDP⁻¹", "SVD A = UΣVᵀ", "Both", "Neither"],
      correct: 1,
      explanation: (
        <>
          {zh
            ? "SVD 對每個矩陣都存在；對角化只適用於有完整獨立特徵向量的方陣。"
            : "SVD exists for every matrix; diagonalization needs a square matrix with a full set of independent eigenvectors."}
        </>
      ),
    },
    {
      id: "dvs-2",
      question: (
        <>
          {zh ? "對於對稱半正定矩陣 " : "For a symmetric positive-semidefinite matrix "}
          <Eq>{"A = A^{\\mathsf T} \\succeq 0"}</Eq>
          {zh
            ? "，SVD 與對角化的關係是……"
            : ", how do the SVD and the diagonalization relate?"}
        </>
      ),
      options: zh
        ? [
            "完全相同：U = V = Q 且 σᵢ = λᵢ",
            "毫無關聯",
            "只有 U = V，但 σᵢ = λᵢ²",
            "只在 A 可逆時相同",
          ]
        : [
            "Identical: U = V = Q and σᵢ = λᵢ",
            "Unrelated",
            "Only U = V, but σᵢ = λᵢ²",
            "Same only when A is invertible",
          ],
      correct: 0,
      explanation: (
        <>
          {zh ? "由譜定理 " : "By the spectral theorem "}
          <Eq>{"A = QDQ^{\\mathsf T}"}</Eq>
          {zh
            ? "；當所有 λᵢ ≥ 0 時，這已經是一個 SVD，故 U = V = Q，σᵢ = λᵢ。"
            : "; when all λᵢ ≥ 0 this is already an SVD, so U = V = Q and σᵢ = λᵢ."}
        </>
      ),
    },
    {
      id: "dvs-3",
      question: (
        <>
          {zh ? "一般矩陣的右奇異向量 " : "The right singular vectors "}
          <Eq>{"V"}</Eq>
          {zh ? " 是哪個矩陣的特徵向量？" : " are eigenvectors of which matrix?"}
        </>
      ),
      options: zh ? ["A", "AᵀA", "A + Aᵀ", "A⁻¹"] : ["A", "AᵀA", "A + Aᵀ", "A⁻¹"],
      correct: 1,
      explanation: (
        <>
          <Eq>{"A^{\\mathsf T}A = V\\Sigma^2 V^{\\mathsf T}"}</Eq>
          {zh
            ? "，所以 V 是 AᵀA 的特徵向量，且 σᵢ² 是它的特徵值。SVD 其實是對 AᵀA／AAᵀ 做對角化。"
            : ", so V holds the eigenvectors of AᵀA and σᵢ² its eigenvalues. SVD is diagonalization of AᵀA / AAᵀ."}
        </>
      ),
    },
    {
      id: "dvs-4",
      question: zh ? (
        <>對於一個非對稱但可對角化的矩陣，關於基底何者正確？</>
      ) : (
        <>
          For a non-symmetric but diagonalizable matrix, which statement about the bases
          is correct?
        </>
      ),
      options: zh
        ? [
            "P 的各行（特徵向量）一般不正交，但 U 與 V 一定正交",
            "P、U、V 全都正交",
            "P 正交，但 U、V 不是",
            "三者都不正交",
          ]
        : [
            "P's columns (eigenvectors) are generally not orthogonal, but U and V always are",
            "P, U, and V are all orthogonal",
            "P is orthogonal but U and V are not",
            "None of them are orthogonal",
          ],
      correct: 0,
      explanation: (
        <>
          {zh
            ? "對角化用一組（可能斜交的）特徵基底 P；SVD 一定用兩組正規正交基底 U 與 V。"
            : "Diagonalization uses one (possibly oblique) eigenbasis P; SVD always uses two orthonormal bases U and V."}
        </>
      ),
    },
    {
      id: "dvs-5",
      question: (
        <>
          {zh
            ? "對稱矩陣有一個負特徵值 "
            : "A symmetric matrix has a negative eigenvalue "}
          <Eq>{"\\lambda_i < 0"}</Eq>
          {zh ? "。它的奇異值 σᵢ 是……" : ". Its singular value σᵢ is…"}
        </>
      ),
      options: zh
        ? ["λᵢ", "|λᵢ|，且符號被吸收進 U", "λᵢ²", "0"]
        : ["λᵢ", "|λᵢ|, with the sign absorbed into U", "λᵢ²", "0"],
      correct: 1,
      explanation: (
        <>
          {zh
            ? "奇異值恆 ≥ 0，所以 σᵢ = |λᵢ|，對應的 U 那一行取 −qᵢ 以吸收負號。"
            : "Singular values are ≥ 0, so σᵢ = |λᵢ| and the matching column of U becomes −qᵢ to absorb the sign."}
        </>
      ),
    },
  ];
}

export function matrixCalculusQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "mcalc-1",
      question: (
        <>
          {zh ? "純量對向量的梯度 " : "The gradient "}
          <Eq>{"\\nabla_x f"}</Eq>
          {zh ? " 具有什麼形狀？" : " of a scalar has what shape?"}
        </>
      ),
      options: zh
        ? [
            "與 x 相同的形狀（一個向量）",
            "永遠是純量",
            "一個方陣",
            "x 長度平方那麼多的元素",
          ]
        : [
            "the same shape as x (a vector)",
            "always a scalar",
            "a square matrix",
            "as many entries as the length of x squared",
          ],
      correct: 0,
      explanation: zh ? (
        <>
          純量損失對參數的梯度和參數本身同形，這樣才能做{" "}
          <Eq>{"x \\leftarrow x - \\eta\\nabla_x f"}</Eq>
          （梯度下降）這一步。這也是深度學習框架把梯度存回和權重相同張量形狀的原因。
        </>
      ) : (
        <>
          The gradient of a scalar loss has the same shape as the parameter, so the update{" "}
          <Eq>{"x \\leftarrow x - \\eta\\nabla_x f"}</Eq> (gradient descent) type-checks.
          That's why frameworks store a gradient in the same tensor shape as the weight.
        </>
      ),
    },
    {
      id: "mcalc-2",
      question: (
        <>
          {zh ? "對 " : "For "}
          <Eq>{"f(x) = a^{\\mathsf T}x"}</Eq>
          {zh ? "，梯度 " : ", the gradient "}
          <Eq>{"\\nabla_x f"}</Eq>
          {zh ? " 是……" : " is…"}
        </>
      ),
      options: [
        <Eq>{"a"}</Eq>,
        <Eq>{"x"}</Eq>,
        <Eq>{"a^{\\mathsf T}x"}</Eq>,
        <Eq>{"2a"}</Eq>,
      ],
      correct: 0,
      explanation: (
        <>
          <Eq>{"a^{\\mathsf T}x = \\sum_i a_i x_i"}</Eq>
          {zh ? "，因此 " : ", so "}
          <Eq>{"\\partial f/\\partial x_i = a_i"}</Eq>
          {zh
            ? "，整個梯度就是 a。這是純量–向量微積分裡最基本的一條。"
            : ", and the whole gradient is a. This is the most basic scalar–vector rule."}
        </>
      ),
    },
    {
      id: "mcalc-3",
      question: (
        <>
          {zh
            ? "對一個對稱矩陣 A，二次型 "
            : "For a symmetric matrix A, the quadratic form "}
          <Eq>{"f(x) = x^{\\mathsf T}Ax"}</Eq>
          {zh ? " 的梯度是……" : " has gradient…"}
        </>
      ),
      options: [
        <Eq>{"Ax"}</Eq>,
        <Eq>{"2Ax"}</Eq>,
        <Eq>{"A"}</Eq>,
        <Eq>{"(A + A^{\\mathsf T})"}</Eq>,
      ],
      correct: 1,
      explanation: (
        <>
          {zh ? "一般情形 " : "In general "}
          <Eq>{"\\nabla_x (x^{\\mathsf T}Ax) = (A + A^{\\mathsf T})x"}</Eq>
          {zh ? "；當 A 對稱時化為 " : "; when A is symmetric this becomes "}
          <Eq>{"2Ax"}</Eq>
          {zh
            ? "。它是純量 x² 微分為 2x 的多維版本。"
            : ". It's the multivariate version of differentiating x² to 2x."}
        </>
      ),
    },
    {
      id: "mcalc-4",
      question: (
        <>
          {zh ? "令 " : "Setting the gradient of "}
          <Eq>{"\\tfrac12\\|Ax - b\\|^2"}</Eq>
          {zh ? " 的梯度為零，會得到……" : " to zero gives…"}
        </>
      ),
      options: [
        <Eq>{"Ax = b"}</Eq>,
        <Eq>{"A^{\\mathsf T}Ax = A^{\\mathsf T}b"}</Eq>,
        <Eq>{"A^{\\mathsf T}x = b"}</Eq>,
        <Eq>{"Ax = 0"}</Eq>,
      ],
      correct: 1,
      explanation: (
        <>
          {zh ? "梯度為 " : "The gradient is "}
          <Eq>{"A^{\\mathsf T}(Ax - b)"}</Eq>
          {zh
            ? "；設為零即得正規方程 "
            : "; setting it to zero gives the normal equations "}
          <Eq>{"A^{\\mathsf T}Ax = A^{\\mathsf T}b"}</Eq>
          {zh
            ? "。微積分因此重現了第 6 節的最小平方解。"
            : ". Calculus thus recovers the least-squares solution from Section 6."}
        </>
      ),
    },
    {
      id: "mcalc-5",
      question: zh ? <>反向傳播本質上是……</> : <>Backpropagation is essentially…</>,
      options: zh
        ? [
            "把每一層的 Jacobian 依連鎖律相乘",
            "對權重求特徵值",
            "把權重矩陣求逆",
            "一種隨機搜尋",
          ]
        : [
            "the chain rule multiplying each layer's Jacobian",
            "finding eigenvalues of the weights",
            "inverting the weight matrices",
            "a random search",
          ],
      correct: 0,
      explanation: zh ? (
        <>
          反向傳播就是連鎖律：把每一層的 Jacobian
          由輸出往輸入相乘。由於相鄰的因子多為矩陣–向量乘積，整條反向傳遞都是線性代數。
        </>
      ) : (
        <>
          Backprop is the chain rule: multiply each layer's Jacobian from output back to
          input. Because neighboring factors are matrix–vector products, the whole
          backward pass is linear algebra.
        </>
      ),
    },
  ];
}

export function mlQuiz(lang: Lang): QuizQuestion[] {
  const zh = lang === "zh";
  return [
    {
      id: "ml-1",
      question: zh ? (
        <>全連接神經網路層計算的是……</>
      ) : (
        <>A fully-connected neural network layer computes…</>
      ),
      options: zh
        ? [
            <>
              <Eq>{"Wx + b"}</Eq>，一個矩陣–向量乘積後接一個非線性
            </>,
            "只有一個內積",
            "特徵分解",
            "行列式",
          ]
        : [
            <>
              <Eq>{"Wx + b"}</Eq>, a matrix–vector product then a nonlinearity
            </>,
            "only a dot product",
            "an eigen-decomposition",
            "a determinant",
          ],
      correct: 0,
      explanation: (
        <>
          {zh ? "每一層是仿射映射 " : "Each layer is an affine map "}
          <Eq>{"Wx + b"}</Eq>
          {zh
            ? "（矩陣乘法加上偏差）後接一個激勵函數。深層網路把這些疊起來。"
            : " (matrix multiply plus bias) followed by an activation. Deep nets stack these."}
        </>
      ),
    },
    {
      id: "ml-2",
      question: zh ? (
        <>在注意力機制中，分數矩陣來自……</>
      ) : (
        <>In attention, the scores matrix comes from…</>
      ),
      options: [
        <Eq>{"QK^{\\mathsf T}"}</Eq>,
        <Eq>{"Q + K"}</Eq>,
        zh ? "Q 的行列式" : "the determinant of Q",
        zh ? "V 的反矩陣" : "the inverse of V",
      ],
      correct: 0,
      explanation: (
        <>
          {zh
            ? "注意力分數是查詢與鍵之間的內積："
            : "Attention scores are dot products between queries and keys: "}
          <Eq>{"QK^{\\mathsf T}"}</Eq>
          {zh
            ? "，經縮放與 softmax 後，用來組合值 "
            : ", scaled and softmaxed, then used to combine values "}
          <Eq>{"V"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
    },
    {
      id: "ml-3",
      question: zh ? (
        <>LoRA 透過將權重更新表示為下列何者，使微調變得便宜……</>
      ) : (
        <>LoRA makes fine-tuning cheap by representing a weight update as…</>
      ),
      options: zh
        ? ["一個完整的稠密矩陣", "內維度極小的低秩乘積 BA", "一個對角矩陣", "單位矩陣"]
        : [
            "a full dense matrix",
            "a low-rank product BA with tiny inner dimension",
            "a diagonal matrix",
            "the identity",
          ],
      correct: 1,
      explanation: (
        <>
          {zh ? "LoRA 把更新寫成 " : "LoRA writes "}
          <Eq>{"\\Delta W = BA"}</Eq>
          {zh ? "，其中 " : " where "}
          <Eq>{"B"}</Eq>
          {zh ? " 與 " : " and "}
          <Eq>{"A"}</Eq>
          {zh
            ? " 都很瘦——參數很少——利用了有用的更新近似為低秩這一事實。"
            : " are skinny — few parameters — exploiting that useful updates are approximately low rank."}
        </>
      ),
    },
  ];
}
