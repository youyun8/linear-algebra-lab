# Contributing to Linear Algebra Lab

Thanks for helping make linear algebra click for beginners! This guide explains how
to add lessons, demos, and practice questions. The goal is consistency: every
lesson should feel like it belongs to the same book.

## Ground rules for content

- **Intuition before formalism.** Lead with a picture or story, then define.
- **Use concrete numbers.** Show intermediate steps; don't skip arithmetic.
- **Name common mistakes.** A `ConceptCard tone="mistake"` per lesson is ideal.
- **Connect to ML.** Every major topic ends with an `MLCallout`.
- **No hype.** For fast-moving ML topics, add a `reviewed` date and keep the
  explanation anchored to stable math.
- **Assume zero prior linear algebra.** Define terms the first time you use them.

## The seven-part lesson structure

Each page follows this rhythm using `<Section title="…">` blocks:

1. Intuition
2. Definition
3. Small example
4. Manual calculation (with a `Hint` and a `StepSolution`)
5. Interactive demo
6. ML connection (`MLCallout`)
7. Practice questions (`Quiz`)

## Dev setup

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # run math unit tests before committing
npm run build    # must pass (type-check + build) before opening a PR
```

## Adding a new lesson

1. **Register it in the manifest** — add an entry to `LESSONS` in `src/lessons.ts`:

   ```ts
   {
     slug: "my-topic",
     num: 12,
     title: "My Topic",
     short: "My Topic",
     description: "One-line summary shown in nav and on the home page.",
     group: "Core Theory", // Foundations | Core Theory | Decompositions | Applications | Practice
   }
   ```

2. **Create the page** — add `src/pages/MyTopic.tsx`:

   ```tsx
   import { Page, Section } from "../components/Page";
   import { ConceptCard } from "../components/ConceptCard";
   import { MLCallout } from "../components/MLCallout";
   import { Quiz } from "../components/Quiz";
   import { Eq, Equation } from "../components/Equation";

   export function MyTopic() {
     return (
       <Page slug="my-topic">
         <Section title="Intuition">{/* … */}</Section>
         {/* Definition, Example, Manual calculation, Demo, ML connection */}
         <Section title="Practice questions">
           <Quiz title="My Topic — concept check" questions={/* … */} />
         </Section>
       </Page>
     );
   }
   ```

3. **Wire the route** — add it to `src/App.tsx`:

   ```tsx
   <Route path="my-topic" element={<MyTopic />} />
   ```

The sidebar, home-page grid, and prev/next navigation update automatically from the
manifest.

## Writing equations

Use the `Equation` (block) and `Eq` (inline) components — they render LaTeX with
KaTeX. Put raw LaTeX (no `$` delimiters) in a string child:

```tsx
<Equation>{"A = U\\Sigma V^{\\mathsf T}"}</Equation>
<p>The dot product <Eq>{"a\\cdot b"}</Eq> is a number.</p>
```

Escape backslashes for JS strings (`\\`). Prefer `matrixToLatex` / `vectorToLatex`
from `mathUtils` when rendering computed matrices.

## Adding quiz questions

Add a `QuizQuestion[]` to `src/data/quizzes.tsx`. Explanations must say **why**:

```tsx
{
  id: "topic-1",
  question: <>What is …?</>,
  options: ["A", "B", "C", "D"],
  correct: 2,
  explanation: <>Because …</>,
}
```

Also surface the new quiz in the Practice Lab (`src/pages/Practice.tsx`) by adding it
to the `TOPICS` array.

## Adding an interactive demo

- Keep demos self-contained in `src/components/`.
- Reuse `mathUtils` for the math (don't reimplement it) so it stays tested.
- Use SVG for 2D visuals (see `VectorCanvas`, `TransformVisualizer`) and support
  both themes via CSS variables (`var(--primary)`, `var(--grid)`, etc.).
- Prefer draggable handles / sliders and a live `readout` panel.

## Math utilities and tests

Any new math helper goes in `src/lib/mathUtils.ts` as a **pure function** and needs
a test in `src/lib/mathUtils.test.ts`. Run `npm test`; keep it green.

## Style

- TypeScript, functional React components, no class components.
- Comments explain intent/trade-offs, not the obvious.
- Match the existing formatting; keep components small and reusable.

## Pull requests

1. Fork and branch from `main`.
2. Ensure `npm test` and `npm run build` both pass.
3. Describe what you added and include a screenshot for UI changes.
4. One lesson or feature per PR keeps reviews easy.
