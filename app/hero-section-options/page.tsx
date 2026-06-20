"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import styles from "./HeroSectionOptions.module.css";

const basePath = process.env.NODE_ENV === "production" ? "/adeelatwork" : "";
const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

type HeroCard = {
  title: string;
  desc: string;
  type: "image" | "booking" | "stack";
  image?: string;
  accent?: string;
  badge?: string;
};

const cards: HeroCard[] = [
  {
    title: "Desert Safari Booking Form",
    desc: "Private/shared tour pricing, add-ons, AED totals and booking emails.",
    type: "booking",
    accent: "#ff7a18",
    badge: "AED",
  },
  {
    title: "Griffin IT",
    desc: "Hardware solutions website for MSP & IT providers.",
    type: "image",
    image: `${basePath}/work-images/griffin-it.webp`,
    accent: "#0ea5e9",
    badge: "GI",
  },
  {
    title: "Kay Kay Travels",
    desc: "International travels and tours website rebuild.",
    type: "image",
    image: `${basePath}/work-images/kay-kay.webp`,
    accent: "#22c55e",
    badge: "KKT",
  },
  {
    title: "Book My Holidays",
    desc: "Holiday booking website for travel enquiries.",
    type: "image",
    image: `${basePath}/work-images/book-my-holidays.webp`,
    accent: "#38bdf8",
    badge: "BMH",
  },
  {
    title: "FastDocNow",
    desc: "Healthcare WordPress website with mobile-first user flow.",
    type: "image",
    image: `${basePath}/work-images/fastdocnow.webp`,
    accent: "#2563eb",
    badge: "FDN",
  },
  {
    title: "Griffin Resources",
    desc: "Business website with a premium brand feel.",
    type: "image",
    image: `${basePath}/work-images/griffin-resources.webp`,
    accent: "#a855f7",
    badge: "GR",
  },
  {
    title: "Build Stack",
    desc: "WordPress, Elementor Pro, WooCommerce, ACF, PHP, GSAP.",
    type: "stack",
    accent: "#070707",
    badge: "WP",
  },
];

const options = [
  {
    id: "option-a",
    label: "Option A",
    name: "Current layout + shader aurora",
    note: "Closest to your current hero, but with smoother animated mesh color moving behind the content.",
  },
  {
    id: "option-b",
    label: "Option B",
    name: "Cool glass / ice motion",
    note: "Best match with the new projects section: clean, blue-green, glassy, and premium.",
  },
  {
    id: "option-c",
    label: "Option C",
    name: "Warm cream studio motion",
    note: "Friendly client-facing version with soft peach, gold, and green motion blobs.",
  },
  {
    id: "option-d",
    label: "Option D",
    name: "Dark shader spotlight",
    note: "High-contrast agency style inspired by the shader code, while keeping your actual hero layout.",
  },
  {
    id: "option-e",
    label: "Option E",
    name: "Minimal paper grid motion",
    note: "Very clean editorial background with moving color edges and subtle technical grid.",
  },
];

const badgeStyle = (accent: string, inverse = false): React.CSSProperties => ({
  minWidth: 30,
  height: 18,
  borderRadius: 999,
  background: inverse ? "#fff" : accent,
  color: inverse ? "#070707" : "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  paddingInline: 7,
  fontSize: 9,
  lineHeight: 1,
  fontWeight: 950,
  letterSpacing: "-.035em",
  boxShadow: "0 8px 20px rgba(0,0,0,.18)",
  flex: "0 0 auto",
});

function ShaderBackground() {
  return (
    <div className={styles.shader} aria-hidden="true">
      <svg className={styles.filters}>
        <defs>
          <filter id="hero-preview-glass" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.007" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.45" />
          </filter>
        </defs>
      </svg>
      <motion.span
        className={`${styles.meshOrb} ${styles.meshOne}`}
        animate={{ x: ["0%", "26%", "-8%", "0%"], y: ["0%", "-18%", "12%", "0%"], scale: [1, 1.16, 0.96, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className={`${styles.meshOrb} ${styles.meshTwo}`}
        animate={{ x: ["0%", "-20%", "10%", "0%"], y: ["0%", "16%", "-10%", "0%"], scale: [1, 0.92, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className={`${styles.meshOrb} ${styles.meshThree}`}
        animate={{ x: ["0%", "10%", "-18%", "0%"], y: ["0%", "-10%", "18%", "0%"], scale: [1, 1.1, 0.98, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className={styles.edgeWash}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function BookingPreview({ accent }: { accent: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        padding: 14,
        background: "linear-gradient(135deg, rgba(255,255,255,.96), rgba(255,246,238,.84))",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={badgeStyle(accent)}>AED</span>
        <strong style={{ color: "#070707", fontSize: 14, letterSpacing: "-.055em", lineHeight: 1 }}>Safari Booking</strong>
      </div>
      <div style={{ display: "grid", gap: 7, marginTop: 12 }}>
        {["Tour date", "Adults · Children", "Hotel pickup"].map((item, index) => (
          <div key={item} style={{ height: 20, borderRadius: 8, background: index === 1 ? "rgba(255,122,24,.16)" : "rgba(7,7,7,.07)", display: "flex", alignItems: "center", paddingInline: 9 }}>
            <span style={{ width: index === 1 ? "72%" : "54%", height: 6, borderRadius: 999, background: index === 1 ? accent : "rgba(7,7,7,.18)" }} />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 14, right: 14, bottom: 14, height: 34, borderRadius: 12, background: "#070707", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", paddingInline: 12 }}>
        <b style={{ fontSize: 11, letterSpacing: "-.035em" }}>Total</b>
        <b style={{ fontSize: 14, letterSpacing: "-.055em" }}>AED 550</b>
      </div>
    </div>
  );
}

function StackPreview({ accent }: { accent: string }) {
  const tools = ["WP", "Elementor", "Woo", "ACF", "PHP", "GSAP"];
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, padding: 14, background: "linear-gradient(135deg, rgba(7,7,7,.96), rgba(7,7,7,.74))" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={badgeStyle(accent, true)}>WP</span>
        <strong style={{ color: "#fff", fontSize: 14, lineHeight: 1, letterSpacing: "-.055em" }}>Production Stack</strong>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 13 }}>
        {tools.map((tool, index) => (
          <span key={tool} style={{ borderRadius: 999, background: index === 1 ? "#fff" : "rgba(255,255,255,.12)", color: index === 1 ? "#070707" : "#fff", padding: "7px 9px", fontSize: 10, fontWeight: 900, letterSpacing: "-.025em" }}>{tool}</span>
        ))}
      </div>
    </div>
  );
}

function HeroCardItem({ card }: { card: HeroCard }) {
  return (
    <article className={styles.siteCard}>
      <div className={styles.browser}><i /><i /><i /></div>
      {card.type === "image" && card.image ? (
        <img
          src={card.image}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      ) : null}
      {card.type === "booking" ? <BookingPreview accent={card.accent || "#ff7a18"} /> : null}
      {card.type === "stack" ? <StackPreview accent={card.accent || "#070707"} /> : null}
      <div
        className={styles.siteBody}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 3,
          padding: "34px 13px 13px",
          background: card.type === "image" ? "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.78))" : "transparent",
        }}
      >
        <h3 style={{ color: card.type === "image" ? "#fff" : undefined, display: "flex", alignItems: "center", gap: 7 }}>
          {card.type === "image" ? <span style={badgeStyle(card.accent || "#22c55e")}>{card.badge}</span> : null}
          <span>{card.title}</span>
        </h3>
        <p style={{ color: card.type === "image" ? "rgba(255,255,255,.72)" : undefined }}>{card.desc}</p>
      </div>
    </article>
  );
}

function HeroShowcase() {
  return (
    <motion.div
      className={`${styles.showcase} ha-showcase`}
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Portfolio preview"
    >
      <div className={styles.showcaseHaze} />
      <div className={styles.strip} aria-hidden="true">
        {cards.map((card) => <HeroCardItem card={card} key={card.title} />)}
      </div>
      <div className={styles.portraitCard}>
        <img src={portraitDataUrl} alt="Muhammad Adeel Iqbal" className={styles.portraitImg} />
      </div>
    </motion.div>
  );
}

function HeroOption({ option }: { option: (typeof options)[number] }) {
  return (
    <section className={`${styles.heroOption} ${styles[option.id]}`} id={option.id}>
      <ShaderBackground />

      <nav className={styles.nav} aria-label={`${option.name} preview navigation`}>
        <a className={styles.navLogo} href="#">AI</a>
        <a href="#">Portfolio</a>
        <a href="#">Features</a>
        <a href="#">Projects</a>
        <a href="#" className={styles.navCta}>Hire Me</a>
      </nav>

      <div className={styles.optionBadge}>
        <strong>{option.label}</strong>
        <span>{option.name}</span>
      </div>

      <motion.div
        className={styles.heroInner}
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.36 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`${styles.statusPill} ha-pill`}>
          <strong>Available</strong> for new projects — UAE · UK · USA
        </div>

        <h1 className="ha-h1">
          <span className={styles.soft}>WordPress developer</span>{" "}
          building fast, high&#8209;impact websites
        </h1>

        <p className={`${styles.subline} ha-sub`}>
          I build and redesign WordPress &amp; WooCommerce websites for businesses in the UAE, UK, and USA — from Figma to pixel-perfect, conversion-ready sites.
        </p>

        <div className={`${styles.actions} ha-actions`}>
          <a className={`${styles.btn} ${styles.btnDark}`} href="mailto:adeeliqbalajum@gmail.com">✦ Let&apos;s talk</a>
          <a className={`${styles.btn} ${styles.btnGhost}`} href="#projects">Browse work</a>
        </div>

        <small className={styles.note}>{option.note}</small>

        <HeroShowcase />
      </motion.div>
    </section>
  );
}

export default function HeroSectionOptionsPage() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>← Back home</Link>
      {options.map((option) => (
        <HeroOption option={option} key={option.id} />
      ))}
    </main>
  );
}
