"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  Code2,
  Gauge,
  HeartPulse,
  Landmark,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import styles from "./WorkStackedCardsPreview.module.css";

const stackedCards = [
  {
    icon: <Code2 size={18} />,
    title: "Desert Safari Dubai",
    description: "Custom booking plugin",
    date: "AED pricing · add-ons · approvals",
    accent: "orange",
  },
  {
    icon: <Landmark size={18} />,
    title: "Embassy of Pakistan",
    description: "Government website",
    date: "Elementor · ACF · tracking system",
    accent: "purple",
  },
  {
    icon: <HeartPulse size={18} />,
    title: "GetCareMD",
    description: "Healthcare website",
    date: "Trust UX · service pages · booking CTA",
    accent: "green",
  },
];

const miniCards = [
  {
    icon: <BriefcaseBusiness size={17} />,
    title: "Pacific Valor Law",
    description: "Legal website",
    date: "Lead-focused case review flow",
    accent: "blue",
  },
  {
    icon: <ShoppingCart size={17} />,
    title: "WooCommerce Builds",
    description: "Store logic",
    date: "Product, cart, checkout improvements",
    accent: "purple",
  },
  {
    icon: <Gauge size={17} />,
    title: "Speed Optimization",
    description: "Core Web Vitals",
    date: "Cache, images, plugin cleanup",
    accent: "green",
  },
];

function DisplayCard({
  card,
  index,
  compact = false,
}: {
  card: typeof stackedCards[number];
  index: number;
  compact?: boolean;
}) {
  return (
    <motion.article
      className={`${styles.displayCard} ${styles[`card${index + 1}`]} ${styles[card.accent]} ${compact ? styles.compact : ""}`}
      initial={{ opacity: 0, y: 34, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.62, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: compact ? -4 : -18, x: compact ? 0 : 8, scale: 1.02 }}
    >
      <div className={styles.cardTop}>
        <span className={styles.iconWrap}>{card.icon}</span>
        <p>{card.title}</p>
      </div>
      <strong>{card.description}</strong>
      <small>{card.date}</small>
    </motion.article>
  );
}

export default function WorkStackedCardsPreviewPage() {
  return (
    <main className={styles.page}>
      <Link href="/work-section-options" className={styles.back}>← Back to options</Link>

      <section className={styles.previewSection}>
        <div className={styles.bgGrid} aria-hidden="true" />
        <span className={`${styles.blob} ${styles.blobOne}`} aria-hidden="true" />
        <span className={`${styles.blob} ${styles.blobTwo}`} aria-hidden="true" />

        <div className={styles.contentGrid}>
          <motion.div
            className={styles.copy}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.kicker}>
              <Sparkles size={14} />
              Real work, real clients
            </div>
            <h1>Selected client work, stacked like premium proof cards.</h1>
            <p>
              This version uses the skewed stacked-card style you shared, but adapted for your portfolio with real WordPress, WooCommerce, healthcare, legal, and custom plugin projects.
            </p>

            <div className={styles.actions}>
              <Link href="/portfolio" className={styles.darkButton}>View all projects</Link>
              <Link href="/" className={styles.lightButton}>Homepage</Link>
            </div>
          </motion.div>

          <div className={styles.stackArea} aria-label="Stacked client work cards">
            <div className={styles.stackGlow} aria-hidden="true" />
            <div className={styles.cardStack}>
              {stackedCards.map((card, index) => (
                <DisplayCard card={card} index={index} key={card.title} />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className={styles.proofStrip}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          {miniCards.map((card, index) => (
            <DisplayCard card={card} index={index} compact key={card.title} />
          ))}
        </motion.div>
      </section>
    </main>
  );
}
