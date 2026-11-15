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
  hero: "fullbleed" as HeroLayout,

  // Page ground toggle: "white" (clean editorial) or "gray" (#9A9CA1 — Josh's
  // requested background, 3.2). Flip this to compare the two versions.
  pageGround: "white" as PageGround,

  // ── Branding ──────────────────────────
  name: "Vandy Construction Company, LLC",
  short: "Vandy Construction",
  established: "2024",
  city: "Florence, SC",
  tagline: "Building with Excellence. Serving with Integrity. Impacting Lives.",
  description:
    "Licensed and insured general contractor serving Florence, SC and surrounding counties.",
  // Footer blurb (per Josh's feedback doc) — kept separate from `description`
  // so the hero subhead / SEO copy stay independent.
  footerBlurb:
    "Licensed & Insured Residential and Commercial Contractor proudly serving Florence, SC and the surrounding Pee Dee communities.",
  // www is the primary domain in Vercel (the apex redirects to it), so the
  // sitemap and robots.txt list www URLs to avoid redirect warnings in Search Console.
  url: "https://www.vandyconstruction.com",
  logo: "/images/logo-mark.svg", // vectorized from Josh's logo (silver gradient); also logo-mark-mono.svg for single-color use

  // Hero image — drop Josh's chosen "after" photo path here (e.g. "/images/hero.jpg")
  // to swap the styled placeholder for the real photo. Empty string = placeholder.
  heroImage: "/images/airbnb-studio.jpg",
  heroImageAlt:
    "Finished studio apartment — kitchen, living area, and sleeping space from a completed Vandy renovation",

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

  // ── Navigation Links (Gallery replaces Services) ──
  navLinks: [
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/projects" },
    { label: "Team", href: "/team" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],

  // ── Footer "Pages" column ─────────────
  // Nav links plus destinations we deliberately keep OUT of the top nav
  // (the subcontractor form is for trade partners, not customers — it lives
  // on /contact behind a tab and is linked here + via the /subcontractors alias).
  footerLinks: [
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/projects" },
    { label: "Team", href: "/team" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
    { label: "Subcontractors", href: "/subcontractors" },
  ],

  // ── Contact Info ──────────────────────
  contact: {
    email: "info@vandyconstruction.com",
    phone: "(843) 939-9393",
    address: "1427 Old Ebenezer Road, Florence, SC 29501",
    hours: "Mon–Fri · 7am–5pm",
  },

  // ── Social Links ──
  // Company accounts only. Josh's personal LinkedIn lives on his Team card.
  socials: {
    facebook: "https://www.facebook.com/p/Vandy-Construction-Co-61573879797884/",
    instagram: "https://www.instagram.com/vandyconstruction/",
  },

  // ── Google Business Profile (map + "Leave a review") ──
  google: {
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJkeMjLFVjVYgR7GLIfFcy_fc",
    mapsEmbedQuery: "1427 Old Ebenezer Road, Florence, SC 29501", // used for the map embed
  },

  // ── Email (Resend) ───────────────────
  // `subcontractorsTo` keeps trade-partner submissions out of Josh's main
  // inbox once there's a second address to send them to. Falls back to `to`.
  email: {
    from: "onboarding@resend.dev",
    to: "info@vandyconstruction.com",
    subcontractorsTo: "",
  },

  // ── SEO (per 8.2 target terms) ──
  // `url` above is the production domain: canonical links, the sitemap, Open
  // Graph URLs and structured data are all built from it.
  seo: {
    // Home page <title> (kept <= 60 chars so Google doesn't truncate it).
    title: "Vandy Construction Company | Florence, SC General Contractor",
    // Brand suffix for every other page: "About | Vandy Construction Company".
    // Shorter than `name` (", LLC") so page titles stay under ~60 chars.
    brand: "Vandy Construction Company",
    // <= 160 chars so the search snippet isn't cut off.
    description:
      "Licensed and insured general contractor serving Florence, SC and the surrounding Pee Dee communities. Building with excellence, serving with integrity.",
    locale: "en_US",
    // schema.org type for the site-wide structured data (a LocalBusiness subtype).
    schemaType: "GeneralContractor",
    // `contact.address` split into parts for structured data (Google needs them).
    address: {
      streetAddress: "1427 Old Ebenezer Road",
      addressLocality: "Florence",
      addressRegion: "SC",
      postalCode: "29501",
      addressCountry: "US",
    },
    // schema.org form of `contact.hours` (Mon–Fri · 7am–5pm). Keep the two in sync.
    openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:00" },
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
