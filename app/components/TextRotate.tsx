"use client";
import { useEffect, useState } from "react";

/* Pure CSS animation — zero runtime cost, no framer-motion */
export function TextRotate({ texts, interval = 2400 }: { texts: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0); /* key forces CSS re-trigger */

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
      setAnimKey((k) => k + 1);
    }, interval);
    return () => clearInterval(id);
  }, [texts.length, interval]);

  return (
    <span className="tr-rot-wrap">
      <span className="tr-rot-inner" key={animKey}>
        {texts[index]}
      </span>
    </span>
  );
}
