"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import styles from "./WorkSectionOptions.module.css";

const projects = [
  {
    num: "01",
    title: "Desert Safari Dubai",
    category: "Booking Plugin",
    type: "Featured build",
    desc: "Custom booking system with private/shared tour logic, AED pricing, add-ons, admin approval, emails, and payment flow.",
    tags: ["WordPress", "PHP", "Booking Logic"],
    result: "Custom plugin",
    slug: "desert-safari-dubai",
  },
  {
    num: "02",
    title: "Embassy of Pakistan",
    category: "Government Website",
    type: "Authority build",
    desc: "Official website with Elementor, ACF structure, service pages, and passport application tracking functionality.",
    tags: ["Elementor", "ACF", "PHP"],
    result: "Tracking system",
    slug: "",
  },
  {
    num: "03",
    title: "GetCareMD",
    category: "Healthcare",
    type: "Conversion site",
    desc: "Telehealth website with service clarity, provider trust signals, responsive pages, and appointment-focused UX.",
    tags: ["Healthcare", "WordPress", "UX"],
    result: "Booking flow",
    slug: "getcaremd",
  },
  {
    num: "04",
    title: "Pacific Valor Law",
    category: "Legal Website",
    type: "Trust-first site",
    desc: "VA disability attorney website with case review CTA, strong credibility flow, and mobile-first service pages.",
    tags: ["Legal", "Elementor", "CTA"],
    result: "Lead-ready",
    slug: "pacific-valor-law",
  },
  {
    num: "05",
    title: "7 Sky Consultant",
    category: "Education",
    type: "Consultancy site",
    desc: "Study abroad consultancy website focused on visa success, scholarship placement, and service credibility.",
    tags: ["Education", "Landing Pages", "SEO"],
    result: "Trust layout",
    slug: "7sky-consultant",
  },
  {
    num: "06",
    title: "Seva Wealth",
    category: "Finance",
    type: "Premium brand site",
    desc: "Wealth management website with clean positioning, Calendly integration, and confidence-focused content structure.",
    tags: ["Finance", "Calendly", "Brand UX"],
    result: "Premium UX",
    slug: "seva-wealth",
  },
];

const optionTabs = ["Desert Safari Dubai", "GetCareMD", "Seva Wealth"];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.25 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

function WorkLink({ project, children, className }: { project: typeof projects[number]; children: React.ReactNode; className: string }) {
  if (project.slug) {
    return (
      <Link href={`/portfolio/${project.slug}`} className={className}>
        {children}
      </Link>
    );
  }

  return <article className={className}>{children}</article>;
}

export default function WorkSectionOptionsPage() {
  const [activeProject, setActiveProject] = React.useState(optionTabs[0]);
  const active = projects.find((project) => project.title === activeProject) || projects[0];

  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>← Back to portfolio</Link>

      <section className={styles.hero}>
        <motion.div {...fadeUp} className={styles.heroInner}>
          <div className={styles.kicker}>Real homepage previews</div>
          <h1>Choose the new “Real work, real clients” section direction.</h1>
          <p>
            These are not mockup images. Each option is a real responsive section preview with motion, hover states, and real project content.
          </p>
        </motion.div>
      </section>

      <section className={`${styles.option} ${styles.optionA}`} id="option-a">
        <motion.div {...fadeUp} className={styles.optionHead}>
          <span>Option A</span>
          <h2>Editorial featured case studies</h2>
          <p>Best if you want the section to feel premium, clear, and client-focused. Two large featured projects first, then supporting projects.</p>
        </motion.div>

        <div className={styles.editorialGrid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 34, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.18 }}
              transition={{ duration: 0.58, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={index < 2 ? styles.featuredWrap : styles.standardWrap}
            >
              <WorkLink project={project} className={`${styles.caseCard} ${index < 2 ? styles.featuredCard : styles.standardCard}`}>
                <div className={styles.cardChrome}>
                  <i />
                  <i />
                  <i />
                </div>
                <div className={styles.caseMeta}>
                  <span>{project.num}</span>
                  <span>{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className={styles.tagRow}>
                  {project.tags.map((tag) => <small key={tag}>{tag}</small>)}
                </div>
                <strong>{project.slug ? "View case study →" : "Project summary →"}</strong>
              </WorkLink>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={`${styles.option} ${styles.optionB}`} id="option-b">
        <motion.div {...fadeUp} className={styles.optionHead}>
          <span>Option B</span>
          <h2>Client outcome timeline</h2>
          <p>Best if you want to show maturity: strategy, build quality, real outcomes, and project variety in one structured section.</p>
        </motion.div>

        <div className={styles.timelineWrap}>
          <motion.aside
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            className={styles.timelineIntro}
          >
            <div className={styles.kicker}>Selected client work</div>
            <h3>Real work. Real client outcomes.</h3>
            <p>
              A polished board that connects every project to a business problem: bookings, trust, conversion, speed, and custom WordPress logic.
            </p>
            <Link href="/portfolio" className={styles.darkButton}>View all 19 projects →</Link>
          </motion.aside>

          <div className={styles.timelineList}>
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.22 }}
                transition={{ duration: 0.58, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
                className={styles.timelineItem}
              >
                <div className={styles.timelineNum}>{project.num}</div>
                <div className={styles.timelineCard}>
                  <div>
                    <small>{project.type}</small>
                    <h4>{project.title}</h4>
                    <p>{project.desc}</p>
                  </div>
                  <span>{project.result}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.option} ${styles.optionC}`} id="option-c">
        <motion.div {...fadeUp} className={styles.optionHead}>
          <span>Option C</span>
          <h2>Interactive spotlight bento</h2>
          <p>Best if you want the section to feel modern and interactive. The active project gets a bigger visual preview while the rest stay as quick proof cards.</p>
        </motion.div>

        <div className={styles.spotlightBoard}>
          <motion.div
            key={active.title}
            initial={{ opacity: 0, scale: 0.97, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={styles.spotlightMain}
          >
            <div className={styles.spotlightGlow} />
            <div className={styles.spotlightTop}>
              <small>{active.category}</small>
              <span>{active.result}</span>
            </div>
            <h3>{active.title}</h3>
            <p>{active.desc}</p>
            <div className={styles.previewWindow}>
              <div className={styles.previewTop}><i /><i /><i /></div>
              <div className={styles.previewBody}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </motion.div>

          <div className={styles.spotlightSide}>
            <div className={styles.tabStack}>
              {optionTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveProject(tab)}
                  className={tab === activeProject ? styles.activeTab : ""}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className={styles.miniProofs}>
              {projects.slice(3).map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ x: 6 }}
                >
                  <small>{project.category}</small>
                  <strong>{project.title}</strong>
                  <span>{project.result}</span>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
