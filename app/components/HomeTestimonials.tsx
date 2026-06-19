"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReviewStars } from "@/components/blocks/animated-cards-stack";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    id: "testimonial-healthcare",
    name: "Healthcare Website Owner",
    profession: "Healthcare WordPress build",
    rating: 5,
    description:
      "Fast, responsive and clear communication. The final WordPress site made our services easier to understand and helped us present a more trustworthy healthcare brand.",
  },
  {
    id: "testimonial-travel",
    name: "Travel Business Client",
    profession: "Travel / booking website",
    rating: 5,
    description:
      "Adeel understood the booking flow properly and converted the idea into a clean, mobile-friendly experience. The package sections and CTAs became much easier for customers.",
  },
  {
    id: "testimonial-corporate",
    name: "Corporate Services Founder",
    profession: "Corporate Elementor website",
    rating: 5,
    description:
      "The website structure became much more professional. Services, trust sections and inquiry flow were handled with strong attention to detail.",
  },
  {
    id: "testimonial-local",
    name: "Local Service Brand",
    profession: "Local business website",
    rating: 5,
    description:
      "The build felt clean, practical and conversion-focused. Mobile spacing, contact buttons and service sections were improved in a way that helps visitors take action.",
  },
  {
    id: "testimonial-agency",
    name: "Agency Collaboration",
    profession: "WordPress fixes and support",
    rating: 5,
    description:
      "Reliable WordPress support, clean Elementor work and solid troubleshooting. Adeel is easy to work with when a site needs practical fixes and launch support.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function moveCardGlow(event: React.PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  card.style.setProperty("--card-x", `${x}%`);
  card.style.setProperty("--card-y", `${y}%`);
}

export function HomeTestimonials() {
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

  return (
    <section ref={sectionRef} className="home-testimonials" id="testimonials">
      <div className="gradient-stage testimonial-glow" ref={glowRef} aria-hidden="true">
        <div className="gblob orange" />
        <div className="gblob purple" />
        <div className="gblob green" />
        <div className="pointer-glow" />
      </div>

      <div className="testimonial-pin" ref={pinRef}>
        <div className="testimonial-intro">
          <div className="eyebrow">Client Feedback</div>
          <h2>Testimonials that show the value behind the build</h2>
          <p>
            Draft review cards for the portfolio. Replace these with verified client names and quotes when you publish real testimonials.
          </p>
        </div>

        <div className="testimonial-motion-stage" aria-label="Client testimonial stack">
          {TESTIMONIALS.map((testimonial, index) => (
            <article
              ref={(node) => {
                if (node) cardsRef.current[index] = node;
              }}
              className="testimonial-motion-card"
              key={testimonial.id}
              onPointerMove={moveCardGlow}
              role="article"
              aria-labelledby={`card-${testimonial.id}-title`}
              aria-describedby={`card-${testimonial.id}-content`}
            >
              <div className="testimonial-card-balls" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className="testimonial-card-content">
                <ReviewStars className="testimonial-stars" rating={testimonial.rating} />
                <div id={`card-${testimonial.id}-content`} className="testimonial-quote-wrap">
                  <blockquote cite="#">{testimonial.description}</blockquote>
                </div>
              </div>

              <div className="testimonial-author">
                <Avatar className="testimonial-avatar">
                  <AvatarFallback>{initials(testimonial.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <span id={`card-${testimonial.id}-title`} className="testimonial-name">
                    {testimonial.name}
                  </span>
                  <span className="testimonial-role">{testimonial.profession}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
