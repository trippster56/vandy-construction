// Homepage content — Vandy Construction.
import { projects } from "./projects";

export const HOME_SERVICES = [
  { n: "01", title: "Custom Builds", body: "Ground-up residential construction tailored to your vision and project goals.", tag: "Residential" },
  { n: "02", title: "Renovations & Additions", body: "Kitchen, bathroom and whole-home renovations, along with additions designed to expand your living space.", tag: "Residential" },
  { n: "03", title: "Commercial Projects", body: "Interior renovations, tenant improvements, office remodels and commercial build-outs designed to create functional, professional spaces that meet your business needs.", tag: "Commercial" },
  { n: "04", title: "Repairs & Restoration", body: "Whether you're preparing a home for closing or addressing everyday repairs, we complete projects efficiently with the same quality and care as every build.", tag: "Property Service" },
];

// Featured Projects on the homepage ARE the first three real projects — single
// source of truth in projects.ts, so the homepage and /projects can't drift apart.
export const HOME_WORK = projects.slice(0, 3).map((p) => ({
  slug: p.slug,
  n: p.n,
  title: p.title,
  meta: p.meta,
  caption: p.caption,
  image: p.image ?? "",
  alt: p.alt ?? "",
}));

export const HOME_PRODUCTS = [
  { name: "Item placeholder", price: "$00" },
];

export const HOME_POSTS = [
  { date: "Mon 01", read: "3 min", title: "Placeholder post", kicker: "News" },
];

export const HOME_TESTIMONIALS = [
  { quote: "Josh and his team are incredibly responsive and consistently deliver quality work. I've trusted them with projects on many of the properties I've sold, and they always go above and beyond to make sure everything is completed the right way.", who: "H. Edwards", role: "Real Estate Broker" },
  { quote: "Josh was excellent to work with. He delivered exactly what he promised, stayed on schedule and within budget, and transformed our old garage into a beautiful studio apartment. I look forward to working with him again.", who: "R. Cannon", role: "Commercial Client" },
];

export const HOME_PROCESS = [
  { n: "01", title: "Consultation",          body: "We meet to discuss your project, evaluate the space, and provide a detailed written estimate tailored to your goals and budget." },
  { n: "02", title: "Planning & Selections", body: "Once your estimate is approved, we'll finalize material selections, coordinate scheduling, secure any necessary permits, and prepare your project for construction." },
  { n: "03", title: "Project Begins",        body: "Our team begins construction according to the project plan, completing each phase with attention to detail and regular progress updates." },
  { n: "04", title: "Final Walkthrough",     body: "We complete the finishing touches, address any remaining punch list items, and walk through the finished project together to ensure every detail meets your expectations." },
];

export const HOME_TICKER = [
  "Now booking 2026 projects",
  "Licensed & insured",
];

export const SOCIAL_LABELS = ["Facebook", "Instagram", "LinkedIn"];
