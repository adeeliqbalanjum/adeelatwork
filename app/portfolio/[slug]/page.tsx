import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, industryColour } from "../data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const p = projects.find(x => x.slug === slug);

  if (!p) return {};

  return {
    title: `${p.name} — Case Study | Muhammad Adeel Iqbal`,
    description: p.tagline,
  };
}

function HeroMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div className="cs-mock-wrap">
      <div className="cs-mock-chrome">
        {["#ff5f57","#ffbd2e","#28ca41"].map(c=>(
          <span key={c} style={{ width:10,height:10,borderRadius:"50%",background:c,display:"inline-block",marginRight:5 }}/>
        ))}
        <div className="cs-mock-urlbar">🔒 <span style={{opacity:.55}}>www.project.com</span></div>
      </div>
      <div className="cs-mock-body" style={{ background:bg }}>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(150deg,rgba(255,255,255,.18) 0%,transparent 55%)" }}/>
        <div style={{ height:32,background:accent,display:"flex",alignItems:"center",padding:"0 16px",gap:8 }}>
          <div style={{ height:8,width:48,borderRadius:4,background:"rgba(255,255,255,.55)" }}/>
          <div style={{ marginLeft:"auto",display:"flex",gap:6 }}>
            {[32,24,28,24].map((w,i)=><div key={i} style={{ height:6,width:w,borderRadius:3,background:"rgba(255,255,255,.30)" }}/>)}</div>
        </div>
        <div style={{ padding:"20px 20px 10px" }}>
          <div style={{ height:14,width:"62%",borderRadius:6,background:"rgba(255,255,255,.80)",marginBottom:8 }}/>
          <div style={{ height:9,width:"46%",borderRadius:4,background:"rgba(255,255,255,.50)",marginBottom:5 }}/>
          <div style={{ height:9,width:"35%",borderRadius:4,background:"rgba(255,255,255,.36)",marginBottom:14 }}/>
          <div style={{ display:"flex",gap:8 }}>
            <div style={{ height:22,width:64,borderRadius:11,background:"rgba(255,255,255,.82)" }}/>
            <div style={{ height:22,width:52,borderRadius:11,background:"rgba(255,255,255,.28)" }}/>
          </div>
        </div>
        <div style={{ display:"flex",gap:8,padding:"8px 16px" }}>
          {[1,2,3].map(i=>(
            <div key={i} style={{ flex:1,height:48,borderRadius:10,background:accent,opacity:.65 }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const p = projects.find(x => x.slug === slug);

  if (!p) notFound();

  const accent  = industryColour[p.industry];
  const related = projects
    .filter(x => x.slug !== p.slug && x.industry === p.industry)
    .slice(0,3)
    .concat(projects.filter(x=>x.slug!==p.slug).slice(0,3))
    .slice(0,3);

  return (
    <div className="cs-page">
      <div className="noise"/>

      <nav className="nav">
        <Link className="nav-logo" href="/">AI</Link>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact" className="nav-cta">Hire Me</Link>
      </nav>

      {/* HERO */}
      <header className="cs-hero">
        <div className="cs-hero-inner">
          <Link href="/portfolio" className="cs-back">← All projects</Link>
          <div className="cs-tags">
            <span className="cs-tag" style={{ background:accent+"22",color:accent }}>{p.industry}</span>
            <span className="cs-loc-pill">{p.location}</span>
            <span className="cs-loc-pill">{p.year}</span>
          </div>
          <h1 className="cs-title">{p.name}</h1>
          <p className="cs-sub">{p.tagline}</p>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark" style={{ marginTop:24 }}>
            View live site ↗
          </a>
        </div>
        <div className="cs-hero-mock">
          <HeroMockup bg={p.mockupBg} accent={p.mockupAccent}/>
        </div>
      </header>

      {/* METRICS */}
      <section className="cs-metrics">
        {p.results.map(r=>(
          <div className="cs-metric" key={r.label}>
            <strong style={{ color:accent }}>{r.metric}</strong>
            <span>{r.label}</span>
          </div>
        ))}
      </section>

      {/* BODY */}
      <div className="cs-body">

        <section className="cs-section">
          <div className="cs-section-label" style={{ color:accent }}>The Challenge</div>
          <div className="cs-section-content">
            <p className="cs-para">{p.challenge}</p>
          </div>
        </section>

        <div className="cs-divider"/>

        <section className="cs-section">
          <div className="cs-section-label" style={{ color:accent }}>What I Built</div>
          <div className="cs-section-content">
            <p className="cs-para">{p.body}</p>
            <ul className="cs-list">
              {p.solution.map((s,i)=>(
                <li key={i} className="cs-list-item">
                  <span className="cs-list-dot" style={{ background:accent }}/>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="cs-divider"/>

        <section className="cs-section">
          <div className="cs-section-label" style={{ color:accent }}>Tech Stack</div>
          <div className="cs-section-content">
            <div className="cs-stack">
              {p.stack.map(t=>(
                <span key={t} className="cs-pill" style={{ borderColor:accent+"55",color:accent }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="cs-divider"/>

        <section className="cs-section">
          <div className="cs-section-label" style={{ color:accent }}>Results</div>
          <div className="cs-section-content">
            <div className="cs-results-grid">
              {p.results.map(r=>(
                <div key={r.label} className="cs-result-card" style={{ borderTop:`3px solid ${accent}` }}>
                  <strong style={{ color:accent }}>{r.metric}</strong>
                  <span>{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="cs-live-row">
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            View {p.name} live ↗
          </a>
          <Link href="/portfolio" className="btn btn-ghost">← All projects</Link>
        </div>
      </div>

      {/* RELATED */}
      {related.length>0 && (
        <section className="cs-related">
          <div className="cs-related-inner">
            <div className="eyebrow">More work</div>
            <h2>Other projects</h2>
            <div className="cs-related-grid">
              {related.map(r=>(
                <Link href={`/portfolio/${r.slug}`} className="cs-rel-card" key={r.slug}>
                  <div className="cs-rel-mock" style={{ background:r.mockupBg }}/>
                  <div className="cs-rel-info">
                    <span className="cs-tag" style={{ background:industryColour[r.industry]+"22",color:industryColour[r.industry] }}>
                      {r.industry}
                    </span>
                    <strong>{r.name}</strong>
                    <p>{r.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      <section className="cs-cta">
        <div className="eyebrow">Work together</div>
        <h2>Need a site like this?</h2>
        <p className="subline" style={{ maxWidth:460,margin:"12px auto 24px" }}>
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
