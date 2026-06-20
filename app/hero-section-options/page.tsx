"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import styles from "./HeroSectionOptions.module.css";

const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

const options = [
  {
    id: "option-a",
    label: "Option A",
    name: "Porcelain Aurora",
    note: "Keeps your current soft feeling, but makes the background cleaner, lighter, and more premium.",
  },
  {
    id: "option-b",
    label: "Option B",
    name: "Mint Glass",
    note: "Cooler green/blue glass style that connects with the new projects section.",
  },
  {
    id: "option-c",
    label: "Option C",
    name: "Warm Studio",
    note: "Soft cream and peach tones for a friendly premium WordPress consultant look.",
  },
  {
    id: "option-d",
    label: "Option D",
    name: "Graphite Spotlight",
    note: "A dark agency-style hero with strong contrast and glowing motion accents.",
  },
  {
    id: "option-e",
    label: "Option E",
    name: "Clean Paper Grid",
    note: "Minimal, editorial, high-trust background with subtle grid and small motion layers.",
  },
];

function MiniShowcase() {
  return (
    <motion.div
      className={styles.showcase}
      initial={{ opacity: 0, y: 34, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.showcaseHaze} />
      <div className={styles.cardStrip} aria-hidden="true">
        {[
          ["Booking Plugin", "Dynamic pricing + admin approvals", "a"],
          ["WooCommerce", "Store logic + checkout UX", "b"],
          ["Elementor Pro", "Editable client sections", "c"],
        ].map(([title, text, shape]) => (
          <article className={styles.siteCard} key={title}>
            <div className={styles.browser}><i /><i /><i /></div>
            <div className={styles.siteBody}>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className={`${styles.siteShape} ${styles[`shape${shape}`]}`} />
            </div>
          </article>
        ))}
      </div>
      <motion.div
        className={styles.portraitCard}
        animate={{ y: [0, -10, 0], rotate: [-1, 1.4, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={portraitDataUrl} alt="Muhammad Adeel Iqbal" />
      </motion.div>
    </motion.div>
  );
}

function HeroOption({ option }: { option: (typeof options)[number] }) {
  return (
    <section className={`${styles.heroOption} ${styles[option.id]}`}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <span className={`${styles.orb} ${styles.orbOne}`} aria-hidden="true" />
      <span className={`${styles.orb} ${styles.orbTwo}`} aria-hidden="true" />
      <span className={`${styles.orb} ${styles.orbThree}`} aria-hidden="true" />
      <span className={styles.motionRing} aria-hidden="true" />

      <nav className={styles.nav} aria-label={`${option.name} demo navigation`}>
        <a className={styles.navLogo} href="#">
          <img src={portraitDataUrl} alt="" />
        </a>
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
        viewport={{ once: false, amount: 0.42 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.statusPill}>
          <i />
          <strong>Available</strong>
          <span>for premium WordPress builds</span>
        </div>

        <h1>
          <span>WordPress developer</span>{" "}
          building fast, high-impact websites
        </h1>

        <p>
          I build and redesign WordPress &amp; WooCommerce websites for businesses in the UAE, UK, and USA — from Figma to pixel-perfect, conversion-ready sites.
        </p>

        <div className={styles.actions}>
          <a href="#" className={styles.btnDark}>✦ Let&apos;s talk</a>
          <a href="#" className={styles.btnGhost}>Browse work</a>
        </div>

        <small className={styles.note}>{option.note}</small>
      </motion.div>

      <MiniShowcase />
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
