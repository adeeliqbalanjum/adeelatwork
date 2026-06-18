"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { projects, industryColour, Industry } from "./data";

const ALL = "All" as const;
type Filter = typeof ALL | Industry;
const FILTERS: Filter[] = [ALL, "Healthcare", "Tourism", "Tech", "Business", "Services", "Education", "Legal", "Finance", "Wellness"];

/* ── Browser Mockup ─────────────────────────────────────── */
function BrowserMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div className="mock-wrap">
      <div className="mock-chrome">
        <span className="mock-dot" style={{ background:"#ff5f57" }}/>
        <span className="mock-dot" style={{ background:"#ffbd2e" }}/>
        <span className="mock-dot" style={{ background:"#28ca41" }}/>
        <div className="mock-url"><span style={{opacity:.55}}>🔒 www.project.com</span></div>
      </div>
      <div className="mock-body" style={{ background: bg }}>
        <div className="mock-shine"/>
        <div className="mock-nav" style={{ background: accent }}>
          <div style={{ height:8, width:44, borderRadius:4, background:"rgba(255,255,255,.55)" }}/>
          <div style={{ display:"flex", gap:5, marginLeft:"auto" }}>
            {[36,28,24,28].map((w,i)=>(
              <div key={i} style={{ height:6, width:w, borderRadius:3, background:"rgba(255,255,255,.30)" }}/>
            ))}
          </div>
        </div>
        <div style={{ padding:"14px 16px 8px" }}>
          <div style={{ height:12, width:"62%", borderRadius:5, background:"rgba(255,255,255,.80)", marginBottom:7 }}/>
          <div style={{ height:8,  width:"44%", borderRadius:4, background:"rgba(255,255,255,.50)", marginBottom:4 }}/>
          <div style={{ height:8,  width:"34%", borderRadius:4, background:"rgba(255,255,255,.36)", marginBottom:12 }}/>
          <div style={{ display:"flex", gap:7 }}>
            <div style={{ height:20, width:58, borderRadius:10, background:"rgba(255,255,255,.80)" }}/>
            <div style={{ height:20, width:46, borderRadius:10, background:"rgba(255,255,255,.26)" }}/>
          </div>
        </div>
        <div style={{ display:"flex", gap:7, padding:"6px 14px" }}>
          {[1,2,3].map(i=>(
            <div key={i} style={{ flex:1, height:38, borderRadius:8, background:accent, opacity:.65 }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */
export default function PortfolioPage() {
  const [active, setActive]   = useState<Filter>(ALL);
  const gridRef               = useRef<HTMLDivElement>(null);

  const visible = active === ALL ? projects : projects.filter(p => p.industry === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".port-hero-line", { y:40, opacity:0, stagger:.12, duration:.7, ease:"power3.out" });
      gsap.from(".filter-btn",     { y:16, opacity:0, stagger:.05, duration:.5, delay:.28, ease:"power3.out" });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-card", { y:36, opacity:0, stagger:.06, duration:.55, ease:"power3.out" });
    }, gridRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <div className="port-page">
      <div className="noise"/>

      <nav className="nav">
        <Link className="nav-logo" href="/">AI</Link>
        <Link href="/#about">About</Link>
        <Link href="/#projects">Projects</Link>
        <Link href="/#contact" className="nav-cta">Hire Me</Link>
      </nav>

      <header className="port-hero">
        <div className="port-hero-inner">
          <div className="eyebrow port-hero-line">Selected work · 2023 – 2025</div>
          <h1 className="port-hero-h1 port-hero-line">
            <span className="soft">19 projects.</span><br/>Built for real clients.
          </h1>
          <p className="subline port-hero-line">
            WordPress websites and WooCommerce stores delivered for clients across UAE, UK, USA, and Pakistan — from custom plugins to full Elementor builds.
          </p>
        </div>
      </header>

      <div className="port-filters">
        {FILTERS.map(f => (
          <button key={f} className={`filter-btn${active===f?" filter-btn--on":""}`} onClick={()=>setActive(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="port-grid" ref={gridRef}>
        {visible.map(p => (
          <Link href={`/portfolio/${p.slug}`} className="proj-card" key={p.slug}>
            <div className="proj-mock">
              <BrowserMockup bg={p.mockupBg} accent={p.mockupAccent}/>
            </div>
            <div className="proj-info">
              <div className="proj-meta">
                <span className="proj-tag" style={{ background:industryColour[p.industry]+"22", color:industryColour[p.industry] }}>
                  {p.industry}
                </span>
                <span className="proj-loc">{p.location}</span>
              </div>
              <h3 className="proj-name">{p.name}</h3>
              <p className="proj-line">{p.tagline}</p>
              <div className="proj-cta">View case study <span>→</span></div>
            </div>
          </Link>
        ))}
      </div>

      <section className="port-footer">
        <div className="eyebrow">Ready to build?</div>
        <h2>Let&apos;s add your project to this list.</h2>
        <div className="actions" style={{ marginTop:24 }}>
          <a href="mailto:adeeliqbalajum@gmail.com" className="btn btn-dark">✦ Email me</a>
          <Link href="/" className="btn btn-ghost">← Back to home</Link>
        </div>
      </section>
    </div>
  );
}
