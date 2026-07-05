import { useState } from "react";
import type { ReactNode } from "react";

export interface Flashcard {
  front: ReactNode;
  back: ReactNode;
}

interface FlashcardsProps {
  cards: Flashcard[];
}

/** A simple flip-card deck for memorising definitions and formulas. */
export function Flashcards({ cards }: FlashcardsProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[index];

  const go = (delta: number) => {
    setFlipped(false);
    setIndex((i) => (i + delta + cards.length) % cards.length);
  };

  return (
    <div>
      <div
        className={`flashcard${flipped ? " flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
        }}
      >
        <div className="flashcard-inner">
          <div className="flashcard-face front">
            <div>{card.front}</div>
            <small style={{ color: "var(--text-muted)", marginTop: "1rem" }}>
              click to flip
            </small>
          </div>
          <div className="flashcard-face back">
            <div>{card.back}</div>
          </div>
        </div>
      </div>
      <div className="quiz-footer">
        <button onClick={() => go(-1)}>← Prev</button>
        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          {index + 1} / {cards.length}
        </span>
        <button onClick={() => go(1)}>Next →</button>
      </div>
    </div>
  );
}
