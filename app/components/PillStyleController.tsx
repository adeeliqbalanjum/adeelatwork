"use client";

import { useEffect } from "react";

function wrapEyebrowText(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(".eyebrow").forEach((pill) => {
    if (pill.querySelector(":scope > .pill-label")) return;

    const textNodes = Array.from(pill.childNodes).filter(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
    );

    textNodes.forEach((node) => {
      const span = document.createElement("span");
      span.className = "pill-label";
      span.textContent = node.textContent?.trim() ?? "";
      pill.replaceChild(span, node);
    });
  });
}

export function PillStyleController() {
  useEffect(() => {
    wrapEyebrowText();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.classList.contains("eyebrow")) {
              wrapEyebrowText(node.parentNode ?? document);
            } else if (node.querySelector(".eyebrow")) {
              wrapEyebrowText(node);
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
