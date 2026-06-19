"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HomeProcessOrbitSection } from "./HomeProcessOrbitSection";

export function HomeProcessOrbitMount() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const processSection = document.getElementById("process");
    if (!processSection) return;

    processSection.classList.add("process-orbit-mounted");
    setTarget(processSection);

    return () => {
      processSection.classList.remove("process-orbit-mounted");
    };
  }, []);

  if (!target) return null;

  return createPortal(<HomeProcessOrbitSection />, target);
}
