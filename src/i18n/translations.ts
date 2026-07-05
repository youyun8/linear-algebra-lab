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
