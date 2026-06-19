import Link from "next/link";
import { ProcessMotionOptions } from "./ProcessMotionOptions";

export default function ProcessOptionsPage() {
  return (
    <main className="process-options-page">
      <div className="process-options-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <header className="process-options-hero">
        <Link href="/" className="process-back-link">← Back to portfolio</Link>
        <div className="eyebrow">Process Motion Options</div>
        <h1>Choose the final process section animation</h1>
        <p>
          These are now real animated previews using Motion, GSAP ScrollTrigger, sticky scrolling, and scroll-linked effects. The live homepage process section is still untouched.
        </p>
      </header>

      <ProcessMotionOptions />
    </main>
  );
}
