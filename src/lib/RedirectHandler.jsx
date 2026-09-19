import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { findRedirect } from "./redirectMap";

/**
 * Catch-all route component that:
 *   1. Checks the redirect map and 301/302's if matched.
 *   2. Otherwise renders the child (the 404 page).
 *
 * Use inside the catch-all route in App.jsx:
 *   <Route path="*" element={<RedirectHandler><PageNotFound /></RedirectHandler>} />
 */
export default function RedirectHandler({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = findRedirect(location.pathname);

  // Short-circuit dotfile probes (e.g. /.env, /.git/config) — never serve, always 404.
  const isDotfile = /^\/\.[^/]/.test(location.pathname);

  useEffect(() => {
    if (redirect) {
      navigate(redirect.to, { replace: true });
    }
  }, [redirect, navigate]);

  if (isDotfile) {
    return (
      <Helmet>
        <meta name="prerender-status-code" content="404" />
        <meta name="robots" content="noindex" />
      </Helmet>
    );
  }

  if (redirect) {
    // Brief render that signals the status to prerender services.
    return (
      <Helmet>
        <meta name="prerender-status-code" content={String(redirect.type)} />
        <meta name="prerender-header" content={`Location: ${redirect.to}`} />
        <meta name="robots" content="noindex" />
      </Helmet>
    );
  }

  return children;
}