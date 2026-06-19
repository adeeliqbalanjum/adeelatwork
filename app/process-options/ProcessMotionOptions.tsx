"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  ["01", "Understand", "Clarify the client goal, business model, page structure, features, references, and conversion path."],
  ["02", "Plan", "Map the WordPress stack, required plugins, custom logic, responsiveness, and editing needs."],
  ["03", "Build", "Create the UI, responsive layouts, WordPress templates, forms, animations, and functionality."],
  ["04", "Polish", "Test mobile, speed, forms, links, edge cases, browser behavior, and final handover details."],
];

const galleryLeft = ["Discovery notes", "Sitemap plan", "Wireframe system", "Elementor build", "Responsive QA"];
const galleryRight = ["Plugin logic", "Speed pass", "Final launch", "Client handover", "Growth support"];

export function ProcessMotionOptions() {
  return (
    <div className="real-process-options">
      <nav className="real-options-nav" aria-label="Process option shortcuts">
        {[["A", "Timeline"], ["B", "3D Cards"], ["C", "Reveal"], ["D", "Sticky Tabs"], ["E", "Expand Media"], ["F", "Sticky Gallery"], ["G", "Horizontal GSAP"], ["H", "Orbit Motion"]].map(([id, label]) => (
          <a key={id} href={`#option-${id.toLowerCase()}`}>Option {id}<span>{label}</span></a>
        ))}
      </nav>
      <TimelineOption />
      <FloatingCardsOption />
      <RevealOption />
      <StickyTabsOption />
      <ExpandMediaOption />
      <StickyGalleryOption />
      <HorizontalGsapOption />
      <OrbitOption />
    </div>
  );
}

function OptionLabel({ id, title }: { id: string; title: string }) {
  return <div className="process-label-row"><span>Option {id}</span><strong>{title}</strong></div>;
}

function StepBadge({ num }: { num: string }) {
  return <span className="process-num">{num}</span>;
}

function TimelineOption() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 82%", "end 45%"] });
  return (
    <section ref={ref} className="process-preview process-real process-real-a" id="option-a">
      <OptionLabel id="A" title="Real Scroll Timeline" />
      <div className="process-section-head"><div className="eyebrow">Process</div><h2>How I move from idea to polished launch</h2><p>The progress line is connected to real page scroll, and cards reveal one by one.</p></div>
      <div className="real-a-line"><motion.span style={{ scaleX: scrollYProgress }} /></div>
      <div className="real-a-grid">
        {steps.map(([num, title, copy], index) => (
          <motion.article key={num} className="real-glass-card" initial={{ y: 44, opacity: 0, filter: "blur(8px)" }} whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }} viewport={{ once: false, amount: .45 }} transition={{ duration: .65, delay: index * .08, ease: [0.2, 0.8, 0.2, 1] }}>
            <StepBadge num={num} /><h3>{title}</h3><p>{copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function FloatingCardsOption() {
  return (
    <section className="process-preview process-real process-real-b" id="option-b">
      <OptionLabel id="B" title="Framer/Motion 3D Floating Cards" />
      <div className="process-section-head"><div className="eyebrow">Process</div><h2>Floating process cards with live motion</h2><p>Cards float continuously and respond on hover without changing the page scroll.</p></div>
      <div className="real-b-grid">
        {steps.map(([num, title, copy], index) => (
          <motion.article key={num} className="real-glass-card real-b-card" animate={{ y: [0, -14, 0], rotate: [index - 1.5, index * -1, index - 1.5] }} transition={{ duration: 4.8 + index * .4, repeat: Infinity, ease: "easeInOut" }} whileHover={{ y: -22, rotateX: 0, rotateY: 0, scale: 1.035 }}>
            <div className="real-card-orb" /><StepBadge num={num} /><h3>{title}</h3><p>{copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function RevealOption() {
  return (
    <section className="process-preview process-real process-real-c" id="option-c">
      <OptionLabel id="C" title="Step-by-Step Scroll Reveal" />
      <div className="real-c-layout">
        <div className="real-c-sticky"><div className="eyebrow">Process</div><h2>One controlled step at a time</h2><p>Each card animates into place as the user scrolls. This is clean and client-friendly.</p></div>
        <div className="real-c-stack">
          {steps.map(([num, title, copy], index) => (
            <motion.article key={num} className="real-glass-card real-c-card" initial={{ x: 72, opacity: 0, scale: .96 }} whileInView={{ x: 0, opacity: 1, scale: 1 }} viewport={{ once: false, amount: .55 }} transition={{ duration: .62, ease: [0.2, 0.8, 0.2, 1] }}>
              <StepBadge num={num} /><div><h3>{title}</h3><p>{copy}</p></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyTabsOption() {
  return (
    <section className="process-preview process-real process-real-d" id="option-d">
      <OptionLabel id="D" title="Sticky Process Tabs" />
      <div className="real-d-shell">
        <div className="real-d-nav">Process chapters</div>
        {steps.map(([num, title, copy]) => (
          <section className="real-d-tab" key={num}>
            <div className="real-d-header"><StepBadge num={num} /><h2>{title}</h2></div>
            <motion.div className="real-d-content" initial={{ y: 34, opacity: .35 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: false, amount: .5 }} transition={{ duration: .55 }}><p>{copy}</p><small>Sticky header locks each chapter while the content passes under it.</small></motion.div>
          </section>
        ))}
      </div>
    </section>
  );
}

function ExpandMediaOption() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const mediaRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<HTMLDivElement[]>([]);
  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const stage = stageRef.current;
    const media = mediaRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !stage || !media) return;
    const ctx = gsap.context(() => {
      gsap.set(media, { scale: .62, borderRadius: 34 });
      gsap.set(cards, { y: 42, opacity: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: stage, start: "top top", end: "+=1600", pin: stage, scrub: .9, anticipatePin: 1, invalidateOnRefresh: true } });
      tl.to(media, { scale: 1, borderRadius: 18, ease: "none", duration: 1 });
      tl.to(".real-e-title-left", { xPercent: -90, opacity: .1, ease: "none", duration: .65 }, 0);
      tl.to(".real-e-title-right", { xPercent: 90, opacity: .1, ease: "none", duration: .65 }, 0);
      tl.to(cards, { y: 0, opacity: 1, stagger: .12, duration: .55, ease: "power2.out" }, .62);
      ScrollTrigger.refresh();
    }, section);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={sectionRef} className="process-preview process-real process-real-e" id="option-e">
      <OptionLabel id="E" title="GSAP Scroll Expand Media" />
      <div ref={stageRef} className="real-e-stage">
        <div className="real-e-grid-bg" />
        <div className="real-e-title"><h2 className="real-e-title-left">From idea</h2><h2 className="real-e-title-right">to launch</h2></div>
        <div ref={mediaRef} className="real-e-media"><div className="process-e-browser"><i /><i /><i /></div><strong>WordPress build preview</strong><p>The media panel expands while the process details reveal below.</p></div>
        <div className="real-e-cards">{steps.map(([num, title], index) => <div key={num} ref={(node) => { if (node) cardsRef.current[index] = node; }}><span>{num}</span><h3>{title}</h3></div>)}</div>
      </div>
    </section>
  );
}

function StickyGalleryOption() {
  return (
    <section className="process-preview process-real process-real-f" id="option-f">
      <OptionLabel id="F" title="Real Sticky Gallery Process" />
      <div className="real-f-wrapper"><section className="real-f-hero"><div className="real-f-grid-bg" /><h2>Create the launch flow in a better way</h2><p>Hero sticks first. Then left/right columns scroll while the center column stays fixed.</p></section></div>
      <section className="real-f-gallery-section"><div className="real-f-gallery"><div className="real-f-col">{galleryLeft.map((item) => <figure key={item}>{item}</figure>)}</div><div className="real-f-center">{steps.slice(0, 3).map(([num, title]) => <figure key={num}><StepBadge num={num} /><strong>{title}</strong></figure>)}</div><div className="real-f-col">{galleryRight.map((item) => <figure key={item}>{item}</figure>)}</div></div></section>
    </section>
  );
}

function HorizontalGsapOption() {
  const stageRef = React.useRef<HTMLElement>(null);
  const railRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const stage = stageRef.current;
    const rail = railRef.current;
    if (!stage || !rail) return;
    const ctx = gsap.context(() => {
      gsap.to(rail, { x: () => -(rail.scrollWidth - stage.clientWidth + 48), ease: "none", scrollTrigger: { trigger: stage, start: "top top", end: () => `+=${Math.max(1200, rail.scrollWidth - stage.clientWidth + 900)}`, pin: stage, scrub: 1, invalidateOnRefresh: true } });
      ScrollTrigger.refresh();
    }, stage);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={stageRef} className="process-preview process-real process-real-g" id="option-g"><OptionLabel id="G" title="GSAP Pinned Horizontal Process" /><div ref={railRef} className="real-g-rail">{steps.concat(steps).map(([num, title, copy], index) => <article className="real-g-card" key={`${num}-${index}`}><StepBadge num={num} /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
  );
}

function OrbitOption() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  return (
    <section ref={ref} className="process-preview process-real process-real-h" id="option-h"><OptionLabel id="H" title="Framer/Motion Orbit Process" /><div className="real-h-layout"><div><div className="eyebrow">Process</div><h2>Orbit-style launch system</h2><p>The process cards orbit around the core build promise as the user scrolls.</p></div><motion.div className="real-h-orbit" style={{ rotate }}>{steps.map(([num, title], index) => <motion.article key={num} className={`real-h-card real-h-card-${index}`} style={{ rotate: useTransform(rotate, (value) => -value) }}><StepBadge num={num} /><h3>{title}</h3></motion.article>)}</motion.div></div></section>
  );
}
