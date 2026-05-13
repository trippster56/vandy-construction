import { HOME_TESTIMONIALS } from "@/data/home";

export default function Testimonials() {
  return (
    <section
      className="bold-root px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-[100px]"
      style={{ background: "var(--soft)", borderTop: `2px solid var(--ink)` }}
    >
      <div className="px-2 sm:px-4 md:px-6">
        <span className="label">What folks say</span>
        <h2
          className="mega"
          style={{
            fontSize: "clamp(48px, 9vw, 88px)",
            margin: "20px 0 40px",
            lineHeight: 0.98,
          }}
        >
          From our<br />
          <span style={{ color: "var(--acc)" }}>clients.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {HOME_TESTIMONIALS.map((q, i) => {
            const dark = i === 1;
            return (
              <figure
                key={i}
                className="card m-0 p-6 sm:p-8"
                style={{
                  background: dark ? "var(--ink)" : "var(--p)",
                  color: dark ? "var(--p)" : "var(--ink)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 80,
                    fontWeight: 800,
                    color: "var(--acc)",
                    lineHeight: 0.6,
                    marginBottom: 12,
                    height: 40,
                  }}
                >
                  &ldquo;
                </div>
                <blockquote
                  className="text-lg sm:text-xl md:text-[22px]"
                  style={{
                    fontFamily: "var(--font-display)",
                    lineHeight: 1.22,
                    margin: "0 0 24px",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {q.quote}
                </blockquote>
                <figcaption
                  className="flex flex-wrap gap-2 justify-between pt-5"
                  style={{ borderTop: `2px solid ${dark ? "var(--p)" : "var(--ink)"}` }}
                >
                  <span className="font-semibold">{q.who}</span>
                  <span className="mono">{q.role}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
