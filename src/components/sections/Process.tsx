import { siteConfig } from "@/lib/site-config";
import { HOME_PROCESS } from "@/data/home";

export default function Process() {
  const v = siteConfig.variant;
  if (v === "character") return <CharacterProcess />;
  if (v === "bold") return <BoldProcess />;
  return <SafeProcess />;
}

function SafeProcess() {
  return (
    <section
      className="safe-root"
      style={{ padding: "100px 56px 120px", borderTop: `1px solid var(--line)`, background: "var(--p)" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 56, marginBottom: 56 }}>
        <span className="section-label">How it works</span>
        <h2 style={{ fontSize: 56, lineHeight: 1.05, margin: 0, maxWidth: 700 }}>
          From Vision to Completion
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: `1px solid var(--line)` }}>
        {HOME_PROCESS.map((s, i) => (
          <div
            key={s.n}
            style={{ padding: "32px 28px 36px", borderRight: i < 3 ? `1px solid var(--line)` : "none" }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: 64, color: "var(--acc)", lineHeight: 1, marginBottom: 12 }}>
              {s.n}
            </div>
            <h3 style={{ fontSize: 22, margin: "0 0 12px" }}>{s.title}</h3>
            <p style={{ fontSize: 14, color: "var(--mu)", margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CharacterProcess() {
  return (
    <section
      className="char-root"
      style={{ padding: "120px 56px 100px", background: "var(--ink)", color: "var(--p)" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, marginBottom: 56 }}>
        <div>
          <span className="caption" style={{ color: "rgba(255,255,255,0.5)" }}>How it works</span>
          <h2 style={{ fontSize: 72, lineHeight: 0.98, margin: "16px 0 0", color: "var(--p)" }}>
            From Vision to Completion
          </h2>
        </div>
        <p style={{ fontSize: 17, opacity: 0.7, maxWidth: 420, marginBottom: 6 }}>
          A short paragraph describing how your process works.
        </p>
      </div>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 0 }}>
        {HOME_PROCESS.map((s) => (
          <li
            key={s.n}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 320px 1fr",
              gap: 32,
              alignItems: "baseline",
              padding: "32px 0",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span className="num-mark" style={{ color: "var(--acc)" }}>{s.n}</span>
            <h3 style={{ fontSize: 30, margin: 0, color: "var(--p)", fontWeight: 500 }}>{s.title}</h3>
            <p style={{ fontSize: 15, opacity: 0.7, margin: 0, maxWidth: 480 }}>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BoldProcess() {
  return (
    <section
      className="bold-root"
      style={{ padding: "80px 32px", borderTop: `2px solid var(--ink)`, borderBottom: `2px solid var(--ink)` }}
    >
      <div style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48 }}>
          <div>
            <span className="label">How it works</span>
            <h2 className="mega" style={{ fontSize: 100, margin: "20px 0 0" }}>From Vision to Completion</h2>
          </div>
          <span className="mono" style={{ color: "var(--mu)", paddingBottom: 8 }}>Tag line goes here</span>
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
