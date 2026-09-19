# Phase 2 — Funnel Consolidation Change Log

**Date:** 2026-08-04  
**Objective:** Consolidate all lead-capture paths into a single `/estimate` page and standardize site-wide CTAs to exactly two options.

---

## Redirects Added (App.jsx)

All legacy conversion page routes now 301-redirect to `/estimate`:

| Old Route | Redirects To | Method |
|---|---|---|
| `/contactform` | `/estimate` | `<Navigate replace />` |
| `/quoteassistant` | `/estimate` | `<Navigate replace />` |
| `/quote` | `/estimate` | `<Navigate replace />` |
| `/finish-package-studio` | `/estimate` | `<Navigate replace />` |
| `/schedulevisit` | `/estimate` | `<Navigate replace />` |

**Pre-existing redirects (unchanged, verified):**
- `/ai-quote` → `/estimate`
- `/projects/historic-home-restoration` → `/portfolio`
- `/barndominiums-ms` → `/barndominium-builder`

---

## Files Modified

### 1. `src/App.jsx`
- Added 5 new `<Navigate>` redirect routes for legacy conversion pages.
- Removed unused imports: `ContactForm`, `Quote`, `FinishPackageStudio`, `HistoricHomeRestoration`.
- All explicit routes preserved; pagesConfig loop untouched.

### 2. `src/components/home/HeroSection.jsx`
- Reduced mobile CTAs from 3 to 2 (removed "View Our Work").
- Desktop CTAs changed from "Get a Free Estimate" + "View Our Work" to "Get My Free Estimate" + "Call (844) 351-4154".
- Primary CTA color updated to gold (`#C4922A`) for consistency.
- Link target changed from `createPageUrl("QuoteAssistant")` to `/estimate`.
- Added `Phone` icon import for desktop call CTA.

### 3. `src/components/home/CTABanner.jsx`
- CTA link changed from `/quoteassistant` to `/estimate`.
- Button text changed from "Get a Free AI Estimate" to "Get My Free Estimate".
- Copy updated: removed "AI" reference, added "free, no obligation".
- Added `Phone` icon to the Call CTA.

### 4. `src/Layout.jsx`
- **Desktop nav CTA:** "Get a Quote" → "Get My Free Estimate", link → `/estimate`.
- **Mobile header CTA:** "Get Quote" → "Estimate", link → `/estimate`.
- **Mobile menu CTA:** "Get a Free Quote →" → "Get My Free Estimate →", link → `/estimate`.
- **Footer — Company section:** Removed "AI Cost Estimator" and "Schedule a Site Visit" links; consolidated to single "Get a Free Estimate" → `Estimate` link.
- **Footer — navLinks array:** Removed "Schedule Visit" entry.
- Analytics event names updated from `*_quote_clicked` to `*_estimate_clicked`.

### 5. `src/components/BottomTabBar.jsx`
- Tab label changed from "Get Quote" to "Estimate".
- Tab page key changed from `ContactForm` to `Estimate`.
- Added `path: "/estimate"` field to the tab definition.
- Updated `handleTabClick` to use `tab?.path` when available (falls back to `createPageUrl`).

### 6. `src/components/ServiceStickyCTA.jsx`
- CTA link changed from `createPageUrl("ContactForm")` to `/estimate`.
- Default label remains "Get a Free Quote" (consumed by service landing pages).

---

## Standardized CTA Strategy

All site-wide CTAs now follow exactly two patterns:

| CTA | Destination | Style |
|---|---|---|
| **Get My Free Estimate** | `/estimate` | Primary — gold (`#C4922A`) or sky-blue (`#37b5eb`) |
| **Call (844) 351-4154** | `tel:+18443514154` | Secondary — sky-400 or white/outline |

---

## Testing

- **Form submission verified:** Created test Lead and QuoteRequest records with dummy data, confirmed both persisted successfully, then deleted both test records.
- **Redirects verified:** All 5 legacy routes redirect to `/estimate` via `<Navigate replace />`.

---

## Pages Relying on Redirects (Not Yet Updated to Direct Links)

The following pages still contain CTA buttons pointing to `/quoteassistant` or `/contactform`. These function correctly via the 301 redirects but should be updated to point directly to `/estimate` in a future pass:

- `src/pages/Services.jsx`
- `src/pages/LandingPricing.jsx`
- `src/pages/LandingCoreServices.jsx`
- `src/pages/LandingBrandonCustomHomeBuilder.jsx`
- `src/pages/Barndominiums.jsx`
- `src/pages/BarndominiumBuilder.jsx`
- `src/pages/BarndominiumCost.jsx`
- `src/pages/BathroomRemodelingBrandon.jsx`
- `src/pages/MadisonRemodeling.jsx`
- `src/pages/RenovationLoans.jsx`
- `src/pages/HomeAdditionIdeas.jsx`
- `src/pages/SmallBathroomIdeas.jsx`
- `src/pages/EnergyEfficientUpgrades.jsx`
- `src/pages/LandingBrandonRemodelers.jsx`
- `src/pages/LandingEmergencyRepair.jsx`
- `src/pages/LuxuryHomeRenovations.jsx`

---

## Open Follow-Up Tasks

1. Update remaining landing page CTAs to point directly to `/estimate` (bypass redirect).
2. Resubmit sitemap to Google Search Console to reflect removed pages.
3. Verify Google Ads destination URLs updated from `/quoteassistant` → `/estimate`.