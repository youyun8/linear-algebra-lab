import { useState } from "react";
import type { ReactNode } from "react";

export interface QuizQuestion {
  id: string;
  /** Question prompt. Can include JSX (e.g. inline equations). */
  question: ReactNode;
  options: ReactNode[];
  /** Index of the correct option. */
  correct: number;
  /** Explanation shown after answering — explains WHY, not just the answer. */
  explanation: ReactNode;
}

interface QuizProps {
  title?: string;
  questions: QuizQuestion[];
}

const KEYS = ["A", "B", "C", "D", "E", "F"];

/**
 * Interactive multiple-choice quiz with per-question explanations and a final
 * score. Answers reveal an explanation immediately so it doubles as a study
 * tool, not just an assessment.
 */
export function Quiz({ title, questions }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answeredCorrect, setAnsweredCorrect] = useState(false);

  const q = questions[current];

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    const isCorrect = i === q.correct;
    setAnsweredCorrect(isCorrect);
    if (isCorrect) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnsweredCorrect(false);
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnsweredCorrect(false);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz">
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        <div className="quiz-score">
          <div className="big">{pct}%</div>
          <p>
            You answered <strong>{score}</strong> of <strong>{questions.length}</strong>{" "}
            correctly.
          </p>
          <button className="btn-primary" onClick={restart}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      <div className="quiz-progress">
        Question {current + 1} of {questions.length} · Score {score}
      </div>
      <div className="quiz-question">{q.question}</div>
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = "quiz-option";
          if (selected !== null) {
            if (i === q.correct) cls += " correct";
            else if (i === selected) cls += " incorrect";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => choose(i)}
              disabled={selected !== null}
            >
              <span className="opt-key">{KEYS[i]}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="quiz-explanation">
          <strong>{answeredCorrect ? "✓ Correct. " : "✗ Not quite. "}</strong>
          {q.explanation}
        </div>
      )}

      <div className="quiz-footer">
        <span />
        {selected !== null && (
          <button className="btn-primary" onClick={next}>
            {current + 1 >= questions.length ? "See results" : "Next question →"}
          </button>
        )}
      </div>
    </div>
  );
}
