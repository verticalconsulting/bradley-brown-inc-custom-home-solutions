import React from "react";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema } from "@/components/seoSchemas";
import { Link } from "react-router-dom";
import { Award, Heart, Users, Shield, ChevronRight } from "lucide-react";
import AboutTrustSection from "@/components/about/AboutTrustSection";
import LiveJobsitesSection from "@/components/about/LiveJobsitesSection";
import { usePageImages } from "@/lib/usePageImages";

const values = [
{ icon: Heart, title: "Craftsmanship", description: "Every nail, board, and finish is executed with precision and care. We take immense pride in the quality of our work." },
{ icon: Shield, title: "Integrity", description: "Honest pricing, transparent timelines, and clear communication throughout your entire project." },
{ icon: Users, title: "Partnership", description: "We treat your project as if it were our own home, building lasting relationships with every client." },
{ icon: Award, title: "Excellence", description: "30+ years of continuous improvement, staying current with the best materials and construction methods." }];


const team = [
{ name: "Bradley Brown", title: "Founder & Master Builder", bio: "Bradley Brown Inc is owned by Brad Brown, who brings decades of experience in custom home building, remodeling, and just about everything under the sun when it relates to construction. He pays attention to the details and treats every project like it's his own.", image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/3776a11c-d485-454e-4841-ba2d5e3e4400/small" },
{ name: "Walker Magee", title: "Project Manager", bio: "Walker has many talents and is able to tackle complex builds. He ensures every project runs on time, on budget, and exceeds expectations.", image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/5b865f0c-642e-4f7e-8b61-ded808961a00/small" },
{ name: "Ethan Brown", title: "Associate", bio: "Ethan is a skilled associate that can handle any task.", image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/de934f0e-b2f3-4d77-5e78-af5adf1f5800/logo" }];


export default function About() {
  const { hero: heroImage } = usePageImages("About");
  return (
    <div className="min-h-screen bg-background pt-20">
      <SEOHead
        title="About Bradley Brown Inc. — Mississippi Builder Since 1995"
        description="Central Mississippi's trusted home builder since 1995. 500+ homes built, 4.9-star rated, BBB accredited. Meet the team behind Bradley Brown Inc. Free estimates."
        schema={localBusinessSchema}
        canonical="https://bradleybrowninc.com/about" />
      

      <div className="relative bg-foreground py-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${heroImage?.url || "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/e3722807-d747-4fda-799f-53bebe6adb00/medium"}')` }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Our Story</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Building Mississippi,<br />One Home at a Time</h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-lg">For over 30 years, Bradley Brown Inc. has been the trusted builder for families across Central Mississippi.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <img src="https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/d5dba6f2-b3dd-4c9c-518c-83e8ef6af000/medium" alt="Bradley Brown and wife" className="rounded-xl shadow-lg w-full h-80 object-cover" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">A Builder You Can Trust</h2>
            <p className="text-slate-500 leading-relaxed mb-4">Bradley Brown started this company in 2005 with a handshake, a solid crew, and a commitment to doing things right. What began as a small residential renovation company in Jackson has grown into one of the most respected custom home builders in Central Mississippi.</p>
            <p className="text-slate-500 leading-relaxed mb-4">Over three decades, we've built custom homes across Rankin, Hinds, and Madison counties — from modest renovations to mi</p>
            <p className="text-slate-500 leading-relaxed">We're a family business, and we treat your family like our own. That means clear communication, fair pricing, and work that stands the test of time.</p>
          </div>
        </div>
      </div>

      <div className="bg-foreground/5 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">What Drives Us</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) =>
            <div key={title} className="bg-white p-6 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4"><Icon className="w-6 h-6 text-sky-500" /></div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="text-center mb-12">
          <p className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">Meet the Team</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">The People Behind Your Home</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {team.map((member) =>
          <div key={member.name} className="text-center">
              <img src={member.image} alt={member.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-sky-400/20" />
              <h3 className="font-bold text-foreground">{member.name}</h3>
              <p className="text-sky-500 text-sm font-medium mb-2">{member.title}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <AboutTrustSection />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <LiveJobsitesSection />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <div className="bg-slate-50 border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-foreground text-sm mb-3">Explore More</h3>
          <div className="flex flex-wrap gap-2">
            {[
            { label: "Our Services", to: "/services" },
            { label: "Portfolio", to: "/portfolio" },
            { label: "Contact Us", to: "/contact" },
            { label: "Get a Free Estimate", to: "/estimate" },
            { label: "Pro Tips", to: "/protips" },
            { label: "Pricing Guide", to: "/pricing" }].
            map((link) =>
            <Link key={link.to} to={link.to} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
                <ChevronRight className="w-3 h-3" /> {link.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="bg-sky-600 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-sky-100 mb-8">Let's start a conversation about your project.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-sky-600 px-8 py-4 rounded-lg font-bold hover:bg-sky-50 transition-colors">
            Get in Touch <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>);

}