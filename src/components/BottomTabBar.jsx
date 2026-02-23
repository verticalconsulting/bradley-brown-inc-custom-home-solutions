import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Wrench, Image, Phone } from "lucide-react";

const tabs = [
  { label: "Home", page: "Home", icon: Home },
  { label: "Services", page: "Services", icon: Wrench },
  { label: "Portfolio", page: "Portfolio", icon: Image },
  { label: "Contact", page: "Contact", icon: Phone },
];

export default function BottomTabBar({ currentPageName }) {
  const navigate = useNavigate();

  const handleTabClick = (page) => {
    if (currentPageName === page) {
      // Scroll to top when clicking current tab
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(createPageUrl(page));
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch justify-around">
        {tabs.map(({ label, page, icon: Icon }) => {
          const active = currentPageName === page;
          return (
            <button
              key={page}
              onClick={() => handleTabClick(page)}
              className={`flex flex-col items-center justify-center gap-0.5 py-2.5 flex-1 text-xs font-medium transition-colors ${
                active ? "text-sky-400" : "text-slate-500"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "text-sky-400" : "text-slate-400"}`} />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}