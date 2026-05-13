"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navigation() {
  const pathname = usePathname();
  const nav = siteConfig.navLinks;
  return (
    <div className="bold-root">
      <header
        style={{
          borderBottom: `2px solid var(--ink)`,
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--p)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36, height: 36, background: "var(--ink)", color: "var(--p)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800,
            }}
          >
            {siteConfig.short.charAt(0)}
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {siteConfig.name}
          </span>
        </Link>
        <nav style={{ display: "flex", gap: 4 }}>
          {nav.map((n) => {
            const active = isActive(pathname, n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className="nav-pill mono"
                data-active={active ? "true" : undefined}
                style={{ fontSize: 12, fontWeight: 500 }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <span aria-hidden style={{ width: 1 }} />
      </header>
    </div>
  );
}
