import React from "react";
import ServicePageLayout from "@/components/services/ServicePageLayout";

export default function CustomHomeBuilding() {
  return (
    <ServicePageLayout
      title="Custom Home Building in Brandon, MS | Bradley Brown Inc"
      description="Custom home builder in Brandon, MS since 1995. Full design-build service, premium materials, energy-efficient construction across Rankin County & Central Mississippi. Free estimates."
      canonical="https://bradleybrowninc.com/services/custom-home-building"
      h1="Custom Home Building in Brandon, MS"
      subtitle="Your vision. Our craftsmanship. From blueprint to final walkthrough, we manage every detail of your custom home build across Brandon and Central Mississippi."
      serviceName="Custom Home Building"
      bodySections={[
        {
          heading: "Building Custom Homes in Brandon Since 1995",
          paragraphs: [
            "Bradley Brown Inc. has been building custom homes in Brandon, MS and across Rankin County for over three decades. What started as a small local operation has grown into one of Central Mississippi's most trusted custom home builders, with more than 500 homes completed and a reputation for craftsmanship that speaks for itself.",
            "We don't build cookie-cutter houses. Every home we construct is designed around the way your family actually lives — from the morning coffee spot in the kitchen to the evening porch where you watch the sunset. Our team takes the time to understand your vision before we ever break ground, and we stay in close communication from the first blueprint to the final walkthrough.",
            "Building a custom home is one of the biggest investments you'll ever make. We treat it that way. Our process is transparent, our pricing is upfront, and our commitment to quality shows in every detail — from the foundation to the crown molding.",
          ],
        },
        {
          heading: "Our Custom Home Building Process",
          paragraphs: [
            "Every Bradley Brown custom home follows a proven five-step process. First, we sit down with you for a free consultation to understand your budget, your timeline, and the features that matter most to your family. We discuss everything from square footage and bedroom count to the style of cabinetry and the type of countertops you've been dreaming about.",
            "Next, our design team creates custom floor plans tailored to your lot, your lifestyle, and your budget. We handle all architectural consultation and engineering, and we can adapt existing plans or start from scratch. Once you approve the design, we provide a detailed, fixed written estimate — no vague ranges, no hidden costs, no surprise change orders down the line.",
            "During construction, you get regular progress updates and a single point of contact who knows your project inside and out. We pull all permits, schedule all inspections, and manage every subcontractor — electricians, plumbers, HVAC, roofers, masons — so you never have to coordinate multiple contractors. The final step is a comprehensive walkthrough where we address every detail before handing you the keys.",
          ],
        },
        {
          heading: "Why Brandon Homeowners Choose Bradley Brown",
          paragraphs: [
            "Brandon homeowners choose us because we deliver what other contractors promise but rarely deliver: a home built on time, on budget, and to a standard that exceeds expectations. Our 30-year track record in Rankin County means we know the local soil conditions, the permitting process at Brandon City Hall, and the inspectors by name. That local knowledge saves you time and money.",
            "We're licensed, insured, and bonded — Mississippi State Board of Contractors license #08290, fully insured, and BBB accredited. Our workmanship warranty is among the best in Central Mississippi, and we provide post-build support long after you've moved in. If something needs attention a year after completion, we're a phone call away.",
            "Our pricing is transparent and competitive. We use premium materials — not builder-grade shortcuts — and we pass our supplier relationships and volume discounts directly to you. You get the quality of a luxury custom home at a price that respects your budget.",
          ],
        },
        {
          heading: "Premium Materials & Energy-Efficient Construction",
          paragraphs: [
            "Every Bradley Brown custom home is built with energy efficiency in mind. We use spray foam insulation in attics and walls, double-pane Low-E windows, high-efficiency HVAC systems, and LED lighting throughout. These features don't just reduce your carbon footprint — they lower your monthly utility bills by 30–40% compared to a standard builder home.",
            "Our material selection process is hands-on. We walk you through flooring, cabinetry, countertops, fixtures, and finish options at local suppliers across the Brandon and Jackson metro area. You see and touch every material before it goes into your home — no guessing from a catalog photo.",
            "We source premium materials at competitive prices thanks to our three decades of relationships with local suppliers. From solid-surface countertops to hardwood flooring, from architectural shingles to custom millwork, we never substitute cheaper materials without telling you first.",
          ],
        },
        {
          heading: "Serving Brandon & All of Central Mississippi",
          paragraphs: [
            "Bradley Brown Inc. builds custom homes throughout Brandon, Flowood, Pearl, Madison, Ridgeland, Florence, Richland, Pelahatchie, and the greater Jackson metro area. If you have land in Rankin County or the surrounding Central Mississippi region, we can build on it. We're familiar with the zoning requirements, setback rules, and utility hookups across all of these communities.",
            "If you're still looking for the right piece of land, we're happy to walk a parcel with you before you close. We'll flag potential site-prep costs, drainage concerns, and utility access issues that could affect your budget — at no charge.",
            "Ready to start building your dream home? Call (844) 351-4154 or request a free estimate online. We'll schedule a no-obligation consultation at your lot or our Brandon office.",
          ],
        },
      ]}
      features={[
        "Full architectural consultation & custom floor plans",
        "Premium material selection with local suppliers",
        "Energy-efficient construction (spray foam, Low-E windows, LED lighting)",
        "One point of contact from design to move-in",
        "Transparent, fixed written estimates — no hidden costs",
        "All permits & inspections handled for you",
        "Industry-leading workmanship warranty",
        "Post-build support and service",
      ]}
      faqs={[
        { question: "How long does a custom home build take in Brandon, MS?", answer: "Typically 8–14 months depending on size and complexity. We provide a detailed project timeline before breaking ground and give you regular progress updates throughout construction." },
        { question: "Can I make changes during construction?", answer: "Yes — we use a written change order process to handle modifications while keeping the project on track and within budget. Every change is documented and priced before work begins." },
        { question: "What does a custom home cost in Rankin County?", answer: "Custom homes in the Brandon area typically start around $250,000 and scale up based on square footage, finishes, and site conditions. Call (844) 351-4154 for a free, site-specific estimate." },
      ]}
      testimonials={[{
        text: "Bradley Brown built our custom home in Brandon and the craftsmanship is absolutely incredible. They kept us informed every step of the way. We couldn't be happier!",
        author: "Sarah & Tom M.",
        location: "Brandon, MS",
      }]}
      images={[
        { url: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/4f5d5272-9876-4979-760d-78b67d9aa600/large", alt: "Custom home built by Bradley Brown Inc. in Brandon, MS", caption: "Custom home — Brandon, MS" },
        { url: "https://images.unsplash.com/photo-1564013799989-ab1140d7376f?w=800&q=80", alt: "Newly constructed custom home exterior in Mississippi", caption: "Quality craftsmanship from foundation to roofline" },
      ]}
      relatedLinks={[
        { to: "/energyefficientupgrades", label: "Energy-Efficient Home Upgrades" },
        { to: "/homeadditionideas", label: "Home Addition Ideas & ROI Guide" },
        { to: "/protips", label: "Pro Tips & Remodeling Advice" },
      ]}
    />
  );
}