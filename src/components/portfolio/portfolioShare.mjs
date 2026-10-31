// Share the published portfolio, never a preview URL, filter, or customer record.
export const PORTFOLIO_URL = "https://bradleybrowninc.com/portfolio";
export const PORTFOLIO_SHARE_DATA = Object.freeze({
  title: "Bradley Brown Inc. | Project Portfolio",
  text: "Explore Bradley Brown Inc.'s project portfolio.",
  url: PORTFOLIO_URL,
});

export async function copyPortfolioLink({ navigator, document }) {
  try {
    if (typeof navigator?.clipboard?.writeText === "function") {
      await navigator.clipboard.writeText(PORTFOLIO_URL);
      return "copied";
    }
  } catch {
    // Clipboard permissions can be denied; try the older copy API next.
  }

  if (!document?.body) return "manual";
  const previousFocus = document.activeElement;
  const selection = document.getSelection?.();
  const ranges = [];
  if (selection) {
    for (let i = 0; i < selection.rangeCount; i += 1) {
      ranges.push(selection.getRangeAt(i).cloneRange());
    }
  }
  const field = document.createElement("textarea");
  field.value = PORTFOLIO_URL;
  field.readOnly = true;
  field.setAttribute("aria-label", "Portfolio link to copy");
  field.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none";
  document.body.appendChild(field);
  try {
    field.focus({ preventScroll: true });
    field.select();
    field.setSelectionRange(0, field.value.length);
    return document.execCommand?.("copy") ? "copied" : "manual";
  } catch {
    return "manual";
  } finally {
    field.remove();
    previousFocus?.focus?.({ preventScroll: true });
    if (selection) {
      selection.removeAllRanges();
      ranges.forEach(range => selection.addRange(range));
    }
  }
}

export async function sharePortfolio(environment) {
  const { navigator } = environment;
  if (typeof navigator?.share === "function") {
    try {
      // Call immediately within the visitor's click: Web Share needs user activation.
      await navigator.share({ ...PORTFOLIO_SHARE_DATA });
      return "shared";
    } catch (error) {
      // Cancelling the share sheet must not unexpectedly replace the clipboard.
      if (error?.name === "AbortError") return "cancelled";
    }
  }
  return copyPortfolioLink(environment);
}
