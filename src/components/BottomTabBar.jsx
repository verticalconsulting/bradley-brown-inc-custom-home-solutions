import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Wrench, Image, Phone } from "lucide-react";

const tabs = [
  { label: "Home", page: "Home", icon: Home },
  { label: "Services", page: "Services", icon: Wrench },
  { label: "Portfolio", page: "Portfolio", icon: Image },
  { label: "Contact", page: "Contact", icon: Phone },
];

export default function BottomTabBar({ currentPageName }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch justify-around">
        {tabs.map(({ label, page, icon: Icon }) => {
          const active = currentPageName === page;
          return (
            <Link
              key={page}
              to={createPageUrl(page)}
              className={`flex flex-col items-center justify-center gap-0.5 py-2.5 flex-1 text-xs font-medium transition-colors ${
                active ? "text-sky-400" : "text-slate-500"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "text-sky-400" : "text-slate-400"}`} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}