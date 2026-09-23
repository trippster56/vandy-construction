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
    duration: "6 weeks",
    meta: "Residential · 6 weeks",
    caption: "A whole-home remodel — open-concept kitchen and refreshed living spaces.",
    image: "/images/vandy-remodel-wide.jpg",
    alt: "Whole-home remodel — open-concept kitchen, dining, and living area",
    gallery: [
      { src: "/images/vandy-kitchen-before.jpg", label: "Kitchen — before" },
      { src: "/images/vandy-kitchen.jpg", label: "Kitchen — after" },
      { src: "/images/vandy-living-before.jpg", label: "Living room — before" },
      { src: "/images/vandy-living-room.jpg", label: "Living room — after" },
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
    duration: "10 weeks",
    meta: "Residential · 10 weeks",
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
  {
    slug: "rear-addition",
    n: "04",
    title: "Rear Addition",
    category: "Residential",
    duration: "8 weeks",
    meta: "Residential · 8 weeks",
    caption: "A rear home addition that expands the living space and ties seamlessly into the existing house.",
    image: "/images/vandy-rear-addition.jpg",
    alt: "Rear home addition after construction",
    gallery: [
      { src: "/images/vandy-rear-before.jpg", label: "Rear addition — before" },
      { src: "/images/vandy-rear-addition.jpg", label: "Rear addition — after" },
    ],
  },
  {
    slug: "porch-remodel",
    n: "05",
    title: "Porch Remodel",
    category: "Residential",
    duration: "2 weeks",
    meta: "Residential · 2 weeks",
    caption: "An open pergola porch converted into a fully covered porch with a new roof, ceiling fans, and fresh paint.",
    image: "/images/whitman-porch-after.jpg",
    alt: "Covered back porch after remodel — white columns, railings, and ceiling fans",
    gallery: [
      { src: "/images/whitman-porch-before.jpg", label: "Porch — before" },
      { src: "/images/whitman-porch-progress.jpg", label: "Porch — in progress" },
      { src: "/images/whitman-porch-after.jpg", label: "Porch — after" },
    ],
  },
  {
    slug: "mobile-home-flip",
    n: "06",
    title: "Mobile Home Flip",
    category: "Residential",
    duration: "6 weeks",
    meta: "Residential · 6 weeks",
    caption: "A full mobile home renovation — new kitchen, a spa-style bathroom, and a refreshed exterior.",
    image: "/images/battery-park-kitchen.jpg",
    alt: "Renovated mobile home kitchen — white shaker cabinets, quartz counters, subway tile",
    gallery: [
      { src: "/images/battery-park-before.jpg", label: "Exterior" },
      { src: "/images/battery-park-after.jpg", label: "Exterior — aerial" },
      { src: "/images/battery-park-progress.jpg", label: "Hallway — in progress" },
      { src: "/images/battery-park-kitchen-progress.jpg", label: "Kitchen — in progress" },
      { src: "/images/battery-park-kitchen.jpg", label: "Kitchen — after" },
      { src: "/images/battery-park-bathroom.jpg", label: "Bathroom — after" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
