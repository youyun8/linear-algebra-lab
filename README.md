# Linear Algebra Lab

An interactive, beginner-friendly Linear Algebra course for college freshmen that
builds all the way up to Singular Value Decomposition — and connects every topic to
modern machine learning (PCA, embeddings, attention, transformers, low-rank
approximation, LoRA, recommendation systems, model compression).

Visual intuition first, formal definitions second, then concrete worked examples,
manual-calculation practice, interactive demos, and an ML connection on every page.

- **Stack:** Vite + React + TypeScript, KaTeX for equations, React Router.
- **Zero backend:** a static SPA that deploys to GitHub Pages in one push.
- **Tested math core:** the linear-algebra utilities have unit tests (Vitest).

## Sections

1. **Start Here** — why linear algebra matters for ML, a roadmap, and a diagnostic quiz.
2. **Vectors** — coordinates, magnitude, dot product, cosine similarity, projection.
3. **Matrices** — data tables and linear transformations; matrix multiplication.
4. **Systems of Linear Equations** — Gaussian elimination, rank, pivots, free variables.
5. **Subspaces** — span, basis, dimension, the four subspaces, rank–nullity.
6. **Orthogonality** — projection, least squares, Gram–Schmidt.
7. **Eigenvalues & Eigenvectors** — intuition, characteristic polynomial, PCA.
8. **Singular Value Decomposition** — SVD from scratch, manual 2×2, low-rank, LoRA.
9. **Linear Algebra for Modern ML** — embeddings, attention, transformers, GEMM.
10. **Practice Lab** — quizzes, flashcards, calculation drills with worked answers.
11. **Cheat Sheets** — one-page summaries.

## Interactive demos

- **Vector playground** — drag two vectors; live dot product, cosine similarity, projection.
- **Matrix transformation visualizer** — see how a 2×2 matrix warps the grid and basis; animated; determinant as area scale.
- **Step-by-step 2×2 SVD calculator** — shows `A`, `AᵀA`, eigenvalues, singular values, `V`, `U`, and the `UΣVᵀ` reconstruction.
- Plus a Gaussian-elimination stepper and an eigenvector visualizer.

## Getting started

Requires **Node 18+** (Node 20+ recommended).

```bash
# 1. install dependencies
npm install

# 2. start the dev server (http://localhost:5173)
npm run dev

# 3. run the math unit tests
npm test

# 4. type-check + production build (outputs to dist/)
npm run build

# 5. preview the production build locally
npm run preview
```

### Scripts

| Script               | What it does                                |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Start Vite dev server with hot reload       |
| `npm run build`      | Type-check (`tsc -b`) then build to `dist/` |
| `npm run preview`    | Serve the built site locally                |
| `npm test`           | Run Vitest once                             |
| `npm run test:watch` | Run Vitest in watch mode                    |
| `npm run typecheck`  | Type-check without emitting                 |

## Project structure

```
linear-algebra-lab/
├── .github/workflows/deploy.yml   # GitHub Pages CI (test → build → deploy)
├── docs/roadmap.md                # curriculum roadmap
├── public/favicon.svg
├── index.html
├── src/
│   ├── main.tsx                   # app entry
│   ├── App.tsx                    # routes (HashRouter for GH Pages)
│   ├── lessons.ts                 # section manifest (drives nav + home grid)
│   ├── styles/index.css           # theme + component styles (light/dark)
│   ├── lib/
│   │   ├── mathUtils.ts           # tested linear-algebra functions
│   │   └── mathUtils.test.ts
│   ├── components/                # reusable building blocks (see below)
│   ├── data/quizzes.tsx           # shared question bank
│   └── pages/                     # one file per section
├── vite.config.ts                 # Vite + Vitest config, GH Pages base path
└── package.json
```

### Reusable components

`Equation`/`Eq` (KaTeX), `ConceptCard`, `MLCallout`/`Warn`, `Hint` (collapsible),
`StepSolution` (reveal one step at a time), `Quiz`, `Flashcards`, `MatrixInput`/
`MatrixDisplay`, `MatrixCalculator`, `VectorCanvas`, `TransformVisualizer`,
`EigenVisualizer`, `SVDCalculator`, `GaussianDemo`, `Layout`, `Page`/`Section`,
`ThemeToggle`.

### Math utilities (`src/lib/mathUtils.ts`)

Vector add / subtract / scale, dot product, norm, normalize, cosine similarity,
projection, angle; matrix transpose, multiply, apply-to-vector, identity;
2×2 and 3×3 determinants; Gaussian elimination (with recorded steps), rank;
Gram–Schmidt; 2×2 eigenvalues/eigenvectors; 2×2 SVD helper; LaTeX formatters.
All covered by unit tests.

## Deploying to GitHub Pages

This repo ships a workflow at `.github/workflows/deploy.yml` that runs tests,
builds, and publishes `dist/` to GitHub Pages on every push to `main`. The app
uses `HashRouter`, so deep links (e.g. `/#/svd`) work on GitHub Pages with no
server-side rewrite rules.

### Understanding the `base` path

GitHub Pages serves a project site from a subpath: `https://<user>.github.io/<repo>/`.
Vite therefore needs to know that all asset URLs are prefixed with `/<repo>/`. This
is the `base` option in `vite.config.ts`:

```ts
const base = process.env.BASE_PATH ?? "/linear-algebra-lab/";
```

- **Repo named `linear-algebra-lab`** → no change needed.
- **Different repo name** → change the default string to `/<your-repo-name>/`
  (keep both slashes), or set the `BASE_PATH` env var in CI.
- **User/organization site** (`<user>.github.io`) or a **custom domain** → the site
  is served from the root, so build with `BASE_PATH=/`.

If the base path is wrong you'll see a blank page and 404s for the JS/CSS in the
browser console — that's the usual symptom.

### Option A — Automated deploy with GitHub Actions (recommended)

This is fully set up already. Do this once:

1. **Create the GitHub repo and push:**

   ```bash
   git remote add origin https://github.com/<your-username>/linear-algebra-lab.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable Pages via Actions:** on GitHub, go to
   **Settings → Pages → Build and deployment → Source** and select
   **GitHub Actions**. (You do _not_ need to pick a branch — the workflow handles it.)

3. **Trigger a deploy:** every push to `main` now runs the workflow. You can also
   trigger it manually from the **Actions** tab (the workflow allows
   `workflow_dispatch`).

4. **Watch it run:** open the **Actions** tab → the "Deploy to GitHub Pages" run.
   It has two jobs: `build` (install → `npm test` → `npm run build` → upload the
   `dist/` artifact) and `deploy` (publish to Pages). When green, the deploy job
   prints the live URL.

5. **Visit the site:** `https://<your-username>.github.io/linear-algebra-lab/`.

The workflow's required permissions (`pages: write`, `id-token: write`) and the
`github-pages` environment are already declared in `deploy.yml`, so no extra
configuration is required.

### Option B — Manual deploy with the `gh-pages` branch

If you prefer not to use Actions, you can publish the built files by hand:

```bash
# Build (adjust BASE_PATH if your repo name differs)
npm run build

# Publish dist/ to a gh-pages branch using npx (no install needed)
npx gh-pages -d dist
```

Then set **Settings → Pages → Source → Deploy from a branch → `gh-pages` / `root`**.
Re-run the two commands whenever you want to update the live site.

### Using a custom domain

1. Build with a root base path: `BASE_PATH=/ npm run build`.
2. Add your domain in **Settings → Pages → Custom domain** (this creates a `CNAME`).
   For Actions-based deploys, also commit a `public/CNAME` file containing your
   domain so it's included in every build:

   ```bash
   echo "your-domain.com" > public/CNAME
   ```

3. Configure your DNS provider with the records GitHub shows (an `A`/`AAAA` or
   `CNAME` record), then enable **Enforce HTTPS**.

### Troubleshooting

| Symptom                            | Likely cause              | Fix                                                                     |
| ---------------------------------- | ------------------------- | ----------------------------------------------------------------------- |
| Blank page, 404s for `assets/*.js` | Wrong `base` path         | Set `base` / `BASE_PATH` to match the repo name (or `/` for root sites) |
| 404 on refresh of a deep link      | Not applicable here       | The app uses `HashRouter`; ensure links use `/#/...`                    |
| Workflow fails at "Run unit tests" | A test regressed          | Run `npm test` locally and fix before pushing                           |
| "Pages" not deploying              | Source not set to Actions | Settings → Pages → Source → GitHub Actions                              |

## Contributing

New lessons and improvements are welcome. See [`CONTRIBUTING.md`](./CONTRIBUTING.md)
for how to add a section, a demo, or quiz questions.

## Accuracy & "Last reviewed" notes

ML moves fast; core linear algebra does not. ML-connection callouts carry a
**Last reviewed** date and stay anchored to stable mathematical foundations rather
than to any specific framework or model release.

## License

MIT — see [`LICENSE`](./LICENSE).
