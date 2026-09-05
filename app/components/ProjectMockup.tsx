import React from "react";

export type MockupType =
  | "tourism" | "healthcare" | "tech" | "corporate"
  | "service" | "education" | "legal" | "finance"
  | "wellness" | "personal";

interface Props {
  type: MockupType;
  bg: string;
  accent: string;
  name: string;
  size?: "card" | "hero";
}

/* ── shared helpers ─────────────────────────────────────── */
const Bar = ({ w, h = 8, opacity = 1, radius = 4, color = "rgba(255,255,255,.82)", mt = 0 }: {
  w: string | number; h?: number; opacity?: number; radius?: number; color?: string; mt?: number;
}) => (
  <div style={{ height: h, width: w, borderRadius: radius, background: color, opacity, marginTop: mt }} />
);

const Btn = ({ w = 60, color = "rgba(255,255,255,.90)", dark = false }: { w?: number; color?: string; dark?: boolean }) => (
  <div style={{ height: 20, width: w, borderRadius: 10, background: dark ? "rgba(0,0,0,.75)" : color, flexShrink: 0 }} />
);

const Card = ({ h = 44, bg = "rgba(255,255,255,.18)", radius = 10 }: { h?: number; bg?: string; radius?: number }) => (
  <div style={{ flex: 1, height: h, borderRadius: radius, background: bg }} />
);

const ChromeBar = ({ url }: { url: string }) => (
  <div style={{ height: 28, background: "#e5e5e2", display: "flex", alignItems: "center", gap: 5, padding: "0 10px", flexShrink: 0 }}>
    {["#ff5f57", "#ffbd2e", "#28ca41"].map(c => (
      <span key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }} />
    ))}
    <div style={{ flex: 1, margin: "0 8px", height: 14, borderRadius: 7, background: "rgba(255,255,255,.72)", display: "flex", alignItems: "center", padding: "0 8px", gap: 4 }}>
      <span style={{ fontSize: 8, opacity: 0.5 }}>🔒</span>
      <span style={{ fontSize: 8, color: "rgba(0,0,0,.44)", overflow: "hidden", whiteSpace: "nowrap" }}>{url}</span>
    </div>
  </div>
);

/* ── mockup layouts ─────────────────────────────────────── */

function TourismMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div style={{ flex: 1, background: bg, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* nav */}
      <div style={{ height: 26, background: "rgba(0,0,0,.35)", display: "flex", alignItems: "center", padding: "0 10px", gap: 6, backdropFilter: "blur(4px)" }}>
        <div style={{ height: 8, width: 36, borderRadius: 4, background: "rgba(255,255,255,.9)" }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {[28, 22, 26, 18].map((w, i) => <Bar key={i} w={w} h={6} color="rgba(255,255,255,.55)" />)}
          <Btn w={38} />
        </div>
      </div>
      {/* hero */}
      <div style={{ padding: "12px 12px 6px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg,rgba(255,255,255,.14) 0%,transparent 60%)" }} />
        <Bar w="72%" h={11} />
        <Bar w="52%" h={7} color="rgba(255,255,255,.58)" mt={5} />
        <div style={{ display: "flex", gap: 6, marginTop: 10 }}><Btn w={52} /><Btn w={40} color="rgba(255,255,255,.28)" /></div>
      </div>
      {/* booking bar */}
      <div style={{ margin: "6px 10px", height: 20, borderRadius: 8, background: "rgba(255,255,255,.92)", display: "flex", alignItems: "center", padding: "0 8px", gap: 5 }}>
        {[38, 28, 28].map((w, i) => <Bar key={i} w={w} h={6} color="rgba(0,0,0,.18)" />)}
        <Btn w={30} dark />
      </div>
      {/* destination cards */}
      <div style={{ display: "flex", gap: 6, padding: "4px 10px 8px" }}>
        {[accent, "rgba(255,255,255,.2)", "rgba(255,255,255,.14)"].map((c, i) => (
          <div key={i} style={{ flex: 1, height: 40, borderRadius: 8, background: c, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", bottom: 4, left: 4, right: 4 }}>
              <Bar w="70%" h={5} />
              <Bar w="45%" h={4} color="rgba(255,255,255,.55)" mt={2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthcareMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div style={{ flex: 1, background: "#f8faff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* nav */}
      <div style={{ height: 26, background: "#fff", borderBottom: "1px solid rgba(0,0,0,.06)", display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
        <div style={{ height: 8, width: 36, borderRadius: 4, background: accent, opacity: .9 }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {[22, 18, 22].map((w, i) => <Bar key={i} w={w} h={5} color="rgba(0,0,0,.22)" />)}
          <div style={{ height: 18, width: 44, borderRadius: 9, background: accent }} />
        </div>
      </div>
      {/* hero split */}
      <div style={{ display: "flex", gap: 8, padding: "10px 10px 4px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ height: 7, width: "55%", borderRadius: 3, background: accent, opacity: .8, marginBottom: 4 }} />
          <Bar w="90%" h={10} color="rgba(0,0,0,.82)" />
          <Bar w="70%" h={10} color="rgba(0,0,0,.82)" mt={3} />
          <Bar w="80%" h={6} color="rgba(0,0,0,.35)" mt={5} />
          <Bar w="65%" h={6} color="rgba(0,0,0,.35)" mt={2} />
          <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
            <div style={{ height: 18, width: 54, borderRadius: 9, background: accent }} />
            <div style={{ height: 18, width: 40, borderRadius: 9, background: "rgba(0,0,0,.08)" }} />
          </div>
        </div>
        <div style={{ width: 56, height: 60, borderRadius: 12, background: `linear-gradient(135deg,${accent},rgba(255,255,255,.2))`, opacity: .7 }} />
      </div>
      {/* service cards */}
      <div style={{ display: "flex", gap: 5, padding: "4px 10px 8px" }}>
        {[accent + "22", accent + "15", accent + "10"].map((c, i) => (
          <div key={i} style={{ flex: 1, height: 32, borderRadius: 8, background: c, padding: "5px 6px" }}>
            <Bar w="60%" h={5} color={accent} opacity={.7} />
            <Bar w="80%" h={4} color="rgba(0,0,0,.25)" mt={3} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TechMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div style={{ flex: 1, background: "linear-gradient(160deg,#0a0a14 0%,#1a1a2e 100%)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* nav */}
      <div style={{ height: 26, background: "rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
        <div style={{ height: 8, width: 30, borderRadius: 4, background: accent, opacity: .9 }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {[22, 20, 18, 22].map((w, i) => <Bar key={i} w={w} h={5} color="rgba(255,255,255,.35)" />)}
          <div style={{ height: 16, width: 42, borderRadius: 8, background: accent, opacity: .85 }} />
        </div>
      </div>
      {/* hero */}
      <div style={{ padding: "12px 10px 6px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 60, borderRadius: "50%", background: accent, opacity: .12, filter: "blur(20px)" }} />
        <div style={{ height: 6, width: 48, borderRadius: 3, background: accent, opacity: .8, marginBottom: 5 }} />
        <Bar w="80%" h={11} color="rgba(255,255,255,.9)" />
        <Bar w="62%" h={11} color="rgba(255,255,255,.9)" mt={3} />
        <Bar w="75%" h={6} color="rgba(255,255,255,.35)" mt={5} />
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <div style={{ height: 18, width: 52, borderRadius: 9, background: accent }} />
          <div style={{ height: 18, width: 38, borderRadius: 9, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.18)" }} />
        </div>
      </div>
      {/* feature cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, padding: "4px 10px 8px" }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ height: 26, borderRadius: 6, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", padding: "4px 6px" }}>
            <div style={{ height: 5, width: 10, borderRadius: 2, background: accent, opacity: .7, marginBottom: 3 }} />
            <Bar w="75%" h={4} color="rgba(255,255,255,.5)" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CorporateMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div style={{ flex: 1, background: "#f9f9f8", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* nav */}
      <div style={{ height: 26, background: "#fff", borderBottom: "1px solid rgba(0,0,0,.07)", display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
        <div style={{ height: 8, width: 44, borderRadius: 4, background: "rgba(0,0,0,.75)" }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {[24, 20, 18, 24].map((w, i) => <Bar key={i} w={w} h={5} color="rgba(0,0,0,.28)" />)}
          <div style={{ height: 18, width: 46, borderRadius: 9, background: accent }} />
        </div>
      </div>
      {/* hero */}
      <div style={{ padding: "10px 10px 6px", textAlign: "center" as const }}>
        <Bar w="55%" h={11} color="rgba(0,0,0,.82)" radius={5} mt={0} />
        <Bar w="72%" h={11} color="rgba(0,0,0,.82)" radius={5} mt={4} />
        <Bar w="60%" h={6} color="rgba(0,0,0,.32)" radius={3} mt={5} />
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 8 }}>
          <div style={{ height: 18, width: 52, borderRadius: 9, background: accent }} />
          <div style={{ height: 18, width: 44, borderRadius: 9, background: "rgba(0,0,0,.08)" }} />
        </div>
      </div>
      {/* service columns */}
      <div style={{ display: "flex", gap: 5, padding: "6px 10px 8px" }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ flex: 1, height: 36, borderRadius: 8, background: i === 0 ? accent + "22" : "rgba(0,0,0,.04)", border: "1px solid rgba(0,0,0,.06)", padding: "5px 6px" }}>
            <div style={{ height: 6, width: 12, borderRadius: 3, background: accent, marginBottom: 3, opacity: .8 }} />
            <Bar w="80%" h={4} color="rgba(0,0,0,.28)" />
            <Bar w="60%" h={4} color="rgba(0,0,0,.18)" mt={2} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* top bar */}
      <div style={{ height: 18, background: accent, display: "flex", alignItems: "center", padding: "0 10px", gap: 8 }}>
        <Bar w={60} h={5} color="rgba(255,255,255,.85)" />
        <div style={{ marginLeft: "auto", height: 5, width: 48, borderRadius: 2, background: "rgba(255,255,255,.7)" }} />
      </div>
      {/* nav */}
      <div style={{ height: 24, background: "#fff", borderBottom: "1px solid rgba(0,0,0,.08)", display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
        <div style={{ height: 8, width: 40, borderRadius: 4, background: "rgba(0,0,0,.82)" }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {[20, 18, 22].map((w, i) => <Bar key={i} w={w} h={5} color="rgba(0,0,0,.28)" />)}
          <div style={{ height: 16, width: 36, borderRadius: 8, background: accent }} />
        </div>
      </div>
      {/* hero */}
      <div style={{ padding: "8px 10px 5px", background: "linear-gradient(135deg,rgba(0,0,0,.03),rgba(0,0,0,.01))" }}>
        <Bar w="80%" h={12} color="rgba(0,0,0,.85)" />
        <Bar w="58%" h={12} color="rgba(0,0,0,.85)" mt={3} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
          <div style={{ height: 18, width: 44, borderRadius: 9, background: accent }} />
          <div style={{ height: 5, width: 60, borderRadius: 2, background: "rgba(0,0,0,.2)" }} />
        </div>
      </div>
      {/* service grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, padding: "5px 10px 8px" }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ height: 28, borderRadius: 6, background: i === 0 ? accent + "18" : "rgba(0,0,0,.03)", border: "1px solid rgba(0,0,0,.07)", padding: "4px 6px" }}>
            <Bar w="65%" h={5} color={i === 0 ? accent : "rgba(0,0,0,.5)"} opacity={i === 0 ? .9 : 1} />
            <Bar w="80%" h={4} color="rgba(0,0,0,.2)" mt={2} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div style={{ flex: 1, background: "#fffdf8", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* nav */}
      <div style={{ height: 26, background: "#fff", borderBottom: `2px solid ${accent}22`, display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
        <div style={{ height: 10, width: 40, borderRadius: 5, background: accent, opacity: .85 }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {[20, 18, 24].map((w, i) => <Bar key={i} w={w} h={5} color="rgba(0,0,0,.28)" />)}
          <div style={{ height: 18, width: 44, borderRadius: 9, background: accent }} />
        </div>
      </div>
      {/* hero */}
      <div style={{ padding: "10px 10px 6px", background: `linear-gradient(135deg,${accent}12,${accent}05)` }}>
        <Bar w="70%" h={11} color="rgba(0,0,0,.82)" />
        <Bar w="55%" h={11} color="rgba(0,0,0,.82)" mt={3} />
        <Bar w="80%" h={6} color="rgba(0,0,0,.35)" mt={5} />
        <div style={{ display: "flex", gap: 6, marginTop: 7 }}>
          <div style={{ height: 18, width: 56, borderRadius: 9, background: accent }} />
          <div style={{ height: 18, width: 40, borderRadius: 9, background: "rgba(0,0,0,.07)" }} />
        </div>
      </div>
      {/* program cards */}
      <div style={{ display: "flex", gap: 6, padding: "5px 10px 8px" }}>
        {[accent, accent + "88", accent + "55"].map((c, i) => (
          <div key={i} style={{ flex: 1, borderRadius: 8, background: "rgba(255,255,255,.9)", border: `1px solid ${accent}30`, overflow: "hidden" }}>
            <div style={{ height: 14, background: c, opacity: .85 }} />
            <div style={{ padding: "4px 5px" }}>
              <Bar w="70%" h={5} color="rgba(0,0,0,.6)" />
              <Bar w="55%" h={4} color="rgba(0,0,0,.3)" mt={2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegalMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div style={{ flex: 1, background: "#f4f6f9", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* nav */}
      <div style={{ height: 26, background: "#0f1e35", display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
        <div style={{ height: 8, width: 42, borderRadius: 4, background: accent, opacity: .9 }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {[22, 20, 18, 22].map((w, i) => <Bar key={i} w={w} h={5} color="rgba(255,255,255,.45)" />)}
          <div style={{ height: 16, width: 44, borderRadius: 8, background: accent }} />
        </div>
      </div>
      {/* hero */}
      <div style={{ padding: "10px 10px 5px", background: "linear-gradient(135deg,#1a2d45,#0f1e35)", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg,rgba(255,255,255,.05),transparent)" }} />
        <div style={{ height: 5, width: 70, borderRadius: 2, background: accent, opacity: .7, marginBottom: 4 }} />
        <Bar w="80%" h={10} color="rgba(255,255,255,.92)" />
        <Bar w="60%" h={10} color="rgba(255,255,255,.92)" mt={3} />
        <Bar w="72%" h={5} color="rgba(255,255,255,.45)" mt={5} />
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <div style={{ height: 18, width: 58, borderRadius: 9, background: accent }} />
          <div style={{ height: 18, width: 44, borderRadius: 9, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)" }} />
        </div>
      </div>
      {/* practice areas */}
      <div style={{ display: "flex", gap: 5, padding: "5px 10px 8px" }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ flex: 1, height: 34, borderRadius: 6, background: "#fff", border: "1px solid rgba(0,0,0,.08)", padding: "5px 6px" }}>
            <div style={{ height: 5, width: 14, borderRadius: 2, background: accent, opacity: .8, marginBottom: 3 }} />
            <Bar w="80%" h={4} color="rgba(0,0,0,.4)" />
            <Bar w="60%" h={4} color="rgba(0,0,0,.22)" mt={2} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div style={{ flex: 1, background: "linear-gradient(160deg,#0a0e1a 0%,#111827 100%)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* nav */}
      <div style={{ height: 26, background: "rgba(255,255,255,.03)", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
        <div style={{ height: 8, width: 38, borderRadius: 4, background: accent, opacity: .9 }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {[22, 18, 24, 18].map((w, i) => <Bar key={i} w={w} h={5} color="rgba(255,255,255,.35)" />)}
          <div style={{ height: 16, width: 44, borderRadius: 8, background: accent }} />
        </div>
      </div>
      {/* hero */}
      <div style={{ padding: "10px 10px 6px" }}>
        <div style={{ height: 5, width: 60, borderRadius: 2, background: accent, opacity: .7, marginBottom: 4 }} />
        <Bar w="78%" h={10} color="rgba(255,255,255,.9)" />
        <Bar w="58%" h={10} color="rgba(255,255,255,.9)" mt={3} />
        <Bar w="70%" h={5} color="rgba(255,255,255,.35)" mt={5} />
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <div style={{ height: 18, width: 58, borderRadius: 9, background: accent }} />
          <div style={{ height: 18, width: 44, borderRadius: 9, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)" }} />
        </div>
      </div>
      {/* stat row */}
      <div style={{ display: "flex", gap: 5, padding: "4px 10px 8px" }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ flex: 1, height: 30, borderRadius: 6, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", padding: "4px 6px" }}>
            <div style={{ height: 8, width: "55%", borderRadius: 3, background: accent, opacity: .9, marginBottom: 3 }} />
            <Bar w="75%" h={4} color="rgba(255,255,255,.35)" />
          </div>
        ))}
      </div>
    </div>
  );
}

function WellnessMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div style={{ flex: 1, background: "#f0faf5", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* nav */}
      <div style={{ height: 26, background: "#fff", borderBottom: `1px solid ${accent}30`, display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
        <div style={{ height: 10, width: 38, borderRadius: 5, background: accent, opacity: .85 }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {[20, 18, 22].map((w, i) => <Bar key={i} w={w} h={5} color="rgba(0,0,0,.3)" />)}
          <div style={{ height: 18, width: 48, borderRadius: 9, background: accent }} />
        </div>
      </div>
      {/* hero */}
      <div style={{ padding: "10px 10px 5px", background: `linear-gradient(135deg,${accent}18,${accent}08)` }}>
        <Bar w="70%" h={11} color="rgba(0,0,0,.82)" />
        <Bar w="52%" h={11} color="rgba(0,0,0,.82)" mt={3} />
        <Bar w="78%" h={6} color="rgba(0,0,0,.38)" mt={5} />
        <Bar w="60%" h={6} color="rgba(0,0,0,.28)" mt={2} />
        <div style={{ display: "flex", gap: 6, marginTop: 7 }}>
          <div style={{ height: 18, width: 62, borderRadius: 9, background: accent }} />
        </div>
      </div>
      {/* service cards */}
      <div style={{ display: "flex", gap: 5, padding: "5px 10px 8px" }}>
        {[accent, accent + "88", accent + "55"].map((c, i) => (
          <div key={i} style={{ flex: 1, height: 32, borderRadius: 8, background: "#fff", border: `1px solid ${accent}30`, padding: "4px 5px" }}>
            <div style={{ height: 5, width: 12, borderRadius: 2, background: c, opacity: .9, marginBottom: 3 }} />
            <Bar w="75%" h={4} color="rgba(0,0,0,.38)" />
            <Bar w="55%" h={4} color="rgba(0,0,0,.2)" mt={2} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PersonalMockup({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div style={{ flex: 1, background: "#fdfcf9", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* nav */}
      <div style={{ height: 26, background: "#fff", borderBottom: "1px solid rgba(0,0,0,.07)", display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
        <div style={{ height: 8, width: 38, borderRadius: 4, background: "rgba(0,0,0,.8)" }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {[22, 20, 24, 18].map((w, i) => <Bar key={i} w={w} h={5} color="rgba(0,0,0,.3)" />)}
          <div style={{ height: 18, width: 42, borderRadius: 9, background: accent }} />
        </div>
      </div>
      {/* hero split */}
      <div style={{ display: "flex", gap: 8, padding: "10px 10px 5px", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ height: 5, width: 52, borderRadius: 2, background: accent, opacity: .8, marginBottom: 4 }} />
          <Bar w="90%" h={10} color="rgba(0,0,0,.82)" />
          <Bar w="72%" h={10} color="rgba(0,0,0,.82)" mt={3} />
          <Bar w="80%" h={5} color="rgba(0,0,0,.35)" mt={5} />
          <Bar w="65%" h={5} color="rgba(0,0,0,.25)" mt={2} />
          <div style={{ display: "flex", gap: 5, marginTop: 7 }}>
            <div style={{ height: 18, width: 50, borderRadius: 9, background: accent }} />
            <div style={{ height: 18, width: 40, borderRadius: 9, background: "rgba(0,0,0,.07)" }} />
          </div>
        </div>
        {/* portrait placeholder */}
        <div style={{ width: 52, height: 62, borderRadius: 10, background: `linear-gradient(135deg,${accent},${accent}66)`, opacity: .75 }} />
      </div>
      {/* podcast / content */}
      <div style={{ padding: "4px 10px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
        {[0, 1].map(i => (
          <div key={i} style={{ height: 18, borderRadius: 6, background: "rgba(0,0,0,.04)", border: "1px solid rgba(0,0,0,.06)", display: "flex", alignItems: "center", gap: 6, padding: "0 6px" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent, opacity: .7 }} />
            <Bar w="60%" h={4} color="rgba(0,0,0,.4)" />
            <Bar w="18%" h={4} color="rgba(0,0,0,.2)" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── map types to components ─────────────────────────────── */
const LAYOUTS: Record<MockupType, (props: { bg: string; accent: string }) => React.ReactElement> = {
  tourism:    TourismMockup,
  healthcare: HealthcareMockup,
  tech:       TechMockup,
  corporate:  CorporateMockup,
  service:    ServiceMockup,
  education:  EducationMockup,
  legal:      LegalMockup,
  finance:    FinanceMockup,
  wellness:   WellnessMockup,
  personal:   PersonalMockup,
};

/* ── exported component ──────────────────────────────────── */
export function ProjectMockup({ type, bg, accent, name }: Props) {
  const Layout = LAYOUTS[type] ?? TechMockup;
  const domain = name.toLowerCase().replace(/\s+/g, "") + ".com";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", borderRadius: "inherit" }}>
      <ChromeBar url={domain} />
      <Layout bg={bg} accent={accent} />
    </div>
  );
}
