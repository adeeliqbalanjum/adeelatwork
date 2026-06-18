"use client";

export interface ParallaxItem {
  label: string;
  sub: string;
  gradient: string;
}

const offsets: React.CSSProperties[] = [
  {},
  { top: "10%", left: "12%", height: "34%", width: "34%" },
  { top: "22%", left: "34%", height: "44%", width: "24%" },
  { top: "13%", left: "62%", height: "32%", width: "28%" },
  { top: "54%", left: "16%", height: "28%", width: "28%" },
  { top: "56%", left: "48%", height: "30%", width: "32%" },
  { top: "44%", left: "76%", height: "22%", width: "18%" },
];

export function ZoomParallax({ items }: { items: ParallaxItem[] }) {
  return (
    <section className="zp-outer" aria-label="Project capability preview">
      <div className="zp-stage">
        <div className="zp-label-wrap">
          <p className="zp-label">50+ projects delivered</p>
        </div>
        {items.slice(0, 7).map(({ label, sub, gradient }, i) => (
          <div
            className="zp-card"
            key={label}
            style={{ background: gradient, ...offsets[i] }}
          >
            <div className="zp-shine" />
            <p className="zp-name">{label}</p>
            <p className="zp-sub">{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
