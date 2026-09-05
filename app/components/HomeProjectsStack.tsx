"use client";

import * as React from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { withBasePath } from "../site-config";

/* Same stacked-card scroll motion as the v6 testimonial section
   (HomeTestimonials.tsx), with project content in the cards. */

const PROJECTS = [
  { id: "griffin-it", name: "Griffin IT", kicker: "Hardware solutions website", desc: "Hardware supply platform for MSPs and IT service providers with the stock-then-pay model front and centre.", image: withBasePath("/work-images/griffin-it.webp"), tags: ["WordPress", "Elementor Pro", "ACF"], href: "/portfolio/griffin-it" },
  { id: "kay-kay", name: "Kay Kay International Travels", kicker: "Travel & tours rebuild", desc: "Modern, mobile-first travel website with tour and package listings, destination pages and enquiry forms.", image: withBasePath("/work-images/kay-kay.webp"), tags: ["WordPress", "Elementor Pro", "WPForms"], href: "/portfolio/kk-travels-and-tours" },
  { id: "book-my-holidays", name: "Book My Holidays UK", kicker: "Holiday booking website", desc: "UK holiday booking site with destination pages, holiday-type services and an enquiry-to-booking flow.", image: withBasePath("/work-images/book-my-holidays.webp"), tags: ["WordPress", "Elementor Pro", "ACF"], href: "/portfolio/bookmyholidays-uk" },
  { id: "griffin-resources", name: "Griffin Resources", kicker: "B2B service architecture", desc: "HR outsourcing platform with clear service hierarchy, lead-generation structure and CRM form integration.", image: withBasePath("/work-images/griffin-resources.webp"), tags: ["WordPress", "Elementor Pro", "WPForms"], href: "/portfolio/griffin-resources" },
  { id: "artisan-technologies", name: "Artisan Technologies", kicker: "Smart-home automation site", desc: "Residential and commercial automation website with gallery, brands page and a tutorial resource hub.", image: withBasePath("/work-images/atdi.webp"), tags: ["WordPress", "Elementor Pro", "ACF"], href: "/portfolio/artisan-technologies" },
  { id: "fastdocnow", name: "FastDocNow", kicker: "Healthcare conversion UX", desc: "Telehealth website with trust-led service pages, a mobile-first booking flow and performance tuning.", image: withBasePath("/work-images/fastdocnow.webp"), tags: ["WordPress", "Elementor Pro", "WP Rocket"], href: "/portfolio/fastdocnow" },
];

function moveCardGlow(event: React.PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  card.style.setProperty("--card-x", `${x}%`);
  card.style.setProperty("--card-y", `${y}%`);
}

export function HomeProjectsStack() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const pinRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<HTMLElement[]>([]);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const move = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      glowRef.current?.style.setProperty("--mx", `${x}%`);
      glowRef.current?.style.setProperty("--my", `${y}%`);
    };

    section.addEventListener("pointermove", move);
    return () => section.removeEventListener("pointermove", move);
  }, []);

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pin = pinRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !pin || !cards.length) return;

    const ctx = gsap.context(() => {
      const segment = 1.25;

      gsap.set(cards, {
        yPercent: 0,
        opacity: 1,
        transformOrigin: "center center",
        force3D: true,
      });

      cards.forEach((card, index) => {
        gsap.set(card, {
          zIndex: cards.length - index,
          x: index * 18,
          y: index * 14,
          rotate: index === 0 ? 0 : index * 8,
          scale: 1 - index * 0.035,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (cards.length * 1.28)}`,
          pin,
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.slice(0, -1).forEach((card, index) => {
        const nextCard = cards[index + 1];
        const stepStart = index * segment;

        timeline.to(
          nextCard,
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.72,
            ease: "none",
          },
          stepStart + 0.05,
        );

        timeline.to(
          card,
          {
            yPercent: -190,
            x: -34,
            rotate: -4,
            scale: 0.96,
            opacity: 0,
            duration: 0.82,
            ease: "none",
          },
          stepStart + 0.28,
        );

        timeline.to({}, { duration: 0.16 }, stepStart + 1.05);
      });

      timeline.to({}, { duration: 0.6 });
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) return;

    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    type BlobState = {
      el: HTMLElement;
      card: HTMLElement;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    };

    const states: BlobState[] = [];

    cards.forEach((card, cardIndex) => {
      const blobs = Array.from(card.querySelectorAll<HTMLElement>(".testimonial-card-balls span"));
      const width = card.clientWidth || 350;
      const height = card.clientHeight || 450;

      blobs.forEach((blob, blobIndex) => {
        const size = blob.offsetWidth || 140;
        const safeWidth = Math.max(width - size, 1);
        const safeHeight = Math.max(height - size, 1);
        const direction = blobIndex % 2 === 0 ? 1 : -1;

        states.push({
          el: blob,
          card,
          x: safeWidth * (0.16 + blobIndex * 0.27),
          y: safeHeight * (0.16 + ((blobIndex + cardIndex) % 3) * 0.24),
          vx: direction * (0.12 + blobIndex * 0.035 + cardIndex * 0.006),
          vy: -direction * (0.10 + blobIndex * 0.028 + cardIndex * 0.005),
          size,
        });
      });
    });

    let frame = 0;

    const tick = () => {
      states.forEach((blob) => {
        const width = blob.card.clientWidth || 350;
        const height = blob.card.clientHeight || 450;
        const maxX = Math.max(width - blob.size, 1);
        const maxY = Math.max(height - blob.size, 1);

        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x <= 0 || blob.x >= maxX) {
          blob.vx *= -1;
          blob.x = Math.max(0, Math.min(blob.x, maxX));
        }

        if (blob.y <= 0 || blob.y >= maxY) {
          blob.vy *= -1;
          blob.y = Math.max(0, Math.min(blob.y, maxY));
        }

        blob.el.style.transform = `translate3d(${blob.x}px, ${blob.y}px, 0)`;
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section ref={sectionRef} className="home-testimonials projects-stack" id="projects-stack">
      <div className="gradient-stage testimonial-glow" ref={glowRef} aria-hidden="true">
        <div className="gblob orange" />
        <div className="gblob purple" />
        <div className="gblob green" />
        <div className="pointer-glow" />
      </div>

      <div className="testimonial-pin" ref={pinRef}>
        <div className="testimonial-intro">
          <div className="eyebrow">Selected work</div>
          <h2>Projects built to be edited, not just launched</h2>
          <p>
            Business, travel, healthcare and B2B websites on WordPress and
            Elementor Pro — scroll through a few recent builds.
          </p>
        </div>

        <div className="testimonial-motion-stage" aria-label="Project stack">
          {PROJECTS.map((project, index) => (
            <article
              ref={(node) => {
                if (node) cardsRef.current[index] = node;
              }}
              className="testimonial-motion-card projects-stack-card"
              key={project.id}
              onPointerMove={moveCardGlow}
              aria-labelledby={`card-${project.id}-title`}
            >
              <div className="testimonial-card-balls" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className="testimonial-card-content">
                <div className="projects-stack-media">
                  <img src={project.image} alt={`${project.name} website on laptop and phone`} loading="lazy" decoding="async" />
                </div>
                <div>
                  <div className="projects-stack-kicker">{project.kicker}</div>
                  <h3 id={`card-${project.id}-title`} className="projects-stack-title">{project.name}</h3>
                  <p className="projects-stack-desc">{project.desc}</p>
                  <div className="projects-stack-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </div>

              <div className="testimonial-author">
                <Link href={project.href} className="projects-stack-link">
                  Open case study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
