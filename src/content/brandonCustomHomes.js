// First-party service, portfolio and estimate pages checked on 2026-11-03.
// The live portfolio records below differ from Portfolio.jsx's placeholderProjects.
// Source details and excluded claims are retained in the task's resources package.
export const brandonCustomHomes = {
  title: "Custom Home Builder in Brandon, MS | Bradley Brown Inc.",
  description: "Bradley Brown Inc. builds custom homes in Brandon and Central Mississippi. See documented Brandon projects and share your plans to request an estimate.",
  canonical: "https://bradleybrowninc.com/custom-home-builder-brandon-ms",
  h1: "Custom Home Builder in Brandon, MS",
  opening: "Bradley Brown Inc. builds personalized custom homes and new-construction homes in Brandon, Rankin County, and Central Mississippi. The custom-home service covers planning and construction, with layouts and finishes shaped around the homeowner's needs. Review the Brandon project examples below, then share your property location and priorities to request an estimate.",
  sections: [
    {
      heading: "Custom homes and new construction in Brandon",
      paragraphs: [
        "Bradley Brown Inc.'s custom-home work starts with the home you want to build: the space your household needs, the layout that works for daily life, and the materials and finishes you want to discuss. The company describes its service as personalized home building, from planning through construction and the final walkthrough.",
        "A new home and a remodel are different projects. The examples below identify which work was a custom-home build and which changed an existing home, so you can review the relevant experience."
      ]
    },
    {
      heading: "Service area: Brandon, Rankin County, and Central Mississippi",
      paragraphs: [
        "Bradley Brown Inc. is based in Brandon, Mississippi. Its published custom-home services cover Brandon, Rankin County, and Central Mississippi. Include your property's location in your request so the team can confirm availability and the proposed work for that address."
      ]
    },
    {
      heading: "Start with your property and home priorities",
      paragraphs: [
        "Use the estimate page's message form and select Custom Home. Include your project address, contact information, and a description of the home you want. Mention any land or plans you already have and the layout or finish choices you want to discuss.",
        "Ask the team to confirm the proposed scope and responsibilities for your project. An estimate request starts the conversation; it is not a confirmed construction price or completion schedule."
      ]
    }
  ],
  projects: [
    {
      title: "Custom Home Build",
      type: "Custom-home build",
      location: "Brandon, MS",
      year: 2018,
      squareFeet: 2800,
      description: "The portfolio describes a large kitchen opening to a grand living room and a laundry room connected to the master suite.",
      image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/cbbe2494-0b29-4884-b2fc-b92051633700/medium",
      alt: "Custom Home Build in Brandon, MS, as pictured in Bradley Brown Inc.'s portfolio",
      source: "https://bradleybrowninc.com/portfolio"
    },
    {
      title: "Custom Home Remodel and Addition",
      type: "Remodel and addition — not a new-home build",
      location: "Brandon, MS",
      year: 2024,
      squareFeet: 3750,
      description: "The portfolio describes an addition with a larger laundry room, a gutted kitchen and bathrooms, granite countertops, walk-in showers, and a new fireplace. This example concerns an existing home, not new construction.",
      image: "https://media.base44.com/images/public/699c758479c46f0580553750/d343a428a_brad-portfolio-bathj-customhome.jpeg",
      alt: "After view of the Brandon Custom Home Remodel and Addition from Bradley Brown Inc.'s portfolio",
      source: "https://bradleybrowninc.com/portfolio"
    }
  ],
  faqs: [
    {
      question: "Does Bradley Brown Inc. build custom homes in Brandon, MS?",
      answer: "Yes. Bradley Brown Inc. offers personalized custom-home and new-construction services in Brandon, Mississippi, from planning through construction and the final walkthrough. Layouts and finishes are discussed around the homeowner's needs."
    },
    {
      question: "What area does Bradley Brown Inc. serve for custom-home building?",
      answer: "Bradley Brown Inc. is based in Brandon and publishes custom-home services for Brandon, Rankin County, and Central Mississippi. Share your property's location so the team can confirm availability and the proposed work for your address."
    },
    {
      question: "Where can I see a Bradley Brown Inc. custom-home example in Brandon?",
      answer: "The company's portfolio lists Custom Home Build in Brandon, MS, as a 2,800-square-foot project completed in 2018. Its description includes a large kitchen opening to a grand living room and a laundry room connected to the master suite. The separately listed Custom Home Remodel and Addition is work on an existing home, not another new-home build."
    },
    {
      question: "How do I request a custom-home estimate?",
      answer: "Use the message form on the estimate page, select Custom Home, and provide your project address, contact details, and a description of the home you want. You can also call Bradley Brown Inc. at (844) 351-4154."
    }
  ]
};

export const brandonCustomHomesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${brandonCustomHomes.canonical}#service`,
      url: brandonCustomHomes.canonical,
      name: "Custom Home Building in Brandon, MS",
      description: brandonCustomHomes.description,
      provider: {
        "@type": "HomeAndConstructionBusiness",
        name: "Bradley Brown Inc.",
        url: "https://bradleybrowninc.com/",
        telephone: "+18443514154"
      },
      areaServed: "Brandon, Rankin County, and Central Mississippi"
    },
    {
      "@type": "FAQPage",
      "@id": `${brandonCustomHomes.canonical}#faq`,
      url: brandonCustomHomes.canonical,
      mainEntity: brandonCustomHomes.faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer }
      }))
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://bradleybrowninc.com/" },
        { "@type": "ListItem", position: 2, name: brandonCustomHomes.h1, item: brandonCustomHomes.canonical }
      ]
    }
  ]
};
