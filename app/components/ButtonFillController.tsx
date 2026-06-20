"use client";

import { useEffect } from "react";

function normalizeSectionPills(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(".eyebrow").forEach((pill) => {
    if (pill.querySelector(":scope > .eyebrow-label")) return;

    const textNodes = Array.from(pill.childNodes).filter((node) => {
      return node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim());
    });

    textNodes.forEach((node) => {
      const label = document.createElement("span");
      label.className = "eyebrow-label";
      label.textContent = node.textContent?.trim() ?? "";
      pill.replaceChild(label, node);
    });
  });
}

export function ButtonFillController() {
  useEffect(() => {
    const updateButtonOrigin = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest?.(".about-button, [data-cursor-fill='true']") as HTMLElement | null;

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

  useEffect(() => {
    normalizeSectionPills();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList.contains("eyebrow")) {
            normalizeSectionPills(node.parentNode ?? document);
          } else if (node.querySelector(".eyebrow")) {
            normalizeSectionPills(node);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
