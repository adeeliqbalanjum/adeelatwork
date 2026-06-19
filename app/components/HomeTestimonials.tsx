"use client";

import { type PointerEvent, useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Healthcare Website Owner",
    role: "Healthcare WordPress build",
    quote: "Fast, responsive and clear communication. The final WordPress site made our services easier to understand and helped us present a more trustworthy healthcare brand.",
  },
  {
    name: "Travel Business Client",
    role: "Travel / booking website",
    quote: "Adeel understood the booking flow properly and converted the idea into a clean, mobile-friendly experience. The package sections and CTAs became much easier for customers.",
  },
  {
    name: "Corporate Services Founder",
    role: "Corporate Elementor website",
    quote: "The website structure became much more professional. Services, trust sections and inquiry flow were handled with strong attention to detail.",
  },
  {
    name: "Local Service Brand",
    role: "Local business website",
    quote: "The build felt clean, practical and conversion-focused. Mobile spacing, contact buttons and service sections were improved in a way that helps visitors take action.",
  },
  {
    name: "Agency Collaboration",
    role: "WordPress fixes and support",
    quote: "Reliable WordPress support, clean Elementor work and solid troubleshooting. Adeel is easy to work with when a site needs practical fixes and launch support.",
  },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return outMin + (outMax - outMin) * clamp((value - inMin) / (inMax - inMin));
}

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2);
}

function moveCardGlow(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  card.style.setProperty("--card-x", `${x}%`);
  card.style.setProperty("--card-y", `${y}%`);
}

export function HomeTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = Math.max(rect.height - viewport, 1);
      setProgress(clamp((viewport * 0.55 - rect.top) / total));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const move = (event: globalThis.PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      glowRef.current?.style.setProperty("--mx", `${x}%`);
      glowRef.current?.style.setProperty("--my", `${y}%`);
    };

    section.addEventListener("pointermove", move);
    return () => section.removeEventListener("pointermove", move);
  }, []);

  return (
    <section ref={sectionRef} className="home-testimonials" id="testimonials">
      <div className="gradient-stage testimonial-glow" ref={glowRef} aria-hidden="true">
        <div className="gblob orange" />
        <div className="gblob purple" />
        <div className="gblob green" />
        <div className="pointer-glow" />
      </div>

      <div className="testimonial-pin">
        <div className="testimonial-copy">
          <div className="eyebrow">Client Feedback</div>
          <h2>Testimonials that show the value behind the build</h2>
          <p>
            Draft review cards for the portfolio. Replace these with verified client names and quotes when you publish real testimonials.
          </p>
          <div className="testimonial-badges">
            <span>Glassmorphism cards</span>
            <span>Scroll stack</span>
            <span>Pointer glow</span>
          </div>
        </div>

        <div className="testimonial-stage" aria-label="Client testimonial stack">
          {testimonials.map((testimonial, i) => {
            const index = i + 1;
            const total = testimonials.length;
            const start = index / (total + 1);
            const end = (index + 1) / (total + 1);
            const y = mapRange(progress, start, end, 0, -180);
            const rotate = mapRange(progress, start - 0.35, end * 0.95, -index + 90, 0);
            const activeIndex = Math.max(1, Math.min(total, Math.floor(progress * (total + 1))));
            const zIndex = index <= activeIndex ? 1000 + index * 10 : (total - index) * 10;

            return (
              <article
                className="testimonial-card"
                key={testimonial.name}
                onPointerMove={moveCardGlow}
                style={{
                  top: index * 10,
                  zIndex,
                  transform: `translateZ(${index * 10}px) translateY(${y}%) rotate(${rotate}deg)`,
                }}
              >
                <div className="testimonial-card-balls" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div>
                  <div className="testimonial-stars">★★★★★</div>
                  <blockquote>“{testimonial.quote}”</blockquote>
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{initials(testimonial.name)}</div>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
