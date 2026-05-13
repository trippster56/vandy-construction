import Link from "next/link";
import { HOME_SERVICES } from "@/data/home";

export default function ServicesPreview() {
  return (
    <section className="bold-root px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-[120px]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10 md:mb-14 px-2 sm:px-4 md:px-6">
        <div>
          <span className="label">What we do</span>
          <h2
            className="mega"
            style={{
              fontSize: "clamp(56px, 11vw, 116px)",
              margin: "20px 0 0",
              maxWidth: 900,
              lineHeight: 0.98,
            }}
          >
            What we do.
          </h2>
        </div>
        <p
          className="text-base md:text-[17px]"
          style={{ color: "var(--mu)", maxWidth: 320, marginBottom: 12, lineHeight: 1.4 }}
        >
          From ground-up custom homes to commercial buildouts — managed end to end.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 px-2 sm:px-4 md:px-6">
        {HOME_SERVICES.map((s, i) => {
          const featured = i === 0;
          return (
            <article
              key={s.n}
              className={`card ${featured ? "acc" : ""} p-6 sm:p-8 grid grid-cols-[auto_1fr] gap-5 sm:gap-7`}
              style={{
                background: featured ? "var(--ink)" : "var(--p)",
                color: featured ? "var(--p)" : "var(--ink)",
              }}
            >
              <div
                className="text-[56px] sm:text-[72px] md:text-[88px]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  lineHeight: 0.85,
                  color: featured ? "var(--acc)" : "var(--ink)",
                  letterSpacing: "-0.04em",
                }}
              >
                {s.n}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2 justify-between items-start mb-3 sm:mb-3.5">
                  <h3 className="text-xl sm:text-2xl md:text-[30px] m-0 leading-tight">{s.title}</h3>
                  <span
                    className={featured ? "label" : "label acc"}
                    style={featured ? { background: "var(--p)", color: "var(--ink)" } : {}}
                  >
                    {s.tag}
                  </span>
                </div>
                <p className="text-sm sm:text-[15px] m-0 opacity-85" style={{ maxWidth: 400 }}>{s.body}</p>
                <Link
                  href="/projects"
                  className="und mono inline-block mt-5 font-medium"
                  style={{ color: featured ? "var(--acc)" : "var(--ink)" }}
                >
                  Learn more →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
