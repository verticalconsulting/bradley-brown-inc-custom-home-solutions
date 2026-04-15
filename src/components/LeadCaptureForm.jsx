import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Send, CheckCircle } from "lucide-react";

const projectTypes = [
  "Custom Home",
  "Kitchen Remodel",
  "Bathroom Renovation",
  "Room Addition",
  "Outdoor Living",
  "Other",
];

const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-base";

export default function LeadCaptureForm({ source = "Website", onSuccess }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", project_type: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await base44.entities.Lead.create({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      project_type: form.project_type,
      message: form.message,
      source,
      status: "new",
    });

    base44.analytics.track({
      eventName: "lead_captured",
      properties: { source, project_type: form.project_type },
    });

    // Also send to Formspree for email notification
    fetch("https://formspree.io/f/xeeranrd", {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, source }),
    });

    setLoading(false);
    setSubmitted(true);
    if (onSuccess) onSuccess(form);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#1E2D3D] mb-2">We got your message!</h3>
        <p className="text-slate-500 text-sm">We'll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">Full Name *</label>
          <input
            type="text" required value={form.name}
            onChange={e => update("name", e.target.value)}
            className={inputClass} placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">Phone</label>
          <input
            type="tel" value={form.phone}
            onChange={e => update("phone", e.target.value)}
            className={inputClass} placeholder="(601) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">Email Address *</label>
        <input
          type="email" required value={form.email}
          onChange={e => update("email", e.target.value)}
          className={inputClass} placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">Project Address</label>
        <input
          type="text" value={form.address}
          onChange={e => update("address", e.target.value)}
          className={inputClass} placeholder="123 Main St, Brandon, MS"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">Type of Project *</label>
        <select
          required value={form.project_type}
          onChange={e => update("project_type", e.target.value)}
          className={inputClass}
        >
          <option value="">Select a project type</option>
          {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">Tell us about your project</label>
        <textarea
          rows={4} value={form.message}
          onChange={e => update("message", e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Describe your project, timeline, budget, or any other details..."
        />
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
      >
        <Send className="w-4 h-4" />
        {loading ? "Sending..." : "Send Estimate Request"}
      </button>

      <p className="text-center text-slate-400 text-xs">
        We'll review your project and contact you within 24 hours.
      </p>
    </form>
  );
}