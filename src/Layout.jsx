import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Phone, ChevronRight, ChevronLeft } from "lucide-react";
import BottomTabBar from "@/components/BottomTabBar";

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = currentPageName === "Home";
  const topLevelPages = ["Home", "Services", "Portfolio", "About", "Contact"];
  const isChildPage = !topLevelPages.includes(currentPageName);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", page: "Home" },
    { label: "Services", page: "Services" },
    { label: "Portfolio", page: "Portfolio" },
    { label: "About", page: "About" },
    { label: "Contact", page: "Contact" },
  ];

  const transparent = isHomePage && !scrolled;
  const navBg = transparent ? "bg-transparent" : "bg-white shadow-md";
  const textColor = transparent ? "text-white" : "text-[#1E2D3D]";
  const logoColor = transparent ? "text-white" : "text-[#1E2D3D]";

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {isChildPage && (
              <button
                onClick={() => navigate(-1)}
                className={`md:hidden flex items-center gap-1 text-sm font-medium mr-2 transition-colors ${transparent ? "text-white" : "text-[#1E2D3D]"} hover:text-[#C4922A]`}
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 bg-[#C4922A] rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">BB</span>
              </div>
              <div>
                <div className={`font-bold leading-tight text-sm md:text-base transition-colors ${logoColor}`}>Bradley Brown Inc.</div>
                <div className="text-[#C4922A] text-xs leading-tight">Custom Home Builder</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`text-sm font-medium transition-colors hover:text-[#C4922A] ${
                    currentPageName === link.page ? "text-[#C4922A]" : textColor
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:+16012345678"
                className={`hidden lg:flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#C4922A] ${textColor}`}
              >
                <Phone className="w-4 h-4" />
                (601) 234-5678
              </a>
              <Link
                to={createPageUrl("QuoteAssistant")}
                className="hidden md:inline-flex items-center gap-1 bg-[#C4922A] hover:bg-[#A37820] text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
              >
                Get a Quote <ChevronRight className="w-3 h-3" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded transition-colors ${textColor}`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="px-4 py-5 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    currentPageName === link.page
                      ? "bg-amber-50 text-[#C4922A]"
                      : "text-[#1E2D3D] hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <a href="tel:+16012345678" className="flex items-center gap-2 px-3 py-2 text-[#1E2D3D] font-medium">
                  <Phone className="w-4 h-4 text-[#C4922A]" />
                  (601) 234-5678
                </a>
                <Link
                  to={createPageUrl("QuoteAssistant")}
                  className="block bg-[#C4922A] text-white px-4 py-3 rounded-lg text-center font-semibold hover:bg-[#A37820] transition-colors"
                >
                  Get a Free Quote →
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0">{children}</main>

      <BottomTabBar currentPageName={currentPageName} />
      <footer className="bg-[#1E2D3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-[#C4922A] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BB</span>
                </div>
                <div>
                  <div className="font-bold text-white">Bradley Brown Inc.</div>
                  <div className="text-[#C4922A] text-xs">Custom Home Builder</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Building Central Mississippi's dream homes with craftsmanship, integrity, and attention to detail since 1995.
              </p>
              <div className="mt-5 space-y-2">
                <a href="tel:+16012345678" className="flex items-center gap-2 text-slate-300 hover:text-[#C4922A] text-sm transition-colors">
                  <Phone className="w-4 h-4" /> (601) 234-5678
                </a>
                <a href="mailto:info@bradleybrownhomes.com" className="block text-slate-300 hover:text-[#C4922A] text-sm transition-colors">
                  info@bradleybrownhomes.com
                </a>
                <p className="text-slate-500 text-sm">Jackson, Mississippi & Surrounding Areas</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-2">
                {["Custom Homes", "Renovations", "Room Additions", "Outdoor Living", "Design & Consultation"].map(s => (
                  <li key={s}>
                    <Link to={createPageUrl("Services")} className="text-slate-400 hover:text-[#C4922A] text-sm transition-colors">{s}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2">
                {[
                  { label: "Our Story", page: "About" },
                  { label: "Portfolio", page: "Portfolio" },
                  { label: "Contact Us", page: "Contact" },
                  { label: "Get a Quote", page: "QuoteAssistant" },
                ].map(item => (
                  <li key={item.page}>
                    <Link to={createPageUrl(item.page)} className="text-slate-400 hover:text-[#C4922A] text-sm transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2026 Bradley Brown Inc. All rights reserved.</p>
            <p className="text-slate-500 text-sm">Licensed & Insured · Mississippi General Contractor #MC-2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}