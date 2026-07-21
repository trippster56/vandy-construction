# Launch Feedback Checklist — Josh's Google Doc

Source: content review returned via Josh's secretary (homepage, top → bottom).
Labels: 🟢 READY (text-only) · 🟡 NEEDS PHOTO · 🔵 NEEDS JOSH · 🟣 DECISION (our call)

---

## Hero
- [x] 🟢 Headline → "Building with Excellence. Serving with Integrity. Impacting Lives." *(was "Welcoming. Experienced. Trustworthy.")*
- [x] ✅ **Josh picked Option 1 — full-image background hero** (Doulaveris-style). Layout switched `split` → `fullbleed`; wired `vandy-remodel-wide.jpg` (open-concept remodel shot) as the background with a navy scrim for headline/button legibility.

## "What we do" section
- [x] 🟢 Section heading → "Built Around Your Vision"
- [x] 🟢 Intro paragraph → "Every project begins with your vision…"
- [x] 🟢 01 Custom Builds (Residential) + description
- [x] 🟢 02 Renovations & Additions (Residential) + description
- [x] 🟢 03 Commercial Projects (Commercial) + description
- [x] 🟢 04 Repairs & Restoration (Property Service) + description
- [x] ✅ **Josh resolved the 03 wording** — replaced the repairs-sounding copy with: "Interior renovations, tenant improvements, office remodels and commercial build-outs designed to create functional, professional spaces that meet your business needs."

## Featured Projects (Recent Work)
- [x] 🟢 Heading → "Featured Projects"
- [x] 🟢 Button "See all" → "See More"
- [x] 🟢 "See More" links to `/projects`
- [x] 🟢 (text) 01 Full Home Remodel · Residential · 5 months
- [x] 🟢 (text) 02 Commercial Renovation · Commercial · 7 weeks
- [x] 🟢 (text) 03 Kitchen Remodel · Residential · 3 months
- [x] 🟡 Photos: ALL three projects now have a hero + 3-photo gallery, pulled from the full photo drop and optimized (HEIC→web JPG).
  - Full Home Remodel → wide open-concept hero + kitchen / living room / rear addition
  - Commercial Renovation → studio hero + kitchen / island / bathroom
  - Kitchen Remodel → wide kitchen hero + 2 kitchen angles / great room
- [x] Unified: homepage Featured Projects + `/projects` gallery are now ONE source of truth (`projects.ts`). Old template placeholders (Modern lake house, "20XX", "Great PeeDee", invented scope/summary) deleted. "See More" → gallery → each project opens a photo-forward detail page.
- [x] ✅ Project captions confirmed by Josh ("the wording looks great").
- [x] 🟡 Gallery photos pulled + wired for all three featured projects — now as **before → after pairs** (side by side on the detail page, captioned) so Josh's work shows.
- [ ] 🔵 MORE jobs coming: those photo-drop jobs (Darlington Remodel, Darlington Carport, Battery Park Porch, Lake City Porch, Pool House Paint, Turbeville Stage) predate Tripp on the account. Josh will (a) confirm details on those and (b) upload fresh photos — incl. custom houses — plus a doc with length-of-work and other info. Add as gallery projects once that arrives.
- [x] ✅ Hero image chosen: `vandy-remodel-wide.jpg` set as the full-bleed hero background.
- [ ] ⚪ Case-study text (summary paragraph, scope list, location, year) is now optional and hidden — add later if Josh wants richer write-ups.

## How It Works
- [x] 🟢 Process heading → "From Vision to Completion"
- [x] 🟢 01 Consultation + description
- [x] 🟢 02 Planning & Selections + description
- [x] 🟢 03 Project Begins + description
- [x] 🟢 04 Final Walkthrough + description

## What They Say (Testimonials)
- [x] 🟢 Real Estate Broker — H. Edwards quote
- [x] 🟢 Commercial Client — R. Cannon quote
- [x] Testimonials = the two real quotes (H. Edwards, R. Cannon). Homeowner slot dropped per Tripp; layout adapts to the count (2 columns).

## Get In Touch (closing CTA)
- [x] 🟢 Heading → "Let's Build Something Great Together" *(was "Let's talk.")*
- [x] 🟢 Closing line → "Whether you're planning a renovation, addition, repair, or new construction project, we'd love to hear about it."

## Footer
- [x] 🟢 Company line → "Licensed & Insured Residential and Commercial Contractor proudly serving Florence, SC and the surrounding Pee Dee communities."
- [x] 🟣 Brand Promise — placed as its own statement band between Testimonials and the closing CTA (`BrandPromise.tsx`). One-line move in `page.tsx` if Josh wants it elsewhere.

---

## Open items summary
**✅ Resolved by Josh (this round):** hero = Option 1 full-image background · 03 wording rewritten · captions confirmed.
**🔵 Still coming from Josh:** more job photos (incl. custom houses) + a doc with length-of-work / details → new gallery projects. Detail on the older photo-drop jobs (predate Tripp).
**Note:** SEO meta description was already updated to the new tagline line.
