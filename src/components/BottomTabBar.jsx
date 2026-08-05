import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Wrench, Image, Sparkles, Phone } from "lucide-react";

const tabs = [
  { label: "Home",      page: "Home",        icon: Home  },
  { label: "Services",  page: "Services",    icon: Wrench },
  { label: "Estimate",  page: "Estimate",    icon: Sparkles, highlight: true, path: "/estimate" },
  { label: "Portfolio", page: "Portfolio",   icon: Image },
  { label: "Contact",   page: "Contact",     icon: Phone },
];

export default function BottomTabBar({ currentPageName }) {
  const navigate = useNavigate();
  const location = useLocation();
  // Per-tab stack: remember last path visited under each tab
  const tabStack = useRef({});

  const handleTabClick = (page) => {
    if (currentPageName === page) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Save current location under its owning tab before leaving
    const activeTab = tabs.find(t => t.page === currentPageName);
    if (activeTab) {
      tabStack.current[activeTab.page] = location.pathname + location.search;
    }
    // Navigate to last known path for the tapped tab, or its root
    const remembered = tabStack.current[page];
    const tab = tabs.find(t => t.page === page);
    navigate(remembered || tab?.path || createPageUrl(page));
  };

  return (
    <nav
      role="tablist"
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch justify-around">
        {tabs.map(({ label, page, icon: Icon, highlight }) => {
          const active = currentPageName === page;
          return (
            <button
              key={page}
              role="tab"
              aria-selected={active}
              aria-label={`Navigate to ${label}`}
              onClick={() => handleTabClick(page)}
              className={`flex flex-col items-center justify-center gap-0.5 min-h-[56px] min-w-[44px] py-2 flex-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 relative ${
                highlight
                  ? active ? "text-primary" : "text-primary"
                  : active ? "text-sky-600" : "text-slate-600"
              }`}
            >
              {highlight ? (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-0.5 shadow-md transition-colors ${active ? "bg-primary/80" : "bg-primary"}`}>
                  <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
              ) : (
                <Icon
                  className={`w-5 h-5 ${active ? "text-sky-600" : "text-slate-600"}`}
                  aria-hidden="true"
                />
              )}
              <span className={highlight ? "font-bold text-primary" : ""}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}