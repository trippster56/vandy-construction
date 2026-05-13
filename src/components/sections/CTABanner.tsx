import Link from "next/link";

export default function CTABanner() {
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
          Let&apos;s build.
        </h2>
        <div>
          <p style={{ fontSize: 19, lineHeight: 1.4, margin: "0 0 32px", opacity: 0.92 }}>
            Got a project in mind? Send us the plans, the sketch, or the rough idea — we&apos;ll come back with a written estimate.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{ background: "var(--ink)", borderColor: "var(--ink)", color: "var(--p)" }}
            >
              Contact us →
            </Link>
            <Link href="/projects" className="btn-ghost" style={{ color: "var(--accInk)", borderColor: "var(--accInk)" }}>
              Our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
