# Phase 4 — Page Consolidation & Deduplication Change Log

**Date:** 2026-08-04  
**Objective:** Consolidate duplicate and thin pages across bradleybrowninc.com. Merge content before redirecting — never delete Phase 1 "MIGRATE CONTENT" material.

---

## Before/After Page Count

| Metric | Before (Phase 3) | After (Phase 4) | Change |
|---|---|---|---|
| Pages in pages.config.js | 19 | 11 | −8 |
| Explicit routes in App.jsx | ~35 | ~40 | +5 (new pages + redirects) |
| 301 redirects | 11 | 23 | +12 |
| BlogPost records | dynamic | dynamic + 4 | +4 (migrated guides) |
| Nav links | 7 | 6 | −1 (Jobsites merged) |
| Footer "Company" links | 13 | 12 | −1 (Customer Testimonies merged) |

### pages.config.js PAGES (Before → After)

**Before (19):** About, AccountSettings, AgentChat, CRM, Contact, EnergyEfficientUpgrades, Home, HomeAdditionIdeas, LandingBrandonRemodelers, LandingCoreServices, LandingPricing, LandingTrust, Legal, Portfolio, ProTips, RenovationLoans, Services, SmallBathroomIdeas, TikTokSync

**After (11):** About, AccountSettings, AgentChat, CRM, Contact, Home, Legal, Portfolio, ProTips, Services, TikTokSync

---

## Task 1: About Page Merge

### Merged Into `/about`

| Source URL | Content Moved | Redirect |
|---|---|---|
| `/landingtrust` | Stats (30+ yrs, 500+ homes, 4.9★, 100% licensed), certifications/badges, trust commitments, TestimonialSlider, FAQ | 301 → `/about` |
| `/customertestimonials` | (same component as /landingtrust — already merged above) | 301 → `/about` |
| `/jobsites` | Live jobsites section — grid of published JobCheckin entries with photos, service labels, dates | 301 → `/about` |

### New Components Created

| File | Purpose |
|---|---|
| `src/components/about/AboutTrustSection.jsx` | Stats grid, certifications, trust commitments, testimonials slider, FAQ |
| `src/components/about/LiveJobsitesSection.jsx` | Fetches published JobCheckin entries, renders 3-column grid |

### Files Modified

| File | Change |
|---|---|
| `src/pages/About.jsx` | Rewritten to include AboutTrustSection + LiveJobsitesSection; updated explore links |
| `src/pages.config.js` | Removed `LandingTrust` import + PAGES entry |
| `src/App.jsx` | Removed `LandingTrust` import; removed `Jobsites` import; changed `/customertestimonials` + `/jobsites` routes to 301 redirects; added `/landingtrust` redirect |
| `src/Layout.jsx` | Removed "Jobsites" from nav links |

**Note:** `/jobsites/:slug` (individual jobsite detail pages) remain routed and accessible.

---

## Task 2: Pricing Page Consolidation

### Merged Into `/pricing`

| Source URL | Content | Redirect |
|---|---|---|
| `/landingpricing` | Full pricing guide — price table, tier pricing, financing options, how-we-price steps, local proof, FAQ | 301 → `/pricing` |
| `/home-remodeling-cost` | (same LandingPricing component — was an alias) | 301 → `/pricing` |

### Files Modified

| File | Change |
|---|---|
| `src/pages/LandingPricing.jsx` | Updated canonical to `https://bradleybrowninc.com/pricing` |
| `src/pages.config.js` | Removed `LandingPricing` import + PAGES entry |
| `src/App.jsx` | Added `/pricing` route (renders LandingPricing); changed `/home-remodeling-cost` to 301 redirect; added `/landingpricing` redirect |
| `src/Layout.jsx` | Footer "Pricing Guide" link updated to `/pricing` |

**Content preserved:** All price tables, tier pricing breakdown, financing options, how-we-price steps, local proof points, and 5 pricing FAQs.

---

## Task 3: Remodeling Brandon MS Page

### Merged Into `/remodeling-brandon-ms`

| Source URL | Content Moved | Redirect |
|---|---|---|
| `/landingbrandonremodelers` | Service area (8 cities + Google Map), services list, testimonials (3), cross-link to custom home builder, FAQ (4) | 301 → `/remodeling-brandon-ms` |
| `/landingcoreservices` | Services list with descriptions (6), body copy ("Why Brandon homeowners choose us"), local proof points | 301 → `/remodeling-brandon-ms` |

### Kept as Separate Pages (Distinct Intents)

| URL | Content | Status |
|---|---|---|
| `/custom-home-builder-brandon-ms` | Custom home building focus, process, new construction, residential GC, BrandonReviewSection | Unchanged — distinct intent (new construction vs. remodeling) |
| `/remodeling-ms` | Remodeling services overview, energy-efficient upgrades, broader MS focus | Unchanged; cross-link updated from `/landingbrandonremodelers` → `/remodeling-brandon-ms` |

### De-duplication Check

Compared `/custom-home-builder-brandon-ms` (LandingBrandonCustomHomeBuilder) vs. `/remodeling-ms` (LandingCoreServices) paragraph-by-paragraph. No identical paragraphs found — the pages target distinct intents (custom home building vs. remodeling services) with unique body copy. The city list (Brandon, Flowood, Pearl, etc.) appears on both but is a data array, not a content paragraph.

### Files Modified

| File | Change |
|---|---|
| `src/pages/RemodelingBrandonMS.jsx` | **New file** — merged content from LandingBrandonRemodelers + unique LandingCoreServices sections |
| `src/pages/LandingCoreServices.jsx` | Updated cross-link from `/landingbrandonremodelers` → `/remodeling-brandon-ms` |
| `src/pages.config.js` | Removed `LandingBrandonRemodelers` + `LandingCoreServices` imports + PAGES entries |
| `src/App.jsx` | Added `/remodeling-brandon-ms` route; added `/landingbrandonremodelers` + `/landingcoreservices` 301 redirects; kept `/remodeling-ms` route unchanged |
| `src/Layout.jsx` | Footer "Brandon MS Remodelers" link updated to `/remodeling-brandon-ms` |

---

## Task 4: Guide Pages Moved to Blog

### 4 Guide Pages → BlogPost Entity Records

| Old URL | New URL | BlogPost Slug | Category |
|---|---|---|---|
| `/homeadditionideas` | `/protips/home-addition-ideas` | `home-addition-ideas` | home-remodeling |
| `/smallbathroomideas` | `/protips/small-bathroom-ideas` | `small-bathroom-ideas` | bathroom-remodeling |
| `/energyefficientupgrades` | `/protips/energy-efficient-upgrades` | `energy-efficient-upgrades` | home-value |
| `/renovationloans` | `/protips/renovation-loans` | `renovation-loans` | home-remodeling |

### BlogPost Records Created

Each guide page's content was converted to markdown and saved as a BlogPost entity record with:
- `title`, `slug`, `topic`, `excerpt`, `meta_description`
- `content` (full markdown — all sections, cost tables, FAQs preserved)
- `published: true`
- `category` (from BlogPost enum)
- `image_url` + `image_alt_text` (hero image from original guide page)

### Files Modified

| File | Change |
|---|---|
| `src/pages.config.js` | Removed 4 imports + PAGES entries: HomeAdditionIdeas, SmallBathroomIdeas, EnergyEfficientUpgrades, RenovationLoans |
| `src/App.jsx` | Added 4 redirect routes: `/homeadditionideas` → `/protips/home-addition-ideas`, etc. |
| `src/Layout.jsx` | Footer links updated: guide page links now point to `/protips/<slug>` URLs |

**Content preserved:** All guide content (addition types with ROI/cost, bathroom ideas, energy upgrades with savings/cost/tax-credit, loan options with pros/best-for, FAQs, checklists, cost ranges) is now in the BlogPost database and rendered by ProTipDetail.jsx via react-markdown.

---

## Task 5: Historic Home Restoration Redirect

| Old URL | Redirects To |
|---|---|
| `/historichomerestoration` | `/projects/historic-home-restoration` (which itself redirects to `/portfolio`) |

Added in `src/App.jsx`.

---

## Complete Redirect Inventory (Phase 4 Additions)

### → `/about`
- `/customertestimonials` → `/about`
- `/landingtrust` → `/about`
- `/jobsites` → `/about`

### → `/pricing`
- `/landingpricing` → `/pricing`
- `/home-remodeling-cost` → `/pricing`

### → `/remodeling-brandon-ms`
- `/landingbrandonremodelers` → `/remodeling-brandon-ms`
- `/landingcoreservices` → `/remodeling-brandon-ms`

### → `/protips/<slug>` (blog migration)
- `/homeadditionideas` → `/protips/home-addition-ideas`
- `/smallbathroomideas` → `/protips/small-bathroom-ideas`
- `/energyefficientupgrades` → `/protips/energy-efficient-upgrades`
- `/renovationloans` → `/protips/renovation-loans`

### → `/projects/historic-home-restoration`
- `/historichomerestoration` → `/projects/historic-home-restoration`

---

## Deprecated Page Files (Still on Disk, No Longer Routed)

| File | Status |
|---|---|
| `src/pages/LandingTrust.jsx` | No longer routed — /landingtrust + /customertestimonials redirect to /about |
| `src/pages/Jobsites.jsx` | No longer routed — /jobsites redirects to /about |
| `src/pages/LandingPricing.jsx` | Still routed at /pricing (kept); /landingpricing + /home-remodeling-cost redirect here |
| `src/pages/LandingBrandonRemodelers.jsx` | No longer routed — redirects to /remodeling-brandon-ms |
| `src/pages/LandingCoreServices.jsx` | Still routed at /remodeling-ms (kept); /landingcoreservices redirects to /remodeling-brandon-ms |
| `src/pages/HomeAdditionIdeas.jsx` | No longer routed — content moved to BlogPost; redirects to /protips/home-addition-ideas |
| `src/pages/SmallBathroomIdeas.jsx` | No longer routed — content moved to BlogPost; redirects to /protips/small-bathroom-ideas |
| `src/pages/EnergyEfficientUpgrades.jsx` | No longer routed — content moved to BlogPost; redirects to /protips/energy-efficient-upgrades |
| `src/pages/RenovationLoans.jsx` | No longer routed — content moved to BlogPost; redirects to /protips/renovation-loans |

---

## Open Follow-Up Items

1. **Sitemap update:** The dynamic sitemap function should be updated to include `/pricing`, `/remodeling-brandon-ms`, and the 4 new `/protips/<slug>` URLs. Remove deprecated URLs.
2. **Google Search Console:** Resubmit sitemap after update to reflect consolidated URL structure.
3. **Internal link audit:** Other pages may still link to old URLs via `createPageUrl()` — the redirects handle this, but direct links should be updated in a future pass.
4. **Deprecated file cleanup:** The 8 deprecated page files could be deleted once confirmed no longer needed.
5. **ProTips listing:** The 4 migrated guides will automatically appear in the ProTips listing since they're BlogPost records with `published: true`.