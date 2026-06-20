"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import styles from "./WorkDigitalistsPreview.module.css";
import "./WorkDigitalistsNeonPolish.css";
import "./WorkDigitalistsFormatOptions.css";

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

type SectionVariant = "neon" | "cream" | "graphite" | "ice";

function DigitalistsCaseSection({
  variant,
  label,
  centerLabel,
  ctaLabel,
}: {
  variant: SectionVariant;
  label: string;
  centerLabel: string;
  ctaLabel: string;
}) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const isNeon = variant === "neon";

  return (
    <section
      className={`${styles.workSection} ${isNeon ? "digitalists-neon-section" : "digitalists-section-shell"} digitalists-section--${variant}`}
    >
      <div className={`${styles.topBar} digitalists-top-bar`}>
        <motion.div
          className={styles.handLabel}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.58 }}
        >
          {label}
        </motion.div>

        <motion.div
          className={styles.centerLabel}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.58, delay: 0.08 }}
        >
          <span>{centerLabel}</span>
          <i />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.58, delay: 0.14 }}
        >
          <Link href="/portfolio" className={styles.allCases}>{ctaLabel} <b /></Link>
        </motion.div>
      </div>

      <div className={`${styles.caseListWrap} digitalists-case-list-wrap`}>
        <div className={`${styles.caseList} digitalists-case-list`}>
          {cases.map((item, index) => {
            const active = hoveredIndex === index;
            const rowContent = (
              <>
                <span className={styles.caseCode}>{item.code}</span>
                <h3>{item.title}</h3>
                <strong>{item.client}</strong>
                <p>· {item.services}</p>
                <span className={styles.gridIcon}><ArrowUpRight size={24} /></span>
                <span className="digitalists-row-preview" aria-hidden="true">
                  <img src={item.image} alt="" />
                  <span className="digitalists-row-caption">
                    <em>{item.code}</em>
                    <b>{item.client}</b>
                  </span>
                </span>
              </>
            );

            return item.href ? (
              <Link
                key={item.title}
                href={item.href}
                className={`${styles.caseRow} digitalists-case-row ${active ? `${styles.active} is-active` : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
              >
                {rowContent}
              </Link>
            ) : (
              <article
                key={item.title}
                className={`${styles.caseRow} digitalists-case-row ${active ? `${styles.active} is-active` : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                tabIndex={0}
              >
                {rowContent}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function WorkDigitalistsPreviewPage() {
  return (
    <main className={`${styles.page} digitalists-neon-page`}>
      <Link href="/work-section-options" className={styles.back}>← Back to options</Link>

      <DigitalistsCaseSection
        variant="neon"
        label="Case studies that actually happened"
        centerLabel="Creative WordPress solutions"
        ctaLabel="All cases"
      />

      <DigitalistsCaseSection
        variant="cream"
        label="Design option 01"
        centerLabel="Soft premium case list"
        ctaLabel="View cases"
      />

      <DigitalistsCaseSection
        variant="graphite"
        label="Design option 02"
        centerLabel="Dark agency case list"
        ctaLabel="View cases"
      />

      <DigitalistsCaseSection
        variant="ice"
        label="Design option 03"
        centerLabel="Cool glass case list"
        ctaLabel="View cases"
      />
    </main>
  );
}
