const estimateCTA = "Use /estimate to share the property location, project type, and goals.";

export const homeAnswerOpening =
  "Bradley Brown Inc. helps homeowners in Brandon and Central Mississippi plan custom homes, remodel existing spaces, add rooms, create outdoor living areas, build barndominiums, and address urgent home repairs. Homeowners can review the relevant service and request a free estimate to discuss the property, priorities, and next step.";

export const homeAnswerFaqs = [
  {
    question: "What is Bradley Brown Inc.'s process for a home project?",
    answer:
      "Start by sharing the property location, project type, goals, and known constraints through the estimate request. The current site describes work from planning through construction and finish, but the exact steps depend on the service and property.",
  },
  {
    question: "How long will my project take?",
    answer:
      "Timing depends on the project type, scope, property conditions, design decisions, approvals, material availability, and construction sequencing. Bradley Brown Inc. should provide project-specific timing after reviewing the work.",
  },
  {
    question: "How should I plan the budget?",
    answer:
      "A responsible budget starts with the project scope, existing conditions, size, materials, finish choices, and any structural or system work. Request an estimate based on the actual property rather than relying on a one-size-fits-all price.",
  },
  {
    question: "Can I choose the layout, materials, and finishes?",
    answer:
      "Bradley Brown Inc.'s current site presents custom work as being built around the homeowner's vision. Share the layout priorities, inspiration, materials, and finishes that matter to you so the team can determine what fits the property and project.",
  },
  {
    question: "What areas does Bradley Brown Inc. serve?",
    answer:
      "Bradley Brown Inc. is based in Brandon and the current site presents Central Mississippi as its broader service area. Project fit and availability may vary by location and scope.",
  },
  {
    question: "How do I get started?",
    answer:
      "Choose the service that matches your project, then use Get My Free Estimate at /estimate to share the location, project type, and goals.",
  },
];

const withSharedQuestions = ({ process, design, start }) => [
  { question: "What is the process for this project?", answer: process },
  {
    question: "How long will this project take?",
    answer:
      "Timing depends on the project scope, property conditions, design decisions, approvals, material availability, weather when relevant, and construction sequencing. Bradley Brown Inc. should provide project-specific timing after reviewing the work.",
  },
  {
    question: "What affects the budget?",
    answer:
      "Budget depends on the property, scope, existing conditions, materials, finishes, and any structural or system work. Request an estimate based on the actual project rather than relying on a one-size-fits-all price.",
  },
  { question: "Can I choose the layout, materials, and finishes?", answer: design },
  {
    question: "Where is this service available?",
    answer:
      "Bradley Brown Inc. is based in Brandon and the current site presents Central Mississippi as its broader service area. Project fit and availability may vary by location and scope.",
  },
  { question: "How do I get started?", answer: start || estimateCTA },
];

export const serviceAnswerFirstContent = {
  customHomeBuilding: {
    description:
      "Explore Bradley Brown Inc.'s personalized custom home building service for Brandon and Central Mississippi, then request a free estimate.",
    opening:
      "Bradley Brown Inc. builds personalized homes for homeowners in Brandon and Central Mississippi. Its custom-home service connects planning, residential construction, and finishing work around the homeowner's property, lifestyle, and goals. The service hub explains the current scope and directs homeowners to request an estimate.",
    faqs: [
      {
        question: "What does custom home building include?",
        answer:
          "Custom home building creates a residence around a specific owner, property, and set of needs. Bradley Brown Inc.'s approved positioning covers personalized residential construction from the foundation through finishing touches. The final process and deliverables depend on the confirmed project scope.",
      },
      {
        question: "How is a custom-home plan shaped around a homeowner's lifestyle?",
        answer:
          "Planning should begin with how the household uses the home: daily routines, desired rooms, storage, gathering spaces, accessibility needs, and indoor-outdoor living priorities. Those needs can then guide layout and finish decisions.",
      },
      {
        question: "Can Bradley Brown Inc. build on a lot I already own?",
        answer:
          "That may be possible, but lot-evaluation and build-on-your-land details depend on the property and must be confirmed for the project. Share the location when requesting a consultation so Bradley Brown Inc. can review the site and next step.",
      },
      {
        question: "How long does a custom home take to build?",
        answer:
          "No single timeline fits every custom home. Design decisions, property conditions, project scope, approvals, material availability, and construction sequencing can all affect timing. Bradley Brown Inc. can provide project-specific guidance after reviewing the work.",
      },
      {
        question: "Which Central Mississippi communities does Bradley Brown Inc. serve?",
        answer:
          "Bradley Brown Inc. is based in Brandon and serves Central Mississippi. Project fit and availability may vary by location and scope, so homeowners should share their property location when requesting an estimate.",
      },
    ],
  },
  kitchenRemodeling: {
    description:
      "Bradley Brown Inc. remodels kitchens for Brandon and Central Mississippi homeowners, from focused updates to broader layout changes.",
    opening:
      "Bradley Brown Inc. remodels kitchens for homeowners in Brandon and Central Mississippi. Projects can focus on improving the room's function, layout, storage, gathering space, and finishes according to the homeowner's priorities. The appropriate scope, cost, and schedule should be determined from the existing kitchen and requested changes.",
    faqs: [
      {
        question: "Does Bradley Brown Inc. remodel kitchens in Brandon, MS?",
        answer:
          "Yes. Kitchen remodeling is a documented Bradley Brown Inc. service for homeowners in Brandon and Central Mississippi. The company's approach focuses on creating spaces that improve daily function and fit the homeowner's vision and lifestyle.",
      },
      {
        question: "What can be included in a kitchen remodel?",
        answer:
          "A kitchen remodel may address layout, storage, cabinetry, work surfaces, fixtures, lighting, finishes, and the way the kitchen connects with nearby living areas. Bradley Brown Inc. can confirm the exact work included after reviewing the existing space and requested scope.",
      },
      {
        question: "What affects the cost of a kitchen remodel?",
        answer:
          "Cost can vary with the room's condition, the amount of layout change, cabinetry, surfaces, fixtures, materials, and any structural or system work. Request a project-specific estimate rather than relying on a generic public range.",
      },
      {
        question: "How long does a kitchen remodel take?",
        answer:
          "Timing depends on the work being performed, design decisions, material availability, and the condition of the existing kitchen. Bradley Brown Inc. can discuss timing after reviewing the proposed scope.",
      },
      {
        question: "Can walls, plumbing, or electrical layouts be changed?",
        answer:
          "Those changes may be possible, but capabilities and requirements must be confirmed for the property and scope. Discuss structural or system changes during the project review before treating them as part of the work.",
      },
    ],
  },
  bathroomRemodeling: {
    description:
      "Bathroom remodeling in Brandon and Central Mississippi: update showers, tubs, vanities, tile, storage, and fixtures. Request an estimate.",
    opening:
      "Bradley Brown Inc. remodels bathrooms for homeowners in Brandon and Central Mississippi. Projects may address showers, tubs, vanities, tile, storage, fixtures, ventilation, accessibility, and finishes, with the final scope based on the existing room and homeowner's priorities. Request an estimate to discuss the space and next step.",
    faqs: withSharedQuestions({
      process:
        "Begin with the room's current condition, the problems to solve, desired fixtures or features, accessibility needs, and finish preferences.",
      design:
        "These choices can be discussed during planning and should be matched to the room, household needs, maintenance preferences, and approved scope.",
      start:
        "Use /estimate and include the property location, photos, room dimensions if available, current problems, desired features, and any accessibility or moisture concerns.",
    }),
  },
  roomAdditions: {
    description:
      "Explore room additions in Brandon and Central Mississippi, including bedrooms, suites, offices, and sunrooms. Request an estimate.",
    opening:
      "Bradley Brown Inc. plans and builds room additions for homeowners in Brandon and Central Mississippi who need more usable space without leaving their current home. The current site presents bedrooms, primary suites, in-law suites, home offices, sunrooms, and garage conversions as possible project types. Request an estimate to review the property and scope.",
    faqs: withSharedQuestions({
      process:
        "Start with why more space is needed, where an addition might connect to the home, and what the new room must include. Property and existing-home conditions need review before the design or scope is final.",
      design:
        "The current site describes additions intended to blend with the existing architecture. Bring photos and information about the exterior materials, roof, windows, trim, flooring, and other details that should be considered.",
      start:
        "Use /estimate and share the property location, the space needed, how it will be used, preferred connection to the home, photos, and any plans or measurements already available.",
    }),
  },
  outdoorLiving: {
    description:
      "Bradley Brown Inc. creates personalized patios, decks, outdoor kitchens, and related outdoor living spaces in Central Mississippi.",
    opening:
      "Bradley Brown Inc. creates outdoor living spaces for homeowners in Brandon and Central Mississippi. Documented project types include patios, decks, and outdoor kitchens designed to expand usable space and support the way a household relaxes or entertains. Homeowners can request an estimate to discuss the property and desired scope.",
    faqs: [
      {
        question: "What outdoor living spaces does Bradley Brown Inc. build?",
        answer:
          "Bradley Brown Inc.'s documented scope includes patios, decks, and outdoor kitchens, along with broader outdoor living work. The exact structures, features, and materials should be confirmed for the current project.",
      },
      {
        question: "Can an outdoor addition be designed to fit an existing home?",
        answer:
          "That is the goal of a well-planned outdoor project. The design should consider the home's existing form, how people will move between indoor and outdoor areas, and how the new space will be used. Project-specific structural details require review.",
      },
      {
        question: "What should be planned for an outdoor kitchen?",
        answer:
          "Start with how the space will be used, the cooking and serving functions needed, seating, storage, shade or cover, and the relationship to the house. Utility, appliance, material, and code requirements should be confirmed for the specific property.",
      },
      {
        question: "Which materials work best for Central Mississippi weather?",
        answer:
          "Material selection depends on the structure, exposure, maintenance expectations, appearance, and budget. Bradley Brown Inc. can discuss appropriate options after reviewing the property and project scope.",
      },
      {
        question: "How do I request an outdoor living estimate?",
        answer:
          "Use the estimate form or contact Bradley Brown Inc. with the property location, desired project type, and a short description of how you want to use the space. The company can then confirm the appropriate next step.",
      },
    ],
  },
  barndominiums: {
    description:
      "Explore personalized barndominium planning and construction with Bradley Brown Inc. in Central Mississippi, then request a consultation.",
    opening:
      "Bradley Brown Inc. offers barndominium construction for homeowners in Brandon and Central Mississippi. A barndominium can combine residential space with a garage, workshop, or other functional areas in one personalized plan. The right design depends on the property, intended use, desired finishes, and confirmed project scope.",
    faqs: [
      {
        question: "Does Bradley Brown Inc. build barndominiums in Central Mississippi?",
        answer:
          "Yes. Barndominiums are a documented Bradley Brown Inc. service for Brandon and Central Mississippi. Share the property location and intended mix of living, garage, workshop, or storage space so the company can confirm project fit.",
      },
      {
        question: "Can a barndominium combine a home, garage, and workshop?",
        answer:
          "Yes, those uses can be planned within one barndominium concept. The exact layout, structure, access, utilities, and finish level depend on the property and the owner's priorities. The final design should be based on a project-specific review.",
      },
      {
        question: "What property factors should be considered first?",
        answer:
          "The starting questions include where the property is located, how the building will be used, what access and utilities are available, and how much residential and work space is needed. Site-specific requirements should be reviewed before work is defined.",
      },
      {
        question: "How much does a barndominium cost?",
        answer:
          "There is no universal price. Size, site conditions, structural approach, amount of finished living space, garage or workshop requirements, materials, and utilities can all affect cost. Request a project-specific estimate rather than rely on a generic range.",
      },
      {
        question: "How long does a barndominium take to build?",
        answer:
          "Timing varies with the property, design, approvals, materials, site work, and finish scope. Bradley Brown Inc. can discuss project-specific timing after reviewing the proposed work.",
      },
    ],
  },
};
