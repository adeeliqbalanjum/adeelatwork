import Link from "next/link";
import { siteConfig } from "../site-config";
import { cardImage, monogram } from "../portfolio/images";
import { InnerFooterCta } from "../components/InnerFooterCta";

export const metadata = {
  title: "CV — Muhammad Adeel Iqbal | WordPress & WooCommerce Developer",
  description: "Muhammad Adeel Iqbal CV: WordPress developer specialising in Elementor Pro, WooCommerce, custom PHP, ACF/CPT architecture, website maintenance and performance optimisation.",
};

const coreSkills = ["WordPress", "WooCommerce", "Elementor Pro", "PHP", "ACF", "Custom Post Types"];
const buildSkills = ["Figma → WordPress", "PSD → WordPress", "HTML", "CSS", "JavaScript"];
const supportSkills = ["WP Rocket", "LiteSpeed Cache", "Cloudflare", "Yoast SEO", "WPForms", "cPanel", "Migrations", "Core Web Vitals"];

/* Experience — matches the master context exactly. No invented dates, counts or results. */
const experience = [
  {
    role: "WordPress & WooCommerce Developer",
    company: "Self-employed · Freelance",
    period: "Current",
    current: true,
    points: [
      "Direct client and agency-overflow work: Elementor Pro builds, WooCommerce stores, custom PHP features, fixes, migrations and maintenance.",
      "Case studies for Desert Safari Dubai, FastDocNow, Griffin IT, Griffin Resources and others are on this site.",
    ],
  },
  {
    role: "WordPress Developer (Remote)",
    company: "Rozi Academy",
    period: "Dec 2024 – Apr 2026",
    points: [
      "Developed and maintained WordPress websites with Elementor Pro, WooCommerce, ACF, CPT, PHP, HTML, CSS and JavaScript.",
      "Built custom features: booking functionality, admin approval workflows, automated email notifications and dynamic content sections.",
      "Delivered responsive Elementor sites across tourism, education, business and e-commerce clients.",
      "Fixed plugin conflicts, WooCommerce issues, layout problems and production bugs across multiple client sites.",
      "Speed, Core Web Vitals and SEO work: caching, image optimisation and plugin audits on live sites.",
    ],
  },
  {
    role: "WordPress Developer (Remote)",
    company: "Nuovo Studios",
    period: "Apr 2023 – Dec 2024",
    points: [
      "Converted Figma and PSD designs into pixel-accurate, mobile-responsive WordPress websites.",
      "Optimised WooCommerce checkout flow and store architecture for e-commerce clients.",
      "Executed website migrations including database transfers, domain, SSL and post-launch testing.",
      "Maintained live production websites across multiple industries.",
    ],
  },
];

const selected = [
  { slug: "desert-safari-dubai", name: "Desert Safari Dubai", text: "Custom booking plugin with tiered pricing, admin approval and Telr payments." },
  { slug: "fastdocnow", name: "FastDocNow", text: "Healthcare site with trust sections, service pages and booking CTAs." },
  { slug: "griffin-resources", name: "Griffin Resources", text: "HR platform with service-led structure and lead-generation CTAs." },
  { slug: "griffin-it", name: "Griffin IT", text: "B2B hardware supply site for MSPs and IT providers." },
];

export default function CvPage() {
  return (
    <main className="cv2-page">
      <header className="cv2-hero">
        <div className="pf-container cv2-hero-inner">
          <div className="cv2-hero-copy">
            <div className="eyebrow">CV · WordPress &amp; WooCommerce Developer</div>
            <h1 className="pf-h1">Muhammad Adeel Iqbal</h1>
            <p className="pf-lead">WordPress developer building editable Elementor Pro sites, WooCommerce stores and custom PHP features for businesses in the UAE, UK, USA and Pakistan — and as an implementation partner for agencies.</p>
            <div className="pf-actions">
              <a href={`mailto:${siteConfig.email}`} className="pf-btn pf-btn-dark">Email me</a>
              <Link href="/portfolio" className="pf-btn pf-btn-ghost">View case studies</Link>
            </div>
          </div>
          <div className="cv2-contact">
            <span className="pf-kicker">Contact</span>
            <div className="cv2-contact-grid">
              <a href={`mailto:${siteConfig.email}`} className="cv2-contact-item"><span className="pf-kicker">Email</span><strong>{siteConfig.email}</strong></a>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="cv2-contact-item"><span className="pf-kicker">Phone / WhatsApp</span><strong>{siteConfig.phone}</strong></a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="cv2-contact-item"><span className="pf-kicker">LinkedIn</span><strong>/in/adeelatwork</strong></a>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="cv2-contact-item"><span className="pf-kicker">GitHub</span><strong>adeeliqbalanjum</strong></a>
            </div>
            <div className="cv2-status"><i /> Lahore, Pakistan · Remote, worldwide · Available for new projects</div>
          </div>
        </div>
      </header>

      <section className="cs2-section">
        <div className="pf-container cv2-grid">
          <aside className="cv2-side">
            <div className="cv2-card">
              <span className="pf-kicker">Profile</span>
              <p>I build editable, conversion-focused WordPress websites for businesses, agencies and service brands: Elementor Pro builds, WooCommerce stores, custom PHP functionality, ACF/CPT content architecture, maintenance, migrations and speed work.</p>
            </div>
            <div className="cv2-card">
              <span className="pf-kicker">Core skills</span>
              <div className="pf-tags">{coreSkills.map((s) => <span className="pf-chip is-on" key={s}>{s}</span>)}{buildSkills.map((s) => <span className="pf-chip" key={s}>{s}</span>)}</div>
              <span className="pf-kicker cv2-gap">Supporting</span>
              <div className="pf-tags">{supportSkills.map((s) => <span className="pf-chip" key={s}>{s}</span>)}</div>
            </div>
            <div className="cv2-card">
              <span className="pf-kicker">Education</span>
              <strong className="cv2-edu">Bachelor of Information Technology</strong>
              <span className="pf-small">Superior University Lahore · 2020 – 2024</span>
            </div>
            <div className="cv2-card cv2-card-tint">
              <span className="pf-kicker">Works with agencies</span>
              <p>White-label and subcontract WordPress development: Figma handoff, Elementor/ACF implementation, WooCommerce and maintenance under your agency&apos;s name. NDA-friendly, clear communication across time zones.</p>
            </div>
          </aside>

          <div className="cv2-main">
            <div className="cs2-head"><div className="eyebrow">Experience</div><h2 className="pf-h2 cs2-h2">WordPress work since 2023 — agency and independent.</h2></div>
            {experience.map((job) => (
              <article className="cv2-job" key={`${job.company}-${job.period}`}>
                <div className="cv2-job-head">
                  <h3 className="cv2-job-role">{job.role}</h3>
                  <span className="cv2-job-company">{job.company}</span>
                  <span className={`pf-chip${job.current ? " cv2-chip-live" : ""}`}>{job.period}</span>
                </div>
                <ul className="cv2-points">{job.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              </article>
            ))}

            <div className="cs2-head cs2-head-split cv2-projects-head">
              <div><div className="eyebrow">Selected projects</div><h2 className="pf-h2 cs2-h2">Proof, not adjectives.</h2></div>
              <Link href="/portfolio" className="pf-btn pf-btn-ghost">All case studies →</Link>
            </div>
            <div className="cv2-projects">
              {selected.map((s) => {
                const img = cardImage(s.slug);
                return (
                  <Link href={`/portfolio/${s.slug}`} className="cv2-project" key={s.slug}>
                    {img ? <img src={img} alt="" loading="lazy" decoding="async" /> : <span className="cv2-project-mono">{monogram(s.name)}</span>}
                    <div><strong>{s.name}</strong><span className="pf-small">{s.text}</span></div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <InnerFooterCta email={siteConfig.email} whatsapp={siteConfig.whatsapp} />
    </main>
  );
}
