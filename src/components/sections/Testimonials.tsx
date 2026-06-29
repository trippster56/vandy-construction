import { siteConfig } from "@/lib/site-config";
import { HOME_TESTIMONIALS } from "@/data/home";

export default function Testimonials() {
  const v = siteConfig.variant;
  if (v === "character") return <CharacterTest />;
  if (v === "bold") return <BoldTest />;
  return <SafeTest />;
}

function SafeTest() {
  return (
    <section className="safe-root" style={{ padding: "120px 56px" }}>
      <span className="section-label" style={{ display: "block", marginBottom: 48 }}>What folks say</span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 56,
          borderTop: `1px solid var(--line)`,
          paddingTop: 48,
        }}
      >
        {HOME_TESTIMONIALS.map((q, i) => (
          <figure key={i} style={{ margin: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 56,
                color: "var(--acc)",
                lineHeight: 0.6,
                display: "block",
                height: 30,
              }}
            >
              “
            </span>
            <blockquote style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.3, margin: "16px 0 24px" }}>
              {q.quote}
            </blockquote>
            <figcaption style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 14 }}>{q.who}</span>
              <span className="mono" style={{ color: "var(--mu)" }}>{q.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CharacterTest() {
  return (
    <section className="char-root" style={{ padding: "120px 56px" }}>
      <span className="caption">What folks say</span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginTop: 48 }}>
        {HOME_TESTIMONIALS.map((q, i) => (
          <figure
            key={i}
            className="card-tilt"
            style={{
              margin: 0,
              padding: 32,
              background: "var(--soft)",
              border: `1px solid var(--line)`,
              borderRadius: 4,
              position: "relative",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                position: "absolute",
                top: 14,
                right: 22,
                fontSize: 60,
                color: "var(--acc)",
                opacity: 0.5,
                lineHeight: 0.6,
              }}
            >
              “
            </span>
            <blockquote style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.3, margin: 0, fontWeight: 500 }}>
              {q.quote}
            </blockquote>
            <figcaption
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: `1px solid var(--line)`,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontWeight: 600 }}>{q.who}</span>
              <span className="caption">{q.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function BoldTest() {
  return (
    <section className="bold-root" style={{ padding: "100px 32px", background: "var(--soft)", borderTop: `2px solid var(--ink)` }}>
      <div style={{ padding: "0 24px" }}>
        <span className="label">What folks say</span>
        <h2 className="mega" style={{ fontSize: 88, margin: "20px 0 56px" }}>
          What folks<br />
          <span style={{ color: "var(--acc)" }}>say.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {HOME_TESTIMONIALS.map((q, i) => {
            const dark = i === 1;
            return (
              <figure
                key={i}
                className="card"
                style={{
                  margin: 0,
                  padding: 32,
                  background: dark ? "var(--ink)" : "var(--p)",
                  color: dark ? "var(--p)" : "var(--ink)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 80,
                    fontWeight: 800,
                    color: "var(--acc)",
                    lineHeight: 0.6,
                    marginBottom: 12,
                    height: 40,
                  }}
                >
                  “
                </div>
                <blockquote
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    lineHeight: 1.22,
                    margin: "0 0 24px",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {q.quote}
                </blockquote>
                <figcaption
                  style={{
                    paddingTop: 20,
                    borderTop: `2px solid ${dark ? "var(--p)" : "var(--ink)"}`,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{q.who}</span>
                  <span className="mono">{q.role}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
