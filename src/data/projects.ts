export type GalleryImage = {
  /** Real photo path under /public. Falls back to a styled placeholder when absent. */
  src?: string;
  label: string;
  tone?: string;
};

export type Project = {
  slug: string;
  n: string;
  title: string;
  category: string;
  duration: string;
  meta: string;
  caption: string;
  /** Primary / hero photo. Empty = styled placeholder. */
  image?: string;
  alt?: string;
  /** Optional case-study fields — only render when present (kept off until Josh provides copy). */
  summary?: string;
  location?: string;
  year?: string;
  scope?: string[];
  gallery: GalleryImage[];
};

// Real Vandy projects. Captions are brief drafts — confirm wording with Josh.
// Galleries fill in as photos are pulled from the "Job Photos for website" drive.
export const projects: Project[] = [
  {
    slug: "full-home-remodel",
    n: "01",
    title: "Full Home Remodel",
    category: "Residential",
    duration: "5 months",
    meta: "Residential · 5 months",
    caption: "A whole-home remodel — open-concept kitchen, refreshed living spaces, and a rear addition.",
    image: "/images/vandy-remodel-wide.jpg",
    alt: "Whole-home remodel — open-concept kitchen, dining, and living area",
    gallery: [
      { src: "/images/vandy-kitchen-before.jpg", label: "Kitchen — before" },
      { src: "/images/vandy-kitchen.jpg", label: "Kitchen — after" },
      { src: "/images/vandy-living-before.jpg", label: "Living room — before" },
      { src: "/images/vandy-living-room.jpg", label: "Living room — after" },
      { src: "/images/vandy-rear-before.jpg", label: "Rear addition — before" },
      { src: "/images/vandy-rear-addition.jpg", label: "Rear addition — after" },
    ],
  },
  {
    slug: "commercial-renovation",
    n: "02",
    title: "Commercial Renovation",
    category: "Commercial",
    duration: "7 weeks",
    meta: "Commercial · 7 weeks",
    caption: "An old garage transformed into a finished studio apartment.",
    image: "/images/airbnb-studio.jpg",
    alt: "Studio apartment after renovation — kitchen, living area, and sleeping space",
    gallery: [
      { src: "/images/airbnb-before.jpg", label: "Garage — before" },
      { src: "/images/airbnb-kitchen.jpg", label: "Studio — after" },
      { src: "/images/airbnb-island.jpg", label: "Kitchen island" },
      { src: "/images/airbnb-bathroom.jpg", label: "Bathroom" },
    ],
  },
  {
    slug: "kitchen-remodel",
    n: "03",
    title: "Kitchen Remodel",
    category: "Residential",
    duration: "3 months",
    meta: "Residential · 3 months",
    caption: "A complete kitchen remodel with new cabinetry, quartz counters, and tile flooring.",
    image: "/images/young-kitchen-wide.jpg",
    alt: "Kitchen remodel after — white cabinetry, quartz waterfall island, tile floor",
    gallery: [
      { src: "/images/young-kitchen-before.jpg", label: "Kitchen — before" },
      { src: "/images/young-kitchen-2.jpg", label: "Kitchen — after" },
      { src: "/images/young-great-before.jpg", label: "Adjoining room — before" },
      { src: "/images/young-great-room.jpg", label: "Adjoining room — after" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
