import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { base44 } from "@/api/base44Client";
import { Phone, Calendar, Clock, MapPin, ChevronRight, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

const TIME_SLOTS = [
  { value: "08:00", label: "8:00 AM" },
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
];

const PROJECT_TYPES = [
  { value: "custom_home", label: "Custom Home" },
  { value: "renovation", label: "Renovation / Remodel" },
  { value: "addition", label: "Room Addition" },
  { value: "outdoor", label: "Outdoor Living" },
  { value: "other", label: "Other / Not Sure Yet" },
];

// Format tomorrow as YYYY-MM-DD for the date input min
function formatDate(d) {
  return d.toISOString().split("T")[0];
}

export default function ScheduleVisit() {
  const minDate = formatDate(new Date(Date.now() + 86400000));
  const maxDate = formatDate(new Date(Date.now() + 30 * 86400000));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    project_type: "renovation",
    location: "",
    date: "",
    time: "",
    notes: "",
    website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const canSubmit = form.name && form.email && form.date && form.time && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    try {
      const res = await base44.functions.invoke("scheduleSiteVisit", form);
      const result = res?.data;
      if (!result?.success) {
        throw new Error(result?.error || "Unable to schedule your visit. Please call us instead.");
      }
      base44.analytics.track({
        eventName: "site_visit_scheduled",
        properties: { project_type: form.project_type, date: form.date, time: form.time },
      });
      setSuccess({
        date: form.date,
        time: TIME_SLOTS.find((s) => s.value === form.time)?.label || form.time,
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please call us instead.");
    } finally {
      setLoading(false);
    }
  };

  const selectedSlot = TIME_SLOTS.find((s) => s.value === form.time);

  return (
    <div className="min-h-screen bg-background pt-20">
      <SEOHead
        title="Schedule a Free Site Visit"
        description="Book a free, no-obligation site visit with Bradley Brown Inc. Pick a date and time that works for you — serving Brandon, Flowood, Madison & Central MS."
        canonical="https://bradleybrowninc.com/schedulevisit"
      />

      {/* Hero */}
      <div className="bg-foreground py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 text-sky-400 font-semibold text-sm uppercase tracking-wider mb-3">
            <Calendar className="w-4 h-4" /> No-Obligation Consultation
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Schedule Your Free Site Visit</h1>
          <p className="text-slate-300 mt-3 max-w-xl mx-auto">
            We'll come to your property, listen to your ideas, and give you honest advice — no pressure, no commitment.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {success ? (
          <div className="bg-white rounded-2xl border-2 border-green-300 shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">You're Booked!</h2>
            <p className="text-slate-600 mb-1">
              Your site visit is scheduled for{" "}
              <strong className="text-foreground">
                {new Date(success.date + "T00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </strong>{" "}
              at <strong className="text-foreground">{success.time}</strong>.
            </p>
            <p className="text-slate-500 text-sm mb-6">
              A calendar invitation has been sent to your email. We'll send a reminder the day before.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+18443514154"
                className="inline-flex items-center justify-center gap-2 bg-foreground text-white px-5 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
              >
                <Phone className="w-4 h-4" /> Need to change something? Call us
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 md:p-8 space-y-5">
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-foreground">Pick a Date & Time</h2>
              <p className="text-slate-500 text-sm mt-1">We serve Brandon and all of Central Mississippi.</p>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                <Calendar className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                min={minDate}
                max={maxDate}
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400"
              />
              <p className="text-xs text-slate-400 mt-1">Choose any day within the next 30 days.</p>
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                <Clock className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                Preferred Time <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => update("time", slot.value)}
                    className={`px-3 py-3 rounded-lg text-sm font-medium border transition-colors min-h-[44px] ${
                      form.time === slot.value
                        ? "bg-sky-500 text-white border-sky-500"
                        : "bg-white text-foreground border-gray-200 hover:border-sky-300 hover:bg-sky-50"
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 space-y-4">
              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Your Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="John Smith"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(601) 123-4567"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="john@example.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400"
                />
                <p className="text-xs text-slate-400 mt-1">We'll send your calendar invite here.</p>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Project Type</label>
                <select
                  value={form.project_type}
                  onChange={(e) => update("project_type", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 bg-white"
                >
                  {PROJECT_TYPES.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">
                  <MapPin className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                  Property Address / Area
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="e.g. 123 Main St, Brandon, MS"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Tell Us About Your Project (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={3}
                  placeholder="What are you hoping to build or remodel? Any specific concerns for the site visit?"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 resize-none"
                />
              </div>

              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="absolute opacity-0 pointer-events-none -z-10"
                aria-hidden="true"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-semibold mb-1">We couldn't book that automatically.</p>
                  <p className="text-sm text-amber-700">{error}</p>
                  <a href="tel:+18443514154" className="inline-flex items-center gap-1 text-amber-800 font-medium text-sm mt-2 hover:underline">
                    <Phone className="w-3.5 h-3.5" /> Call (844) 351-4154 to book by phone
                  </a>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-4 min-h-[48px] rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Booking your visit…
                </>
              ) : selectedSlot && form.date ? (
                <>
                  Confirm Visit <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                "Select a date & time to continue"
              )}
            </button>

            <p className="text-center text-xs text-slate-400">
              Free consultation · No obligation · Licensed & insured since 2005
            </p>
          </form>
        )}

        {/* Fallback — call option */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Prefer to talk first?{" "}
            <a href="tel:+18443514154" className="text-sky-600 font-medium hover:underline">
              Call (844) 351-4154
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}