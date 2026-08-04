import React from "react";
import ServicePageLayout from "@/components/services/ServicePageLayout";

export default function OutdoorLiving() {
  return (
    <ServicePageLayout
      title="Outdoor Living Spaces in Brandon, MS | Bradley Brown Inc"
      description="Outdoor living, covered patios, outdoor kitchens, decks & pergolas in Brandon, MS. Built for Mississippi. Licensed since 1995. Call (844) 351-4154."
      canonical="https://bradleybrowninc.com/services/outdoor-living"
      h1="Outdoor Living Spaces & Decks in Brandon, MS"
      subtitle="Mississippi's climate is made for outdoor living. We design and build covered patios, outdoor kitchens, custom decks, and pergolas that extend your home's footprint year-round."
      serviceName="Outdoor Living Spaces"
      pageKey="OutdoorLiving"
      bodySections={[
        {
          heading: "Outdoor Living Built for Mississippi's Climate",
          paragraphs: [
            "Central Mississippi's long warm season means your outdoor space can be a second living room for most of the year. A well-designed outdoor living area doesn't just add square footage — it changes how your family spends time together. Friday night cookouts, Saturday morning coffee on the porch, Sunday football on the outdoor TV — this is what Mississippi living is all about.",
            "Bradley Brown Inc. has been building outdoor living spaces across Brandon, Flowood, Pearl, Madison, and Rankin County since 1995. We design and build covered patios, outdoor kitchens, custom decks, pergolas, pool surrounds, and complete outdoor entertainment areas that stand up to Mississippi's heat, humidity, and storm season.",
            "Every outdoor project we build is designed for durability. We use pressure-treated and composite decking, rust-resistant hardware, proper drainage, and weather-rated electrical components. Our outdoor kitchens are built with stainless steel cabinetry, stone or brick veneer, and commercial-grade grills that last for years.",
          ],
        },
        {
          heading: "Covered Patios & Porches",
          paragraphs: [
            "A covered back porch is the single most popular outdoor project in Central Mississippi — and for good reason. It gives you shade from the afternoon sun, shelter from a sudden rain, and a comfortable place to gather regardless of the weather. We build covered patios with vaulted ceilings, ceiling fans, recessed lighting, and even outdoor fireplaces for cooler evenings.",
            "Our covered porch designs range from simple attached patios to full wraparound porches with stone columns, tongue-and-groove ceilings, and decorative beams. We can screen the porch to keep bugs out, or leave it open for maximum airflow. Every covered porch is tied into your existing roofline with matching shingles and trim.",
            "We also build freestanding pavilions and gazebos for properties where an attached structure doesn't make sense. These are popular near pools, gardens, and backyard fire pit areas — giving you a shaded gathering spot anywhere on your property.",
          ],
        },
        {
          heading: "Outdoor Kitchens & BBQ Stations",
          paragraphs: [
            "An outdoor kitchen turns your backyard into a full entertainment destination. We build outdoor kitchens with built-in grills, side burners, refrigerators, ice makers, bar seating, and stone or brick veneer bases. Whether you want a simple BBQ station or a full outdoor kitchen with a pizza oven and kegerator, we design it to match your cooking style and your budget.",
            "Our outdoor kitchens use stainless steel components rated for outdoor use, weatherproof cabinetry, stone or granite countertops, and proper gas and electrical connections. We handle all gas line installation, electrical wiring, and plumbing for sinks and ice makers — all permitted and inspected to Mississippi code.",
            "We also integrate outdoor kitchens with covered patios, fire features, and seating areas to create a cohesive outdoor living space. Imagine a covered porch with a ceiling fan, an outdoor kitchen with a bar, a TV mounted on the stone column, and string lights overhead — that's the kind of space we build.",
          ],
        },
        {
          heading: "Custom Decks & Pergolas",
          paragraphs: [
            "We build custom decks from pressure-treated pine, cedar, and composite materials. Composite decking (like Trex or TimberTech) is increasingly popular in Mississippi because it doesn't rot, warp, or require annual staining — ideal for our humid climate. We design decks with multiple levels, built-in seating, planter boxes, and integrated lighting.",
            "Pergolas add shade and architectural interest to any outdoor space. We build pergolas from cedar, pressure-treated wood, or low-maintenance fiberglass columns, with custom lattice patterns, shade canopies, and integrated lighting. Pergolas are a cost-effective way to define an outdoor room without a full roof.",
            "Every deck and pergola we build is engineered to meet Mississippi wind load requirements and local building codes. We pull all permits and handle all inspections — so your deck is safe, legal, and built to last.",
          ],
        },
        {
          heading: "Pool Surrounds & Landscape Integration",
          paragraphs: [
            "If you have a pool — or are planning one — we build the surrounding outdoor living space that ties it all together. From stamped concrete pool decks and travertine coping to pool houses, cabanas, and outdoor showers, we create the complete backyard resort experience.",
            "We also integrate outdoor lighting, irrigation modifications, and landscape hardscaping into our outdoor living projects. Low-voltage path lighting, uplighting on trees, deck lighting, and pergola lighting extend the usability of your outdoor space well into the evening.",
            "Ready to transform your backyard? Call (844) 351-4154 or request a free estimate online. We'll visit your property, discuss your vision, and provide a detailed estimate for your outdoor living project.",
          ],
        },
      ]}
      features={[
        "Covered patios & porches with ceiling fans & lighting",
        "Outdoor kitchens with grills, refrigerators & bar seating",
        "Custom decks in wood, cedar & composite materials",
        "Pergolas & pavilions for shade and style",
        "Pool surrounds, cabanas & pool houses",
        "Outdoor fireplaces & fire pits",
        "Integrated outdoor lighting & electrical systems",
        "Full permitting & code-compliant construction",
      ]}
      faqs={[
        { question: "What's the most popular outdoor project in Mississippi?", answer: "Covered back porches with outdoor kitchens are the most popular — perfect for year-round entertaining in Central Mississippi's climate. They give you shade, shelter, and a full cooking space in one structure." },
        { question: "Do decks and outdoor structures need permits in Rankin County?", answer: "Yes — most decks over 200 square feet and all structures with electrical, plumbing, or gas connections require permits. We handle all permits and inspections from Brandon City Hall or Rankin County." },
        { question: "Should I choose wood or composite decking in Mississippi?", answer: "Composite decking (like Trex) is ideal for Mississippi's humid climate — it won't rot, warp, or need annual staining. Pressure-treated wood is more budget-friendly but requires regular maintenance. We offer both and help you choose based on your budget and maintenance preferences." },
      ]}
      testimonials={[{
        text: "Our new covered porch with an outdoor kitchen is the best investment we've ever made. The whole family lives out there on weekends. Absolutely beautiful work.",
        author: "Chris & Amy B.",
        location: "Pearl, MS",
      }]}
      images={[
        { url: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/bbd98a0f-473a-4754-b6fd-2724101d1500/large", alt: "Outdoor living space with covered patio by Bradley Brown Inc.", caption: "Covered patio with outdoor kitchen — Pearl, MS" },
        { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", alt: "Custom outdoor deck and pergola in Mississippi", caption: "Custom composite deck with pergola" },
      ]}
      relatedLinks={[
        { to: "/protips/home-addition-ideas", label: "Home Addition Ideas & ROI Guide" },
        { to: "/pricing", label: "Pricing & Cost Guide" },
        { to: "/protips", label: "Pro Tips & Remodeling Advice" },
      ]}
    />
  );
}