import Link from "next/link";
import { HOME_SERVICES } from "@/data/home";

export default function ServicesPreview() {
  return (
    <section className="bold-root" style={{ padding: "120px 32px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56, padding: "0 24px" }}>
        <div>
          <span className="label">What we do</span>
          <h2 className="mega" style={{ fontSize: 116, margin: "20px 0 0", maxWidth: 900 }}>
            What we do.
          </h2>
        </div>
        <p style={{ fontSize: 17, color: "var(--mu)", maxWidth: 320, marginBottom: 12, lineHeight: 1.4 }}>
          From ground-up custom homes to commercial buildouts — managed end to end.
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
                  href="/projects"
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
