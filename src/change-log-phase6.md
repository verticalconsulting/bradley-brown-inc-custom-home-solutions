# Phase 6 — Homepage Content Enrichment for Local SEO

**Date:** 2026-08-04  
**Objective:** Expand homepage FAQ, add Featured Project captions and image alt text, and replace the thin service-area section with a keyword-rich body paragraph — all targeting Brandon, MS and Rankin County local SEO.

---

## Task 1 — Homepage FAQ Expansion

### File: `src/components/home/HomeFAQ.jsx` (complete rewrite)

**Before:** 3 generic Q&As under H2 "Frequently Asked Questions"  
**After:** 6 Brandon-specific Q&As under H2 "Frequently Asked Questions About Home Remodeling in Brandon, MS"

| # | Question | Links in Answer |
|---|---|---|
| Q1 | How much does a home remodel cost in Brandon, MS? | "free itemized estimate" → `/estimate`, "pricing page" → `/pricing` |
| Q2 | Is Bradley Brown Inc licensed and insured in Mississippi? | (none) |
| Q3 | How long does a kitchen or bathroom remodel take in Brandon? | "kitchen remodeling" → `/services/kitchen-bathroom-remodeling`, "bathroom remodeling" → `/services/kitchen-bathroom-remodeling` |
| Q4 | Do you handle storm damage and emergency home repairs? | "(844) 351-4154" → `tel:`, "emergency repairs" → `/services/emergency-repairs` |
| Q5 | What areas near Brandon, MS do you serve? | (none) |
| Q6 | Can you help with financing a home renovation? | "free estimate" → `/estimate`, "renovation loans guide" → `/protips/renovation-loans` |

### Schema Sync — `src/pages/Home.jsx`

The FAQPage schema in Home.jsx was updated to use `f.schemaAnswer` (plain text) instead of `f.answer` (which is now JSX for answers containing links). Each FAQ object carries both:
- `answer` — JSX node rendered in the UI (includes `<Link>` elements)
- `schemaAnswer` — plain string used in the FAQPage JSON-LD schema

The `schemaAnswer` text matches the rendered HTML visible text verbatim (link anchor text appears as plain words in the schema string).

### URL Note — Q3 Links

The task specified linking to `/services/kitchen-remodeling` and `/services/bathroom-remodeling`. These routes do not exist in the current app structure — kitchen and bathroom remodeling share a single combined service page at `/services/kitchen-bathroom-remodeling` (see App.jsx route table). Both "kitchen remodeling" and "bathroom remodeling" links therefore point to `/services/kitchen-bathroom-remodeling`.

### No FAQ Duplication

These 6 homepage FAQs are distinct from the service-page FAQs created in Phase 3. The service pages (Custom Home Building, Kitchen & Bath Remodeling, Room Additions, Outdoor Living, Barndominiums, Emergency Repairs) each carry their own FAQPage schema with service-specific questions. No question text is shared between the homepage and service pages.

---

## Task 2 — Featured Projects Captions + Image SEO

### File: `src/components/home/FeaturedProjects.jsx`

**Placeholder projects updated** to match the 3 projects specified in the task:

| Project | Category | Location | Sq Ft | Caption (short_description) |
|---|---|---|---|---|
| Office Addition | addition | Brandon, MS | 500 | Dedicated home office addition, separate HVAC zoning, custom built-in shelving, siding matched to original 1990s construction. |
| Barndominium Custom Office & Shop | custom_home | Brandon, MS | 3,200 | Climate-controlled workshop + finished office suite, post-frame construction, spray foam insulation, polished concrete shop floors, built to client's custom drawings. |
| County Custom Built | custom_home | Canton, MS | 3,200 | Fully custom new construction; finishes selected through the AI Finish Package Studio before groundbreak. |

**Caption rendering:** Added `project.short_description` display below the title/location/sqft line on each project card. If the database project record has a `short_description` field, it renders; otherwise nothing shows (graceful fallback).

**Alt text pattern:** Changed `alt={project.title}` to a dynamic pattern:
```
[project type] by Bradley Brown Inc — [city], MS
```
Example: "Custom Home by Bradley Brown Inc — Canton, MS"

A `buildAltText()` helper function constructs the alt string from `categoryLabels[project.category]` and `project.location`.

**"View All Projects" button:** Updated from `createPageUrl("Portfolio")` to direct `to="/portfolio"` link (no longer relies on createPageUrl helper).

### File: `src/pages/Portfolio.jsx`

**Alt text updated** on the project image to the same pattern:
```
[project type] by Bradley Brown Inc — [city], MS
```
Uses the existing `categoryLabels` map already defined in the file.

### [VERIFY] Items — Unverified Claims Removed from Captions

The following bracketed claims from the task drafts were **removed** from the published captions because they are unverified. They require owner confirmation before being added back:

| Project | Removed Claim | Status |
|---|---|---|
| Office Addition (Brandon, 500 sq ft) | "completed in 9 weeks" | ⏳ Awaiting owner confirmation |
| Office Addition (Brandon, 500 sq ft) | "zero change orders" | ⏳ Awaiting owner confirmation |
| Barndominium Custom Office & Shop (Brandon, 3,200 sq ft) | "200-amp electrical service" | ⏳ Awaiting owner confirmation |
| County Custom Built (Canton, 3,200 sq ft) | "delivered on schedule" | ⏳ Awaiting owner confirmation |
| County Custom Built (Canton, 3,200 sq ft) | "within 2% of original budget" | ⏳ Awaiting owner confirmation |

**Action required:** Owner confirms or denies each claim. If confirmed, the claim can be appended to the project's `short_description` in the database (or placeholder data). If denied or unknown, the caption stays as-is without the claim.

---

## Task 3 — Service-Area Section Replacement

### File: `src/components/home/ServiceAreaSection.jsx` (complete rewrite)

**Before:**  
- H2: "Serving Brandon and Rankin County Mississippi"  
- 12-city grid (no body text)
- CTAs: Call button + "View Service Area Map" → `/contact`

**After:**  
- H2: "Home Remodeling Services Across Brandon, MS and Rankin County"
- Body paragraph (133 words) with internal links
- Updated 12-city grid (matching paragraph locations)
- Standard CTA pair: Call (844) 351-4154 + Get My Free Estimate → `/estimate`

### Body Paragraph Internal Links

| Anchor Text | Link Target |
|---|---|
| "Brandon remodeling" | `/remodeling-brandon-ms` |
| "custom home builder in Brandon" | `/custom-home-builder-brandon-ms` |
| "(844) 351-4154" | `tel:+18443514154` |
| "free estimate online" | `/estimate` |

### City Grid Updated

Old cities: Brandon, Flowood, Pearl, Richland, Jackson, Madison, Ridgeland, Clinton, Byram, Rankin County, Hinds County, Madison County

New cities (match paragraph): Brandon, Flowood, Richland, Pearl, Florence, Pelahatchie, Ridgeland, Madison, Jackson, Clinton, Raymond, Rankin County

### CTA Changes

- Removed "View Service Area Map" link (pointed to `/contact`, not an actual map)
- Added "Get My Free Estimate" button → `/estimate` (standard primary CTA)
- Kept "Call (844) 351-4154" green button (standard secondary CTA)

### Map Image (Optional — Deferred)

The task mentioned an optional static service-area map image with alt text "Bradley Brown Inc home remodeling service area — Brandon MS and Central Mississippi". This was **deferred** to avoid unnecessary image generation costs. If the owner wants to add a map image, it can be uploaded to the SiteImage entity and inserted into this section.

### Word Count

The body paragraph is 133 words, within the 120-150 word target. The paragraph is intentionally shorter than the `/remodeling-brandon-ms` and `/custom-home-builder-brandon-ms` landing pages to avoid content competition.

---

## Total Homepage Word Count

| Section | Words Added |
|---|---|
| FAQ (6 answers, ~2-3 sentences each) | ~275 |
| Featured Projects (3 captions × ~20 words) | ~60 |
| Service Area body paragraph | 133 |
| **Total** | **~468** |

Well under the ~800 word target. ✅

---

## Files Modified

| File | Change |
|---|---|
| `src/components/home/HomeFAQ.jsx` | Complete rewrite — 6 Brandon-specific Q&As with JSX answers, schemaAnswer field, new H2 heading |
| `src/pages/Home.jsx` | Updated faqPageSchema to use `f.schemaAnswer` for JSON-LD text |
| `src/components/home/FeaturedProjects.jsx` | Complete rewrite — updated placeholder projects, added caption rendering, alt text pattern, direct /portfolio link |
| `src/pages/Portfolio.jsx` | Updated project image alt text to match pattern |
| `src/components/home/ServiceAreaSection.jsx` | Complete rewrite — new H2, 133-word body paragraph with internal links, updated city grid, standard CTA pair |
| `src/change-log-phase6.md` | This file |

---

## [VERIFY] Items Awaiting Owner Confirmation

| # | Project | Claim | Action if Confirmed | Action if Denied/Unknown |
|---|---|---|---|---|
| 1 | Office Addition (Brandon, 500 sq ft) | "completed in 9 weeks" | Append to short_description | Leave out |
| 2 | Office Addition (Brandon, 500 sq ft) | "zero change orders" | Append to short_description | Leave out |
| 3 | Barndominium Custom Office & Shop (Brandon, 3,200 sq ft) | "200-amp electrical service" | Append to short_description | Leave out |
| 4 | County Custom Built (Canton, 3,200 sq ft) | "delivered on schedule" | Append to short_description | Leave out |
| 5 | County Custom Built (Canton, 3,200 sq ft) | "within 2% of original budget" | Append to short_description | Leave out |

---

## Notes

- **No nav/footer changes** — Phase 5 owns those; this phase only touched homepage content sections.
- **No new CTAs** beyond the standard pair (Call + Get My Free Estimate).
- **FAQ schema verbatim match** — `schemaAnswer` plain text matches rendered HTML visible text exactly (link anchor text appears as plain words in schema).
- **No FAQ duplication** — Homepage FAQs are Brandon-focused; service-page FAQs are service-specific. Zero overlap in question text.
- **Service-area map image** — Optional, deferred to avoid image generation cost. Can be added later via SiteImage entity.