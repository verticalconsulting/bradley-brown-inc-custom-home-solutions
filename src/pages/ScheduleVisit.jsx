import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import { Calendar, Clock, User, MapPin, CheckCircle, Loader2, Shield, HardHat, MessageSquare, DollarSign, ChevronRight } from "lucide-react";

const PROJECT_TYPES = [
    { value: "custom_home", label: "Custom Home" },
    { value: "renovation", label: "Renovation" },
    { value: "addition", label: "Room Addition" },
    { value: "outdoor", label: "Outdoor Living" },
    { value: "other", label: "Other" },
];

const TIME_SLOTS = [
    "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

const TIME_LABELS = {
    "08:00": "8:00 AM", "09:00": "9:00 AM", "10:00": "10:00 AM",
    "11:00": "11:00 AM", "13:00": "1:00 PM", "14:00": "2:00 PM",
    "15:00": "3:00 PM", "16:00": "4:00 PM",
};

function getMinDate() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
}

export default function ScheduleVisit() {
    const [form, setForm] = useState({
        name: "", email: "", phone: "", project_type: "", location: "", date: "", time: "", notes: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const update = (field, value) => setForm(f => ({ ...f, [field]: value }));

    const canSubmit = form.name && form.email && form.date && form.time;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const res = await base44.functions.invoke("scheduleSiteVisit", form);
        setLoading(false);
        if (res.data?.success) {
            setSuccess(res.data);
            base44.analytics.track({ eventName: "site_visit_scheduled", properties: { project_type: form.project_type } });
            
            // Track Google Ads Conversion
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'conversion', {
                    'send_to': 'AW-17864041271/wbLkCPOBj5ccELfGnsZC',
                    'value': 100,
                    'currency': 'USD'
                });
            }
        } else {
            setError(res.data?.error || "Something went wrong. Please try again.");
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#FAFAF8] pt-20 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] p-10 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1E2D3D] mb-2">Visit Scheduled!</h2>
                    <p className="text-slate-500 mb-4">{success.message}</p>
                    <p className="text-slate-400 text-sm">Check your email for a calendar invite.</p>
                    {success.eventLink && (
                        <a
                            href={success.eventLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-block bg-sky-400 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-sky-500 transition-colors"
                        >
                            View in Google Calendar
                        </a>
                    )}
                    <button
                        onClick={() => { setSuccess(null); setForm({ name:"",email:"",phone:"",project_type:"",location:"",date:"",time:"",notes:"" }); }}
                        className="mt-3 block w-full text-slate-400 text-sm hover:text-slate-600 transition-colors"
                    >
                        Schedule another visit
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-20">
            <SEOHead
                title="Schedule a Free Site Visit — Bradley Brown Inc."
                description="Book a free on-site consultation with Bradley Brown Inc. in Brandon, MS. We'll come to you — no obligation."
                canonical="https://bradleybrowninc.com/ScheduleVisit"
            />
            {/* Header */}
            <div className="bg-[#1E2D3D] py-10 md:py-14">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-sky-400/20 border border-sky-400/40 rounded-full px-3 py-1 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-sky-300" />
                        <span className="text-sky-200 text-xs font-medium">Free Consultation</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white">Schedule a Site Visit</h1>
                    <p className="text-slate-300 mt-2 text-sm md:text-base">
                        Book a free on-site consultation with Bradley Brown Inc. and we'll come to you.
                    </p>
                </div>
            </div>

            <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 md:py-14">

                {/* What to Expect */}
                <div className="bg-white rounded-2xl border border-[#E2D9CC] shadow-sm p-6 mb-6">
                    <h2 className="font-bold text-[#1E2D3D] text-base mb-4">What to Expect During Your Visit</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Clock className="w-4 h-4 text-sky-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-[#1E2D3D]">30–60 Minute Walk-Through</p>
                                <p className="text-slate-500 text-xs leading-relaxed mt-0.5">We'll tour your space together, listen to your vision, and ask questions — no sales pressure, just an honest conversation about your project.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <DollarSign className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-[#1E2D3D]">100% Free — No Obligation</p>
                                <p className="text-slate-500 text-xs leading-relaxed mt-0.5">The site visit and initial consultation are completely free. You'll receive a written estimate with no hidden fees or commitments required.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <HardHat className="w-4 h-4 text-amber-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-[#1E2D3D]">Licensed, Insured & Professional</p>
                                <p className="text-slate-500 text-xs leading-relaxed mt-0.5">You'll meet with a licensed Mississippi contractor — fully insured, background-checked, and respectful of your home and family.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <MessageSquare className="w-4 h-4 text-purple-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-[#1E2D3D]">Your Questions Answered on the Spot</p>
                                <p className="text-slate-500 text-xs leading-relaxed mt-0.5">Bring your ideas, photos, or concerns. We'll walk you through our process, typical timelines, and how we handle permits and inspections.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
                        <Shield className="w-4 h-4 text-sky-500 flex-shrink-0" />
                        <p className="text-xs text-slate-500">Your contact info is used only to confirm your visit — we never share or sell it.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] p-6 md:p-8 space-y-5">
                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-[#1E2D3D] mb-3 flex items-center gap-2">
                            <User className="w-4 h-4 text-sky-400" /> Your Information
                        </h3>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Full Name *"
                                value={form.name}
                                onChange={e => update("name", e.target.value)}
                                required
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                            />
                            <input
                                type="email"
                                placeholder="Email Address *"
                                value={form.email}
                                onChange={e => update("email", e.target.value)}
                                required
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={e => update("phone", e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                            />
                        </div>
                    </div>

                    {/* Project Info */}
                    <div>
                        <h3 className="font-semibold text-[#1E2D3D] mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-sky-400" /> Project Details
                        </h3>
                        <div className="space-y-3">
                            <select
                                value={form.project_type}
                                onChange={e => update("project_type", e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 text-slate-700"
                            >
                                <option value="">Project Type (optional)</option>
                                {PROJECT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                            <input
                                type="text"
                                placeholder="Site Address / City"
                                value={form.location}
                                onChange={e => update("location", e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                            />
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div>
                        <h3 className="font-semibold text-[#1E2D3D] mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-sky-400" /> Pick a Date & Time
                        </h3>
                        <input
                            type="date"
                            value={form.date}
                            min={getMinDate()}
                            onChange={e => update("date", e.target.value)}
                            required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 mb-3"
                        />
                        <div className="grid grid-cols-4 gap-2">
                            {TIME_SLOTS.map(slot => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => update("time", slot)}
                                    className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                                        form.time === slot
                                            ? "bg-sky-400 text-white border-sky-400"
                                            : "bg-white text-slate-600 border-gray-200 hover:border-sky-300"
                                    }`}
                                >
                                    {TIME_LABELS[slot]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <textarea
                        placeholder="Additional notes or questions (optional)"
                        value={form.notes}
                        onChange={e => update("notes", e.target.value)}
                        rows={3}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={!canSubmit || loading}
                        className="w-full bg-sky-400 hover:bg-sky-500 text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Scheduling...</> : "Schedule My Site Visit"}
                    </button>

                    <p className="text-center text-slate-400 text-xs">
                        A calendar invite will be sent to your email. We'll confirm within 24 hours.
                    </p>
                </form>

                {/* Internal links */}
                <div className="mt-6 bg-slate-50 border border-gray-200 rounded-xl p-5">
                  <h2 className="font-bold text-[#1E2D3D] text-sm mb-3">Not ready to schedule? Explore first:</h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "AI Cost Estimator", page: "QuoteAssistant" },
                      { label: "Our Services", page: "Services" },
                      { label: "View Portfolio", page: "Portfolio" },
                      { label: "Pricing Guide", page: "LandingPricing" },
                      { label: "Why Trust Us", page: "LandingTrust" },
                      { label: "Pro Tips", page: "ProTips" },
                      { label: "Home Addition Ideas", page: "HomeAdditionIdeas" },
                      { label: "Small Bathroom Ideas", page: "SmallBathroomIdeas" },
                      { label: "Luxury Renovations", page: "LuxuryHomeRenovations" },
                      { label: "Renovation Loans", page: "RenovationLoans" },
                      { label: "Contact Us", page: "Contact" },
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