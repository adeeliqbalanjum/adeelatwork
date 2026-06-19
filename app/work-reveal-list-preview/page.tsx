"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import styles from "./WorkRevealListPreview.module.css";

type PreviewTone = "orange" | "purple" | "green" | "blue" | "gold";

type ProjectItem = {
  text: string;
  category: string;
  summary: string;
  result: string;
  tone: PreviewTone;
};

const items: ProjectItem[] = [
  {
    text: "Desert Safari Dubai",
    category: "Booking plugin",
    summary: "Private and shared tour pricing, add-ons, admin approvals, emails, and payment flow.",
    result: "Custom WordPress build",
    tone: "orange",
  },
  {
    text: "Embassy of Pakistan",
    category: "Official website",
    summary: "Official website structure with service pages, Elementor layouts, ACF fields, and custom PHP functionality.",
    result: "Elementor + custom PHP",
    tone: "purple",
  },
  {
    text: "GetCareMD",
    category: "Healthcare website",
    summary: "Telehealth service pages with trust-focused content and appointment-led user experience.",
    result: "Conversion-ready UX",
    tone: "green",
  },
  {
    text: "Pacific Valor Law",
    category: "Legal website",
    summary: "Attorney website with free case review flow, credibility layout, and mobile-first service pages.",
    result: "Lead-focused build",
    tone: "blue",
  },
  {
    text: "Seva Wealth",
    category: "Finance website",
    summary: "Premium wealth management website with clean positioning and Calendly integration.",
    result: "Premium brand UX",
    tone: "gold",
  },
];

function PreviewImage({ tone, layer }: { tone: PreviewTone; layer: "front" | "back" }) {
  return (
    <div className={`${styles.previewImage} ${styles[tone]} ${styles[layer]}`}>
      <div className={styles.previewTop}>
        <i />
        <i />
        <i />
      </div>
      <div className={styles.previewBody}>
        <span className={styles.previewHero} />
        <span />
        <span />
      </div>
    </div>
  );
}

function RevealImageListItem({ item, index }: { item: ProjectItem; index: number }) {
  return (
    <motion.article
      className={styles.listItem}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.32 }}
      transition={{ duration: 0.62, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.itemTextWrap}>
        <small>{item.category}</small>
        <h2>{item.text}</h2>
      </div>

      <p>{item.summary}</p>

      <div className={styles.resultPill}>{item.result}</div>

      <div className={styles.imageContainer} aria-hidden="true">
        <div className={styles.imageBack}>
          <PreviewImage tone={item.tone} layer="back" />
        </div>
        <div className={styles.imageFront}>
          <PreviewImage tone={item.tone} layer="front" />
        </div>
      </div>
    </motion.article>
  );
}

export default function WorkRevealListPreviewPage() {
  return (
    <main className={styles.page}>
      <Link href="/work-section-options" className={styles.back}>← Back to options</Link>

      <section className={styles.section}>
        <div className={styles.bgGrid} aria-hidden="true" />
        <span className={`${styles.blob} ${styles.blobOne}`} aria-hidden="true" />
        <span className={`${styles.blob} ${styles.blobTwo}`} aria-hidden="true" />

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.kicker}>
            <Sparkles size={14} />
            Hover reveal option
          </div>
          <h1>Real work, real clients.</h1>
          <p>
            This direction uses the large hover-list style you shared. Each client name becomes the hero, and project preview cards reveal on hover.
          </p>
        </motion.div>

        <div className={styles.revealList}>
          <div className={styles.listLabel}>Selected work</div>
          {items.map((item, index) => (
            <RevealImageListItem item={item} index={index} key={item.text} />
          ))}
        </div>

        <motion.div
          className={styles.footerCta}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/portfolio">
            View all 19 projects <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
