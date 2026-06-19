"use client";

import { useState } from "react";

const tools = [
  {
    id: "wordpress",
    name: "WordPress",
    short: "WP",
    category: "CMS foundation",
    title: "WordPress as the editable business foundation",
    description:
      "I use WordPress when clients need a website they can manage after launch, with clean pages, reusable templates, SEO structure, forms, and scalable content areas.",
  },
  {
    id: "elementor",
    name: "Elementor Pro",
    short: "E",
    category: "Visual builder",
    title: "Elementor Pro for pixel-perfect editable layouts",
    description:
      "Elementor Pro helps me build responsive pages, landing sections, headers, footers, templates, and client-editable layouts without locking the site into hard-coded content.",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    short: "Woo",
    category: "E-commerce",
    title: "WooCommerce for stores and revenue workflows",
    description:
      "I build product pages, checkout improvements, custom fields, cart logic, payment setup, and conversion-focused store layouts for WooCommerce projects.",
  },
  {
    id: "acf",
    name: "ACF Pro",
    short: "ACF",
    category: "Custom fields",
    title: "ACF Pro for structured, client-editable content",
    description:
      "ACF lets me turn complex content into simple admin fields, so clients can manage team members, workshops, locations, service details, maps, and custom sections cleanly.",
  },
  {
    id: "cpt",
    name: "CPT UI",
    short: "CPT",
    category: "Content systems",
    title: "CPT structure for real content-heavy websites",
    description:
      "I use custom post types for directories, case studies, workshops, services, practitioners, products, and repeatable content systems that stay organized as the site grows.",
  },
  {
    id: "php",
    name: "PHP",
    short: "PHP",
    category: "Custom logic",
    title: "PHP for WordPress business logic and plugin fixes",
    description:
      "PHP helps me create custom pricing rules, admin workflows, shortcodes, template logic, form handling, WooCommerce customizations, and plugin-level fixes.",
  },
  {
    id: "javascript",
    name: "JavaScript",
    short: "JS",
    category: "Frontend logic",
    title: "JavaScript for interactive UI and dynamic behavior",
    description:
      "I use JavaScript for calculators, booking flows, interactive counters, conditional form behavior, AJAX-style interfaces, and polished front-end interactions.",
  },
  {
    id: "gsap",
    name: "GSAP",
    short: "Gs",
    category: "Motion",
    title: "GSAP for premium scroll and motion experiences",
    description:
      "GSAP is useful for smooth scroll-triggered reveals, pinned sections, parallax, timeline animations, and high-end motion effects that make a site feel premium.",
  },
  {
    id: "react",
    name: "React",
    short: "⚛",
    category: "UI systems",
    title: "React for modern interactive components",
    description:
      "React helps me prototype advanced UI sections, icon selectors, animated state changes, dashboards, and interaction patterns that can later guide custom WordPress builds.",
  },
  {
    id: "next",
    name: "Next.js",
    short: "N",
    category: "Modern web",
    title: "Next.js for fast portfolio and modern frontend work",
    description:
      "Next.js gives me a fast modern environment for interactive portfolio sections, static pages, routing, and component-based frontend experiences.",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    short: "Tw",
    category: "Styling",
    title: "Tailwind and custom CSS for clean responsive systems",
    description:
      "I use utility-first styling and custom CSS to create responsive layouts, glass cards, premium spacing, mobile behavior, and consistent design systems.",
  },
  {
    id: "figma",
    name: "Figma",
    short: "Fi",
    category: "Design handoff",
    title: "Figma to WordPress with attention to spacing and detail",
    description:
      "Figma helps me translate approved designs into responsive WordPress pages with correct typography, spacing, layout structure, and visual hierarchy.",
  },
];

export function HomeBuildStackSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeTool = tools[activeIndex];

  return (
    <section className="build-stack-section" id="build-stack">
      <div className="build-stack-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="build-stack-inner">
        <div className="build-stack-copy">
          <div className="eyebrow">Build Stack</div>
          <h2>Tools behind my WordPress builds</h2>
          <p>
            A focused stack for editable websites, custom content systems, WooCommerce logic, motion, and responsive UI.
          </p>
        </div>

        <div className="build-stack-card" aria-live="polite">
          <div className="build-stack-card-top">
            <span>{activeTool.category}</span>
            <strong>{activeTool.short}</strong>
          </div>
          <h3>{activeTool.title}</h3>
          <p>{activeTool.description}</p>
        </div>

        <div className="build-stack-selector" aria-label="Technology stack selector">
          {tools.map((tool, index) => {
            const isActive = activeIndex === index;
            const isHovered = hoveredIndex === index && !isActive;
            const showName = isActive || isHovered;

            return (
              <button
                type="button"
                key={tool.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`build-stack-tool ${isActive ? "is-active" : ""} ${showName ? "show-name" : ""}`}
                aria-pressed={isActive}
              >
                <span className={`build-stack-icon build-stack-icon-${tool.id}`}>{tool.short}</span>
                <span className="build-stack-name">{tool.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
