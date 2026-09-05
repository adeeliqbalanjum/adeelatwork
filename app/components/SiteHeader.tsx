"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cvUrl } from "../site-config";

const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav ref={navRef} className="nav site-header" aria-label="Primary navigation">
      <Link className="nav-logo" href="/" aria-label="Muhammad Adeel Iqbal home">
        <img src={portraitDataUrl} alt="Adeel" />
      </Link>
      <div id="site-menu" className={`nav-menu${open ? " is-open" : ""}`} onClick={() => setOpen(false)}>
        <Link href="/">Home</Link>
        <Link href="/#services">Services</Link>
        <Link href="/portfolio">Work</Link>
        <Link href="/#projects">Proof</Link>
        <a href={cvUrl}>CV</a>
      </div>
      <Link href="/#contact" className="nav-cta">Hire Me</Link>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
    </nav>
  );
}
