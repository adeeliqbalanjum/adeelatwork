"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HomeBuildStackSection } from "./HomeBuildStackSection";

export function HomeBuildStackMount() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection || document.getElementById("build-stack-mount")) return;

    const mount = document.createElement("div");
    mount.id = "build-stack-mount";
    aboutSection.insertAdjacentElement("afterend", mount);
    setTarget(mount);

    return () => {
      mount.remove();
    };
  }, []);

  if (!target) return null;

  return createPortal(<HomeBuildStackSection />, target);
}
