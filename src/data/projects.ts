export type Project = {
  slug: string;
  n: string;
  title: string;
  category: string;
  duration: string;
  meta: string;
  caption: string;
  summary: string;
  location: string;
  year: string;
  scope: string[];
  gallery: { label: string; tone: string }[];
};

export const projects: Project[] = [
  {
    slug: "modern-lake-house",
    n: "01",
    title: "Modern lake house",
    category: "Custom home",
    duration: "14 months",
    meta: "Custom home · 14 months",
    caption: "4,200 sqft on a sloped lakefront lot.",
    summary:
      "A ground-up custom home on a difficult sloped lakefront lot. The build required custom foundation work, retaining walls, and careful site planning to preserve mature trees and the lake view from every main room.",
    location: "Great PeeDee",
    year: "20XX",
    scope: [
      "Site work, grading & retaining walls",
      "Custom foundation on sloped grade",
      "Framing, exterior, and roof",
      "Interior finish carpentry & millwork",
      "Final landscaping & punch list",
    ],
    gallery: [
      { label: "exterior", tone: "#c4a988" },
      { label: "kitchen", tone: "#cdb494" },
      { label: "great room", tone: "#bda07f" },
      { label: "dock view", tone: "#a98c66" },
    ],
  },
  {
    slug: "downtown-retail-buildout",
    n: "02",
    title: "Downtown retail buildout",
    category: "Commercial",
    duration: "6 weeks",
    meta: "Commercial · 6 weeks",
    caption: "Bare shell to grand opening with custom millwork.",
    summary:
      "Full retail buildout from a bare downtown shell. We coordinated trades on a tight 6-week timeline to hit the tenant's grand-opening date with custom millwork, branded fixtures, and a finished customer-ready space.",
    location: "Great PeeDee",
    year: "20XX",
    scope: [
      "Demo & shell prep",
      "Framing, electrical, and HVAC coordination",
      "Custom retail millwork & fixtures",
      "Finishes, lighting, and signage",
      "Final inspections & handoff",
    ],
    gallery: [
      { label: "storefront", tone: "#cdb494" },
      { label: "interior", tone: "#bda07f" },
      { label: "millwork", tone: "#c4a988" },
    ],
  },
  {
    slug: "whole-home-renovation",
    n: "03",
    title: "Whole-home renovation",
    category: "Renovation",
    duration: "4 months",
    meta: "Renovation · 4 months",
    caption: "1920s craftsman taken back to studs and rebuilt.",
    summary:
      "A 1920s craftsman taken back to the studs and rebuilt from the inside out. New mechanicals, fresh layout, restored original details where possible, and a completely new kitchen and primary suite.",
    location: "Great PeeDee",
    year: "20XX",
    scope: [
      "Selective demo to studs",
      "New plumbing, electrical, and HVAC",
      "Reframed kitchen & primary suite",
      "Restored original trim & details",
      "Refinished floors and full repaint",
    ],
    gallery: [
      { label: "before", tone: "#8c7558" },
      { label: "kitchen", tone: "#bda07f" },
      { label: "primary suite", tone: "#cdb494" },
      { label: "exterior", tone: "#c4a988" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
