import Link from "next/link";
import styles from "./CapabilitiesSectionOptions.module.css";

const capabilities = [
  {
    number: "01",
    tag: "Custom WordPress systems",
    title: "Booking flows, dashboards, and admin systems",
    copy: "Custom booking forms with private/sharing pricing, AED totals, child pricing rules, add-ons, admin approval, customer emails, and booking status workflows.",
    tags: ["Booking logic", "Admin panel", "Email workflow"],
    mockup: "booking",
    accent: "accentOrange",
  },
  {
    number: "02",
    tag: "WooCommerce checkout",
    title: "Stores, products, payments, and checkout flows",
    copy: "WooCommerce product pages, cart/checkout UX, coupons, shipping, payment setup, order notifications, and conversion-focused purchase flows.",
    tags: ["Product UX", "Payments", "Checkout fixes"],
    mockup: "commerce",
    accent: "accentPurple",
  },
  {
    number: "03",
    tag: "Editable Elementor builds",
    title: "Elementor Pro websites and landing pages",
    copy: "Pixel-perfect responsive pages, native Elementor sections, editable templates, ACF-powered layouts, motion sections, and mobile-first landing pages.",
    tags: ["Elementor Pro", "Responsive UI", "ACF templates"],
    mockup: "elementor",
    accent: "accentGreen",
  },
  {
    number: "04",
    tag: "Plugin development",
    title: "Custom plugins, shortcodes, and business logic",
    copy: "Lightweight custom plugins with shortcodes, metaboxes, database tables, admin screens, product-level settings, and secure form handling.",
    tags: ["Shortcodes", "DB tables", "Metaboxes"],
    mockup: "plugin",
    accent: "accentBlue",
  },
  {
    number: "05",
    tag: "Performance cleanup",
    title: "Speed, Core Web Vitals, and technical cleanup",
    copy: "Cache setup, image optimisation, plugin cleanup, CSS/JS reduction, Lighthouse improvements, schema, redirects, and mobile performance tuning.",
    tags: ["Speed fixes", "Lighthouse", "SEO cleanup"],
    mockup: "speed",
    accent: "accentBlack",
  },
  {
    number: "06",
    tag: "Integrations & automation",
    title: "API, payment, email, and webhook integrations",
    copy: "Payment gateways, SMTP emails, CRM/contact flows, WhatsApp CTAs, webhook handling, third-party APIs, and automation workflows inside WordPress.",
    tags: ["Payments", "Webhooks", "Automation"],
    mockup: "api",
    accent: "accentOrange",
  },
];

function Mockup({ type, accent }: { type: string; accent: string }) {
  if (type === "booking") {
    return (
      <div className={`${styles.mockup} ${styles[accent]}`}>
        <div className={styles.mockupTop}><i /><i /><i /></div>
        <div className={styles.mockupBody}>
          <div className={styles.miniStats}><span>Private<br /><strong>AED 400</strong></span><span>Sharing<br /><strong>AED 110</strong></span><span>Status<br /><strong>Pending</strong></span></div>
          <div className={styles.tableLines}><span /><span /><span /></div>
          <div className={styles.checkoutGrid}><div className={styles.checkoutBox}>Add-ons<strong>Quad + Buggy</strong></div><div className={styles.checkoutBox}>Email<strong>Sent</strong></div></div>
        </div>
      </div>
    );
  }

  if (type === "commerce") {
    return (
      <div className={`${styles.mockup} ${styles[accent]}`}>
        <div className={styles.mockupTop}><i /><i /><i /></div>
        <div className={styles.mockupBody}>
          <div className={styles.checkoutGrid}><div className={styles.checkoutBox}>Product page<strong>Variant ready</strong></div><div className={styles.checkoutBox}>Cart<strong>Clean UX</strong></div></div>
          <div className={styles.tableLines}><span /><span /><span /></div>
          <div className={styles.checkoutBox}>Checkout status<strong>Payment + order emails connected</strong></div>
        </div>
      </div>
    );
  }

  if (type === "elementor") {
    return (
      <div className={`${styles.mockup} ${styles[accent]}`}>
        <div className={styles.mockupTop}><i /><i /><i /></div>
        <div className={styles.mockupBody}>
          <div className={styles.elementorGrid}><div className={styles.elementorBlock}>Hero<strong>Editable</strong></div><div className={styles.elementorBlock}>ACF<strong>Dynamic</strong></div><div className={styles.elementorBlock}>Mobile<strong>Stacked</strong></div><div className={styles.elementorBlock}>Motion<strong>Subtle</strong></div></div>
          <div className={styles.tableLines}><span /><span /></div>
        </div>
      </div>
    );
  }

  if (type === "plugin") {
    return (
      <div className={`${styles.mockup} ${styles[accent]}`}>
        <div className={styles.mockupTop}><i /><i /><i /></div>
        <div className={styles.mockupBody}>
          <div className={styles.pluginGrid}><div className={styles.pluginBox}>Shortcode<strong>[booking]</strong></div><div className={styles.pluginBox}>Settings<strong>Product level</strong></div><div className={styles.pluginBox}>DB table<strong>Secure</strong></div><div className={styles.pluginBox}>Admin UI<strong>Status</strong></div></div>
        </div>
      </div>
    );
  }

  if (type === "speed") {
    return (
      <div className={`${styles.mockup} ${styles[accent]}`}>
        <div className={styles.mockupTop}><i /><i /><i /></div>
        <div className={styles.mockupBody}>
          <div className={styles.speedGrid}><div className={styles.speedScore}>Before<strong>6s</strong></div><div className={styles.speedScore}>After<strong>1.8s</strong></div><div className={styles.speedScore}>Images<strong>WebP</strong></div><div className={styles.speedScore}>Cache<strong>Clean</strong></div></div>
          <div className={styles.tableLines}><span /><span /></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.mockup} ${styles[accent]}`}>
      <div className={styles.mockupTop}><i /><i /><i /></div>
      <div className={styles.mockupBody}>
        <div className={styles.apiGrid}><div className={styles.apiNode}>Form<strong>Lead</strong></div><div className={styles.apiNode}>Webhook<strong>Trigger</strong></div><div className={styles.apiNode}>Payment<strong>Success</strong></div><div className={styles.apiNode}>Email<strong>SMTP</strong></div></div>
        <div className={styles.tableLines}><span /><span /><span /></div>
      </div>
    </div>
  );
}

function OptionA() {
  return (
    <section className={`${styles.option} ${styles.optionA}`}>
      <div className={styles.optionLabel}>Option A · Scroll story capabilities</div>
      <div className={styles.storyGrid}>
        <aside className={styles.storyIntro}>
          <div>
            <span className={styles.miniPill}>Recommended direction</span>
            <h2>WordPress systems I can build for real businesses.</h2>
            <p>This version turns the section into a premium scroll story. Each card explains one real capability and pairs it with a real UI-style graphic.</p>
            <div className={styles.proofList}>
              <span>Best for showing custom plugin and business logic skills</span>
              <span>Feels premium without heavy 3D or slow animations</span>
              <span>Matches the new light glass homepage direction</span>
            </div>
          </div>
        </aside>
        <div className={styles.stickyShowcase}>
          {capabilities.map((item) => (
            <article className={styles.storyCard} key={item.title}>
              <div className={styles.storyCopy}>
                <small>{item.number} / {item.tag}</small>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <div className={styles.featureTags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <Mockup type={item.mockup} accent={item.accent} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OptionB() {
  return (
    <section className={`${styles.option} ${styles.optionB}`}>
      <div className={styles.optionLabel}>Option B · WordPress control room</div>
      <div className={styles.boardIntro}>
        <div className={styles.boardHeader}>
          <div>
            <span className={styles.miniPill}>Capability board</span>
            <h2>Everything a client can hire me to build inside WordPress.</h2>
            <p>A grid version that feels like a technical control room, with each system shown as a real mini interface.</p>
          </div>
          <div className={styles.boardStats}><span><strong>6</strong>build types</span><span><strong>WP</strong>native logic</span><span><strong>UI</strong>editable pages</span></div>
        </div>
      </div>
      <div className={styles.systemGrid}>
        {capabilities.map((item) => (
          <article className={styles.systemCard} key={item.title}>
            <div>
              <small>{item.number} / {item.tag}</small>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <div className={styles.featureTags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <Mockup type={item.mockup} accent={item.accent} />
          </article>
        ))}
      </div>
    </section>
  );
}

function OptionC() {
  const topThree = capabilities.slice(0, 3);
  const bottomThree = capabilities.slice(3);
  return (
    <section className={`${styles.option} ${styles.optionC}`}>
      <div className={styles.optionLabel}>Option C · Premium service stack</div>
      <div className={styles.finalGrid}>
        <aside className={styles.finalIntro}>
          <div>
            <span className={styles.miniPill}>Strong homepage version</span>
            <h2>From clean pages to full WordPress business systems.</h2>
            <p>This is more compact and conversion-focused. It works well if you want the section to feel direct and sales-ready.</p>
          </div>
          <a href="mailto:adeeliqbalajum@gmail.com" className={styles.finalCta}>Discuss a build</a>
        </aside>
        <div className={styles.finalPanels}>
          {[...topThree, ...bottomThree].map((item) => (
            <article className={styles.finalCard} key={item.title}>
              <div className={styles.finalCardTop}>
                <small>{item.number} / {item.tag}</small>
                <span className={styles.finalIcon}>{item.number}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <div className={styles.featureTags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CapabilitiesSectionOptionsPage() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>← Back home</Link>
      <header className={styles.header}>
        <span className={styles.headerBadge}>Capabilities section previews</span>
        <h1>What I can build <span>inside WordPress</span></h1>
        <p>Three complete section directions with real service content and real UI-style graphics for booking systems, WooCommerce, Elementor builds, custom plugins, speed work, and integrations.</p>
      </header>
      <div className={styles.previewStack}>
        <OptionA />
        <OptionB />
        <OptionC />
      </div>
    </main>
  );
}
