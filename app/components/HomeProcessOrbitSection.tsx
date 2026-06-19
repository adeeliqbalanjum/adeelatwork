"use client";

import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const processSteps = [
  ["01", "Understand", "Clarify the goal, business model, page structure, features, references, and conversion path."],
  ["02", "Plan", "Map the WordPress stack, plugins, custom logic, responsiveness, and editing needs."],
  ["03", "Build", "Create the UI, templates, forms, animations, and functionality."],
  ["04", "Polish", "Test mobile, speed, forms, links, browser behavior, and final handover details."],
];

function ProcessBadge({ num }: { num: string }) {
  return <span className="home-process-badge">{num}</span>;
}

function OrbitCard({
  num,
  title,
  copy,
  index,
  rotate,
}: {
  num: string;
  title: string;
  copy: string;
  index: number;
  rotate: MotionValue<number>;
}) {
  const counterRotate = useTransform(rotate, (value) => -value);

  return (
    <div className={`home-process-slot home-process-slot-${index}`}>
      <motion.article
        className="home-process-orbit-card"
        style={{ rotate: counterRotate }}
        whileHover={{ y: -8, scale: 1.04 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <ProcessBadge num={num} />
        <div>
          <h3>{title}</h3>
          <p>{copy}</p>
        </div>
      </motion.article>
    </div>
  );
}

export function HomeProcessOrbitSection() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 18%"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.94, 1, 1, 0.96]);

  return (
    <section ref={ref} className="home-process-orbit" aria-label="Process">
      <div className="home-process-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="home-process-shell">
        <motion.div
          className="home-process-copy"
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="eyebrow">Process</div>
          <h2>How I move from idea to polished launch</h2>
          <p>
            Every website build moves around one core goal: a fast, editable, responsive WordPress system that clients can actually use after launch.
          </p>
          <div className="home-process-mini-list">
            <span>Scroll linked</span>
            <span>Clear workflow</span>
            <span>Client-ready handover</span>
          </div>
        </motion.div>

        <motion.div className="home-process-stage" style={{ scale }}>
          <div className="home-process-core">
            <span>Launch</span>
            <strong>WordPress system</strong>
            <small>Editable · Fast · Responsive</small>
          </div>

          <motion.div className="home-process-orbit-wheel" style={{ rotate }}>
            <div className="home-process-ring home-process-ring-one" />
            <div className="home-process-ring home-process-ring-two" />
            {processSteps.map(([num, title, copy], index) => (
              <OrbitCard
                key={num}
                num={num}
                title={title}
                copy={copy}
                index={index}
                rotate={rotate}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
