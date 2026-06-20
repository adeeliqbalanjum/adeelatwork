"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import styles from "./WorkDigitalistsPreview.module.css";

const cases = [
  {
    code: "CS 695",
    title: "Custom booking plugin for Desert Safari Dubai",
    client: "Desert Safari Dubai",
    services: "WordPress, PHP, booking logic, AED pricing",
    tone: "orange",
    href: "/portfolio/desert-safari-dubai",
  },
  {
    code: "CS 682",
    title: "Government website with passport tracking",
    client: "Embassy of Pakistan",
    services: "Elementor, ACF, custom PHP tracking system",
    tone: "purple",
    href: "",
  },
  {
    code: "CS 566",
    title: "Healthcare website for online consultations",
    client: "GetCareMD",
    services: "Healthcare UX, responsive pages, booking CTA",
    tone: "green",
    href: "/portfolio/getcaremd",
  },
  {
    code: "CS 704",
    title: "Legal website for overseas veterans",
    client: "Pacific Valor Law",
    services: "Screen design, Elementor, lead-generation flow",
    tone: "blue",
    href: "/portfolio/pacific-valor-law",
  },
  {
    code: "CS 738",
    title: "Education consultancy website rebuild",
    client: "7 Sky Consultant",
    services: "Landing pages, trust sections, responsive design",
    tone: "gold",
    href: "/portfolio/7sky-consultant",
  },
  {
    code: "CS 741",
    title: "Premium finance website with Calendly flow",
    client: "Seva Wealth",
    services: "Finance UX, brand positioning, Calendly integration",
    tone: "purple",
    href: "/portfolio/seva-wealth",
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
    </main>
  );
}
