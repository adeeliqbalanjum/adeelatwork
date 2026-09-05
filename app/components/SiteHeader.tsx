import Link from "next/link";
import { cvUrl } from "../site-config";

const portraitDataUrl = "https://avatars.githubusercontent.com/u/178131381?v=4";

export function SiteHeader() {
  return (
    <nav className="nav site-header" aria-label="Primary navigation">
      <Link className="nav-logo" href="/" aria-label="Muhammad Adeel Iqbal home">
        <img src={portraitDataUrl} alt="Adeel" />
      </Link>
      <Link href="/">Home</Link>
      <Link href="/#services">Services</Link>
      <Link href="/portfolio">Work</Link>
      <Link href="/#proof">Proof</Link>
      <a href={cvUrl}>CV</a>
      <Link href="/#contact" className="nav-cta">Hire Me</Link>
    </nav>
  );
}
