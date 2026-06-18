import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, industryColour } from "../data";
import { ProjectMockup } from "../../components/ProjectMockup";

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = projects.find(x => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.name} — Case Study | Muhammad Adeel Iqbal`,
    description: p.tagline,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const p = projects.find(x => x.slug === params.slug);
  if (!p) notFound();

  const accent = industryColour[p.industry];

  /* Up to 3 related by same industry, fallback to others */
  const related = [
    ...projects.filter(x => x.slug !== p.slug && x.industry === p.industry),
    ...projects.filter(x => x.slug !== p.slug && x.industry !== p.industry),
  ].slice(0, 3);

  return (
    <div className="cs-page">
      <div className="noise" />

      <nav className="nav">
        <Link className="nav-logo" href="/">AI</Link>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact" className="nav-cta">Hire Me</Link>
      </nav>

      {/* ── HERO ── */}
      <header className="cs-hero">
        <div className="cs-hero-inner">
          <Link href="/portfolio" className="cs-back">← All projects</Link>
          <div className="cs-tags">
            <span className="cs-tag" style={{ background: accent + "22", color: accent }}>{p.industry}</span>
            <span className="cs-loc-pill">{p.location}</span>
            <span className="cs-loc-pill">{p.year}</span>
          </div>
          <h1 className="cs-title">{p.name}</h1>
          <p className="cs-sub">{p.tagline}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              View live site ↗
            </a>
            <Link href="/portfolio" className="btn btn-ghost">← All projects</Link>
          </div>
        </div>

        {/* Rich Mockup in hero */}
        <div className="cs-hero-mock">
          <ProjectMockup
            type={p.mockupType}
            bg={p.mockupBg}
            accent={p.mockupAccent}
            name={p.name}
            size="hero"
          />
        </div>
      </header>

      {/* ── METRICS ── */}
      <section className="cs-metrics">
        {p.results.map(r => (
          <div className="cs-metric" key={r.label}>
            <strong style={{ color: accent }}>{r.metric}</strong>
            <span>{r.label}</span>
          </div>
        ))}
      </section>

      {/* ── BODY ── */}
      <div className="cs-body">

        <section className="cs-section">
          <div className="cs-section-label" style={{ color: accent }}>The Challenge</div>
          <div className="cs-section-content">
            <p className="cs-para">{p.challenge}</p>
          </div>
        </section>

        <div className="cs-divider" />

        <section className="cs-section">
          <div className="cs-section-label" style={{ color: accent }}>What I Built</div>
          <div className="cs-section-content">
            <p className="cs-para">{p.body}</p>
            <ul className="cs-list">
              {p.solution.map((s, i) => (
                <li key={i} className="cs-list-item">
                  <span className="cs-list-dot" style={{ background: accent }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="cs-divider" />

        <section className="cs-section">
          <div className="cs-section-label" style={{ color: accent }}>Tech Stack</div>
          <div className="cs-section-content">
            <div className="cs-stack">
              {p.stack.map(t => (
                <span key={t} className="cs-pill" style={{ borderColor: accent + "55", color: accent }}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="cs-divider" />

        <section className="cs-section">
          <div className="cs-section-label" style={{ color: accent }}>Results</div>
          <div className="cs-section-content">
            <div className="cs-results-grid">
              {p.results.map(r => (
                <div key={r.label} className="cs-result-card" style={{ borderTop: `3px solid ${accent}` }}>
                  <strong style={{ color: accent }}>{r.metric}</strong>
                  <span>{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="cs-live-row">
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">View {p.name} live ↗</a>
          <Link href="/portfolio" className="btn btn-ghost">← All projects</Link>
        </div>
      </div>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="cs-related">
          <div className="cs-related-inner">
            <div className="eyebrow">More work</div>
            <h2>Other projects</h2>
            <div className="cs-related-grid">
              {related.map(r => (
                <Link href={`/portfolio/${r.slug}`} className="cs-rel-card" key={r.slug}>
                  <div className="cs-rel-mock">
                    <ProjectMockup type={r.mockupType} bg={r.mockupBg} accent={r.mockupAccent} name={r.name} />
                  </div>
                  <div className="cs-rel-info">
                    <span className="cs-tag" style={{ background: industryColour[r.industry] + "22", color: industryColour[r.industry] }}>{r.industry}</span>
                    <strong>{r.name}</strong>
                    <p>{r.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="cs-cta">
        <div className="eyebrow">Work together</div>
        <h2>Need a site like this?</h2>
        <p className="subline" style={{ maxWidth: 460, margin: "12px auto 24px" }}>
          Send me the details and I&apos;ll tell you exactly how I&apos;d build it.
        </p>
        <div className="actions">
          <a href="mailto:adeeliqbalajum@gmail.com" className="btn btn-dark">✦ Let&apos;s talk</a>
          <Link href="/portfolio" className="btn btn-ghost">See all projects</Link>
        </div>
      </section>
    </div>
  );
}
