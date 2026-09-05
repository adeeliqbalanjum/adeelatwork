import Link from "next/link";
import { cvUrl, siteConfig } from "../site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="site-footer-inner">
        <div>
          <span className="site-footer-kicker">Available for WordPress projects</span>
          <h2>Let&apos;s build a fast, editable website that works.</h2>
          <p>WordPress, Elementor Pro, WooCommerce, custom plugins, performance fixes, migrations, QA and website maintenance.</p>
        </div>
        <div className="site-footer-actions">
          <a href={`mailto:${siteConfig.email}`} className="btn btn-dark">✦ Email me</a>
          <Link href="/portfolio" className="btn btn-ghost">View work</Link>
          <a href={cvUrl} className="btn btn-ghost">View CV</a>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Muhammad Adeel Iqbal</span>
        <span>WordPress Developer · Elementor Pro · WooCommerce · Custom PHP</span>
      </div>
    </footer>
  );
}
