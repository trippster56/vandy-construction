import Link from "next/link";
import Placeholder from "@/components/ui/Placeholder";
import { HOME_WORK } from "@/data/home";

export default function RecentWork() {
  const tones = ["#c4a988", "#cdb494", "#bda07f"];
  return (
    <section className="bold-root" style={{ padding: "100px 32px", background: "var(--ink)", color: "var(--p)" }}>
      <div style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56 }}>
          <div>
            <span className="label acc">Recent work</span>
            <h2 className="mega" style={{ fontSize: 132, margin: "20px 0 0", color: "var(--p)" }}>
              Built recently,<br />
              <span style={{ color: "var(--acc)" }}>on time.</span>
            </h2>
          </div>
          <Link href="/" className="btn-ghost" style={{ color: "var(--p)", borderColor: "var(--p)" }}>See all →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {HOME_WORK.map((w, i) => (
            <article key={w.n} className="img-grow" style={{ border: `2px solid var(--p)`, background: "var(--p)", color: "var(--ink)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", borderBottom: `2px solid var(--ink)` }}>
                <span className="mono" style={{ fontWeight: 600 }}>{w.n}</span>
                <span className="mono">{w.meta}</span>
              </div>
              <Placeholder label={w.title.toLowerCase()} h={300} tone={tones[i]} style={{ width: "100%" }} />
              <div style={{ padding: 20, borderTop: `2px solid var(--ink)` }}>
                <h3 style={{ fontSize: 24, margin: 0, lineHeight: 1.05 }}>{w.title}</h3>
                <p style={{ fontSize: 14, margin: "10px 0 0", color: "var(--mu)" }}>{w.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
