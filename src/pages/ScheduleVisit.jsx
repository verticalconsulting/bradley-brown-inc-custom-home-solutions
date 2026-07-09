import React, { useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import { Calendar, CheckCircle, Loader2, Phone, ChevronRight, Clock } from "lucide-react";

const TIME_SLOTS = [
    { value: "09:00", label: "9:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "15:00", label: "3:00 PM" },
];

// Build the next 5 available weekdays (skipping weekends)
function getUpcomingWeekdays(count = 5) {
    const days = [];
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (days.length < count) {
        const day = d.getDay();
        if (day !== 0 && day !== 6) {
            days.push(new Date(d));
        }
        d.setDate(d.getDate() + 1);
    }
    return days.map(day => ({
        iso: day.toISOString().split("T")[0],
        label: day.toLocaleDateString("en-US", { weekday: "short" }),
        date: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }));
}

export default function ScheduleVisit() {
    const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", time: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const upcomingDays = useMemo(() => getUpcomingWeekdays(5), []);
    const update = (field, value) => setForm(f => ({ ...f, [field]: value }));
    const canSubmit = form.name && form.phone && form.date && form.time;

    const handleCallClick = () => {
        base44.analytics.track({ eventName: "phone_click", properties: { source: "schedule_visit_page" } });
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'conversion', { send_to: 'AW-17864041271/21TJCO2Bj5ccELfGnsZC', value: 30, currency: 'USD' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setError(null);
        try {
            const res = await base44.functions.invoke("scheduleSiteVisit", form);
            setLoading(false);
            if (res.data?.success) {
                setSuccess(res.data);
                base44.analytics.track({ eventName: "site_visit_scheduled" });
                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'conversion', {
                        'send_to': 'AW-17864041271/wbLkCPOBj5ccELfGnsZC',
                        'value': 100,
                        'currency': 'USD'
                    });
                }
            } else {
                setError(res.data?.error || "Something went wrong. Please try again or call us.");
            }
        } catch (err) {
            setLoading(false);
            setError("We couldn't submit your request. Please try again or call (844) 351-4154.");
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#FAFAF8] pt-20 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] p-10 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1E2D3D] mb-2">You're on the calendar!</h2>
                    <p className="text-slate-500 mb-4">{success.message || "We'll call to confirm within a few hours."}</p>
                    {success.eventLink && (
                        <a href={success.eventLink} target="_blank" rel="noopener noreferrer"
                            className="mt-2 inline-block bg-sky-400 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-sky-500 transition-colors">
                            Add to Google Calendar
                        </a>
                    )}
                    <button
                        onClick={() => { setSuccess(null); setForm({ name:"",phone:"",email:"",date:"",time:"" }); }}
                        className="mt-3 block w-full text-slate-400 text-sm hover:text-slate-600 transition-colors">
                        Book another visit
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-20">
            <SEOHead
                title="Book a Free Site Visit — Bradley Brown Inc."
                description="Book a free on-site consultation with Bradley Brown Inc. in Brandon, MS in under 30 seconds. No obligation."
                canonical="https://bradleybrowninc.com/ScheduleVisit"
            />

            {/* Header */}
            <div className="bg-[#1E2D3D] py-10">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-sky-400/20 border border-sky-400/40 rounded-full px-3 py-1 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-sky-300" />
                        <span className="text-sky-200 text-xs font-medium">Free · 30-second booking</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white">Book a Free Site Visit</h1>
                    <p className="text-slate-300 mt-2 text-sm md:text-base">
                        Pick a day, pick a time — we'll come to you. No obligation.
                    </p>
                </div>
            </div>

            <div className="max-w-md mx-auto px-4 sm:px-6 py-8">

                {/* Quick call alternative */}
                <a href="tel:+18443514154" onClick={handleCallClick}
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-sm mb-6 transition-colors shadow-sm">
                    <Phone className="w-4 h-4" /> Prefer to call? (844) 351-4154
                </a>

                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-slate-400 font-medium">OR BOOK ONLINE</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] p-6 space-y-5">
                    {/* Step 1: pick day */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">1. Pick a day</label>
                        <div className="grid grid-cols-5 gap-2">
                            {upcomingDays.map(day => (
                                <button
                                    key={day.iso}
                                    type="button"
                                    onClick={() => update("date", day.iso)}
                                    className={`py-3 rounded-lg border text-center transition-colors ${
                                        form.date === day.iso
                                            ? "bg-sky-400 text-white border-sky-400"
                                            : "bg-white text-slate-600 border-gray-200 hover:border-sky-300"
                                    }`}
                                >
                                    <p className="text-[10px] font-medium uppercase opacity-80">{day.label}</p>
                                    <p className="text-sm font-bold mt-0.5">{day.date}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: pick time */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">2. Pick a time</label>
                        <div className="grid grid-cols-4 gap-2">
                            {TIME_SLOTS.map(slot => (
                                <button
                                    key={slot.value}
                                    type="button"
                                    onClick={() => update("time", slot.value)}
                                    className={`py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                                        form.time === slot.value
                                            ? "bg-sky-400 text-white border-sky-400"
                                            : "bg-white text-slate-600 border-gray-200 hover:border-sky-300"
                                    }`}
                                >
                                    {slot.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 3: minimal contact */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">3. How do we reach you?</label>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Your name *"
                                value={form.name}
                                onChange={e => update("name", e.target.value)}
                                required
                                className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                            />
                            <input
                                type="tel"
                                placeholder="Phone number *"
                                value={form.phone}
                                onChange={e => update("phone", e.target.value)}
                                required
                                className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                            />
                            <input
                                type="email"
                                placeholder="Email (optional — for calendar invite)"
                                value={form.email}
                                onChange={e => update("email", e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!canSubmit || loading}
                        className="w-full bg-[#C4922A] hover:bg-[#A37820] text-white py-4 rounded-xl font-bold text-base transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                    >
                        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking...</> : <>Book My Free Visit <ChevronRight className="w-4 h-4" /></>}
                    </button>

                    <p className="text-center text-slate-400 text-xs flex items-center justify-center gap-1.5">
                        <Clock className="w-3 h-3" /> We'll confirm within a few hours.
                    </p>
                </form>

                {/* Trust line */}
                <p className="text-center text-slate-400 text-xs mt-4">
                    Licensed & insured Mississippi contractor · 500+ homes built since 1995
                </p>

                {/* Internal links */}
                <div className="mt-8 bg-slate-50 border border-gray-200 rounded-xl p-5">
                    <h2 className="font-bold text-[#1E2D3D] text-sm mb-3">Not ready? Explore first:</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: "AI Cost Estimator", page: "QuoteAssistant" },
                            { label: "Our Services", page: "Services" },
                            { label: "View Portfolio", page: "Portfolio" },
                            { label: "Pricing Guide", page: "LandingPricing" },
                            { label: "Why Trust Us", page: "LandingTrust" },
                        ].map((link) => (
                            <Link key={link.page} to={createPageUrl(link.page)} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
                                <ChevronRight className="w-3 h-3" /> {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}