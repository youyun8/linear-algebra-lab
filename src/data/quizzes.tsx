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
      options: [<>{"(0,0)"}</>, <>{"(5,0)"}</>, <>{"(0,5)"}</>, <>{"(1,0)"}</>],
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
        <>{"rank + nullity = m"}</>,
        <>{"rank + nullity = n"}</>,
        <>{"rank = nullity"}</>,
        <>{"rank \\times nullity = n"}</>,
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
      options: [<>{"Ax = x"}</>, <>{"Ax = b"}</>, <>{"Ax = 0"}</>, <>{"x = 0"}</>],
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
        <>{"Ax = b"}</>,
        <>{"A^{\\mathsf T}A\\hat{x} = A^{\\mathsf T}b"}</>,
        <>{"A\\hat{x} = 0"}</>,
        <>{"A^{\\mathsf T}x = b"}</>,
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
        <>{"\\det(A) = 0"}</>,
        <>{"\\det(A - \\lambda I) = 0"}</>,
        <>{"A\\lambda = I"}</>,
        <>{"\\text{tr}(A) = \\lambda"}</>,
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
        <>{"QK^{\\mathsf T}"}</>,
        <>{"Q + K"}</>,
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
