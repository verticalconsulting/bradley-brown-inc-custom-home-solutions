# Phase 5 — Navigation & Internal Linking Cleanup Change Log

**Date:** 2026-08-04  
**Objective:** Clean up site-wide navigation, reduce duplicate links, update internal links to final URLs (no reliance on redirects), and add contextual cross-links between Pro Tips articles and service pages.

---

## Changes Made

### Task 1: Header Navigation

| Change | Detail |
|---|---|
| Services dropdown | Added hover dropdown with 6 service page links (desktop); expandable section (mobile) |
| Nav order | Home · Services ▾ · Portfolio · Pricing · Pro Tips · About · Contact |
| Account Settings link | Removed from public nav (was a Settings gear icon) |
| Jobsites / Schedule Visit | Already removed in Phase 4; confirmed absent from BottomTabBar |
| Get Free Estimate button | Kept (links to /estimate) |
| Phone number | Kept in header (desktop, hidden on mobile) |

**File:** `src/Layout.jsx` — removed `Settings` import; restructured `navLinks` (removed Services, added Pricing); added `serviceLinks` array; replaced desktop nav rendering with Services dropdown + regular links; added Services section to mobile menu.

### Task 2: Footer

| Column | Links |
|---|---|
| Services | Custom Home Building · Kitchen & Bath Remodeling · Room Additions · Outdoor Living · Barndominiums · Emergency Repairs (unchanged from Phase 3) |
| Company (before) | 12 links including guide pages, estimate, Brandon MS Remodelers |
| Company (after) | About Us · Portfolio · Pro Tips · Pricing · Contact Us · Legal (6 links only) |

- Removed guide page links (now blog posts at /protips/*)
- Removed "Get a Free Estimate" (CTA button already exists in header)
- Removed "Brandon MS Remodelers" (now accessible via nav Services dropdown)
- Kept: phone, address, certifications, social links, copyright

### Task 3: Internal Link Sweep

All internal links updated to final URLs (no reliance on redirects). Lowercase paths enforced.

| File | Links Updated |
|---|---|
| `src/Layout.jsx` | Nav links, footer links, email → contact link |
| `src/components/home/FeaturedResources.jsx` | 17 cards → 6 service page cards (all lowercase /services/* paths) |
| `src/components/home/ServicesPreview.jsx` | 6 defaultServices links updated to /services/* paths |
| `src/pages/ProTips.jsx` | 6 featured guide links → /protips/* and /services/* |
| `src/pages/ProTipDetail.jsx` | Bottom links → /protips, /services, /estimate (lowercase) |
| `src/pages/LandingBrandonCustomHomeBuilder.jsx` | Cross-link /LandingBrandonRemodelers → /remodeling-brandon-ms |
| 6 service page files | relatedLinks → /protips/* and /pricing (lowercase) |

### Task 4: Homepage "Plan Your Project" Hub

| Before | After |
|---|---|
| 17 resource cards (mix of old URLs, duplicates, mixed-case paths) | 6 service page cards |
| /remodeling-ms listed twice | Duplicate removed |
| Links to /finish-package-studio, /quote, /customertestimonials, /barndominium-builder, /LuxuryHomeRenovations, etc. | All links now point to /services/* |

**File:** `src/components/home/FeaturedResources.jsx` — complete rewrite.

### Task 5: Footer Email → Contact Form Link

| Before | After |
|---|---|
| `<a href="mailto:bradleybrowninc@gmail.com">bradleybrowninc@gmail.com</a>` | `<Link to="/contact">Email Us Online</Link>` |

Spam-harvest mitigation: email address no longer exposed in plain text in the DOM.

### Task 6: Contextual Cross-Links

#### Pro Tips → Service Pages

Added to `src/pages/ProTipDetail.jsx`: a "→ Related Service" link at the bottom of every blog post, computed from the post's slug or category:

| Blog Post Slug / Category | Links To |
|---|---|
| `home-addition-ideas` | `/services/room-additions` |
| `small-bathroom-ideas` | `/services/kitchen-bathroom-remodeling` |
| `energy-efficient-upgrades` | `/services/custom-home-building` |
| `renovation-loans` | `/pricing` |
| Category: `kitchen-remodeling` | `/services/kitchen-bathroom-remodeling` |
| Category: `bathroom-remodeling` | `/services/kitchen-bathroom-remodeling` |
| Category: `outdoor-living` | `/services/outdoor-living` |
| Category: `curb-appeal` | `/services/outdoor-living` |
| Category: `home-value` | `/services/custom-home-building` |
| Category: `interior-updates` | `/services/kitchen-bathroom-remodeling` |
| Category: `home-remodeling` (default) | `/services` |

#### Service Pages → Pro Tips Articles

Each service page's `relatedLinks` updated to point to 2-3 relevant blog posts (lowercase /protips/* paths):

| Service Page | Related Articles |
|---|---|
| `/services/custom-home-building` | Energy-Efficient Upgrades · Home Addition Ideas · Pro Tips |
| `/services/kitchen-bathroom-remodeling` | Small Bathroom Ideas · Renovation Loans · Pro Tips |
| `/services/room-additions` | Home Addition Ideas · Energy-Efficient Upgrades · Pro Tips |
| `/services/outdoor-living` | Home Addition Ideas · Pricing Guide · Pro Tips |
| `/services/barndominiums` | Pricing Guide · Custom Home Building · Pro Tips |
| `/services/emergency-repairs` | Energy-Efficient Upgrades · Renovation Loans · Pro Tips |

---

## Full-Site Link Inventory (Post-Phase 5)

### Primary Pages

| URL | Page | Source |
|---|---|---|
| `/` | Home | pages.config.js |
| `/about` | About | pages.config.js |
| `/contact` | Contact | pages.config.js |
| `/portfolio` | Portfolio | pages.config.js |
| `/protips` | Pro Tips listing | pages.config.js |
| `/services` | Services hub | pages.config.js |
| `/legal` | Legal | pages.config.js |
| `/pricing` | Pricing guide | App.jsx explicit route |
| `/estimate` | Estimate/lead capture | App.jsx explicit route |
| `/thank-you` | Thank You | App.jsx explicit route |

### Service Detail Pages

| URL | Page File |
|---|---|
| `/services/custom-home-building` | `src/pages/services/CustomHomeBuilding.jsx` |
| `/services/kitchen-bathroom-remodeling` | `src/pages/services/KitchenBathroomRemodeling.jsx` |
| `/services/room-additions` | `src/pages/services/RoomAdditions.jsx` |
| `/services/outdoor-living` | `src/pages/services/OutdoorLiving.jsx` |
| `/services/barndominiums` | `src/pages/services/BarndominiumsService.jsx` |
| `/services/emergency-repairs` | `src/pages/services/EmergencyRepairs.jsx` |

### Location/Landing Pages

| URL | Page File |
|---|---|
| `/remodeling-brandon-ms` | `src/pages/RemodelingBrandonMS.jsx` |
| `/remodeling-ms` | `src/pages/LandingCoreServices.jsx` |
| `/custom-home-builder-brandon-ms` | `src/pages/LandingBrandonCustomHomeBuilder.jsx` |
| `/bathroom-remodeling-brandon-ms` | `src/pages/BathroomRemodelingBrandon.jsx` |
| `/madison-ms-home-remodeling` | `src/pages/MadisonRemodeling.jsx` |

### Blog / Pro Tips

| URL | Type |
|---|---|
| `/protips` | Blog listing (dynamic BlogPost records) |
| `/protips/home-addition-ideas` | Migrated guide (BlogPost) |
| `/protips/small-bathroom-ideas` | Migrated guide (BlogPost) |
| `/protips/energy-efficient-upgrades` | Migrated guide (BlogPost) |
| `/protips/renovation-loans` | Migrated guide (BlogPost) |
| `/protips/:slug` | Dynamic (AI-generated + migrated BlogPost records) |

### Jobsites

| URL | Type |
|---|---|
| `/jobsites/:slug` | Individual jobsite detail pages (kept; /jobsites listing merged into /about) |
| `/jobsite-checkin` | Crew check-in form (admin) |

### Admin / Tools

| URL | Page |
|---|---|
| `/seodashboard` | SEO Dashboard (admin) |
| `/funnelanalysis` | Funnel Analysis (admin) |
| `/leads` | Leads (admin) |
| `/siteimages` | Site Images (admin) |
| `/blogadmin` | Blog Admin (admin) |
| `/conversiondashboard` | Conversion Dashboard (admin) |
| `/sms-optin` | SMS Opt-in |

### Redirects (301) — Complete Inventory

#### → `/estimate` (lead capture consolidation)

| Old URL |
|---|
| `/contactform` |
| `/quote` |
| `/quoteassistant` |
| `/finish-package-studio` |
| `/schedulevisit` |
| `/ai-quote` |

#### → `/services/barndominiums` (Phase 3 consolidation)

| Old URL |
|---|
| `/barndominium-builder` |
| `/barndominiums-ms` |
| `/barndominium-cost-mississippi` |

#### → `/services/emergency-repairs` (Phase 3 + 4)

| Old URL |
|---|
| `/landingemergencyrepair` |

#### → `/services/kitchen-bathroom-remodeling` (Phase 3)

| Old URL |
|---|
| `/luxuryhomerenovations` |

#### → `/about` (Phase 4 consolidation)

| Old URL |
|---|
| `/customertestimonials` |
| `/landingtrust` |
| `/jobsites` |

#### → `/pricing` (Phase 4 consolidation)

| Old URL |
|---|
| `/landingpricing` |
| `/home-remodeling-cost` |

#### → `/remodeling-brandon-ms` (Phase 4 consolidation)

| Old URL |
|---|
| `/landingbrandonremodelers` |
| `/landingcoreservices` |

#### → `/protips/<slug>` (Phase 4 guide migration)

| Old URL | New URL |
|---|---|
| `/homeadditionideas` | `/protips/home-addition-ideas` |
| `/smallbathroomideas` | `/protips/small-bathroom-ideas` |
| `/energyefficientupgrades` | `/protips/energy-efficient-upgrades` |
| `/renovationloans` | `/protips/renovation-loans` |

#### → `/projects/historic-home-restoration` (Phase 4)

| Old URL |
|---|
| `/historichomerestoration` |

#### → `/portfolio` (Phase 1 deprecation)

| Old URL |
|---|
| `/projects` |
| `/projects/custom-home-build` |
| `/projects/gourmet-kitchen-renovation` |
| `/projects/two-story-home-addition` |
| `/projects/historic-home-restoration` |

### Catch-All

| URL | Behavior |
|---|---|
| `/*` (any unmatched) | RedirectHandler → PageNotFound (404) |

---

## Navigation Structure

### Header (Desktop)

```
[Logo]   Services ▾  Portfolio  Pricing  Pro Tips  About  Contact   (844) 351-4154  [Get My Free Estimate]
         ┌──────────────────────────────┐
         │ Custom Home Building          │
         │ Kitchen & Bath Remodeling     │
         │ Room Additions                │
         │ Outdoor Living                │
         │ Barndominiums                 │
         │ Emergency Repairs             │
         └──────────────────────────────┘
```

### Header (Mobile)

```
[Logo]                    [Estimate]  [☰]
                    ↓ (menu opens)
Services
  Custom Home Building
  Kitchen & Bath Remodeling
  Room Additions
  Outdoor Living
  Barndominiums
  Emergency Repairs
Home
Portfolio
Pricing
Pro Tips
About
Contact
─────────────
(844) 351-4154
[Get My Free Estimate →]
```

### Bottom Tab Bar (Mobile)

```
[Home] [Services] [Estimate ⬆] [Portfolio] [Contact]
```

### Footer

```
┌─────────────────────┬──────────────┬──────────────┐
│ Logo                │ Services     │ Company      │
│ Tagline             │ 6 svc links  │ 6 links      │
│ Phone               │              │              │
│ Email Us Online     │              │              │
│ Address             │              │              │
│ FB · TikTok         │              │              │
├─────────────────────┴──────────────┴──────────────┤
│ Memberships & Certifications (5 badges)           │
├───────────────────────────────────────────────────┤
│ © 2026 Five Hughes LLC  │  Licensed & Insured     │
└───────────────────────────────────────────────────┘
```

---

## Files Modified in Phase 5

| File | Changes |
|---|---|
| `src/Layout.jsx` | Removed Settings import; restructured navLinks + added serviceLinks; added Services dropdown (desktop + mobile); removed AccountSettings link; simplified footer Company column to 6 links; replaced email mailto with /contact Link |
| `src/components/home/FeaturedResources.jsx` | Complete rewrite: 17 cards → 6 service page cards; all links lowercase /services/* |
| `src/components/home/ServicesPreview.jsx` | Updated 6 defaultServices links to /services/* paths |
| `src/pages/ProTipDetail.jsx` | Added slug/category → service URL mapping; added "Related Service" link; updated bottom links to lowercase paths |
| `src/pages/ProTips.jsx` | Updated 6 featured guide links to /protips/* and /services/* |
| `src/pages/LandingBrandonCustomHomeBuilder.jsx` | Updated cross-link /LandingBrandonRemodelers → /remodeling-brandon-ms |
| `src/pages/services/CustomHomeBuilding.jsx` | relatedLinks → /protips/* (lowercase) |
| `src/pages/services/KitchenBathroomRemodeling.jsx` | relatedLinks → /protips/* (lowercase) |
| `src/pages/services/RoomAdditions.jsx` | relatedLinks → /protips/* (lowercase) |
| `src/pages/services/OutdoorLiving.jsx` | relatedLinks → /protips/* + /pricing (lowercase) |
| `src/pages/services/BarndominiumsService.jsx` | relatedLinks → /pricing (lowercase) |
| `src/pages/services/EmergencyRepairs.jsx` | relatedLinks → /protips/* (lowercase) |
| `src/change-log-phase5.md` | This file |

---

## Open Follow-Up Items

1. **Sitemap:** Update dynamic sitemap to include all current URLs (service pages, /pricing, /remodeling-brandon-ms, /protips/* migrated guides) and exclude all redirected URLs.
2. **Google Search Console:** Resubmit sitemap after update.
3. **Internal link audit (remaining):** Other pages not swept in this phase (CTABanner, ServiceStickyCTA, ExitIntentPopup, Contact page) may still contain old `createPageUrl()` calls — redirects handle these, but a final pass to update direct links would be ideal.
4. **Service entity database:** The ServicesPreview component fetches from the Service entity. If database Service records have `link` fields pointing to old URLs, they should be updated in the database.
5. **Deprecated file cleanup:** 13+ deprecated page files remain on disk (see prior change logs).