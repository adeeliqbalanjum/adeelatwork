"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TextRevealByWord({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll<HTMLElement>(".tr-word");
      if (!words?.length) return;

      /* One timeline, scrubbed to scroll — each word fades in sequentially */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 35%",
          scrub: 1.2,
        },
      });

      tl.fromTo(
        words,
        { opacity: 0.1, color: "rgba(7,7,7,0.1)" },
        { opacity: 1, color: "#070707", stagger: 0.6, ease: "none", duration: 0.6 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [text]);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className="tr-outer">
      <div className="tr-sticky">
        <p className="tr-text">
          {words.map((word, i) => (
            <span className="tr-word" key={i}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
