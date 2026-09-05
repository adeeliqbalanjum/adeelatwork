import { siteConfig } from "../site-config";

export function SeoJsonLd() {
  const profile = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    sameAs: [siteConfig.linkedin, siteConfig.github],
    knowsAbout: [
      "WordPress development",
      "Elementor Pro",
      "WooCommerce",
      "Custom WordPress plugins",
      "Website maintenance",
      "Core Web Vitals",
      "Figma to WordPress",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }}
    />
  );
}
