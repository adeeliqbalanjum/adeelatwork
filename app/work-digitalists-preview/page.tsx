"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import styles from "./WorkDigitalistsPreview.module.css";

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
      <img src={activeCase.image} alt={`${activeCase.client} project thumbnail`} className={styles.realPreviewImage} />
      <div className={styles.previewOverlay} />
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
