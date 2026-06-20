"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

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

function HomeDigitalistsWorkSection() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const activeTone = hoveredIndex === null ? "default" : cases[hoveredIndex].tone;

  return (
    <div className={`home-digitalists-work digitalists-active-tone-${activeTone}`}>
      <div className="home-digitalists-topbar">
        <motion.div
          className="home-digitalists-hand"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.58 }}
        >
          Case studies that actually happened
        </motion.div>

        <motion.div
          className="home-digitalists-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.58, delay: 0.08 }}
        >
          <span>Creative WordPress solutions</span>
          <i />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.58, delay: 0.14 }}
        >
          <Link href="/portfolio" className="home-digitalists-all">All cases <b /></Link>
        </motion.div>
      </div>

      <div className="home-digitalists-list">
        {cases.map((item, index) => {
          const active = hoveredIndex === index;
          const rowContent = (
            <>
              <span className="home-digitalists-code">{item.code}</span>
              <h3>{item.title}</h3>
              <strong>{item.client}</strong>
              <p>· {item.services}</p>
              <span className="home-digitalists-icon"><ArrowUpRight size={24} /></span>
              <span className="home-digitalists-preview" aria-hidden="true">
                <img src={item.image} alt="" />
                <span className="home-digitalists-caption">
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
              className={`home-digitalists-row ${active ? "is-active" : ""}`}
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
              className={`home-digitalists-row ${active ? "is-active" : ""}`}
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
  );
}

export function HomeDigitalistsWorkMount() {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const projects = document.getElementById("projects");
    if (!projects) return;

    projects.classList.add("home-digitalists-mounted");
    setTarget(projects);

    return () => {
      projects.classList.remove("home-digitalists-mounted");
    };
  }, []);

  if (!target) return null;

  return createPortal(<HomeDigitalistsWorkSection />, target);
}
