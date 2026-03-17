import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Wrench, Image, Phone } from "lucide-react";

const tabs = [
  { label: "Home",      page: "Home",      icon: Home  },
  { label: "Services",  page: "Services",  icon: Wrench },
  { label: "Portfolio", page: "Portfolio", icon: Image },
  { label: "Contact",   page: "Contact",   icon: Phone },
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
    navigate(remembered || createPageUrl(page));
  };

  return (
    <nav
      role="tablist"
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch justify-around">
        {tabs.map(({ label, page, icon: Icon }) => {
          const active = currentPageName === page;
          return (
            <button
              key={page}
              role="tab"
              aria-selected={active}
              aria-label={`Navigate to ${label}`}
              onClick={() => handleTabClick(page)}
              className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px] py-2 flex-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                active ? "text-sky-500" : "text-slate-500"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${active ? "text-sky-500" : "text-slate-400"}`}
                aria-hidden="true"
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}