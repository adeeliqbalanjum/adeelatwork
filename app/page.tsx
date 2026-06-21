"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextRevealByWord } from "./components/TextReveal";
import { ZoomParallax, ParallaxItem } from "./components/ZoomParallax";
import { TextRotate } from "./components/TextRotate";

gsap.registerPlugin(ScrollTrigger);

/* ─── data ──────────────────────────────────────────────────── */
const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

const cards = [
  ["Desert Safari Dubai",    "Custom booking plugin — tiered AED pricing, admin approvals & Telr payment.", "shape-a"],
  ["Embassy of Pakistan",    "Official government website with real-time passport tracking system.",         "shape-b"],
  ["FastDocNow",             "24/7 telehealth platform with HIPAA-compliant messaging & booking flow.",     "thumbs"],
  ["Artisan Technologies",   "Smart home automation site — residential & commercial service split.",         "shape-c"],
  ["Pacific Valor Law",      "VA disability attorney site for overseas veterans — Okinawa, Japan.",          "shape-d"],
  ["Griffin Resources",      "HR outsourcing platform with lead-gen CTAs and consultation flow.",            "shape-a"],
  ["Relocrate",              "Eco-friendly moving crate rental site for Denver, Colorado.",                  "shape-b"],
];

const stats = [
  ["3+",      "Years WordPress",    "Hands-on WordPress, WooCommerce & Elementor Pro for international clients."],
  ["50+",     "Projects Delivered", "Business, e-commerce, education & custom WordPress builds delivered."],
  ["20+",     "Figma Builds",       "Figma & PSD designs converted into responsive, pixel-perfect WordPress sites."],
  ["6s→1.8s", "Speed Result",       "Load-time cuts via cache, image optimisation, plugin auditing & Core Web Vitals."],
];

const parallaxItems: ParallaxItem[] = [
  { label: "Desert Safari Dubai",  sub: "Custom Booking Plugin",  gradient: "linear-gradient(135deg,rgba(255,122,24,.96),rgba(255,214,74,.82))"  },
  { label: "Embassy of Pakistan",  sub: "Government Website",     gradient: "linear-gradient(135deg,rgba(168,85,247,.92),rgba(34,197,94,.50))"   },
  { label: "Figma → WordPress",    sub: "20+ Agency Builds",      gradient: "linear-gradient(135deg,rgba(34,197,94,.92),rgba(230,255,230,.88))"  },
  { label: "WooCommerce Store",    sub: "E-commerce Dubai",       gradient: "linear-gradient(135deg,rgba(255,122,24,.88),rgba(168,85,247,.60))"  },
  { label: "Custom Plugins",       sub: "Plugin Development",     gradient: "linear-gradient(135deg,rgba(11,11,11,.88),rgba(255,122,24,.48))"    },
  { label: "Landing Pages",        sub: "UAE · UK · USA Clients", gradient: "linear-gradient(135deg,rgba(247,214,74,.92),rgba(255,122,24,.72))"  },
  { label: "6s → 1.8s Speed",      sub: "Core Web Vitals",        gradient: "linear-gradient(135deg,rgba(34,197,94,.86),rgba(11,11,11,.75))"     },
];

const pluginLabs = [
  {
    title: "Booking Price Engine",
    tag: "Booking plugin demo",
    copy: "A live-style booking flow that can calculate private/shared tours, adults, children, add-ons, and payment method logic.",
    demo: "Dynamic price calculator",
    proves: "You can build real business logic, not only Elementor pages.",
  },
  {
    title: "WooCommerce Logic Lab",
    tag: "Store functionality demo",
    copy: "Show custom product rules, add-on pricing, cart notices, conditional fees, checkout fields, and order-management improvements.",
    demo: "Cart/checkout logic preview",
    proves: "You understand e-commerce workflows and client revenue flows.",
  },
  {
    title: "Search & Filter Lab",
    tag: "Directory/search demo",
    copy: "A demo for CPT filters, service directories, practitioner maps, AJAX search, and custom field-based results.",
    demo: "Filterable results UI",
    proves: "You can build content-heavy WordPress systems clients can manage.",
  },
];

const services = [
  {
    title: "Elementor Pro Websites",
    copy: "Pixel-perfect, responsive, editable pages built from Figma, screenshots, or brand direction.",
    deliverable: "Landing pages, corporate websites, service pages, blogs, templates.",
  },
  {
    title: "WooCommerce Stores",
    copy: "Online stores with clean product structure, checkout improvements, speed fixes, and conversion-focused layouts.",
    deliverable: "Product pages, cart, checkout, payment setup, custom fields.",
  },
  {
    title: "Custom WordPress Plugins",
    copy: "Business-specific tools when normal plugins cannot handle the workflow properly.",
    deliverable: "Booking systems, dashboards, forms, pricing logic, admin tools.",
  },
  {
    title: "Speed & UX Optimization",
    copy: "Performance cleanup for slow WordPress sites without destroying design or functionality.",
    deliverable: "Cache setup, image optimization, plugin audit, Core Web Vitals fixes.",
  },
];

const experience = [
  ["Current", "WordPress Developer", "Full-time WordPress development work with international client projects, QA, Elementor, CPTs, plugin fixes, and speed work."],
  ["50+", "Delivered Builds", "Business websites, healthcare sites, booking platforms, WooCommerce stores, legal websites, and consultancy pages."],
  ["Stack", "WordPress System Builder", "Elementor Pro, WooCommerce, ACF, CPT UI, PHP snippets, CSS, JS, GSAP, forms, search/filter, and custom workflows."],
];

const processSteps = [
  ["01", "Understand", "I clarify the client goal, business model, page structure, features, references, and conversion path."],
  ["02", "Plan", "I map the sections, WordPress stack, required plugins, custom logic, responsiveness, and editing needs."],
  ["03", "Build", "I create the UI, responsive layouts, WordPress templates, forms, animations, and functionality."],
  ["04", "Polish", "I test mobile, speed, forms, links, edge cases, browser behavior, and final handover details."],
];

const trustSignals = [
  ["International clients", "Experience with UAE, UK, and USA-focused websites and business requirements."],
  ["Editable WordPress builds", "The final website remains manageable for the client instead of being locked into hard-coded sections."],
  ["Functionality-first", "Booking systems, WooCommerce logic, filters, forms, and dashboards prove real technical capability."],
  ["Performance aware", "Speed, responsiveness, and clean UX are treated as part of the build, not an afterthought."],
];

const contactServices = ["website", "WooCommerce store", "redesign", "custom plugin"];

/* ─── component ─────────────────────────────────────────────── */
export default function Home() {
  const gradientRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const mainRef     = useRef<HTMLElement>(null);

  /* ── Contact form state ──────────────────────────────────── */
  // TODO: Sign up at formspree.io, create a form, paste your form ID below
  const FORMSPREE_ID = "YOUR_FORM_ID";
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

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
      document.querySelectorAll<HTMLElement>(".flow-section:not(.hero):not(.stats-showcase-section) .flow-inner")
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

      /* 4 ▸ Stats cards reveal one by one on scroll without changing layout */
      const statCards = gsap.utils.toArray<HTMLElement>(".stats-showcase-section .stat");
      if (statCards.length) {
        gsap.set(statCards, {
          y: 58,
          scale: 0.96,
          opacity: 0,
          filter: "blur(2px)",
          transformOrigin: "center bottom",
          force3D: true,
        });

        ScrollTrigger.batch(statCards, {
          start: "top 86%",
          once: false,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.72,
              ease: "power3.out",
              stagger: 0.16,
              overwrite: true,
              clearProps: "transform,filter",
            });
          },
          onLeaveBack: (batch) => {
            gsap.to(batch, {
              y: 46,
              scale: 0.97,
              opacity: 0,
              filter: "blur(2px)",
              duration: 0.38,
              ease: "power2.out",
              stagger: 0.08,
              overwrite: true,
            });
          },
        });
      }

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

      ScrollTrigger.refresh();
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
        <a className="nav-logo" href="#home" aria-label="Muhammad Adeel home">MA</a>
        <Link href="/portfolio">Portfolio</Link>
        <a href="#features">Features</a>
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
      <section className="section grey flow-section stats-showcase-section" id="about">
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
              <span className="about-button-text">Work with me</span>
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

      <div id="features">
        <ZoomParallax items={parallaxItems} />
      </div>

      {/* ── PROJECTS ── */}
      <section className="section flow-section" id="projects">
        <div className="flow-inner">
          <div className="projects-head">
            <div className="eyebrow scroll-reveal">Real work, real clients</div>
          </div>

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
                    <Link key={num} href={`/portfolio/${slug}`} className="project project--linked">
                      <small>{num} — {cat}</small>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                      <span className="project-arrow">View case study →</span>
                    </Link>
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
            <div style={{ textAlign:"center", marginTop: 36 }}>
              <Link href="/portfolio" className="btn btn-dark" style={{ display:"inline-flex" }}>
                View all 19 projects →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLUGIN LAB ── */}
      <section className="section grey flow-section portfolio-section" id="plugin-lab">
        <div className="container flow-inner">
          <div className="section-head scroll-reveal">
            <div className="eyebrow">Plugin Lab</div>
            <h2>Live-style demos that prove functionality</h2>
            <p>These modules show the kind of real WordPress systems I can build for clients, not only visual sections.</p>
          </div>

          <div className="lab-grid">
            {pluginLabs.map((item, index) => (
              <article className="lab-card scroll-reveal" key={item.title}>
                <small>0{index + 1} — {item.tag}</small>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <div className="lab-demo">
                  <span>{item.demo}</span>
                  <strong>{item.proves}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section flow-section portfolio-section" id="services">
        <div className="container flow-inner">
          <div className="section-head scroll-reveal">
            <div className="eyebrow">Services</div>
            <h2>Clear offers for business clients</h2>
            <p>Every service is packaged around what clients actually need: clean UI, responsive pages, working features, and measurable quality.</p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card scroll-reveal" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <span>{service.deliverable}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / EXPERIENCE ── */}
      <section className="section grey flow-section portfolio-section" id="experience">
        <div className="container flow-inner experience-wrap">
          <div className="section-head section-head--left scroll-reveal">
            <div className="eyebrow">About / Experience</div>
            <h2>WordPress work with client delivery in mind</h2>
            <p>I focus on editable builds, custom business logic, performance, and clear handover so the final site is useful after launch.</p>
          </div>

          <div className="experience-list">
            {experience.map(([label, title, copy]) => (
              <article className="experience-row scroll-reveal" key={title}>
                <strong>{label}</strong>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section flow-section portfolio-section" id="process">
        <div className="container flow-inner">
          <div className="section-head scroll-reveal">
            <div className="eyebrow">Process</div>
            <h2>How I move from idea to polished launch</h2>
            <p>A simple build process helps clients understand what is happening and keeps the project controlled from start to finish.</p>
          </div>

          <div className="process-grid">
            {processSteps.map(([num, title, copy]) => (
              <article className="process-card scroll-reveal" key={num}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS / TRUST ── */}
      <section className="section grey flow-section portfolio-section" id="trust">
        <div className="container flow-inner">
          <div className="section-head scroll-reveal">
            <div className="eyebrow">Trust</div>
            <h2>Why a client should feel safe hiring me</h2>
            <p>Every signal here is grounded in real project delivery — international clients, editable builds, and technical depth proven through 19 documented case studies.</p>
          </div>

          <div className="trust-grid">
            {trustSignals.map(([title, copy]) => (
              <article className="trust-card scroll-reveal" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
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

          <form className="contact-form contact-anim" onSubmit={handleSubmit} noValidate>
            <div className="contact-row">
              <div className="contact-field">
                <label htmlFor="cf-name">Name</label>
                <input
                  id="cf-name"
                  type="text"
                  className="contact-input"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  required
                />
              </div>
              <div className="contact-field">
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  type="email"
                  className="contact-input"
                  placeholder="you@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                className="contact-textarea"
                placeholder="Tell me about your project — type of site, goals, timeline, budget…"
                value={formState.message}
                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                required
              />
            </div>

            {formStatus === "success" && (
              <p className="contact-form-status success">✓ Message sent — I&apos;ll reply within a few hours.</p>
            )}
            {formStatus === "error" && (
              <p className="contact-form-status error">
                Something went wrong. Email me directly at{" "}
                <a href="mailto:adeeliqbalajum@gmail.com">adeeliqbalajum@gmail.com</a>
              </p>
            )}

            <div className="contact-actions">
              <button
                type="submit"
                className="btn btn-dark"
                disabled={formStatus === "sending"}
              >
                {formStatus === "sending" ? "Sending…" : "✦ Send message"}
              </button>
              <a
                className="btn btn-ghost"
                href="https://linkedin.com/in/adeelatwork/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
