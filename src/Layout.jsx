import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { Menu, X, Phone, ChevronRight, ChevronLeft, Facebook, Settings } from "lucide-react";
import { base44 } from "@/api/base44Client";
import BottomTabBar from "@/components/BottomTabBar";
import VisitorChatWidget from "@/components/chat/VisitorChatWidget";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/0990d7b76_bradleybrowninc-logo2.png";

const associations = [
{
  name: "Licensed & Insured",
  img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/a21f22f37_licensed-insured.png",
  url: null
},
{
  name: "MS Board of Contractors",
  img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/f98532894_ms-contractor.png",
  url: "https://www.msboc.us"
},
{
  name: "Home Builders Association of MS",
  img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/103c2c527_mshba.png",
  url: "https://www.mshba.com"
},
{
  name: "NAHB",
  img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/532a0ecba_nahb.png",
  url: "https://www.nahb.org"
},
{
  name: "Better Business Bureau",
  img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/f47b53e12_bbb.png",
  url: "https://www.bbb.org"
}];


export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (document.getElementById("formspree-btn-script")) return;
    const script = document.createElement("script");
    script.id = "formspree-btn-script";
    script.src = "https://formspree.io/js/formbutton-v1.min.js";
    script.defer = true;
    script.onload = () => {
      window.formbutton = window.formbutton || function () {(window.formbutton.q = window.formbutton.q || []).push(arguments);};
      window.formbutton("create", {
        action: "https://formspree.io/f/xeeranrd",
        title: "Get a Quick Quote",
        fields: [
        { type: "text", label: "Name:", name: "name", required: true, placeholder: "Your name" },
        { type: "email", label: "Email:", name: "email", required: true, placeholder: "your@email.com" },
        { type: "tel", label: "Phone:", name: "phone", placeholder: "(601) 000-0000" },
        { type: "select", label: "Project Type:", name: "project_type", options: ["Custom Home", "Renovation", "Room Addition", "Outdoor Living", "Other"] },
        { type: "textarea", label: "Tell us about your project:", name: "message", placeholder: "Describe your project, budget, timeline..." },
        { type: "submit", value: "Send My Request" }],

        styles: {
          title: { backgroundColor: "#1E2D3D" },
          button: { backgroundColor: "#38bdf8" }
        }
      });
    };
    document.body.appendChild(script);
  }, []);

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
  { label: "Pro Tips", page: "ProTips" }];


  const transparent = isHomePage && !scrolled;
  const navBg = transparent ? "bg-transparent" : "bg-white shadow-md";
  const textColor = transparent ? "text-white" : "text-[#1E2D3D]";

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {isChildPage &&
            <button
              onClick={() => navigate(-1)}
              className={`md:hidden flex items-center gap-1 text-sm font-medium mr-2 transition-colors ${transparent ? "text-white" : "text-[#1E2D3D]"} hover:text-sky-400`}
              aria-label="Go back">

                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            }
            <Link to={createPageUrl("Home")} className="flex items-center gap-2 flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="Bradley Brown Inc."
                className={`h-10 md:h-12 w-auto object-contain transition-all ${transparent ? "brightness-0 invert" : ""}`} />

            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) =>
              <Link
                key={link.page}
                to={link.path || createPageUrl(link.page)}
                className={`text-sm font-medium transition-colors hover:text-sky-400 ${
                currentPageName === link.page ? "text-sky-400" : textColor}`
                }>

                  {link.label}
                </Link>
              )}
              <Link
                to={createPageUrl("AccountSettings")}
                className={`text-sm font-medium transition-colors hover:text-sky-400 ${
                currentPageName === "AccountSettings" ? "text-sky-400" : textColor}`}
                title="Account Settings">
                
                <Settings className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:+18443514154"
                onClick={() => {
                  base44.analytics.track({ eventName: "nav_phone_clicked" });
                  if (typeof window.gtag === 'function') {
                    window.gtag('event', 'conversion', {
                      'send_to': 'AW-17864041271/21TJCO2Bj5ccELfGnsZC',
                      'value': 30,
                      'currency': 'USD'
                    });
                  }
                }}
                className={`hidden lg:flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-sky-400 ${textColor}`}>

                <Phone className="w-4 h-4" />
                (844) 351-4154
              </a>
              {/* Desktop estimate CTA */}
              <Link
                to="/estimate" className="text-white px-4 py-2 text-sm font-semibold rounded hidden md:inline-flex items-center gap-1 hover:bg-sky-500 transition-colors bg-[#37b5eb]/[0.7]">

                Get My Free Estimate <ChevronRight className="w-3 h-3" />
              </Link>

              {/* Mobile estimate CTA — thumb-sized, always visible in the header */}
              <Link
                to="/estimate"
                onClick={() => base44.analytics.track({ eventName: "mobile_header_estimate_clicked", properties: { source: "mobile_header_sticky", page: currentPageName || "unknown" } })}
                className="md:hidden inline-flex items-center gap-1 bg-[#C4922A] hover:bg-[#A37820] text-white px-3.5 py-2.5 min-h-[44px] rounded-lg text-sm font-bold shadow-sm transition-colors"
                aria-label="Get a free estimate">
                Estimate
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded transition-colors ${textColor}`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>

                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen &&
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link) =>
            <Link
              key={link.page}
              to={link.path || createPageUrl(link.page)}
              className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
              currentPageName === link.page ?
              "bg-amber-50 text-sky-400" :
              "text-[#1E2D3D] hover:bg-gray-50"}`
              }>

                  {link.label}
                </Link>
            )}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <a
                href="tel:+18443514154"
                onClick={() => {
                  if (typeof window.gtag === 'function') {
                    window.gtag('event', 'conversion', {
                      'send_to': 'AW-17864041271/21TJCO2Bj5ccELfGnsZC',
                      'value': 30,
                      'currency': 'USD'
                    });
                  }
                }}
                className="flex items-center gap-2 px-3 py-2 text-[#1E2D3D] font-medium">
                  <Phone className="w-4 h-4 text-sky-400" />
                  (844) 351-4154
                </a>
                <Link
                to="/estimate"
                onClick={() => base44.analytics.track({ eventName: "mobile_menu_estimate_clicked", properties: { source: "mobile_menu", page: currentPageName || "unknown" } })}
                className="block bg-sky-400 text-white px-4 py-3 rounded-lg text-center font-semibold hover:bg-sky-500 transition-colors">

                  Get My Free Estimate →
                </Link>
              </div>
            </div>
          </div>
        }
      </nav>

      <main className="pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}>
            
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomTabBar currentPageName={currentPageName} />

      {/* Global chat widget (hidden on agent page) */}
      {currentPageName !== "AgentChat" && <VisitorChatWidget />}

      <footer className="bg-[#1E2D3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="mb-4">
                <img src={LOGO_URL} alt="Bradley Brown Inc." className="h-14 w-auto object-contain brightness-0 invert" />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Building Brandon and the Rankin County area's dream homes with craftsmanship, integrity, and attention to detail since 1995.
              </p>
              <div className="mt-5 space-y-2">
                <a
                  href="tel:+18443514154"
                  onClick={() => {
                    if (typeof window.gtag === 'function') {
                      window.gtag('event', 'conversion', {
                        'send_to': 'AW-17864041271/21TJCO2Bj5ccELfGnsZC',
                        'value': 30,
                        'currency': 'USD'
                      });
                    }
                  }}
                  className="flex items-center gap-2 text-slate-300 hover:text-sky-400 text-sm transition-colors">
                  <Phone className="w-4 h-4" /> (844) 351-4154
                </a>
                <a href="mailto:bradleybrowninc@gmail.com" className="block text-slate-300 hover:text-sky-400 text-sm transition-colors">
                  bradleybrowninc@gmail.com
                </a>
                <p className="text-slate-500 text-sm">104 Tiffany Drive, Brandon, MS 39042</p>
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://www.facebook.com/BradleyBrownInc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-sky-400 transition-colors"
                    aria-label="Facebook">
                    
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@bb859876"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-sky-400 transition-colors"
                    aria-label="TikTok">
                    
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.26 6.26 0 0 0-1-.08A6.26 6.26 0 0 0 5 20.1a6.26 6.26 0 0 0 10.86-3.47V8.26a8.26 8.26 0 0 0 3.73 1.48v-3.15z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
              <ul className="space-y-2">
                {[
                { label: "Custom Home Building", to: "/services/custom-home-building" },
                { label: "Kitchen & Bath Remodeling", to: "/services/kitchen-bathroom-remodeling" },
                { label: "Room Additions", to: "/services/room-additions" },
                { label: "Outdoor Living", to: "/services/outdoor-living" },
                { label: "Barndominiums", to: "/services/barndominiums" },
                { label: "Emergency Repairs", to: "/services/emergency-repairs" }].
                map((item) =>
                <li key={item.label}>
                    <Link to={item.to} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">{item.label}</Link>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-2">
                {[
                { label: "About Us", page: "About" },
                { label: "Portfolio", page: "Portfolio" },
                { label: "Pro Tips & Advice", page: "ProTips" },
                { label: "Contact Us", page: "Contact" },
                { label: "Get a Free Estimate", to: "/estimate" },
                { label: "Pricing Guide", to: "/pricing" },
                { label: "Renovation Loans", to: "/protips/renovation-loans" },
                { label: "Home Addition Ideas", to: "/protips/home-addition-ideas" },
                { label: "Small Bathroom Ideas", to: "/protips/small-bathroom-ideas" },
                { label: "Energy-Efficient Upgrades", to: "/protips/energy-efficient-upgrades" },
                { label: "Brandon MS Remodelers", to: "/remodeling-brandon-ms" },
                { label: "Legal", page: "Legal" }].
                map((item) =>
                <li key={item.label}>
                    <Link to={item.to || createPageUrl(item.page)} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">{item.label}</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Associations */}
          <div className="mt-10 pt-8 border-t border-slate-700">
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-4">Memberships & Certifications</p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              {associations.map((a) =>
              a.url ?
              <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer" title={a.name}
              className="opacity-70 hover:opacity-100 transition-opacity">
                    <img src={a.img} alt={a.name} className="h-12 w-auto object-contain" />
                  </a> :

              <div key={a.name} title={a.name} className="opacity-70">
                    <img src={a.img} alt={a.name} className="h-12 w-auto object-contain" />
                  </div>

              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 Designed by{" "}
              <a href="https://verticalconsulting.net" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 transition-colors">
                Five Hughes LLC
              </a>
            </p>
            <p className="text-slate-500 text-sm">Licensed & Insured · Mississippi General Contractor · 104 Tiffany Drive, Brandon, MS 39042</p>
          </div>
        </div>
      </footer>
    </div>);

}