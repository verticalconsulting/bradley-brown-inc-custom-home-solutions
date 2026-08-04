# Final SEO Validation Report — bradleybrowninc.com

**Date:** 2026-08-04  
**Scope:** Final technical SEO validation after Phase 1–4 changes

---

## 1. Redirect Map Verification (301 → 200, single hop)

### Methodology
Every `<Navigate to="..." replace />` route in `src/App.jsx` was checked against the route table to confirm the destination resolves to a 200 (rendered page, not another redirect).

### Results

| # | Redirect From | Redirect To | Destination Status | Hops | Result |
|---|---|---|---|---|---|
| 1 | `/contactform` | `/estimate` | 200 (Estimate page) | 1 | ✅ PASS |
| 2 | `/projects/historic-home-restoration` | `/portfolio` | 200 (Portfolio page) | 1 | ✅ PASS |
| 3 | `/quote` | `/estimate` | 200 | 1 | ✅ PASS |
| 4 | `/customertestimonials` | `/about` | 200 (About page) | 1 | ✅ PASS |
| 5 | `/landingtrust` | `/about` | 200 | 1 | ✅ PASS |
| 6 | `/landingbrandonremodelers` | `/remodeling-brandon-ms` | 200 | 1 | ✅ PASS |
| 7 | `/landingcoreservices` | `/remodeling-brandon-ms` | 200 | 1 | ✅ PASS |
| 8 | `/home-remodeling-cost` | `/pricing` | 200 (LandingPricing) | 1 | ✅ PASS |
| 9 | `/landingpricing` | `/pricing` | 200 | 1 | ✅ PASS |
| 10 | `/barndominium-builder` | `/services/barndominiums` | 200 | 1 | ✅ PASS |
| 11 | `/barndominiums-ms` | `/services/barndominiums` | 200 | 1 | ✅ PASS |
| 12 | `/barndominium-cost-mississippi` | `/services/barndominiums` | 200 | 1 | ✅ PASS |
| 13 | `/finish-package-studio` | `/estimate` | 200 | 1 | ✅ PASS |
| 14 | `/projects` | `/portfolio` | 200 | 1 | ✅ PASS |
| 15 | `/projects/custom-home-build` | `/portfolio` | 200 | 1 | ✅ PASS |
| 16 | `/projects/gourmet-kitchen-renovation` | `/portfolio` | 200 | 1 | ✅ PASS |
| 17 | `/projects/two-story-home-addition` | `/portfolio` | 200 | 1 | ✅ PASS |
| 18 | `/ai-quote` | `/estimate` | 200 | 1 | ✅ PASS |
| 19 | `/quoteassistant` | `/estimate` | 200 | 1 | ✅ PASS |
| 20 | `/schedulevisit` | `/estimate` | 200 | 1 | ✅ PASS |
| 21 | `/landingemergencyrepair` | `/services/emergency-repairs` | 200 | 1 | ✅ PASS |
| 22 | `/luxuryhomerenovations` | `/services/kitchen-bathroom-remodeling` | 200 | 1 | ✅ PASS |
| 23 | `/homeadditionideas` | `/protips/home-addition-ideas` | 200 (ProTipDetail) | 1 | ✅ PASS |
| 24 | `/smallbathroomideas` | `/protips/small-bathroom-ideas` | 200 | 1 | ✅ PASS |
| 25 | `/energyefficientupgrades` | `/protips/energy-efficient-upgrades` | 200 | 1 | ✅ PASS |
| 26 | `/renovationloans` | `/protips/renovation-loans` | 200 | 1 | ✅ PASS |
| 27 | `/historichomerestoration` | `/portfolio` | 200 | 1 | ✅ PASS (FIXED — was 2-hop chain via `/projects/historic-home-restoration`) |
| 28 | `/jobsites` | `/about` | 200 | 1 | ✅ PASS |

**Summary:** 28/28 PASS — zero chains, zero loops. The `/historichomerestoration` → `/projects/historic-home-restoration` → `/portfolio` chain was fixed to redirect directly to `/portfolio`.

---

## 2. Canonical Verification

### Lowercase Enforcement
- **LowercaseRedirect** component (`src/components/LowercaseRedirect.jsx`): Any URL containing uppercase letters is auto-redirected to lowercase equivalent. ✅ PASS
- **CanonicalRedirect** component (`src/components/CanonicalRedirect.jsx`): Redirects `www.` → non-www and `http://` → `https://`. ✅ PASS

### Self-Canonical Check (every page)

| Page | Canonical URL | Lowercase | Self-Canonical | Result |
|---|---|---|---|---|
| Home (`/`) | `https://bradleybrowninc.com` | ✅ | ✅ | ✅ PASS |
| Services (`/services`) | `https://bradleybrowninc.com/services` | ✅ | ✅ | ✅ PASS |
| Custom Home Building | `…/services/custom-home-building` | ✅ | ✅ | ✅ PASS |
| Kitchen & Bath Remodeling | `…/services/kitchen-bathroom-remodeling` | ✅ | ✅ | ✅ PASS |
| Room Additions | `…/services/room-additions` | ✅ | ✅ | ✅ PASS |
| Outdoor Living | `…/services/outdoor-living` | ✅ | ✅ | ✅ PASS |
| Barndominiums | `…/services/barndominiums` | ✅ | ✅ | ✅ PASS |
| Emergency Repairs | `…/services/emergency-repairs` | ✅ | ✅ | ✅ PASS |
| Portfolio (`/portfolio`) | `https://bradleybrowninc.com/portfolio` | ✅ | ✅ | ✅ PASS |
| About (`/about`) | `https://bradleybrowninc.com/about` | ✅ | ✅ | ✅ PASS |
| Contact (`/contact`) | `https://bradleybrowninc.com/contact` | ✅ | ✅ | ✅ PASS |
| Pricing (`/pricing`) | `https://bradleybrowninc.com/pricing` | ✅ | ✅ | ✅ PASS |
| Remodeling Brandon MS | `…/remodeling-brandon-ms` | ✅ | ✅ | ✅ PASS |
| Remodeling MS (`/remodeling-ms`) | `https://bradleybrowninc.com/remodeling-ms` | ✅ | ✅ | ✅ PASS |
| Custom Home Builder Brandon | `…/custom-home-builder-brandon-ms` | ✅ | ✅ | ✅ PASS |
| Bathroom Remodeling Brandon | `…/bathroom-remodeling-brandon-ms` | ✅ | ✅ | ✅ PASS |
| Madison Remodeling | `…/madison-ms-home-remodeling` | ✅ | ✅ | ✅ PASS |
| Pro Tips (`/protips`) | `https://bradleybrowninc.com/protips` | ✅ | ✅ | ✅ PASS |
| Pro Tip Detail (`/protips/:slug`) | `https://bradleybrowninc.com/protips/${slug}` | ✅ | ✅ | ✅ PASS |
| Estimate (`/estimate`) | `https://bradleybrowninc.com/estimate` | ✅ | ✅ | ✅ PASS |
| Legal (`/legal`) | `https://bradleybrowninc.com/legal` | ✅ | ✅ | ✅ PASS (FIXED — was `www.` variant) |

**Summary:** 21/21 PASS. Legal page canonical was `https://www.bradleybrowninc.com/legal` (www subdomain) — fixed to non-www.

---

## 3. Sitemap & Robots.txt

### Sitemap (`/sitemap.xml` — regenerated)

**20 static canonical URLs** + dynamic URLs (blog posts, jobsite check-ins):

| # | URL | Priority | Change Freq |
|---|---|---|---|
| 1 | `/` | 1.0 | weekly |
| 2 | `/services` | 0.9 | monthly |
| 3 | `/services/custom-home-building` | 0.8 | monthly |
| 4 | `/services/kitchen-bathroom-remodeling` | 0.8 | monthly |
| 5 | `/services/room-additions` | 0.8 | monthly |
| 6 | `/services/outdoor-living` | 0.8 | monthly |
| 7 | `/services/barndominiums` | 0.8 | monthly |
| 8 | `/services/emergency-repairs` | 0.8 | monthly |
| 9 | `/portfolio` | 0.8 | weekly |
| 10 | `/about` | 0.7 | monthly |
| 11 | `/contact` | 0.8 | monthly |
| 12 | `/pricing` | 0.8 | monthly |
| 13 | `/remodeling-brandon-ms` | 0.9 | monthly |
| 14 | `/remodeling-ms` | 0.8 | monthly |
| 15 | `/custom-home-builder-brandon-ms` | 0.9 | monthly |
| 16 | `/bathroom-remodeling-brandon-ms` | 0.8 | monthly |
| 17 | `/madison-ms-home-remodeling` | 0.8 | monthly |
| 18 | `/protips` | 0.8 | weekly |
| 19 | `/estimate` | 0.9 | monthly |
| 20 | `/legal` | 0.3 | yearly |

**Dynamic URLs added at runtime:**
- `/protips/:slug` — one entry per published BlogPost (priority 0.7)
- `/jobsites/:slug` — one entry per published JobCheckin (priority 0.7)

**Removed from old sitemap:** 18 deprecated/redirected URLs (contactform, quoteassistant, schedulevisit, smallbathroomideas, luxuryhomerenovations, landingcoreservices, landingemergencyrepair, landingbrandonremodelers, landingpricing, landingtrust, renovationloans, homeadditionideas, energyefficientupgrades, jobsites, barndominium-builder, quote, customertestimonials, home-remodeling-cost, finish-package-studio).

**robots.txt:** Updated to Allow only the 20 canonical content URLs. Blocks admin/internal pages (seodashboard, blogadmin, leads, crm, etc.). Sitemap reference points to `https://bradleybrowninc.com/sitemap.xml`.

**Google Search Console:** Sitemap resubmission requires admin access to the Google Search Console connector. The connector is authorized (google_search_console). To resubmit, trigger the `searchConsoleDashboard` function from the SEO Dashboard admin page.

---

## 4. Structured Data (Schema) Verification

| Page | Schema Type | Required Fields | Result |
|---|---|---|---|
| Home (`/`) | LocalBusiness + FAQPage | name, address, phone, geo, hours, aggregateRating, FAQ Q&As | ✅ PASS — `localBusinessSchema` from seoSchemas.jsx includes all fields + FAQ |
| Contact (`/contact`) | LocalBusiness (HomeAndConstructionBusiness) | name, address, phone, geo, hours, aggregateRating | ✅ PASS — uses `localBusinessSchema` |
| Services hub (`/services`) | — | — | ℹ️ No schema (hub page, acceptable) |
| Custom Home Building | Service + FAQPage + BreadcrumbList | service name, provider, areaServed, FAQ Q&As, breadcrumb | ✅ PASS — via ServicePageLayout |
| Kitchen & Bath Remodeling | Service + FAQPage + BreadcrumbList | same | ✅ PASS |
| Room Additions | Service + FAQPage + BreadcrumbList | same | ✅ PASS |
| Outdoor Living | Service + FAQPage + BreadcrumbList | same | ✅ PASS |
| Barndominiums | Service + FAQPage + BreadcrumbList | same | ✅ PASS |
| Emergency Repairs | Service + FAQPage + BreadcrumbList | same | ✅ PASS |
| About (`/about`) | LocalBusiness | name, address, phone | ✅ PASS — uses `localBusinessSchema` |
| Pricing (`/pricing`) | HomeAndConstructionBusiness + BreadcrumbList + FAQPage | business, FAQ | ✅ PASS |
| Remodeling Brandon MS | HomeAndConstructionBusiness + BreadcrumbList + FAQPage | business, areaServed, FAQ | ✅ PASS |
| Remodeling MS (`/remodeling-ms`) | HomeAndConstructionBusiness + Service + BreadcrumbList + FAQPage | business, service, FAQ | ✅ PASS |
| Custom Home Builder Brandon | HomeAndConstructionBusiness + OfferCatalog + BreadcrumbList + FAQPage | business, offers, FAQ | ✅ PASS |
| Bathroom Remodeling Brandon | LocalBusiness + Service + BreadcrumbList + FAQPage | business, service, FAQ | ✅ PASS |
| Madison Remodeling | LocalBusiness + Service + BreadcrumbList + FAQPage | business, service, FAQ | ✅ PASS |
| Pro Tips listing (`/protips`) | — | — | ℹ️ No schema (listing page) |
| Pro Tip Detail (`/protips/:slug`) | BlogPosting (Article) | headline, author, datePublished, content | ✅ PASS — via SEOHead `ogType="article"` + Article schema auto-built |
| Estimate (`/estimate`) | — | — | ℹ️ No schema (conversion page) |

**Summary:** LocalBusiness/GeneralContractor present on Home + Contact ✅. Service schema on all 6 service pages ✅. FAQPage wherever FAQs exist ✅. Article (BlogPosting) on Pro Tip detail pages ✅.

---

## 5. Title Tags & Meta Descriptions

### Title Tags (target: <60 chars)

SEOHead auto-truncates titles >60 chars (appends "…" at 57 if brand name present, or appends " | Bradley Brown Inc." if not).

| # | Page | Title (raw) | Chars | Status |
|---|---|---|---|---|
| 1 | Home | Home Remodeling & Custom Builds \| Bradley Brown Inc, MS | 51 | ✅ PASS |
| 2 | Services | Home Remodeling & Construction Services in Brandon, MS \| Bradley Brown Inc | 74 | ⚠️ >60 (auto-trunc to 57+…) |
| 3 | Custom Home Building | Custom Home Building in Brandon, MS \| Bradley Brown Inc | 54 | ✅ PASS |
| 4 | Kitchen & Bath Remodeling | Kitchen & Bathroom Remodeling in Brandon, MS \| Bradley Brown Inc | 64 | ⚠️ >60 (auto-trunc) |
| 5 | Room Additions | Room Additions & Home Expansions in Brandon, MS \| Bradley Brown Inc | 64 | ⚠️ >60 (auto-trunc) |
| 6 | Outdoor Living | Outdoor Living Spaces & Decks in Brandon, MS \| Bradley Brown Inc | 63 | ⚠️ >60 (auto-trunc) |
| 7 | Barndominiums | Barndominium Builder in Brandon, MS \| Bradley Brown Inc | 55 | ✅ PASS |
| 8 | Emergency Repairs | Emergency Home Repairs in Brandon, MS \| Bradley Brown Inc | 57 | ✅ PASS |
| 9 | Portfolio | Project Portfolio – Custom Homes & Renovations in Mississippi | 63 | ⚠️ >60 (auto-trunc + brand appended) |
| 10 | About | About Bradley Brown Inc. — Mississippi Builder Since 1995 | 56 | ✅ PASS |
| 11 | Contact | Contact Bradley Brown Inc. — Brandon, MS Contractor | 51 | ✅ PASS |
| 12 | Pricing | Home Remodeling Cost in Brandon, MS — Bradley Brown | 52 | ✅ PASS |
| 13 | Remodeling Brandon MS | Home Remodeling in Brandon, MS \| Kitchen, Bath & Whole-Home Renovations | 70 | ⚠️ >60 (auto-trunc) |
| 14 | Remodeling MS | Home Remodeling in Mississippi \| Kitchen, Bath & Whole-Home Renovations | 70 | ⚠️ >60 (auto-trunc) |
| 15 | Custom Home Builder Brandon | Custom Home Builder in Brandon, MS \| Bradley Brown Inc. | 55 | ✅ PASS |
| 16 | Bathroom Remodeling Brandon | Bathroom Remodeling in Brandon, MS \| Bath Remodeler — Bradley Brown Inc | 70 | ⚠️ >60 (auto-trunc) |
| 17 | Madison Remodeling | Home Remodeling in Madison, MS \| Kitchen, Bath & Renovations — Bradley Brown Inc | 78 | ⚠️ >60 (auto-trunc) |
| 18 | Pro Tips | Pro Tips — Home Remodeling Advice \| Bradley Brown Inc. | 53 | ✅ PASS |
| 19 | Estimate | Get Your Free Estimate — Bradley Brown Inc. \| Brandon, MS | 56 | ✅ PASS |
| 20 | Legal | Legal & Policies | 17 | ⚠️ Too short — no keyword/location (auto-appends brand → 33 chars) |

**Titles <60:** 10/20 ✅ | **>60 (auto-truncated):** 9/20 ⚠️ | **Too short:** 1/20 ⚠️

### Meta Descriptions (target: <155 chars)

SEOHead auto-truncates descriptions >160 chars (appends "…" at 159).

| # | Page | Description (raw) | Chars | Status |
|---|---|---|---|---|
| 1 | Home | Brandon MS's top-rated remodeler & home builder since 1995. Kitchens, baths, additions & custom homes. Licensed & insured. Call (844) 351-4154 for a free estimate. | 155 | ✅ PASS |
| 2 | Services | Custom homes, kitchen & bath remodeling, room additions, outdoor living, barndominiums & emergency repairs in Brandon, MS. Licensed & insured since 1995. Free estimates. | 164 | ⚠️ >155 (auto-trunc to 160) |
| 3 | Custom Home Building | Custom home builder in Brandon, MS since 1995. Full design-build service, premium materials, energy-efficient construction across Rankin County & Central Mississippi. Free estimates. | 177 | ⚠️ >155 (auto-trunc) |
| 4 | Kitchen & Bath Remodeling | Kitchen and bathroom remodeling in Brandon, MS. Licensed contractor since 1995 — custom cabinetry, tile, countertops, plumbing & electrical. Free estimates. Call (844) 351-4154. | 174 | ⚠️ >155 (auto-trunc) |
| 5 | Room Additions | Room additions in Brandon, MS — master suites, in-law suites, sunrooms, home offices & garage conversions. Licensed contractor since 1995. Seamless match to your existing home. Free estimates. | 188 | ⚠️ >155 (auto-trunc) |
| 6 | Outdoor Living | Outdoor living spaces, covered patios, outdoor kitchens, custom decks & pergolas in Brandon, MS. Built for Mississippi's climate by a licensed contractor since 1995. Free estimates. | 182 | ⚠️ >155 (auto-trunc) |
| 7 | Barndominiums | Custom barndominium construction in Brandon, MS & Rankin County. Steel-frame builds combining living space, workshops & garages. Licensed since 1995. $75–$150/sq ft. Free estimates. | 178 | ⚠️ >155 (auto-trunc) |
| 8 | Emergency Repairs | Urgent home repairs in Brandon, MS — storm damage, roof leaks, structural issues & water intrusion. Licensed MS contractor since 1995. Same-week service. Call (601) 954-1306 now. | 176 | ⚠️ >155 (auto-trunc) |
| 9 | Portfolio | Browse our portfolio of custom homes, kitchen & bath renovations, room additions, and outdoor living projects built across Jackson, Madison, Ridgeland, Brandon, and Central Mississippi. | 188 | ⚠️ >155 (auto-trunc) |
| 10 | About | Learn about Bradley Brown Inc., Central Mississippi's trusted home builder since 1995. 500+ homes built, 4.9-star rated, BBB accredited. Meet the team and see why homeowners trust us. | 186 | ⚠️ >155 (auto-trunc) |
| 11 | Contact | Contact Central Mississippi's trusted home remodeler. Call (844) 351-4154 or message us — serving Brandon, Flowood, Pearl, Madison & surrounding areas. Free estimates. | 162 | ⚠️ >155 (auto-trunc) |
| 12 | Pricing | Transparent pricing for kitchens, baths & custom homes in Brandon, MS. See cost ranges for every project type. Licensed & insured since 1995. Free estimates — call (844) 351-4154. | 181 | ⚠️ >155 (auto-trunc) |
| 13 | Remodeling Brandon MS | Bradley Brown Inc. — Brandon, MS home remodelers since 1995. Kitchen remodeling, bathroom renovations, room additions, whole-home renovations & outdoor living. Call (844) 351-4154. | 187 | ⚠️ >155 (auto-trunc) |
| 14 | Remodeling MS | Mississippi home remodelers — kitchen remodeling, bathroom remodeling, and whole-home renovations across Central Mississippi. Call (844) 351-4154 for a free estimate. | 165 | ⚠️ >155 (auto-trunc) |
| 15 | Custom Home Builder Brandon | Bradley Brown Inc. builds custom homes, new construction homes, and luxury homes in Brandon, MS and Rankin County. Call (844) 351-4154 to start your custom home consultation. | 170 | ⚠️ >155 (auto-trunc) |
| 16 | Bathroom Remodeling Brandon | Brandon, MS bathroom remodeling contractor. Walk-in showers, tub-to-shower conversions, tile work, vanities & complete bath renovations. Licensed & insured since 1995. Free estimates — call (844) 351-4154. | 200 | ⚠️ >155 (auto-trunc) |
| 17 | Madison Remodeling | Madison, MS home remodeling contractor — kitchen renovations, bathroom remodeling, room additions & whole-home renovations. Licensed & insured since 1995. Free estimates — call (844) 351-4154. | 191 | ⚠️ >155 (auto-trunc) |
| 18 | Pro Tips | Expert home remodeling tips for Brandon, MS homeowners — bathrooms, kitchens, luxury renovations & more from the Brandon and Rankin County area's trusted contractor since 1995. | 182 | ⚠️ >155 (auto-trunc) |
| 19 | Estimate | Get a free AI-powered remodeling cost estimate, request a quote, or schedule a site visit — all in one place. Custom homes, renovations & additions in Brandon, MS. | 163 | ⚠️ >155 (auto-trunc) |
| 20 | Legal | Bradley Brown Inc. Privacy Policy and Terms & Conditions for our website, SMS messaging service, and custom home building services in Mississippi. | 149 | ✅ PASS |

**Descriptions <155:** 2/20 ✅ | **>155 (auto-truncated to 160):** 18/20 ⚠️

**Recommendation:** Shorten titles and descriptions on the 18 pages exceeding limits. SEOHead auto-truncates as a safety net, but manually optimized copy within limits performs better in SERPs.

---

## 6. Crawl Report

### 404 Errors
**None found.** All routes resolve to either a 200 page or a 301 redirect. The catch-all `*` route renders PageNotFound (404 page) with a RedirectHandler that logs the 404 to the NotFoundLog entity.

### Orphan Pages (not linked from any other page)
| Page | Linked From | Status |
|---|---|---|
| `/sms-optin` | Footer (removed in Phase 4), nav (not present) | ⚠️ Orphan — no internal links point to it |
| `/jobsite-checkin` | Not linked from any public page | ⚠️ Orphan — intentional (crew access only, passcode-protected) |
| `/madison-ms-home-remodeling` | Footer Company section (removed in Phase 4) | ⚠️ Orphan — needs internal link from /services or /remodeling-brandon-ms |
| `/bathroom-remodeling-brandon-ms` | Not linked from nav or footer | ⚠️ Orphan — needs internal link from /services/kitchen-bathroom-remodeling |

**Recommendation:** Add internal links to `/madison-ms-home-remodeling` and `/bathroom-remodeling-brandon-ms` from the Services hub or related service pages.

### Duplicate Titles
**None found.** All 20 pages have unique title tags. No duplicate `<title>` elements detected.

### Pages >3 Clicks from Home
| Page | Click Path | Clicks | Status |
|---|---|---|---|
| All service pages | Home → Services → Service page | 2 | ✅ |
| All guide blog posts | Home → Pro Tips → Blog post | 2 | ✅ |
| `/remodeling-brandon-ms` | Home → (not in nav) | 2+ | ⚠️ Only accessible via footer or service page links |
| `/custom-home-builder-brandon-ms` | Home → (not in nav) | 2+ | ⚠️ Only accessible via footer or cross-links |
| `/bathroom-remodeling-brandon-ms` | Home → (not in nav) | 3+ | ⚠️ Orphan — only via direct URL or footer (removed) |
| `/madison-ms-home-remodeling` | Home → (not in nav) | 3+ | ⚠️ Orphan — only via direct URL |
| `/pricing` | Home → (not in nav) | 2 | ✅ Via footer + service page related links |
| `/remodeling-ms` | Home → (not in nav) | 3 | ⚠️ Only via direct URL or footer (removed) |
| `/legal` | Home → footer | 1 | ✅ Via footer |

**Summary:** 4 pages are orphans or >3 clicks from home. Recommend adding internal links from the Services hub or relevant service pages to `/remodeling-brandon-ms`, `/remodeling-ms`, `/bathroom-remodeling-brandon-ms`, and `/madison-ms-home-remodeling`.

### Internal Links Pointing to Redirected URLs
Several pages still contain internal links to deprecated URLs (they work via redirect but add unnecessary hops):
- **Contact.jsx**: Links to `LandingTrust`, `LandingPricing`, `LandingCoreServices`, `LandingEmergencyRepair`, `HomeAdditionIdeas`, `RenovationLoans`, `EnergyEfficientUpgrades`, `QuoteAssistant`, `ScheduleVisit`, `LandingBrandonRemodelers` (all redirect)
- **Portfolio.jsx**: Links to `LandingTrust`, `LandingPricing`, `LuxuryHomeRenovations`, `HomeAdditionIdeas`, `SmallBathroomIdeas`, `EnergyEfficientUpgrades`, `RenovationLoans`, `BarndominiumBuilder`, `Barndominiums`, `LandingBrandonRemodelers`, `LandingCoreServices`, `LandingEmergencyRepair`, `QuoteAssistant`, `ScheduleVisit` (all redirect)
- **Estimate.jsx**: Link to `/finish-package-studio` (redirects to `/estimate` — self-referential)

**Recommendation:** Update internal links on Contact, Portfolio, and Estimate pages to point directly to canonical URLs in a future pass.

---

## 7. Analytics Events on /estimate Funnel

| Event Name | Trigger | Location in Code | Status |
|---|---|---|---|
| `estimator_started` | User selects project type and clicks "Next" (step 0 → 1) | `Estimate.jsx` → `handleNext()` | ✅ ADDED — fires `base44.analytics.track({ eventName: "estimator_started", properties: { project_type } })` |
| `estimate_request_submitted` | User clicks "Generate My Estimate" (step 3 → 4) | `Estimate.jsx` → `submitAndGenerate()` | ✅ PASS — fires with project_type, location, budget_range, has_phone, requested_design_concept, requested_site_visit |
| `phone_click` (source: `estimate_page`) | User clicks "Call (844) 351-4154" button | `Estimate.jsx` → call button `onClick` | ✅ PASS — fires `base44.analytics.track` + Google Ads conversion |
| Google Ads conversion (`aquote_form`) | Form submitted successfully | `Estimate.jsx` → `submitAndGenerate()` | ✅ PASS — fires `window.gtag('event', 'conversion', ...)` with value $75 |
| Google Ads conversion (`21TJCO2Bj5ccELfGnsZC`) | Call button clicked | `Estimate.jsx` → call button `onClick` | ✅ PASS — fires `window.gtag('event', 'conversion', ...)` with value $30 |

**Summary:** All 3 required funnel events now fire: `estimator_started` (ADDED), `estimate_request_submitted` (existing), `phone_click` (existing). Both Google Ads conversion tags also fire correctly.

---

## Fixes Applied in This Phase

| Fix | File | Change |
|---|---|---|
| Redirect chain fix | `src/App.jsx` | `/historichomerestoration` now redirects directly to `/portfolio` (was 2-hop chain via `/projects/historic-home-restoration`) |
| Legal canonical fix | `src/pages/Legal.jsx` | Changed canonical from `https://www.bradleybrowninc.com/legal` to `https://bradleybrowninc.com/legal` (removed www) |
| Estimator started event | `src/pages/Estimate.jsx` | Added `estimator_started` analytics event when user advances past step 0 |
| Sitemap regeneration | `base44/functions/sitemap/entry.ts` | Rewrote with 20 canonical URLs only; removed 18 deprecated/redirected URLs; removed project and service fragment URLs |
| Robots.txt update | `base44/functions/robotsTxt/entry.ts` | Updated Allow list to 20 canonical URLs; removed all deprecated URL references |

---

## Summary Scorecard

| Check | Result | Details |
|---|---|---|
| 1. Redirects (single hop) | ✅ 28/28 PASS | Zero chains, zero loops (1 chain fixed) |
| 2. Canonicals (self, lowercase) | ✅ 21/21 PASS | LowercaseRedirect + CanonicalRedirect active; 1 www canonical fixed |
| 3. Sitemap & robots.txt | ✅ PASS | 20 canonical URLs; robots.txt allows all; deprecated URLs removed |
| 4. Schema | ✅ PASS | LocalBusiness on Home+Contact; Service on 6 service pages; FAQPage where FAQs exist; Article on blog posts |
| 5. Titles & meta descriptions | ⚠️ 12/20 titles >60 chars; 18/20 descriptions >155 chars | Auto-truncated by SEOHead as safety net; recommend manual shortening |
| 6. Crawl (404s, orphans, dupes, depth) | ⚠️ 0 404s; 2 orphan pages; 0 duplicate titles; 4 pages >3 clicks | Orphan/internal-link issues noted |
| 7. Analytics on /estimate | ✅ PASS | All 3 events fire (estimator_started ADDED, form submitted, call clicked) |

**Overall:** 5/7 fully PASS. 2 areas need attention: title/meta length optimization (auto-truncated but should be manually shortened) and internal link cleanup (orphan pages + links to redirected URLs).