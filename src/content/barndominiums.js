// Service facts checked against the live service, portfolio and estimate pages on 2026-10-28.
// No statewide availability, numeric pricing, schedule, guarantee or review-rating claims.
export const barndominiums = {
  title: "Mississippi Barndominium Builder | Bradley Brown Inc.",
  description: "Bradley Brown Inc. builds barndominiums in Brandon and Central Mississippi. Explore living, garage and workshop layouts, then request an estimate.",
  canonical: "https://bradleybrowninc.com/services/barndominiums",
  h1: "Barndominium Builder in Mississippi",
  opening: "Bradley Brown Inc. offers barndominium construction in Brandon and Central Mississippi, with plans that can combine living space, a garage, a workshop or storage. If you are comparing barndominium builders in Mississippi, share your property location and intended uses to confirm project fit and request an estimate.",
  sections: [
    {
      heading: "What can a barndominium include?",
      paragraphs: [
        "A barndominium can bring residential living and practical work or storage areas into one building plan. Bradley Brown Inc.'s service includes personalized layouts combining living quarters, garages, workshops and hobby space. Discuss which areas need residential finishes and which will be used for vehicles, equipment or storage.",
        "Bring your layout priorities and any drawings you already have. The structure, room arrangement, access and interior finishes should be defined for your project rather than assumed from a standard package."
      ]
    },
    {
      heading: "Where does Bradley Brown Inc. build barndominiums?",
      paragraphs: [
        "Bradley Brown Inc. is based in Brandon, Mississippi, and presents Central Mississippi as its barndominium service area. Share the property's location and proposed work to confirm availability. This is not a promise of service at every address in Mississippi."
      ]
    },
    {
      heading: "Shell or finished home: clarify the scope",
      paragraphs: [
        "The barndominium service describes shell builds and full turnkey builds. These are different scopes: a shell leaves interior work to be completed, while a turnkey proposal includes the agreed finished-home work. Ask for the inclusions and exclusions in writing before comparing estimates.",
        "Identify the living area, garage or shop space, site work, utility connections and finishes separately. Confirm who is responsible for each part of the project, including design documents and approvals. A shell estimate and a finished-home estimate are not interchangeable."
      ]
    },
    {
      heading: "Start with the property and intended use",
      paragraphs: [
        "When requesting an estimate, explain where the land is, whether you already own it, and how much living, garage, workshop or storage space you want. Include any known access or utility concerns and the finish level you have in mind.",
        "Discuss the actual property before relying on a price or construction schedule. Permitting, financing and insurance decisions need confirmation for your plans with the relevant authority, lender or insurer; this page does not establish eligibility."
      ]
    }
  ],
  proof: {
    heading: "Review a Brandon office and shop example",
    text: "The Bradley Brown Inc. portfolio lists a Barndominium Custom Office & Shop in Brandon, with a garage, custom cabinetry and a private business office. This is an office-and-shop example, not evidence of a finished residence or a project in another community.",
    image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/7b34280a-4da6-4735-a990-074941b06e00/medium",
    alt: "Barndominium Custom Office & Shop listed in Bradley Brown Inc.'s Brandon portfolio"
  },
  faqs: [
    {
      question: "Does Bradley Brown Inc. build barndominiums in Mississippi?",
      answer: "Yes. Bradley Brown Inc. offers barndominium construction in Brandon and Central Mississippi. Share the property location and proposed living, garage or workshop space to confirm availability and project fit. Service is not promised at every address in the state."
    },
    {
      question: "Can a barndominium combine a home, garage and workshop?",
      answer: "Yes. Bradley Brown Inc.'s barndominium service describes personalized layouts combining living quarters, garages, workshops and hobby space. The final structure, layout and finishes need to be defined for the property and intended uses."
    },
    {
      question: "Does Bradley Brown Inc. offer shell and turnkey barndominium builds?",
      answer: "The service describes both shell builds and full turnkey builds. Confirm the exact inclusions, exclusions and responsibilities for your project in writing, including interior work, site preparation, utilities and approvals."
    },
    {
      question: "How much does a barndominium cost, and how long does it take?",
      answer: "Request a project-specific estimate and schedule. Size, site conditions, living and workshop areas, finishes and the agreed scope affect what must be priced and scheduled. This page does not promise a standard price, fixed completion time or financing outcome."
    },
    {
      question: "Where can I see Bradley Brown Inc.'s barndominium work and reviews?",
      answer: "The portfolio lists a Barndominium Custom Office & Shop in Brandon. Review that office-and-shop example and visit the separate Reviews page for customer feedback. The office-and-shop listing should not be treated as proof of a finished residence."
    },
    {
      question: "How do I request a barndominium estimate?",
      answer: "Use the estimate page's message form to share your project address, contact details and a description of the barndominium you want. Select Other if no listed project type fits. You can also call Bradley Brown Inc. at (844) 351-4154."
    }
  ]
};

export const barndominiumsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${barndominiums.canonical}#service`,
      url: barndominiums.canonical,
      name: "Barndominium Construction",
      description: barndominiums.description,
      provider: {
        "@type": "HomeAndConstructionBusiness",
        name: "Bradley Brown Inc.",
        url: "https://bradleybrowninc.com/",
        telephone: "+18443514154"
      },
      areaServed: "Brandon and Central Mississippi"
    },
    {
      "@type": "FAQPage",
      "@id": `${barndominiums.canonical}#faq`,
      url: barndominiums.canonical,
      mainEntity: barndominiums.faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer }
      }))
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://bradleybrowninc.com/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://bradleybrowninc.com/services" },
        { "@type": "ListItem", position: 3, name: "Barndominiums", item: barndominiums.canonical }
      ]
    }
  ]
};
