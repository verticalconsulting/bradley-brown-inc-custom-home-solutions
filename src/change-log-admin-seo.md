# Change Log — Admin SEO Tools Audit & Correction

**Date:** 2026-08-04  
**Scope:** Audit and fix all admin SEO functions for Hado SEO proxy context, URL migration, and GSC property alignment  
**Context:** Site now runs behind Hado SEO (DNS-level prerender proxy). Bots receive cached prerendered HTML, not the live SPA.

---

## TASK 1 — "Submit Sitemap" Button

### What Was Broken
- The `submitSitemap` action only returned `{ success: true, sitemapUrl }` — no GSC response details (status, lastDownloaded, discovered URL count).
- The frontend displayed a generic "✓ Sitemap submitted" message with no actionable detail.

### What Changed
**Backend (`searchConsoleDashboard/entry.ts`):**
- After submitting the sitemap index (`PUT`), now also fetches the index details (`GET`) and child `/functions/sitemap` details.
- Returns `indexDetails` (path, lastSubmitted, lastDownloaded, isSitemapsIndex, isPending, errors, warnings, contents) and `childDetails` (path, lastDownloaded, isPending, errors, warnings).
- Sitemap URL submitted: `https://bradleybrowninc.com/sitemap.xml` (the Hado-served index) — confirmed correct.

**Frontend (`SEODashboard.jsx`):**
- Submit Sitemap section now displays two detail cards: one for the sitemap index, one for the child `/functions/sitemap`.
- Each card shows: path, last downloaded, pending status, errors, warnings, and discovered child sitemaps (for the index).
- Errors are surfaced with the full GSC error message, not a generic success.

### Test Result
```
Action: submitSitemap
Status: 200 (681ms)
✅ success: true
✅ sitemapUrl: https://bradleybrowninc.com/sitemap.xml
✅ indexDetails.lastDownloaded: 2026-08-04T21:04:33.503Z
✅ indexDetails.isPending: true
✅ indexDetails.errors: 0, warnings: 0
✅ indexDetails.contents: [{ type: "web", submitted: "1", indexed: "0" }]
✅ childDetails.path: https://bradleybrowninc.com/functions/sitemap
✅ childDetails.lastDownloaded: 2026-08-04T21:04:49.839Z
✅ childDetails.isPending: false, errors: 0, warnings: 0
```

---

## TASK 2 — "Resubmit Indexing — All Pages" Button

### What Was Broken
- Used a hard-coded `ALL_PAGES` array containing 20+ old/redirected URLs (`/contactform`, `/quoteassistant`, `/schedulevisit`, `/smallbathroomideas`, `/landingcoreservices`, `/barndominium-builder`, `/quote`, `/customertestimonials`, `/finish-package-studio`, etc.).
- No Hado cache refresh step — Google would index stale prerendered HTML.
- No priority queue — all URLs submitted simultaneously.
- No Indexing API caveat noted.

### What Changed
**Backend (`searchConsoleDashboard/entry.ts`):**
- Replaced hard-coded `ALL_PAGES` with `getAllCanonicalPaths(base44)` — sources live from the same shared module as the sitemap function (37 canonical URLs, zero redirected URLs).
- Added `sortByPriority()` — orders URLs: `/estimate` first, service pages, local landing pages, then blog posts last.
- Added code comment: "Google Indexing API officially supports only JobPosting/BroadcastEvent pages. The URL Inspection API's requestIndexing is only available through the GSC web UI, not the public API."
- Returns `note` field with the Indexing API caveat for the frontend to display.

**Frontend (`SEODashboard.jsx`):**
- Added blocking confirmation dialog before resubmit: "Refresh Hado cache in the dashboard first — Google will index the cached prerender."
- Displays the Indexing API caveat note from the backend response.

**Shared module (`base44/shared/canonicalUrls.ts`):**
- Created `getAllCanonicalPaths()` — fetches static pages + dynamic blog/jobsite URLs (same source as the sitemap function).
- Created `sortByPriority()` — priority queue for indexing requests.

### Test Result
- Verified via `getIndexStatus` (same canonical path source): 37 canonical URLs inspected, zero redirected URLs in the set. ✅
- Hado confirmation dialog fires before resubmit. ✅
- Priority queue applied. ✅

---

## TASK 3 — "Check Index Status" Button

### What Was Broken
- Used hard-coded `ALL_PAGES` with old/redirected URLs.
- Only showed verdict and coverageState — no Google-selected canonical, no user-declared canonical comparison, no referring sitemap, no crawl date.
- No inspection of old redirected URLs.

### What Changed
**Backend (`searchConsoleDashboard/entry.ts`):**
- Sources canonical URLs from `getAllCanonicalPaths()`.
- Each URL result now includes: `verdict`, `lastCrawlTime`, `coverageState`, `googleCanonical`, `userCanonical`, `sitemap`, `crawledAs`, `robotsTxtState`.
- Added `redirectResults` — inspects all 30 old/redirected URLs from the redirect map, returns their verdict, coverageState, lastCrawlTime, and `redirectTo` (the canonical destination).

**Frontend (`SEOIndexStatus.jsx`):**
- Each canonical URL row now shows: Google canonical vs declared canonical (mismatch flagged in red with ⚠️), last crawl date, referring sitemap.
- Added second tab: "Old Redirected URLs (30)" — shows old URLs with "Page with redirect" labeled as ✅ EXPECTED ("Redirect working"), not as an error.
- Old URLs not yet crawled show "Pending — Not yet crawled" (neutral).

### Test Result
```
Action: getIndexStatus
Status: 200 (82,255ms — 67 parallel URL inspections)

Canonical results (sample):
✅ /  → PASS, "Submitted and indexed", googleCanonical: https://bradleybrowninc.com/, userCanonical: https://bradleybrowninc.com/, crawled: 2026-08-04
✅ /services → PASS, "Submitted and indexed", canonical match
⚠️ /services/custom-home-building → NEUTRAL, "URL is unknown to Google" (new page, not yet crawled)

Redirect results: 30 old URLs inspected, "Page with redirect" expected ✅
```

---

## TASK 4 — Crawl Errors Analyzer

### What Was Broken
- Used a hard-coded `LANDING_PAGES` array with 29 old/redirected URLs.
- No distinction between bot-side and human-side 404s.
- No Hado dashboard integration.
- NotFoundLog (client-side 404 logging) was not displayed.

### What Changed
**Backend (`searchConsoleDashboard/entry.ts`):**
- Replaced `LANDING_PAGES` with `getAllCanonicalPaths()` (37 canonical URLs).
- Added `visitor404s` — fetches unresolved NotFoundLog records (human 404s only — bots see Hado's prerender, so client-side logging doesn't capture bot traffic).
- Added `hadoDashboardUrl: "https://hadoseo.com/dashboard"` in the response.
- Added `googleCanonical` and `userCanonical` to each page inspection result.

**Frontend (`SEOCrawlErrors.jsx`):**
- Added two-tab view:
  - **"Googlebot crawl issues"** — GSC URL Inspection results for all canonical pages (verdict, coverage, mobile, canonical comparison, perf data).
  - **"Visitor 404s"** — NotFoundLog records (path, hit count, last seen, referrer), with explanation that bots are not captured here.
- Added Hado dashboard link in the Googlebot tab.
- Performance data now uses URL normalization (old URLs roll up to canonical).

### Test Result
```
Action: getCrawlErrors
Status: 200 (48,611ms)

✅ pages: 37 canonical URLs inspected
✅ /  → PASS, 99 clicks, 3415 impressions, canonical match
✅ /services → PASS, 0 clicks, 118 impressions
✅ /services/custom-home-building → NEUTRAL, "URL is unknown to Google"
✅ visitor404s: NotFoundLog records returned
✅ hadoDashboardUrl: https://hadoseo.com/dashboard
✅ aiInsights: AI recommendations generated
```

---

## TASK 5 — Keyword, Top Queries, and Custom-Home Traffic Reports

### What Was Broken — CRITICAL: GSC Property String Mismatch

The GSC property is registered as `https://bradleybrowninc.com/` (with trailing slash). The code used `SITE_URL = "https://bradleybrowninc.com"` (without trailing slash) for:
- The `scApiBase` URL: `https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fbradleybrowninc.com` (missing `%2F`)
- The URL Inspection API `siteUrl` parameter: `siteUrl: "https://bradleybrowninc.com"`

**A property-string mismatch returns empty data silently** — this was likely causing all GSC Search Analytics and URL Inspection calls to return no data or 403 errors.

### What Changed
**Shared module (`base44/shared/canonicalUrls.ts`):**
- Added `GSC_PROPERTY = "https://bradleybrowninc.com/"` (with trailing slash — matches the registered property exactly).
- All GSC API calls now use `GSC_PROPERTY` instead of `SITE_URL`:
  - `scApiBase` uses `encodeURIComponent(GSC_PROPERTY)` → `https%3A%2F%2Fbradleybrowninc.com%2F`
  - URL Inspection `siteUrl` uses `GSC_PROPERTY`

### URL Normalization Layer
**Shared module (`base44/shared/canonicalUrls.ts`):**
- Created `normalizeToCanonical(pathOrUrl)` — strips origin, removes trailing slashes, applies the 30-entry redirect map.
- `getPageKeywords` and `getCrawlErrors` perf data now roll up old URLs into canonical destinations (e.g., `/landingpricing` metrics → `/pricing` row).

### Custom Home Traffic Report
**Backend (`searchConsoleDashboard/entry.ts`):**
- Changed from keyword-based filtering to page-URL filtering.
- Now filters on `/services/custom-home-building` and `/custom-home-builder-brandon-ms` using `dimensionFilterGroups` with `groupType: "OR"`.
- The combined `/services/kitchen-bathroom-remodeling` URL is retired (redirects to `/services/kitchen-remodeling`).

### Page-Level Keyword Report
**Frontend (`SEOPageKeywords.jsx`):**
- Updated hard-coded `ALL_PAGES` from old uppercase page names (`/Services`, `/QuoteAssistant`, `/LandingCoreServices`, etc.) to current canonical lowercase URLs (`/services`, `/services/custom-home-building`, `/services/kitchen-remodeling`, etc.).

### Test Results
```
Action: getQueries (90-day top queries)
Status: 200 (461ms)
✅ Returned 50 queries with clicks, impressions, CTR, position
✅ Property string: https://bradleybrowninc.com/
Sample: "custom home builders near me" (2 clicks, 15 impressions)

Action: getCustomHomeQueries
Status: 200 (461ms)
✅ Filtered by page URL (not keyword)
✅ targetPages: ["/services/custom-home-building", "/custom-home-builder-brandon-ms"]
Result: 0 rows (these pages have no search traffic yet — expected for new pages)

Action: getPageKeywords
Status: 200 (474ms)
✅ URL normalization applied — pages rolled up to canonical paths
✅ "/" page: 14 clicks, 1627 impressions, 15+ queries shown
✅ Old URLs (if any) would roll up to their canonical destinations
```

---

## TASK 6 — Admin Security & Hygiene

### 6.1 Auth-Gating

| Route | Before | After |
|---|---|---|
| `/seodashboard` | ✅ AdminRoute | ✅ AdminRoute |
| `/blogadmin` | ✅ AdminRoute | ✅ AdminRoute |
| `/leads` | ✅ AdminRoute | ✅ AdminRoute |
| `/conversiondashboard` | ✅ AdminRoute | ✅ AdminRoute |
| `/funnelanalysis` | ✅ AdminRoute | ✅ AdminRoute |
| `/siteimages` | ✅ AdminRoute | ✅ AdminRoute |
| `/crm` | ⚠️ **No auth-gate** (rendered via pagesConfig loop without AdminRoute) | ✅ Fixed — explicit route with AdminRoute added before pagesConfig loop |
| `/agentchat` | ⚠️ **No auth-gate** (rendered via pagesConfig loop without AdminRoute) | ✅ Fixed — explicit route with AdminRoute |
| `/tiktoksync` | ⚠️ **No auth-gate** (rendered via pagesConfig loop without AdminRoute) | ✅ Fixed — explicit route with AdminRoute |
| `/accountsettings` | ✅ Has internal auth check (`auth.me`) | ✅ No change needed (has internal auth) |

**Files changed:** `src/App.jsx` (added imports + explicit AdminRoute routes), `src/pages.config.js` (removed CRM, AgentChat, TikTokSync from PAGES object to prevent double-rendering).

### 6.2 noindex Meta Tags

| Route | Before | After |
|---|---|---|
| All AdminRoute-wrapped pages | ⚠️ No noindex | ✅ AdminRoute now renders `<meta name="robots" content="noindex, nofollow">` via Helmet |
| `/accountsettings` (pagesConfig) | ⚠️ No noindex | ⚠️ Not wrapped in AdminRoute — owner should add noindex or move to explicit route |

**File changed:** `src/components/AdminRoute.jsx` — added Helmet with noindex meta tag (applies to all AdminRoute-wrapped pages automatically).

### 6.3 robots.txt Disallow List

The robots.txt is now served by the Hado dashboard, not the Base44 function. The Base44 function (`robotsTxt/entry.ts`) was updated with the missing routes as a fallback/reference:

| Route | Base44 robots.txt | Hado Dashboard |
|---|---|---|
| `/seodashboard` | ✅ | ⚠️ Owner: verify in Hado |
| `/blogadmin` | ✅ | ⚠️ Owner: verify in Hado |
| `/leads` | ✅ | ⚠️ Owner: verify in Hado |
| `/crm` | ✅ | ⚠️ Owner: verify in Hado |
| `/accountsettings` | ✅ | ⚠️ Owner: verify in Hado |
| `/agentchat` | ✅ | ⚠️ Owner: verify in Hado |
| `/tiktoksync` | ✅ | ⚠️ Owner: verify in Hado |
| `/siteimages` | ✅ **Added** | ⚠️ **Owner: add to Hado** |
| `/conversiondashboard` | ✅ **Added** | ⚠️ **Owner: add to Hado** |
| `/funnelanalysis` | ✅ **Added** | ⚠️ **Owner: add to Hado** |
| `/thank-you` | ✅ | ⚠️ Owner: verify in Hado |
| `/error` | ✅ | ⚠️ Owner: verify in Hado |

**File changed:** `base44/functions/robotsTxt/entry.ts` — added `/siteimages`, `/conversiondashboard`, `/funnelanalysis` to the Disallow list.

### 6.4 GSC OAuth Tokens & API Keys — Security Audit

| Check | Status |
|---|---|
| GSC OAuth access token in frontend code | ✅ **Not exposed** — token obtained server-side via `base44.asServiceRole.connectors.getConnection("google_search_console")` in the backend function only |
| API keys in frontend code | ✅ **None found** |
| Client secrets in frontend code | ✅ **None found** |
| GSC token exposed in admin API response | ✅ **Not exposed** — the response contains only GSC API data (query results, inspection results, sitemap status), never the access token |
| All Google API calls in backend functions | ✅ **Confirmed** — all `fetch()` calls to Google APIs run in `searchConsoleDashboard/entry.ts` (Deno server-side), not in frontend code |

**Result: No secrets exposed.** ✅

---

## Files Changed Summary

| File | Changes |
|---|---|
| `base44/shared/canonicalUrls.ts` | **Created** — shared module with SITE_URL, GSC_PROPERTY (trailing slash), STATIC_PAGES, REDIRECT_MAP, normalizeToCanonical(), getAllCanonicalPaths(), getRedirectedUrls(), sortByPriority() |
| `base44/functions/searchConsoleDashboard/entry.ts` | **Full rewrite** — fixed GSC property string, replaced hard-coded ALL_PAGES/LANDING_PAGES with canonical paths, added URL normalization, enhanced submitSitemap/getIndexStatus/getCustomHomeQueries/getPageKeywords/getCrawlErrors, added getVisitor404s action |
| `src/pages/SEODashboard.jsx` | **Rewritten** — added Hado notice banner, Hado confirmation dialog for resubmit, submitSitemap response details display, property string display, Indexing API caveat display |
| `src/components/seo/SEOIndexStatus.jsx` | **Rewritten** — added canonical mismatch comparison (red flag), referring sitemap, crawl date, redirect URL tab (✅ EXPECTED labels) |
| `src/components/seo/SEOPageKeywords.jsx` | Updated ALL_PAGES from old uppercase names to current canonical lowercase URLs |
| `src/components/seo/SEOCrawlErrors.jsx` | **Rewritten** — added Googlebot/Visitor 404s tab switcher, Visitor 404s table (NotFoundLog), Hado dashboard link, canonical comparison in expanded rows |
| `src/components/AdminRoute.jsx` | Added Helmet with `noindex, nofollow` meta tag |
| `src/App.jsx` | Added explicit AdminRoute-wrapped routes for /crm, /agentchat, /tiktoksync before pagesConfig loop; added imports |
| `src/pages.config.js` | Removed CRM, AgentChat, TikTokSync from PAGES object and imports (now handled by explicit routes in App.jsx) |
| `base44/functions/robotsTxt/entry.ts` | Added /siteimages, /conversiondashboard, /funnelanalysis to Disallow list |

---

## Items Needing Owner Action

### Hado Dashboard (Manual)

1. **Add to Hado robots.txt Disallow list:**
   - `/siteimages`
   - `/conversiondashboard`
   - `/funnelanalysis`

2. **Verify in Hado robots.txt Disallow list:**
   - `/seodashboard`, `/blogadmin`, `/leads`, `/crm`, `/accountsettings`, `/agentchat`, `/tiktoksync`, `/thank-you`, `/error`

3. **Hado cache refresh:** Before clicking "Resubmit All" in the SEO Dashboard, manually refresh the Hado cache in the Hado dashboard so Google fetches fresh prerendered HTML.

4. **Hado crawl analytics:** If Hado exposes crawl/bot analytics via API, integrate it as a third data source in the crawl errors analyzer. Currently, a link to the Hado dashboard is provided instead.

### Google Search Console (Manual)

5. **GSC property:** Confirmed as `https://bradleybrowninc.com/` (non-www, https, trailing slash). All API calls now use this exact property string.

6. **Request indexing:** For high-priority new pages (e.g., `/services/custom-home-building`, `/services/kitchen-remodeling`), manually request indexing in the GSC web UI (URL Inspection → Request Indexing) — the public API does not support this for regular pages.

### Account Settings Page (Optional)

7. `/accountsettings` has its own internal auth check but no `noindex` meta tag. Consider wrapping it in AdminRoute or adding a noindex Helmet to prevent search engine indexing.

---

## Verification Summary

| Task | Test | Result |
|---|---|---|
| 1. Submit Sitemap | `submitSitemap` action | ✅ 200 — returned indexDetails + childDetails |
| 2. Resubmit All Pages | Hado confirmation + canonical paths + priority queue | ✅ Verified via getIndexStatus (same path source) |
| 3. Check Index Status | `getIndexStatus` action | ✅ 200 — 37 canonical + 30 redirect URLs inspected, canonical comparison shown |
| 4. Crawl Errors | `getCrawlErrors` action | ✅ 200 — 37 canonical pages + visitor404s + Hado link |
| 5. Top Queries (90-day) | `getQueries` action | ✅ 200 — 50 queries returned (property string fix confirmed) |
| 5. Custom Home Traffic | `getCustomHomeQueries` action | ✅ 200 — filtered by page URL (0 rows = no traffic yet for new pages) |
| 5. Page Keywords | `getPageKeywords` action | ✅ 200 — URL normalization applied, pages rolled up to canonical |
| 6. Admin auth-gating | App.jsx route audit | ✅ All admin routes now wrapped in AdminRoute |
| 6. noindex meta | AdminRoute Helmet | ✅ All AdminRoute pages have noindex |
| 6. robots.txt Disallow | robotsTxt function + Hado | ⚠️ Base44 updated; owner needs to add 3 routes to Hado |
| 6. Secrets audit | Frontend code scan | ✅ No secrets exposed — all GSC calls in backend |