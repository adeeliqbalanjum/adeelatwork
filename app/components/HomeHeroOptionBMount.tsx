"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { cvUrl, siteConfig, withBasePath } from "../site-config";

const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

const cards = [
  { title: "Desert Safari Booking", desc: "Private/shared tour pricing, add-ons, AED totals and booking emails.", image: "", badge: "AED", accent: "#ff7a18" },
  { title: "Griffin IT", desc: "Hardware solutions website for MSP & IT providers.", image: withBasePath("/work-images/griffin-it.webp"), badge: "GI", accent: "#0ea5e9" },
  { title: "Kay Kay Travels", desc: "International travels and tours website rebuild.", image: withBasePath("/work-images/kay-kay.webp"), badge: "KKT", accent: "#22c55e" },
  { title: "Book My Holidays", desc: "Holiday booking website for travel enquiries.", image: withBasePath("/work-images/book-my-holidays.webp"), badge: "BMH", accent: "#38bdf8" },
  { title: "FastDocNow", desc: "Healthcare WordPress website with mobile-first user flow.", image: withBasePath("/work-images/fastdocnow.webp"), badge: "FDN", accent: "#2563eb" },
  { title: "Griffin Resources", desc: "Business website with a premium brand feel.", image: withBasePath("/work-images/griffin-resources.webp"), badge: "GR", accent: "#a855f7" },
  { title: "Build Stack", desc: "WordPress, Elementor Pro, WooCommerce, ACF, PHP, GSAP.", image: "", badge: "WP", accent: "#070707" },
];

const badgeStyle = (accent: string): React.CSSProperties => ({ minWidth: 30, height: 18, borderRadius: 999, background: accent, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", paddingInline: 7, fontSize: 9, lineHeight: 1, fontWeight: 950, letterSpacing: "-.035em", boxShadow: "0 8px 20px rgba(0,0,0,.18)", flex: "0 0 auto" });

function HeroCardItem({ card }: { card: (typeof cards)[number] }) {
  return (
    <article className="home-hero-b-card">
      <div className="home-hero-b-browser"><i /><i /><i /></div>
      {card.image ? <img src={card.image} alt="" /> : (
        <div className="home-hero-b-stack" aria-hidden="true">
          <div className="home-hero-b-mini-title"><span style={badgeStyle(card.accent)}>{card.badge}</span><strong>{card.badge === "AED" ? "Safari Booking" : "Production Stack"}</strong></div>
          <div className="home-hero-b-tools">
            {(card.badge === "AED" ? ["Private", "Shared", "Add-ons", "AED"] : ["WP", "Elementor", "Woo", "ACF", "PHP", "GSAP"]).map((tool, index) => <span key={tool} className={index === 1 ? "is-active" : ""}>{tool}</span>)}
          </div>
        </div>
      )}
      <div className="home-hero-b-card-body" data-image={card.image ? "true" : "false"}>
        <h3><span style={badgeStyle(card.accent)}>{card.badge}</span><span>{card.title}</span></h3>
        <p>{card.desc}</p>
      </div>
    </article>
  );
}

function HomeHeroOptionB() {
  return (
    <div className="home-hero-b">
      <div className="home-hero-b-shader" aria-hidden="true"><span className="home-hero-b-orb home-hero-b-orb-blue" /><span className="home-hero-b-orb home-hero-b-orb-green" /><span className="home-hero-b-orb home-hero-b-orb-purple" /><span className="home-hero-b-edge" /></div>
      <div className="home-hero-b-inner">
        <div className="home-hero-b-status ha-pill"><strong>Available</strong> for WordPress, WooCommerce & Elementor projects</div>
        <h1 className="home-hero-b-title ha-h1"><span>WordPress developer</span> building editable, high&#8209;impact websites</h1>
        <p className="home-hero-b-subline ha-sub">I build and improve WordPress &amp; WooCommerce websites for businesses in the UAE, UK, USA and Pakistan — from Figma to Elementor, custom features, speed, QA and launch.</p>
        <div className="home-hero-b-actions ha-actions">
          <a className="home-hero-b-btn home-hero-b-btn-dark" href={`mailto:${siteConfig.email}`}>✦ Hire me for WordPress</a>
          <a className="home-hero-b-btn home-hero-b-btn-ghost" href="#proof">View proof</a>
          <a className="home-hero-b-btn home-hero-b-btn-light" href={cvUrl}>View CV</a>
        </div>
        <div className="home-hero-b-showcase ha-showcase" aria-label="Portfolio preview">
          <div className="home-hero-b-haze" />
          <div className="home-hero-b-strip" aria-hidden="true">{cards.map((card) => <HeroCardItem card={card} key={card.title} />)}</div>
          <div className="home-hero-b-portrait"><img src={portraitDataUrl} alt="Muhammad Adeel Iqbal" /></div>
        </div>
      </div>
    </div>
  );
}

export function HomeHeroOptionBMount() {
  const pathname = usePathname();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  React.useLayoutEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) { setTarget(null); return; }
    hero.classList.add("home-hero-option-b-mounted");
    setTarget(hero);
    return () => { hero.classList.remove("home-hero-option-b-mounted"); setTarget(null); };
  }, [pathname]);
  if (!target) return null;
  return createPortal(<HomeHeroOptionB />, target);
}
