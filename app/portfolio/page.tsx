"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { projects, industryColour, Industry } from "./data";
import { ProjectMockup } from "../components/ProjectMockup";

gsap.registerPlugin(ScrollTrigger);

const ALL = "All" as const;
type Filter = typeof ALL | Industry;
const FILTERS: Filter[] = [ALL,"Healthcare","Tourism","Tech","Business","Services","Education","Legal","Finance","Wellness"];

export default function PortfolioPage() {
  const [active, setActive] = useState<Filter>(ALL);
  const gridRef = useRef<HTMLDivElement>(null);

  const visible = active === ALL ? projects : projects.filter(p => p.industry === active);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    const rafCb = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(rafCb); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ph-anim", { y: 40, opacity: 0, stagger: .12, duration: .7, ease: "power3.out" });
      gsap.from(".filter-btn", { y: 16, opacity: 0, stagger: .05, duration: .5, delay: .3, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-card", { y: 36, opacity: 0, stagger: .06, duration: .55, ease: "power3.out" });
    }, gridRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <div className="port-page">
      <div className="noise" />
      <nav className="nav">
        <Link className="nav-logo" href="/">AI</Link>
        <Link href="/#about">About</Link>
        <Link href="/#projects">Projects</Link>
        <Link href="/#contact" className="nav-cta">Hire Me</Link>
      </nav>

      {/* HERO */}
      <header className="port-hero">
        <div className="port-hero-inner">
          <div className="eyebrow ph-anim">Selected work · 2023 – 2025</div>
          <h1 className="port-hero-h1 ph-anim">
            <span className="soft">19 projects.</span><br />Built for real clients.
          </h1>
          <p className="subline ph-anim">
            WordPress websites and WooCommerce stores delivered for clients across UAE, UK, USA, and Pakistan — from custom plugins to full Elementor builds.
          </p>
          <div className="ph-stats ph-anim">
            {[["19","Projects"],["4","Countries"],["3+","Years"],["50+","Delivered"]].map(([v,l]) => (
              <div key={l} className="ph-stat">
                <strong>{v}</strong><span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* FILTERS */}
      <div className="port-filters">
        {FILTERS.map(f => (
          <button key={f} className={`filter-btn${active===f?" filter-btn--on":""}`} onClick={() => setActive(f)}>{f}</button>
        ))}
      </div>

      {/* GRID */}
      <div className="port-grid" ref={gridRef}>
        {visible.map(p => (
          <Link href={`/portfolio/${p.slug}`} className="proj-card" key={p.slug}>
            {/* Mockup */}
            <div className="proj-mock">
              <ProjectMockup
                type={p.mockupType}
                bg={p.mockupBg}
                accent={p.mockupAccent}
                name={p.name}
              />
            </div>
            {/* Info */}
            <div className="proj-info">
              <div className="proj-meta">
                <span className="proj-tag" style={{ background: industryColour[p.industry] + "22", color: industryColour[p.industry] }}>
                  {p.industry}
                </span>
                <span className="proj-loc">{p.location}</span>
                <span className="proj-loc">{p.year}</span>
              </div>
              <h3 className="proj-name">{p.name}</h3>
              <p className="proj-line">{p.tagline}</p>
              <div className="proj-cta">View case study <span>→</span></div>
            </div>
          </Link>
        ))}
      </div>

      {/* FOOTER CTA */}
      <section className="port-footer">
        <div className="eyebrow">Ready to build?</div>
        <h2>Let&apos;s add your project to this list.</h2>
        <div className="actions" style={{ marginTop: 24 }}>
          <a href="mailto:adeeliqbalajum@gmail.com" className="btn btn-dark">✦ Email me</a>
          <Link href="/" className="btn btn-ghost">← Back to home</Link>
        </div>
      </section>
    </div>
  );
}
