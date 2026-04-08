import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { base44 } from "@/api/base44Client";
import { ChevronRight, Send } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const projectTypes = [
  "Custom Home",
  "Kitchen Remodel",
  "Bathroom Renovation",
  "Room Addition",
  "Outdoor Living",
  "Other",
];

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xeeranrd");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    project_type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    base44.analytics.track({
      eventName: "contact_form_submitted",
      properties: {
        project_type: formData.project_type,
        has_phone: !!formData.phone,
      },
    });

    // Submit to Formspree first so the event object is fresh
    await handleSubmit(e);

    // Save to database
    await base44.entities.QuoteRequest.create({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      project_type: formData.project_type,
      location: formData.address,
      description: formData.message,
      status: "new",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Contact Bradley Brown Inc. — Get Your Free Estimate"
        description="Contact Bradley Brown Inc. for a free home remodeling estimate. Serving Brandon, MS and Central Mississippi."
        canonical="https://bradleybrowninc.com/ContactForm"
      />

      <div className="bg-[#1E2D3D] py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Get Your Free Estimate
          </h1>
          <p className="text-slate-300 mt-2 text-sm md:text-base">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] p-6 md:p-8">
          {state.succeeded ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#1E2D3D] mb-2">
                Thanks for reaching out!
              </h2>
              <p className="text-slate-600 mb-6">
                We've received your message and will contact you within 24 hours.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
              >
                Back to Home <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#1E2D3D] mb-1">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="John Doe"
                />
                <ValidationError field="name" errors={state.errors} />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1E2D3D] mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="john@example.com"
                />
                <ValidationError field="email" errors={state.errors} />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[#1E2D3D] mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="(601) 123-4567"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-[#1E2D3D] mb-1">
                  Project Address
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="123 Main St, Brandon, MS"
                />
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="project_type" className="block text-sm font-semibold text-[#1E2D3D] mb-1">
                  Type of Project *
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  required
                  value={formData.project_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="">Select a project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ValidationError field="project_type" errors={state.errors} />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#1E2D3D] mb-1">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
                  placeholder="Describe your project, timeline, budget, or any other details..."
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {state.submitting ? "Sending..." : "Send Estimate Request"}
              </button>

              <p className="text-center text-slate-400 text-xs">
                We'll review your project and contact you within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}