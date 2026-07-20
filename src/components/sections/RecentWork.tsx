import { CSSProperties } from "react";
import Link from "next/link";
import Placeholder from "@/components/ui/Placeholder";
import Photo from "@/components/ui/Photo";
import { siteConfig } from "@/lib/site-config";
import { HOME_WORK } from "@/data/home";

// Real photo when the project has one; styled placeholder slab otherwise.
function WorkMedia({
  item,
  h,
  tone,
  style,
}: {
  item: (typeof HOME_WORK)[number];
  h: number;
  tone: string;
  style?: CSSProperties;
}) {
  if (item.image) {
    return <Photo src={item.image} alt={item.alt} h={h} style={style} />;
  }
  return <Placeholder label={item.title.toLowerCase()} h={h} tone={tone} style={{ width: "100%", ...style }} />;
}

export default function RecentWork() {
  const v = siteConfig.variant;
  if (v === "character") return <CharacterWork />;
  if (v === "bold") return <BoldWork />;
  return <SafeWork />;
}

function SafeWork() {
  const tones = ["#c9bfa8", "#cdc3ac", "#d1c7b1"];
  return (
    <section className="safe-root" style={{ padding: "100px 56px 120px", background: "var(--soft)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48 }}>
        <div>
          <span className="section-label">Recent work</span>
          <h2 style={{ fontSize: 56, lineHeight: 1.05, margin: "16px 0 0" }}>Featured Projects</h2>
        </div>
        <Link href="/projects" className="btn-ghost">See More →</Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 }}>
        <article className="img-hover">
          <WorkMedia item={HOME_WORK[0]} h={520} tone={tones[0]} />
          <div style={{ padding: "20px 4px 0", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <h3 style={{ fontSize: 24, margin: 0 }}>{HOME_WORK[0].title}</h3>
              <p style={{ fontSize: 14, color: "var(--mu)", margin: "6px 0 0" }}>{HOME_WORK[0].caption}</p>
            </div>
            <span className="mono" style={{ color: "var(--mu)" }}>{HOME_WORK[0].meta}</span>
          </div>
        </article>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {[HOME_WORK[1], HOME_WORK[2]].map((w, i) => (
            <article key={w.n} className="img-hover" style={{ display: "grid", gridTemplateRows: "240px auto", gap: 16 }}>
              <WorkMedia item={w} h={240} tone={tones[i + 1]} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <h3 style={{ fontSize: 20, margin: 0 }}>{w.title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--mu)", margin: "4px 0 0" }}>{w.caption}</p>
                </div>
                <span className="mono" style={{ color: "var(--mu)", fontSize: 10 }}>{w.meta}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CharacterWork() {
  const tones = ["#cdc1a3", "#d5c8aa", "#d0c4a8"];
  return (
    <section className="char-root" style={{ padding: "100px 56px 120px", background: "var(--soft)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56 }}>
        <div>
          <span className="caption">Recent work</span>
          <h2 style={{ fontSize: 64, lineHeight: 1, margin: "16px 0 0" }}>Featured Projects</h2>
        </div>
        <Link href="/projects" className="btn-ghost">See More →</Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
        {HOME_WORK.map((w, i) => (
          <article
            key={w.n}
            className="card-tilt img-zoom"
            style={{ background: "var(--p)", padding: 16, border: `1px solid var(--line)` }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span className="caption" style={{ color: "var(--acc)" }}>{w.n}</span>
              <span className="caption">{w.meta}</span>
            </div>
            <WorkMedia item={w} h={300} tone={tones[i]} style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: 22, margin: "0 0 8px" }}>{w.title}</h3>
            <p style={{ fontSize: 14, color: "var(--mu)", margin: 0 }}>{w.caption}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BoldWork() {
  const tones = ["#c4a988", "#cdb494", "#bda07f"];
  return (
    <section className="bold-root" style={{ padding: "100px 32px", background: "var(--ink)", color: "var(--p)" }}>
      <div style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56 }}>
          <div>
            <span className="label acc">Recent work</span>
            <h2 className="mega" style={{ fontSize: 132, margin: "20px 0 0", color: "var(--p)" }}>
              Featured<br />
              <span style={{ color: "var(--acc)" }}>Projects</span>
            </h2>
          </div>
          <Link href="/projects" className="btn-ghost" style={{ color: "var(--p)", borderColor: "var(--p)" }}>See More →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {HOME_WORK.map((w, i) => (
            <article key={w.n} className="img-grow" style={{ border: `2px solid var(--p)`, background: "var(--p)", color: "var(--ink)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", borderBottom: `2px solid var(--ink)` }}>
                <span className="mono" style={{ fontWeight: 600 }}>{w.n}</span>
                <span className="mono">{w.meta}</span>
              </div>
              <WorkMedia item={w} h={300} tone={tones[i]} />
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
