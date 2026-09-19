# Final Technical SEO Validation Report — bradleybrowninc.com

**Date:** 2026-08-04 (Phase 6 final)  
**Scope:** Complete site-wide technical SEO audit after Phases 1–6

---

## 1. Redirect Map — 301 Hop Verification

Every `<Navigate to="..." replace />` in `src/App.jsx` was traced to its destination route. All destinations are 200-rendered pages — none chain to another redirect.

| # | Redirect From | Destination | Hops | Status |
|---|---|---|---|---|
| 1 | `/contactform` | `/estimate` | 1 | ✅ PASS |
| 2 | `/projects/historic-home-restoration` | `/portfolio` | 1 | ✅ PASS |
| 3 | `/quote` | `/estimate` | 1 | ✅ PASS |
| 4 | `/customertestimonials` | `/about` | 1 | ✅ PASS |
| 5 | `/landingtrust` | `/about` | 1 | ✅ PASS |
| 6 | `/landingbrandonremodelers` | `/remodeling-brandon-ms` | 1 | ✅ PASS |
| 7 | `/landingcoreservices` | `/remodeling-brandon-ms` | 1 | ✅ PASS |
| 8 | `/home-remodeling-cost` | `/pricing` | 1 | ✅ PASS |
| 9 | `/landingpricing` | `/pricing` | 1 | ✅ PASS |
| 10 | `/barndominium-builder` | `/services/barndominiums` | 1 | ✅ PASS |
| 11 | `/barndominiums-ms` | `/services/barndominiums` | 1 | ✅ PASS |
| 12 | `/barndominium-cost-mississippi` | `/services/barndominiums` | 1 | ✅ PASS |
| 13 | `/finish-package-studio` | `/estimate` | 1 | ✅ PASS |
| 14 | `/projects` | `/portfolio` | 1 | ✅ PASS |
| 15 | `/projects/custom-home-build` | `/portfolio` | 1 | ✅ PASS |
| 16 | `/projects/gourmet-kitchen-renovation` | `/portfolio` | 1 | ✅ PASS |
| 17 | `/projects/two-story-home-addition` | `/portfolio` | 1 | ✅ PASS |
| 18 | `/ai-quote` | `/estimate` | 1 | ✅ PASS |
| 19 | `/quoteassistant` | `/estimate` | 1 | ✅ PASS |
| 20 | `/schedulevisit` | `/estimate` | 1 | ✅ PASS |
| 21 | `/landingemergencyrepair` | `/services/emergency-repairs` | 1 | ✅ PASS |
| 22 | `/luxuryhomerenovations` | `/services/kitchen-bathroom-remodeling` | 1 | ✅ PASS |
| 23 | `/homeadditionideas` | `/protips/home-addition-ideas` | 1 | ✅ PASS |
| 24 | `/smallbathroomideas` | `/protips/small-bathroom-ideas` | 1 | ✅ PASS |
| 25 | `/energyefficientupgrades` | `/protips/energy-efficient-upgrades` | 1 | ✅ PASS |
| 26 | `/renovationloans` | `/protips/renovation-loans` | 1 | ✅ PASS |
| 27 | `/historichomerestoration` | `/portfolio` | 1 | ✅ PASS |
| 28 | `/jobsites` | `/about` | 1 | ✅ PASS |

**Result: 28/28 PASS — zero chains, zero loops.** All destinations resolve to rendered 200 pages. No redirect target is itself a redirect source.

---

## 2. Canonical Verification

### Enforcement Mechanisms

| Mechanism | File | Behavior |
|---|---|---|
| LowercaseRedirect | `src/components/LowercaseRedirect.jsx` | Any URL containing uppercase → 301-equivalent to lowercase |
| CanonicalRedirect | `src/components/CanonicalRedirect.jsx` | `www.` → non-www, `http://` → `https://` (signals 301 to prerender services) |
| SEOHead canonical | `src/components/SEOHead.jsx` | Every page emits `<link rel="canonical">` from the page's canonical prop |

### Self-Canonical Check

| # | Page | Canonical URL | Lowercase | Non-WWW | HTTPS | Self-Canonical |
|---|---|---|---|---|---|---|
| 1 | Home (`/`) | `https://bradleybrowninc.com` | ✅ | ✅ | ✅ | ✅ |
| 2 | Services (`/services`) | `https://bradleybrowninc.com/services` | ✅ | ✅ | ✅ | ✅ |
| 3 | Custom Home Building | `…/services/custom-home-building` | ✅ | ✅ | ✅ | ✅ |
| 4 | Kitchen & Bath Remodeling | `…/services/kitchen-bathroom-remodeling` | ✅ | ✅ | ✅ | ✅ |
| 5 | Room Additions | `…/services/room-additions` | ✅ | ✅ | ✅ | ✅ |
| 6 | Outdoor Living | `…/services/outdoor-living` | ✅ | ✅ | ✅ | ✅ |
| 7 | Barndominiums | `…/services/barndominiums` | ✅ | ✅ | ✅ | ✅ |
| 8 | Emergency Repairs | `…/services/emergency-repairs` | ✅ | ✅ | ✅ | ✅ |
| 9 | Portfolio (`/portfolio`) | `https://bradleybrowninc.com/portfolio` | ✅ | ✅ | ✅ | ✅ |
| 10 | About (`/about`) | `https://bradleybrowninc.com/about` | ✅ | ✅ | ✅ | ✅ |
| 11 | Contact (`/contact`) | `https://bradleybrowninc.com/contact` | ✅ | ✅ | ✅ | ✅ |
| 12 | Pricing (`/pricing`) | `https://bradleybrowninc.com/pricing` | ✅ | ✅ | ✅ | ✅ |
| 13 | Remodeling Brandon MS | `…/remodeling-brandon-ms` | ✅ | ✅ | ✅ | ✅ |
| 14 | Remodeling MS (`/remodeling-ms`) | `https://bradleybrowninc.com/remodeling-ms` | ✅ | ✅ | ✅ | ✅ |
| 15 | Custom Home Builder Brandon | `…/custom-home-builder-brandon-ms` | ✅ | ✅ | ✅ | ✅ |
| 16 | Bathroom Remodeling Brandon | `…/bathroom-remodeling-brandon-ms` | ✅ | ✅ | ✅ | ✅ |
| 17 | Madison Remodeling | `…/madison-ms-home-remodeling` | ✅ | ✅ | ✅ | ✅ |
| 18 | Pro Tips (`/protips`) | `https://bradleybrowninc.com/protips` | ✅ | ✅ | ✅ | ✅ |
| 19 | Pro Tip Detail (`/protips/:slug`) | `https://bradleybrowninc.com/protips/${slug}` | ✅ | ✅ | ✅ | ✅ |
| 20 | Estimate (`/estimate`) | `https://bradleybrowninc.com/estimate` | ✅ | ✅ | ✅ | ✅ |
| 21 | Legal (`/legal`) | `https://bradleybrowninc.com/legal` | ✅ | ✅ | ✅ | ✅ |

**Result: 21/21 PASS.** All canonicals are lowercase, non-www, https, and self-referencing. Mixed-case URL requests are auto-redirected by `LowercaseRedirect`.

---

## 3. Sitemap & Robots.txt

### Sitemap (`/sitemap.xml`) — 20 Canonical Static URLs

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

**Dynamic URLs (added at runtime):**
- `/protips/:slug` — one per published BlogPost (priority 0.7)
- `/jobsites/:slug` — one per published JobCheckin (priority 0.7)

**No redirected or deprecated URLs in sitemap.** All 20 URLs resolve to 200 pages.

### Robots.txt

`Allow: /` (general) + explicit Allow for all 20 canonical content paths.  
`Disallow` for admin/internal pages: seodashboard, blogadmin, siteimages, conversiondashboard, leads, funnelanalysis, crm, tiktoksync, accountsettings, agentchat, thank-you, error, jobsite-checkin, sms-optin, projects/historic-home-restoration.  
Sitemap reference: `https://bradleybrowninc.com/sitemap.xml`

**Result: ✅ PASS.** All 20 sitemap URLs are allowed by robots.txt. No conflicts.

### Google Search Console Resubmission

The `google_search_console` connector is **authorized** (scopes: webmasters, webmasters.readonly). The `searchConsoleDashboard` backend function exists and can submit the sitemap. To resubmit: navigate to `/seodashboard` (admin) and trigger the sitemap submission action. This requires admin access.

---

## 4. Structured Data (Schema) Verification

### LocalBusiness / GeneralContractor

| Page | Schema Type | Required Fields Present | Status |
|---|---|---|---|
| Home (`/`) | HomeAndConstructionBusiness (via `localBusinessSchema` in `@graph`) | name, address, telephone, geo, openingHours, aggregateRating, hasCredential, areaServed, hasOfferCatalog | ✅ PASS |
| Contact (`/contact`) | HomeAndConstructionBusiness (via `localBusinessSchema`) | name, address, telephone, geo, openingHours, aggregateRating | ✅ PASS |
| About (`/about`) | HomeAndConstructionBusiness (via `localBusinessSchema`) | name, address, telephone | ✅ PASS |

### Service Schema

| # | Page | Service Schema | Provider | Area Served | Status |
|---|---|---|---|---|---|
| 1 | `/services/custom-home-building` | ✅ via ServicePageLayout | HomeAndConstructionBusiness | Brandon, MS & Central MS | ✅ PASS |
| 2 | `/services/kitchen-bathroom-remodeling` | ✅ via ServicePageLayout | HomeAndConstructionBusiness | Brandon, MS & Central MS | ✅ PASS |
| 3 | `/services/room-additions` | ✅ via ServicePageLayout | HomeAndConstructionBusiness | Brandon, MS & Central MS | ✅ PASS |
| 4 | `/services/outdoor-living` | ✅ via ServicePageLayout | HomeAndConstructionBusiness | Brandon, MS & Central MS | ✅ PASS |
| 5 | `/services/barndominiums` | ✅ via ServicePageLayout | HomeAndConstructionBusiness | Brandon, MS & Central MS | ✅ PASS |
| 6 | `/services/emergency-repairs` | ✅ via ServicePageLayout | HomeAndConstructionBusiness | Brandon, MS & Central MS | ✅ PASS |

**Note:** The task referenced "7 service pages." There are 6 dedicated service detail pages with Service schema. The `/services` hub page (Services.jsx) does **not** carry Service schema — it has no structured data. This is a minor gap; the hub page is an index/navigation page, not a service offering page, so the omission is acceptable but could be enhanced.

### FAQPage Schema

| Page | FAQ Count | Schema Source | Status |
|---|---|---|---|
| Home (`/`) | 6 Q&As | `homeFaqs` array → `faqPageSchema` in Home.jsx | ✅ PASS |
| Custom Home Building | Service-specific | `faqs` prop → ServicePageLayout schema | ✅ PASS |
| Kitchen & Bath Remodeling | Service-specific | `faqs` prop → ServicePageLayout schema | ✅ PASS |
| Room Additions | Service-specific | `faqs` prop → ServicePageLayout schema | ✅ PASS |
| Outdoor Living | Service-specific | `faqs` prop → ServicePageLayout schema | ✅ PASS |
| Barndominiums | Service-specific | `faqs` prop → ServicePageLayout schema | ✅ PASS |
| Emergency Repairs | Service-specific | `faqs` prop → ServicePageLayout schema | ✅ PASS |
| Bathroom Remodeling Brandon | 5 Q&As | Inline schema in page | ✅ PASS |
| Madison Remodeling | 3 Q&As | Inline schema in page | ✅ PASS |
| Remodeling Brandon MS | Q&As | Inline schema in page | ✅ PASS |
| Remodeling MS | Q&As | Inline schema in page | ✅ PASS |
| Pricing | Q&As | Inline schema in page | ✅ PASS |
| Custom Home Builder Brandon | Q&As | Inline schema in page | ✅ PASS |

### Homepage FAQPage Verbatim Verification (Phase 6)

The homepage FAQPage schema is built from the `homeFaqs` array in `HomeFAQ.jsx`. Each FAQ has a `schemaAnswer` (plain string) and an `answer` (JSX with links). The schema uses `f.schemaAnswer || f.answer`.

| # | Question | Schema Text Matches Rendered HTML? |
|---|---|---|
| Q1 | How much does a home remodel cost in Brandon, MS? | ✅ — `schemaAnswer` matches visible text (link anchors "free itemized estimate" and "pricing page" appear as plain words) |
| Q2 | Is Bradley Brown Inc licensed and insured in Mississippi? | ✅ — plain string answer, no links |
| Q3 | How long does a kitchen or bathroom remodel take in Brandon? | ✅ — `schemaAnswer` matches visible text (link anchors "kitchen remodeling" and "bathroom remodeling" as plain words) |
| Q4 | Do you handle storm damage and emergency home repairs? | ✅ — `schemaAnswer` matches visible text (tel link and "emergency repairs" as plain words) |
| Q5 | What areas near Brandon, MS do you serve? | ✅ — plain string answer, no links |
| Q6 | Can you help with financing a home renovation? | ✅ — `schemaAnswer` matches visible text (link anchors "free estimate" and "renovation loans guide" as plain words) |

**Result: 6/6 PASS — schema text matches rendered HTML verbatim.**

### FAQPage Duplication Check

No two pages share identical FAQPage question+answer entries. Homepage FAQs are Brandon-general ("How much does a home remodel cost in Brandon, MS?", "What areas near Brandon, MS do you serve?"). Service-page FAQs are service-specific ("How much does a bathroom remodel cost in Brandon, MS?", "How long does a kitchen remodel take?"). Question text differs on every page. **No duplicates found.** ✅ PASS

### Article Schema (Pro Tips)

| Page | Schema Type | Required Fields | Status |
|---|---|---|---|
| `/protips/:slug` | BlogPosting (via SEOHead `ogType="article"`) | headline, author, datePublished, dateModified, articleSection, articleBody (content) | ✅ PASS |
| `/protips/:slug` (how-to posts) | HowTo (additional, via Helmet) | name, step[] | ✅ PASS (conditional) |

The ProTipDetail page passes `ogType="article"` with a full `article` object to SEOHead, which auto-builds an `enhancedArticleSchema` (BlogPosting type). HowTo schema is added when the post title contains "how to" or has 3+ `##` headings. ✅ PASS

---

## 5. Title Tags & Meta Descriptions

### Title Tags (target: <60 chars, keyword + location + brand)

SEOHead auto-truncates titles >60 chars: if "Bradley Brown" is present, truncates to 57 chars + "…"; otherwise appends " | Bradley Brown Inc." and truncates.

| # | Page | Title (raw) | Chars | Keyword | Location | Brand | Status |
|---|---|---|---|---|---|---|---|
| 1 | Home | Home Remodeling & Custom Builds \| Bradley Brown Inc, MS | 51 | ✅ | ✅ MS | ✅ | ✅ PASS |
| 2 | Services | Home Remodeling & Construction Services in Brandon, MS \| Bradley Brown Inc | 74 | ✅ | ✅ | ✅ | ⚠️ >60 (auto-trunc) |
| 3 | Custom Home Building | Custom Home Building in Brandon, MS \| Bradley Brown Inc | 54 | ✅ | ✅ | ✅ | ✅ PASS |
| 4 | Kitchen & Bath Remodeling | Kitchen & Bathroom Remodeling in Brandon, MS \| Bradley Brown Inc | 64 | ✅ | ✅ | ✅ | ⚠️ >60 (auto-trunc) |
| 5 | Room Additions | Room Additions & Home Expansions in Brandon, MS \| Bradley Brown Inc | 64 | ✅ | ✅ | ✅ | ⚠️ >60 (auto-trunc) |
| 6 | Outdoor Living | Outdoor Living Spaces & Decks in Brandon, MS \| Bradley Brown Inc | 63 | ✅ | ✅ | ✅ | ⚠️ >60 (auto-trunc) |
| 7 | Barndominiums | Barndominium Builder in Brandon, MS \| Bradley Brown Inc | 55 | ✅ | ✅ | ✅ | ✅ PASS |
| 8 | Emergency Repairs | Emergency Home Repairs in Brandon, MS \| Bradley Brown Inc | 57 | ✅ | ✅ | ✅ | ✅ PASS |
| 9 | Portfolio | Project Portfolio – Custom Homes & Renovations in Mississippi | 63 | ✅ | ✅ MS | ❌ (auto-appended) | ⚠️ >60 (auto-trunc + brand) |
| 10 | About | About Bradley Brown Inc. — Mississippi Builder Since 1995 | 56 | ✅ | ✅ MS | ✅ | ✅ PASS |
| 11 | Contact | Contact Bradley Brown Inc. — Brandon, MS Contractor | 51 | ✅ | ✅ | ✅ | ✅ PASS |
| 12 | Pricing | Home Remodeling Cost in Brandon, MS — Bradley Brown | 52 | ✅ | ✅ | ✅ | ✅ PASS |
| 13 | Remodeling Brandon MS | Home Remodeling in Brandon, MS \| Kitchen, Bath & Whole-Home Renovations | 70 | ✅ | ✅ | ❌ (auto-appended) | ⚠️ >60 (auto-trunc) |
| 14 | Remodeling MS | Home Remodeling in Mississippi \| Kitchen, Bath & Whole-Home Renovations | 70 | ✅ | ✅ MS | ❌ (auto-appended) | ⚠️ >60 (auto-trunc) |
| 15 | Custom Home Builder Brandon | Custom Home Builder in Brandon, MS \| Bradley Brown Inc. | 55 | ✅ | ✅ | ✅ | ✅ PASS |
| 16 | Bathroom Remodeling Brandon | Bathroom Remodeling in Brandon, MS \| Bath Remodeler — Bradley Brown Inc | 70 | ✅ | ✅ | ✅ | ⚠️ >60 (auto-trunc) |
| 17 | Madison Remodeling | Home Remodeling in Madison, MS \| Kitchen, Bath & Renovations — Bradley Brown Inc | 78 | ✅ | ✅ | ✅ | ⚠️ >60 (auto-trunc) |
| 18 | Pro Tips | Pro Tips — Home Remodeling Advice \| Bradley Brown Inc. | 53 | ✅ | ❌ | ✅ | ✅ PASS (no location, but blog hub) |
| 19 | Estimate | Get Your Free Estimate — Bradley Brown Inc. \| Brandon, MS | 56 | ✅ | ✅ | ✅ | ✅ PASS |
| 20 | Legal | Legal & Policies | 17 | ❌ | ❌ | ❌ (auto-appended) | ⚠️ Too short/generic |

**Summary:** 10/20 under 60 chars ✅ | 9/20 over 60 (auto-truncated by SEOHead) ⚠️ | 1/20 too short (Legal) ⚠️

### Meta Descriptions (target: <155 chars, with CTA)

SEOHead auto-truncates descriptions >160 chars (appends "…" at 159).

| # | Page | Description (raw) | Chars | CTA | Status |
|---|---|---|---|---|---|
| 1 | Home | Brandon MS's top-rated remodeler & home builder since 1995. Kitchens, baths, additions & custom homes. Licensed & insured. Call (844) 351-4154 for a free estimate. | 155 | ✅ Call CTA | ✅ PASS (at limit) |
| 2 | Services | Custom homes, kitchen & bath remodeling, room additions, outdoor living, barndominiums & emergency repairs in Brandon, MS. Licensed & insured since 1995. Free estimates. | 164 | ✅ Free estimates | ⚠️ >155 (auto-trunc) |
| 3 | Custom Home Building | Custom home builder in Brandon, MS since 1995. Full design-build service, premium materials, energy-efficient construction across Rankin County & Central Mississippi. Free estimates. | 177 | ✅ Free estimates | ⚠️ >155 (auto-trunc) |
| 4 | Kitchen & Bath Remodeling | Kitchen and bathroom remodeling in Brandon, MS. Licensed contractor since 1995 — custom cabinetry, tile, countertops, plumbing & electrical. Free estimates. Call (844) 351-4154. | 174 | ✅ Call CTA | ⚠️ >155 (auto-trunc) |
| 5 | Room Additions | Room additions in Brandon, MS — master suites, in-law suites, sunrooms, home offices & garage conversions. Licensed contractor since 1995. Seamless match to your existing home. Free estimates. | 188 | ✅ Free estimates | ⚠️ >155 (auto-trunc) |
| 6 | Outdoor Living | Outdoor living spaces, covered patios, outdoor kitchens, custom decks & pergolas in Brandon, MS. Built for Mississippi's climate by a licensed contractor since 1995. Free estimates. | 182 | ✅ Free estimates | ⚠️ >155 (auto-trunc) |
| 7 | Barndominiums | Custom barndominium construction in Brandon, MS & Rankin County. Steel-frame builds combining living space, workshops & garages. Licensed since 1995. $75–$150/sq ft. Free estimates. | 178 | ✅ Free estimates | ⚠️ >155 (auto-trunc) |
| 8 | Emergency Repairs | Urgent home repairs in Brandon, MS — storm damage, roof leaks, structural issues & water intrusion. Licensed MS contractor since 1995. Same-week service. Call (601) 954-1306 now. | 176 | ✅ Call CTA | ⚠️ >155 (auto-trunc) |
| 9 | Portfolio | Browse our portfolio of custom homes, kitchen & bath renovations, room additions, and outdoor living projects built across Jackson, Madison, Ridgeland, Brandon, and Central Mississippi. | 188 | ❌ No CTA | ⚠️ >155 (auto-trunc) |
| 10 | About | Learn about Bradley Brown Inc., Central Mississippi's trusted home builder since 1995. 500+ homes built, 4.9-star rated, BBB accredited. Meet the team and see why homeowners trust us. | 186 | ❌ No CTA | ⚠️ >155 (auto-trunc) |
| 11 | Contact | Contact Central Mississippi's trusted home remodeler. Call (844) 351-4154 or message us — serving Brandon, Flowood, Pearl, Madison & surrounding areas. Free estimates. | 162 | ✅ Call CTA | ⚠️ >155 (auto-trunc) |
| 12 | Pricing | Transparent pricing for kitchens, baths & custom homes in Brandon, MS. See cost ranges for every project type. Licensed & insured since 1995. Free estimates — call (844) 351-4154. | 181 | ✅ Call CTA | ⚠️ >155 (auto-trunc) |
| 13 | Remodeling Brandon MS | Bradley Brown Inc. — Brandon, MS home remodelers since 1995. Kitchen remodeling, bathroom renovations, room additions, whole-home renovations & outdoor living. Call (844) 351-4154. | 187 | ✅ Call CTA | ⚠️ >155 (auto-trunc) |
| 14 | Remodeling MS | Mississippi home remodelers — kitchen remodeling, bathroom remodeling, and whole-home renovations across Central Mississippi. Call (844) 351-4154 for a free estimate. | 165 | ✅ Call CTA | ⚠️ >155 (auto-trunc) |
| 15 | Custom Home Builder Brandon | Bradley Brown Inc. builds custom homes, new construction homes, and luxury homes in Brandon, MS and Rankin County. Call (844) 351-4154 to start your custom home consultation. | 170 | ✅ Call CTA | ⚠️ >155 (auto-trunc) |
| 16 | Bathroom Remodeling Brandon | Brandon, MS bathroom remodeling contractor. Walk-in showers, tub-to-shower conversions, tile work, vanities & complete bath renovations. Licensed & insured since 1995. Free estimates — call (844) 351-4154. | 200 | ✅ Call CTA | ⚠️ >155 (auto-trunc) |
| 17 | Madison Remodeling | Madison, MS home remodeling contractor — kitchen renovations, bathroom remodeling, room additions & whole-home renovations. Licensed & insured since 1995. Free estimates — call (844) 351-4154. | 191 | ✅ Call CTA | ⚠️ >155 (auto-trunc) |
| 18 | Pro Tips | Expert home remodeling tips for Brandon, MS homeowners — bathrooms, kitchens, luxury renovations & more from the Brandon and Rankin County area's trusted contractor since 1995. | 182 | ❌ No CTA | ⚠️ >155 (auto-trunc) |
| 19 | Estimate | Get a free AI-powered remodeling cost estimate, request a quote, or schedule a site visit — all in one place. Custom homes, renovations & additions in Brandon, MS. | 163 | ✅ Implicit (free estimate) | ⚠️ >155 (auto-trunc) |
| 20 | Legal | Bradley Brown Inc. Privacy Policy and Terms & Conditions for our website, SMS messaging service, and custom home building services in Mississippi. | 149 | ❌ No CTA (policy page) | ✅ PASS |

**Summary:** 1/20 under 155 ✅ | 1/20 at limit (155) ✅ | 18/20 over 155 (auto-truncated to 160) ⚠️

**Recommendation:** Shorten titles and descriptions on the 18 pages exceeding limits. SEOHead auto-truncates as a safety net, but manually optimized copy within limits performs better in SERPs.

---

## 6. Crawl Report

### 404 Errors
**None.** All routes resolve to either a 200 page or a 301 redirect. Unmatched URLs hit the catch-all `*` route → `RedirectHandler` → `PageNotFound` (404 page with logging to NotFoundLog entity).

### Orphan Pages (no internal links pointing to them)

| Page | Linked From | Status |
|---|---|---|
| `/sms-optin` | Legal page sidebar link only | ⚠️ Near-orphan — only linked from /legal |
| `/bathroom-remodeling-brandon-ms` | Not in nav or footer; not linked from any page | ⚠️ Orphan — accessible via direct URL/sitemap only |
| `/madison-ms-home-remodeling` | Not in nav or footer; not linked from any page | ⚠️ Orphan — accessible via direct URL/sitemap only |
| `/remodeling-ms` | Not in nav or footer; not linked from any page | ⚠️ Orphan — accessible via direct URL/sitemap only |

**Recommendation:** Add internal links from `/services` or related service pages to `/bathroom-remodeling-brandon-ms`, `/madison-ms-home-remodeling`, and `/remodeling-ms`.

### Duplicate Titles
**None.** All 20 pages have unique title tags. No duplicates detected. ✅ PASS

### Pages >3 Clicks from Home

| Page | Click Path | Clicks | Status |
|---|---|---|---|
| All 6 service pages | Home → Services dropdown → Service page | 2 | ✅ |
| All blog posts | Home → Pro Tips → Blog post | 2 | ✅ |
| `/pricing` | Home → nav/footer link | 1 | ✅ |
| `/portfolio` | Home → nav link | 1 | ✅ |
| `/remodeling-brandon-ms` | Home → footer/service cross-link | 2 | ✅ |
| `/custom-home-builder-brandon-ms` | Home → footer/service cross-link | 2 | ✅ |
| `/bathroom-remodeling-brandon-ms` | Home → (no link) | 3+ | ⚠️ Orphan |
| `/madison-ms-home-remodeling` | Home → (no link) | 3+ | ⚠️ Orphan |
| `/remodeling-ms` | Home → (no link) | 3+ | ⚠️ Orphan |
| `/legal` | Home → footer | 1 | ✅ |
| `/estimate` | Home → nav/header/footer CTA | 1 | ✅ |

**Summary:** 3 pages are orphans (>3 clicks or unreachable via internal links). All other pages are ≤2 clicks from home.

### Internal Links to Redirected URLs

| File | Issue | Impact |
|---|---|---|
| `src/pages/Estimate.jsx` | Links to `/finish-package-studio` (redirects to `/estimate` — self-referential) | ⚠️ Unnecessary redirect hop |
| `src/pages/Portfolio.jsx` | `exploreLinks` array uses old page names (QuoteAssistant, ScheduleVisit, LandingTrust, LandingPricing, etc.) — all redirect | ⚠️ Multiple unnecessary hops |
| `src/pages/Contact.jsx` | Uses `createPageUrl()` for some links (works via pagesConfig) | ✅ Acceptable |

**Recommendation:** Update `exploreLinks` in Portfolio.jsx and the `/finish-package-studio` link in Estimate.jsx to point directly to canonical URLs.

---

## 7. Analytics Events on /estimate Funnel

| Event | Trigger | Location in Code | Status |
|---|---|---|---|
| `estimator_started` | User selects project type and clicks "Next" (step 0 → 1) | `Estimate.jsx` → `handleNext()` (line 63-68) | ✅ PASS — fires `base44.analytics.track({ eventName: "estimator_started", properties: { project_type } })` |
| `estimate_request_submitted` | User clicks "Generate My Estimate" (step 3 → 4) | `Estimate.jsx` → `submitAndGenerate()` (line 84-94) | ✅ PASS — fires with project_type, location, budget_range, has_phone, requested_design_concept, requested_site_visit |
| `phone_click` (source: `estimate_page`) | User clicks "Call (844) 351-4154" button | `Estimate.jsx` → call button `onClick` (line 342) | ✅ PASS — fires `base44.analytics.track` + Google Ads conversion ($30) |
| Google Ads conversion (`aquote_form`) | Form submitted successfully | `Estimate.jsx` → `submitAndGenerate()` (line 163-169) | ✅ PASS — fires `window.gtag('event', 'conversion', ...)` with value $75 |

**Result: ✅ All 3 required funnel events fire correctly.** The `estimator_started` event (added in Phase 5) fires when the user advances past step 0.

---

## Summary Scorecard

| # | Check | Result | Details |
|---|---|---|---|
| 1 | Redirects (single hop) | ✅ 28/28 PASS | Zero chains, zero loops |
| 2 | Canonicals (self, lowercase) | ✅ 21/21 PASS | LowercaseRedirect + CanonicalRedirect active; all canonicals lowercase non-www https |
| 3 | Sitemap & robots.txt | ✅ PASS | 20 canonical URLs in sitemap; all allowed by robots.txt; GSC connector authorized for resubmission |
| 4 | Schema | ✅ PASS | LocalBusiness on Home+Contact+About; Service on 6 service pages; FAQPage on 12+ pages (homepage 6 Q&As verbatim verified, no duplicates); Article (BlogPosting) on Pro Tips; HowTo conditional |
| 5 | Titles & meta descriptions | ⚠️ 10/20 titles <60; 2/20 descriptions <155 | Auto-truncated by SEOHead; recommend manual shortening |
| 6 | Crawl (404s, orphans, dupes, depth) | ⚠️ 0 404s; 3 orphans; 0 duplicate titles; 3 pages >3 clicks | Orphan pages need internal links |
| 7 | Analytics on /estimate | ✅ PASS | All 3 events fire (estimator_started, estimate_request_submitted, phone_click) |

**Overall: 5/7 fully PASS. 2 areas need attention:**
1. **Title/meta length optimization** — 9 titles >60 chars, 18 descriptions >155 chars (auto-truncated by SEOHead but should be manually shortened for best SERP display)
2. **Internal link cleanup** — 3 orphan pages need internal links; Portfolio exploreLinks and Estimate finish-package-studio link point to redirected URLs

---

## [VERIFY] Items Still Pending Owner Confirmation (from Phase 6)

| # | Project | Claim | Status |
|---|---|---|---|
| 1 | Office Addition (Brandon, 500 sq ft) | "completed in 9 weeks" | ⏳ Awaiting owner confirmation |
| 2 | Office Addition (Brandon, 500 sq ft) | "zero change orders" | ⏳ Awaiting owner confirmation |
| 3 | Barndominium Custom Office & Shop (Brandon, 3,200 sq ft) | "200-amp electrical service" | ⏳ Awaiting owner confirmation |
| 4 | County Custom Built (Canton, 3,200 sq ft) | "delivered on schedule" | ⏳ Awaiting owner confirmation |
| 5 | County Custom Built (Canton, 3,200 sq ft) | "within 2% of original budget" | ⏳ Awaiting owner confirmation |

These claims were removed from published captions until verified.