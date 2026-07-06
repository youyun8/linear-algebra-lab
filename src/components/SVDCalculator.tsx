import { useMemo, useState } from "react";
import type { Matrix } from "../lib/mathUtils";
import { svd2x2, eigen2x2, matrixToLatex, fmt } from "../lib/mathUtils";
import { MatrixInput } from "./MatrixInput";
import { Equation } from "./Equation";
import { useLanguage } from "../i18n/LanguageProvider";

const PRESETS: { labelKey: string; m: Matrix }[] = [
  {
    labelKey: "svd.preset.textbook",
    m: [
      [3, 0],
      [4, 5],
    ],
  },
  {
    labelKey: "svd.preset.diagonal",
    m: [
      [3, 0],
      [0, 2],
    ],
  },
  {
    labelKey: "svd.preset.shear",
    m: [
      [1, 1],
      [0, 1],
    ],
  },
  {
    labelKey: "svd.preset.rank1",
    m: [
      [2, 4],
      [1, 2],
    ],
  },
];

/**
 * Interactive step-by-step 2x2 SVD calculator. Walks through the manual recipe:
 * form AᵀA, find its eigenvalues (= σ²), get right singular vectors V, then
 * left singular vectors U, and finally reconstruct A = U Σ Vᵀ.
 */
export function SVDCalculator() {
  const { t } = useLanguage();
  const [A, setA] = useState<Matrix>([
    [3, 0],
    [4, 5],
  ]);

  const data = useMemo(() => {
    try {
      const svd = svd2x2(A);
      const eig = eigen2x2(svd.ATA);
      return { svd, eig, error: null as string | null };
    } catch (e) {
      return { svd: null, eig: null, error: (e as Error).message };
    }
  }, [A]);

  if (data.error || !data.svd || !data.eig) {
    return (
      <div className="canvas-wrap">
        <MatrixInput value={A} onChange={setA} label={t("mtx.matrixA")} />
        <p style={{ color: "#ef4444" }}>{data.error}</p>
      </div>
    );
  }

  const { svd, eig } = data;
  const lambdas = [...eig.eigenvalues].sort((a, b) => b - a);
  while (lambdas.length < 2) lambdas.push(lambdas[0] ?? 0);

  return (
    <div className="canvas-wrap">
      <div className="mtx-wrap">
        <MatrixInput value={A} onChange={setA} label={t("mtx.matrixA")} />
        <div className="tag-row">
          {PRESETS.map((p) => (
            <button key={p.labelKey} onClick={() => setA(p.m)}>
              {t(p.labelKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="steps" style={{ marginTop: "1rem" }}>
        <div className="steps-header">
          <span>{t("svd.stepHeader")}</span>
        </div>

        <div className="step">
          <div className="step-num">{t("svd.step1")}</div>
          <Equation>{`A^{\\mathsf T}A = ${matrixToLatex(svd.ATA)}`}</Equation>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {t("svd.step1.note")}
          </p>
        </div>

        <div className="step">
          <div className="step-num">{t("svd.step2")}</div>
          <Equation>{`\\lambda_1 = ${fmt(lambdas[0])}, \\quad \\lambda_2 = ${fmt(lambdas[1])}`}</Equation>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {t("svd.step2.note", {
              trace: fmt(eig.trace),
              det: fmt(eig.determinant),
            })}
          </p>
        </div>

        <div className="step">
          <div className="step-num">{t("svd.step3")}</div>
          <Equation>{`\\sigma_1 = ${fmt(svd.singularValues[0])}, \\quad \\sigma_2 = ${fmt(svd.singularValues[1])}`}</Equation>
        </div>

        <div className="step">
          <div className="step-num">{t("svd.step4")}</div>
          <Equation>{`V = ${matrixToLatex(svd.V)}`}</Equation>
        </div>

        <div className="step">
          <div className="step-num">{t("svd.step5")}</div>
          <Equation>{`U = ${matrixToLatex(svd.U)}`}</Equation>
        </div>

        <div className="step">
          <div className="step-num">{t("svd.step6")}</div>
          <Equation>{`\\Sigma = ${matrixToLatex(svd.S)}`}</Equation>
        </div>

        <div className="step">
          <div className="step-num">{t("svd.step7")}</div>
          <Equation>
            {`U\\,\\Sigma\\,V^{\\mathsf T} = ${matrixToLatex(svd.reconstruction)} = A \\; ✓`}
          </Equation>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {t("svd.step7.note")}
          </p>
        </div>
      </div>
    </div>
  );
}
