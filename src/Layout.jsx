import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { Menu, X, Phone, ChevronRight, ChevronLeft, Facebook } from "lucide-react";
import { base44 } from "@/api/base44Client";
import BottomTabBar from "@/components/BottomTabBar";
import VisitorChatWidget from "@/components/chat/VisitorChatWidget";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/0990d7b76_bradleybrowninc-logo2.png";

const associations = [
{
  name: "Licensed & Insured",
  img: "https://media.base44.com/images/public/699c758479c46f0580553750/f7e570d9e_generated_image.png",
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
  { label: "About", page: "About" },
  { label: "Portfolio", page: "Portfolio" },
  { label: "Pricing", to: "/pricing" },
  { label: "Pro Tips", page: "ProTips" },
  { label: "Contact", page: "Contact" }];

  const serviceLinks = [
  { label: "Custom Home Building", to: "/services/custom-home-building" },
  { label: "Kitchen Remodeling", to: "/services/kitchen-remodeling" },
  { label: "Bathroom Remodeling", to: "/services/bathroom-remodeling" },
  { label: "Room Additions", to: "/services/room-additions" },
  { label: "Outdoor Living", to: "/services/outdoor-living" },
  { label: "Barndominiums", to: "/services/barndominiums" },
  { label: "Emergency Repairs", to: "/services/emergency-repairs" }];


  const transparent = isHomePage && !scrolled;
  const navBg = transparent ? "bg-transparent" : "bg-background shadow-md";
  const textColor = transparent ? "text-white" : "text-foreground";

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-br-lg focus:shadow-lg">
        
        Skip to main content
      </a>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {isChildPage &&
            <button
              onClick={() => navigate(-1)}
              className={`md:hidden flex items-center gap-1 text-sm font-medium mr-2 transition-colors ${transparent ? "text-white" : "text-foreground"} hover:text-primary`}
              aria-label="Go back">

                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            }
            <Link to={createPageUrl("Home")} className="flex items-center gap-2 flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="Bradley Brown Inc."
                width="167"
                height="70"
                className={`h-10 md:h-12 w-auto object-contain transition-all ${transparent ? "brightness-0 invert" : ""}`}
                decoding="async" />

            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link
                to={createPageUrl("Home")}
                aria-current={currentPageName === "Home" ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-primary underline-offset-4 hover:underline ${
                currentPageName === "Home" ? "text-primary underline" : textColor}`}>
                Home
              </Link>
              <div className="relative group">
                <Link
                  to="/services"
                  className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-0.5 ${
                  currentPageName === "Services" ? "text-primary" : textColor}`}>

                  Services <ChevronRight className="w-3 h-3 rotate-90" />
                </Link>
                <div className="absolute top-full left-0 pt-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    {serviceLinks.map((link) =>
                    <Link key={link.to} to={link.to} className="block px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-primary underline-offset-2 hover:underline transition-colors">
                            {link.label}
                          </Link>
                    )}
                  </div>
                </div>
              </div>
              {navLinks.map((link) =>
              <Link
                key={link.label}
                to={link.to || link.path || createPageUrl(link.page)}
                aria-current={currentPageName === link.page ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-primary underline-offset-4 hover:underline ${
                currentPageName === link.page ? "text-primary underline" : textColor}`
                }>

                  {link.label}
                </Link>
              )}
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
                className={`hidden lg:flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${textColor}`}>

                <Phone className="w-4 h-4" />
                (844) 351-4154
              </a>
              {/* Desktop estimate CTA */}
              <Link
                to="/estimate" className="text-white px-5 py-2.5 text-sm min-h-[44px] font-semibold rounded hidden md:inline-flex items-center gap-1 hover:opacity-90 transition-colors bg-primary">Get My Free Estimate


              </Link>

              {/* Mobile estimate CTA — thumb-sized, always visible in the header */}
              <Link
                to="/estimate"
                onClick={() => base44.analytics.track({ eventName: "mobile_header_estimate_clicked", properties: { source: "mobile_header_sticky", page: currentPageName || "unknown" } })}
                className="md:hidden inline-flex items-center gap-1 bg-primary hover:opacity-90 text-white px-3.5 py-2.5 min-h-[44px] rounded-lg text-sm font-bold shadow-sm transition-colors"
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
              <Link
              to={createPageUrl("Home")}
              className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
              currentPageName === "Home" ? "bg-accent text-primary" : "text-foreground hover:bg-gray-50"}`}>
                Home
              </Link>
              <div className="px-3 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Services</p>
                {serviceLinks.map((link) =>
              <Link key={link.to} to={link.to} className="block px-3 py-2 rounded-lg text-sm text-foreground hover:bg-gray-50 transition-colors">
                    {link.label}
                  </Link>
              )}
              </div>
              {navLinks.map((link) =>
            <Link
              key={link.label}
              to={link.to || link.path || createPageUrl(link.page)}
              className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
              currentPageName === link.page ?
              "bg-accent text-primary" :
              "text-foreground hover:bg-gray-50"}`
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
                className="flex items-center gap-2 px-3 py-2 text-foreground font-medium">
                  <Phone className="w-4 h-4 text-primary" />
                  (844) 351-4154
                </a>
                <Link
                to="/estimate"
                onClick={() => base44.analytics.track({ eventName: "mobile_menu_estimate_clicked", properties: { source: "mobile_menu", page: currentPageName || "unknown" } })}
                className="block bg-primary text-white px-4 py-3.5 min-h-[48px] rounded-lg text-center font-semibold hover:opacity-90 transition-colors">

                  Get My Free Estimate →
                </Link>
              </div>
            </div>
          </div>
        }
      </nav>

      <main id="main-content" className="pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0">
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

      <footer className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="mb-4">
                <img src={LOGO_URL} alt="Bradley Brown Inc." width="167" height="70" className="h-14 w-auto object-contain brightness-0 invert" decoding="async" />
              </div>
              <p className="text-sm leading-relaxed max-w-sm text-[hsl(var(--background))]">Building Brandon and the Rankin County area's dream homes with craftsmanship, integrity, and attention to detail since 1995.

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
                  className="flex items-center gap-2 hover:text-primary text-sm transition-colors text-[hsl(var(--ring))]">
                  <Phone className="w-4 h-4" /> (844) 351-4154
                </a>
                <Link to="/contact" className="block hover:text-primary text-sm transition-colors text-[hsl(var(--ring))]">Email Us Online

                </Link>
                <p className="text-sm text-[hsl(var(--ring))]">104 Tiffany Drive, Brandon, MS 39042</p>
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://www.facebook.com/BradleyBrownInc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Facebook">
                    
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@bb859876"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="TikTok">
                    
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.26 6.26 0 0 0-1-.08A6.26 6.26 0 0 0 5 20.1a6.26 6.26 0 0 0 10.86-3.47V8.26a8.26 8.26 0 0 0 3.73 1.48v-3.15z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[hsl(var(--ring))]">SERVICES</h3>
              <ul className="space-y-2">
                {[
                { label: "Custom Home Building", to: "/services/custom-home-building" },
                { label: "Kitchen Remodeling", to: "/services/kitchen-remodeling" },
                { label: "Bathroom Remodeling", to: "/services/bathroom-remodeling" },
                { label: "Room Additions", to: "/services/room-additions" },
                { label: "Outdoor Living", to: "/services/outdoor-living" },
                { label: "Barndominiums", to: "/services/barndominiums" },
                { label: "Emergency Repairs", to: "/services/emergency-repairs" }].
                map((item) =>
                <li key={item.label}>
                    <Link to={item.to} className="hover:text-primary text-sm underline-offset-2 hover:underline transition-colors text-[hsl(var(--input))]">{item.label}</Link>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[hsl(var(--ring))]">COMPANY</h3>
              <ul className="space-y-2">
                {[
                { label: "About Us", page: "About" },
                { label: "Portfolio", page: "Portfolio" },
                { label: "Pro Tips", page: "ProTips" },
                { label: "Pricing", to: "/pricing" },
                { label: "Remodeling in MS", to: "/remodeling-ms" },
                { label: "Contact Us", page: "Contact" },
                { label: "Legal", page: "Legal" }].
                map((item) =>
                <li key={item.label}>
                    <Link to={item.to || createPageUrl(item.page)} className="hover:text-primary text-sm underline-offset-2 hover:underline transition-colors text-[hsl(var(--input))]">{item.label}</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Associations */}
          <div className="mt-10 pt-8 border-t border-slate-700">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4">Memberships & Certifications</p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              {associations.map((a) =>
              a.url ?
              <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer" title={a.name}
              className="opacity-70 hover:opacity-100 transition-opacity">
                    <img src={a.img} alt={a.name} width="96" height="48" className="h-12 w-auto object-contain" loading="lazy" decoding="async" />
                  </a> :

              <div key={a.name} title={a.name} className="opacity-70">
                    <img src={a.img} alt={a.name} width="96" height="48" className="h-12 w-auto object-contain" loading="lazy" decoding="async" />
                  </div>

              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2026 Designed by{" "}
              <a href="https://verticalconsulting.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-foreground transition-colors">
                Five Hughes LLC
              </a>
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <Link to="/seodashboard" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Employee Portal
              </Link>
              <p className="text-muted-foreground text-sm">Licensed & Insured · Mississippi General Contractor · 104 Tiffany Drive, Brandon, MS 39042</p>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}