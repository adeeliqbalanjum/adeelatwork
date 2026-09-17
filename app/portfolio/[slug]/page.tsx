import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "../data";
import { projectImages, monogram } from "../images";
import { siteConfig } from "../../site-config";
import { InnerFooterCta } from "../../components/InnerFooterCta";

type CaseStudyPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — Case Study | Muhammad Adeel Iqbal`, description: p.tagline };
}

/* Approved client feedback, keyed by project */
const quotes: Record<string, { text: string; who: string }> = {
  "desert-safari-dubai": { text: "Adeel understood the booking flow properly and converted the idea into a clean, mobile-friendly experience. The tiered pricing engine and admin approval workflow worked exactly as we needed.", who: "Desert Safari Dubai" },
  fastdocnow: { text: "Fast, responsive and clear communication throughout. The final WordPress site made our services easier to understand and helped us present a more trustworthy healthcare brand to US patients.", who: "FastDocNow Team" },
  "griffin-resources": { text: "The website structure became much more professional. Services, trust sections, and the inquiry flow were all handled with strong attention to detail. Business has improved since launch.", who: "Griffin Resources" },
  "pacific-valor-law": { text: "The build felt clean, practical, and conversion-focused. The free case review CTA and credentials section were improved in a way that helps veterans take action immediately.", who: "Pacific Valor Law" },
};

/* What each stack item is for — capability statements, not results */
const stackNotes: Record<string, string> = {
  WordPress: "The editable foundation: pages, reusable templates, SEO structure and content areas the client manages after launch.",
  "Elementor Pro": "Responsive, client-editable layouts, headers, footers and templates without hard-coding content.",
  WooCommerce: "Products, checkout, payments and order flows.",
  "Advanced Custom Fields": "Structured content fields so editors update data, not layouts.",
  "Custom PHP Plugin": "Business logic that no off-the-shelf plugin handled, written as a maintainable plugin.",
  "Custom Post Types": "A dedicated content type (vehicles, practitioners) so records are structured data, not pages.",
  Leaflet: "Open-source interactive map plotting records from their stored coordinates.",
  "LiteSpeed Cache": "Server-level page caching, critical CSS and image optimisation.",
  "Jetpack Boost": "Deferred scripts and critical CSS for better Core Web Vitals.",
  "Calendly Integration": "Direct appointment booking from the site.",
  "WP Rocket": "Caching and asset optimisation for faster loads on image-heavy pages.",
  "Yoast SEO": "Metadata, sitemaps and on-page SEO structure.",
  "Yoast SEO Local": "Local-search metadata and location structure.",
  WPForms: "Enquiry, quote and lead-capture forms with notifications.",
  "SMTP Email": "Reliable transactional email delivery for notifications.",
  "Telr Payment Gateway": "UAE card payments where global gateways fall short.",
  "WhatsApp Integration": "Direct-message enquiries, the channel UAE customers prefer.",
  "WhatsApp API": "Direct-message enquiries for B2B leads.",
  SMTP: "Reliable transactional email delivery.",
};

const hostOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  const p = projects[index];
  if (!p) notFound();

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const images = projectImages(p.slug);
  const heroImage = images.mockup ?? images.shot;
  const galleryCount = [images.shot, images.mobile, images.inner, images.extra].filter(Boolean).length;
  const nextImage = projectImages(next.slug);
  const quote = quotes[p.slug];
  const editable = p.stack.some((s) => /Elementor|Advanced Custom Fields/.test(s));
  const isSafari = p.slug === "desert-safari-dubai";

  return (
    <main className="cs2-page">
      <header className="cs2-hero">
        <div className="pf-container cs2-hero-inner">
          <div className="cs2-hero-copy">
            <Link href="/portfolio" className="cs2-back">← All projects</Link>
            <div className="eyebrow">Case study · {p.industry} · {p.location} · {p.year}</div>
            <h1 className="pf-h1 cs2-title">{p.name}</h1>
            <p className="pf-lead">{p.tagline}.</p>
            <div className="pf-actions">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn-dark">View live site ↗</a>
              <Link href={`/portfolio/${next.slug}`} className="pf-btn pf-btn-ghost">Next project →</Link>
            </div>
          </div>
          {heroImage ? (
            <div className="cs2-hero-media"><img src={heroImage} alt={`${p.name} website`} decoding="async" /></div>
          ) : (
            <div className="cs2-hero-media pf-ph"><span className="pf-mono">{monogram(p.name)}</span><span>Live site · screenshot to be added</span></div>
          )}
        </div>
      </header>

      {/* Facts strip */}
      <section className="cs2-facts-wrap">
        <div className="pf-container">
          <div className="cs2-facts">
            <div className="cs2-fact"><span className="pf-kicker">Client</span><strong>{p.name}</strong></div>
            <div className="cs2-fact"><span className="pf-kicker">Industry</span><strong>{p.industry}</strong></div>
            <div className="cs2-fact"><span className="pf-kicker">Location</span><strong>{p.location}</strong></div>
            <div className="cs2-fact"><span className="pf-kicker">Year</span><strong>{p.year}</strong></div>
            <div className="cs2-fact"><span className="pf-kicker">Live site</span><a href={p.url} target="_blank" rel="noopener noreferrer"><strong>{hostOf(p.url)} ↗</strong></a></div>
          </div>
        </div>
      </section>

      {/* Problem / Approach */}
      <section className="cs2-section">
        <div className="pf-container cs2-split">
          <div><div className="eyebrow">The problem</div></div>
          <div className="cs2-split-body">
            <h2 className="pf-h2 cs2-h2">{p.challenge.split(". ")[0]}.</h2>
            <p className="pf-lead">{p.challenge.split(". ").slice(1).join(". ")}</p>
          </div>
        </div>
        <div className="pf-container cs2-split cs2-split-gap">
          <div><div className="eyebrow">The approach</div></div>
          <div className="cs2-split-body">
            <h2 className="pf-h2 cs2-h2">{p.body.split(". ")[0]}.</h2>
            <p className="pf-lead">{p.body.split(". ").slice(1).join(". ")}</p>
          </div>
        </div>
      </section>

      {/* What was built */}
      <section className="cs2-section">
        <div className="pf-container cs2-block">
          <div className="cs2-head"><div className="eyebrow">What was built</div><h2 className="pf-h2">{p.solution.length} pieces, one working site.</h2></div>
          <div className="cs2-built-grid">
            {p.solution.map((item, i) => (
              <div className="cs2-built" key={item}><span className="cs2-num">{String(i + 1).padStart(2, "0")}</span><p>{item}</p></div>
            ))}
            <div className="cs2-built cs2-built-stack">
              <span className="pf-kicker">Stack</span>
              <div className="pf-tags">{p.stack.map((s) => <span className="pf-chip pf-chip-sm" key={s}>{s}</span>)}</div>
            </div>
            {quote && (
              <div className="cs2-built cs2-built-quote">
                <span className="pf-kicker">Client says</span>
                <p>“{quote.text}”</p>
                <span className="cs2-quote-who">{quote.who}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technical decisions */}
      <section className="cs2-section">
        <div className="pf-container cs2-block">
          <div className="cs2-head"><div className="eyebrow">Technical decisions</div><h2 className="pf-h2">Why this stack.</h2></div>
          <div className="cs2-decisions">
            {p.stack.map((s) => (
              <div className="cs2-decision" key={s}>
                <span className="cs2-decision-name">{s}</span>
                <p className="pf-small">{stackNotes[s] ?? "Part of the production build for this project."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual evidence */}
      {galleryCount > 0 && (
      <section className="cs2-section">
        <div className="pf-container cs2-block">
          <div className="cs2-head cs2-head-split">
            <div><div className="eyebrow">Visual evidence</div><h2 className="pf-h2">The site, as shipped.</h2></div>
            <p className="pf-small cs2-head-note">Real screenshots of the live site at desktop and phone width, plus an inner page — captured from the site, never generated.</p>
          </div>
          <div className={`cs2-gallery cs2-gallery-${galleryCount}`}>
            {images.shot && <div className="cs2-shot cs2-shot-wide"><img src={images.shot} alt={`${p.name} homepage`} loading="lazy" decoding="async" /><span className="cs2-shot-cap">Homepage · {hostOf(p.url)}</span></div>}
            {images.mobile && <div className="cs2-shot cs2-shot-mobile"><img src={images.mobile} alt={`${p.name} on a phone`} loading="lazy" decoding="async" /><span className="cs2-shot-cap">Mobile · 430px</span></div>}
            {images.inner && <div className="cs2-shot"><img src={images.inner} alt={`${p.name} inner page`} loading="lazy" decoding="async" /><span className="cs2-shot-cap">{images.innerCaption}</span></div>}
            {images.extra && <div className="cs2-shot"><img src={images.extra} alt={`${p.name} detail`} loading="lazy" decoding="async" /><span className="cs2-shot-cap">{images.extraCaption}</span></div>}
          </div>
        </div>
      </section>
      )}

      {/* Outcome */}
      <section className="cs2-section">
        <div className="pf-container">
          <div className="cs2-outcome">
            <div className="cs2-outcome-copy">
              <div className="eyebrow">Outcome</div>
              <h2 className="pf-h2 cs2-h2">{isSafari ? "Bookings moved from WhatsApp threads to a self-serve flow the operator approves in one click." : p.slug === "rockbusto-fleet" ? "Stock changes are a data edit, not a page rebuild: add a vehicle, and the grid, filters, pricing and quote buttons update themselves." : p.slug === "biodynamic-breathwork" ? "173 practitioners on one map, editable by the team, and a site that scored 98 / 92 on PageSpeed at hand-over." : `${p.name} is live at ${hostOf(p.url)}${editable ? ", with pages the client edits without a developer." : "."}`}</h2>
              <p className="pf-small">{p.slug === "biodynamic-breathwork" ? "PageSpeed figures are the before/after readings taken during the work. Traffic or conversion metrics appear only when the client supplies a report." : "Verified metrics (traffic, bookings, conversion) appear here only when the client supplies a report — nothing is estimated."}</p>
            </div>
            <div className="cs2-outcome-side">
              {isSafari ? (
                <>
                  <div className="cs2-outcome-card"><span className="pf-kicker">Before</span><strong>WhatsApp enquiry → manual quote → separate payment → manual confirmation</strong></div>
                  <div className="cs2-outcome-card"><span className="pf-kicker">After</span><strong>Select tour → date → group size → pay online → admin approves → confirmed</strong></div>
                </>
              ) : (
                <>
                  <div className="cs2-outcome-card"><span className="pf-kicker">Delivered</span><strong>{p.solution[0]}</strong></div>
                  <div className="cs2-outcome-card"><span className="pf-kicker">Handoff</span><strong>{editable ? "Client-editable Elementor Pro / ACF build with launch checks and maintenance notes." : "Launch checks, SEO basics and maintenance notes handed over with the site."}</strong></div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="cs2-section cs2-section-tight">
        <div className="pf-container cs2-nav">
          <Link href={`/portfolio/${prev.slug}`} className="cs2-nav-card">
            <div><span className="pf-kicker">← Previous</span><span className="cs2-nav-title">{prev.name}</span><span className="pf-small">{prev.industry} · {prev.location}</span></div>
            <span className="pf-chip">Case study</span>
          </Link>
          <Link href={`/portfolio/${next.slug}`} className="cs2-nav-card cs2-nav-card-dark">
            <div><span className="pf-kicker">Next project →</span><span className="cs2-nav-title">{next.name}</span><span className="pf-small">{next.industry} · {next.location}</span></div>
            {(nextImage.card ?? nextImage.mockup ?? nextImage.shot) ? <img src={nextImage.card ?? nextImage.mockup ?? nextImage.shot} alt="" loading="lazy" decoding="async" /> : <span className="cs2-nav-mono">{monogram(next.name)}</span>}
          </Link>
        </div>
      </section>

      <InnerFooterCta email={siteConfig.email} whatsapp={siteConfig.whatsapp} />
    </main>
  );
}
