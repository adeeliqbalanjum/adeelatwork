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

      <style jsx>{`
        .feature-scroll {
          background: #fafaf8;
          padding: 90px 22px 40px;
          overflow: hidden;
        }

        .feature-scroll-intro {
          width: min(1040px, 100%);
          margin: 0 auto 22px;
          text-align: center;
        }

        .feature-scroll-intro span,
        .feature-scroll-eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(7, 7, 7, .075);
          background: rgba(255,255,255,.72);
          color: rgba(7,7,7,.48);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: -.025em;
          padding: 7px 13px;
        }

        .feature-scroll-intro h2 {
          max-width: 760px;
          margin: 18px auto 0;
          font-size: clamp(2.2rem, 4.6vw, 4.8rem);
          line-height: .9;
          letter-spacing: -.085em;
          font-weight: 900;
        }

        .feature-scroll-item {
          width: min(1040px, 100%);
          min-height: 92vh;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, .92fr) minmax(0, 1fr);
          align-items: center;
          gap: clamp(32px, 7vw, 86px);
        }

        .feature-scroll-item--reverse {
          grid-template-columns: minmax(0, 1fr) minmax(0, .92fr);
        }

        .feature-scroll-item--reverse .feature-scroll-content {
          order: 2;
        }

        .feature-scroll-content h3 {
          max-width: 470px;
          margin: 18px 0 0;
          font-size: clamp(2.1rem, 4vw, 4rem);
          line-height: .92;
          letter-spacing: -.078em;
          font-weight: 900;
        }

        .feature-scroll-content > p:last-child {
          max-width: 450px;
          margin: 20px 0 0;
          color: rgba(7,7,7,.54);
          font-size: 15px;
          line-height: 1.62;
          font-weight: 650;
          letter-spacing: -.025em;
        }

        .feature-scroll-visual {
          position: relative;
          min-height: 430px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-scroll-media {
          position: relative;
          width: min(430px, 100%);
          height: min(430px, 52vw);
          min-height: 330px;
          overflow: hidden;
          border-radius: 34px;
          box-shadow: 0 34px 100px rgba(0,0,0,.18), 0 10px 26px rgba(0,0,0,.10);
          border: 1px solid rgba(255,255,255,.36);
        }

        .feature-scroll-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, rgba(255,255,255,.34), transparent 46%, rgba(0,0,0,.08));
        }

        .feature-scroll-browser {
          position: absolute;
          top: 22px;
          left: 22px;
          right: 22px;
          height: 42px;
          border-radius: 999px;
          background: rgba(255,255,255,.26);
          border: 1px solid rgba(255,255,255,.26);
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 15px;
          backdrop-filter: blur(18px);
        }

        .feature-scroll-browser i {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: rgba(255,255,255,.72);
        }

        .feature-scroll-card-main {
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 94px;
          border-radius: 24px;
          background: rgba(255,255,255,.82);
          border: 1px solid rgba(255,255,255,.55);
          padding: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,.12);
          backdrop-filter: blur(18px);
        }

        .feature-scroll-card-main strong {
          display: block;
          color: #070707;
          font-size: clamp(2rem, 4vw, 3.3rem);
          line-height: .86;
          letter-spacing: -.085em;
          font-weight: 900;
        }

        .feature-scroll-card-main span {
          display: block;
          margin-top: 9px;
          color: rgba(7,7,7,.52);
          font-size: 12px;
          font-weight: 900;
        }

        .feature-scroll-lines {
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 28px;
          display: grid;
          gap: 8px;
        }

        .feature-scroll-lines span {
          height: 9px;
          border-radius: 999px;
          background: rgba(255,255,255,.50);
        }

        .feature-scroll-lines span:nth-child(2) { width: 72%; }
        .feature-scroll-lines span:nth-child(3) { width: 45%; }

        @media (max-width: 900px) {
          .feature-scroll {
            padding: 70px 18px 30px;
          }

          .feature-scroll-item,
          .feature-scroll-item--reverse {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 26px;
            padding: 56px 0;
          }

          .feature-scroll-item--reverse .feature-scroll-content {
            order: 0;
          }

          .feature-scroll-content,
          .feature-scroll-content h3,
          .feature-scroll-content > p:last-child {
            max-width: 100%;
            text-align: center;
          }

          .feature-scroll-visual {
            min-height: auto;
          }

          .feature-scroll-media {
            width: min(420px, 100%);
            height: 340px;
            min-height: 0;
          }
        }

        @media (max-width: 560px) {
          .feature-scroll {
            padding: 58px 16px 24px;
          }

          .feature-scroll-item,
          .feature-scroll-item--reverse {
            padding: 42px 0;
          }

          .feature-scroll-intro h2,
          .feature-scroll-content h3 {
            font-size: clamp(2rem, 11vw, 3rem);
          }

          .feature-scroll-media {
            height: 300px;
            border-radius: 24px;
          }

          .feature-scroll-card-main {
            left: 18px;
            right: 18px;
            bottom: 82px;
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}
