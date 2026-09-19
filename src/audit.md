# Site Audit — Phase 2 Funnel Consolidation

**Date:** 2026-08-04  
**Scope:** Full route inventory, final redirect map, and open questions after consolidating all lead-capture paths into `/estimate`.

---

## 1. Page Inventory

### PagesConfig Routes (auto-generated from `src/pages.config.js`)

| Page Key | Route | Purpose | CTA Destination |
|---|---|---|---|
| Home | `/` | Homepage | `/estimate` ✅ |
| About | `/about` | Company about page | `/estimate` (via redirect) |
| Services | `/services` | Services overview | `/quoteassistant` → redirect |
| Portfolio | `/portfolio` | Project gallery | `/estimate` (via redirect) |
| ProTips | `/protips` | Blog listing | `/estimate` (via redirect) |
| Contact | `/contact` | Contact page + form | `/estimate` (via redirect) |
| Legal | `/legal` | Legal/privacy | N/A |
| AccountSettings | `/accountsettings` | User account | N/A |
| AgentChat | `/agentchat` | In-app AI agent | N/A |
| CRM | `/crm` | Admin CRM | N/A |
| TikTokSync | `/tiktoksync` | Admin TikTok sync | N/A |
| LandingPricing | `/landingpricing` | Pricing landing | `/quoteassistant` → redirect |
| LandingTrust | `/landingtrust` | Testimonials landing | `/estimate` (via redirect) |
| LandingCoreServices | `/landingcoreservices` | Core services landing | `/quoteassistant` → redirect |
| LandingEmergencyRepair | `/landingemergencyrepair` | Emergency repair landing | `/estimate` (via redirect) |
| LandingBrandonRemodelers | `/landingbrandonremodelers` | Brandon remodelers landing | `/estimate` (via redirect) |
| LuxuryHomeRenovations | `/luxuryhomerenovations` | Luxury renovations | `/estimate` (via redirect) |
| RenovationLoans | `/renovationloans` | Renovation loans info | `/estimate` (via redirect) |
| HomeAdditionIdeas | `/homeadditionideas` | Home addition ideas | `/estimate` (via redirect) |
| SmallBathroomIdeas | `/smallbathroomideas` | Small bathroom ideas | `/estimate` (via redirect) |
| EnergyEfficientUpgrades | `/energyefficientupgrades` | Energy efficiency | `/estimate` (via redirect) |

### Explicit Routes (defined directly in `src/App.jsx`)

| Route | Page | Purpose | Access |
|---|---|---|---|
| `/estimate` | Estimate | Unified lead-capture funnel | Public |
| `/thank-you` | ThankYou | Post-submission confirmation | Public |
| `/customertestimonials` | LandingTrust | Testimonials alias | Public |
| `/remodeling-ms` | LandingCoreServices | Remodeling alias | Public |
| `/home-remodeling-cost` | LandingPricing | Pricing alias | Public |
| `/bathroom-remodeling-brandon-ms` | BathroomRemodelingBrandon | SEO landing | Public |
| `/barndominium-cost-mississippi` | BarndominiumCost | SEO landing | Public |
| `/madison-ms-home-remodeling` | MadisonRemodeling | SEO landing | Public |
| `/barndominium-builder` | BarndominiumBuilder | SEO landing | Public |
| `/custom-home-builder-brandon-ms` | LandingBrandonCustomHomeBuilder | SEO landing | Public |
| `/sms-optin` | SmsOptin | SMS opt-in page | Public |
| `/jobsite-checkin` | JobCheckin | Crew check-in form | Admin |
| `/jobsites` | Jobsites | Jobsite map/listing | Public |
| `/jobsites/:slug` | JobsiteDetail | Individual jobsite | Public |
| `/protips/:slug` | ProTipDetail | Individual blog post | Public |
| `/seodashboard` | SEODashboard | SEO admin dashboard | Admin |
| `/funnelanalysis` | FunnelAnalysis | Funnel analytics | Admin |
| `/leads` | Leads | Lead management | Admin |
| `/siteimages` | SiteImages | Image management | Admin |
| `/blogadmin` | BlogAdmin | Blog management | Admin |
| `/conversiondashboard` | ConversionDashboard | Conversion analytics | Admin |
| `/error` | ServerError | 500 error page | Public |
| `*` | PageNotFound | 404 catch-all | Public |

---

## 2. Final Redirect Map

All redirects are implemented as `<Navigate to="..." replace />` in `src/App.jsx`:

### Funnel Consolidation Redirects (Phase 2)

| Old Route | Redirects To | Reason |
|---|---|---|
| `/contactform` | `/estimate` | Consolidated into unified funnel |
| `/quoteassistant` | `/estimate` | Consolidated into unified funnel |
| `/quote` | `/estimate` | Consolidated into unified funnel |
| `/finish-package-studio` | `/estimate` | Consolidated into unified funnel |
| `/schedulevisit` | `/estimate` | Consolidated into unified funnel |
| `/ai-quote` | `/estimate` | Consolidated into unified funnel |

### Portfolio Consolidation Redirects (pre-existing)

| Old Route | Redirects To | Reason |
|---|---|---|
| `/projects` | `/portfolio` | Consolidated project URLs |
| `/projects/historic-home-restoration` | `/portfolio` | De-indexed deprecated page |
| `/projects/custom-home-build` | `/portfolio` | Consolidated project URLs |
| `/projects/gourmet-kitchen-renovation` | `/portfolio` | Consolidated project URLs |
| `/projects/two-story-home-addition` | `/portfolio` | Consolidated project URLs |

### SEO Landing Page Alias Redirects (pre-existing)

| Old Route | Redirects To | Reason |
|---|---|---|
| `/barndominiums-ms` | `/barndominium-builder` | Canonical URL update |

### Programmatic Redirects (non-route)

| Mechanism | File | Behavior |
|---|---|---|
| `LowercaseRedirect` | `src/components/LowercaseRedirect.jsx` | Any uppercase URL → lowercase |
| `CanonicalRedirect` | `src/components/CanonicalRedirect.jsx` | Trailing slash / index normalization |
| `RedirectHandler` | `src/lib/redirectMap.js` + `src/lib/RedirectHandler.jsx` | Dynamic 404 → redirect matching |

---

## 3. CTA Standardization Status

### ✅ Directly Updated (point to `/estimate`)

- `src/components/home/HeroSection.jsx`
- `src/components/home/CTABanner.jsx`
- `src/Layout.jsx` (desktop nav, mobile header, mobile menu, footer)
- `src/components/BottomTabBar.jsx`
- `src/components/ServiceStickyCTA.jsx`

### ⚠️ Still Relying on Redirects (functional but indirect)

These pages still link to `/quoteassistant` or `/contactform` and rely on the 301 redirect:

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

## 4. Open Questions

1. **Sitemap resubmission:** The dynamic sitemap (`base44/functions/sitemap/entry.ts`) needs to be resubmitted to Google Search Console to reflect the removed pages (`/contactform`, `/quoteassistant`, `/schedulevisit`, `/finish-package-studio`). Should this be triggered now or after all landing page CTAs are updated?

2. **Google Ads destination URLs:** Any active Google Ads campaigns pointing to `/quoteassistant` or `/contactform` will now pass through a redirect. Should the ad destinations be updated directly to `/estimate` to avoid redirect latency and tracking loss?

3. **Formspree floating button:** The Layout.jsx still loads a Formspree popup button (`formbutton`) that creates leads via a third-party form, bypassing the `/estimate` funnel. Should this be removed since `/estimate` now handles all lead capture, or kept as a secondary capture method?

4. **Exit-intent popup:** `src/components/ExitIntentPopup.jsx` still captures leads for the "Project Inspiration Guide" PDF. The known issue notes the PDF hasn't been uploaded yet. Should this popup be repurposed to drive to `/estimate` instead of capturing a separate lead, or should the PDF be uploaded to complete the current flow?

5. **Direct CTA updates on remaining landing pages:** Should I update all 16 remaining landing pages to point directly to `/estimate` (bypassing the redirect), or leave them as-is since the redirect handles it?

6. **`/thank-you` page:** After form submission on `/estimate`, users are redirected to `/thank-you`. Should this remain a separate page or be an in-page success state within `/estimate` to reduce the number of routes?

7. **Deprecated page files:** The old page files (`ContactForm.jsx`, `Quote.jsx`, `QuoteAssistant.jsx`, `FinishPackageStudio.jsx`, `ScheduleVisit.jsx`) still exist on disk but are no longer routed. Should they be deleted, or kept for reference?