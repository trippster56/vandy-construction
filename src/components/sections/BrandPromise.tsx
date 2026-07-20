import { siteConfig } from "@/lib/site-config";

// Josh's brand-promise statement. Rendered as a calm full-width statement band.
const PROMISE =
  "When you choose Vandy Construction, you’re choosing a team that values people as much as projects. We’ll communicate honestly, work diligently, stand behind our craftsmanship, and treat your home or business with the same care we’d expect for our own.";

export default function BrandPromise() {
  const v = siteConfig.variant;
  if (v === "character") return <CharacterPromise />;
  if (v === "bold") return <BoldPromise />;
  return <SafePromise />;
}

function SafePromise() {
  return (
    <section
      className="safe-root"
      style={{ padding: "120px 56px", borderTop: `1px solid var(--line)`, background: "var(--soft)" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 56, alignItems: "start" }}>
        <span className="section-label">A brand promise</span>
        <p style={{ fontSize: 32, lineHeight: 1.35, margin: 0, maxWidth: 820, color: "var(--ink)" }}>
          {PROMISE}
        </p>
      </div>
    </section>
  );
}

function CharacterPromise() {
  return (
    <section className="char-root" style={{ padding: "120px 56px", textAlign: "center" }}>
      <span className="caption" style={{ color: "var(--acc)", display: "block", marginBottom: 28 }}>
        A brand promise
      </span>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 40,
          lineHeight: 1.3,
          margin: "0 auto",
          maxWidth: 880,
          fontWeight: 500,
        }}
      >
        {PROMISE}
      </p>
    </section>
  );
}

function BoldPromise() {
  return (
    <section
      className="bold-root"
      style={{ padding: "100px 32px", background: "var(--ink)", color: "var(--p)" }}
    >
      <div style={{ padding: "0 24px", display: "grid", gridTemplateColumns: "0.6fr 1.4fr", gap: 56, alignItems: "start" }}>
        <span className="label acc" style={{ alignSelf: "start" }}>A brand promise</span>
        <p style={{ fontSize: 34, lineHeight: 1.35, margin: 0, maxWidth: 900 }}>{PROMISE}</p>
      </div>
    </section>
  );
}
