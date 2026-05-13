import { HOME_PROCESS } from "@/data/home";

export default function Process() {
  return (
    <section
      className="bold-root"
      style={{ padding: "80px 32px", borderTop: `2px solid var(--ink)`, borderBottom: `2px solid var(--ink)` }}
    >
      <div style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48 }}>
          <div>
            <span className="label">How it works</span>
            <h2 className="mega" style={{ fontSize: 100, margin: "20px 0 0" }}>From plan to keys.</h2>
          </div>
          <span className="mono" style={{ color: "var(--mu)", paddingBottom: 8 }}>Licensed &amp; insured</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: `2px solid var(--ink)` }}>
          {HOME_PROCESS.map((s, i) => {
            const acc = i === 1;
            return (
              <div
                key={s.n}
                style={{
                  padding: "32px 28px",
                  borderRight: i < 3 ? `2px solid var(--ink)` : "none",
                  background: acc ? "var(--acc)" : "transparent",
                  color: acc ? "var(--accInk)" : "var(--ink)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 92,
                    fontWeight: 800,
                    lineHeight: 0.85,
                    letterSpacing: "-0.04em",
                    marginBottom: 16,
                  }}
                >
                  {s.n}
                </div>
                <h3 style={{ fontSize: 22, margin: "0 0 12px" }}>{s.title}</h3>
                <p style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
