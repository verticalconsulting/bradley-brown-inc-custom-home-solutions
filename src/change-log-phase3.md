# Phase 3 — Service Page Split Change Log

**Date:** 2026-08-04  
**Objective:** Split the single /services page into 6 dedicated service pages with expanded content, local SEO keywords, and standardized structure.

---

## New Pages Created

| Route | File | Word Count | Description |
|---|---|---|---|
| `/services/custom-home-building` | `src/pages/services/CustomHomeBuilding.jsx` | ~700 | Custom home building in Brandon, MS & Rankin County |
| `/services/kitchen-bathroom-remodeling` | `src/pages/services/KitchenBathroomRemodeling.jsx` | ~750 | Kitchen & bath remodeling with permits, ROI, code compliance |
| `/services/room-additions` | `src/pages/services/RoomAdditions.jsx` | ~750 | Master suites, in-law suites, home offices, sunrooms, garage conversions |
| `/services/outdoor-living` | `src/pages/services/OutdoorLiving.jsx` | ~750 | Covered patios, outdoor kitchens, decks, pergolas, pool surrounds |
| `/services/barndominiums` | `src/pages/services/BarndominiumsService.jsx` | ~750 | Merged best content from 3 barndominium pages — 3 testimonials, 5 FAQs |
| `/services/emergency-repairs` | `src/pages/services/EmergencyRepairs.jsx` | ~750 | Emergency repairs with (601) 954-1306 prominent in banner & CTAs |

### Shared Component

| File | Description |
|---|---|
| `src/components/services/ServicePageLayout.jsx` | Reusable layout: SEO/FAQPage/BreadcrumbList schema, hero, body sections, features grid, image gallery, testimonials, FAQ accordion, related Pro Tips links, bottom CTA pair |

---

## Each Service Page Includes

- ✅ H1 with service + location (Brandon, MS)
- ✅ 600+ words with local keywords (Brandon MS, Rankin County, Central Mississippi)
- ✅ 2–5 FAQs with FAQPage JSON-LD schema
- ✅ 1–3 testimonials (barndominiums page has 3 — merged from /barndominium-builder)
- ✅ 2–3 relevant portfolio images
- ✅ Standard CTA pair (Get My Free Estimate → /estimate, Call phone number)
- ✅ 2–3 internal links to related Pro Tips / guide pages
- ✅ BreadcrumbList schema (Home → Services → Service Name)
- ✅ Service schema with provider and areaServed

---

## Rebuilt /services Hub Page

| File | Description |
|---|---|
| `src/pages/Services.jsx` | Rebuilt as short hub: intro + 6 service cards linking to the 6 children pages, each with icon, description, starting price, and "Learn More" button |

---

## Redirects Added (App.jsx)

### Barndominium URLs → `/services/barndominiums`

| Old Route | Redirects To |
|---|---|
| `/barndominium-builder` | `/services/barndominiums` |
| `/barndominiums-ms` | `/services/barndominiums` (was → /barndominium-builder) |
| `/barndominium-cost-mississippi` | `/services/barndominiums` |

### Emergency & Luxury Renovation Redirects

| Old Route | Redirects To |
|---|---|
| `/landingemergencyrepair` | `/services/emergency-repairs` |
| `/luxuryhomerenovations` | `/services/kitchen-bathroom-remodeling` |

---

## Files Modified

### `src/pages.config.js`
- Removed `import LandingEmergencyRepair` (page replaced by /services/emergency-repairs redirect)
- Removed `import LuxuryHomeRenovations` (page replaced by /services/kitchen-bathroom-remodeling redirect)
- Removed `"LandingEmergencyRepair"` from PAGES object
- Removed `"LuxuryHomeRenovations"` from PAGES object

### `src/App.jsx`
- Removed imports: `Barndominiums`, `BarndominiumBuilder`, `BarndominiumCost`
- Added imports: `CustomHomeBuilding`, `KitchenBathroomRemodeling`, `RoomAdditions`, `OutdoorLiving`, `BarndominiumsService`, `EmergencyRepairs`
- Added 6 new `<Route>` elements for service detail pages
- Changed `/barndominium-builder` from page route to `<Navigate>` redirect
- Changed `/barndominiums-ms` redirect target from `/barndominium-builder` to `/services/barndominiums`
- Changed `/barndominium-cost-mississippi` from page route to `<Navigate>` redirect
- Added `/landingemergencyrepair` → `/services/emergency-repairs` redirect
- Added `/luxuryhomerenovations` → `/services/kitchen-bathroom-remodeling` redirect

### `src/Layout.jsx`
- Updated footer "Services" column: all 6 links now point directly to the new service pages via `to` property instead of `createPageUrl`
- Removed "Luxury Renovations" and "Core Services — Brandon" links (consolidated into new pages)
- Changed link rendering from `createPageUrl(item.page)` to `item.to`

---

## Content Merged into /services/barndominiums

Merged best content from three source pages:
- `/barndominium-builder` (BarndominiumBuilder.jsx) — testimonials, FAQs, featured project images, pricing table
- `/barndominiums-ms` (Barndominiums.jsx) — features grid, pricing tiers, body copy
- `/barndominiums` (Barndominiums.jsx, same component) — same content

**Preserved:**
- 3 testimonials (Chris B. — Brandon, Sarah & Tom M. — Pelahatchie, Marcus L. — Rankin Co.)
- 5 best FAQs (cost, timeline, financing, shop+home combo, permits)
- 3 portfolio images (nighttime exterior, open interior, custom workspace)
- Pricing ranges ($75–$150/sq ft, $45K–$350K total range)
- Financing information (USDA, construction-to-perm, Farm Credit)

---

## Emergency Repairs Page — (601) 954-1306

The emergency page prominently displays the (601) 954-1306 number in:
- A red sticky banner at the top of the page
- The hero CTA button (overrides the default (844) 351-4154)
- The bottom CTA button

All other service pages use the standard (844) 351-4154 number.

---

## Deprecated Page Files (Still on Disk, No Longer Routed)

| File | Status |
|---|---|
| `src/pages/BarndominiumBuilder.jsx` | No longer routed — /barndominium-builder redirects |
| `src/pages/Barndominiums.jsx` | No longer routed — was dead import, now removed |
| `src/pages/BarndominiumCost.jsx` | No longer routed — /barndominium-cost-mississippi redirects |
| `src/pages/LandingEmergencyRepair.jsx` | No longer in pages.config.js — /landingemergencyrepair redirects |
| `src/pages/LuxuryHomeRenovations.jsx` | No longer in pages.config.js — /luxuryhomerenovations redirects |

---

## Open Follow-Up Items

1. **Sitemap update:** The dynamic sitemap function (`base44/functions/sitemap/entry.ts`) should be updated to include the 6 new `/services/*` URLs and exclude the deprecated pages.
2. **Internal link audit:** Other pages (ProTips, LandingBrandonRemodelers, etc.) may still link to /landingemergencyrepair or /luxuryhomerenovations — the redirects handle this, but direct links should be updated in a future pass.
3. **Google Search Console:** Resubmit sitemap after update to reflect new service page URLs.
4. **Deprecated file cleanup:** The 5 deprecated page files could be deleted once confirmed no longer needed for reference.