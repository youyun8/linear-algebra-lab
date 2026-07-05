import type { ReactNode } from "react";

type Tone = "definition" | "intuition" | "example" | "mistake";

const META: Record<Tone, { icon: string; defaultTitle: string }> = {
  definition: { icon: "📐", defaultTitle: "Definition" },
  intuition: { icon: "💡", defaultTitle: "Intuition" },
  example: { icon: "🔢", defaultTitle: "Small Example" },
  mistake: { icon: "⚠️", defaultTitle: "Common Mistake" },
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
  const meta = META[tone];
  return (
    <div className={`concept-card tone-${tone}`}>
      <div className="cc-title">
        <span className="cc-icon" aria-hidden>
          {meta.icon}
        </span>
        {title ?? meta.defaultTitle}
      </div>
      <div className="cc-body">{children}</div>
    </div>
  );
}
