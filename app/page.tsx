"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { TextRevealByWord } from "./components/TextReveal";
import { ZoomParallax, ParallaxItem } from "./components/ZoomParallax";
import { TextRotate } from "./components/TextRotate";

gsap.registerPlugin(ScrollTrigger);

/* ─── data ──────────────────────────────────────────────────── */
const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";
const upworkUrl = "https://www.upwork.com/freelancers/~015c368d6586ba4860?mp_source=share";

const cards = [
  ["Desert Safari Dubai", "Custom booking plugin — tiered pricing, admin approvals and payment integration.", "shape-a"],
  ["Embassy of Pakistan", "Official government website with real-time passport tracking system.", "shape-b"],
  ["Figma to WordPress", "Pixel-perfect Elementor builds from designer files for agency clients.", "thumbs"],
  ["WooCommerce Store", "Full e-commerce setup for Dubai lighting company — products, orders, payments.", "shape-c"],
  ["Booking Plugin", "Tiered pricing, admin approvals, automated emails and WhatsApp fields.", "shape-d"],
  ["Landing Pages", "High-converting Elementor pages for UAE, UK and USA businesses.", "shape-a"],
  ["Website Rebuilds", "Full redesigns turning outdated sites into fast, modern platforms.", "shape-b"],
];

const heroTags = [
  "WordPress Development",
  "Elementor Pro",
  "WooCommerce",
  "Bug Fixing",
  "Speed Optimization",
  "Maintenance",
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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    return () => document.documentElement.removeAttribute("data-theme");
  }, [theme]);

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
        .from(".hero-tags",   { y: 20,  opacity: 0, duration: 0.55 }, "-=0.42")
        .from(".ha-actions",  { y: 20,  opacity: 0, duration: 0.60 }, "-=0.44")
        .from(".ha-showcase", { y: 36,  opacity: 0, duration: 0.80, scale: 0.98 }, "-=0.48");

      gsap.from(".site-card", {
        y: 36,
        opacity: 0,
        rotate: (index) => index % 2 === 0 ? -2 : 2,
        duration: 0.65,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.25,
      });

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
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
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
            <strong>Available</strong> for new projects
          </div>

          <h1 className="ha-h1">
            <span className="soft">WordPress developer</span>{" "}
            building fast, high-impact websites
          </h1>

          <p className="subline ha-sub">
            I build and redesign WordPress & WooCommerce websites for businesses — from Figma designs to pixel-perfect, conversion-ready sites.
          </p>

          <div className="hero-tags" aria-label="Core services">
            {heroTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>

          <div className="actions ha-actions">
            <a className="btn btn-dark" href={upworkUrl} target="_blank" rel="noopener noreferrer">✦ Hire me on Upwork</a>
            <a className="btn btn-ghost" href="#projects">Browse work</a>
          </div>

          <div className="showcase ha-showcase" aria-label="Portfolio preview carousel">
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
                websites for international clients. From Figma to pixel-perfect Elementor builds,
                WooCommerce stores to custom plugins — I deliver on time, every time.
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
                <article className="project">
                  <small>01 — Dubai Tourism</small>
                  <h3>Desert Safari Dubai</h3>
                  <p>Custom booking plugin with Private/Sharing tour tabs, tiered AED pricing, WhatsApp fields, admin approval workflow, and Telr payment integration.</p>
                </article>
                <article className="project">
                  <small>02 — Government</small>
                  <h3>Embassy of Pakistan</h3>
                  <p>Official government website for the Embassy in Muscat, Oman — Elementor + ACF, plus a custom PHP passport application tracking system.</p>
                </article>
                <article className="project">
                  <small>03 — E-commerce</small>
                  <h3>ESNCO Lighting Dubai</h3>
                  <p>WooCommerce store management for a Dubai lighting company — products, orders, content, migration, and consistent uptime.</p>
                </article>
                <article className="project">
                  <small>04 — Performance</small>
                  <h3>6s to 1.8s load time</h3>
                  <p>Speed-focused optimisation achieving 95+ PageSpeed — LiteSpeed Cache, image compression, plugin auditing, and Core Web Vitals fixes.</p>
                </article>
                <article className="project">
                  <small>05 — Agency Builds</small>
                  <h3>20+ Figma to WordPress</h3>
                  <p>Pixel-perfect Figma and PSD to WordPress conversions — Elementor Pro, mobile-responsive, on time, every time.</p>
                </article>
                <article className="project">
                  <small>06 — Partnership Page</small>
                  <h3>US Supply Chain Corp</h3>
                  <p>Self-contained partnership page with dark/light theming, scroll animations, and zero dependencies — Elementor HTML widget.</p>
                </article>
              </div>
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
