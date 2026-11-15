import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Placeholder from "@/components/ui/Placeholder";
import Photo from "@/components/ui/Photo";
import CTABanner from "@/components/sections/CTABanner";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Project Gallery",
  description:
    "Before-and-after photos of recent Vandy Construction projects around Florence, SC: home and kitchen remodels, additions, porches, and commercial work.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Gallery"
        subtitle="A look at recent residential and commercial builds."
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">All projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="img-grow"
                style={{
                  display: "block",
                  border: `2px solid var(--ink)`,
                  background: "var(--p)",
                  color: "var(--ink)",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    borderBottom: `2px solid var(--ink)`,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{p.n}</span>
                  <span>{p.meta}</span>
                </div>
                {p.image ? (
                  <Photo
                    src={p.image}
                    alt={p.alt ?? p.title}
                    h={300}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority={i === 0}
                  />
                ) : (
                  <Placeholder
                    label={p.title.toLowerCase()}
                    h={300}
                    tone={p.gallery[0]?.tone ?? "#c4a988"}
                    style={{ width: "100%" }}
                  />
                )}
                <div
                  style={{
                    padding: 20,
                    borderTop: `2px solid var(--ink)`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <h3 style={{ fontSize: 24, margin: 0, lineHeight: 1.05 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, margin: 0, color: "var(--mu)" }}>{p.caption}</p>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--acc)",
                      marginTop: 4,
                    }}
                  >
                    View project →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
