import Link from "next/link";
import Placeholder from "@/components/ui/Placeholder";
import { projects } from "@/data/projects";

export default function RecentWork() {
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
          <Link href="/projects" className="btn-ghost" style={{ color: "var(--p)", borderColor: "var(--p)" }}>See all →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {projects.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="img-grow"
              style={{ display: "block", border: `2px solid var(--p)`, background: "var(--p)", color: "var(--ink)", textDecoration: "none" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", borderBottom: `2px solid var(--ink)` }}>
                <span className="mono" style={{ fontWeight: 600 }}>{p.n}</span>
                <span className="mono">{p.meta}</span>
              </div>
              <Placeholder label={p.title.toLowerCase()} h={300} tone={p.gallery[0]?.tone ?? "#c4a988"} style={{ width: "100%" }} />
              <div style={{ padding: 20, borderTop: `2px solid var(--ink)` }}>
                <h3 style={{ fontSize: 24, margin: 0, lineHeight: 1.05 }}>{p.title}</h3>
                <p style={{ fontSize: 14, margin: "10px 0 0", color: "var(--mu)" }}>{p.caption}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
