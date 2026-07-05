import { Page, Section } from "../components/Page";
import { ConceptCard } from "../components/ConceptCard";
import { MLCallout } from "../components/MLCallout";
import { Quiz } from "../components/Quiz";
import { Hint } from "../components/Hint";
import { StepSolution } from "../components/StepSolution";
import { VectorCanvas } from "../components/VectorCanvas";
import { Eq, Equation } from "../components/Equation";
import { vectorsQuiz } from "../data/quizzes";

export function Vectors() {
  return (
    <Page slug="vectors">
      <Section title="Intuition">
        <p>
          A vector is a list of numbers. That's it. But two pictures make it powerful. A
          vector like <Eq>{"(3, 2)"}</Eq> can be a <strong>point</strong> (go to location
          3 across, 2 up) or an <strong>arrow</strong> (an instruction: move 3 right and 2
          up). In ML we use a third picture: a vector is a{" "}
          <strong>list of features</strong> describing something — the "meaning" of a
          word, the pixels of an image, a user's taste.
        </p>
        <ConceptCard tone="intuition">
          Coordinates answer "where / how much of each ingredient?" Magnitude answers "how
          long is the arrow?" Direction answers "which way does it point?"
        </ConceptCard>
      </Section>

      <Section title="Definition">
        <p>
          A vector in <Eq>{"\\mathbb{R}^n"}</Eq> is an ordered list of <Eq>{"n"}</Eq> real
          numbers. Core operations:
        </p>
        <Equation>
          {
            "a + b = (a_1 + b_1,\\ \\dots,\\ a_n + b_n) \\qquad c\\,a = (c\\,a_1,\\ \\dots,\\ c\\,a_n)"
          }
        </Equation>
        <p>
          The <strong>dot product</strong> combines two vectors into one number:
        </p>
        <Equation>
          {
            "a \\cdot b = a_1 b_1 + a_2 b_2 + \\cdots + a_n b_n = \\|a\\|\\,\\|b\\|\\cos\\theta"
          }
        </Equation>
        <p>
          The <strong>magnitude</strong> (length, or 2-norm) and{" "}
          <strong>cosine similarity</strong>:
        </p>
        <Equation>
          {
            "\\|a\\| = \\sqrt{a \\cdot a}, \\qquad \\cos\\theta = \\frac{a\\cdot b}{\\|a\\|\\,\\|b\\|}"
          }
        </Equation>
        <p>
          The <strong>projection</strong> of <Eq>{"a"}</Eq> onto <Eq>{"b"}</Eq> is the
          "shadow" of <Eq>{"a"}</Eq> along <Eq>{"b"}</Eq>:
        </p>
        <Equation>
          {"\\operatorname{proj}_b(a) = \\frac{a\\cdot b}{b\\cdot b}\\,b"}
        </Equation>
      </Section>

      <Section title="Small example">
        <p>
          Let <Eq>{"a = (3, 4)"}</Eq> and <Eq>{"b = (4, 0)"}</Eq>.
        </p>
        <ul>
          <li>
            Dot product: <Eq>{"a\\cdot b = 3\\cdot4 + 4\\cdot0 = 12"}</Eq>.
          </li>
          <li>
            Length of <Eq>{"a"}</Eq>: <Eq>{"\\|a\\| = \\sqrt{9+16} = 5"}</Eq>.
          </li>
          <li>
            Cosine similarity: <Eq>{"\\cos\\theta = \\tfrac{12}{5\\cdot 4} = 0.6"}</Eq>,
            so <Eq>{"\\theta \\approx 53^\\circ"}</Eq>.
          </li>
        </ul>
      </Section>

      <Section title="Manual calculation">
        <p>
          <strong>Try it:</strong> project <Eq>{"a = (2, 3)"}</Eq> onto{" "}
          <Eq>{"b = (4, 0)"}</Eq>. Work it out before revealing the steps.
        </p>
        <Hint label="Hint: which formula?">
          Use <Eq>{"\\operatorname{proj}_b(a) = \\frac{a\\cdot b}{b\\cdot b}\\,b"}</Eq>.
          Compute the two dot products first, then scale <Eq>{"b"}</Eq>.
        </Hint>
        <StepSolution
          steps={[
            {
              title: "Numerator a·b",
              content: <Equation>{"a\\cdot b = 2\\cdot 4 + 3\\cdot 0 = 8"}</Equation>,
            },
            {
              title: "Denominator b·b",
              content: <Equation>{"b\\cdot b = 4\\cdot 4 + 0\\cdot 0 = 16"}</Equation>,
            },
            {
              title: "Scalar",
              content: (
                <Equation>
                  {"\\frac{a\\cdot b}{b\\cdot b} = \\frac{8}{16} = \\tfrac12"}
                </Equation>
              ),
            },
            {
              title: "Scale b",
              content: (
                <>
                  <Equation>
                    {"\\operatorname{proj}_b(a) = \\tfrac12 (4, 0) = (2, 0)"}
                  </Equation>
                  <p style={{ margin: 0 }}>
                    The shadow lands at (2, 0): only the x-part of <Eq>{"a"}</Eq>{" "}
                    survives, which makes sense since <Eq>{"b"}</Eq> lies on the x-axis.
                  </p>
                </>
              ),
            },
          ]}
        />
        <ConceptCard tone="mistake">
          A dot product returns a <em>number</em>, not a vector. A common slip is writing
          <Eq>{"a\\cdot b = (12, 0)"}</Eq>. Also: cosine similarity is not the angle
          itself — it's the cosine of the angle, ranging from −1 to 1.
        </ConceptCard>
      </Section>

      <Section title="Interactive demo">
        <p>
          Drag the arrow tips. Watch how the dot product hits 0 exactly when the arrows
          are perpendicular, and how cosine similarity reaches 1 when they align. The
          orange bar is the projection of <Eq>{"a"}</Eq> onto <Eq>{"b"}</Eq>.
        </p>
        <VectorCanvas />
      </Section>

      <Section title="ML connection: embeddings & similarity search">
        <MLCallout title="Embeddings and cosine similarity" reviewed="2026-07">
          <p>
            Models turn words, images, and users into <strong>embedding vectors</strong>:
            a few hundred numbers whose <em>direction</em> encodes meaning. To ask "how
            similar are these two items?" we compute cosine similarity — the exact formula
            from this page.
          </p>
          <p>
            "king" and "queen" have embeddings pointing in nearly the same direction
            (cosine near 1); "king" and "banana" are close to perpendicular (cosine near
            0). A <strong>similarity search</strong> / vector database ranks results by
            <Eq>{"\\cos\\theta"}</Eq> against a query vector. That's dot products all the
            way down.
          </p>
        </MLCallout>
      </Section>

      <Section title="Practice questions">
        <Quiz title="Vectors — concept check" questions={vectorsQuiz} />
      </Section>
    </Page>
  );
}
