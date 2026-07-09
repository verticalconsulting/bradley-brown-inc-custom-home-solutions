import React, { useState, useEffect } from "react";
import { X, Download, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";

const STORAGE_KEY = "bb_exit_intent_shown_v1";
const GUIDE_URL = "/downloads/bradley-brown-project-inspiration-guide.pdf";

/**
 * Exit-intent modal that offers a free "Project Inspiration Guide"
 * in exchange for name + email. Captures a Lead in the database and
 * fires a Google Ads conversion. Only shown once per visitor (localStorage).
 */
export default function ExitIntentPopup({ source = "home" }) {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only trigger once per visitor
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    // Arm the trigger after 8s so it doesn't fire the instant they land
    const armTimer = setTimeout(() => { armed = true; }, 8000);

    const handleMouseLeave = (e) => {
      if (!armed) return;
      // Cursor moving up past the top of the viewport = intent to close/leave
      if (e.clientY <= 0) {
        setVisible(true);
        localStorage.setItem(STORAGE_KEY, "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
        base44.analytics.track({ eventName: "exit_intent_shown", properties: { source } });
      }
    };

    // Mobile fallback — show after 25s of scrolling since desktop mouseleave doesn't fire on mobile
    const mobileTimer = setTimeout(() => {
      if (armed && !localStorage.getItem(STORAGE_KEY) && window.innerWidth < 768) {
        setVisible(true);
        localStorage.setItem(STORAGE_KEY, "1");
        base44.analytics.track({ eventName: "exit_intent_shown", properties: { source, trigger: "mobile_timer" } });
      }
    }, 25000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(armTimer);
      clearTimeout(mobileTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [source]);

  const handleClose = () => {
    setVisible(false);
    base44.analytics.track({ eventName: "exit_intent_dismissed", properties: { source } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      await base44.entities.Lead.create({
        name: form.name,
        email: form.email,
        source: `Exit Intent — ${source} — Project Inspiration Guide`,
        message: "Requested the Project Inspiration Guide (exit-intent lead magnet).",
        status: "new",
      });
      base44.analytics.track({ eventName: "exit_intent_lead_captured", properties: { source } });
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: "AW-17864041271/21TJCO2Bj5ccELfGnsZC",
          value: 15,
          currency: "USD",
        });
      }
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again or call (844) 351-4154.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-[#1E2D3D] mb-2">Guide sent!</h3>
            <p className="text-slate-500 text-sm mb-5">
              Check your email — your Project Inspiration Guide is on the way. You can also download it right now.
            </p>
            <a
              href={GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => base44.analytics.track({ eventName: "exit_intent_guide_downloaded", properties: { source } })}
              className="inline-flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors"
            >
              <Download className="w-4 h-4" /> Download Guide (PDF)
            </a>
            <button
              onClick={handleClose}
              className="block mx-auto mt-3 text-slate-400 text-sm hover:text-slate-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header banner */}
            <div className="bg-gradient-to-br from-[#1E2D3D] to-[#2a3f56] p-6 text-center">
              <div className="inline-flex items-center gap-1.5 bg-[#C4922A]/20 border border-[#C4922A]/40 rounded-full px-3 py-1 mb-3">
                <Sparkles className="w-3 h-3 text-[#F5D78E]" />
                <span className="text-[#F5D78E] text-xs font-semibold uppercase tracking-wider">Free Download</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                Wait — grab our Project Inspiration Guide first
              </h3>
              <p className="text-slate-300 text-sm mt-2">
                Real Mississippi remodels with photos, budgets & timelines.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-3">
              <ul className="space-y-1.5 mb-4">
                {[
                  "30+ pages of real project photos",
                  "Budget ranges from $10K to $500K+",
                  "Timelines, permits & what to expect",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />

              {error && <p className="text-red-600 text-xs">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C4922A] hover:bg-[#A37820] text-white py-3 rounded-lg font-bold text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : (
                  <><Download className="w-4 h-4" /> Send Me the Free Guide</>
                )}
              </button>

              <p className="text-center text-slate-400 text-[11px]">
                No spam — unsubscribe anytime. We never share your email.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}