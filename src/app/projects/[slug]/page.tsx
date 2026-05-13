import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Placeholder from "@/components/ui/Placeholder";
import CTABanner from "@/components/sections/CTABanner";
import { projects, getProject } from "@/data/projects";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} | ${siteConfig.name}`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      <section
        className="bold-root"
        style={{
          background: "var(--acc)",
          color: "var(--accInk)",
          padding: "48px 32px",
          borderBottom: `2px solid var(--ink)`,
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Link
            href="/projects"
            className="mono"
            style={{
              color: "var(--accInk)",
              opacity: 0.85,
              textDecoration: "none",
              fontSize: 11,
            }}
          >
            ← All projects
          </Link>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 24,
              marginBottom: 16,
            }}
          >
            <span
              className="label"
              style={{ background: "var(--accInk)", color: "var(--acc)" }}
            >
              {project.category}
            </span>
            <span
              className="label"
              style={{ background: "var(--accInk)", color: "var(--acc)" }}
            >
              {project.duration}
            </span>
            <span
              className="label"
              style={{ background: "var(--accInk)", color: "var(--acc)" }}
            >
              {project.location} · {project.year}
            </span>
          </div>
          <h1
            className="mega"
            style={{
              fontSize: "clamp(48px, 8vw, 104px)",
              margin: 0,
              color: "var(--accInk)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.6vw, 20px)",
              margin: "16px 0 0",
              maxWidth: 720,
              color: "var(--accInk)",
              opacity: 0.92,
            }}
          >
            {project.caption}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            style={{
              border: `2px solid var(--ink)`,
              marginBottom: 48,
            }}
          >
            <Placeholder
              label={`${project.title.toLowerCase()} · hero photo`}
              h={520}
              tone={project.gallery[0]?.tone ?? "#c4a988"}
              style={{ width: "100%" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">About this project</h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                {project.summary}
              </p>
            </div>
            <aside
              style={{
                border: `2px solid var(--ink)`,
                padding: 24,
                background: "var(--p)",
                height: "fit-content",
              }}
            >
              <h3
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Scope of work
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {project.scope.map((item) => (
                  <li
                    key={item}
                    style={{
                      padding: "10px 0",
                      borderTop: `1px solid var(--line)`,
                      fontSize: 14,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.map((img, i) => (
              <div key={i} style={{ border: `2px solid var(--ink)` }}>
                <Placeholder
                  label={img.label}
                  h={320}
                  tone={img.tone}
                  style={{ width: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-12 md:py-16" style={{ background: "var(--soft)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">More projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((p) => (
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
                  <Placeholder
                    label={p.title.toLowerCase()}
                    h={240}
                    tone={p.gallery[0]?.tone ?? "#c4a988"}
                    style={{ width: "100%" }}
                  />
                  <div style={{ padding: 20, borderTop: `2px solid var(--ink)` }}>
                    <h3 style={{ fontSize: 20, margin: 0 }}>{p.title}</h3>
                    <p style={{ fontSize: 14, margin: "8px 0 0", color: "var(--mu)" }}>
                      {p.meta}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
