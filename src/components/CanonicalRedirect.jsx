import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

/**
 * Client-side canonical redirect: enforces https + non-www.
 * Acts as a safety net for any www or http traffic that reaches the SPA.
 * The primary fix must be at the DNS/hosting level (see notes below).
 */
export default function CanonicalRedirect() {
  const { protocol, hostname, pathname, search, hash } = window.location;
  const isWww = hostname.startsWith("www.");
  const isHttp = protocol === "http:" && hostname !== "localhost" && !hostname.startsWith("127.");
  const needsRedirect = isWww || isHttp;

  useEffect(() => {
    if (needsRedirect) {
      const canonicalHost = isWww ? hostname.slice(4) : hostname;
      const newUrl = `https://${canonicalHost}${pathname}${search}${hash}`;
      window.location.replace(newUrl);
    }
  }, [needsRedirect, isWww, hostname, pathname, search, hash]);

  if (!needsRedirect) return null;

  // Signal 301 to prerender services before the JS redirect fires
  const canonicalHost = isWww ? hostname.slice(4) : hostname;
  const target = `https://${canonicalHost}${pathname}${search}${hash}`;
  return (
    <Helmet>
      <meta name="prerender-status-code" content="301" />
      <meta name="prerender-header" content={`Location: ${target}`} />
      <meta name="robots" content="noindex" />
    </Helmet>
  );
}