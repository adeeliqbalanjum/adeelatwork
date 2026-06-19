import type { CSSProperties } from "react";

type StepStyle = CSSProperties & { "--step-index": number };

const processSteps = [
  ["01", "Understand", "Clarify the goal, pages, features, references, and conversion path."],
  ["02", "Plan", "Map the WordPress stack, plugins, custom logic, responsiveness, and editing needs."],
  ["03", "Build", "Create the UI, templates, forms, animations, and functionality."],
  ["04", "Polish", "Test mobile, speed, forms, links, browser behavior, and handover details."],
];

const galleryLeft = [
  "Discovery notes",
  "Sitemap plan",
  "Wireframe system",
  "Elementor build",
  "Responsive QA",
];

const galleryRight = [
  "Plugin logic",
  "Speed pass",
  "Final launch",
  "Client handover",
  "Growth support",
];

function stepStyle(index: number): StepStyle {
  return { "--step-index": index };
}

export function ExtraProcessOptions() {
  return (
    <>
      <section className="process-preview process-d" id="option-d">
        <div className="process-label-row">
          <span>Option D</span>
          <strong>Sticky Process Tabs</strong>
        </div>
        <div className="process-d-shell">
          <div className="process-d-spacer" aria-hidden="true">Process chapters</div>
          {processSteps.map(([num, title, copy]) => (
            <section className="process-d-tab" key={num}>
              <div className="process-d-title">
                <span>{num}</span>
                <h2>{title}</h2>
              </div>
              <div className="process-d-body">
                <p>{copy}</p>
                <small>Sticky chapter layout for a controlled, premium client journey.</small>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="process-preview process-e" id="option-e">
        <div className="process-label-row">
          <span>Option E</span>
          <strong>Expanding Media Story</strong>
        </div>
        <div className="process-e-stage">
          <div className="process-e-bg" aria-hidden="true" />
          <div className="process-e-title">
            <span>Interactive story concept</span>
            <h2>From idea to launch</h2>
          </div>
          <div className="process-e-media">
            <div className="process-e-browser"><i /><i /><i /></div>
            <strong>WordPress build preview</strong>
            <p>Discovery, planning, UI build, plugin logic, QA, and launch handover.</p>
          </div>
          <div className="process-e-content">
            {processSteps.map(([num, title]) => (
              <article key={num}>
                <span>{num}</span>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-preview process-f" id="option-f">
        <div className="process-label-row process-f-label">
          <span>Option F</span>
          <strong>Sticky Gallery Process — closer to your shared code</strong>
        </div>

        <div className="process-f-wrapper">
          <section className="process-f-hero">
            <div className="process-f-grid-bg" aria-hidden="true" />
            <h2>Create the launch flow in a better way</h2>
            <p>Scroll down. The intro stays sticky first, then the gallery begins.</p>
          </section>
        </div>

        <section className="process-f-gallery-section">
          <div className="process-f-gallery">
            <div className="process-f-col">
              {galleryLeft.map((item, index) => (
                <figure key={item} className="process-f-tile" style={stepStyle(index)}>{item}</figure>
              ))}
            </div>
            <div className="process-f-center">
              {processSteps.slice(0, 3).map(([num, title], index) => (
                <figure key={num} className="process-f-tile process-f-tile-main" style={stepStyle(index)}>
                  <span>{num}</span>
                  <strong>{title}</strong>
                </figure>
              ))}
            </div>
            <div className="process-f-col">
              {galleryRight.map((item, index) => (
                <figure key={item} className="process-f-tile" style={stepStyle(index + 5)}>{item}</figure>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
