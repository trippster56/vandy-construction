import Link from "next/link";
import Placeholder from "@/components/ui/Placeholder";
import { projects } from "@/data/projects";

export default function RecentWork() {
  return (
    <section
      className="bold-root px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-[100px]"
      style={{ background: "var(--ink)", color: "var(--p)" }}
    >
      <div className="px-2 sm:px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-5 mb-10 md:mb-14">
          <div>
            <span className="label acc">Recent work</span>
            <h2
              className="mega"
              style={{
                fontSize: "clamp(56px, 12vw, 132px)",
                margin: "20px 0 0",
                color: "var(--p)",
                lineHeight: 0.98,
              }}
            >
              Built recently,<br />
              <span style={{ color: "var(--acc)" }}>on time.</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="btn-ghost self-start md:self-auto"
            style={{ color: "var(--p)", borderColor: "var(--p)" }}
          >
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="img-grow block"
              style={{
                border: `2px solid var(--p)`,
                background: "var(--p)",
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              <div
                className="flex justify-between px-4 py-3.5"
                style={{ borderBottom: `2px solid var(--ink)` }}
              >
                <span className="mono font-semibold">{p.n}</span>
                <span className="mono">{p.meta}</span>
              </div>
              <Placeholder
                label={p.title.toLowerCase()}
                h={300}
                tone={p.gallery[0]?.tone ?? "#c4a988"}
                style={{ width: "100%" }}
              />
              <div className="p-5" style={{ borderTop: `2px solid var(--ink)` }}>
                <h3 className="text-xl sm:text-2xl m-0 leading-tight">{p.title}</h3>
                <p className="text-sm m-0 mt-2.5" style={{ color: "var(--mu)" }}>
                  {p.caption}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
