"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { withBasePath } from "../site-config";

const cases = [
  {
    code: "CS 772",
    title: "Vehicle inventory website with custom theme, plugin and filters",
    client: "RockBusto Fleet",
    services: "ACF + CPT inventory, filterable grid, quote requests",
    tone: "gold",
    image: withBasePath("/work-images/mockups/rockbusto-fleet-card.jpg"),
    href: "/portfolio/rockbusto-fleet",
  },
  {
    code: "CS 760",
    title: "Tour booking site with a custom booking form and reviews widget",
    client: "Desert Safari Dubai",
    services: "WooCommerce booking, custom PHP widget, Elementor Pro",
    tone: "gold",
    image: withBasePath("/work-images/mockups/desert-safari-dubai-card.jpg"),
    href: "/portfolio/desert-safari-dubai",
  },
  {
    code: "CS 695",
    title: "Hardware solutions website for MSP & IT providers",
    client: "Griffin IT",
    services: "Screen design, WordPress programming, responsive build",
    tone: "blue",
    image: withBasePath("/work-images/mockups/griffin-it-card.jpg"),
    href: "/portfolio/griffin-it",
  },
  {
    code: "CS 682",
    title: "International travels and tours website rebuild",
    client: "Kay Kay Travels",
    services: "Travel website, responsive UI, service-led structure",
    tone: "green",
    image: withBasePath("/work-images/mockups/kk-travels-and-tours-card.jpg"),
    href: "/portfolio/kk-travels-and-tours",
  },
  {
    code: "CS 566",
    title: "Holiday booking website for travel enquiries",
    client: "Book My Holidays",
    services: "Travel landing page, form UI, responsive design",
    tone: "blue",
    image: withBasePath("/work-images/mockups/bookmyholidays-uk-card.jpg"),
    href: "/portfolio/bookmyholidays-uk",
  },
  {
    code: "CS 704",
    title: "Business solutions website with premium brand feel",
    client: "Griffin Resources",
    services: "Business website, brand UI, mobile layout",
    tone: "purple",
    image: withBasePath("/work-images/mockups/griffin-resources-card.jpg"),
    href: "/portfolio/griffin-resources",
  },
  {
    code: "CS 738",
    title: "Smart technology and entertainment solutions website",
    client: "ATDI",
    services: "Smart tech website, modern UI, conversion sections",
    tone: "gold",
    image: withBasePath("/work-images/mockups/artisan-technologies-card.jpg"),
    href: "/portfolio/artisan-technologies",
  },
  {
    code: "CS 741",
    title: "Healthcare website for online doctor convenience",
    client: "FastDocNow",
    services: "Healthcare WordPress, search UX, mobile responsive",
    tone: "blue",
    image: withBasePath("/work-images/mockups/fastdocnow-card.jpg"),
    href: "/portfolio/fastdocnow",
  },
];

function HomeDigitalistsWorkSection() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const activeTone = hoveredIndex === null ? "default" : cases[hoveredIndex].tone;

  return (
    <div className={`home-digitalists-work digitalists-active-tone-${activeTone}`}>
      <div className="home-digitalists-topbar">
        <motion.div className="home-digitalists-hand" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.35 }} transition={{ duration: 0.58 }}>
          Case studies that actually happened
        </motion.div>
        <motion.div className="home-digitalists-center" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.35 }} transition={{ duration: 0.58, delay: 0.08 }}>
          <span>Creative WordPress solutions</span><i />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.35 }} transition={{ duration: 0.58, delay: 0.14 }}>
          <Link href="/portfolio" className="home-digitalists-all">All cases <b /></Link>
        </motion.div>
      </div>

      <div className="home-digitalists-list">
        {cases.map((item, index) => {
          const active = hoveredIndex === index;
          return (
            <Link key={item.title} href={item.href} className={`home-digitalists-row ${active ? "is-active" : ""}`} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} onFocus={() => setHoveredIndex(index)} onBlur={() => setHoveredIndex(null)}>
              <span className="home-digitalists-code">{item.code}</span>
              <h3>{item.title}</h3>
              <strong>{item.client}</strong>
              <p>· {item.services}</p>
              <span className="home-digitalists-icon"><ArrowUpRight size={24} /></span>
              <span className="home-digitalists-preview" aria-hidden="true">
                <img src={item.image} alt="" />
                <span className="home-digitalists-caption"><em>{item.code}</em><b>{item.client}</b></span>
              </span>
            </Link>
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
    return () => projects.classList.remove("home-digitalists-mounted");
  }, []);

  if (!target) return null;
  return createPortal(<HomeDigitalistsWorkSection />, target);
}
