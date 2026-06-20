import Link from "next/link";
import styles from "./StatsSectionOptions.module.css";

const stats = [
  { value: "3+", label: "Years WordPress", code: "WP", tone: "orange", copy: "Hands-on WordPress, WooCommerce & Elementor Pro for international clients." },
  { value: "50+", label: "Projects Delivered", code: "PR", tone: "purple", copy: "Business, e-commerce, healthcare, booking and consultancy websites delivered." },
  { value: "20+", label: "Figma Builds", code: "FG", tone: "green", copy: "Figma and PSD designs converted into responsive, pixel-perfect WordPress sites." },
  { value: "6s→1.8s", label: "Speed Result", code: "SP", tone: "dark", copy: "Load-time improvements through cache, image optimisation and plugin cleanup." },
];

const chips = ["Elementor Pro", "WooCommerce", "ACF", "Custom Plugins", "Speed Fixes", "Figma to WordPress"];

function Backdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <span className={`${styles.orb} ${styles.orbBlue}`} />
      <span className={`${styles.orb} ${styles.orbGreen}`} />
      <span className={`${styles.orb} ${styles.orbPurple}`} />
      <span className={styles.edgeWash} />
    </div>
  );
}

function MetricCard({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  return (
    <article className={`${styles.metricCard} ${styles[stat.tone]}`}>
      <div className={styles.cardLine} />
      <div className={styles.code}>{stat.code}</div>
      <strong>{stat.value}</strong>
      <span>{stat.label}</span>
      <p>{stat.copy}</p>
      <small>0{index + 1}</small>
    </article>
  );
}

function IntroCard({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={`${styles.introCard} ${compact ? styles.introCompact : ""}`}>
      <div>
        <span className={styles.eyebrow}>Profile snapshot</span>
        <h2>I&apos;m Muhammad Adeel Iqbal</h2>
        <p>
          A WordPress Developer specialising in building, redesigning, and improving websites for international clients in UAE, UK, and USA — Elementor Pro, WooCommerce stores, custom plugins, and Figma-to-WordPress builds.
        </p>
      </div>
      <a href="mailto:adeeliqbalajum@gmail.com" className={styles.cta}>Work with me</a>
    </aside>
  );
}

function OptionA() {
  return (
    <section className={`${styles.option} ${styles.optionA}`}>
      <div className={styles.optionLabel}>Option A · Premium glass split</div>
      <div className={styles.splitGrid}>
        <IntroCard />
        <div className={styles.metricGrid}>{stats.map((stat, index) => <MetricCard stat={stat} index={index} key={stat.label} />)}</div>
      </div>
    </section>
  );
}

function OptionB() {
  return (
    <section className={`${styles.option} ${styles.optionB}`}>
      <div className={styles.optionLabel}>Option B · Center profile orbit</div>
      <div className={styles.orbitLayout}>
        <div className={styles.orbitCenter}>
          <span>WordPress System Builder</span>
          <h2>Muhammad Adeel Iqbal</h2>
          <p>Elementor, WooCommerce, custom plugins, speed and responsive builds.</p>
        </div>
        {stats.map((stat, index) => <MetricCard stat={stat} index={index} key={stat.label} />)}
      </div>
    </section>
  );
}

function OptionC() {
  return (
    <section className={`${styles.option} ${styles.optionC}`}>
      <div className={styles.optionLabel}>Option C · SaaS dashboard proof</div>
      <div className={styles.dashboard}>
        <div className={styles.dashboardTop}>
          <div>
            <span className={styles.eyebrow}>Capability dashboard</span>
            <h2>Proof that the work is not only visual</h2>
          </div>
          <div className={styles.status}>Available · UAE / UK / USA</div>
        </div>
        <div className={styles.dashboardGrid}>{stats.map((stat, index) => <MetricCard stat={stat} index={index} key={stat.label} />)}</div>
        <div className={styles.chipRow}>{chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
      </div>
    </section>
  );
}

function OptionD() {
  return (
    <section className={`${styles.option} ${styles.optionD}`}>
      <div className={styles.optionLabel}>Option D · Editorial bento</div>
      <div className={styles.bento}>
        <div className={styles.bentoHero}>
          <span className={styles.eyebrow}>About + impact</span>
          <h2>Building business websites that look sharp and work properly.</h2>
          <p>From landing pages to booking systems, WooCommerce stores and performance improvements.</p>
        </div>
        {stats.map((stat, index) => <MetricCard stat={stat} index={index} key={stat.label} />)}
      </div>
    </section>
  );
}

function OptionE() {
  return (
    <section className={`${styles.option} ${styles.optionE}`}>
      <div className={styles.optionLabel}>Option E · Dark contrast authority</div>
      <div className={styles.darkShell}>
        <IntroCard compact />
        <div className={styles.darkMetrics}>{stats.map((stat, index) => <MetricCard stat={stat} index={index} key={stat.label} />)}</div>
      </div>
    </section>
  );
}

export default function StatsSectionOptionsPage() {
  return (
    <main className={styles.page}>
      <Backdrop />
      <Link href="/" className={styles.back}>← Back home</Link>
      <header className={styles.header}>
        <span>Stats section design options</span>
        <h1>Five premium directions for the about / stats block</h1>
        <p>
          I kept the same information, but redesigned the section around the new cool glass hero mood so we can choose the strongest homepage version.
        </p>
      </header>
      <OptionA />
      <OptionB />
      <OptionC />
      <OptionD />
      <OptionE />
    </main>
  );
}
