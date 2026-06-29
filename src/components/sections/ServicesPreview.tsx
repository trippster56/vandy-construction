import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { HOME_SERVICES } from "@/data/home";

export default function ServicesPreview() {
  const v = siteConfig.variant;
  if (v === "character") return <CharacterServices />;
  if (v === "bold") return <BoldServices />;
  return <SafeServices />;
}

export function SafeServices() {
  return (
    <section
      className="safe-root"
      style={{ padding: "120px 56px 100px", borderTop: `1px solid var(--line)` }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 56, marginBottom: 64 }}>
        <div>
          <span className="section-label">What we do</span>
        </div>
        <div>
          <h2 style={{ fontSize: 56, lineHeight: 1.05, margin: 0, maxWidth: 780 }}>
            Section heading goes here.
          </h2>
          <p style={{ fontSize: 18, color: "var(--mu)", marginTop: 24, maxWidth: 580 }}>
            A short paragraph introducing what your business does.
          </p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: `1px solid var(--line)` }}>
        {HOME_SERVICES.map((s, i) => (
          <article
            key={s.n}
            style={{
              padding: "32px 28px 36px",
              borderRight: i < 3 ? `1px solid var(--line)` : "none",
              borderBottom: `1px solid var(--line)`,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              minHeight: 280,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="mono" style={{ color: "var(--mu)" }}>{s.n}</span>
              <span className="mono" style={{ color: "var(--acc)" }}>{s.tag}</span>
            </div>
            <h3 style={{ fontSize: 26, margin: "24px 0 8px", lineHeight: 1.15 }}>{s.title}</h3>
            <p style={{ fontSize: 14.5, color: "var(--mu)", margin: 0 }}>{s.body}</p>
            <Link href="/services" className="line-link mono" style={{ marginTop: "auto", alignSelf: "flex-start", color: "var(--ink)" }}>
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CharacterServices() {
  return (
    <section className="char-root" style={{ padding: "120px 56px 100px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, marginBottom: 64, alignItems: "end" }}>
        <div>
          <span className="caption">What we do</span>
          <h2 style={{ fontSize: 84, lineHeight: 0.98, margin: "16px 0 0", maxWidth: 700 }}>
            Section heading goes here.
          </h2>
        </div>
        <p style={{ fontSize: 18, color: "var(--mu)", maxWidth: 460, marginBottom: 12 }}>
          A short paragraph introducing what your business does.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {HOME_SERVICES.map((s, i) => (
          <article
            key={s.n}
            className="card-tilt"
            style={{
              padding: "32px 32px 28px",
              background: i % 2 === 0 ? "var(--soft)" : "transparent",
              border: `1px solid var(--line)`,
              borderRadius: 4,
              display: "grid",
              gridTemplateColumns: "110px 1fr auto",
              gap: 28,
              alignItems: "start",
            }}
          >
            <span className="num-mark">{s.n}</span>
            <div>
              <h3 style={{ fontSize: 26, margin: "4px 0 8px" }}>{s.title}</h3>
              <p style={{ fontSize: 14.5, color: "var(--mu)", margin: 0, maxWidth: 360 }}>{s.body}</p>
            </div>
            <span className="tag">{s.tag}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BoldServices() {
  return (
    <section className="bold-root" style={{ padding: "120px 32px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56, padding: "0 24px" }}>
        <div>
          <span className="label">What we do</span>
          <h2 className="mega" style={{ fontSize: 116, margin: "20px 0 0", maxWidth: 900 }}>
            Section heading goes here.
          </h2>
        </div>
        <p style={{ fontSize: 17, color: "var(--mu)", maxWidth: 320, marginBottom: 12, lineHeight: 1.4 }}>
          A short paragraph introducing what your business does.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, padding: "0 24px" }}>
        {HOME_SERVICES.map((s, i) => {
          const featured = i === 0;
          return (
            <article
              key={s.n}
              className={`card ${featured ? "acc" : ""}`}
              style={{
                padding: 32,
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 28,
                background: featured ? "var(--ink)" : "var(--p)",
                color: featured ? "var(--p)" : "var(--ink)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 88,
                  fontWeight: 800,
                  lineHeight: 0.85,
                  color: featured ? "var(--acc)" : "var(--ink)",
                  letterSpacing: "-0.04em",
                }}
              >
                {s.n}
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <h3 style={{ fontSize: 30, margin: 0, lineHeight: 1 }}>{s.title}</h3>
                  <span
                    className={featured ? "label" : "label acc"}
                    style={featured ? { background: "var(--p)", color: "var(--ink)" } : {}}
                  >
                    {s.tag}
                  </span>
                </div>
                <p style={{ fontSize: 15, margin: 0, opacity: 0.85, maxWidth: 400 }}>{s.body}</p>
                <Link
                  href="/services"
                  className="und mono"
                  style={{ display: "inline-block", marginTop: 20, fontWeight: 500, color: featured ? "var(--acc)" : "var(--ink)" }}
                >
                  Learn more →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
