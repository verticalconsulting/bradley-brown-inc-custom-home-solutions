import React from "react";
import ServicePageLayout from "@/components/services/ServicePageLayout";

export default function EmergencyRepairs() {
  return (
    <ServicePageLayout
      title="Emergency Home Repairs in Brandon, MS | Bradley Brown Inc"
      description="Urgent home repairs in Brandon, MS — storm damage, roof leaks & water intrusion. Licensed MS contractor since 1995. Same-week service. Call (844) 351-4154."
      canonical="https://bradleybrowninc.com/services/emergency-repairs"
      h1="Emergency Home Repairs in Brandon, MS"
      subtitle="Storm damage, roof leaks, structural issues — don't wait. Bradley Brown Inc. responds fast to urgent repairs across Brandon and the Rankin County area."
      serviceName="Emergency Home Repair"
      emergencyPhone="(844) 351-4154"
      bannerText="Urgent? Call Now: (844) 351-4154 — Same-Week Service Available"
      bodySections={[
        {
          heading: "Mississippi's Trusted Emergency Repair Contractor",
          paragraphs: [
            "When your home is damaged, every hour matters. A roof leak at 2 AM during a spring storm. A tree branch through your living room window. A water heater that fails and floods your hallway. These situations can't wait for a contractor who calls you back next week — you need someone who picks up the phone and shows up fast.",
            "Bradley Brown Inc. has been responding to urgent repair calls across Brandon, Flowood, Pearl, Jackson, Madison, Ridgeland, and all of Rankin County since 1995. Our licensed crews know how to assess damage quickly, stabilize the situation, and get to work immediately — whether it's tarping a roof, extracting water, boarding up broken windows, or shoring up structural damage.",
            "We're a licensed Mississippi General Contractor (MS Board of Contractors license #08290), fully insured, and BBB accredited. We have 30+ years of experience and are fully qualified for all structural and major repair work. When you call (844) 351-4154, you're calling a contractor who can handle the full scope of your emergency — not just a patch.",
          ],
        },
        {
          heading: "Urgent Repairs We Handle",
          paragraphs: [
            "Mississippi weather can be unforgiving. Spring brings severe thunderstorms and tornadoes. Summer brings intense heat and humidity that can stress roofs and HVAC systems. Fall brings hurricane remnants and tropical storms. Winter brings ice dams and freeze damage. We handle all of it.",
            "Our emergency repair services include storm and wind damage repair, roof leak patching and replacement, water intrusion and flood damage restoration, structural wall and foundation crack repair, ceiling collapse and drywall damage, broken window and door frame replacement, fire and smoke damage restoration, and siding damage and weatherproofing.",
            "We also handle emergency plumbing failures — burst pipes, water heater leaks, and sewer backups — as well as emergency electrical issues. Because we're a full-service general contractor, we can handle everything from the initial emergency stabilization to the complete restoration and finish work. One call, one contractor, start to finish.",
          ],
        },
        {
          heading: "Fast Response Across Central Mississippi",
          paragraphs: [
            "For urgent situations, call us directly at (844) 351-4154 for the fastest response. We prioritize emergency calls and work to schedule same-week or next-day service for serious issues. During business hours — Monday through Friday 8am to 6pm and Saturday 9am to 3pm — someone will answer your call and dispatch a crew as quickly as possible.",
            "For after-hours emergencies, leave a voicemail and we'll call back first thing the next morning. We also monitor messages on weekends during storm season, when severe weather hits the Rankin County area and our neighbors need help most.",
            "Our service area covers Brandon, Flowood, Pearl, Jackson, Madison, Ridgeland, Florence, Richland, Pelahatchie, and all surrounding communities within a 50-mile radius of Brandon. If you're in Central Mississippi and your home needs urgent repair, we'll get there.",
          ],
        },
        {
          heading: "Insurance Documentation & Claims Support",
          paragraphs: [
            "Most emergency repairs involve an insurance claim, and we have extensive experience working with homeowner insurance companies across Mississippi. We document the damage thoroughly — with photos, written descriptions, and itemized repair estimates — and provide everything your adjuster needs to process your claim quickly and fairly.",
            "We can meet your insurance adjuster on-site, walk through the damage together, and make sure nothing is overlooked. We provide itemized estimates in the format most insurance companies prefer, and we can negotiate directly with your adjuster if the initial settlement offer doesn't cover the full scope of the repair.",
            "We also handle mortgage company draw documentation if your lender requires it. Many of our emergency repair clients are dealing with a stressful situation for the first time, and we walk you through the insurance and financing process step by step — so you can focus on your family while we handle the paperwork.",
          ],
        },
        {
          heading: "Why Choose a Licensed Contractor for Emergency Repairs",
          paragraphs: [
            "It's tempting to call the first handyman who answers the phone when you have an emergency. But unlicensed repair work can void your homeowner's insurance, complicate a future sale, and create safety hazards that surface months or years later. Mississippi law requires a state license for most residential repair work over a certain dollar threshold — and for good reason.",
            "Bradley Brown Inc. is a licensed Mississippi General Contractor with 30+ years of experience. Our repair work meets the International Residential Code and all local amendments. We pull permits when required, schedule inspections, and stand behind our work with a workmanship warranty. When we repair your home, it's done right — not just done fast.",
            "Don't wait — call (844) 351-4154 now for emergency home repairs in Brandon and Central Mississippi. We'll assess the situation and get someone out as quickly as possible.",
          ],
        },
      ]}
      features={[
        "Storm & wind damage repair",
        "Roof leak patching & emergency tarping",
        "Water intrusion & flood damage restoration",
        "Structural wall & foundation crack repair",
        "Ceiling collapse & drywall damage",
        "Broken windows & door frame replacement",
        "Fire & smoke damage restoration",
        "Full insurance documentation & claims support",
      ]}
      faqs={[
        { question: "Do you handle emergency home repairs in Brandon, MS?", answer: "Yes. Call (844) 351-4154 during business hours — Mon–Fri 8am–6pm and Sat 9am–3pm. We prioritize urgent calls and work to schedule same-week or next-day service for serious issues." },
        { question: "What types of urgent repairs do you handle?", answer: "Storm damage, roof leaks, water intrusion, structural damage, broken windows, foundation cracks, collapsed ceilings, fire and flood damage restoration, and emergency plumbing and electrical failures." },
        { question: "Do you work with insurance companies for emergency repairs?", answer: "Yes, we have extensive experience with homeowner insurance claims. We document the damage thoroughly and provide itemized estimates for your adjuster, and we can meet your adjuster on-site." },
      ]}
      testimonials={[{
        text: "A storm put a tree through our roof at midnight. Brad's crew had it tarped and secured by 8am and worked directly with our insurance adjuster. Couldn't have asked for a better response.",
        author: "David W.",
        location: "Brandon, MS",
      }]}
      images={[
        { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", alt: "Storm damage emergency roof repair in Mississippi", caption: "Storm damage — emergency roof tarping" },
        { url: "https://images.unsplash.com/photo-1581094794327-c711b9ce6839?w=800&q=80", alt: "Structural repair work on Mississippi home", caption: "Structural assessment and repair" },
      ]}
      relatedLinks={[
        { to: "/protips/energy-efficient-upgrades", label: "Energy-Efficient Upgrades" },
        { to: "/protips/renovation-loans", label: "Renovation Loan Options" },
        { to: "/protips", label: "Pro Tips & Remodeling Advice" },
      ]}
    />
  );
}