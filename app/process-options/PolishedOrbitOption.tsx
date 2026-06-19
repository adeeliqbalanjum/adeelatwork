"use client";

import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const orbitSteps = [
  ["01", "Understand", "Clarify goals, references, structure, features, and conversion path."],
  ["02", "Plan", "Map the stack, plugins, custom logic, responsive rules, and editing needs."],
  ["03", "Build", "Create the UI, templates, forms, animations, and functionality."],
  ["04", "Polish", "Test speed, mobile, forms, links, edge cases, and handover details."],
];

function StepBadge({ num }: { num: string }) {
  return <span className="process-num">{num}</span>;
}

function OrbitCard({ num, title, copy, index, rotate }: { num: string; title: string; copy: string; index: number; rotate: MotionValue<number> }) {
  const counterRotate = useTransform(rotate, (value) => -value);

  return (
    <div className={`real-h-slot real-h-slot-${index}`}>
      <motion.article
        className="real-h-orbit-card"
        style={{ rotate: counterRotate }}
        whileHover={{ y: -8, scale: 1.04 }}
        transition={{ duration: .28, ease: "easeOut" }}
      >
        <StepBadge num={num} />
        <div>
          <h3>{title}</h3>
          <p>{copy}</p>
        </div>
      </motion.article>
    </div>
  );
}

export function PolishedOrbitOption() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 18%"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, .18, .82, 1], [.94, 1, 1, .96]);

  return (
    <section ref={ref} className="process-preview process-real process-real-h process-real-h-polished" id="option-h">
      <div className="process-label-row">
        <span>Option H</span>
        <strong>Polished Scroll-Linked Orbit Motion</strong>
      </div>

      <div className="real-h-shell">
        <motion.div
          className="real-h-copy"
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: .45 }}
          transition={{ duration: .65, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="eyebrow">Process</div>
          <h2>Orbit-style launch system</h2>
          <p>
            Each process step moves around the core promise as the user scrolls, showing that strategy, build, testing, and polish are connected.
          </p>
          <div className="real-h-mini-list">
            <span>Scroll linked</span>
            <span>Motion cards</span>
            <span>Premium spacing</span>
          </div>
        </motion.div>

        <motion.div className="real-h-stage" style={{ scale }}>
          <div className="real-h-core">
            <span>Launch</span>
            <strong>WordPress system</strong>
            <small>Editable · Fast · Responsive</small>
          </div>

          <motion.div className="real-h-orbit" style={{ rotate }}>
            <div className="real-h-ring real-h-ring-one" />
            <div className="real-h-ring real-h-ring-two" />
            {orbitSteps.map(([num, title, copy], index) => (
              <OrbitCard key={num} num={num} title={title} copy={copy} index={index} rotate={rotate} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
