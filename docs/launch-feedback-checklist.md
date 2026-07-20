# Launch Feedback Checklist — Josh's Google Doc

Source: content review returned via Josh's secretary (homepage, top → bottom).
Labels: 🟢 READY (text-only) · 🟡 NEEDS PHOTO · 🔵 NEEDS JOSH · 🟣 DECISION (our call)

---

## Hero
- [x] 🟢 Headline → "Building with Excellence. Serving with Integrity. Impacting Lives." *(was "Welcoming. Experienced. Trustworthy.")*
- [x] Hero image slot wired photo-ready (`siteConfig.heroImage` / `heroImageAlt`). Empty = styled placeholder shows; set the path to drop in the real photo. Layout is the split (image on the side) per Josh.
- [ ] 🟡🔵 Hero photo itself — Josh to pick the "after" shot. Then set `heroImage` (one line).

## "What we do" section
- [x] 🟢 Section heading → "Built Around Your Vision"
- [x] 🟢 Intro paragraph → "Every project begins with your vision…"
- [x] 🟢 01 Custom Builds (Residential) + description
- [x] 🟢 02 Renovations & Additions (Residential) + description
- [x] 🟢 03 Commercial Projects (Commercial) + description
- [x] 🟢 04 Repairs & Restoration (Property Service) + description
- [ ] 🔵 **QUESTION for Josh:** the description written under "03 Commercial Projects" is about repairs/inspections/restoration — reads like it belongs to #04. Looks like 03 & 04 descriptions may be swapped. Implemented verbatim as written for now.

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
- [ ] 🔵 Brief project captions are draft one-liners — confirm/adjust with Josh (esp. Full Home Remodel & Kitchen wording).
- [x] 🟡 Gallery photos pulled + wired for all three featured projects — now as **before → after pairs** (side by side on the detail page, captioned) so Josh's work shows.
- [ ] 🟣 MORE jobs available: the photo drop also had Darlington Remodel (7 shots), Darlington Carport, Battery Park Porch, Lake City Porch, Pool House Paint, Turbeville Stage. Could become additional gallery projects — needs category + rough duration from Josh, and a re-share of those specific photos (raw drop was deleted to keep the repo lean).
- [ ] 🟣 Hero image candidate: `vandy-remodel-wide.jpg` (the wide open-concept shot) is a strong option for the homepage hero once the split/full-bleed layout is decided.
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
**🔵 Need from Josh:** hero photo pick · 03/04 description swap? · homeowner testimonial quote · "See More" link target
**🟣 Our decisions:** hero split vs. full-bleed · Brand Promise placement
**🟡 Photos to drop in:** hero + 3 featured projects
**Note:** SEO meta description still ends with "Welcoming, experienced, trustworthy." (echoes old tagline) — flag whether to update.
