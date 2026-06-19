"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const capabilityCards = [
  ["Elementor Pro", "Editable layouts"],
  ["WooCommerce", "Store logic"],
  ["Custom Plugins", "Business systems"],
  ["GSAP Motion", "Premium interactions"],
];

const browserCards = [
  ["Booking Engine", "AED pricing, add-ons, admin approval"],
  ["Figma → WordPress", "Pixel-perfect responsive sections"],
  ["WooCommerce Logic", "Checkout fields and product rules"],
  ["Speed Polish", "Cache, images, Core Web Vitals"],
];

export default function HeroMotionOptionPage() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.2,
  });

  const mediaWidth = useTransform(
    smoothProgress,
    [0, 1],
    ["min(330px, 82vw)", "min(1100px, 94vw)"],
  );
  const mediaHeight = useTransform(
    smoothProgress,
    [0, 1],
    ["410px", "min(620px, 78vh)"],
  );
  const mediaRadius = useTransform(smoothProgress, [0, 1], [34, 46]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.76], [1, 0.18]);
  const firstTextX = useTransform(smoothProgress, [0, 1], ["0vw", "-21vw"]);
  const secondTextX = useTransform(smoothProgress, [0, 1], ["0vw", "21vw"]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.78, 1], [1, 0.78, 0.28]);
  const chipOpacity = useTransform(smoothProgress, [0, 0.65, 1], [1, 0.65, 0]);
  const contentOpacity = useTransform(smoothProgress, [0.62, 1], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.62, 1], [50, 0]);

  return (
    <main className="hero-motion-option-page">
      <Link href="/" className="hero-motion-back">
        ← Back to portfolio
      </Link>

      <section ref={sectionRef} className="hero-motion-scroll-stage">
        <div className="hero-motion-sticky">
          <motion.div className="hero-motion-bg" style={{ opacity: bgOpacity }} aria-hidden="true">
            <span className="hm-blob hm-blob-orange" />
            <span className="hm-blob hm-blob-purple" />
            <span className="hm-blob hm-blob-green" />
            <span className="hm-grid" />
          </motion.div>

          <motion.div className="hero-motion-status" style={{ opacity: chipOpacity }}>
            <strong>Available</strong>
            <span>for premium WordPress builds</span>
          </motion.div>

          <motion.div
            className="hero-motion-title"
            style={{ opacity: titleOpacity }}
            aria-label="WordPress developer building fast high-impact websites"
          >
            <motion.span style={{ x: firstTextX }}>WordPress developer</motion.span>
            <motion.span style={{ x: secondTextX }}>building fast, high-impact websites</motion.span>
          </motion.div>

          <motion.div
            className="hero-motion-media"
            style={{
              width: mediaWidth,
              height: mediaHeight,
              borderRadius: mediaRadius,
            }}
          >
            <div className="hero-motion-browser">
              <div className="hm-browser-top">
                <i />
                <i />
                <i />
                <span>adeelatwork / premium-build</span>
              </div>

              <div className="hm-browser-body">
                <div className="hm-browser-copy">
                  <small>Live capability preview</small>
                  <h2>WordPress systems with design, motion, and real logic.</h2>
                  <p>
                    A preview of how the current hero could expand into a premium, scroll-linked portfolio showcase.
                  </p>
                </div>

                <div className="hm-browser-cards">
                  {browserCards.map(([title, copy]) => (
                    <article key={title}>
                      <span />
                      <strong>{title}</strong>
                      <p>{copy}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="hero-motion-scroll-hint" style={{ opacity: chipOpacity }}>
            Scroll to expand
          </motion.div>
        </div>
      </section>

      <motion.section className="hero-motion-content" style={{ opacity: contentOpacity, y: contentY }}>
        <div className="hero-motion-content-inner">
          <div>
            <div className="eyebrow">Hero Option Preview</div>
            <h2>Safer version of the scroll-expand motion</h2>
            <p>
              This preview keeps the premium expansion effect without blocking normal page scroll. It can replace the current hero after approval.
            </p>
          </div>

          <div className="hero-motion-proof-grid">
            {capabilityCards.map(([title, copy]) => (
              <article key={title}>
                <strong>{title}</strong>
                <span>{copy}</span>
              </article>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
