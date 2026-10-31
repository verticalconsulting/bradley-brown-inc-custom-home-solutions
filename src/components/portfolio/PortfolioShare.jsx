import React, { useRef, useState } from "react";
import { copyPortfolioLink, PORTFOLIO_URL, sharePortfolio } from "./portfolioShare.mjs";

export default function PortfolioShare() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [showManualCopy, setShowManualCopy] = useState(false);
  const inProgress = useRef(false);

  const handleAction = async (action) => {
    if (inProgress.current) return;
    inProgress.current = true;
    setBusy(true);
    setStatus("");
    setShowManualCopy(false);
    try {
      const environment = { navigator: window.navigator, document: window.document };
      const result = await (action === "share"
        ? sharePortfolio(environment)
        : copyPortfolioLink(environment));
      setShowManualCopy(result === "manual");
      setStatus({
        shared: "Portfolio shared.",
        copied: "Portfolio link copied. Paste it into a message to share these projects.",
        cancelled: "Sharing cancelled. You can still copy the portfolio link.",
        manual: "Automatic copying is unavailable. Select and copy the portfolio link below.",
      }[result]);
    } catch {
      setShowManualCopy(true);
      setStatus("Automatic sharing is unavailable. Select and copy the portfolio link below.");
    } finally {
      inProgress.current = false;
      setBusy(false);
    }
  };

  const buttonClasses = "min-h-11 w-full sm:w-auto px-5 py-3 rounded-lg text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066CC] disabled:opacity-60 disabled:cursor-wait transition-colors";

  return (
    <section
      aria-labelledby="portfolio-share-heading"
      className="mb-8 rounded-xl border border-[#003D82]/20 bg-white p-5 sm:p-6"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h2
            id="portfolio-share-heading"
            className="text-xl font-bold text-[#002855]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Share these projects
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Know someone planning a home project? Send them our portfolio.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={busy}
            onClick={() => handleAction("share")}
            className={`${buttonClasses} bg-[#003D82] text-white hover:bg-[#002855]`}
          >
            Share portfolio
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => handleAction("copy")}
            className={`${buttonClasses} border border-[#003D82] bg-white text-[#003D82] hover:bg-slate-50`}
          >
            Copy link
          </button>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-600">
        Opens your device’s sharing options when available, or copies the portfolio link.
      </p>
      <p role="status" aria-live="polite" aria-atomic="true" className="mt-2 min-h-5 text-sm text-[#002855]">
        {status}
      </p>
      {showManualCopy && (
        <div className="mt-3">
          <label htmlFor="portfolio-share-url" className="block text-sm font-semibold text-[#002855]">
            Portfolio link
          </label>
          <input
            id="portfolio-share-url"
            type="url"
            readOnly
            value={PORTFOLIO_URL}
            onFocus={event => event.target.select()}
            className="mt-2 min-h-11 w-full min-w-0 rounded-lg border border-[#003D82] px-3 py-2 text-base text-[#002855] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066CC]"
          />
        </div>
      )}
    </section>
  );
}
