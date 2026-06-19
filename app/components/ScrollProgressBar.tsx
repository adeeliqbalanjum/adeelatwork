"use client";

import * as React from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

type ScrollProgressBarProps = {
  type?: "circle" | "bar";
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  color?: string;
  strokeSize?: number;
  showPercentage?: boolean;
};

export function ScrollProgressBar({
  type = "circle",
  position = "bottom-right",
  color = "#070707",
  strokeSize = 3,
  showPercentage = true,
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [percentage, setPercentage] = React.useState(0);

  useMotionValueEvent(scrollPercentage, "change", (latest) => {
    setPercentage(Math.round(latest));
  });

  if (type === "bar") {
    return (
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[120] bg-black/[.045]"
        style={{ height: `${strokeSize + 2}px` }}
        aria-hidden="true"
      >
        <motion.span
          className="block h-full origin-left shadow-[0_0_18px_rgba(7,7,7,.22)]"
          style={{
            background: `linear-gradient(90deg, ${color}, rgba(7,7,7,.72), ${color})`,
            scaleX: scrollYProgress,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-[100] flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/45 shadow-[0_18px_54px_rgba(7,7,7,.14)] backdrop-blur-2xl",
        {
          "right-5 top-5": position === "top-right",
          "bottom-5 right-5": position === "bottom-right",
          "left-5 top-5": position === "top-left",
          "bottom-5 left-5": position === "bottom-left",
        },
      )}
      aria-label={`Page scroll progress ${percentage}%`}
    >
      {percentage > 0 && (
        <>
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="31"
              fill="none"
              stroke="rgba(7,7,7,.10)"
              strokeWidth={strokeSize}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="31"
              pathLength="1"
              stroke={color}
              fill="none"
              strokeLinecap="round"
              strokeWidth={strokeSize}
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          {showPercentage && (
            <span className="relative text-[11px] font-black tracking-[-.04em] text-[#070707]">
              {percentage}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
