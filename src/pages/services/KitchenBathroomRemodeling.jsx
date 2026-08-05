import React from "react";
import ServicePageLayout from "@/components/services/ServicePageLayout";

export default function KitchenBathroomRemodeling() {
  return (
    <ServicePageLayout
      title="Kitchen & Bathroom Remodeling in Brandon, MS | Bradley Brown Inc"
      description="Kitchen and bathroom remodeling in Brandon, MS. Licensed contractor since 1995 — custom cabinetry, tile, countertops, plumbing & electrical. Free estimates. Call (844) 351-4154."
      canonical="https://bradleybrowninc.com/services/kitchen-bathroom-remodeling"
      h1="Kitchen & Bathroom Remodeling in Brandon, MS"
      subtitle="Transform your kitchen and bath with Mississippi's trusted remodeling contractor. Custom cabinetry, premium finishes, and craftsmanship that adds real value to your home."
      serviceName="Kitchen & Bathroom Remodeling"
      bodySections={[
        {
          heading: "Kitchen & Bath Remodeling Built for Mississippi Living",
          paragraphs: [
            "The kitchen is the heart of every Mississippi home, and the bathroom is where your day begins and ends. At Bradley Brown Inc., we've been remodeling kitchens and bathrooms across Brandon, Flowood, Pearl, and the greater Jackson metro area since 1995. Our team brings the same craftsmanship to a bathroom refresh that we bring to a full custom home build.",
            "We understand that a kitchen or bathroom remodel is disruptive. That's why we work efficiently, keep the job site clean, and communicate clearly about timelines. Most kitchen remodels take 4–8 weeks; most bathroom renovations take 2–4 weeks. We give you a realistic schedule upfront and stick to it.",
            "From a simple powder room update to a full gourmet kitchen overhaul, no project is too large or too small. We've renovated hundreds of Mississippi homes — bringing modern style, better function, and lasting value to every one.",
          ],
        },
        {
          heading: "Kitchen Remodeling That Works for Your Family",
          paragraphs: [
            "Your kitchen should match how your family actually cooks, eats, and gathers. We design kitchens around your daily routine — from the prep space and pantry layout to the island seating and the flow between the stove, sink, and refrigerator. Whether you want a farmhouse sink with marble countertops or a commercial-style range with a pot filler, we make it happen.",
            "Our kitchen remodeling services include custom cabinetry design and installation, countertop fabrication (granite, quartz, marble, butcher block), tile backsplash installation, lighting design, plumbing fixture upgrades, and appliance integration. We handle all permits, electrical, and plumbing work in-house — no coordinating multiple contractors.",
            "We source materials from local suppliers across the Rankin County and Jackson metro area, so you can see and touch your selections before committing. And because we're a licensed general contractor, every electrical, plumbing, and structural modification meets Mississippi code and passes inspection the first time.",
          ],
        },
        {
          heading: "Bathroom Renovation Expertise",
          paragraphs: [
            "A bathroom renovation is one of the highest-ROI projects you can undertake in a Mississippi home. We specialize in master bathroom transformations, guest bath updates, powder room refreshes, and accessible bathroom modifications. From walk-in tile showers with frameless glass to freestanding soaking tubs and double vanity setups, we handle every detail.",
            "Our bathroom services include tile installation (floor, walls, shower), custom vanity construction, plumbing fixture installation, recessed lighting, exhaust fan installation, waterproofing, and moisture management — critical in Mississippi's humid climate. We use cement board, proper waterproofing membranes, and sealed grout to prevent mold and water damage.",
            "We also handle small bathroom projects — half-baths, powder rooms, and compact guest baths. If you're working with a tight space, we know how to maximize every square foot with smart storage, space-saving fixtures, and layout tricks that make a small bathroom feel spacious.",
          ],
        },
        {
          heading: "Permits, Code Compliance & Inspections",
          paragraphs: [
            "Every kitchen and bathroom remodel in Mississippi requires permits for electrical, plumbing, and structural work. We pull all required permits from Brandon City Hall or Rankin County, schedule all inspections, and ensure every modification meets the International Residential Code and local amendments. You never have to deal with the permitting office — we handle it all.",
            "Our licensed electricians and plumbers are on staff, not subcontracted out. That means quality control from start to finish, and a single point of accountability for your entire project. If an inspector flags an issue, we fix it immediately — no passing the blame between contractors.",
            "This matters more than you might think. Unpermitted electrical and plumbing work can void your homeowner's insurance, complicate a future sale, and create safety hazards. With Bradley Brown, every wire and pipe is up to code, documented, and inspected.",
          ],
        },
        {
          heading: "Increased Home Value & ROI",
          paragraphs: [
            "A well-executed kitchen or bathroom remodel typically returns 60–80% of its cost in added home value — and in the Brandon and Rankin County market, those returns can be even higher. Modern kitchens and updated bathrooms are the top features buyers look for, and they can make the difference between a home that sits on the market and one that sells quickly.",
            "Even if you're not planning to sell, a remodeled kitchen and bathroom improve your daily quality of life and reduce maintenance headaches for years to come. New fixtures, modern appliances, and proper waterproofing mean fewer repairs and lower utility bills.",
            "Ready to transform your kitchen or bathroom? Call (844) 351-4154 or request a free estimate online. We'll visit your home, discuss your vision, and provide a detailed, written estimate — no pressure, no obligation.",
          ],
        },
      ]}
      features={[
        "Custom cabinetry design & installation",
        "Granite, quartz & marble countertops",
        "Tile floors, backsplashes & shower surrounds",
        "Frameless glass shower enclosures",
        "Licensed electrical & plumbing on staff",
        "All permits & inspections handled",
        "Energy-efficient fixtures & LED lighting",
        "Moisture management for Mississippi humidity",
      ]}
      faqs={[
        { question: "How long does a kitchen remodel take in Brandon, MS?", answer: "Typically 4–8 weeks depending on scope. We give you a realistic timeline upfront and provide regular progress updates so you're never left guessing." },
        { question: "Do you handle all permits for kitchen and bathroom remodels?", answer: "Yes — we pull all required permits from Brandon City Hall or Rankin County and handle all inspections so you don't have to deal with the permitting office." },
        { question: "What's the ROI on a kitchen or bathroom remodel in Mississippi?", answer: "Kitchen and bathroom remodels typically return 60–80% of their cost in added home value. In the Brandon market, updated kitchens and baths are the top features buyers look for." },
      ]}
      testimonials={[{
        text: "They remodeled our kitchen and master bath — it looks like a completely different house. The team was professional, clean, and finished on schedule. 10/10!",
        author: "Jennifer R.",
        location: "Flowood, MS",
      }]}
      images={[
        { url: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/932d74d8-4f05-4b52-fa85-6903e1e42b00/medium", alt: "Kitchen remodel by Bradley Brown Inc. in Brandon, MS", caption: "Kitchen remodel — Flowood, MS" },
        { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", alt: "Modern bathroom renovation in Mississippi", caption: "Master bath renovation with custom tile" },
      ]}
      relatedLinks={[
        { to: "/protips/small-bathroom-ideas", label: "Small Bathroom Remodeling Ideas" },
        { to: "/protips/renovation-loans", label: "Renovation Loan Options" },
        { to: "/protips", label: "Pro Tips & Remodeling Advice" },
      ]}
    />
  );
}