"use client";

import * as React from "react";
import { createPortal } from "react-dom";

const stats = [
  { value: "3+", label: "Years WordPress", code: "WP", tone: "orange", copy: "Hands-on WordPress, WooCommerce & Elementor Pro for international clients." },
  { value: "50+", label: "Projects Delivered", code: "PR", tone: "purple", copy: "Business, e-commerce, healthcare, booking and consultancy websites delivered." },
  { value: "20+", label: "Figma Builds", code: "FG", tone: "green", copy: "Figma and PSD designs converted into responsive, pixel-perfect WordPress sites." },
  { value: "6s→1.8s", label: "Speed Result", code: "SP", tone: "dark", copy: "Load-time improvements through cache, image optimisation and plugin cleanup." },
];

function MetricCard({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  return (
    <article className={`home-stats-e-card ${stat.tone}`}>
      <div className="home-stats-e-line" />
      <div className="home-stats-e-code">{stat.code}</div>
      <strong>{stat.value}</strong>
      <span>{stat.label}</span>
      <p>{stat.copy}</p>
      <small>0{index + 1}</small>
    </article>
  );
}

function HomeStatsOptionE() {
  return (
    <div className="home-stats-e">
      <div className="home-stats-e-backdrop" aria-hidden="true">
        <span className="home-stats-e-orb home-stats-e-orb-blue" />
        <span className="home-stats-e-orb home-stats-e-orb-green" />
        <span className="home-stats-e-orb home-stats-e-orb-purple" />
        <span className="home-stats-e-edge" />
      </div>

      <div className="home-stats-e-shell">
        <aside className="home-stats-e-intro">
          <div>
            <span className="home-stats-e-eyebrow">Profile snapshot</span>
            <h2>I&apos;m Muhammad Adeel Iqbal</h2>
            <span className="home-stats-e-name-line" aria-hidden="true" />
            <p>
              A WordPress Developer specialising in building, redesigning, and improving websites for international clients in UAE, UK, and USA — Elementor Pro, WooCommerce stores, custom plugins, and Figma-to-WordPress builds.
            </p>
          </div>
          <a href="mailto:adeeliqbalajum@gmail.com" className="home-stats-e-cta">Work with me</a>
        </aside>

        <div className="home-stats-e-metrics">
          {stats.map((stat, index) => <MetricCard stat={stat} index={index} key={stat.label} />)}
        </div>
      </div>
    </div>
  );
}

export function HomeStatsOptionEMount() {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const section = document.getElementById("about");
    if (!section) return;

    section.classList.add("home-stats-option-e-mounted");
    setTarget(section);

    return () => {
      section.classList.remove("home-stats-option-e-mounted");
    };
  }, []);

  if (!target) return null;

  return createPortal(<HomeStatsOptionE />, target);
}
