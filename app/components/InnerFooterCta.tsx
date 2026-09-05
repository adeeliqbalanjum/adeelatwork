/* Black CTA band used at the bottom of the inner pages (portfolio, case study, CV).
   Kept separate from SiteFooter so the homepage is untouched. */
export function InnerFooterCta({ email, whatsapp }: { email: string; whatsapp: string }) {
  return (
    <section className="pf-cta-wrap" aria-label="Contact">
      <div className="pf-cta">
        <div>
          <div className="eyebrow">Available for WordPress projects</div>
          <h2 className="pf-cta-title">Have a similar project? Send the brief, the Figma file, or the broken site.</h2>
          <p className="pf-cta-text">You&apos;ll get a clear reply on scope and next steps — no long forms, no sales call required.</p>
        </div>
        <div className="pf-cta-actions">
          <a className="pf-btn pf-btn-white" href={`mailto:${email}`}>Email me</a>
          <a className="pf-btn pf-btn-glass" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
