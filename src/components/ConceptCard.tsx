import type { ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

type Tone = "definition" | "intuition" | "example" | "mistake";

const META: Record<Tone, { icon: string; titleKey: string }> = {
  definition: { icon: "📐", titleKey: "concept.definition" },
  intuition: { icon: "💡", titleKey: "concept.intuition" },
  example: { icon: "🔢", titleKey: "concept.example" },
  mistake: { icon: "⚠️", titleKey: "concept.mistake" },
};

interface ConceptCardProps {
  tone?: Tone;
  title?: string;
  children: ReactNode;
}

/**
 * Reusable concept card. Colour-coded by tone to visually separate intuition,
 * formal definitions, worked examples, and common pitfalls.
 */
export function ConceptCard({ tone = "definition", title, children }: ConceptCardProps) {
  const { t } = useLanguage();
  const meta = META[tone];
  return (
    <div className={`concept-card tone-${tone}`}>
      <div className="cc-title">
        <span className="cc-icon" aria-hidden>
          {meta.icon}
        </span>
        {title ?? t(meta.titleKey)}
      </div>
      <div className="cc-body">{children}</div>
    </div>
  );
}
