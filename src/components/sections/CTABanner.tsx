import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function CTABanner() {
  const v = siteConfig.variant;
  if (v === "character") return <CharacterCTA />;
  if (v === "bold") return <BoldCTA />;
  return <SafeCTA />;
}

export function SafeCTA() {
  return (
    <section
      className="safe-root"
      style={{ padding: "140px 56px", background: "var(--ink)", color: "var(--p)", textAlign: "center" }}
    >
      <span className="mono" style={{ color: "var(--p)", opacity: 0.5, letterSpacing: "0.14em" }}>
        Get in touch
      </span>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 88,
          lineHeight: 1.02,
          margin: "20px auto 32px",
          maxWidth: 900,
          fontWeight: 400,
        }}
      >
        Let&apos;s talk.
      </h2>
      <p style={{ fontSize: 18, opacity: 0.7, maxWidth: 540, margin: "0 auto 36px" }}>
        A short closing line goes here. Encourage a next step in one or two sentences.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <Link href="/contact" className="btn-primary" style={{ background: "var(--acc)", color: "var(--accInk)" }}>
          Contact us →
        </Link>
        <Link href="/services" className="btn-ghost" style={{ color: "var(--p)", borderColor: "rgba(255,255,255,0.2)" }}>
          Our services
        </Link>
      </div>
    </section>
  );
}

export function CharacterCTA() {
  return (
    <section
      className="char-root"
      style={{ padding: "140px 56px", background: "var(--ink)", color: "var(--p)", textAlign: "center" }}
    >
      <span className="caption" style={{ color: "rgba(255,255,255,0.55)" }}>
        Get in touch
      </span>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 96,
          lineHeight: 1,
          margin: "20px auto 32px",
          maxWidth: 900,
          fontWeight: 500,
        }}
      >
        Let&apos;s talk.
      </h2>
      <p style={{ fontSize: 18, opacity: 0.75, maxWidth: 540, margin: "0 auto 36px" }}>
        A short closing line goes here. Encourage a next step in one or two sentences.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <Link href="/contact" className="btn-primary" style={{ background: "var(--acc)", color: "var(--accInk)" }}>
          Contact us →
        </Link>
        <Link href="/services" className="btn-ghost" style={{ color: "var(--p)", borderColor: "rgba(255,255,255,0.3)" }}>
          Our services
        </Link>
      </div>
    </section>
  );
}

export function BoldCTA() {
  return (
    <section
      className="bold-root"
      style={{
        padding: "120px 32px",
        background: "var(--acc)",
        color: "var(--accInk)",
        borderTop: `2px solid var(--ink)`,
        borderBottom: `2px solid var(--ink)`,
      }}
    >
      <div style={{ padding: "0 24px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, alignItems: "end" }}>
        <h2 className="mega" style={{ fontSize: 168, margin: 0, color: "var(--accInk)" }}>
          Let&apos;s talk.
        </h2>
        <div>
          <p style={{ fontSize: 19, lineHeight: 1.4, margin: "0 0 32px", opacity: 0.92 }}>
            A short closing line goes here. Encourage a next step in one or two sentences.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{ background: "var(--ink)", borderColor: "var(--ink)", color: "var(--p)" }}
            >
              Contact us →
            </Link>
            <Link href="/services" className="btn-ghost" style={{ color: "var(--accInk)", borderColor: "var(--accInk)" }}>
              Our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
