import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>This page is not part of the site navigation.</p>
        <div className="actions">
          <Link href="/" className="btn btn-dark">Back home</Link>
          <Link href="/portfolio" className="btn btn-ghost">View portfolio</Link>
        </div>
      </div>
    </main>
  );
}
