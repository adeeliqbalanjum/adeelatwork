"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxItem {
  label: string;
  sub: string;
  gradient: string;
}

const featureSections = [
  {
    eyebrow: "Custom WordPress systems",
    title: "Booking flows, dashboards, and client-ready plugin logic.",
    description:
      "I build WordPress functionality that goes beyond static pages: booking systems, admin workflows, dynamic pricing, approval logic, email flows, and custom fields that clients can manage easily.",
    metric: "Plugin logic",
    gradient: "linear-gradient(135deg, rgba(255,122,24,.95), rgba(247,214,74,.78))",
    reverse: false,
  },
  {
    eyebrow: "Pixel-perfect Elementor builds",
    title: "Layouts that feel premium, editable, and responsive.",
    description:
      "From Figma or screenshots, I create Elementor Pro pages that remain editable while preserving visual spacing, typography, responsive behavior, and conversion-focused structure.",
    metric: "Editable UI",
    gradient: "linear-gradient(135deg, rgba(168,85,247,.94), rgba(34,197,94,.54))",
    reverse: true,
  },
  {
    eyebrow: "Performance and polish",
    title: "Speed, motion, and clean interaction details.",
    description:
      "I optimize front-end performance, clean plugin bloat, improve Core Web Vitals, and add tasteful scroll and hover animation that makes the site feel modern without breaking usability.",
    metric: "6s -> 1.8s",
    gradient: "linear-gradient(135deg, rgba(34,197,94,.90), rgba(7,7,7,.78))",
    reverse: false,
  },
];

export function ZoomParallax() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".feature-scroll-item");

      items.forEach((item) => {
        const content = item.querySelector(".feature-scroll-content");
        const visual = item.querySelector(".feature-scroll-visual");
        const media = item.querySelector(".feature-scroll-media");

        gsap.fromTo(
          content,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              end: "center 42%",
              scrub: 0.75,
            },
          }
        );

        gsap.fromTo(
          visual,
          { y: 64, opacity: 0.22, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              end: "center 38%",
              scrub: 0.9,
            },
          }
        );

        gsap.fromTo(
          media,
          { clipPath: "inset(0 100% 0 0)", x: -28 },
          {
            clipPath: "inset(0 0% 0 0)",
            x: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 72%",
              end: "center 32%",
              scrub: 0.85,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="feature-scroll" aria-label="Capability scroll showcase">
      <div className="feature-scroll-intro">
        <span>Scroll capabilities</span>
        <h2>What I can build inside WordPress</h2>
      </div>

      {featureSections.map((item, index) => (
        <article
          className={`feature-scroll-item ${item.reverse ? "feature-scroll-item--reverse" : ""}`}
          key={item.title}
        >
          <div className="feature-scroll-content">
            <p className="feature-scroll-eyebrow">{String(index + 1).padStart(2, "0")} / {item.eyebrow}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>

          <div className="feature-scroll-visual">
            <div className="feature-scroll-media" style={{ background: item.gradient }}>
              <div className="feature-scroll-glow" />
              <div className="feature-scroll-browser">
                <i />
                <i />
                <i />
              </div>
              <div className="feature-scroll-card-main">
                <strong>{item.metric}</strong>
                <span>{item.eyebrow}</span>
              </div>
              <div className="feature-scroll-lines">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
