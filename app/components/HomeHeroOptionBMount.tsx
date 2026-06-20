"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

const basePath = process.env.NODE_ENV === "production" ? "/adeelatwork" : "";
const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

type HeroCard = {
  title: string;
  desc: string;
  type: "image" | "booking" | "stack";
  image?: string;
  accent?: string;
  badge?: string;
};

const cards: HeroCard[] = [
  {
    title: "Desert Safari Booking Form",
    desc: "Private/shared tour pricing, add-ons, AED totals and booking emails.",
    type: "booking",
    accent: "#ff7a18",
    badge: "AED",
  },
  {
    title: "Griffin IT",
    desc: "Hardware solutions website for MSP & IT providers.",
    type: "image",
    image: `${basePath}/work-images/griffin-it.webp`,
    accent: "#0ea5e9",
    badge: "GI",
  },
  {
    title: "Kay Kay Travels",
    desc: "International travels and tours website rebuild.",
    type: "image",
    image: `${basePath}/work-images/kay-kay.webp`,
    accent: "#22c55e",
    badge: "KKT",
  },
  {
    title: "Book My Holidays",
    desc: "Holiday booking website for travel enquiries.",
    type: "image",
    image: `${basePath}/work-images/book-my-holidays.webp`,
    accent: "#38bdf8",
    badge: "BMH",
  },
  {
    title: "FastDocNow",
    desc: "Healthcare WordPress website with mobile-first user flow.",
    type: "image",
    image: `${basePath}/work-images/fastdocnow.webp`,
    accent: "#2563eb",
    badge: "FDN",
  },
  {
    title: "Griffin Resources",
    desc: "Business website with a premium brand feel.",
    type: "image",
    image: `${basePath}/work-images/griffin-resources.webp`,
    accent: "#a855f7",
    badge: "GR",
  },
  {
    title: "Build Stack",
    desc: "WordPress, Elementor Pro, WooCommerce, ACF, PHP, GSAP.",
    type: "stack",
    accent: "#070707",
    badge: "WP",
  },
];

const badgeStyle = (accent: string, inverse = false): React.CSSProperties => ({
  minWidth: 30,
  height: 18,
  borderRadius: 999,
  background: inverse ? "#fff" : accent,
  color: inverse ? "#070707" : "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  paddingInline: 7,
  fontSize: 9,
  lineHeight: 1,
  fontWeight: 950,
  letterSpacing: "-.035em",
  boxShadow: "0 8px 20px rgba(0,0,0,.18)",
  flex: "0 0 auto",
});

function AnimatedBackground() {
  return (
    <div className="home-hero-b-shader" aria-hidden="true">
      <motion.span
        className="home-hero-b-orb home-hero-b-orb-blue"
        animate={{ x: ["0%", "26%", "-8%", "0%"], y: ["0%", "-18%", "12%", "0%"], scale: [1, 1.16, 0.96, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="home-hero-b-orb home-hero-b-orb-green"
        animate={{ x: ["0%", "-20%", "10%", "0%"], y: ["0%", "16%", "-10%", "0%"], scale: [1, 0.92, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="home-hero-b-orb home-hero-b-orb-purple"
        animate={{ x: ["0%", "10%", "-18%", "0%"], y: ["0%", "-10%", "18%", "0%"], scale: [1, 1.1, 0.98, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="home-hero-b-edge"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function BookingPreview({ accent }: { accent: string }) {
  return (
    <div className="home-hero-b-booking" aria-hidden="true">
      <div className="home-hero-b-mini-title">
        <span style={badgeStyle(accent)}>AED</span>
        <strong>Safari Booking</strong>
      </div>
      <div className="home-hero-b-form-lines">
        {["Tour date", "Adults · Children", "Hotel pickup"].map((item, index) => (
          <div key={item} className={index === 1 ? "is-hot" : ""}>
            <span style={{ width: index === 1 ? "72%" : "54%", background: index === 1 ? accent : undefined }} />
          </div>
        ))}
      </div>
      <div className="home-hero-b-total">
        <b>Total</b>
        <b>AED 550</b>
      </div>
    </div>
  );
}

function StackPreview({ accent }: { accent: string }) {
  const tools = ["WP", "Elementor", "Woo", "ACF", "PHP", "GSAP"];
  return (
    <div className="home-hero-b-stack" aria-hidden="true">
      <div className="home-hero-b-mini-title">
        <span style={badgeStyle(accent, true)}>WP</span>
        <strong>Production Stack</strong>
      </div>
      <div className="home-hero-b-tools">
        {tools.map((tool, index) => (
          <span key={tool} className={index === 1 ? "is-active" : ""}>{tool}</span>
        ))}
      </div>
    </div>
  );
}

function HeroCardItem({ card }: { card: HeroCard }) {
  return (
    <article className="home-hero-b-card">
      <div className="home-hero-b-browser"><i /><i /><i /></div>
      {card.type === "image" && card.image ? <img src={card.image} alt="" /> : null}
      {card.type === "booking" ? <BookingPreview accent={card.accent || "#ff7a18"} /> : null}
      {card.type === "stack" ? <StackPreview accent={card.accent || "#070707"} /> : null}
      <div className="home-hero-b-card-body" data-image={card.type === "image" ? "true" : "false"}>
        <h3>
          {card.type === "image" ? <span style={badgeStyle(card.accent || "#22c55e")}>{card.badge}</span> : null}
          <span>{card.title}</span>
        </h3>
        <p>{card.desc}</p>
      </div>
    </article>
  );
}

function HomeHeroOptionB() {
  return (
    <div className="home-hero-b">
      <AnimatedBackground />
      <motion.div
        className="home-hero-b-inner"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="home-hero-b-status ha-pill">
          <strong>Available</strong> for new projects — UAE · UK · USA
        </div>

        <h1 className="home-hero-b-title ha-h1">
          <span>WordPress developer</span>{" "}
          building fast, high&#8209;impact websites
        </h1>

        <p className="home-hero-b-subline ha-sub">
          I build and redesign WordPress &amp; WooCommerce websites for businesses in the UAE, UK, and USA — from Figma to pixel-perfect, conversion-ready sites.
        </p>

        <div className="home-hero-b-actions ha-actions">
          <a className="home-hero-b-btn home-hero-b-btn-dark" href="mailto:adeeliqbalajum@gmail.com">✦ Let&apos;s talk</a>
          <a className="home-hero-b-btn home-hero-b-btn-ghost" href="#projects">Browse work</a>
        </div>

        <motion.div
          className="home-hero-b-showcase ha-showcase"
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.78, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Portfolio preview"
        >
          <div className="home-hero-b-haze" />
          <div className="home-hero-b-strip" aria-hidden="true">
            {cards.map((card) => <HeroCardItem card={card} key={card.title} />)}
          </div>
          <div className="home-hero-b-portrait">
            <img src={portraitDataUrl} alt="Muhammad Adeel Iqbal" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function HomeHeroOptionBMount() {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    hero.classList.add("home-hero-option-b-mounted");
    setTarget(hero);

    return () => {
      hero.classList.remove("home-hero-option-b-mounted");
    };
  }, []);

  if (!target) return null;

  return createPortal(<HomeHeroOptionB />, target);
}
