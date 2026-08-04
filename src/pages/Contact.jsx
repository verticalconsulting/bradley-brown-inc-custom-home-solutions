import React, { useState } from "react";
import MobileSelectDrawer from "@/components/quote/MobileSelectDrawer";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema } from "@/components/seoSchemas";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, Mail, MapPin, Clock, CheckCircle, ChevronRight, MessageCircle, Calendar, Zap } from "lucide-react";
import ContactTrustBar from "@/components/landing/ContactTrustBar";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", project_type: "custom_home" });
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await Promise.all([
      base44.entities.QuoteRequest.create({
        name: form.name,
        email: form.email,
        phone: form.phone,
        description: form.message,
        project_type: form.project_type,
        status: "new",
      }),
      (() => {
        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("email", form.email);
        fd.append("phone", form.phone);
        fd.append("project_type", form.project_type);
        fd.append("message", form.message);
        return fetch("https://formspree.io/f/xeeranrd", {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: fd,
        });
      })(),
    ]);

    base44.analytics.track({
      eventName: "contact_form_submitted",
      properties: {
        project_type: form.project_type,
        has_phone: !!form.phone,
      },
    });
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Contact Bradley Brown Inc. — Brandon, MS Contractor"
        description="Contact Central Mississippi's trusted home remodeler. Call (844) 351-4154 or message us — serving Brandon, Flowood, Pearl, Madison & surrounding areas. Free estimates."
        schema={localBusinessSchema}
        canonical="https://bradleybrowninc.com/contact"
      />
      <div className="bg-[#1E2D3D] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Get in Touch</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Let's Talk About Your Project</h1>
          <p className="text-slate-300 mt-3 max-w-xl mx-auto">Free estimates — no obligation. Choose how you'd like to reach us:</p>
        </div>
      </div>

      {/* Direct contact options — prominent above the fold */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Call */}
            <a
              href="tel:+18443514154"
              onClick={() => {
                base44.analytics.track({ eventName: "contact_phone_clicked" });
                if (typeof window.gtag === 'function') window.gtag('event', 'conversion', { send_to: 'AW-17864041271/21TJCO2Bj5ccELfGnsZC', value: 30, currency: 'USD' });
              }}
              className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white px-5 py-4 rounded-xl transition-colors shadow-md group"
            >
              <div className="w-11 h-11 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium opacity-80 uppercase tracking-wide">Fastest Response</p>
                <p className="font-bold text-lg leading-tight">(844) 351-4154</p>
                <p className="text-xs opacity-75">Call or text anytime</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:bradleybrowninc@gmail.com"
              onClick={() => base44.analytics.track({ eventName: "contact_email_clicked" })}
              className="flex items-center gap-4 bg-sky-500 hover:bg-sky-600 text-white px-5 py-4 rounded-xl transition-colors shadow-md group"
            >
              <div className="w-11 h-11 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium opacity-80 uppercase tracking-wide">Email Us</p>
                <p className="font-bold text-base leading-tight">bradleybrowninc</p>
                <p className="text-xs opacity-75">@gmail.com</p>
              </div>
            </a>

            {/* Live Chat */}
            <button
              onClick={() => {
                base44.analytics.track({ eventName: "contact_chat_clicked" });
                // Open the chat widget
                const chatBtn = document.querySelector('[data-chat-trigger]');
                if (chatBtn) chatBtn.click();
                else window.dispatchEvent(new CustomEvent('open-chat-widget'));
              }}
              className="flex items-center gap-4 bg-[#1E2D3D] hover:bg-[#2a3f56] text-white px-5 py-4 rounded-xl transition-colors shadow-md group"
            >
              <div className="w-11 h-11 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium opacity-80 uppercase tracking-wide">Live Chat</p>
                <p className="font-bold text-base leading-tight">Chat with Us</p>
                <p className="text-xs opacity-75">Usually replies in minutes</p>
              </div>
            </button>
          </div>

          {/* Quick trust signals */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-5 text-xs text-slate-500">
            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Free estimates, no obligation</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Licensed & insured since 1995</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Replies within 1 business day</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-sky-500" /> Mon–Fri 8am–6pm · Sat 9am–3pm</span>
          </div>
        </div>
      </div>

      {/* Trust bar — license, insurance, experience, BBB */}
      <ContactTrustBar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="text-xl font-bold text-[#1E2D3D] mb-5">Other Ways to Connect</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-semibold text-[#1E2D3D] mb-0.5">Schedule a Free Site Visit</p>
                  <p className="text-slate-500 text-sm mb-2">We'll come to you — no commitment required.</p>
                  <Link to={createPageUrl("ScheduleVisit")} className="inline-flex items-center gap-1 text-sky-600 text-sm font-medium hover:underline">
                    Book a visit <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-semibold text-[#1E2D3D] mb-0.5">Get an AI Estimate Instantly</p>
                  <p className="text-slate-500 text-sm mb-2">Answer a few questions and get a personalized cost range in seconds.</p>
                  <Link to={createPageUrl("QuoteAssistant")} className="inline-flex items-center gap-1 text-sky-600 text-sm font-medium hover:underline">
                    Try the AI Estimator <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <p className="font-semibold text-[#1E2D3D] mb-0.5">Our Location</p>
                  <p className="text-slate-500 text-sm">104 Tiffany Drive, Brandon, MS 39042</p>
                  <p className="text-slate-400 text-xs mt-1">Serving Brandon, Flowood, Pearl, Madison, Ridgeland, Jackson, Clinton, Byram & all of Central MS</p>
                </div>
              </div>
            </div>
          </div>

          <div id="send-message" className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100 scroll-mt-24">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1E2D3D] mb-2">Message Received!</h3>
                <p className="text-slate-500">We'll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-[#1E2D3D]">Send Us a Message</h3>
                  <p className="text-slate-400 text-sm mt-1">We reply within 1 business day — usually same day.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Your Name *</label>
                    <input required type="text" value={form.name} onChange={e => update("name", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400"
                      placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400"
                      placeholder="(601) 000-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Email *</label>
                  <input required type="email" value={form.email} onChange={e => update("email", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400"
                    placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Project Type</label>
                  <MobileSelectDrawer
                    label="Project Type"
                    placeholder="Select project type"
                    value={form.project_type}
                    onChange={val => update("project_type", val)}
                    options={[
                      { value: "custom_home", label: "Custom Home" },
                      { value: "renovation",  label: "Renovation" },
                      { value: "addition",    label: "Room Addition" },
                      { value: "outdoor",     label: "Outdoor Living" },
                      { value: "other",       label: "Other" },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Tell Us About Your Project</label>
                  <textarea value={form.message} onChange={e => update("message", e.target.value)} rows={4}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 resize-none"
                    placeholder="Tell us about your project, budget range, timeline, etc." />
                </div>
                {/* SMS Consent */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 border border-gray-200 rounded-xl">
                  <input
                    type="checkbox"
                    id="sms-consent-contact"
                    checked={smsConsent}
                    onChange={e => setSmsConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-sky-500 flex-shrink-0 cursor-pointer"
                  />
                  <label htmlFor="sms-consent-contact" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                    I agree to receive SMS text messages from Bradley Brown Inc. regarding my quote, project updates, and customer support.{" "}
                    <span className="text-slate-400">Message frequency varies. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase.</span>
                  </label>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-60">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Internal links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <div className="bg-slate-50 border border-gray-200 rounded-xl p-5">
          <h2 className="font-bold text-[#1E2D3D] text-sm mb-3">Explore More</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Our Services", page: "Services" },
              { label: "View Portfolio", page: "Portfolio" },
              { label: "AI Cost Estimator", page: "QuoteAssistant" },
              { label: "Schedule a Site Visit", page: "ScheduleVisit" },
              { label: "Why Trust Us", page: "LandingTrust" },
              { label: "Pricing Guide", page: "LandingPricing" },
              { label: "Pro Tips & Advice", page: "ProTips" },
              { label: "Core Services — Brandon", page: "LandingCoreServices" },
              { label: "Emergency Repairs", page: "LandingEmergencyRepair" },
              { label: "Home Addition Ideas", page: "HomeAdditionIdeas" },
              { label: "Renovation Loans", page: "RenovationLoans" },
              { label: "Energy-Efficient Upgrades", page: "EnergyEfficientUpgrades" },
            ].map((link) => (
              <Link key={link.page} to={createPageUrl(link.page)} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
                <ChevronRight className="w-3 h-3" /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Service Area — expanded */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <h2 className="text-xl md:text-2xl font-bold text-[#1E2D3D] mb-2">Our Service Area — Brandon, MS & Central Mississippi</h2>
        <p className="text-slate-600 text-sm mb-6 max-w-2xl">
          Bradley Brown Inc. serves homeowners within 50 miles of Brandon, MS — contact us to confirm availability in your area.
        </p>

        {/* City chips grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {[
            { label: "Brandon, MS", link: "LandingBrandonRemodelers" },
            { label: "Flowood, MS", link: null },
            { label: "Pearl, MS", link: null },
            { label: "Madison, MS", link: "MadisonRemodeling" },
            { label: "Ridgeland, MS", link: null },
            { label: "Jackson, MS", link: null },
            { label: "Clinton, MS", link: null },
            { label: "Byram, MS", link: null },
            { label: "Rankin County, MS", link: "LandingCoreServices" },
            { label: "Simpson County, MS", link: null },
            { label: "Hinds County, MS", link: null },
            { label: "Madison County, MS", link: null },
          ].map((chip) => (
            <div key={chip.label} className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
              {chip.link ? (
                <Link
                  to={createPageUrl(chip.link)}
                  className="inline-flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 text-sm font-medium px-3.5 py-2 rounded-full transition-colors"
                >
                  {chip.label}
                </Link>
              ) : (
                <span className="inline-flex items-center bg-gray-50 border border-gray-200 text-slate-600 text-sm font-medium px-3.5 py-2 rounded-full">
                  {chip.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Google Map — centered on 104 Tiffany Drive, Brandon, MS 39042 */}
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm h-80">
          <iframe
            src="https://www.google.com/maps?q=104+Tiffany+Drive,+Brandon,+MS+39042&output=embed"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            title="Bradley Brown Inc. — 104 Tiffany Drive, Brandon, MS 39042"
          />
        </div>
        {/* NAP */}
        <div className="mt-4 text-sm text-slate-500 text-center">
          <strong className="text-slate-700">Bradley Brown Inc.</strong> · 104 Tiffany Drive, Brandon, MS 39042 · <a href="tel:+18443514154" className="text-sky-600 font-medium">(844) 351-4154</a> · bradleybrowninc@gmail.com
        </div>
      </div>
    </div>
  );
}