import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Single rewrite rule: any pathname containing uppercase letters
 * is redirected to its lowercase equivalent with replace (301-equivalent
 * for client-side routing). Consolidates all case-variant URLs into one
 * canonical lowercase URL so link equity isn't split across duplicates.
 */
export default function LowercaseRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (/[A-Z]/.test(location.pathname)) {
      navigate(
        location.pathname.toLowerCase() + location.search + location.hash,
        { replace: true }
      );
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
}