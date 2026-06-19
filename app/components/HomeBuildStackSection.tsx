"use client";

import { useState } from "react";

type Tool = {
  id: string;
  name: string;
  short: string;
  category: string;
  title: string;
  description: string;
};

const tools: Tool[] = [
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
    short: "React",
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

function ToolIcon({ tool }: { tool: Tool }) {
  if (tool.id === "react") {
    return (
      <svg className="build-stack-svg" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="2.8" fill="currentColor" />
        <ellipse cx="16" cy="16" rx="12" ry="4.7" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="16" cy="16" rx="12" ry="4.7" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="12" ry="4.7" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(120 16 16)" />
      </svg>
    );
  }

  if (tool.id === "tailwind") {
    return (
      <svg className="build-stack-svg" viewBox="0 0 32 32" aria-hidden="true">
        <path fill="currentColor" d="M16 9.5c-3.8 0-6.2 1.9-7.2 5.6 1.4-1.9 3-2.6 4.9-2.1 1.1.3 1.9 1.1 2.8 1.9 1.5 1.4 3.2 3 6.8 3 3.8 0 6.2-1.9 7.2-5.6-1.4 1.9-3 2.6-4.9 2.1-1.1-.3-1.9-1.1-2.8-1.9-1.5-1.4-3.2-3-6.8-3Zm-7.3 4.6c-3.8 0-6.2 1.9-7.2 5.6 1.4-1.9 3-2.6 4.9-2.1 1.1.3 1.9 1.1 2.8 1.9 1.5 1.4 3.2 3 6.8 3 3.8 0 6.2-1.9 7.2-5.6-1.4 1.9-3 2.6-4.9 2.1-1.1-.3-1.9-1.1-2.8-1.9-1.5-1.4-3.2-3-6.8-3Z" />
      </svg>
    );
  }

  if (tool.id === "figma") {
    return (
      <svg className="build-stack-svg" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="12" cy="8" r="5" fill="#f24e1e" />
        <circle cx="20" cy="8" r="5" fill="#ff7262" />
        <circle cx="12" cy="16" r="5" fill="#a259ff" />
        <circle cx="20" cy="16" r="5" fill="#1abcfe" />
        <circle cx="12" cy="24" r="5" fill="#0acf83" />
      </svg>
    );
  }

  if (tool.id === "elementor") {
    return (
      <svg className="build-stack-svg" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="currentColor" />
        <rect x="10" y="9" width="4" height="14" rx="1" fill="#fff" />
        <rect x="17" y="9" width="6" height="3.5" rx="1" fill="#fff" />
        <rect x="17" y="14.25" width="6" height="3.5" rx="1" fill="#fff" />
        <rect x="17" y="19.5" width="6" height="3.5" rx="1" fill="#fff" />
      </svg>
    );
  }

  if (tool.id === "wordpress") {
    return <span className="build-stack-wordmark">W</span>;
  }

  if (tool.id === "next") {
    return <span className="build-stack-wordmark">N</span>;
  }

  return <span>{tool.short}</span>;
}

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
            <strong className={`build-stack-card-icon build-stack-icon-${activeTool.id}`}>
              <ToolIcon tool={activeTool} />
            </strong>
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
                aria-label={tool.name}
              >
                <span className={`build-stack-icon build-stack-icon-${tool.id}`}>
                  <ToolIcon tool={tool} />
                </span>
                <span className="build-stack-name">{tool.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
