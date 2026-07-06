import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { StartHere } from "./pages/StartHere";
import { Vectors } from "./pages/Vectors";
import { Matrices } from "./pages/Matrices";
import { Systems } from "./pages/Systems";
import { Subspaces } from "./pages/Subspaces";
import { Orthogonality } from "./pages/Orthogonality";
import { Eigen } from "./pages/Eigen";
import { SVD } from "./pages/SVD";
import { DiagVsSVD } from "./pages/DiagVsSVD";
import { MatrixCalculus } from "./pages/MatrixCalculus";
import { ML } from "./pages/ML";
import { Practice } from "./pages/Practice";
import { CheatSheets } from "./pages/CheatSheets";
import { ScrollToTop } from "./components/ScrollToTop";

/**
 * HashRouter is used so the site works on GitHub Pages without server-side
 * rewrite rules (deep links like /#/svd resolve to the SPA).
 */
export function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="start-here" element={<StartHere />} />
          <Route path="vectors" element={<Vectors />} />
          <Route path="matrices" element={<Matrices />} />
          <Route path="systems" element={<Systems />} />
          <Route path="subspaces" element={<Subspaces />} />
          <Route path="orthogonality" element={<Orthogonality />} />
          <Route path="eigen" element={<Eigen />} />
          <Route path="svd" element={<SVD />} />
          <Route path="diag-vs-svd" element={<DiagVsSVD />} />
          <Route path="matrix-calculus" element={<MatrixCalculus />} />
          <Route path="ml" element={<ML />} />
          <Route path="practice" element={<Practice />} />
          <Route path="cheatsheets" element={<CheatSheets />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
