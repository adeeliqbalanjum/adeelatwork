"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import styles from "./HeroSectionOptions.module.css";

const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

const cards = [
  ["Desert Safari Dubai", "Custom booking plugin — tiered pricing, admin approvals & payment gateway.", "shapeA"],
  ["Embassy of Pakistan", "Official government website with real-time passport tracking system.", "shapeB"],
  ["Figma to WordPress", "Pixel-perfect Elementor builds from designer files for agency clients.", "thumbs"],
  ["WooCommerce Store", "Full e-commerce setup for a Dubai lighting company.", "shapeC"],
  ["Custom Booking Plugin", "Tiered pricing, admin approvals, automated emails & WhatsApp fields.", "shapeD"],
  ["Landing Pages", "High-converting Elementor pages for UAE, UK & USA clients.", "shapeA"],
  ["Website Rebuilds", "Full redesigns turning outdated sites into fast modern platforms.", "shapeB"],
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
        {cards.map(([title, desc, shape]) => (
          <article className={styles.siteCard} key={title}>
            <div className={styles.browser}><i /><i /><i /></div>
            <div className={styles.siteBody}>
              <h3>{title}</h3>
              <p>{desc}</p>
              {shape === "thumbs" ? (
                <div className={styles.thumbRow}><span /><span /><span /></div>
              ) : (
                <div className={`${styles.siteShape} ${styles[shape]}`} />
              )}
            </div>
          </article>
        ))}
      </div>
      <motion.div
        className={styles.portraitCard}
        animate={{ y: [0, -8, 0], rotate: [-1.8, 1.2, -1.8] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={portraitDataUrl} alt="Muhammad Adeel Iqbal" className={styles.portraitImg} />
      </motion.div>
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
