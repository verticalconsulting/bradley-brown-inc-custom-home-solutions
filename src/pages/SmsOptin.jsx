import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import { CheckCircle, MessageSquare, ShieldCheck, Phone } from "lucide-react";

export default function SmsOptin() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="SMS Opt-In Policy — Bradley Brown Inc."
        description="Bradley Brown Inc. SMS consent policy. Learn how we collect consent, what messages you'll receive, and how to opt out."
        canonical="https://bradleybrowninc.com/sms-optin"
      />

      <div className="bg-[#1E2D3D] py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-400/20 border border-sky-400/40 rounded-full px-3 py-1 mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-sky-300" />
            <span className="text-sky-200 text-xs font-medium">Compliance Policy</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white">SMS Opt-In Policy</h1>
          <p className="text-slate-300 mt-2 text-sm md:text-base">
            How Bradley Brown Inc. collects SMS consent, what messages you'll receive, and how to stop them.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-8">

        {/* Consent Checkbox Example */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-500" /> 1. How You Opt In
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Customers opt in to receive SMS messages from Bradley Brown Inc. through the following methods:
          </p>

          <div className="space-y-6">
            {/* Method 1 */}
            <div className="border border-sky-200 bg-sky-50 rounded-xl p-5">
              <p className="font-bold text-[#1E2D3D] mb-2">Method 1 — Web Form Opt-In</p>
              <p className="text-slate-600 text-sm mb-4">
                Users must explicitly check a consent box on our quote request form. The checkbox reads exactly:
              </p>
              <div className="bg-white border-2 border-sky-300 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-default">
                  <div className="w-4 h-4 border-2 border-sky-500 rounded mt-0.5 flex-shrink-0 bg-sky-500 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-slate-700 leading-relaxed">
                    I agree to receive SMS text messages from Bradley Brown Inc. regarding my quote, project updates, and customer support.{" "}
                    <span className="text-slate-500">Message frequency varies. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase.</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Method 2 */}
            <div className="border border-gray-200 bg-slate-50 rounded-xl p-5">
              <p className="font-bold text-[#1E2D3D] mb-2">Method 2 — Keyword Opt-In</p>
              <p className="text-slate-600 text-sm">
                Users may opt in by texting <strong>"START"</strong> to our business number. This triggers a confirmation message requesting explicit consent before any messaging begins.
              </p>
            </div>
          </div>
        </div>

        {/* What Messages You'll Receive */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-4">2. What Messages You'll Receive</h2>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Quote follow-ups and project estimate details</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Project updates and scheduling confirmations</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Customer support replies</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Site visit confirmations and reminders</li>
          </ul>
          <p className="text-xs text-slate-400 mt-4">Message frequency varies. We will not send unsolicited promotional messages.</p>
        </div>

        {/* Opt-In Confirmation Message */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-4">3. Opt-In Confirmation Message</h2>
          <p className="text-slate-600 text-sm mb-4">After opting in, you will receive the following confirmation SMS:</p>
          <div className="bg-slate-100 border-l-4 border-sky-400 rounded-r-xl p-4">
            <p className="text-sm text-slate-700 font-mono">
              Bradley Brown Inc: You have opted in to receive SMS messages regarding your quote and project updates. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help.
            </p>
          </div>
        </div>

        {/* Sample Message */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-4">4. Sample Message</h2>
          <p className="text-slate-600 text-sm mb-4">An example of a message you may receive from us:</p>
          <div className="bg-slate-100 border-l-4 border-green-400 rounded-r-xl p-4">
            <p className="text-sm text-slate-700 font-mono">
              Bradley Brown Inc: Thanks for contacting us. We received your quote request and will follow up shortly. Reply STOP to opt out or HELP for help. Msg &amp; data rates may apply.
            </p>
          </div>
        </div>

        {/* STOP / HELP */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-4">5. How to Stop or Get Help</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="text-2xl font-black text-red-600 mb-2">STOP</p>
              <p className="text-sm text-slate-600">
                Text <strong>STOP</strong> at any time to immediately opt out. You will no longer receive SMS messages from us.
              </p>
            </div>
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
              <p className="text-2xl font-black text-sky-600 mb-2">HELP</p>
              <p className="text-sm text-slate-600">
                Text <strong>HELP</strong> for support information. You can also call or email us directly.
              </p>
            </div>
          </div>
        </div>

        {/* Message & Data Rates */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-slate-700">
          <p className="font-semibold text-[#1E2D3D] mb-1">Message &amp; Data Rates</p>
          <p>Message and data rates may apply depending on your mobile carrier plan. Bradley Brown Inc. does not charge for messages, but your carrier's standard rates apply. Message frequency varies.</p>
        </div>

        {/* Privacy Policy link */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-2">6. Privacy Policy</h2>
          <p className="text-slate-600 text-sm">
            Your information is never sold or shared with third parties for marketing purposes. SMS opt-in data is not shared with any third party. For full details, see our{" "}
            <Link to={createPageUrl("Legal")} className="text-sky-600 font-medium hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-[#1E2D3D] rounded-2xl p-6 md:p-8 text-center">
          <h2 className="text-lg font-bold text-white mb-2">Questions About SMS Messaging?</h2>
          <p className="text-slate-300 text-sm mb-4">Contact us directly and we'll help right away.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+18443514154" className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
              <Phone className="w-4 h-4" /> (844) 351-4154
            </a>
            <a href="mailto:bradleybrowninc@gmail.com" className="inline-flex items-center justify-center gap-2 border border-slate-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
              bradleybrowninc@gmail.com
            </a>
          </div>
        </div>

        <div className="text-center">
          <Link to={createPageUrl("Legal")} className="text-sm text-slate-400 hover:text-sky-500 transition-colors">
            ← Back to Legal & Privacy Policy
          </Link>
        </div>

      </div>
    </div>
  );
}