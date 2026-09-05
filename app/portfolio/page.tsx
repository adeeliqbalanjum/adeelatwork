"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects, Industry } from "./data";
import { cardImage, monogram } from "./images";
import { cvUrl, siteConfig } from "../site-config";
import { InnerFooterCta } from "../components/InnerFooterCta";

const ALL = "All" as const;
type Filter = typeof ALL | Industry;
const FILTERS: Filter[] = [ALL, "Tourism", "Healthcare", "Tech", "Business", "Services", "Education", "Legal", "Finance", "Wellness"];

/* Counted from the data, not claimed */
const industries = new Set(projects.map((p) => p.industry)).size;
const countries = new Set(
  projects.map((p) => {
    const l = p.location;
    if (/UAE/.test(l)) return "UAE";
    if (/UK|United Kingdom|London/.test(l)) return "UK";
    if (/USA/.test(l)) return "USA";
    if (/Japan/.test(l)) return "Japan";
    if (/Pakistan/.test(l)) return "Pakistan";
    return null;
  }).filter(Boolean),
).size;
const earliest = Math.min(...projects.map((p) => Number(p.year)));
const WORDPRESS_SINCE = 2023; // first WordPress role (Nuovo Studios, Apr 2023)
const latest = Math.max(...projects.map((p) => Number(p.year)));

const FEATURED = ["desert-safari-dubai", "fastdocnow"];

function stackTags(stack: string[]) {
  return stack.filter((s) => s !== "WordPress").slice(0, 2);
}

export default function PortfolioPage() {
  const [active, setActive] = useState<Filter>(ALL);
  const visible = useMemo(() => (active === ALL ? projects : projects.filter((p) => p.industry === active)), [active]);
  const featured = active === ALL ? projects.filter((p) => FEATURED.includes(p.slug)) : [];
  const grid = active === ALL ? visible.filter((p) => !FEATURED.includes(p.slug)) : visible;

  return (
    <main className="pf-page">
      <header className="pf-hero">
        <div className="pf-container pf-hero-inner">
          <div className="eyebrow">Selected work · {earliest} – {latest}</div>
          <h1 className="pf-h1">
            <span className="pf-muted">{projects.length} websites.</span> Built for real businesses, editable after launch.
          </h1>
          <p className="pf-lead">
            WordPress and WooCommerce builds for tourism, healthcare, B2B and service businesses across the UAE, UK, USA, Japan and Pakistan — each with a case study covering the problem, what was built and the stack.
          </p>
          <div className="pf-actions">
            <Link href="/#contact" className="pf-btn pf-btn-dark">Start a project</Link>
            <a href={cvUrl} className="pf-btn pf-btn-ghost">View CV</a>
          </div>
          <div className="pf-facts" aria-label="Portfolio facts">
            <div className="pf-fact"><strong>{projects.length}</strong><span>Projects</span></div>
            <div className="pf-fact"><strong>{industries}</strong><span>Industries</span></div>
            <div className="pf-fact"><strong>{countries}</strong><span>Countries</span></div>
            <div className="pf-fact"><strong>{WORDPRESS_SINCE} →</strong><span>WordPress since</span></div>
          </div>
        </div>
      </header>

      <section className="pf-section">
        <div className="pf-container">
          <div className="pf-toolbar">
            <div className="pf-filters" role="tablist" aria-label="Filter by industry">
              {FILTERS.map((f) => (
                <button key={f} type="button" role="tab" aria-selected={active === f} className={`pf-chip${active === f ? " is-on" : ""}`} onClick={() => setActive(f)}>
                  {f}
                </button>
              ))}
            </div>
            <span className="pf-count">Showing {visible.length} {visible.length === 1 ? "project" : "projects"}</span>
          </div>

          {featured.length > 0 && (
            <div className="pf-featured">
              {featured.map((p) => {
                const img = cardImage(p.slug);
                return (
                  <Link href={`/portfolio/${p.slug}`} className="pf-feature" key={p.slug}>
                    <div className="pf-feature-copy">
                      <div>
                        <span className="pf-chip pf-chip-yellow">Featured case study</span>
                        <h2 className="pf-feature-title">{p.name}</h2>
                        <p className="pf-small">{p.tagline}. {p.solution[0]}.</p>
                      </div>
                      <div className="pf-tags"><span className="pf-tag">{p.industry}</span><span className="pf-tag">{p.location}</span>{stackTags(p.stack).map((t) => <span className="pf-tag" key={t}>{t}</span>)}</div>
                    </div>
                    {p.slug === "desert-safari-dubai" ? (
                      <div className="pf-feature-media pf-safari">
                        <div className="pf-safari-widget" aria-hidden="true">
                          <strong>Safari Booking</strong>
                          <div className="pf-safari-tabs"><span className="is-on">Private</span><span>Shared</span><span>Add-ons</span></div>
                          <div className="pf-safari-row"><span>4 guests · Private</span><b>AED 1,180</b></div>
                          <div className="pf-safari-total"><span>Total incl. add-ons</span><b>AED 1,320</b></div>
                        </div>
                      </div>
                    ) : img ? (
                      <div className="pf-feature-media"><img src={img} alt={`${p.name} website`} loading="lazy" decoding="async" /></div>
                    ) : (
                      <div className="pf-feature-media pf-ph"><span className="pf-mono">{monogram(p.name)}</span><span>Live site · screenshot to be added</span></div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="pf-grid">
            {grid.map((p) => {
              const img = cardImage(p.slug);
              return (
                <Link href={`/portfolio/${p.slug}`} className="pf-card" key={p.slug}>
                  {img ? (
                    <div className="pf-card-media"><img src={img} alt={`${p.name} website`} loading="lazy" decoding="async" /></div>
                  ) : (
                    <div className="pf-card-media pf-ph"><span className="pf-mono">{monogram(p.name)}</span><span>Live site · screenshot to be added</span></div>
                  )}
                  <div className="pf-card-body">
                    <div className="pf-tags"><span className="pf-tag pf-tag-dark">{p.industry}</span><span className="pf-tag">{p.location}</span><span className="pf-tag">{p.year}</span></div>
                    <h3 className="pf-card-title">{p.name}</h3>
                    <p className="pf-small pf-card-tagline">{p.tagline}</p>
                    <div className="pf-card-foot">
                      <div className="pf-tags">{stackTags(p.stack).map((t) => <span className="pf-chip pf-chip-sm" key={t}>{t}</span>)}</div>
                      <span className="pf-more">Case study →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <InnerFooterCta email={siteConfig.email} whatsapp={siteConfig.whatsapp} />
    </main>
  );
}
