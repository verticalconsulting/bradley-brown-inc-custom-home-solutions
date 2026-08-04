# Change Log — Phase 10: Lead Funnel Hardening & Dead Code Removal

**Date:** 2026-08-04  
**Scope:** Remove Formspree floating button, repurpose exit-intent popup, finish direct-link CTA sweep, harden /thank-you, delete deprecated page files, verify ads/tracking  
**References:** `audit.md` Q2-Q7, `final-validation-report-v2.md`

---

## TASK 1 — Remove Formspree Floating Button (audit Q3)

### 1.1 Layout.jsx — Formspree Script Embed Removed

Removed the entire `useEffect` block that dynamically loaded the Formspree `formbutton-v1.min.js` script and created a floating "Get a Quick Quote" button. This button was a third-party lead path that:
- Bypassed the /estimate funnel (no AI estimate, no UTM capture, no QuoteRequest record)
- Split attribution (leads went to Formspree, not the site's Lead entity)
- Sent PII (name, email, phone, project details) to an external service outside the site's lead pipeline

**File changed:** `src/Layout.jsx` — removed ~30 lines of Formspree script injection code.

### 1.2 Other Formspree Usage — Confirmed

A codebase search confirmed no other page loads the Formspree **floating button** embed. However, two files still send lead data to Formspree via `fetch("https://formspree.io/f/xeeranrd", ...)` as a secondary notification alongside the database record creation:

| File | Context | Status |
|---|---|---|
| `src/pages/Estimate.jsx` | `submitAndGenerate()` — fire-and-forget alongside QuoteRequest + Lead creation | Retained (part of lead pipeline) |
| `src/components/LeadCaptureForm.jsx` | `handleSubmit()` — fire-and-forget alongside Lead creation | Retained (part of lead pipeline) |

These fetch calls are part of the existing lead pipeline — they do NOT bypass the funnel. They send the same data that's saved to the database. They should be removed when the owner is ready to close the Formspree account (see Manual Steps below).

### 1.3 Owner Action — Formspree Account

> **⚠️ MANUAL STEP FOR OWNER:** Before disabling the Formspree account, export any historical leads stored in the Formspree dashboard. The two remaining `fetch` calls (Estimate.jsx, LeadCaptureForm.jsx) should be removed in a future cleanup when the owner confirms they no longer need Formspree as a backup notification channel.

---

## TASK 2 — Repurpose Exit-Intent Popup (audit Q4)

### 2.1 ExitIntentPopup.jsx — Full Rewrite

**Before:** Offered a "Project Inspiration Guide" PDF that was never uploaded — a broken promise. Captured name + email in the popup, created a Lead record, fired a Google Ads conversion.

**After:** Offers the free AI-powered cost estimate. Single CTA button → `/estimate`. No email capture in the popup itself.

| Feature | Before | After |
|---|---|---|
| Headline | "Wait — grab our Project Inspiration Guide first" | "Get Your Free AI Cost Estimate" |
| CTA | Form submit (name + email) → download PDF | Single button → `/estimate` |
| Email capture | Yes (in popup) | No |
| Lead record | Created in popup | No (lead captured on /estimate) |
| Google Ads conversion | Fired in popup ($15) | Not fired (conversion fires on /estimate form submit) |
| Frequency cap | Once per visitor (localStorage — permanent) | Once per session (sessionStorage — resets on browser close) |
| Suppress on /estimate | No | Yes |
| Suppress on /thank-you | No | Yes |

### 2.2 Analytics Events

| Event | Trigger | Properties |
|---|---|---|
| `exit_intent_shown` | Popup becomes visible | `{ source: page_path }` (or `{ source, trigger: "mobile_timer" }` on mobile) |
| `exit_intent_clicked` | User clicks "Get My Free Estimate" | `{ source: page_path }` |
| `exit_intent_dismissed` | User closes popup | `{ source: page_path }` |

**File changed:** `src/components/ExitIntentPopup.jsx` — full rewrite.

---

## TASK 3 — Finish Direct-Link CTA Sweep (audit Q5)

### 3.1 Portfolio.jsx — exploreLinks Array

Verified all 13 links in the `exploreLinks` array already point to canonical URLs (fixed in Phase 9). Removed the unused `createPageUrl` import.

### 3.2 Estimate.jsx — /finish-package-studio Self-Link

Searched Estimate.jsx and all imported components for `/finish-package-studio` — **no matches found.** This was already removed in a prior phase.

### 3.3 EstimateResult.jsx — createPageUrl Cleanup

Replaced `createPageUrl("Contact")` with direct `to="/contact"` and removed the unused `createPageUrl` import.

### 3.4 Acceptance Check — Redirect-Source Paths in Internal Links

A codebase-wide grep was performed for every redirect-source path from the redirect map. Results:

| Category | Matches | Action |
|---|---|---|
| Routed page internal links (`<Link to="...">`) | 0 | ✅ PASS — zero redirect-source paths in internal hrefs/link arrays on routed pages |
| Dead/unrouted page files (self-canonical meta tags) | ~12 | These are canonical URL strings in SEOHead props of dead/unrouted pages (LandingTrust, BarndominiumBuilder, etc.) — not internal links, not rendered |
| Dead/unrouted page `<Link>` elements | 2 (in BarndominiumBuilder.jsx, BarndominiumCost.jsx) | These files are unrouted dead code (redirected via `<Navigate>` in App.jsx) — their links are never rendered |

**Result: Zero redirect-source paths in internal hrefs/link arrays on all routed pages.** ✅

---

## TASK 4 — Harden /thank-you (audit Q6)

### 4.1 ThankYou.jsx — Full Rewrite

| Requirement | Implementation | Status |
|---|---|---|
| Keep as distinct route | `/thank-you` route preserved in App.jsx | ✅ |
| `noindex` meta | `noindex` prop added to SEOHead | ✅ |
| Excluded from sitemap.xml | Not present in sitemap `staticPages` array | ✅ (verified) |
| Disallowed in robots.txt | `Disallow: /thank-you` present (line 16 of robotsTxt/entry.ts) | ✅ (verified) |
| Reachable ONLY via form submission | LeadCaptureForm `onSuccess` navigates to `/thank-you?from=submit`; AI wizard shows results inline (no thank-you redirect) | ✅ |
| Direct visits show generic message | If `?from=submit` param absent → generic "Thanks for your interest!" with link home + estimate CTA | ✅ |
| Direct visits do NOT fire conversion events | All `gtag` conversion calls removed from ThankYou.jsx | ✅ |
| Conversions fire on submit action, not pageview | LeadCaptureForm fires $75 on submit; Estimate.jsx fires $75 on AI wizard submit; phone click fires $30 | ✅ |

### 4.2 Conversion Event Flow (After Hardening)

| User Action | Conversion Event | Value | Fires On |
|---|---|---|---|
| Submit AI estimator wizard (Estimate.jsx) | `AW-17864041271/aquote_form` | $75 | Submit action ✅ |
| Submit fallback LeadCaptureForm (Estimate.jsx) | `AW-17864041271/aquote_form` | $75 | Submit action ✅ |
| Click phone number (Estimate.jsx) | `AW-17864041271/21TJCO2Bj5ccELfGnsZC` | $30 | Click action ✅ |
| Visit /thank-you (any source) | **None** | — | Pageview (removed) ✅ |

**Files changed:** `src/pages/ThankYou.jsx` (full rewrite), `src/pages/Estimate.jsx` (added `onSuccess` to LeadCaptureForm → `navigate("/thank-you?from=submit")`).

---

## TASK 5 — Delete Deprecated Page Files (audit Q7)

### 5.1 Pages Deleted

| File | Route in App.jsx | Status |
|---|---|---|
| `src/pages/ContactForm.jsx` | `/contactform` → `<Navigate to="/estimate">` | ✅ Deleted |
| `src/pages/Quote.jsx` | `/quote` → `<Navigate to="/estimate">` | ✅ Deleted |
| `src/pages/QuoteAssistant.jsx` | `/quoteassistant` → `<Navigate to="/estimate">` | ✅ Deleted |
| `src/pages/FinishPackageStudio.jsx` | `/finish-package-studio` → `<Navigate to="/estimate">` | ✅ Deleted |
| `src/pages/ScheduleVisit.jsx` | `/schedulevisit` → `<Navigate to="/estimate">` | ✅ Deleted |

### 5.2 Exclusive Components Deleted

A codebase search confirmed these components were imported exclusively by the deleted pages:

| Component | Used By | Status |
|---|---|---|
| `src/components/finish/FinishPackageCard.jsx` | FinishPackageStudio.jsx only | ✅ Deleted |
| `src/components/finish/HowItWorks.jsx` | FinishPackageStudio.jsx only | ✅ Deleted |
| `src/components/finish/WhatsInsidePackage.jsx` | FinishPackageStudio.jsx only | ✅ Deleted |
| `src/components/finish/FinishPackageFAQ.jsx` | Not imported by any file (dead code) | ✅ Deleted |

### 5.3 pagesConfig Entries

None of the deleted files were in `pages.config.js` — no entries to remove.

### 5.4 Build Verification

A codebase-wide import scan confirmed:
- **Zero imports** of any deleted file from remaining code
- `ConversionDashboard.jsx` contains string references to `"pages/ScheduleVisit.jsx"` and `"pages/QuoteAssistant.jsx"` in a data array (metadata describing conversion events, not import statements) — these are display strings, not code imports, and do not affect the build
- The `src/components/finish/` directory is now empty

**Build status: ✅ PASS — no broken imports.**

---

## TASK 6 — Ads/Tracking Verification (audit Q2)

### 6.1 Google Ads Conversion Tags on /estimate

| Conversion | Send-To ID | Value | Trigger | Fires After Tasks 1-5? |
|---|---|---|---|---|
| Form submit (AI wizard) | `AW-17864041271/aquote_form` | $75 | `submitAndGenerate()` in Estimate.jsx | ✅ Yes |
| Form submit (fallback form) | `AW-17864041271/aquote_form` | $75 | `handleSubmit()` in LeadCaptureForm.jsx | ✅ Yes |
| Phone click | `AW-17864041271/21TJCO2Bj5ccELfGnsZC` | $30 | Phone button `onClick` in Estimate.jsx | ✅ Yes |

All three conversion tags are intact and fire on user actions (not pageviews). Tasks 1-5 did not modify these conversion calls.

### 6.2 gtag Config — Loaded Once Site-Wide

Verified in `index.html`:
- GA4 config: `gtag('config', 'G-M16SZNFJYP')` — loaded once ✅
- Google Ads config: `gtag('config', 'AW-17864041271')` — loaded once ✅
- Google Tag Manager: `GTM-N4STLGGN` — loaded once ✅
- No duplicate gtag config in any page component ✅

### 6.3 UTM/gclid Parameter Preservation

**Before Phase 10:** UTM/gclid parameters from ad campaign URLs were NOT captured or stored in lead records.

**After Phase 10:** Estimate.jsx now captures UTM/gclid parameters on page load and preserves them through the estimator steps into the lead record:

| Parameter | Captured | Stored In |
|---|---|---|
| `utm_source` | ✅ | Lead.source (appended) + QuoteRequest.description (appended) |
| `utm_medium` | ✅ | Lead.source + QuoteRequest.description |
| `utm_campaign` | ✅ | Lead.source + QuoteRequest.description |
| `utm_term` | ✅ | Lead.source + QuoteRequest.description |
| `utm_content` | ✅ | Lead.source + QuoteRequest.description |
| `gclid` | ✅ | Lead.source + QuoteRequest.description |

**Implementation:**
- `useEffect` on page mount reads URL search params
- Params stored in `utmParams` state (format: `utm_source=google&utm_medium=cpc&gclid=...`)
- On submit, `utmParams` appended to `Lead.source` field: `"Estimate Page (AI Wizard) \| utm_source=google&utm_medium=cpc&gclid=..."`
- On submit, `utmParams` appended to `QuoteRequest.description` field: `"...existing description...\n\nUTM: utm_source=google&utm_medium=cpc&gclid=..."`
- Params persist through all 5 estimator steps (stored in component state, not URL-dependent)

**File changed:** `src/pages/Estimate.jsx` — added UTM capture `useEffect`, `useNavigate`, and `utmParams` state.

---

## Summary of All Changes

### Files Modified

| File | Changes |
|---|---|
| `src/Layout.jsx` | Removed Formspree floating button script embed (Task 1) |
| `src/components/ExitIntentPopup.jsx` | Full rewrite: free AI estimate CTA, no email capture, session frequency cap, suppress on /estimate and /thank-you (Task 2) |
| `src/pages/Portfolio.jsx` | Removed unused `createPageUrl` import (Task 3) |
| `src/components/quote/EstimateResult.jsx` | Replaced `createPageUrl("Contact")` with `to="/contact"`, removed import (Task 3) |
| `src/pages/ThankYou.jsx` | Full rewrite: noindex, no pageview conversion, generic message for direct visits (Task 4) |
| `src/pages/Estimate.jsx` | Added UTM/gclid capture, `useNavigate`, `onSuccess` redirect to /thank-you?from=submit (Tasks 4 & 6) |

### Files Deleted (9 total)

| File | Reason |
|---|---|
| `src/pages/ContactForm.jsx` | Unrouted dead code (redirects to /estimate) |
| `src/pages/Quote.jsx` | Unrouted dead code (redirects to /estimate) |
| `src/pages/QuoteAssistant.jsx` | Unrouted dead code (redirects to /estimate) |
| `src/pages/FinishPackageStudio.jsx` | Unrouted dead code (redirects to /estimate) |
| `src/pages/ScheduleVisit.jsx` | Unrouted dead code (redirects to /estimate) |
| `src/components/finish/FinishPackageCard.jsx` | Exclusive to deleted FinishPackageStudio.jsx |
| `src/components/finish/HowItWorks.jsx` | Exclusive to deleted FinishPackageStudio.jsx |
| `src/components/finish/WhatsInsidePackage.jsx` | Exclusive to deleted FinishPackageStudio.jsx |
| `src/components/finish/FinishPackageFAQ.jsx` | Dead code (not imported by any file) |

### Files Created

| File | Content |
|---|---|
| `src/change-log-phase10.md` | This file |

---

## Build Verification

- ✅ No broken imports (codebase-wide scan confirmed)
- ✅ No remaining Formspree floating button references
- ✅ `src/components/finish/` directory is empty
- ✅ Google Ads conversion tags intact on /estimate
- ✅ gtag config loaded once site-wide in index.html
- ✅ UTM/gclid parameters captured and stored in lead records
- ✅ /thank-you has noindex, excluded from sitemap, Disallowed in robots.txt
- ✅ Exit-intent popup frequency-capped per session, suppressed on /estimate and /thank-you

---

## Manual Steps for Owner (Not the Agent)

1. **Google Ads:** Change final URLs on all active ads/campaigns from `/quoteassistant` and `/contactform` to `/estimate` (redirects in paid traffic cost latency, Quality Score, and tracking fidelity). Update any UTM templates at the same time.

2. **GSC:** Resubmit `sitemap.xml` now (redirects already handle old URLs; don't wait for CTA updates). Resubmit again only if URLs change in a future phase.

3. **Formspree:** Export any historical leads from the Formspree dashboard, then disable the form/account. The two remaining `fetch` calls in `Estimate.jsx` and `LeadCaptureForm.jsx` should be removed in a future cleanup when the owner confirms they no longer need Formspree as a backup notification channel.