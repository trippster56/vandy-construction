import { HOME_TESTIMONIALS } from "@/data/home";

export default function Testimonials() {
  return (
    <section className="bold-root" style={{ padding: "100px 32px", background: "var(--soft)", borderTop: `2px solid var(--ink)` }}>
      <div style={{ padding: "0 24px" }}>
        <span className="label">What folks say</span>
        <h2 className="mega" style={{ fontSize: 88, margin: "20px 0 56px" }}>
          From our<br />
          <span style={{ color: "var(--acc)" }}>clients.</span>
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
