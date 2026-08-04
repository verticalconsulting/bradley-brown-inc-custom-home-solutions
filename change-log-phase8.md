# Change Log — Phase 8: Correcting Approved Restructure Deviations

**Date:** 2026-08-04  
**Scope:** Split kitchen/bath service page, restore historic home restoration, fix robots.txt strategy

---

## TASK 1 — Split Combined Kitchen/Bath Service Page

### 1.1 New Pages Created

**`/services/kitchen-remodeling`** — `src/pages/services/KitchenRemodeling.jsx`
- H1: "Kitchen Remodeling in Brandon, MS"
- 6 body sections, ~800 words of original content with Brandon MS / Rankin County keywords
- 3 unique FAQs (FAQPage schema via ServicePageLayout):
  1. "How long does a kitchen remodel take in Brandon, MS?"
  2. "How much does a kitchen remodel cost in Brandon, MS?"
  3. "What countertops do you offer for kitchen remodels?"
- 1 testimonial (Jennifer R., Flowood, MS)
- 2 portfolio images (kitchen remodel photos)
- Primary CTA → /estimate, secondary tel: (844) 351-4154
- 3 internal links to related Pro Tips: energy-efficient-upgrades, renovation-loans, + cross-link to /services/bathroom-remodeling
- "Luxury Finishes & Premium Upgrades" section merged from LuxuryHomeRenovations page (kitchen-specific: custom cabinetry, waterfall countertops, high-end appliances, coffered ceilings)
- Service schema + BreadcrumbList + FAQPage schema via ServicePageLayout

**`/services/bathroom-remodeling`** — `src/pages/services/BathroomRemodeling.jsx`
- H1: "Bathroom Remodeling in Brandon, MS"
- 6 body sections, ~800 words of original content with Brandon MS / Rankin County keywords
- 3 unique FAQs (FAQPage schema via ServicePageLayout) — all DIFFERENT from /bathroom-remodeling-brandon-ms:
  1. "What's included in a bathroom remodel from Bradley Brown Inc.?"
  2. "Do you waterproof bathroom showers for Mississippi humidity?"
  3. "Can you make my bathroom accessible for aging in place?"
- 1 testimonial (David K., Brandon, MS)
- 2 portfolio images (walk-in shower conversion + master bath renovation)
- Primary CTA → /estimate, secondary tel: (844) 351-4154
- 3 internal links: small-bathroom-ideas (Pro Tip), renovation-loans (Pro Tip), + cross-link to /bathroom-remodeling-brandon-ms
- "Luxury Finishes & Spa-Inspired Upgrades" section merged from LuxuryHomeRenovations page (bath-specific: freestanding tubs, heated floors, steam showers, spa-grade fixtures)
- Service schema + BreadcrumbList + FAQPage schema via ServicePageLayout

### 1.2 Redirects Updated (src/App.jsx)

| From | Old Destination | New Destination | Hops |
|---|---|---|---|
| `/services/kitchen-bathroom-remodeling` | (was a live page) | → `/services/kitchen-remodeling` (301) | 1 |
| `/luxuryhomerenovations` | → `/services/kitchen-bathroom-remodeling` | → `/services` (hub) | 1 |

**No redirect chains created.** `/luxuryhomerenovations` now goes directly to `/services` in one hop (previously would have chained through `/services/kitchen-bathroom-remodeling` → `/services/kitchen-remodeling`).

### 1.3 Cross-Linking & De-duplication

- `/services/bathroom-remodeling` links to `/bathroom-remodeling-brandon-ms` in relatedLinks section
- `/bathroom-remodeling-brandon-ms` now links to `/services/bathroom-remodeling` in "Related Pages" section (added "Bathroom Remodeling Service" link)
- **Body copy de-duplicated:** The new `/services/bathroom-remodeling` page uses completely original paragraphs — no text copied from `/bathroom-remodeling-brandon-ms`. The landing page focuses on local Brandon-specific marketing (200+ baths remodeled, pricing tiers, local testimonials), while the service page focuses on the service offering (walk-in showers, waterproofing, vanities, accessible baths).
- **FAQs de-duplicated:** All 3 FAQs on the new service page are different questions from the 6 FAQs on the landing page.

### 1.4 Navigation & Hub Updates

**`/services` hub (Services.jsx):** Split "Kitchen & Bathroom Remodeling" card into two cards:
1. "Kitchen Remodeling" → `/services/kitchen-remodeling` ($15,000+)
2. "Bathroom Remodeling" → `/services/bathroom-remodeling` ($8,000+)
- Hub now shows 7 service cards (was 6)

**Header Services dropdown (Layout.jsx):** Split into 7 items:
- "Kitchen Remodeling" → `/services/kitchen-remodeling`
- "Bathroom Remodeling" → `/services/bathroom-remodeling`

**Footer Services column (Layout.jsx):** Split into 7 items (same as header)

**Homepage "Our Services" cards (ServicesPreview.jsx):** Updated defaultServices:
- "Home Renovations" → renamed to "Kitchen Remodeling" → `/services/kitchen-remodeling`
- "Bathroom Remodeling" → link updated to `/services/bathroom-remodeling`

### 1.5 Sitemap & Robots Updated

- `sitemap.xml`: Replaced `/services/kitchen-bathroom-remodeling` with `/services/kitchen-remodeling` and `/services/bathroom-remodeling`
- `robots.txt`: New Disallow-based file allows all content pages by default (see Task 3)

---

## TASK 2 — Restore Historic Home Restoration Story

### 2.1 Content Recovery

The original page content **still exists** in `src/pages/HistoricHomeRestoration.jsx`. The file was present in the codebase but had been:
1. Redirected away (App.jsx had `<Navigate to="/portfolio" replace />`)
2. Canonical pointed to `/portfolio` (self-canonical was wrong)
3. Had `robots="noindex, nofollow"` (invalid SEOHead prop, but intent was de-indexed)
4. Internal links pointed to old page names (`/contactform`, `/Services`, `/HomeAdditionIdeas`, `/RenovationLoans`)

### 2.2 Fixes Applied

| Fix | Before | After |
|---|---|---|
| Canonical URL | `https://bradleybrowninc.com/portfolio` | `https://bradleybrowninc.com/projects/historic-home-restoration` |
| Indexability | `robots="noindex, nofollow"` (invalid prop) | `noindex={false}` (explicitly indexable) |
| CTA links | `to="/contactform"` (2 instances) | `to="/estimate"` |
| Related link 1 | `to="/Services"` | `to="/services"` |
| Related link 2 | `to="/Portfolio"` | `to="/portfolio"` |
| Related link 3 | `to="/HomeAdditionIdeas"` | `to="/protips/home-addition-ideas"` |
| Related link 4 | `to="/RenovationLoans"` | `to="/protips/renovation-loans"` |
| Route in App.jsx | `<Navigate to="/portfolio" replace />` | Live page element with LayoutWrapper |

### 2.3 Redirect Updated

| From | Old Destination | New Destination | Hops |
|---|---|---|---|
| `/historichomerestoration` | → `/portfolio` | → `/projects/historic-home-restoration` | 1 |

No redirect chain — `/projects/historic-home-restoration` is now a live 200 page.

### 2.4 Sitemap & Portfolio Link

- Added `/projects/historic-home-restoration` to `sitemap.xml` (priority 0.7, monthly changefreq)
- Added "Featured Project Story" section to `/portfolio` page (Portfolio.jsx) with image, description, and "Read the Full Story" CTA linking to `/projects/historic-home-restoration`
- Also cleaned up Portfolio.jsx `exploreLinks` array to use canonical `to` URLs instead of old page names (removed redirects for QuoteAssistant, ScheduleVisit, LandingTrust, LandingPricing, LuxuryHomeRenovations, etc.)

---

## TASK 3 — Fix robots.txt Strategy

### 3.1 Strategy Change

Replaced the **Allow-list** (20 explicit Allow URLs) with a **Disallow-based** file:
- `Allow: /` (allow everything by default)
- `Disallow` only admin/internal pages and API routes

### 3.2 New robots.txt Content

```
User-agent: *
Allow: /

# Disallow admin / internal pages only
Disallow: /seodashboard
Disallow: /blogadmin
Disallow: /leads
Disallow: /crm
Disallow: /jobsite-checkin
Disallow: /accountsettings
Disallow: /agentchat
Disallow: /tiktoksync
Disallow: /thank-you
Disallow: /error
Disallow: /sms-optin

# Block dotfile / config probes
Disallow: /*.env
Disallow: /*.git
Disallow: /*.htaccess
Disallow: /*.htpasswd
Disallow: /*.DS_Store

# Block API / function routes
Disallow: /api/
Disallow: /_functions/

Sitemap: https://bradleybrowninc.com/sitemap.xml
```

### 3.3 What Changed

**Removed:**
- All 20 explicit `Allow:` lines for content pages (no longer needed — everything is allowed by default)
- `Disallow: /projects/historic-home-restoration` (page is now live and should be indexed)
- `Disallow: /siteimages` (removed — not a content page but not sensitive either)

**Added:**
- `Disallow: /agentchat` (admin AI chat page)
- `Disallow: /tiktoksync` (admin sync page)
- `Disallow: /api/` and `Disallow: /_functions/` (API/function routes)

**Kept:**
- Sitemap reference
- Dotfile/config probe blocks

### 3.4 Crawlability Verification

All sitemap URLs are crawlable under the new rules:
- 21 content pages (including 2 new service pages + historic restoration) — allowed by `Allow: /`
- Dynamic `/protips/:slug` and `/jobsites/:slug` pages — allowed by `Allow: /` (previously could have been blocked if not in the explicit Allow-list)
- Future blog posts and new pages — automatically crawlable without robots.txt updates

---

## Summary of All Changes

### New Files
- `src/pages/services/KitchenRemodeling.jsx` — new kitchen service page (~800 words)
- `src/pages/services/BathroomRemodeling.jsx` — new bathroom service page (~800 words)

### Modified Files
- `src/App.jsx` — added routes for kitchen-remodeling, bathroom-remodeling; added HistoricHomeRestoration import + route; updated redirects (kitchen-bathroom-remodeling → kitchen-remodeling, luxuryhomerenovations → /services, historichomerestoration → projects/historic-home-restoration)
- `src/pages/Services.jsx` — split kitchen/bath card into 2 (7 total cards)
- `src/Layout.jsx` — split kitchen/bath links in header dropdown and footer (7 items each)
- `src/components/home/ServicesPreview.jsx` — updated homepage service cards to new URLs
- `src/pages/HistoricHomeRestoration.jsx` — fixed canonical, noindex, internal links
- `src/pages/Portfolio.jsx` — updated exploreLinks to canonical URLs, added featured historic restoration section
- `src/pages/BathroomRemodelingBrandon.jsx` — added cross-link to /services/bathroom-remodeling
- `base44/functions/sitemap/entry.ts` — replaced kitchen-bathroom-remodeling with 2 new URLs, added historic restoration
- `base44/functions/robotsTxt/entry.ts` — replaced Allow-list with Disallow-based file

### Redirect Chain Verification

| Redirect | Destination Type | Hops |
|---|---|---|
| `/services/kitchen-bathroom-remodeling` → `/services/kitchen-remodeling` | 200 page | 1 ✅ |
| `/luxuryhomerenovations` → `/services` | 200 page | 1 ✅ |
| `/historichomerestoration` → `/projects/historic-home-restoration` | 200 page | 1 ✅ |

No redirect chains created. All destinations are live 200-rendered pages.