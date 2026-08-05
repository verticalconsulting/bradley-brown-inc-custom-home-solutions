import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { CheckCircle, Send } from "lucide-react";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/0990d7b76_bradleybrowninc-logo2.png";

export default function SmsOptinForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = name && phone && email && smsConsent && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);

    await base44.entities.Lead.create({
      name,
      email,
      phone,
      message: "SMS opt-in submitted via /sms-optin page",
      source: "SMS Opt-In Page",
      status: "new",
    });

    base44.analytics.track({
      eventName: "sms_optin_submitted",
      properties: { source: "sms_optin_page" },
    });

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-green-300 shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-50 rounded-full mb-4">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#1E2D3D] mb-1">You're opted in!</h3>
        <p className="text-slate-500 text-sm">
          You'll receive a confirmation text shortly. Reply STOP at any time to opt out.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border-2 border-sky-300 shadow-md overflow-hidden">
      {/* Header with logo + business name */}
      <div className="bg-[#1E2D3D] px-6 py-4 flex items-center gap-3">
        <img src={LOGO_URL} alt="Bradley Brown Inc." width="167" height="70" loading="lazy" decoding="async" className="h-10 w-auto object-contain brightness-0 invert" />
        <div>
          <p className="text-white font-bold text-sm leading-tight">Bradley Brown Inc.</p>
          <p className="text-slate-300 text-xs">SMS Opt-In Form</p>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-[#1E2D3D]">Sign Up for SMS Updates</h3>
          <p className="text-slate-500 text-sm mt-1">
            Receive quote follow-ups, project updates, and scheduling confirmations from Bradley Brown Inc.
          </p>
        </div>

        <div>
          <label htmlFor="sms-name" className="block text-sm font-semibold text-[#1E2D3D] mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="sms-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Smith"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-base"
          />
        </div>

        <div>
          <label htmlFor="sms-email" className="block text-sm font-semibold text-[#1E2D3D] mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="sms-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-base"
          />
        </div>

        <div>
          <label htmlFor="sms-phone" className="block text-sm font-semibold text-[#1E2D3D] mb-1">
            Mobile Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="sms-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(601) 123-4567"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-base"
          />
        </div>

        {/* SMS Consent */}
        <div className="flex items-start gap-3 p-4 bg-slate-50 border border-gray-200 rounded-xl">
          <input
            type="checkbox"
            id="sms-consent-form"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-sky-500 flex-shrink-0 cursor-pointer"
          />
          <label htmlFor="sms-consent-form" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
            I agree to receive SMS text messages from <strong>Bradley Brown Inc.</strong> regarding my quote, project updates, and customer support.{" "}
            <span className="text-slate-500">
              Message frequency varies. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase.
            </span>{" "}
            By checking this box, I agree to the{" "}
            <Link to={createPageUrl("Legal")} className="text-sky-600 font-medium hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link to={createPageUrl("Legal")} className="text-sky-600 font-medium hover:underline">Privacy Policy</Link>.
          </label>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
        >
          <Send className="w-4 h-4" />
          {loading ? "Submitting..." : "Sign Up for SMS Updates"}
        </button>

        <p className="text-center text-xs text-slate-400">
          See our{" "}
          <Link to={createPageUrl("Legal")} className="text-sky-600 hover:underline">Terms of Service</Link>{" "}and{" "}
          <Link to={createPageUrl("Legal")} className="text-sky-600 hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </form>
  );
}