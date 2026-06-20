"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import styles from "./WorkDigitalistsPreview.module.css";
import "./WorkDigitalistsSuggestions.css";

const basePath = process.env.NODE_ENV === "production" ? "/adeelatwork" : "";

const cases = [
  {
    code: "CS 695",
    title: "Hardware solutions website for MSP & IT providers",
    client: "Griffin IT",
    services: "Screen design, WordPress programming, responsive build",
    tone: "blue",
    image: `${basePath}/work-images/griffin-it.webp`,
    href: "",
  },
  {
    code: "CS 682",
    title: "International travels and tours website rebuild",
    client: "Kay Kay Travels",
    services: "Travel website, responsive UI, service-led structure",
    tone: "green",
    image: `${basePath}/work-images/kay-kay.webp`,
    href: "",
  },
  {
    code: "CS 566",
    title: "Holiday booking website for travel enquiries",
    client: "Book My Holidays",
    services: "Travel landing page, form UI, responsive design",
    tone: "blue",
    image: `${basePath}/work-images/book-my-holidays.webp`,
    href: "",
  },
  {
    code: "CS 704",
    title: "Business solutions website with premium brand feel",
    client: "Griffin Resources",
    services: "Business website, brand UI, mobile layout",
    tone: "purple",
    image: `${basePath}/work-images/griffin-resources.webp`,
    href: "",
  },
  {
    code: "CS 738",
    title: "Smart technology and entertainment solutions website",
    client: "ATDI",
    services: "Smart tech website, modern UI, conversion sections",
    tone: "gold",
    image: `${basePath}/work-images/atdi.webp`,
    href: "",
  },
  {
    code: "CS 741",
    title: "Healthcare website for online doctor convenience",
    client: "FastDocNow",
    services: "Healthcare WordPress, search UX, mobile responsive",
    tone: "blue",
    image: `${basePath}/work-images/fastdocnow.webp`,
    href: "",
  },
];

function CasePreview({ activeCase }: { activeCase: typeof cases[number] }) {
  return (
    <motion.div
      key={activeCase.title}
      className={`${styles.casePreview} ${styles[activeCase.tone]}`}
      initial={{ opacity: 0, y: 22, scale: 0.96, rotate: -2 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, y: -18, scale: 0.96 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={activeCase.image} alt={`${activeCase.client} project thumbnail`} className="work-real-preview-image" />
      <div className="work-real-preview-overlay" />
      <div className={styles.browserTop}>
        <i />
        <i />
        <i />
        <span>{activeCase.client}</span>
      </div>
      <div className={styles.previewBody}>
        <div className={styles.previewHero} />
        <div className={styles.previewLines}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.previewCards}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </motion.div>
  );
}

function SuggestionPreview({ activeCase, variant }: { activeCase: typeof cases[number]; variant: "soft" | "dark" | "compact" }) {
  return (
    <AnimatePresence mode="wait">
      <motion.figure
        key={`${variant}-${activeCase.client}`}
        className={`suggestion-preview suggestion-preview--${variant}`}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 0.96 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={activeCase.image} alt={`${activeCase.client} preview`} />
        <figcaption>
          <span>{activeCase.code}</span>
          <strong>{activeCase.client}</strong>
        </figcaption>
      </motion.figure>
    </AnimatePresence>
  );
}

function SuggestionSection({
  variant,
  label,
  title,
  description,
}: {
  variant: "soft" | "dark" | "compact";
  label: string;
  title: string;
  description: string;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeCase = cases[activeIndex];

  return (
    <section className={`work-suggestion work-suggestion--${variant}`}>
      <motion.div
        className="suggestion-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.32 }}
        transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>{label}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </motion.div>

      <div className="suggestion-layout">
        <div className="suggestion-media-col">
          <SuggestionPreview activeCase={activeCase} variant={variant} />
        </div>

        <div className="suggestion-list">
          {cases.map((item, index) => {
            const active = index === activeIndex;
            return (
              <motion.article
                key={item.client}
                className={`suggestion-row ${active ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                tabIndex={0}
                initial={{ opacity: 0, x: 34 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.18 }}
                transition={{ duration: 0.48, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="suggestion-code">{item.code}</span>
                <div>
                  <h3>{item.title}</h3>
                  <small>{item.client}</small>
                </div>
                <p>{item.services}</p>
                <ArrowUpRight size={22} />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function WorkDigitalistsPreviewPage() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeCase = cases[activeIndex];

  return (
    <main className={styles.page}>
      <Link href="/work-section-options" className={styles.back}>← Back to options</Link>

      <section className={styles.workSection}>
        <div className={styles.topBar}>
          <motion.div
            className={styles.handLabel}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58 }}
          >
            Case studies that actually happened
          </motion.div>

          <motion.div
            className={styles.centerLabel}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.08 }}
          >
            <span>Creative WordPress solutions</span>
            <i />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.14 }}
          >
            <Link href="/portfolio" className={styles.allCases}>All cases <b /></Link>
          </motion.div>
        </div>

        <div className={styles.caseListWrap}>
          <AnimatePresence mode="wait">
            <CasePreview activeCase={activeCase} />
          </AnimatePresence>

          <div className={styles.caseList}>
            {cases.map((item, index) => {
              const active = index === activeIndex;
              const rowContent = (
                <>
                  <span className={styles.caseCode}>{item.code}</span>
                  <h3>{item.title}</h3>
                  <strong>{item.client}</strong>
                  <p>· {item.services}</p>
                  <span className={styles.gridIcon}><ArrowUpRight size={24} /></span>
                </>
              );

              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`${styles.caseRow} ${active ? styles.active : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                >
                  {rowContent}
                </Link>
              ) : (
                <article
                  key={item.title}
                  className={`${styles.caseRow} ${active ? styles.active : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {rowContent}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SuggestionSection
        variant="soft"
        label="Suggestion 01"
        title="Soft premium case rows"
        description="This keeps the Digitalists structure, but changes the color system to match your current clean Apple/SaaS portfolio style. Best choice for homepage."
      />

      <SuggestionSection
        variant="dark"
        label="Suggestion 02"
        title="Dark high-contrast portfolio list"
        description="This version feels more agency-level and dramatic. The images become the hero while the rows stay minimal and sharp."
      />

      <SuggestionSection
        variant="compact"
        label="Suggestion 03"
        title="Compact client proof board"
        description="This is the safest conversion-focused option. It keeps the row interaction but uses tighter spacing, clearer content, and less visual noise."
      />
    </main>
  );
}
