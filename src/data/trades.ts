/**
 * Trades offered in the subcontractor interest form (/contact → Subcontractors tab).
 * Josh can add or remove trades here — the form select reads straight from this list.
 * Keep "Other" last; picking it reveals a free-text field.
 */
export const TRADES = [
  "General labor",
  "Framing / carpentry",
  "Concrete & masonry",
  "Roofing",
  "Siding & exteriors",
  "Windows & doors",
  "Drywall",
  "Painting",
  "Electrical",
  "Plumbing",
  "HVAC",
  "Flooring & tile",
  "Cabinets & trim",
  "Insulation",
  "Gutters",
  "Excavation & grading",
  "Landscaping",
  "Cleaning & haul-off",
  "Other",
] as const;

export const OTHER_TRADE = "Other";
