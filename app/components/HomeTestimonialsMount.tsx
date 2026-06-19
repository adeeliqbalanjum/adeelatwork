"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HomeTestimonials } from "./HomeTestimonials";

export function HomeTestimonialsMount() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const trustSection = document.getElementById("trust");
    if (!trustSection) return;

    trustSection.classList.add("testimonials-mounted");
    setTarget(trustSection);

    return () => {
      trustSection.classList.remove("testimonials-mounted");
    };
  }, []);

  if (!target) return null;

  return createPortal(<HomeTestimonials />, target);
}
