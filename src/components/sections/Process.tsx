import { HOME_PROCESS } from "@/data/home";

export default function Process() {
  return (
    <section
      className="bold-root px-4 sm:px-6 md:px-8 py-14 sm:py-20"
      style={{ borderTop: `2px solid var(--ink)`, borderBottom: `2px solid var(--ink)` }}
    >
      <div className="px-2 sm:px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10 md:mb-12">
          <div>
            <span className="label">How it works</span>
            <h2
              className="mega"
              style={{
                fontSize: "clamp(48px, 10vw, 100px)",
                margin: "20px 0 0",
                lineHeight: 0.98,
              }}
            >
              From plan to keys.
            </h2>
          </div>
          <span className="mono" style={{ color: "var(--mu)", paddingBottom: 8 }}>
            Licensed &amp; insured
          </span>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ border: `2px solid var(--ink)` }}
        >
          {HOME_PROCESS.map((s, i) => {
            const acc = i === 1;
            return (
              <div
                key={s.n}
                className="p-6 sm:p-7 md:p-8 process-cell"
                data-i={i}
                style={{
                  background: acc ? "var(--acc)" : "transparent",
                  color: acc ? "var(--accInk)" : "var(--ink)",
                }}
              >
                <div
                  className="text-[64px] sm:text-[80px] md:text-[92px]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    lineHeight: 0.85,
                    letterSpacing: "-0.04em",
                    marginBottom: 16,
                  }}
                >
                  {s.n}
                </div>
                <h3 className="text-lg sm:text-xl md:text-[22px] m-0 mb-3">{s.title}</h3>
                <p className="text-sm m-0 opacity-85">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
