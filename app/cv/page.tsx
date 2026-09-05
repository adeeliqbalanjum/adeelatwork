import Link from "next/link";
import { siteConfig } from "../site-config";

const skills = ["WordPress", "Elementor Pro", "WooCommerce", "ACF", "Custom Post Types", "PHP", "HTML", "CSS", "JavaScript", "Bootstrap", "WP Rocket", "LiteSpeed Cache", "Cloudflare", "Yoast SEO", "WPForms", "cPanel", "Figma to WordPress", "PSD to WordPress"];

const projects = [
  ["FastDocNow", "Healthcare WordPress website with mobile-first UX, trust sections, service pages and booking CTAs."],
  ["Desert Safari Dubai", "Tourism website and custom booking flow with private/shared pricing logic, add-ons and customer/admin emails."],
  ["Griffin Resources", "Corporate HR and recruitment website built with a service-led structure and lead-generation CTAs."],
  ["Griffin IT", "B2B hardware solutions website for MSP and IT providers."],
  ["Pacific Valor Law", "Professional legal website with trust-led service presentation."],
];

const experience = [
  { role: "WordPress Developer (Remote)", company: "Rozi Academy", period: "Dec 2024 – Apr 2026", points: ["Developed and maintained WordPress websites using Elementor Pro, WooCommerce, ACF, CPT, PHP, HTML, CSS and JavaScript.", "Built custom WordPress features including booking functionality, admin approval workflows, automated email notifications and dynamic content sections.", "Delivered 15+ WordPress websites across tourism, education, business and e-commerce industries using responsive Elementor layouts.", "Fixed plugin conflicts, WooCommerce issues, layout problems and production website bugs across multiple client websites.", "Improved website speed, Core Web Vitals and SEO performance by reducing load times from 6s to under 2s."] },
  { role: "WordPress Developer (Remote)", company: "Nuovo Studios", period: "Apr 2023 – Dec 2024", points: ["Converted 20+ Figma and PSD designs into pixel-perfect, mobile-responsive WordPress websites.", "Optimized WooCommerce checkout flow and store architecture for multiple e-commerce clients.", "Executed website migrations with zero data loss, including database transfers, domain, SSL and post-launch testing.", "Maintained live production websites across multiple industries with consistent uptime and on-time launches."] },
  { role: "WordPress Developer", company: "Government Contract — Embassy of Pakistan, Muscat, Oman", period: "Apr 2024 – Jul 2024", points: ["Developed the official Embassy of Pakistan website using Elementor and ACF.", "Built a custom passport application tracking system using CPT and PHP so citizens could check real-time application status online."] },
  { role: "WordPress Developer", company: "Contract — ESNCO Lighting Trading, Dubai, UAE", period: "Oct 2023 – Mar 2024", points: ["Managed WooCommerce store operations, products, orders and content updates.", "Handled website migration, backups and troubleshooting to maintain consistent uptime."] },
];

export const metadata = {
  title: "CV — Muhammad Adeel Iqbal | WordPress Developer",
  description: "Muhammad Adeel Iqbal CV: WordPress Developer specializing in Elementor Pro, WooCommerce, custom development, website maintenance and performance optimization.",
};

export default function CvPage() {
  return (
    <main className="cv-page">
      <section className="cv-hero"><div className="container cv-hero-inner"><div><div className="eyebrow">CV / Resume</div><h1>Muhammad Adeel Iqbal</h1><p>WordPress Developer — Elementor Pro, WooCommerce, custom development, website maintenance and performance optimization.</p></div><div className="cv-contact-card"><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">{siteConfig.phone}</a><a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><span>Lahore, Pakistan</span></div></div></section>
      <section className="section cv-section"><div className="container cv-grid"><aside className="cv-sidebar"><article><h2>Profile</h2><p>I build editable, conversion-focused WordPress websites for businesses, agencies and service brands. My work covers Elementor Pro builds, WooCommerce stores, custom PHP functionality, CPT/ACF architecture, website maintenance, migrations and speed optimization.</p></article><article><h2>Skills</h2><div className="cv-skill-cloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article><article><h2>Education</h2><p><strong>Bachelor of Information Technology</strong><br />Superior University Lahore — 2024</p></article><article><h2>Selected Projects</h2><ul className="cv-project-list">{projects.map(([name, text]) => <li key={name}><strong>{name}</strong><span>{text}</span></li>)}</ul></article></aside><div className="cv-main"><div className="cv-summary-strip"><span><strong>3+</strong> Years Experience</span><span><strong>50+</strong> Projects Delivered</span><span><strong>20+</strong> Figma/PSD Builds</span><span><strong>6s → &lt;2s</strong> Speed Results</span></div><h2>Work Experience</h2><div className="cv-timeline">{experience.map((job) => <article className="cv-job" key={`${job.company}-${job.period}`}><div><h3>{job.role}</h3><p>{job.company}</p><span>{job.period}</span></div><ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div><div className="cv-actions-bottom"><Link href="/portfolio" className="btn btn-dark">View case studies</Link><a href={`mailto:${siteConfig.email}`} className="btn btn-ghost">Email me</a></div></div></div></section>
    </main>
  );
}
