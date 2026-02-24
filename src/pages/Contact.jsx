import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema } from "@/components/seoSchemas";
import { base44 } from "@/api/base44Client";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", project_type: "custom_home" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.QuoteRequest.create({
      name: form.name,
      email: form.email,
      phone: form.phone,
      description: form.message,
      project_type: form.project_type,
      status: "new",
    });
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
        title="Contact Us – Get a Free Consultation"
        description="Contact Bradley Brown Inc. to discuss your custom home, renovation, or addition project in Central Mississippi. Call (601) 954-1306 or send us a message."
        schema={localBusinessSchema}
      />
      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Get in Touch</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Contact Us</h1>
          <p className="text-slate-300 mt-4 max-w-xl mx-auto">Have a project in mind? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Let's Talk About Your Project</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Whether you're ready to start building or just exploring options, we're here to help. Reach out and a member of our team will get back to you within one business day.
            </p>
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Phone", content: <a href="tel:+16019541306" className="text-slate-500 hover:text-sky-500 transition-colors">(601) 954-1306</a> },
                { icon: Mail, label: "Email", content: <a href="mailto:bradleybrowninc@gmail.com" className="text-slate-500 hover:text-sky-500 transition-colors">bradleybrowninc@gmail.com</a> },
                { icon: MapPin, label: "Service Area", content: <p className="text-slate-500">Rankin, Hinds & Madison Counties, MS</p> },
                { icon: Clock, label: "Business Hours", content: <><p className="text-slate-500">Mon–Fri: 8am–5pm</p><p className="text-slate-500">Sat: 9am–1pm (by appointment)</p></> },
              ].map(({ icon: Icon, label, content }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1E2D3D] mb-0.5">{label}</p>
                    {content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1E2D3D] mb-2">Message Received!</h3>
                <p className="text-slate-500">We'll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-[#1E2D3D] mb-2">Send Us a Message</h3>
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
                  <select value={form.project_type} onChange={e => update("project_type", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 bg-white">
                    <option value="custom_home">Custom Home</option>
                    <option value="renovation">Renovation</option>
                    <option value="addition">Room Addition</option>
                    <option value="outdoor">Outdoor Living</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Tell Us About Your Project</label>
                  <textarea value={form.message} onChange={e => update("message", e.target.value)} rows={4}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 resize-none"
                    placeholder="Tell us about your project, budget range, timeline, etc." />
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
    </div>
  );
}