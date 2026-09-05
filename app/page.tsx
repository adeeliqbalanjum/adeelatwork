"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cvUrl, siteConfig, withBasePath } from "./site-config";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------
   Stats — reworded to defensible capabilities (master context §13).
   Values are kept short because the v6 stat card renders them at
   ~84px. Pending approval before merge.
   ------------------------------------------------------------------ */
const stats = [
  ["2023", "WordPress since 2023", "Agency and independent WordPress work since 2023 — Nuovo Studios, Rozi Academy and direct clients."],
  ["BIT", "Bachelor of IT", "Superior University Lahore, 2020–2024."],
  ["ACF", "Editable content systems", "ACF and Custom Post Types so clients update content without a developer."],
  ["CWV", "Core Web Vitals", "Caching, image optimisation and plugin audits on live WordPress sites."],
];

const services = [
  {
    title: "WordPress Website Development",
    text: "Your Figma or PSD design, built as an Elementor Pro site your team can edit without calling a developer — responsive, structured with ACF, and handed over clean.",
    tags: ["Figma → Elementor Pro", "ACF", "Responsive"],
    featured: true,
    icon: "layout",
  },
  {
    title: "WooCommerce Stores",
    text: "Checkout bugs, payment issues and clunky product flows cost you orders. I build and fix WooCommerce stores that work on mobile and are easier to run day to day.",
    tags: ["Checkout", "Payments", "Products"],
    icon: "cart",
  },
  {
    title: "Custom WordPress Features",
    text: "When no plugin fits your workflow — tiered booking prices, admin approvals, automated emails — I build it in PHP so the site fits your business, not the other way round.",
    tags: ["PHP", "Custom Plugin", "CPT"],
    icon: "code",
  },
  {
    title: "Speed, QA & Maintenance",
    text: "Slow pages, plugin conflicts, layouts that break after an update. Audits, Core Web Vitals work, migrations, backups and ongoing support for live WordPress sites.",
    tags: ["WP Rocket", "LiteSpeed", "Cloudflare"],
    icon: "bolt",
  },
  {
    title: "Agency & White-Label Development",
    text: "Overflow work for agencies: send the Figma file and brief, get back an editable Elementor/ACF build under your name. NDA-friendly, with clear communication across time zones.",
    tags: ["Subcontract", "Figma handoff", "NDA-friendly"],
    icon: "layers",
  },
];

const workflow = [
  ["01", "Scope", "We agree the goal, audience, pages, functionality, content and launch requirements up front — so nothing surprises you mid-build."],
  ["02", "Build", "Editable Elementor Pro sections, responsive layouts, forms, CTAs and any custom features, built so your team can update them after launch."],
  ["03", "QA", "Every page checked on mobile, tablet and desktop: links, forms, content hierarchy, accessibility basics and loading behaviour."],
  ["04", "Launch", "Deployment, SEO basics, sitemap and metadata, post-launch checks and maintenance notes — so you're never left guessing what happens next."],
];

const testimonials = [
  { name: "Desert Safari Dubai", role: "Custom booking plugin — Dubai, UAE", quote: "Adeel understood the booking flow properly and converted the idea into a clean, mobile-friendly experience. The tiered pricing engine and admin approval workflow worked exactly as we needed.", featured: true },
  { name: "FastDocNow Team", role: "Telehealth platform — USA", quote: "Fast, responsive and clear communication throughout. The final WordPress site made our services easier to understand and helped us present a more trustworthy healthcare brand to US patients." },
  { name: "Griffin Resources", role: "HR platform — USA", quote: "The website structure became much more professional. Services, trust sections, and the inquiry flow were all handled with strong attention to detail. Business has improved since launch." },
  { name: "Pacific Valor Law", role: "Legal website — Okinawa, Japan", quote: "The build felt clean, practical, and conversion-focused. The free case review CTA and credentials section were improved in a way that helps veterans take action immediately." },
  { name: "Rozi Academy", role: "WordPress support — Remote", quote: "Reliable WordPress support, clean Elementor work, and solid troubleshooting across multiple client projects. Adeel is easy to work with when a site needs practical fixes and launch support." },
];

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function Icon({ name }: { name: string }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "layout": return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M8 4v5" /></svg>;
    case "cart": return <svg {...common}><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></svg>;
    case "code": return <svg {...common}><path d="M8 7L3 12l5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>;
    case "bolt": return <svg {...common}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>;
    case "layers": return <svg {...common}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>;
    default: return null;
  }
}

const Star = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.4 6.3 20.5l1.2-6.4L2.8 9.7l6.4-.8z" /></svg>;

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", service: "WordPress website", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormStatus("error");
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry: ${formState.service}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\nService: ${formState.service}\n\nProject details:\n${formState.message}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setFormStatus("success");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ease = "power3.out";
      document.querySelectorAll<HTMLElement>(".scroll-reveal").forEach((item) => {
        gsap.fromTo(item, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease, scrollTrigger: { trigger: item, start: "top 86%", once: true } });
      });
      document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((grid) => {
        const items = Array.from(grid.children) as HTMLElement[];
        gsap.fromTo(items, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.75, ease, stagger: 0.09,
          scrollTrigger: { trigger: grid, start: "top 84%", once: true, onEnter: () => grid.classList.add("is-in") },
        });
      });
      ScrollTrigger.refresh();
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef}>
      <div className="noise" />

      {/* v6 hero — mounted by HomeHeroOptionBMount */}
      <section className="hero flow-section" id="home" />

      {/* v6 about + stats (values reworded, layout/motion unchanged) */}
      <section className="section grey flow-section stats-showcase-section" id="about">
        <div className="container stats-layout flow-inner">
          <aside className="about-card">
            <div>
              <h2>I&apos;m Muhammad Adeel Iqbal</h2>
              <p>A WordPress Developer focused on Elementor Pro builds, WooCommerce stores, custom WordPress features, website maintenance and performance optimization for real business projects.</p>
            </div>
            <a href={`mailto:${siteConfig.email}`} className="about-button"><span className="about-button-text">Work with me</span><span className="mini-avatar"><img src="https://avatars.githubusercontent.com/u/178131381?v=4" alt="Adeel" loading="lazy" decoding="async" /></span></a>
          </aside>
          <div className="stats-grid">
            {stats.map(([value, label, text]) => <div className="stat" key={value}><div className="stat-top"><strong>{value}</strong><span>{label}</span></div><p data-desc={text}>{text}</p></div>)}
          </div>
        </div>
      </section>

      {/* Redesign — Services */}
      <section className="rd-section rd-services flow-section" id="services">
        <div className="rd-container">
          <div className="rd-head scroll-reveal">
            <div>
              <div className="eyebrow">Services</div>
              <h2 className="rd-h2">WordPress services clients actually hire for.</h2>
            </div>
            <p className="rd-lead rd-lead-sm">Bring the design, the brief, or the broken site. You get a WordPress build your team can edit, your customers can use on a phone, and your agency can put its own name on.</p>
          </div>
          <div className="rd-services-grid" data-stagger="true">
            {services.map((s) => (
              <article className={`rd-card rd-service${s.featured ? " rd-service-featured" : ""}`} key={s.title}>
                <div className="rd-service-top">
                  <div className={`rd-service-icon${s.featured ? " rd-service-icon-dark" : ""}`}><Icon name={s.icon} /></div>
                  {s.featured && <span className="rd-chip rd-chip-yellow">Most requested</span>}
                </div>
                <div className="rd-service-body">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <div className="rd-chips">{s.tags.map((t) => <span className="rd-chip" key={t}>{t}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* v6 "Case studies that actually happened" table — mounted by HomeDigitalistsWorkMount */}
      <section className="section flow-section" id="projects" />

      {/* v6 build stack — HomeBuildStackMount inserts after this slot */}
      <div id="stack-slot" />

      {/* Redesign — Process */}
      <section className="rd-section rd-process flow-section" id="workflow">
        <div className="rd-container">
          <div className="rd-head rd-head-solo scroll-reveal">
            <div className="eyebrow">How a project runs</div>
            <h2 className="rd-h2">From Figma file to a launched, editable site.</h2>
            <p className="rd-lead rd-lead-sm">A controlled process, so you know exactly what you're getting before development starts.</p>
          </div>
          <div className="rd-process-grid" data-stagger="true">
            {workflow.map(([number, title, text], i) => (
              <article className={`rd-step${i === 0 ? " is-first" : ""}`} key={number}>
                <span className="rd-step-num">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* v6 stacked-card motion, now showing projects — mounted by HomeTestimonialsMount */}
      <section className="section grey flow-section portfolio-section" id="trust" />

      {/* Redesign — Testimonials */}
      <section className="rd-section rd-testimonials flow-section" id="testimonials">
        <div className="rd-container">
          <div className="rd-head scroll-reveal">
            <div>
              <div className="eyebrow">Client feedback</div>
              <h2 className="rd-h2">What clients say after working together</h2>
            </div>
            <p className="rd-lead rd-lead-sm">Feedback from clients in the UAE, USA, Japan and Pakistan on WordPress builds, WooCommerce work, custom plugins and support.</p>
          </div>
          {testimonials.filter((t) => t.featured).map((t) => (
            <div className="rd-testimonial-main scroll-reveal" key={t.name}>
              <div className="rd-testimonial-quote">
                <div className="rd-stars" aria-label="5 out of 5 stars"><Star /><Star /><Star /><Star /><Star /></div>
                <blockquote>“{t.quote}”</blockquote>
                <div className="rd-author"><span className="rd-author-avatar">{initials(t.name)}</span><div><strong>{t.name}</strong><span>{t.role}</span></div></div>
              </div>
              <div className="rd-testimonial-side">
                <div className="rd-side-card">
                  <div className="rd-kicker">What was built</div>
                  <div className="rd-side-value">Custom booking plugin</div>
                  <div className="rd-side-note">Private / shared tour pricing, add-ons, AED totals, admin approval, Telr payments</div>
                </div>
                <div className="rd-side-card">
                  <div className="rd-kicker">Stack</div>
                  <div className="rd-side-stack">WordPress · Custom PHP Plugin · Elementor Pro · Telr · WooCommerce</div>
                </div>
              </div>
            </div>
          ))}
          <div className="rd-testimonial-grid" data-stagger="true">
            {testimonials.filter((t) => !t.featured).map((t) => (
              <article className="rd-card rd-t-card" key={t.name}>
                <div className="rd-stars rd-stars-sm" aria-label="5 out of 5 stars"><Star /><Star /><Star /><Star /><Star /></div>
                <p>{t.quote}</p>
                <div className="rd-author"><span className="rd-author-avatar">{initials(t.name)}</span><div><strong>{t.name}</strong><span>{t.role}</span></div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Redesign — Contact */}
      <section className="rd-cta-wrap flow-section" id="contact">
        <div className="rd-cta">
          <div className="rd-orb rd-orb-cta-1" aria-hidden="true" />
          <div className="rd-orb rd-orb-cta-2" aria-hidden="true" />
          <div className="rd-cta-inner">
            <div className="rd-cta-copy scroll-reveal">
              <div className="rd-availability"><span className="rd-dot" /><span className="rd-badge-yellow">Available</span><span className="rd-availability-text">Taking new projects</span></div>
              <h2 className="rd-h2 rd-h2-xl">Need a WordPress site your team can <span className="rd-muted">actually edit?</span></h2>
              <p className="rd-lead">Send the Figma file, the brief, or the URL of the site that&apos;s broken. You&apos;ll get a clear reply on scope and next steps — no long forms and no sales call required. The form opens a pre-filled email, or reach me directly.</p>
              <div className="rd-contact-list" data-stagger="true">
                <a href={`mailto:${siteConfig.email}`} className="rd-contact-item"><span className="rd-contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 8l9 6 9-6" /></svg></span><span><small>Email</small>{siteConfig.email}</span></a>
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="rd-contact-item"><span className="rd-contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8L4 20z" /><path d="M9.5 9.5c0 3 2 5 5 5l1-1.5-2-1-.7.7c-.8-.4-1.4-1-1.8-1.8l.7-.7-1-2-1.2 1.3z" /></svg></span><span><small>WhatsApp</small>{siteConfig.phone}</span></a>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="rd-contact-item"><span className="rd-contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg></span><span><small>LinkedIn</small>/in/adeelatwork</span></a>
                <a href={cvUrl} className="rd-contact-item"><span className="rd-contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></svg></span><span><small>CV</small>View resume page</span></a>
              </div>
            </div>

            <form className="rd-contact-form rd-card scroll-reveal" onSubmit={handleSubmit} noValidate>
              <div className="rd-form-row"><label htmlFor="cf-name">Name</label><input id="cf-name" type="text" placeholder="Your name" value={formState.name} required autoComplete="name" onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))} /></div>
              <div className="rd-form-row"><label htmlFor="cf-email">Email</label><input id="cf-email" type="email" placeholder="you@example.com" value={formState.email} required autoComplete="email" onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))} /></div>
              <div className="rd-form-row"><label htmlFor="cf-service">What do you need?</label><select id="cf-service" value={formState.service} onChange={(e) => setFormState((s) => ({ ...s, service: e.target.value }))}><option>WordPress website</option><option>Elementor Pro redesign</option><option>WooCommerce store</option><option>Custom WordPress plugin</option><option>Speed / maintenance</option><option>Agency / white-label work</option></select></div>
              <div className="rd-form-row"><label htmlFor="cf-message">Project details</label><textarea id="cf-message" rows={5} placeholder="Tell me about your project — website type, goals, timeline, budget…" value={formState.message} required onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))} /></div>
              <button type="submit" className="rd-btn rd-btn-dark rd-btn-lg rd-btn-block">Send project details</button>
              <p className={`rd-form-status${formStatus === "success" ? " is-success" : formStatus === "error" ? " is-error" : ""}`} role="status" aria-live="polite">
                {formStatus === "success" && <>Your email app should open with a pre-filled message. You can also email me directly at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</>}
                {formStatus === "error" && "Please add your name, email and a few project details."}
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
