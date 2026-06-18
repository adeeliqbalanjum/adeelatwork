"use client";

import { useEffect } from "react";

export function ButtonFillController() {
  useEffect(() => {
    const updateButtonOrigin = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest?.(".about-button") as HTMLElement | null;

      if (!button) return;

      const rect = button.getBoundingClientRect();
      button.style.setProperty("--btn-x", `${event.clientX - rect.left}px`);
      button.style.setProperty("--btn-y", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", updateButtonOrigin, { passive: true });
    document.addEventListener("pointerenter", updateButtonOrigin, { passive: true, capture: true });

    return () => {
      document.removeEventListener("pointermove", updateButtonOrigin);
      document.removeEventListener("pointerenter", updateButtonOrigin, { capture: true });
    };
  }, []);

  return null;
}
