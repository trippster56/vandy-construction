/**
 * ========================================
 * SITE CONFIGURATION — Vandy Construction Company, LLC
 * ========================================
 * Source of truth: client questionnaire (Josh).
 * Update branded values here as Josh provides real details.
 */

export type Variant = "safe" | "character" | "bold";
export type HeroLayout = "split" | "type-only" | "fullbleed";
export type PageGround = "white" | "gray";

export const siteConfig = {
  // ── Brand variant + hero ──────────────
  // "safe" → editorial, restrained, photo-forward (matches his refs:
  //   studio-mcgee.com, pillarhomes.com, gilbaneco.com)
  variant: "safe" as Variant,
  hero: "split" as HeroLayout,

  // Page ground toggle: "white" (clean editorial) or "gray" (#9A9CA1 — Josh's
  // requested background, 3.2). Flip this to compare the two versions.
  pageGround: "gray" as PageGround,

  // ── Branding ──────────────────────────
  name: "Vandy Construction Company, LLC",
  short: "Vandy Construction",
  established: "20XX", // TODO: Josh — year established
  city: "Florence, SC",
  tagline: "Welcoming. Experienced. Trustworthy.",
  description:
    "Licensed and insured general contractor serving Florence, SC and surrounding counties.",
  url: "https://vandyconstruction.com",
  logo: "/images/logo-mark.svg", // vectorized from Josh's logo (silver gradient); also logo-mark-mono.svg for single-color use

  // ── Colors (per questionnaire 3.2) ──
  colors: {
    primary: "#181F58", // Navy
    primaryDark: "#10153D",
    secondary: "#63666A", // Dark grey
    accent: "#181F58",
    background: "#ffffff",
    surface: "#f3f4f6", // light gray surface tone (#9A9CA1 was too dark for page bg)
    surfaceHover: "#e7e8ea",
    text: "#181F58",
    textMuted: "#63666A",
    border: "#dcdee2",
  },

  // ── Typography (Raleway per 3.3; driven by variant via CSS vars) ──
  fonts: {
    heading: "var(--font-display)",
    body: "var(--font-body)",
  },

  // ── Navigation Links (per 4.1: Home, About, Services, Team, Testimonials, Contact) ──
  navLinks: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],

  // ── Contact Info ──────────────────────  TODO: Josh — real NAP
  contact: {
    email: "hello@vandyconstruction.com",
    phone: "(843) 939-9393",
    address: "Florence, SC",
    hours: "Mon–Fri · 7am–5pm",
  },

  // ── Social Links (per 7: Facebook only) ──
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61573879797884",
  },

  // ── Google Business Profile (map + "Leave a review") ──  TODO: Josh
  google: {
    reviewUrl: "", // Google review link for the "Leave a review" CTA
    mapsEmbedQuery: "Vandy Construction Company, Florence, SC", // used for the map embed
  },

  // ── JobTread lead form (this IS the contact form) ──
  // Submissions auto-create a lead/customer in JobTread.
  //   formEmbedUrl → renders JobTread's form inline via iframe (preferred)
  //   formLinkUrl  → if no embed, shows a "Request an Estimate" button to it
  jobtread: {
    formEmbedUrl: "", // TODO: Josh's coworker — JobTread embed/iframe URL
    formLinkUrl: "", // TODO: or the hosted JobTread form link
  },

  // ── Email (Resend) ───────────────────
  email: {
    from: "onboarding@resend.dev",
    to: "hello@vandyconstruction.com",
  },

  // ── SEO (per 8.2 target terms) ──
  seo: {
    title: "Vandy Construction Company | General Contractor in Florence, SC",
    description:
      "Licensed and insured general contractor serving Florence, SC and surrounding counties. Welcoming, experienced, trustworthy.",
    keywords: [
      "contractor in florence sc",
      "construction florence sc",
      "general contractor florence sc",
      "residential construction",
      "commercial construction",
    ],
  },
};

export type SiteConfig = typeof siteConfig;
