/**
 * Internationalisation dictionary. English (`en`) is the source language;
 * Traditional Chinese (`zh`) mirrors every key. Lesson metadata lives in
 * `lessons.ts`; here we only store the Traditional Chinese overrides and fall
 * back to the English source otherwise.
 */
import { LESSONS, type LessonMeta } from "../lessons";

export type Lang = "en" | "zh";

export const LANGUAGES: { value: Lang; label: string; native: string }[] = [
  { value: "en", label: "English", native: "English" },
  { value: "zh", label: "Traditional Chinese", native: "繁體中文" },
];

type Dict = Record<string, string>;

/** Flat UI strings, keyed by dotted path. Interpolate with {name} placeholders. */
const EN: Dict = {
  "brand.name": "Linear Algebra Lab",
  "brand.tagline": "Linear Algebra × Machine Learning",

  "nav.settings": "Settings",
  "nav.toggleMenu": "Toggle menu",

  "theme.system": "System",
  "theme.light": "Light",
  "theme.dark": "Dark",

  "group.Foundations": "Foundations",
  "group.Core Theory": "Core Theory",
  "group.Decompositions": "Decompositions",
  "group.Applications": "Applications",
  "group.Practice": "Practice",

  "page.section": "Section {num}",
  "page.sectionGroup": "Section {num} · {group}",
  "page.prev": "← Previous",
  "page.next": "Next →",

  "settings.title": "Settings",
  "settings.subtitle":
    "Adjust the site's appearance and reading preferences. These settings are saved in this browser.",
  "settings.close": "Close",
  "settings.currentlyShowing": "Currently showing: {value}",
  "settings.loading": "loading",

  "settings.language.eyebrow": "General",
  "settings.language.title": "Language",
  "settings.language.description":
    "Choose the display language for the site's interface.",

  "settings.theme.eyebrow": "Appearance",
  "settings.theme.title": "Theme",
  "settings.theme.description":
    "Choose the site's color mode. System follows your browser or OS preference automatically.",
  "settings.theme.system.desc": "Match your operating system's current appearance.",
  "settings.theme.light.desc": "Always use the light interface.",
  "settings.theme.dark.desc": "Always use the dark interface.",

  "settings.width.eyebrow": "Appearance",
  "settings.width.title": "Content width",
  "settings.width.description":
    "Choose the maximum width of the main content area; wider fits more on large screens.",
  "settings.width.standard.label": "Standard",
  "settings.width.standard.desc":
    "A focused reading width, ideal for reading chapter by chapter.",
  "settings.width.wide.label": "Wide",
  "settings.width.wide.desc":
    "Relaxes the content width, good for tables and large screens.",
  "settings.width.full.label": "Full",
  "settings.width.full.desc":
    "Fills the window width, removing side margins on ultrawide screens.",

  "settings.text.eyebrow": "Appearance",
  "settings.text.title": "Text size",
  "settings.text.description":
    "Scale the text across the whole site, including navigation and lesson content.",
  "settings.text.small.label": "Small",
  "settings.text.small.desc":
    "Higher information density for quick scanning on big screens.",
  "settings.text.standard.label": "Standard",
  "settings.text.standard.desc": "Use the default text size.",
  "settings.text.large.label": "Large",
  "settings.text.large.desc": "Enlarge text for comfortable, long reading sessions.",

  "home.pill": "Linear Algebra × Machine Learning",
  "home.h1": "Linear Algebra Lab",
  "home.lede":
    "Start from zero. Build real intuition for vectors, matrices, eigenvalues, and SVD — then see exactly how they power PCA, embeddings, attention, transformers, and LoRA. Visual first, formulas second, and lots of worked examples.",
  "home.cta.start": "Start here →",
  "home.cta.svd": "Jump to the SVD calculator",
  "home.able.title": "What you'll be able to do",
  "home.able.1": "Read and manipulate vectors and matrices without fear.",
  "home.able.2": "Compute a 2×2 SVD by hand, step by step.",
  "home.able.3":
    "Explain PCA, embeddings, attention, low-rank approximation, and LoRA using the math you learned.",
  "home.course.title": "The course",
  "home.structure.title": "How each lesson is structured",
  "home.structure.intro":
    "Every topic follows the same rhythm, so you always know where you are:",
  "home.rhythm.intuition.k": "Intuition",
  "home.rhythm.intuition.v": "a picture or story before any symbols.",
  "home.rhythm.definition.k": "Definition",
  "home.rhythm.definition.v": "the precise statement.",
  "home.rhythm.example.k": "Small example",
  "home.rhythm.example.v": "concrete numbers.",
  "home.rhythm.manual.k": "Manual calculation",
  "home.rhythm.manual.v": "do it by hand, with hints.",
  "home.rhythm.demo.k": "Interactive demo",
  "home.rhythm.demo.v": "play with it.",
  "home.rhythm.ml.k": "ML connection",
  "home.rhythm.ml.v": "why it matters for modern AI.",
  "home.rhythm.practice.k": "Practice questions",
  "home.rhythm.practice.v": "check yourself.",

  // Shared component chrome
  "concept.definition": "Definition",
  "concept.intuition": "Intuition",
  "concept.example": "Small Example",
  "concept.mistake": "Common Mistake",

  "callout.ml": "ML Connection",
  "callout.reviewed": "Last reviewed: {date}",

  "hint.show": "Show hint",

  "steps.title": "Step-by-step solution",
  "steps.back": "← Back",
  "steps.revealFirst": "Reveal first step",
  "steps.next": "Next step →",
  "steps.showAll": "Show all",
  "steps.step": "Step {num}",

  "quiz.tryAgain": "Try again",
  "quiz.scoreLine": "You answered {score} of {total} correctly.",
  "quiz.progress": "Question {current} of {total} · Score {score}",
  "quiz.correct": "✓ Correct. ",
  "quiz.incorrect": "✗ Not quite. ",
  "quiz.seeResults": "See results",
  "quiz.nextQuestion": "Next question →",

  "flash.clickToFlip": "click to flip",
  "flash.prev": "← Prev",
  "flash.next": "Next →",

  // Interactive: matrix calculator
  "mtx.matrixA": "Matrix A",
  "mtx.matrixB": "Matrix B",
  "mtx.result": "Result",
  "calc.op.multiply": "A × B",
  "calc.op.transposeA": "Aᵀ",
  "calc.op.detA": "det(A)",
  "calc.caption":
    "A is {r}×{c}. Try making a row of A a multiple of another and watch det(A) drop to 0 — that means A collapses the plane onto a line.",

  // Interactive: SVD calculator
  "svd.preset.textbook": "Textbook",
  "svd.preset.diagonal": "Diagonal",
  "svd.preset.shear": "Shear",
  "svd.preset.rank1": "Rank 1",
  "svd.stepHeader": "SVD, step by step",
  "svd.step1": "Step 1 — Form AᵀA",
  "svd.step1.note": "AᵀA is symmetric, so it has real, non-negative eigenvalues.",
  "svd.step2": "Step 2 — Eigenvalues of AᵀA",
  "svd.step2.note": "Solved from det(AᵀA − λI) = 0. Trace = {trace}, det = {det}.",
  "svd.step3": "Step 3 — Singular values σ = √λ",
  "svd.step4": "Step 4 — Right singular vectors V (eigenvectors of AᵀA)",
  "svd.step5": "Step 5 — Left singular vectors U (uᵢ = Avᵢ / σᵢ)",
  "svd.step6": "Step 6 — Assemble Σ",
  "svd.step7": "Step 7 — Reconstruct A = U Σ Vᵀ",
  "svd.step7.note":
    "Small rounding may appear in the last digits; the decomposition is exact in theory.",

  // Interactive: transform visualizer
  "tf.preset.identity": "Identity",
  "tf.preset.scale2": "Scale 2×",
  "tf.preset.rotate90": "Rotate 90°",
  "tf.preset.shear": "Shear",
  "tf.preset.reflectX": "Reflect x",
  "tf.preset.collapse": "Collapse",
  "tf.transformA": "Transformation A",
  "tf.apply": "Apply",
  "tf.det.zero": "det = 0 → the whole plane is squashed onto a line (or point).",
  "tf.det.negative": "det < 0 → orientation is flipped (like a mirror).",
  "tf.det.positive": "det > 0 → orientation preserved; |det| is the area scaling.",
  "tf.caption":
    'The columns of A are exactly where î and ĵ land. Slide "Apply" to animate the transformation.',

  // Interactive: Gaussian demo
  "gauss.preset.unique": "Unique solution",
  "gauss.preset.infinite": "Infinitely many",
  "gauss.preset.none": "No solution",
  "gauss.preset.3x3": "3×3 system",
  "gauss.augmented": "Augmented matrix [A | b]",
  "gauss.header": "Row reduction — step {step} of {total}",
  "gauss.readout": "rank(A|b) = {rank}   pivots in columns: {cols}",
  "gauss.none": "none",
  "gauss.op.start": "Starting matrix.",
  "gauss.op.swap": "Swap R{a} ↔ R{b} to bring a nonzero pivot to the top.",
  "gauss.op.scale": "Scale R{row} by 1/{factor} so the pivot in column {col} is 1.",
  "gauss.op.eliminate": "R{r} → R{r} − ({factor})·R{pivot} to clear column {col}.",
  "gauss.op.rref": "Reduced row echelon form (RREF) reached.",

  // Interactive: eigen visualizer
  "eigenviz.angle": "Angle",
  "eigenviz.complex":
    "This matrix has complex eigenvalues (it rotates every vector) — no real eigenvector line exists.",
  "eigenviz.real":
    "Real eigenvalues: {values}\nDashed orange lines = eigenvector directions.\nWhen v lines up with a dashed line, Av points the same way (scaled by λ).",

  // Interactive: vector canvas
  "vec.caption":
    "Drag the dots. Notice a · b = 0 exactly when the arrows are perpendicular, and cos θ = 1 when they point the same way.",

  // Interactive: diagonalization vs SVD explorer
  "dvs.preset.sympsd": "Symmetric PSD",
  "dvs.preset.symind": "Symmetric (λ<0)",
  "dvs.preset.nonsym": "Non-symmetric",
  "dvs.preset.defective": "Defective (shear)",
  "dvs.preset.rotation": "Rotation",
  "dvs.legend.v": "V — right singular vectors (orthogonal)",
  "dvs.legend.eig": "Eigenvector directions (P)",
  "dvs.legend.eigNone": "No real eigenvectors (complex λ)",
  "dvs.legend.ellipse": "A · (unit circle) = output ellipse",
  "dvs.status.symmetric":
    "A is symmetric: eigenvectors are orthogonal, so the eigen-axes and the singular axes line up. This is where diagonalization and SVD coincide.",
  "dvs.status.nonsym":
    "A is not symmetric: the eigenvectors (orange, oblique) differ from the orthogonal singular vectors (blue). Two different pictures of the same map.",
  "dvs.status.defective":
    "A is defective — not enough independent eigenvectors, so there is no PDP⁻¹. But the SVD still exists.",
  "dvs.status.complex":
    "A has complex eigenvalues (it rotates), so there are no real eigen-axes. The SVD is still perfectly real.",
  "dvs.col.diag": "Diagonalization  A = P D P⁻¹",
  "dvs.col.svd": "SVD  A = U Σ Vᵀ",
  "dvs.diag.complexNote":
    "Complex eigenvalues → no real diagonalization. Compare with the always-real SVD on the right.",
  "dvs.diag.defectiveNote":
    "Defective matrix → P is not invertible, so A ≠ PDP⁻¹. The SVD on the right still works.",
  "dvs.diag.orthoNote": "P has orthonormal columns (symmetric A), so P⁻¹ = Pᵀ.",
  "dvs.diag.obliqueNote":
    "P is not orthogonal here, so P⁻¹ ≠ Pᵀ — the eigen-axes are oblique.",
  "dvs.svd.sigmaNote": "Singular values σ₁ = {s1}, σ₂ = {s2} (always real and ≥ 0).",

  // Practice topic labels
  "topic.vectors": "Vectors",
  "topic.matrices": "Matrices",
  "topic.systems": "Linear Systems",
  "topic.subspaces": "Subspaces",
  "topic.orthogonality": "Orthogonality",
  "topic.eigen": "Eigenvalues",
  "topic.svd": "SVD",
  "topic.diagVsSvd": "Diag vs SVD",
  "topic.matrixCalculus": "Matrix Calculus",
  "topic.ml": "ML",
};

const ZH: Dict = {
  "brand.name": "線性代數實驗室",
  "brand.tagline": "線性代數 × 機器學習",

  "nav.settings": "設定",
  "nav.toggleMenu": "切換選單",

  "theme.system": "系統",
  "theme.light": "淺色",
  "theme.dark": "深色",

  "group.Foundations": "基礎",
  "group.Core Theory": "核心理論",
  "group.Decompositions": "矩陣分解",
  "group.Applications": "應用",
  "group.Practice": "練習",

  "page.section": "第 {num} 節",
  "page.sectionGroup": "第 {num} 節 · {group}",
  "page.prev": "← 上一節",
  "page.next": "下一節 →",

  "settings.title": "設定",
  "settings.subtitle": "調整網站外觀與閱讀偏好。這些設定會保存在目前瀏覽器。",
  "settings.close": "關閉",
  "settings.currentlyShowing": "目前實際顯示：{value}",
  "settings.loading": "讀取中",

  "settings.language.eyebrow": "一般",
  "settings.language.title": "語言",
  "settings.language.description": "選擇網站介面的顯示語言。",

  "settings.theme.eyebrow": "外觀",
  "settings.theme.title": "主題",
  "settings.theme.description":
    "選擇網站的色彩模式。系統模式會依照瀏覽器或作業系統偏好自動切換。",
  "settings.theme.system.desc": "使用作業系統目前的外觀設定。",
  "settings.theme.light.desc": "固定使用淺色介面。",
  "settings.theme.dark.desc": "固定使用深色介面。",

  "settings.width.eyebrow": "外觀",
  "settings.width.title": "內容寬度",
  "settings.width.description": "選擇主要內容區的最大寬度；寬版會讓大螢幕顯示更多內容。",
  "settings.width.standard.label": "標準",
  "settings.width.standard.desc": "維持較集中的閱讀寬度，適合逐章閱讀。",
  "settings.width.wide.label": "寬",
  "settings.width.wide.desc": "放寬內容寬度，適合表格與大螢幕。",
  "settings.width.full.label": "全幅",
  "settings.width.full.desc": "內容填滿視窗寬度，消除兩側空白，適合超寬螢幕。",

  "settings.text.eyebrow": "外觀",
  "settings.text.title": "文字大小",
  "settings.text.description": "調整整個網站的文字比例，包含導覽與章節內容。",
  "settings.text.small.label": "小",
  "settings.text.small.desc": "提高資訊密度，適合大螢幕快速掃讀。",
  "settings.text.standard.label": "標準",
  "settings.text.standard.desc": "使用預設文字大小。",
  "settings.text.large.label": "大",
  "settings.text.large.desc": "放大文字，適合長時間閱讀。",

  "home.pill": "線性代數 × 機器學習",
  "home.h1": "線性代數實驗室",
  "home.lede":
    "從零開始。為向量、矩陣、特徵值與 SVD 建立真正的直覺——接著看清它們如何驅動 PCA、嵌入、注意力、Transformer 與 LoRA。先看圖、再看公式，並搭配大量範例。",
  "home.cta.start": "從這裡開始 →",
  "home.cta.svd": "前往 SVD 計算器",
  "home.able.title": "你將能夠",
  "home.able.1": "毫不畏懼地讀取與操作向量和矩陣。",
  "home.able.2": "一步步手算 2×2 的 SVD。",
  "home.able.3": "運用學到的數學解釋 PCA、嵌入、注意力、低秩近似與 LoRA。",
  "home.course.title": "課程內容",
  "home.structure.title": "每節課的結構",
  "home.structure.intro": "每個主題都遵循相同的節奏，讓你隨時知道自己的進度：",
  "home.rhythm.intuition.k": "直覺",
  "home.rhythm.intuition.v": "在任何符號之前，先給一張圖或一個故事。",
  "home.rhythm.definition.k": "定義",
  "home.rhythm.definition.v": "精確的陳述。",
  "home.rhythm.example.k": "小範例",
  "home.rhythm.example.v": "具體的數字。",
  "home.rhythm.manual.k": "手算",
  "home.rhythm.manual.v": "親手計算，附提示。",
  "home.rhythm.demo.k": "互動示範",
  "home.rhythm.demo.v": "動手玩玩看。",
  "home.rhythm.ml.k": "機器學習連結",
  "home.rhythm.ml.v": "為何它對現代 AI 很重要。",
  "home.rhythm.practice.k": "練習題",
  "home.rhythm.practice.v": "檢驗自己。",

  // Shared component chrome
  "concept.definition": "定義",
  "concept.intuition": "直覺",
  "concept.example": "小範例",
  "concept.mistake": "常見錯誤",

  "callout.ml": "機器學習連結",
  "callout.reviewed": "最後審閱：{date}",

  "hint.show": "顯示提示",

  "steps.title": "逐步解答",
  "steps.back": "← 上一步",
  "steps.revealFirst": "顯示第一步",
  "steps.next": "下一步 →",
  "steps.showAll": "全部顯示",
  "steps.step": "第 {num} 步",

  "quiz.tryAgain": "再試一次",
  "quiz.scoreLine": "你答對了 {total} 題中的 {score} 題。",
  "quiz.progress": "第 {current} / {total} 題 · 得分 {score}",
  "quiz.correct": "✓ 正確。",
  "quiz.incorrect": "✗ 不太對。",
  "quiz.seeResults": "查看結果",
  "quiz.nextQuestion": "下一題 →",

  "flash.clickToFlip": "點擊翻面",
  "flash.prev": "← 上一張",
  "flash.next": "下一張 →",

  // Interactive: matrix calculator
  "mtx.matrixA": "矩陣 A",
  "mtx.matrixB": "矩陣 B",
  "mtx.result": "結果",
  "calc.op.multiply": "A × B",
  "calc.op.transposeA": "Aᵀ",
  "calc.op.detA": "det(A)",
  "calc.caption":
    "A 是 {r}×{c}。試著把 A 的某一列變成另一列的倍數，觀察 det(A) 掉到 0——這表示 A 把整個平面壓縮到一條線上。",

  // Interactive: SVD calculator
  "svd.preset.textbook": "教科書",
  "svd.preset.diagonal": "對角",
  "svd.preset.shear": "剪切",
  "svd.preset.rank1": "秩 1",
  "svd.stepHeader": "SVD 逐步計算",
  "svd.step1": "步驟 1 — 形成 AᵀA",
  "svd.step1.note": "AᵀA 是對稱矩陣，因此具有實數、非負的特徵值。",
  "svd.step2": "步驟 2 — AᵀA 的特徵值",
  "svd.step2.note": "由 det(AᵀA − λI) = 0 求解。跡 = {trace}，行列式 = {det}。",
  "svd.step3": "步驟 3 — 奇異值 σ = √λ",
  "svd.step4": "步驟 4 — 右奇異向量 V（AᵀA 的特徵向量）",
  "svd.step5": "步驟 5 — 左奇異向量 U（uᵢ = Avᵢ / σᵢ）",
  "svd.step6": "步驟 6 — 組合 Σ",
  "svd.step7": "步驟 7 — 重建 A = U Σ Vᵀ",
  "svd.step7.note": "最後幾位數字可能出現微小的捨入誤差；理論上此分解是精確的。",

  // Interactive: transform visualizer
  "tf.preset.identity": "單位",
  "tf.preset.scale2": "縮放 2×",
  "tf.preset.rotate90": "旋轉 90°",
  "tf.preset.shear": "剪切",
  "tf.preset.reflectX": "沿 x 反射",
  "tf.preset.collapse": "壓縮",
  "tf.transformA": "變換 A",
  "tf.apply": "套用",
  "tf.det.zero": "det = 0 → 整個平面被壓縮到一條線（或一個點）。",
  "tf.det.negative": "det < 0 → 方向被翻轉（像鏡像）。",
  "tf.det.positive": "det > 0 → 方向保持不變；|det| 是面積縮放倍率。",
  "tf.caption": "A 的各行正是 î 與 ĵ 落點的位置。拖動「套用」以動畫呈現此變換。",

  // Interactive: Gaussian demo
  "gauss.preset.unique": "唯一解",
  "gauss.preset.infinite": "無限多解",
  "gauss.preset.none": "無解",
  "gauss.preset.3x3": "3×3 方程組",
  "gauss.augmented": "增廣矩陣 [A | b]",
  "gauss.header": "列化簡 — 第 {step} 步，共 {total} 步",
  "gauss.readout": "rank(A|b) = {rank}   主元所在行：{cols}",
  "gauss.none": "無",
  "gauss.op.start": "初始矩陣。",
  "gauss.op.swap": "交換 R{a} ↔ R{b}，將非零主元移到最上方。",
  "gauss.op.scale": "將 R{row} 乘以 1/{factor}，使第 {col} 行的主元變為 1。",
  "gauss.op.eliminate": "R{r} → R{r} − ({factor})·R{pivot}，以消去第 {col} 行。",
  "gauss.op.rref": "已達到最簡列梯形式（RREF）。",

  // Interactive: eigen visualizer
  "eigenviz.angle": "角度",
  "eigenviz.complex":
    "此矩陣具有複數特徵值（它會旋轉每個向量）——不存在實數特徵向量方向線。",
  "eigenviz.real":
    "實數特徵值：{values}\n橙色虛線＝特徵向量方向。\n當 v 對齊虛線時，Av 指向相同方向（依 λ 縮放）。",

  // Interactive: vector canvas
  "vec.caption": "拖動圓點。注意當兩箭頭垂直時 a · b = 0，當它們指向同方向時 cos θ = 1。",

  // Interactive: diagonalization vs SVD explorer
  "dvs.preset.sympsd": "對稱半正定",
  "dvs.preset.symind": "對稱（λ<0）",
  "dvs.preset.nonsym": "非對稱",
  "dvs.preset.defective": "虧損（剪切）",
  "dvs.preset.rotation": "旋轉",
  "dvs.legend.v": "V — 右奇異向量（正交）",
  "dvs.legend.eig": "特徵向量方向（P）",
  "dvs.legend.eigNone": "無實數特徵向量（複數 λ）",
  "dvs.legend.ellipse": "A ·（單位圓）＝輸出橢圓",
  "dvs.status.symmetric":
    "A 是對稱的：特徵向量彼此正交，因此特徵軸與奇異軸重合。這正是對角化與 SVD 一致之處。",
  "dvs.status.nonsym":
    "A 非對稱：特徵向量（橙色、斜交）與正交的奇異向量（藍色）不同。同一個映射的兩種視角。",
  "dvs.status.defective":
    "A 是虧損矩陣——獨立特徵向量不足，因此沒有 PDP⁻¹。但 SVD 仍然存在。",
  "dvs.status.complex":
    "A 具有複數特徵值（它會旋轉），因此沒有實數特徵軸。但 SVD 依然是完全實數的。",
  "dvs.col.diag": "對角化  A = P D P⁻¹",
  "dvs.col.svd": "SVD  A = U Σ Vᵀ",
  "dvs.diag.complexNote": "複數特徵值 → 無實數對角化。可與右側恆為實數的 SVD 對照。",
  "dvs.diag.defectiveNote": "虧損矩陣 → P 不可逆，故 A ≠ PDP⁻¹。右側的 SVD 仍然有效。",
  "dvs.diag.orthoNote": "P 的各行正規正交（對稱 A），故 P⁻¹ = Pᵀ。",
  "dvs.diag.obliqueNote": "此處 P 不正交，故 P⁻¹ ≠ Pᵀ——特徵軸是斜交的。",
  "dvs.svd.sigmaNote": "奇異值 σ₁ = {s1}，σ₂ = {s2}（恆為實數且 ≥ 0）。",

  // Practice topic labels
  "topic.vectors": "向量",
  "topic.matrices": "矩陣",
  "topic.systems": "線性方程組",
  "topic.subspaces": "子空間",
  "topic.orthogonality": "正交性",
  "topic.eigen": "特徵值",
  "topic.svd": "SVD",
  "topic.diagVsSvd": "對角化 vs SVD",
  "topic.matrixCalculus": "矩陣微積分",
  "topic.ml": "機器學習",
};

export const TRANSLATIONS: Record<Lang, Dict> = { en: EN, zh: ZH };

/** Traditional Chinese overrides for lesson metadata, keyed by slug. */
const LESSON_ZH: Record<string, { title: string; short: string; description: string }> = {
  "start-here": {
    title: "從這裡開始",
    short: "從這裡開始",
    description: "為什麼線性代數對機器學習很重要、學習路線圖，以及診斷測驗。",
  },
  vectors: {
    title: "向量",
    short: "向量",
    description: "座標、長度、方向、內積、餘弦相似度、投影。",
  },
  matrices: {
    title: "矩陣",
    short: "矩陣",
    description: "矩陣作為資料與線性變換；矩陣乘法。",
  },
  systems: {
    title: "線性方程組",
    short: "線性方程組",
    description: "高斯消去法、列化簡、秩、主元與自由變數。",
  },
  subspaces: {
    title: "子空間",
    short: "子空間",
    description: "生成、基底、維度、四個基本子空間、秩–零度定理。",
  },
  orthogonality: {
    title: "正交性",
    short: "正交性",
    description: "正交向量、投影、最小平方法、Gram–Schmidt。",
  },
  eigen: {
    title: "特徵值與特徵向量",
    short: "特徵值",
    description: "幾何直覺、特徵多項式、對角化、PCA。",
  },
  svd: {
    title: "奇異值分解",
    short: "SVD",
    description: "從零開始的 SVD、手算 2×2、低秩近似、LoRA。",
  },
  "diag-vs-svd": {
    title: "對角化 vs. SVD",
    short: "對角化 vs SVD",
    description: "矩陣自然軸的兩種分解：何時不同、何時一致，以及譜定理這座橋樑。",
  },
  "matrix-calculus": {
    title: "矩陣與向量微積分",
    short: "矩陣微積分",
    description: "梯度、Jacobian 與 Hessian；驅動梯度下降與反向傳播的求導公式。",
  },
  ml: {
    title: "現代機器學習中的線性代數",
    short: "機器學習應用",
    description: "嵌入、注意力、Transformer、正規化、梯度下降、GEMM。",
  },
  practice: {
    title: "練習實驗室",
    short: "練習實驗室",
    description: "測驗、字卡與計算練習，附詳解。",
  },
  cheatsheets: {
    title: "速查表",
    short: "速查表",
    description: "向量、矩陣、投影、特徵值、SVD 的一頁摘要。",
  },
};

/** Return lesson metadata localized to the given language. */
export function localizeLesson(meta: LessonMeta, lang: Lang): LessonMeta {
  if (lang === "zh" && LESSON_ZH[meta.slug]) {
    return { ...meta, ...LESSON_ZH[meta.slug] };
  }
  return meta;
}

/** Return all lessons localized to the given language, preserving order. */
export function localizedLessons(lang: Lang): LessonMeta[] {
  return LESSONS.map((l) => localizeLesson(l, lang));
}
