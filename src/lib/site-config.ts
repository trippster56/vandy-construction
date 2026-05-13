/**
 * ========================================
 * SITE CONFIGURATION — Vandy Construction
 * ========================================
 */

export const siteConfig = {
  // ── Branding ──────────────────────────
  name: "Vandy Construction",
  short: "Vandy",
  established: 2010,
  city: "City, ST",
  tagline: "Quality & Integrity",
  description:
    "Vandy Construction delivers residential and commercial construction services built on integrity and craftsmanship.",
  url: "https://vandy-construction-v2.vercel.app",
  logo: "/images/logo.png",

  // ── Colors (kept for legacy data layer compatibility) ──
  colors: {
    primary: "#2E3075",
    primaryDark: "#1F2154",
    secondary: "#8B8FA0",
    accent: "#C0C4CE",
    background: "#ffffff",
    surface: "#f4f5f7",
    surfaceHover: "#ebedf1",
    text: "#0f1419",
    textMuted: "#677175",
    border: "#d1d5db",
  },

  fonts: {
    heading: "var(--font-display)",
    body: "var(--font-body)",
  },

  // ── Navigation Links ──────────────────
  navLinks: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],

  // ── Contact Info ──────────────────────
  contact: {
    email: "hello@vandyconstruction.com",
    phone: "(555) 123-4567",
    address: "123 Main Street · City, ST 12345",
    hours: "Mon–Fri · 7am–5pm",
  },

  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },

  email: {
    from: "onboarding@resend.dev",
    to: "hello@vandyconstruction.com",
  },

  seo: {
    title: "Vandy Construction | Quality & Integrity",
    description:
      "Residential and commercial construction services built on integrity and craftsmanship.",
    keywords: ["construction", "residential", "commercial", "general contractor"],
  },
};

export type SiteConfig = typeof siteConfig;
