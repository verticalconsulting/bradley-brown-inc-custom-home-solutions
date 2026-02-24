import React from "react";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema } from "@/components/seoSchemas";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Award, Heart, Users, Shield, ChevronRight } from "lucide-react";

const values = [
  { icon: Heart, title: "Craftsmanship", description: "Every nail, board, and finish is executed with precision and care. We take immense pride in the quality of our work." },
  { icon: Shield, title: "Integrity", description: "Honest pricing, transparent timelines, and clear communication throughout your entire project." },
  { icon: Users, title: "Partnership", description: "We treat your project as if it were our own home, building lasting relationships with every client." },
  { icon: Award, title: "Excellence", description: "30+ years of continuous improvement, staying current with the best materials and construction methods." },
];

const team = [
  {
    name: "Bradley Brown",
    title: "Founder & Master Builder",
    bio: "With over 30 years in construction, Bradley founded the company with a simple mission: build homes you're proud to live in. His hands-on approach and eye for detail define the company's culture.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Marcus Thompson",
    title: "Project Manager",
    bio: "Marcus has 15+ years of experience coordinating complex builds. He ensures every project runs on time, on budget, and exceeds expectations.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    name: "Lisa Brown",
    title: "Design Consultant",
    bio: "Lisa brings an interior design perspective to every project, helping clients select finishes and layouts that are both beautiful and functional.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="About Us – 30+ Years Building Central Mississippi Homes"
        description="Learn about Bradley Brown Inc., Central Mississippi's trusted home builder since 1995. Meet the team and discover our commitment to craftsmanship, integrity, and client partnerships."
        schema={localBusinessSchema}
      />
      <div className="relative bg-[#1E2D3D] py-14 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80')" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Our Story</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Building Mississippi,<br />One Home at a Time</h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-lg">For over 30 years, Bradley Brown Inc. has been the trusted builder for families across Central Mississippi.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80"
              alt="Bradley Brown at a construction site"
              className="rounded-xl shadow-lg w-full h-80 object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] mb-5">A Builder You Can Trust</h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Bradley Brown started this company in 1995 with a handshake, a solid crew, and a commitment to doing things right. What began as a small residential renovation company in Jackson has grown into one of the most respected custom home builders in Central Mississippi.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              Over three decades, we've built more than 500 homes across Rankin, Hinds, and Madison counties — from modest renovations to million-dollar custom estates.
            </p>
            <p className="text-slate-500 leading-relaxed">
              We're a family business, and we treat your family like our own. That means clear communication, fair pricing, and work that stands the test of time.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#1E2D3D]/5 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">What Drives Us</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white p-6 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="font-bold text-[#1E2D3D] mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="text-center mb-12">
          <p className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">Meet the Team</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">The People Behind Your Home</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {team.map(member => (
            <div key={member.name} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-sky-400/20"
              />
              <h3 className="font-bold text-[#1E2D3D]">{member.name}</h3>
              <p className="text-sky-500 text-sm font-medium mb-2">{member.title}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-sky-600 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-sky-100 mb-8">Let's start a conversation about your project.</p>
          <Link
            to={createPageUrl("Contact")}
            className="inline-flex items-center gap-2 bg-white text-sky-600 px-8 py-4 rounded-lg font-bold hover:bg-sky-50 transition-colors"
          >
            Get in Touch <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}