"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { TextRevealByWord } from "./components/TextReveal";
import { ZoomParallax, ParallaxItem } from "./components/ZoomParallax";
import { TextRotate } from "./components/TextRotate";

gsap.registerPlugin(ScrollTrigger);

/* ─── data ──────────────────────────────────────────────────── */
const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

const cards = [
  ["Desert Safari Dubai",  "Custom booking plugin — tiered pricing, admin approvals & payment gateway.",  "shape-a"],
  ["Embassy of Pakistan",  "Official government website with real-time passport tracking system.",        "shape-b"],
  ["Figma to WordPress",   "Pixel-perfect Elementor builds from designer files for agency clients.",      "thumbs"],
  ["WooCommerce Store",    "Full e-commerce setup for a Dubai lighting company.",                         "shape-c"],
  ["Custom Booking Plugin","Tiered pricing, admin approvals, automated emails & WhatsApp fields.",        "shape-d"],
  ["Landing Pages",        "High-converting Elementor pages for UAE, UK & USA clients.",                  "shape-a"],
  ["Website Rebuilds",     "Full redesigns turning outdated sites into fast modern platforms.",           "shape-b"],
];

const stats = [
  ["3+",      "years",    "Hands-on WordPress, WooCommerce & Elementor Pro for international clients."],
  ["50+",     "projects", "Business, e-commerce, education & custom WordPress builds delivered."],
  ["20+",     "builds",   "Figma & PSD designs converted into responsive, pixel-perfect WordPress sites."],
  ["6s→1.8s", "speed",    "Load-time cuts via cache, image optimisation, plugin auditing & Core Web Vitals."],
];

const parallaxItems: ParallaxItem[] = [
  { label: "Desert Safari Dubai",  sub: "Custom Booking Plugin",  gradient: "linear-gradient(135deg,rgba(255,122,24,.96),rgba(255,214,74,.82))"  },
  { label: "Embassy of Pakistan",  sub: "Government Website",     gradient: "linear-gradient(135deg,rgba(168,85,247,.92),rgba(34,197,94,.50))"   },
  { label: "Figma → WordPress",    sub: "20+ Agency Builds",      gradient: "linear-gradient(135deg,rgba(34,197,94,.92),rgba(230,255,230,.88))"  },
  { label: "WooCommerce Store",    sub: "E-commerce Dubai",       gradient: "linear-gradient(135deg,rgba(255,122,24,.88),rgba(168,85,247,.60))"  },
  { label: "Custom Plugins",       sub: "Plugin Development",     gradient: "linear-gradient(135deg,rgba(11,11,11,.88),rgba(255,122,24,.48))"    },
  { label: "Landing Pages",        sub: "UAE · UK · USA Clients", gradient: "linear-gradient(135deg,rgba(247,214,74,.92),rgba(255,122,24,.72))"  },
  { label: "6s → 1.8s Speed",     sub: "Core Web Vitals",        gradient: "linear-gradient(135deg,rgba(34,197,94,.86),rgba(11,11,11,.75))"     },
];

const contactServices = ["website", "WooCommerce store", "redesign", "custom plugin"];

/* ─── component ─────────────────────────────────────────────── */
export default function Home() {
  const gradientRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const mainRef     = useRef<HTMLElement>(null);

  /* ── Lenis smooth scroll ─────────────────────────────────── */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    /* Keep ScrollTrigger in sync — correct reference kept for cleanup */
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    /* Drive Lenis from GSAP ticker for consistent timing */
    const rafCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(rafCb);
      lenis.destroy();
    };
  }, []);

  /* ── All GSAP animations in ONE context ─────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 1 ▸ Hero entrance — stagger in on mount */
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".ha-pill",     { y: -20, opacity: 0, duration: 0.55 })
        .from(".ha-h1",       { y: 48,  opacity: 0, duration: 0.80 }, "-=0.30")
        .from(".ha-sub",      { y: 28,  opacity: 0, duration: 0.70 }, "-=0.52")
        .from(".ha-actions",  { y: 20,  opacity: 0, duration: 0.60 }, "-=0.44")
        .from(".ha-showcase", { y: 36,  opacity: 0, duration: 0.80, scale: 0.98 }, "-=0.48");

      /* 2 ▸ FlowArt — each non-hero section rotates from slight angle on scroll */
      document.querySelectorAll<HTMLElement>(".flow-section:not(.hero) .flow-inner")
        .forEach((inner) => {
          gsap.fromTo(inner,
            { rotationZ: 4, rotationX: 1.5, opacity: 0.55, transformOrigin: "bottom left" },
            {
              rotationZ: 0, rotationX: 0, opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: inner.parentElement,
                start: "top 88%",
                end:   "top 22%",
                scrub: 0.7,
              },
            }
          );
        });

      /* 3 ▸ About card slides from left */
      gsap.from(".about-card", {
        x: -40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".about-card", start: "top 82%" },
      });

      /* 4 ▸ Stats stagger up */
      gsap.from(".stat", {
        y: 36, opacity: 0, duration: 0.65, stagger: 0.10, ease: "power3.out",
        scrollTrigger: { trigger: ".stats-grid", start: "top 80%" },
      });

      /* 5 ▸ Project cards stagger up */
      gsap.from(".project", {
        y: 52, opacity: 0, duration: 0.70, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".project-cards", start: "top 80%" },
      });

      /* 6 ▸ Contact elements */
      gsap.from(".contact-anim", {
        y: 28, opacity: 0, duration: 0.70, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: "#contact", start: "top 78%" },
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  /* ── Pointer glow + portrait tilt ───────────────────────── */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      gradientRef.current?.style.setProperty("--mx", `${x}%`);
      gradientRef.current?.style.setProperty("--my", `${y}%`);

      if (portraitRef.current) {
        const r  = portraitRef.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width  - 0.5;
        const py = (e.clientY - r.top)  / r.height - 0.5;
        if (e.clientY < window.innerHeight * 0.9) {
          portraitRef.current.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
          portraitRef.current.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
        }
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* ── IntersectionObserver for .scroll-reveal elements ───── */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ─── JSX ──────────────────────────────────────────────── */
  return (
    <main ref={mainRef}>
      <div className="noise" />

      {/* NAV */}
      <nav className="nav" aria-label="Primary navigation">
        <a className="nav-logo" href="#home" aria-label="Muhammad Adeel home">AI</a>
        <a href="/portfolio">Portfolio</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact" className="nav-cta">Hire Me</a>
      </nav>

      {/* ── HERO ── */}
      <section className="hero flow-section" id="home">
        <div className="gradient-stage" ref={gradientRef} aria-hidden="true">
          <div className="gblob orange" />
          <div className="gblob purple" />
          <div className="gblob green" />
          <div className="pointer-glow" />
        </div>

        <div className="hero-inner flow-inner">
          <div className="status-pill ha-pill">
            <strong>Available</strong> for new projects — UAE · UK · USA
          </div>

          <h1 className="ha-h1">
            <span className="soft">WordPress developer</span>{" "}
            building fast, high&#8209;impact websites
          </h1>

          <p className="subline ha-sub">
            I build and redesign WordPress &amp; WooCommerce websites for businesses in
            the UAE, UK, and USA — from Figma to pixel-perfect, conversion-ready sites.
          </p>

          <div className="actions ha-actions">
            <a className="btn btn-dark" href="mailto:adeeliqbalajum@gmail.com">✦ Let&apos;s talk</a>
            <a className="btn btn-ghost" href="#projects">Browse work</a>
          </div>

          <div className="showcase ha-showcase" aria-label="Portfolio preview">
            <div className="showcase-haze" />
            <div className="strip" aria-hidden="true">
              {cards.map(([title, desc, shape]) => (
                <article className="site-card" key={title as string}>
                  <div className="browser"><i /><i /><i /></div>
                  <div className="site-body">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    {shape === "thumbs"
                      ? <div className="thumb-row"><span /><span /><span /></div>
                      : <div className={`site-shape ${shape}`} />}
                  </div>
                </article>
              ))}
            </div>
            <div className="portrait-card" ref={portraitRef}>
              <img src={portraitDataUrl} alt="Muhammad Adeel Iqbal" className="portrait-img" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section grey flow-section" id="about">
        <div className="container stats-layout flow-inner">
          <aside className="about-card">
            <div>
              <h2>I&apos;m Muhammad Adeel Iqbal</h2>
              <p>
                A WordPress Developer specialising in building, redesigning, and improving
                websites for international clients in UAE, UK, and USA — Elementor Pro,
                WooCommerce stores, custom plugins, and Figma-to-WordPress builds.
              </p>
            </div>
            <a href="mailto:adeeliqbalajum@gmail.com" className="about-button">
              Work with me{" "}
              <span className="mini-avatar">
                <img src={portraitDataUrl} alt="Adeel" />
              </span>
            </a>
          </aside>

          <div className="stats-grid">
            {stats.map(([value, label, text]) => (
              <div className="stat" key={value as string}>
                <div className="stat-top">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZOOM PARALLAX (desktop only — hidden on mobile via CSS) ── */}
      <ZoomParallax items={parallaxItems} />

      {/* ── PROJECTS ── */}
      <section className="section flow-section" id="projects">
        <div className="flow-inner">
          <div className="projects-head">
            <div className="eyebrow scroll-reveal">Real work, real clients</div>
          </div>

          {/* Word-by-word heading reveal */}
          <TextRevealByWord text="Projects I've built and delivered" />

          <div className="container projects-head" style={{ paddingTop: 0 }}>
            <div className="project-board">
              <div className="project-cards">
                {[
                  { num:"01",cat:"Dubai Tourism",   title:"Desert Safari Dubai",      slug:"desert-safari-dubai",         desc:"Custom booking plugin with tiered AED pricing, admin approval workflow, and Telr payment integration." },
                  { num:"02",cat:"Government",       title:"Embassy of Pakistan",       slug:"",                             desc:"Official government website — Elementor + ACF, plus a custom PHP passport application tracking system." },
                  { num:"03",cat:"Healthcare",       title:"GetCareMD",                 slug:"getcaremd",                    desc:"24/7 telehealth platform with service pages, provider credentials, and conversion-focused booking flow." },
                  { num:"04",cat:"Legal",            title:"Pacific Valor Law",         slug:"pacific-valor-law",            desc:"VA disability attorney site for overseas veterans — free case review CTA and VA-accredited credentials." },
                  { num:"05",cat:"Education",        title:"7 Sky Consultant",          slug:"7sky-consultant",              desc:"Study abroad consultancy showcasing a 98% visa success rate and 94% scholarship placement record." },
                  { num:"06",cat:"Finance",          title:"Seva Wealth",               slug:"seva-wealth",                  desc:"Wealth management site with Calendly integration, philosophy-driven design, and trust-heavy credentials." },
                ].map(({ num, cat, title, slug, desc }) =>
                  slug ? (
                    <a key={num} href={`/portfolio/${slug}`} className="project project--linked">
                      <small>{num} — {cat}</small>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                      <span className="project-arrow">View case study →</span>
                    </a>
                  ) : (
                    <article key={num} className="project">
                      <small>{num} — {cat}</small>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </article>
                  )
                )}
              </div>
            </div>
            {/* View all projects */}
            <div style={{ textAlign:"center", marginTop: 36 }}>
              <a href="/portfolio" className="btn btn-dark" style={{ display:"inline-flex" }}>
                View all 19 projects →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section grey flow-section" id="contact">
        <div className="container projects-head flow-inner">
          <div className="eyebrow contact-anim">Let&apos;s build together</div>

          <h2 className="contact-anim contact-h2">
            Have a WordPress{" "}
            <span className="contact-rotate">
              <TextRotate texts={contactServices} interval={2400} />
            </span>{" "}
            ready to build?
          </h2>

          <p className="subline contact-anim" style={{ maxWidth: 520, margin: "16px auto 0" }}>
            Whether you need a new site, a redesign, a WooCommerce store, or a custom plugin —
            send a message and I&apos;ll respond within a few hours.
          </p>

          <div className="actions contact-anim" style={{ marginTop: 28 }}>
            <a className="btn btn-dark" href="mailto:adeeliqbalajum@gmail.com">Email me</a>
            <a className="btn btn-ghost" href="https://linkedin.com/in/adeelatwork/"
              target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </section>
    </main>
  );
}
