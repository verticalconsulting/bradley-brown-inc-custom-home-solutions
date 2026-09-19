import React from "react";

export const BBB_PROFILE_URL =
  "https://www.bbb.org/us/ms/brandon/profile/home-builders/bradley-brown-inc-0523-235908473";

const BBB_SEAL_URL = "https://m.bbb.org/brand/seals/Accredited_Business_Seal_NoRating_RGB.svg";

/**
 * BBBAccreditedBadge — official BBB Accredited Business seal with our A+ rating,
 * linking to the verified BBB profile. Matches the CertificateBadge styling so
 * credentials read as one consistent set.
 */
export default function BBBAccreditedBadge({ variant = "light" }) {
  const isDark = variant === "dark";

  return (
    <a
      href={BBB_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors ${
        isDark
          ? "bg-white/5 hover:bg-white/10 border-slate-600"
          : "bg-white hover:opacity-80 border-gray-100 shadow-sm"
      }`}
      aria-label="Bradley Brown Inc. is a BBB Accredited Business with an A+ rating — view our BBB profile"
    >
      <img
        src={BBB_SEAL_URL}
        alt="BBB Accredited Business seal"
        width="64"
        height="96"
        loading="lazy"
        decoding="async"
        className="h-16 w-auto flex-shrink-0"
      />
      <div className="text-left">
        <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-[#1E2D3D]"}`}>
          BBB Accredited Business
        </p>
        <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          A+ Rating · Accredited Since 2026 · Click to view profile
        </p>
      </div>
    </a>
  );
}