import PageHeader from "@/components/ui/PageHeader";
import Placeholder from "@/components/ui/Placeholder";
import CTABanner from "@/components/sections/CTABanner";
import { HOME_WORK } from "@/data/home";

export default function ProjectsPage() {
  const tones = ["#c4a988", "#cdb494", "#bda07f", "#a98c66", "#8c7558", "#6f5a42"];

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Projects"
        subtitle="A look at recent residential and commercial builds. Projects shown here are managed from the admin panel."
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOME_WORK.map((w, i) => (
              <article
                key={w.n}
                className="img-grow"
                style={{
                  border: `2px solid var(--ink)`,
                  background: "var(--p)",
                  color: "var(--ink)",
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
                  <span style={{ fontWeight: 600 }}>{w.n}</span>
                  <span>{w.meta}</span>
                </div>
                <Placeholder
                  label={w.title.toLowerCase()}
                  h={300}
                  tone={tones[i % tones.length]}
                  style={{ width: "100%" }}
                />
                <div style={{ padding: 20, borderTop: `2px solid var(--ink)` }}>
                  <h3 style={{ fontSize: 24, margin: 0, lineHeight: 1.05 }}>{w.title}</h3>
                  <p style={{ fontSize: 14, margin: "10px 0 0", color: "var(--mu)" }}>
                    {w.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
