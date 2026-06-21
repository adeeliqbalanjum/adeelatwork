"use client";

import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Code2, Lightbulb, Map, Rocket } from "lucide-react";

const processSteps = [
  {
    num: "01",
    title: "Understand",
    copy: "Clarify the goal, business model, page structure, features, references, and conversion path.",
    Icon: Lightbulb,
  },
  {
    num: "02",
    title: "Plan",
    copy: "Map the WordPress stack, plugins, custom logic, responsiveness, and editing needs.",
    Icon: Map,
  },
  {
    num: "03",
    title: "Build",
    copy: "Create the UI, templates, forms, animations, and functionality.",
    Icon: Code2,
  },
  {
    num: "04",
    title: "Polish",
    copy: "Test mobile, speed, forms, links, browser behavior, and final handover details.",
    Icon: Rocket,
  },
];

function ProcessBadge({ Icon, label }: { Icon: React.ElementType; label: string }) {
  return (
    <span className="home-process-badge" aria-label={label}>
      <Icon aria-hidden="true" />
    </span>
  );
}

function OrbitCard({
  title,
  copy,
  Icon,
  index,
  rotate,
  isActive,
  onSelect,
}: {
  title: string;
  copy: string;
  Icon: React.ElementType;
  index: number;
  rotate: MotionValue<number>;
  isActive: boolean;
  onSelect: () => void;
}) {
  const counterRotate = useTransform(rotate, (value) => -value);

  return (
    <div className={`home-process-slot home-process-slot-${index}`}>
      <motion.button
        type="button"
        className={`home-process-orbit-card ${isActive ? "is-active" : ""}`}
        style={{ rotate: counterRotate }}
        onClick={onSelect}
        whileHover={{ y: -8, scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        aria-pressed={isActive}
      >
        <ProcessBadge Icon={Icon} label={`${title} step`} />
        <div>
          <h3>{title}</h3>
          <p>{copy}</p>
        </div>
      </motion.button>
    </div>
  );
}

export function HomeProcessOrbitSection() {
  const ref = React.useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const activeStep = activeIndex !== null ? processSteps[activeIndex] : null;

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
          <motion.div
            className={`home-process-core ${activeStep ? "is-detail" : ""}`}
            key={activeStep ? activeStep.num : "default"}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeStep ? (
              <>
                <small>{activeStep.num}</small>
                <span>{activeStep.title}</span>
                <strong>{activeStep.copy}</strong>
              </>
            ) : (
              <>
                <span>Launch</span>
                <strong>WordPress system</strong>
                <small>Editable · Fast · Responsive</small>
              </>
            )}
          </motion.div>

          <motion.div className="home-process-orbit-wheel" style={{ rotate }}>
            <div className="home-process-ring home-process-ring-one" />
            <div className="home-process-ring home-process-ring-two" />
            {processSteps.map(({ num, title, copy, Icon }, index) => (
              <OrbitCard
                key={num}
                title={title}
                copy={copy}
                Icon={Icon}
                index={index}
                rotate={rotate}
                isActive={activeIndex === index}
                onSelect={() => setActiveIndex(activeIndex === index ? null : index)}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
