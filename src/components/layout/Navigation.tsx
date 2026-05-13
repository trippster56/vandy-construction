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
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          background: "var(--p)",
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 12, justifySelf: "start" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/android-chrome-512x512.png"
            alt={`${siteConfig.name} logo`}
            width={44}
            height={44}
            style={{ display: "block", width: 44, height: 44, objectFit: "contain" }}
          />

          <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {siteConfig.name}
          </span>
        </Link>
        <nav style={{ display: "flex", gap: 4, justifySelf: "center" }}>
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
        <span aria-hidden style={{ justifySelf: "end" }} />
      </header>
    </div>
  );
}
