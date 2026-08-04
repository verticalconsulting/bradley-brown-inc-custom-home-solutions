/**
 * imageManifest.js — Central registry of all public-facing pages and image categories.
 *
 * When you add a new page to the site, add it to PAGE_GROUPS below so it shows up
 * in the Image Manager admin. The pages here drive the sidebar and dropdowns —
 * no need to touch the SiteImages page itself.
 *
 * "key" must be unique — it's stored in SiteImage.location to link an image to a page.
 */

export const PAGE_GROUPS = [
  {
    group: "Global / Shared",
    pages: [
      { key: "Global", label: "Global Assets", path: "—" },
    ],
  },
  {
    group: "Main Pages",
    pages: [
      { key: "Home", label: "Homepage", path: "/" },
      { key: "Services", label: "Services Overview", path: "/services" },
      { key: "Portfolio", label: "Portfolio", path: "/portfolio" },
      { key: "About", label: "About Us", path: "/about" },
      { key: "Contact", label: "Contact", path: "/contact" },
      { key: "ProTips", label: "Pro Tips Blog", path: "/protips" },
      { key: "Pricing", label: "Pricing", path: "/pricing" },
      { key: "Estimate", label: "Free Estimate", path: "/estimate" },
      { key: "Legal", label: "Legal / Privacy", path: "/legal" },
      { key: "ThankYou", label: "Thank You Page", path: "/thank-you" },
    ],
  },
  {
    group: "Service Detail Pages",
    pages: [
      { key: "CustomHomeBuilding", label: "Custom Home Building", path: "/services/custom-home-building" },
      { key: "KitchenRemodeling", label: "Kitchen Remodeling", path: "/services/kitchen-remodeling" },
      { key: "BathroomRemodeling", label: "Bathroom Remodeling", path: "/services/bathroom-remodeling" },
      { key: "RoomAdditions", label: "Room Additions", path: "/services/room-additions" },
      { key: "OutdoorLiving", label: "Outdoor Living", path: "/services/outdoor-living" },
      { key: "Barndominiums", label: "Barndominiums", path: "/services/barndominiums" },
      { key: "EmergencyRepairs", label: "Emergency Repairs", path: "/services/emergency-repairs" },
    ],
  },
  {
    group: "Local Landing Pages",
    pages: [
      { key: "LandingCoreServices", label: "Remodeling in MS", path: "/remodeling-ms" },
      { key: "RemodelingBrandonMS", label: "Remodeling Brandon MS", path: "/remodeling-brandon-ms" },
      { key: "LandingBrandonCustomHomeBuilder", label: "Custom Home Builder Brandon", path: "/custom-home-builder-brandon-ms" },
      { key: "BathroomRemodelingBrandon", label: "Bathroom Remodeling Brandon", path: "/bathroom-remodeling-brandon-ms" },
      { key: "MadisonRemodeling", label: "Madison MS Remodeling", path: "/madison-ms-home-remodeling" },
      { key: "HistoricHomeRestoration", label: "Historic Home Restoration", path: "/projects/historic-home-restoration" },
    ],
  },
  {
    group: "Other",
    pages: [
      { key: "SmsOptin", label: "SMS Opt-In", path: "/sms-optin" },
      { key: "JobCheckin", label: "Jobsite Check-In", path: "/jobsite-checkin" },
    ],
  },
];

// Flat list of all pages for dropdowns/lookups
export const ALL_PAGES = PAGE_GROUPS.flatMap(g => g.pages);

export const PAGE_KEYS = ALL_PAGES.map(p => p.key);

export function getPageByKey(key) {
  return ALL_PAGES.find(p => p.key === key);
}

export function getPageLabel(key) {
  return getPageByKey(key)?.label || key;
}

export const IMAGE_CATEGORIES = [
  { value: "hero", label: "Hero / Banner" },
  { value: "logo", label: "Logo" },
  { value: "team", label: "Team / Crew" },
  { value: "association", label: "Association / Badge" },
  { value: "cta", label: "CTA Background" },
  { value: "background", label: "Section Background" },
  { value: "general", label: "General / Content" },
];

export function getCategoryLabel(value) {
  return IMAGE_CATEGORIES.find(c => c.value === value)?.label || value;
}