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

const offsets: React.CSSProperties[] = [
  {},
  { top: "-28vh", left: "5vw",   height: "28vh", width: "30vw" },
  { top: "-8vh",  left: "-22vw", height: "38vh", width: "18vw" },
  { left: "24vw",               height: "22vh", width: "22vw" },
  { top: "24vh",  left: "5vw",  height: "22vh", width: "18vw" },
  { top: "24vh",  left: "-20vw",height: "22vh", width: "26vw" },
  { top: "20vh",  left: "22vw", height: "13vh", width: "13vw" },
];

const endScales = [4, 5, 6, 5, 6, 8, 9];

export function ZoomParallax({ items }: { items: ParallaxItem[] }) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = stageRef.current?.querySelectorAll<HTMLElement>(".zp-card");
      if (!cards?.length) return;
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { scale: 1 },
          {
            scale: endScales[i] ?? 4,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="zp-outer" ref={wrapRef} aria-hidden="true">
      <div className="zp-stage" ref={stageRef}>
        <div className="zp-label-wrap">
          <p className="zp-label">50+ projects delivered</p>
        </div>
        {items.slice(0, 7).map(({ label, sub, gradient }, i) => (
          <div
            className="zp-card"
            key={label}
            style={{ background: gradient, ...offsets[i] }}
          >
            <div className="zp-shine" />
            <p className="zp-name">{label}</p>
            <p className="zp-sub">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
