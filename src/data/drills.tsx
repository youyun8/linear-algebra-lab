import type { ReactNode } from "react";
import type { SolutionStep } from "../components/StepSolution";
import { Eq, Equation } from "../components/Equation";
import type { Lang } from "../i18n/translations";

/**
 * Pencil-and-paper exercise bank. Each drill is meant to be attempted by hand
 * first; the StepSolution renders in reveal mode so answers stay hidden until
 * the student is ready. Grouped by topic so the Practice Lab can filter them.
 * Content is a function of language so titles, prompts, and hints localize;
 * math (LaTeX) is language-neutral and shared.
 */
export interface Drill {
  id: string;
  title: string;
  prompt: ReactNode;
  hint?: ReactNode;
  steps: SolutionStep[];
}

export interface DrillTopic {
  label: string;
  drills: Drill[];
}

function vectors(zh: boolean): Drill[] {
  return [
    {
      id: "v1",
      title: zh ? "內積、長度與夾角" : "Dot product, length, and angle",
      prompt: (
        <>
          {zh ? "對於 " : "For "}
          <Eq>{"a = (3, 4)"}</Eq>
          {zh ? " 與 " : " and "}
          <Eq>{"b = (4, 3)"}</Eq>
          {zh ? "，計算 " : ", compute "}
          <Eq>{"a\\cdot b"}</Eq>、<Eq>{"\\|a\\|"}</Eq>、<Eq>{"\\|b\\|"}</Eq>
          {zh ? " 與 " : ", and "}
          <Eq>{"\\cos\\theta"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      hint: zh ? (
        <>長度是各分量平方和的平方根；cosθ = (a·b)/(‖a‖‖b‖)。</>
      ) : (
        <>Length is the square root of the sum of squares; cosθ = (a·b)/(‖a‖‖b‖).</>
      ),
      steps: [
        { content: <Equation>{"a\\cdot b = 3\\cdot4 + 4\\cdot3 = 24"}</Equation> },
        {
          content: (
            <Equation>
              {"\\|a\\| = \\sqrt{9+16} = 5,\\quad \\|b\\| = \\sqrt{16+9} = 5"}
            </Equation>
          ),
        },
        { content: <Equation>{"\\cos\\theta = \\dfrac{24}{5\\cdot5} = 0.96"}</Equation> },
      ],
    },
    {
      id: "v2",
      title: zh ? "正交性檢查" : "Orthogonality check",
      prompt: (
        <>
          <Eq>{"a = (1, 2)"}</Eq>
          {zh ? " 與 " : " and "}
          <Eq>{"b = (2, -1)"}</Eq>
          {zh ? " 垂直嗎？" : " — are they perpendicular?"}
        </>
      ),
      hint: zh ? (
        <>垂直向量的內積恰好為 0。</>
      ) : (
        <>Perpendicular vectors have a dot product of exactly 0.</>
      ),
      steps: [
        { content: <Equation>{"a\\cdot b = 1\\cdot2 + 2\\cdot(-1) = 0"}</Equation> },
        {
          content: zh ? (
            <>
              內積為 0，所以 <Eq>{"\\theta = 90^\\circ"}</Eq>——兩向量正交。
            </>
          ) : (
            <>
              The dot product is 0, so <Eq>{"\\theta = 90^\\circ"}</Eq> — the vectors are
              orthogonal.
            </>
          ),
        },
      ],
    },
    {
      id: "v3",
      title: zh ? "正規化為單位向量" : "Normalize to a unit vector",
      prompt: (
        <>
          {zh ? "求 " : "Find the unit vector in the direction of "}
          <Eq>{"v = (6, 8)"}</Eq>
          {zh ? " 方向上的單位向量。" : "."}
        </>
      ),
      hint: zh ? (
        <>把向量除以它自己的長度。</>
      ) : (
        <>Divide the vector by its own length.</>
      ),
      steps: [
        { content: <Equation>{"\\|v\\| = \\sqrt{36+64} = \\sqrt{100} = 10"}</Equation> },
        {
          content: <Equation>{"\\hat v = \\dfrac{1}{10}(6, 8) = (0.6,\\ 0.8)"}</Equation>,
        },
      ],
    },
    {
      id: "v4",
      title: zh ? "投影到一個向量上" : "Projection onto a vector",
      prompt: (
        <>
          {zh ? "把 " : "Project "}
          <Eq>{"a = (2, 3)"}</Eq>
          {zh ? " 投影到 " : " onto "}
          <Eq>{"b = (1, 1)"}</Eq>
          {zh ? " 上。" : "."}
        </>
      ),
      hint: (
        <>
          {zh ? "使用 " : "Use "}
          <Eq>{"\\operatorname{proj}_b a = \\dfrac{a\\cdot b}{b\\cdot b}\\,b"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        {
          content: (
            <Equation>{"a\\cdot b = 2 + 3 = 5,\\quad b\\cdot b = 1 + 1 = 2"}</Equation>
          ),
        },
        {
          content: (
            <Equation>
              {"\\operatorname{proj}_b a = \\tfrac{5}{2}(1,1) = (2.5,\\ 2.5)"}
            </Equation>
          ),
        },
      ],
    },
    {
      id: "v5",
      title: zh ? "三維中的餘弦相似度" : "Cosine similarity in 3D",
      prompt: (
        <>
          <Eq>{"a = (1, 1, 0)"}</Eq>
          {zh ? " 與 " : " and "}
          <Eq>{"b = (0, 1, 1)"}</Eq>
          {zh ? " 的餘弦相似度是多少？" : " — cosine similarity?"}
        </>
      ),
      steps: [
        { content: <Equation>{"a\\cdot b = 0 + 1 + 0 = 1"}</Equation> },
        { content: <Equation>{"\\|a\\| = \\|b\\| = \\sqrt{2}"}</Equation> },
        {
          content: (
            <>
              <Equation>
                {"\\cos\\theta = \\dfrac{1}{\\sqrt2\\cdot\\sqrt2} = \\tfrac12"}
              </Equation>
              {zh ? "，所以 " : "so "}
              <Eq>{"\\theta = 60^\\circ"}</Eq>
              {zh ? "。" : "."}
            </>
          ),
        },
      ],
    },
    {
      id: "v6",
      title: zh ? "線性組合" : "Linear combination",
      prompt: (
        <>
          {zh ? "計算 " : "Compute "}
          <Eq>{"2(1, -1) + 3(0, 2)"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        { content: <Equation>{"2(1,-1) = (2,-2),\\quad 3(0,2) = (0,6)"}</Equation> },
        { content: <Equation>{"(2,-2) + (0,6) = (2,\\ 4)"}</Equation> },
      ],
    },
    {
      id: "v7",
      title: zh ? "兩點之間的距離" : "Distance between two points",
      prompt: (
        <>
          {zh ? "從 " : "Distance from "}
          <Eq>{"p = (1, 2)"}</Eq>
          {zh ? " 到 " : " to "}
          <Eq>{"q = (4, 6)"}</Eq>
          {zh ? " 的距離是多少？" : "?"}
        </>
      ),
      hint: zh ? (
        <>距離是差向量 q − p 的長度。</>
      ) : (
        <>Distance is the length of the difference vector q − p.</>
      ),
      steps: [
        { content: <Equation>{"q - p = (3,\\ 4)"}</Equation> },
        { content: <Equation>{"\\|q - p\\| = \\sqrt{9 + 16} = 5"}</Equation> },
      ],
    },
  ];
}

function matrices(zh: boolean): Drill[] {
  return [
    {
      id: "m1",
      title: zh ? "矩陣–向量乘積" : "Matrix–vector product",
      prompt: (
        <>
          {zh ? "計算 " : "Compute "}
          <Eq>{"Ax"}</Eq>
          {zh ? "，其中 " : " for "}
          <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}"}</Eq>、
          <Eq>{"x = (1, 1)"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      hint: zh ? (
        <>每個輸出分量是 A 的一列與 x 的內積。</>
      ) : (
        <>Each output entry is a row of A dotted with x.</>
      ),
      steps: [
        { content: <Equation>{"\\text{row 1}: 1\\cdot1 + 2\\cdot1 = 3"}</Equation> },
        { content: <Equation>{"\\text{row 2}: 3\\cdot1 + 4\\cdot1 = 7"}</Equation> },
        { content: <Equation>{"Ax = (3,\\ 7)"}</Equation> },
      ],
    },
    {
      id: "m2",
      title: zh ? "2×2 矩陣乘法" : "2×2 matrix multiplication",
      prompt: (
        <>
          {zh ? "計算 " : "Compute "}
          <Eq>{"AB"}</Eq>
          {zh ? "，其中 " : " for "}
          <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}"}</Eq>、
          <Eq>{"B = \\begin{bmatrix} 1 & 0 \\\\ 3 & 1 \\end{bmatrix}"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      hint: zh ? (
        <>元素 (i, j) 是 A 第 i 列與 B 第 j 行的內積。</>
      ) : (
        <>Entry (i, j) is row i of A dotted with column j of B.</>
      ),
      steps: [
        {
          content: (
            <Equation>
              {"\\text{row 1}: [1\\cdot1 + 2\\cdot3,\\ 1\\cdot0 + 2\\cdot1] = [7,\\ 2]"}
            </Equation>
          ),
        },
        {
          content: (
            <Equation>
              {"\\text{row 2}: [0\\cdot1 + 1\\cdot3,\\ 0\\cdot0 + 1\\cdot1] = [3,\\ 1]"}
            </Equation>
          ),
        },
        {
          content: (
            <Equation>{"AB = \\begin{bmatrix} 7 & 2 \\\\ 3 & 1 \\end{bmatrix}"}</Equation>
          ),
        },
      ],
    },
    {
      id: "m3",
      title: zh ? "行列式與可逆性" : "Determinant & invertibility",
      prompt: (
        <>
          <Eq>{"A = \\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}"}</Eq>
          {zh ? " 可逆嗎？" : " — is it invertible?"}
        </>
      ),
      steps: [
        { content: <Equation>{"\\det A = 2\\cdot2 - 4\\cdot1 = 0"}</Equation> },
        {
          content: zh ? (
            <>
              det = 0，所以<strong>不可逆</strong>。第 2 列是第 1 列的一半——兩行共線（秩
              1）。
            </>
          ) : (
            <>
              det = 0, so <strong>not invertible</strong>. Row 2 is half of row 1 — the
              columns are collinear (rank 1).
            </>
          ),
        },
      ],
    },
    {
      id: "m4",
      title: zh ? "2×2 的反矩陣" : "Inverse of a 2×2",
      prompt: (
        <>
          {zh ? "求 " : "Find "}
          <Eq>{"A^{-1}"}</Eq>
          {zh ? "，其中 " : " for "}
          <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      hint: (
        <>
          <Eq>
            {
              "\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}^{-1} = \\tfrac1{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}"
            }
          </Eq>
        </>
      ),
      steps: [
        { content: <Equation>{"\\det A = 2\\cdot1 - 1\\cdot1 = 1"}</Equation> },
        {
          content: (
            <Equation>
              {
                "A^{-1} = \\tfrac11\\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix} = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}"
              }
            </Equation>
          ),
        },
      ],
    },
    {
      id: "m5",
      title: zh ? "跡與行列式" : "Trace and determinant",
      prompt: (
        <>
          {zh ? "求 " : "Find the trace and determinant of "}
          <Eq>{"A = \\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}"}</Eq>
          {zh ? " 的跡與行列式。" : "."}
        </>
      ),
      steps: [
        { content: <Equation>{"\\operatorname{tr}A = 3 + 4 = 7"}</Equation> },
        { content: <Equation>{"\\det A = 3\\cdot4 - 1\\cdot2 = 10"}</Equation> },
      ],
    },
    {
      id: "m6",
      title: zh ? "套用旋轉矩陣" : "Apply a rotation matrix",
      prompt: (
        <>
          {zh ? "90° 旋轉 " : "Where does the 90° rotation "}
          <Eq>{"R = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}"}</Eq>
          {zh ? " 會把 " : " send "}
          <Eq>{"(1, 0)"}</Eq>
          {zh ? " 送到哪裡？" : "?"}
        </>
      ),
      hint: zh ? (
        <>R 的各行顯示 î 與 ĵ 的落點。</>
      ) : (
        <>The columns of R show where î and ĵ land.</>
      ),
      steps: [
        {
          content: (
            <Equation>
              {"R\\,(1,0) = (0\\cdot1 - 1\\cdot0,\\ 1\\cdot1 + 0\\cdot0) = (0,\\ 1)"}
            </Equation>
          ),
        },
        {
          content: zh ? (
            <>x 軸向量旋轉四分之一圈到 y 軸上。</>
          ) : (
            <>The x-axis vector rotates a quarter turn onto the y-axis.</>
          ),
        },
      ],
    },
    {
      id: "m7",
      title: zh ? "矩陣對稱嗎？" : "Is the matrix symmetric?",
      prompt: (
        <>
          <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 3 \\end{bmatrix}"}</Eq>
          {zh ? " 是對稱的嗎？" : " — is it symmetric?"}
        </>
      ),
      hint: (
        <>
          {zh ? "對稱代表 " : "Symmetric means "}
          <Eq>{"A = A^{\\mathsf T}"}</Eq>
          {zh ? "——沿對角線鏡射。" : " — mirror across the diagonal."}
        </>
      ),
      steps: [
        {
          content: zh ? (
            <>
              非對角元素相符（<Eq>{"a_{12} = a_{21} = 2"}</Eq>），所以{" "}
              <Eq>{"A = A^{\\mathsf T}"}</Eq>——是的，對稱。
            </>
          ) : (
            <>
              The off-diagonal entries match (<Eq>{"a_{12} = a_{21} = 2"}</Eq>), so{" "}
              <Eq>{"A = A^{\\mathsf T}"}</Eq> — yes, symmetric.
            </>
          ),
        },
      ],
    },
  ];
}

function systems(zh: boolean): Drill[] {
  return [
    {
      id: "s1",
      title: zh ? "求解 2×2 方程組" : "Solve a 2×2 system",
      prompt: (
        <>
          {zh ? "求解 " : "Solve "}
          <Eq>{"x + y = 5"}</Eq>、<Eq>{"x - y = 1"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      hint: zh ? <>把兩式相加以消去 y。</> : <>Add the two equations to eliminate y.</>,
      steps: [
        { content: <Equation>{"(x+y) + (x-y) = 5 + 1 \\Rightarrow 2x = 6"}</Equation> },
        { content: <Equation>{"x = 3,\\quad y = 5 - 3 = 2"}</Equation> },
      ],
    },
    {
      id: "s2",
      title: zh ? "列化簡與回代" : "Row reduction & back-substitution",
      prompt: (
        <>
          {zh ? "以消去法求解 " : "Solve "}
          <Eq>{"x + 2y = 3"}</Eq>、<Eq>{"2x + 5y = 8"}</Eq>
          {zh ? "。" : " by elimination."}
        </>
      ),
      hint: zh ? <>用第 2 列減去 2×（第 1 列）。</> : <>Subtract 2×(row 1) from row 2.</>,
      steps: [
        {
          content: (
            <Equation>{"R_2 - 2R_1:\\quad (5-4)y = 8-6 \\Rightarrow y = 2"}</Equation>
          ),
        },
        { content: <Equation>{"x = 3 - 2(2) = -1"}</Equation> },
        { content: <Equation>{"(x, y) = (-1,\\ 2)"}</Equation> },
      ],
    },
    {
      id: "s3",
      title: zh ? "由主元判斷秩" : "Rank from pivots",
      prompt: (
        <>
          <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}"}</Eq>
          {zh ? " 的秩是多少？" : " — what is its rank?"}
        </>
      ),
      steps: [
        { content: <Equation>{"R_2 - 2R_1 = [0\\ \\ 0]"}</Equation> },
        {
          content: zh ? (
            <>只有一列非零（一個主元），因此秩為 1。</>
          ) : (
            <>Only one nonzero row (one pivot), so the rank is 1.</>
          ),
        },
      ],
    },
    {
      id: "s4",
      title: zh ? "偵測不一致方程組" : "Detect an inconsistent system",
      prompt: (
        <>
          {zh ? "求解 " : "Solve "}
          <Eq>{"x + y = 2"}</Eq>、<Eq>{"2x + 2y = 5"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      hint: zh ? (
        <>如果把第二式除以 2，左邊會變成什麼？</>
      ) : (
        <>What happens to the left side if you halve the second equation?</>
      ),
      steps: [
        { content: <Equation>{"R_2 - 2R_1:\\quad 0 = 5 - 4 = 1"}</Equation> },
        {
          content: zh ? (
            <>
              這一列 <Eq>{"[0\\ 0\\mid 1]"}</Eq> 表示 <Eq>{"0 = 1"}</Eq>——不可能。方程組{" "}
              <strong>無解</strong>。
            </>
          ) : (
            <>
              The row <Eq>{"[0\\ 0\\mid 1]"}</Eq> says <Eq>{"0 = 1"}</Eq> — impossible.
              The system has <strong>no solution</strong>.
            </>
          ),
        },
      ],
    },
    {
      id: "s5",
      title: zh ? "計算自由變數的數量" : "Count free variables",
      prompt: (
        <>
          {zh ? "對於 " : "For "}
          <Eq>{"x + y + z = 0"}</Eq>
          {zh
            ? "（一條方程式、三個未知數），有幾個自由變數？解集的維度是多少？"
            : " (one equation, three unknowns), how many free variables are there, and what is the dimension of the solution set?"}
        </>
      ),
      steps: [
        {
          content: zh ? (
            <>一個主元（例如 x），剩下 y 和 z 為自由 → 2 個自由變數。</>
          ) : (
            <>One pivot (say x), leaving y and z free → 2 free variables.</>
          ),
        },
        {
          content: (
            <>
              {zh
                ? "解集是一個通過原點的平面，維度 "
                : "The solution set is a plane through the origin, dimension "}
              <Eq>{"3 - 1 = 2"}</Eq>
              {zh ? "。" : "."}
            </>
          ),
        },
      ],
    },
    {
      id: "s6",
      title: zh ? "無限多解" : "Infinitely many solutions",
      prompt: (
        <>
          {zh ? "求解 " : "Solve "}
          <Eq>{"x + 2y = 3"}</Eq>、<Eq>{"2x + 4y = 6"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      hint: zh ? (
        <>這兩條方程式真的不同嗎？</>
      ) : (
        <>Are the two equations really different?</>
      ),
      steps: [
        {
          content: zh ? (
            <>第 2 列恰好是 2×（第 1 列），因此沒有新資訊。</>
          ) : (
            <>Row 2 is exactly 2×(row 1), so it adds no new information.</>
          ),
        },
        {
          content: (
            <>
              {zh ? "y 為自由；" : "y is free; "}
              <Eq>{"x = 3 - 2y"}</Eq>
              {zh
                ? "。沿一條直線有無限多解。"
                : ". Infinitely many solutions along a line."}
            </>
          ),
        },
      ],
    },
  ];
}

function subspaces(zh: boolean): Drill[] {
  return [
    {
      id: "u1",
      title: zh ? "秩–零度" : "Rank–nullity",
      prompt: (
        <>
          {zh ? "一個 " : "A "}
          <Eq>{"3\\times 4"}</Eq>
          {zh
            ? " 矩陣的秩為 2，它的零度是多少？"
            : " matrix has rank 2. What is its nullity?"}
        </>
      ),
      hint: (
        <>
          <Eq>{"\\text{rank} + \\text{nullity} = n"}</Eq>
          {zh ? "，即行的數目。" : ", the number of columns."}
        </>
      ),
      steps: [{ content: <Equation>{"\\text{nullity} = 4 - 2 = 2"}</Equation> }],
    },
    {
      id: "u2",
      title: zh ? "是否屬於某生成空間" : "Membership in a span",
      prompt: (
        <>
          <Eq>{"(2, 4)"}</Eq>
          {zh ? " 是否在 " : " — is it in "}
          <Eq>{"\\operatorname{span}\\{(1, 2)\\}"}</Eq>
          {zh ? " 中？" : "?"}
        </>
      ),
      steps: [
        { content: <Equation>{"(2, 4) = 2\\,(1, 2)"}</Equation> },
        {
          content: zh ? (
            <>是——它是一個純量倍數，因此落在同一條直線上。</>
          ) : (
            <>Yes — it is a scalar multiple, so it lies on the same line.</>
          ),
        },
      ],
    },
    {
      id: "u3",
      title: zh ? "線性獨立" : "Linear independence",
      prompt: (
        <>
          <Eq>{"(1, 0)"}</Eq>
          {zh ? " 與 " : " and "}
          <Eq>{"(1, 1)"}</Eq>
          {zh ? " 線性獨立嗎？" : " — are they linearly independent?"}
        </>
      ),
      hint: zh ? (
        <>兩個二維向量獨立，當且僅當它們所構成的行列式非零。</>
      ) : (
        <>Two 2D vectors are independent iff the determinant they form is nonzero.</>
      ),
      steps: [
        {
          content: (
            <Equation>
              {"\\det\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix} = 1 \\ne 0"}
            </Equation>
          ),
        },
        {
          content: zh ? (
            <>行列式非零 → 獨立（它們生成整個平面）。</>
          ) : (
            <>Nonzero determinant → independent (they span the whole plane).</>
          ),
        },
      ],
    },
    {
      id: "u4",
      title: zh ? "列向量的零空間" : "Null space of a row vector",
      prompt: (
        <>
          {zh ? "描述 " : "Describe the null space of "}
          <Eq>{"A = \\begin{bmatrix} 1 & 1 \\end{bmatrix}"}</Eq>
          {zh ? " 的零空間。" : "."}
        </>
      ),
      hint: (
        <>
          {zh ? "求解 " : "Solve "}
          <Eq>{"Ax = 0"}</Eq>
          {zh ? "，即 " : ", i.e. "}
          <Eq>{"x_1 + x_2 = 0"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        { content: <Equation>{"x_1 = -x_2"}</Equation> },
        {
          content: (
            <>
              {zh ? "零空間 " : "Null space "}
              <Eq>{"= \\operatorname{span}\\{(1, -1)\\}"}</Eq>
              {zh ? "，維度 1。" : ", dimension 1."}
            </>
          ),
        },
      ],
    },
    {
      id: "u5",
      title: zh ? "行空間與維度" : "Column space & dimension",
      prompt: (
        <>
          {zh ? "求 " : "What is the column space of "}
          <Eq>{"A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}"}</Eq>
          {zh ? " 的行空間及其維度。" : ", and its dimension?"}
        </>
      ),
      steps: [
        {
          content: zh ? (
            <>第 2 行 = 2 × 第 1 行，因此兩行落在同一條直線上。</>
          ) : (
            <>Column 2 = 2 × column 1, so both columns lie on one line.</>
          ),
        },
        {
          content: (
            <>
              {zh ? "行空間 " : "Column space "}
              <Eq>{"= \\operatorname{span}\\{(1, 2)\\}"}</Eq>
              {zh ? "，維度 1（＝秩）。" : ", dimension 1 (= rank)."}
            </>
          ),
        },
      ],
    },
  ];
}

function orthogonality(zh: boolean): Drill[] {
  return [
    {
      id: "o1",
      title: zh ? "將一對向量正規正交化" : "Orthonormalize a pair",
      prompt: (
        <>
          {zh ? "證明 " : "Show "}
          <Eq>{"(1, 1)"}</Eq>
          {zh ? " 與 " : " and "}
          <Eq>{"(1, -1)"}</Eq>
          {zh ? " 正交，然後將它們正規化。" : " are orthogonal, then normalize them."}
        </>
      ),
      steps: [
        {
          content: <Equation>{"(1,1)\\cdot(1,-1) = 1 - 1 = 0 \\ \\checkmark"}</Equation>,
        },
        {
          content: (
            <Equation>{"\\tfrac1{\\sqrt2}(1,1),\\quad \\tfrac1{\\sqrt2}(1,-1)"}</Equation>
          ),
        },
      ],
    },
    {
      id: "o2",
      title: zh ? "最小平方斜率" : "Least-squares slope",
      prompt: (
        <>
          {zh ? "以最小平方法把 " : "Fit "}
          <Eq>{"y = cx"}</Eq>
          {zh ? " 擬合通過 " : " through "}
          <Eq>{"(1,1), (2,2), (3,2)"}</Eq>
          {zh ? "。" : " by least squares."}
        </>
      ),
      hint: (
        <>
          {zh ? "對於通過原點的直線，" : "For a line through the origin, "}
          <Eq>{"c = \\dfrac{\\sum x_i y_i}{\\sum x_i^2}"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        { content: <Equation>{"\\textstyle\\sum x_i y_i = 1 + 4 + 6 = 11"}</Equation> },
        { content: <Equation>{"\\textstyle\\sum x_i^2 = 1 + 4 + 9 = 14"}</Equation> },
        { content: <Equation>{"c = \\tfrac{11}{14} \\approx 0.79"}</Equation> },
      ],
    },
    {
      id: "o3",
      title: zh ? "一步 Gram–Schmidt" : "One Gram–Schmidt step",
      prompt: (
        <>
          {zh ? "將 " : "Orthogonalize "}
          <Eq>{"v_2 = (1, 0)"}</Eq>
          {zh ? " 相對於 " : " against "}
          <Eq>{"v_1 = (1, 1)"}</Eq>
          {zh ? " 正交化。" : "."}
        </>
      ),
      hint: (
        <>
          {zh ? "減去投影：" : "Subtract the projection: "}
          <Eq>{"v_2 - \\dfrac{v_2\\cdot v_1}{v_1\\cdot v_1}v_1"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        {
          content: (
            <Equation>{"\\dfrac{v_2\\cdot v_1}{v_1\\cdot v_1} = \\dfrac{1}{2}"}</Equation>
          ),
        },
        {
          content: (
            <Equation>
              {
                "v_2 - \\tfrac12(1,1) = (1,0) - (\\tfrac12,\\tfrac12) = (\\tfrac12,\\ -\\tfrac12)"
              }
            </Equation>
          ),
        },
      ],
    },
    {
      id: "o4",
      title: zh ? "建立正規方程" : "Build the normal equations",
      prompt: (
        <>
          {zh ? "對於 " : "For "}
          <Eq>{"A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\\\ 1 & 3 \\end{bmatrix}"}</Eq>、
          <Eq>{"b = (1, 2, 2)"}</Eq>
          {zh ? "，建立並求解 " : ", form and solve "}
          <Eq>{"A^{\\mathsf T}A\\hat x = A^{\\mathsf T}b"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      hint: zh ? (
        <>這會擬合通過三點的最佳直線 y = a + m x。</>
      ) : (
        <>This fits the best line y = a + m x through the three points.</>
      ),
      steps: [
        {
          content: (
            <Equation>
              {
                "A^{\\mathsf T}A = \\begin{bmatrix} 3 & 6 \\\\ 6 & 14 \\end{bmatrix},\\quad A^{\\mathsf T}b = \\begin{bmatrix} 5 \\\\ 11 \\end{bmatrix}"
              }
            </Equation>
          ),
        },
        { content: <Equation>{"3a + 6m = 5,\\quad 6a + 14m = 11"}</Equation> },
        {
          content: (
            <Equation>
              {"m = 0.5,\\quad a = \\tfrac23 \\Rightarrow y = \\tfrac23 + \\tfrac12 x"}
            </Equation>
          ),
        },
      ],
    },
  ];
}

function eigen(zh: boolean): Drill[] {
  return [
    {
      id: "e1",
      title: zh ? "對角矩陣的特徵值" : "Eigenvalues of a diagonal matrix",
      prompt: (
        <>
          <Eq>{"A = \\begin{bmatrix} 2 & 0 \\\\ 0 & -3 \\end{bmatrix}"}</Eq>
          {zh ? " 的特徵值是多少？" : " — its eigenvalues?"}
        </>
      ),
      steps: [
        {
          content: zh ? (
            <>對角矩陣的特徵值就在對角線上。</>
          ) : (
            <>A diagonal matrix has its eigenvalues on the diagonal.</>
          ),
        },
        { content: <Equation>{"\\lambda = 2,\\ -3"}</Equation> },
      ],
    },
    {
      id: "e2",
      title: zh ? "特徵多項式（2×2）" : "Characteristic polynomial (2×2)",
      prompt: (
        <>
          {zh ? "求 " : "Find the eigenvalues of "}
          <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}"}</Eq>
          {zh ? " 的特徵值。" : "."}
        </>
      ),
      hint: (
        <>
          {zh ? "使用 " : "Use "}
          <Eq>{"\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        { content: <Equation>{"\\operatorname{tr}A = 4,\\quad \\det A = 3"}</Equation> },
        {
          content: (
            <Equation>
              {"\\lambda^2 - 4\\lambda + 3 = 0 \\Rightarrow (\\lambda-1)(\\lambda-3)=0"}
            </Equation>
          ),
        },
        { content: <Equation>{"\\lambda = 1,\\ 3"}</Equation> },
      ],
    },
    {
      id: "e3",
      title: zh ? "求一個特徵向量" : "Find an eigenvector",
      prompt: (
        <>
          {zh ? "求 " : "Find an eigenvector of "}
          <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}"}</Eq>
          {zh ? " 對應 " : " for "}
          <Eq>{"\\lambda = 3"}</Eq>
          {zh ? " 的一個特徵向量。" : "."}
        </>
      ),
      hint: (
        <>
          {zh ? "求解 " : "Solve "}
          <Eq>{"(A - 3I)v = 0"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        {
          content: (
            <Equation>
              {"A - 3I = \\begin{bmatrix} -1 & 1 \\\\ 1 & -1 \\end{bmatrix}"}
            </Equation>
          ),
        },
        { content: <Equation>{"-v_1 + v_2 = 0 \\Rightarrow v_1 = v_2"}</Equation> },
        { content: <Equation>{"v = (1,\\ 1)"}</Equation> },
      ],
    },
    {
      id: "e4",
      title: zh ? "三角矩陣的特徵值" : "Eigenvalues of a triangular matrix",
      prompt: (
        <>
          <Eq>{"A = \\begin{bmatrix} 4 & 7 \\\\ 0 & 5 \\end{bmatrix}"}</Eq>
          {zh ? " 的特徵值是多少？" : " — its eigenvalues?"}
        </>
      ),
      hint: zh ? (
        <>對三角矩陣，直接從對角線讀出。</>
      ) : (
        <>For a triangular matrix, read them straight off the diagonal.</>
      ),
      steps: [{ content: <Equation>{"\\lambda = 4,\\ 5"}</Equation> }],
    },
    {
      id: "e5",
      title: zh ? "驗證一個特徵向量" : "Verify an eigenvector",
      prompt: (
        <>
          <Eq>{"(1, 1)"}</Eq>
          {zh ? " 是 " : " — is it an eigenvector of "}
          <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}"}</Eq>
          {zh ? " 的特徵向量嗎？若是，求 " : "? If so, find "}
          <Eq>{"\\lambda"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        { content: <Equation>{"A\\,(1,1) = (2+1,\\ 1+2) = (3,\\ 3)"}</Equation> },
        {
          content: (
            <>
              <Eq>{"(3,3) = 3(1,1)"}</Eq>
              {zh ? "，所以是——特徵值 " : ", so yes — eigenvalue "}
              <Eq>{"\\lambda = 3"}</Eq>
              {zh ? "。" : "."}
            </>
          ),
        },
      ],
    },
    {
      id: "e6",
      title: zh ? "由跡與行列式還原矩陣" : "Recover a matrix from trace & det",
      prompt: zh ? (
        <>一個 2×2 矩陣的特徵值為 5 與 2。它的跡與行列式各是多少？</>
      ) : (
        <>A 2×2 matrix has eigenvalues 5 and 2. What are its trace and determinant?</>
      ),
      hint: zh ? (
        <>跡是特徵值之和；行列式是它們的乘積。</>
      ) : (
        <>Trace is the sum of eigenvalues; determinant is their product.</>
      ),
      steps: [
        { content: <Equation>{"\\operatorname{tr} = 5 + 2 = 7"}</Equation> },
        { content: <Equation>{"\\det = 5 \\cdot 2 = 10"}</Equation> },
      ],
    },
  ];
}

function svd(zh: boolean): Drill[] {
  return [
    {
      id: "sv1",
      title: zh ? "對角矩陣的奇異值" : "Singular values of a diagonal matrix",
      prompt: (
        <>
          <Eq>{"A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 2 \\end{bmatrix}"}</Eq>
          {zh ? " 的奇異值是多少？" : " — its singular values?"}
        </>
      ),
      steps: [
        {
          content: (
            <>
              <Eq>
                {"A^{\\mathsf T}A = \\begin{bmatrix} 9 & 0 \\\\ 0 & 4\\end{bmatrix}"}
              </Eq>
              {zh ? "，特徵值 9 與 4。" : ", eigenvalues 9 and 4."}
            </>
          ),
        },
        { content: <Equation>{"\\sigma_1 = 3,\\ \\sigma_2 = 2"}</Equation> },
      ],
    },
    {
      id: "sv2",
      title: zh ? "由 AᵀA 的特徵值求 σ" : "σ from eigenvalues of AᵀA",
      prompt: (
        <>
          {zh ? "若 " : "If "}
          <Eq>{"A^{\\mathsf T}A"}</Eq>
          {zh
            ? " 的特徵值為 16 與 9，則 "
            : " has eigenvalues 16 and 9, what are the singular values of "}
          <Eq>{"A"}</Eq>
          {zh ? " 的奇異值是多少？" : "?"}
        </>
      ),
      hint: (
        <>
          <Eq>{"\\sigma_i = \\sqrt{\\lambda_i(A^{\\mathsf T}A)}"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        { content: <Equation>{"\\sigma = \\sqrt{16},\\ \\sqrt9 = 4,\\ 3"}</Equation> },
      ],
    },
    {
      id: "sv3",
      title: zh ? "秩虧損矩陣的奇異值" : "Singular values of a rank-deficient matrix",
      prompt: (
        <>
          <Eq>{"A = \\begin{bmatrix} 0 & 2 \\\\ 0 & 0 \\end{bmatrix}"}</Eq>
          {zh ? " 的奇異值是多少？" : " — its singular values?"}
        </>
      ),
      steps: [
        {
          content: (
            <Equation>
              {"A^{\\mathsf T}A = \\begin{bmatrix} 0 & 0 \\\\ 0 & 4 \\end{bmatrix}"}
            </Equation>
          ),
        },
        {
          content: zh ? (
            <>特徵值 0 與 4，所以 σ = 2 與 0（秩 1）。</>
          ) : (
            <>Eigenvalues 0 and 4, so σ = 2 and 0 (rank 1).</>
          ),
        },
      ],
    },
    {
      id: "sv4",
      title: zh ? "最佳秩 1 近似的誤差" : "Best rank-1 approximation error",
      prompt: (
        <>
          {zh ? "某矩陣的奇異值為 " : "A matrix has singular values "}
          <Eq>{"\\sigma_1 = 5,\\ \\sigma_2 = 0.1"}</Eq>
          {zh
            ? "。最佳秩 1 近似的 Frobenius 誤差是多少？"
            : ". What is the Frobenius error of the best rank-1 approximation?"}
        </>
      ),
      hint: (
        <>
          {zh
            ? "Eckart–Young：捨去較小的奇異值會留下誤差 "
            : "Eckart–Young: dropping the smaller singular values leaves error "}
          <Eq>{"\\sqrt{\\sum_{i>1}\\sigma_i^2}"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        {
          content: (
            <>
              {zh ? "保留 " : "Keep "}
              <Eq>{"\\sigma_1 u_1 v_1^{\\mathsf T}"}</Eq>
              {zh ? "；捨去 " : "; drop "}
              <Eq>{"\\sigma_2"}</Eq>
              {zh ? "。" : "."}
            </>
          ),
        },
        { content: <Equation>{"\\text{error} = \\sigma_2 = 0.1"}</Equation> },
      ],
    },
    {
      id: "sv5",
      title: zh ? "旋轉矩陣的奇異值" : "Singular values of a rotation",
      prompt: zh ? (
        <>任何 2×2 旋轉矩陣的奇異值是多少？</>
      ) : (
        <>What are the singular values of any 2×2 rotation matrix?</>
      ),
      hint: zh ? <>旋轉會保持每個長度。</> : <>A rotation preserves every length.</>,
      steps: [
        {
          content: (
            <>
              <Eq>{"R^{\\mathsf T}R = I"}</Eq>
              {zh
                ? "，其特徵值全為 1，所以每個 "
                : ", whose eigenvalues are all 1, so every "}
              <Eq>{"\\sigma_i = 1"}</Eq>
              {zh ? "。" : "."}
            </>
          ),
        },
      ],
    },
  ];
}

function matrixCalculus(zh: boolean): Drill[] {
  return [
    {
      id: "mc1",
      title: zh ? "線性函數的梯度" : "Gradient of a linear function",
      prompt: (
        <>
          {zh ? "對於 " : "For "}
          <Eq>{"f(x) = a^{\\mathsf T}x"}</Eq>
          {zh ? "，其中 " : " with "}
          <Eq>{"a = (2, -1, 3)"}</Eq>
          {zh ? "，求 " : ", find "}
          <Eq>{"\\nabla_x f"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      hint: zh ? (
        <>
          把 <Eq>{"a^{\\mathsf T}x = \\sum_i a_i x_i"}</Eq> 展開，再對每個{" "}
          <Eq>{"x_i"}</Eq> 偏微分。
        </>
      ) : (
        <>
          Expand <Eq>{"a^{\\mathsf T}x = \\sum_i a_i x_i"}</Eq>, then differentiate with
          respect to each <Eq>{"x_i"}</Eq>.
        </>
      ),
      steps: [
        {
          content: (
            <Equation>{"\\frac{\\partial}{\\partial x_i}\\sum_j a_j x_j = a_i"}</Equation>
          ),
        },
        {
          content: (
            <>
              {zh ? "把各分量疊起來：" : "Stacking the components: "}
              <Eq>{"\\nabla_x f = a = (2, -1, 3)"}</Eq>
              {zh ? "。" : "."}
            </>
          ),
        },
      ],
    },
    {
      id: "mc2",
      title: zh ? "平方範數的梯度" : "Gradient of a squared norm",
      prompt: (
        <>
          {zh ? "求 " : "Find "}
          <Eq>{"\\nabla_x \\|x\\|^2"}</Eq>
          {zh ? "，並在 " : ", then evaluate it at "}
          <Eq>{"x = (1, -2)"}</Eq>
          {zh ? " 處求值。" : "."}
        </>
      ),
      hint: (
        <>
          <Eq>{"\\|x\\|^2 = x^{\\mathsf T}x = \\sum_i x_i^2"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        {
          content: (
            <Equation>
              {
                "\\frac{\\partial}{\\partial x_i}\\sum_j x_j^2 = 2x_i \\;\\Rightarrow\\; \\nabla_x\\|x\\|^2 = 2x"
              }
            </Equation>
          ),
        },
        {
          content: (
            <>
              {zh ? "在 " : "At "}
              <Eq>{"x = (1, -2)"}</Eq>
              {zh ? "：" : ": "}
              <Eq>{"\\nabla = (2, -4)"}</Eq>
              {zh ? "。" : "."}
            </>
          ),
        },
      ],
    },
    {
      id: "mc3",
      title: zh ? "二次型的梯度" : "Gradient of a quadratic form",
      prompt: (
        <>
          {zh ? "設 " : "Let "}
          <Eq>{"A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}"}</Eq>
          {zh ? "（對稱）。求 " : " (symmetric). Find "}
          <Eq>{"\\nabla_x\\,(x^{\\mathsf T}Ax)"}</Eq>
          {zh ? " 在 " : " at "}
          <Eq>{"x = (1, 1)"}</Eq>
          {zh ? " 的值。" : "."}
        </>
      ),
      hint: (
        <>
          {zh ? "對稱時 " : "For symmetric A, "}
          <Eq>{"\\nabla_x(x^{\\mathsf T}Ax) = 2Ax"}</Eq>
          {zh ? "。" : "."}
        </>
      ),
      steps: [
        {
          content: (
            <>
              <Eq>{"Ax = (2\\cdot1 + 1\\cdot1,\\; 1\\cdot1 + 3\\cdot1) = (3, 4)"}</Eq>
              {zh ? "。" : "."}
            </>
          ),
        },
        { content: <Equation>{"\\nabla = 2Ax = (6, 8)"}</Equation> },
      ],
    },
    {
      id: "mc4",
      title: zh ? "最小平方損失的梯度" : "Gradient of a least-squares loss",
      prompt: (
        <>
          {zh ? "求 " : "Differentiate "}
          <Eq>{"L(x) = \\tfrac12\\|Ax - b\\|^2"}</Eq>
          {zh
            ? " 對 x 的梯度，並說明令其為零會得到什麼。"
            : " with respect to x, and say what setting it to zero gives."}
        </>
      ),
      hint: zh ? (
        <>
          令 <Eq>{"r = Ax - b"}</Eq>，用連鎖律：內層{" "}
          <Eq>{"\\partial r/\\partial x = A"}</Eq>。
        </>
      ) : (
        <>
          Let <Eq>{"r = Ax - b"}</Eq> and use the chain rule; the inner Jacobian is{" "}
          <Eq>{"\\partial r/\\partial x = A"}</Eq>.
        </>
      ),
      steps: [
        {
          content: (
            <Equation>
              {
                "\\nabla_x \\tfrac12 r^{\\mathsf T}r = A^{\\mathsf T}r = A^{\\mathsf T}(Ax - b)"
              }
            </Equation>
          ),
        },
        {
          content: (
            <>
              {zh ? "令梯度為零：" : "Set the gradient to zero: "}
              <Eq>{"A^{\\mathsf T}Ax = A^{\\mathsf T}b"}</Eq>
              {zh ? "——正規方程。" : " — the normal equations."}
            </>
          ),
        },
      ],
    },
    {
      id: "mc5",
      title: zh ? "仿射映射的 Jacobian" : "Jacobian of an affine map",
      prompt: (
        <>
          {zh ? "對於 " : "For "}
          <Eq>{"y = Wx + b"}</Eq>
          {zh ? "，其中 " : " with "}
          <Eq>{"W \\in \\mathbb{R}^{m\\times n}"}</Eq>
          {zh ? "，Jacobian " : ", what is the Jacobian "}
          <Eq>{"\\partial y/\\partial x"}</Eq>
          {zh ? " 是什麼？" : "?"}
        </>
      ),
      hint: zh ? (
        <>
          第 i 個輸出是 <Eq>{"y_i = \\sum_j W_{ij}x_j + b_i"}</Eq>。
        </>
      ) : (
        <>
          The i-th output is <Eq>{"y_i = \\sum_j W_{ij}x_j + b_i"}</Eq>.
        </>
      ),
      steps: [
        {
          content: <Equation>{"\\frac{\\partial y_i}{\\partial x_j} = W_{ij}"}</Equation>,
        },
        {
          content: (
            <>
              {zh ? "整個 Jacobian 就是 " : "So the whole Jacobian is just "}
              <Eq>{"\\partial y/\\partial x = W"}</Eq>
              {zh
                ? "（偏差 b 不影響）。這正是反向傳播中一個稠密層所回傳的因子。"
                : " (the bias b drops out). This is exactly the factor a dense layer passes back during backprop."}
            </>
          ),
        },
      ],
    },
  ];
}

/** Return the localized drill topic bank. */
export function drillTopics(lang: Lang): DrillTopic[] {
  const zh = lang === "zh";
  return [
    { label: zh ? "向量" : "Vectors", drills: vectors(zh) },
    { label: zh ? "矩陣" : "Matrices", drills: matrices(zh) },
    { label: zh ? "線性方程組" : "Linear Systems", drills: systems(zh) },
    { label: zh ? "子空間" : "Subspaces", drills: subspaces(zh) },
    { label: zh ? "正交性" : "Orthogonality", drills: orthogonality(zh) },
    { label: zh ? "特徵值" : "Eigenvalues", drills: eigen(zh) },
    { label: "SVD", drills: svd(zh) },
    { label: zh ? "矩陣微積分" : "Matrix Calculus", drills: matrixCalculus(zh) },
  ];
}
