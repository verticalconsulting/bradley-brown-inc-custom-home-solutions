// Dynamic Open Graph image generator
// Endpoint: /functions/og?title=...&description=...&type=...&image=...
// Returns a 1200x630 SVG (image/svg+xml) — supported by all OG/Twitter crawlers.

const WIDTH = 1200;
const HEIGHT = 630;
const SITE_NAME = "Bradley Brown Inc.";
const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/0990d7b76_bradleybrowninc-logo2.png";

// Brand palette
const NAVY = "#1E2D3D";
const SKY = "#37b5eb";
const GOLD = "#C4922A";
const WHITE = "#FFFFFF";

// XML-escape user input so titles/descriptions can't break the SVG.
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Truncate with ellipsis at a character budget.
const truncate = (s, max) => {
  if (!s) return "";
  return s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s;
};

// Pick a font size that roughly fits the title in the available width.
const pickTitleSize = (title) => {
  const len = title.length;
  if (len <= 30) return 84;
  if (len <= 55) return 68;
  if (len <= 85) return 56;
  return 46;
};

// Naive word-wrap into N lines for the given char budget per line.
const wrapLines = (text, maxCharsPerLine, maxLines) => {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const w of words) {
    const candidate = current ? current + " " + w : w;
    if (candidate.length > maxCharsPerLine) {
      if (current) lines.push(current);
      current = w;
      if (lines.length === maxLines - 1) break;
    } else {
      current = candidate;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  // Truncate last line if there was overflow
  if (lines.length === maxLines) {
    const remaining = words.slice(lines.join(" ").split(/\s+/).length).join(" ");
    if (remaining) {
      const last = lines[maxLines - 1];
      lines[maxLines - 1] = truncate(last + " " + remaining, maxCharsPerLine);
    }
  }
  return lines;
};

// Validate that an image URL looks safe-ish to embed (must be https).
const safeImageUrl = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return null;
    return u.toString();
  } catch {
    return null;
  }
};

// Per-template label shown above the title.
const templateLabel = (type) => {
  switch ((type || "").toLowerCase()) {
    case "article":
    case "blog":
      return "PRO TIPS · ARTICLE";
    case "product":
      return "FEATURED";
    case "jobsite":
      return "RECENT JOBSITE";
    default:
      return "BRANDON, MS · SINCE 1995";
  }
};

const buildSVG = ({ title, description, type, image, meta }) => {
  const safeTitle = esc(truncate(title || SITE_NAME, 120));
  const safeDesc = esc(truncate(description || "", 180));
  const safeMeta = esc(truncate(meta || "", 80));
  const label = esc(templateLabel(type));
  const bgImage = safeImageUrl(image);

  const titleSize = pickTitleSize(title || SITE_NAME);
  const titleCharsPerLine = Math.floor(20 * (84 / titleSize)) + 4;
  const titleLines = wrapLines(safeTitle, titleCharsPerLine, 3);

  const descLines = safeDesc ? wrapLines(safeDesc, 70, 2) : [];

  // Title block positioning
  const titleStartY = 280;
  const titleLineHeight = Math.round(titleSize * 1.15);

  const descStartY = titleStartY + titleLines.length * titleLineHeight + 30;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="#0F1A26"/>
    </linearGradient>
    <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${NAVY}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${NAVY}" stop-opacity="0.92"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  ${bgImage ? `
  <image href="${esc(bgImage)}" x="0" y="0" width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="xMidYMid slice"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#overlay)"/>
  ` : ""}

  <!-- Top accent bar -->
  <rect x="0" y="0" width="${WIDTH}" height="8" fill="${SKY}"/>

  <!-- Logo (top left) -->
  <image href="${esc(LOGO_URL)}" x="60" y="60" width="220" height="80" preserveAspectRatio="xMidYMid meet"/>

  <!-- Template label pill -->
  <g transform="translate(60, 200)">
    <rect x="0" y="0" rx="20" ry="20" width="${label.length * 11 + 40}" height="40" fill="${SKY}" fill-opacity="0.18" stroke="${SKY}" stroke-width="1"/>
    <text x="20" y="26" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="700" fill="${SKY}" letter-spacing="2">${label}</text>
  </g>

  <!-- Title -->
  <g font-family="Georgia, 'Times New Roman', serif" fill="${WHITE}" font-weight="700">
    ${titleLines
      .map(
        (line, i) =>
          `<text x="60" y="${titleStartY + i * titleLineHeight}" font-size="${titleSize}">${line}</text>`,
      )
      .join("")}
  </g>

  <!-- Description -->
  ${
    descLines.length
      ? `<g font-family="Helvetica, Arial, sans-serif" fill="#E2E8F0" font-weight="400">
    ${descLines
      .map(
        (line, i) =>
          `<text x="60" y="${descStartY + i * 36}" font-size="26">${line}</text>`,
      )
      .join("")}
  </g>`
      : ""
  }

  <!-- Bottom branding bar -->
  <rect x="0" y="${HEIGHT - 80}" width="${WIDTH}" height="80" fill="${NAVY}" fill-opacity="0.85"/>
  <rect x="0" y="${HEIGHT - 80}" width="6" height="80" fill="${GOLD}"/>
  <text x="60" y="${HEIGHT - 32}" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="${WHITE}">bradleybrowninc.com</text>
  <text x="${WIDTH - 60}" y="${HEIGHT - 32}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="500" fill="${SKY}">${safeMeta || "Custom Homes · Remodeling · Brandon, MS"}</text>
</svg>`;
};

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const title = params.get("title") || SITE_NAME;
    const description = params.get("description") || "";
    const type = params.get("type") || "default";
    const image = params.get("image") || "";
    const meta = params.get("meta") || ""; // optional small bottom-right text (e.g. author · date, or price)

    const svg = buildSVG({ title, description, type, image, meta });

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        // Cache aggressively at CDN/browser — params determine uniqueness.
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      },
    });
  } catch (error) {
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}"><rect width="100%" height="100%" fill="${NAVY}"/><text x="50%" y="50%" text-anchor="middle" fill="white" font-family="sans-serif" font-size="40">${SITE_NAME}</text></svg>`,
      {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Cache-Control": "public, max-age=300",
          "X-OG-Error": String(error.message || "unknown"),
        },
      },
    );
  }
});