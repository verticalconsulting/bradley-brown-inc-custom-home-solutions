import React from "react";
import ServicePageLayout from "@/components/services/ServicePageLayout";

export default function RoomAdditions() {
  return (
    <ServicePageLayout
      title="Room Additions in Brandon, MS | Bradley Brown Inc"
      description="Room additions in Brandon, MS — master suites, in-law suites, sunrooms & home offices. Licensed contractor since 2005. Call (844) 351-4154."
      canonical="https://bradleybrowninc.com/services/room-additions"
      h1="Room Additions & Home Expansions in Brandon, MS"
      subtitle="More space, more possibilities — without moving. We design and build additions that blend seamlessly with your existing home's architecture."
      serviceName="Room Additions"
      pageKey="RoomAdditions"
      bodySections={[
        {
          heading: "Room Additions That Look Like They Were Always There",
          paragraphs: [
            "When your family outgrows your home, you have two choices: move, or add on. Moving means uprooting your life, changing schools, and leaving the neighborhood you love. A room addition lets you stay right where you are — with more of the space you need.",
            "Bradley Brown Inc. has been building room additions across Brandon, Madison, Flowood, Pearl, and the greater Rankin County area since 2005. We specialize in additions that match your existing home so precisely — brick, roofline, trim, paint color — that you'd never know it wasn't part of the original build.",
            "From a simple bedroom expansion to a full second-story addition, from a sunroom that lets in the Mississippi sunshine to a dedicated home office that makes remote work actually work, we handle every type of residential addition. And because we're a licensed general contractor, we manage the entire project — design, permits, foundation, framing, roofing, electrical, plumbing, and finish — under one contract.",
          ],
        },
        {
          heading: "Master Suite & Bedroom Additions",
          paragraphs: [
            "A master suite addition is one of the most popular projects in the Brandon area. We design and build master bedrooms with walk-in closets, en-suite bathrooms, and private sitting areas that transform your daily routine. Many of our clients add a master suite over a garage or as a rear extension, creating a private retreat without sacrificing existing living space.",
            "We also build additional bedrooms for growing families, guest rooms for visiting relatives, and bonus rooms that flex with your needs. Every bedroom addition meets Mississippi's minimum square footage, egress, and electrical code requirements, and we handle all permits and inspections from the Brandon or Rankin County building department.",
            "Our master suite additions typically include custom trim work, ceiling details, walk-in closet design, and a full bathroom with tile shower, vanity, and lighting. We match the flooring, baseboards, and door style to your existing home for a seamless look.",
          ],
        },
        {
          heading: "In-Law Suites & Multigenerational Living",
          paragraphs: [
            "Multigenerational living is on the rise across Central Mississippi, and in-law suites are one of our most requested additions. We design self-contained living quarters — with a bedroom, full bathroom, kitchenette, and private entrance — that give aging parents or adult children their independence while keeping them close to family.",
            "Our in-law suite designs meet accessibility standards when needed: wider doorways, zero-threshold showers, grab bar blocking, and ADA-compliant fixture heights. We can also add ramps and covered entries for mobility assistance.",
            "Every in-law suite addition is designed with privacy in mind. Sound-dampling insulation between the suite and the main house, separate HVAC zones, and a private entrance mean your family members have their own space — and so do you.",
          ],
        },
        {
          heading: "Home Offices, Sunrooms & Garage Conversions",
          paragraphs: [
            "Remote work is here to stay, and a purpose-built home office addition makes it work. We build dedicated home offices with proper lighting, data wiring, sound insulation, and built-in cabinetry — not just a desk in a spare bedroom. Many of our Brandon-area clients convert a garage or add a dedicated office wing to create a professional workspace at home.",
            "Sunrooms are another popular addition in Mississippi's climate. A well-designed sunroom with energy-efficient windows, proper insulation, and HVAC extends your living space and lets you enjoy the outdoors year-round — without the heat, humidity, or bugs. We build three-season and four-season sunrooms, screened porches, and solariums.",
            "Garage conversions are a cost-effective way to add living space without building new. We convert attached garages into bedrooms, family rooms, home theaters, or income-producing accessory dwelling units (ADUs). We handle all insulation, flooring, electrical, and window modifications to meet residential code.",
          ],
        },
        {
          heading: "Seamless Integration & Full Permitting",
          paragraphs: [
            "The biggest concern homeowners have about additions is whether it will look like an obvious add-on. It won't. We match your existing brick or siding, roof pitch and shingle color, window style and size, trim profile, and paint color. We match the interior flooring, baseboards, casing, and door style. Our goal is an addition that looks original to the home.",
            "We pull all required permits from Brandon City Hall or Rankin County, submit engineered plans when needed, and schedule all inspections from foundation to final. Our additions meet or exceed the International Residential Code and all local amendments — and we stand behind our work with a comprehensive workmanship warranty.",
            "Ready to add space to your home? Call (844) 351-4154 or request a free estimate online. We'll visit your home, discuss your needs, and provide a detailed, written estimate for your addition project.",
          ],
        },
      ]}
      features={[
        "Master suite additions with en-suite bathrooms",
        "In-law suites & multigenerational designs",
        "Home offices with data wiring & sound insulation",
        "Sunrooms & screened porches for Mississippi living",
        "Garage conversions & bonus room finishing",
        "Seamless architectural match — brick, roof, trim",
        "Full permitting & code compliance",
        "Foundation, framing, roofing, electrical & plumbing handled",
      ]}
      faqs={[
        { question: "Will an addition match my existing home in Brandon?", answer: "Absolutely — we match materials, rooflines, brick or siding, window style, and interior finishes so the addition looks like it was always there. It's what we do best." },
        { question: "Can I add a home office or in-law suite to my existing floor plan?", answer: "Yes. We specialize in garage conversions, bonus room finishing, purpose-built home office additions, and in-law suites with private entrances and kitchenettes." },
        { question: "How much does a room addition cost in Rankin County?", answer: "Room additions start around $50,000 for a simple bedroom and scale up based on size, complexity, and finishes. Call (844) 351-4154 for a free, site-specific estimate." },
      ]}
      testimonials={[{
        text: "We added a mother-in-law suite and a home office. Bradley Brown matched the brick and roofline perfectly — you'd never know it wasn't original to the house.",
        author: "Marcus & Dana L.",
        location: "Madison, MS",
      }]}
      images={[
        { url: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/ed62ffc6-b48e-4c79-2b3a-0cc96426b300/medium", alt: "Room addition by Bradley Brown Inc. in Madison, MS", caption: "In-law suite addition — Madison, MS" },
        { url: "https://images.unsplash.com/photo-1600585154340-be6161a4a017?w=800&q=80", alt: "Home addition exterior matching existing house", caption: "Seamless roofline and brick match" },
      ]}
      relatedLinks={[
        { to: "/protips/home-addition-ideas", label: "Home Addition Ideas & ROI Guide" },
        { to: "/protips/energy-efficient-upgrades", label: "Energy-Efficient Home Upgrades" },
        { to: "/protips", label: "Pro Tips & Remodeling Advice" },
      ]}
    />
  );
}