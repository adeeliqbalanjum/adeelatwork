import Link from "next/link";

const processSteps = [
  {
    num: "01",
    title: "Understand",
    copy: "I clarify the client goal, business model, page structure, features, references, and conversion path.",
  },
  {
    num: "02",
    title: "Plan",
    copy: "I map the sections, WordPress stack, required plugins, custom logic, responsiveness, and editing needs.",
  },
  {
    num: "03",
    title: "Build",
    copy: "I create the UI, responsive layouts, WordPress templates, forms, animations, and functionality.",
  },
  {
    num: "04",
    title: "Polish",
    copy: "I test mobile, speed, forms, links, edge cases, browser behavior, and final handover details.",
  },
];

export default function ProcessOptionsPage() {
  return (
    <main className="process-options-page">
      <div className="process-options-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <header className="process-options-hero">
        <Link href="/" className="process-back-link">← Back to portfolio</Link>
        <div className="eyebrow">Process Design Options</div>
        <h1>Choose the final process section style</h1>
        <p>
          I created three different directions below. The live homepage process section is untouched for now.
        </p>
      </header>

      <section className="process-preview process-a" id="option-a">
        <div className="process-label-row">
          <span>Option A</span>
          <strong>Premium Animated Process Timeline</strong>
        </div>
        <div className="process-section-head">
          <div className="eyebrow">Process</div>
          <h2>How I move from idea to polished launch</h2>
          <p>A clean horizontal process with a premium progress line, active card treatment, and glass panels.</p>
        </div>
        <div className="process-a-timeline" aria-hidden="true">
          <span />
        </div>
        <div className="process-a-grid">
          {processSteps.map((step, index) => (
            <article className="process-a-card" key={step.num} style={{ "--step-index": index } as React.CSSProperties}>
              <span className="process-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process-preview process-b" id="option-b">
        <div className="process-label-row">
          <span>Option B</span>
          <strong>3D Floating Process Cards</strong>
        </div>
        <div className="process-section-head">
          <div className="eyebrow">Process</div>
          <h2>Strategy, structure, build, polish</h2>
          <p>More creative and high-end. Cards float with depth, soft lighting, and hover lift.</p>
        </div>
        <div className="process-b-stage">
          {processSteps.map((step, index) => (
            <article className="process-b-card" key={step.num} style={{ "--step-index": index } as React.CSSProperties}>
              <div className="process-b-orb" aria-hidden="true" />
              <span className="process-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process-preview process-c" id="option-c">
        <div className="process-label-row">
          <span>Option C</span>
          <strong>Step-by-Step Scroll Reveal</strong>
        </div>
        <div className="process-c-layout">
          <div className="process-c-intro">
            <div className="eyebrow">Process</div>
            <h2>One controlled step at a time</h2>
            <p>Best for storytelling. Each step feels like a guided client journey instead of four static cards.</p>
          </div>
          <div className="process-c-steps">
            {processSteps.map((step, index) => (
              <article className="process-c-card" key={step.num} style={{ "--step-index": index } as React.CSSProperties}>
                <span className="process-num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
