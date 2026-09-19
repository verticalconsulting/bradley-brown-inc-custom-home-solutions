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
      "Plan a personalized custom home in Brandon or Central Mississippi with Bradley Brown Inc. Explore the service, prepare your project details, and request a free estimate.",
    opening:
      "Bradley Brown Inc. builds personalized custom homes for homeowners in Brandon and Central Mississippi. The service is intended for people who want a home shaped around their property, household, space needs, and design priorities. The next step is to request an estimate and share the location, goals, and plans already available.",
    faqs: withSharedQuestions({
      process:
        "Begin with the property location, household needs, desired spaces, design direction, and planning constraints. The current site describes a path from early planning through construction and finishing details.",
      design:
        "The current site positions custom homes as being built around the homeowner's vision. Share how the household uses the home, the spaces that matter most, accessibility needs, and finish priorities.",
      start:
        "Use /estimate and include the property address or general location, whether land is already owned, the desired spaces, plans or inspiration available, and the main questions you want answered.",
    }),
  },
  kitchenRemodeling: {
    description:
      "Kitchen remodeling for Brandon and Central Mississippi homeowners, from layout and storage improvements to cabinetry, surfaces, lighting, fixtures, and finishes. Request a free estimate.",
    opening:
      "Bradley Brown Inc. remodels kitchens for homeowners in Brandon and Central Mississippi. A project can focus on improving layout, storage, work areas, gathering space, cabinetry, surfaces, lighting, fixtures, and finishes, with the final scope based on the existing kitchen and the homeowner's priorities. Request an estimate to begin.",
    faqs: withSharedQuestions({
      process:
        "Start by identifying what does not work in the current kitchen and what the finished space needs to improve. Share photos, layout concerns, inspiration, and must-have features.",
      design:
        "Layout and material choices can be discussed as part of planning, but feasibility depends on the home and approved scope. Share cabinetry, countertop, backsplash, flooring, lighting, and fixture preferences.",
      start:
        "Use /estimate and include the property location, photos of the current kitchen, the problems to solve, desired changes, and any inspiration or known constraints.",
    }),
  },
  bathroomRemodeling: {
    description:
      "Bathroom remodeling for Brandon and Central Mississippi homeowners, including showers, tubs, vanities, tile, storage, fixtures, accessibility, and finish updates. Request an estimate.",
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
      "Explore room additions and home expansions for Brandon and Central Mississippi, including bedrooms, suites, offices, sunrooms, and garage conversions. Request an estimate.",
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
      "Outdoor living projects for Brandon and Central Mississippi, including patios, porches, outdoor kitchens, decks, pergolas, and related gathering spaces. Request an estimate.",
    opening:
      "Bradley Brown Inc. creates outdoor living spaces for homeowners in Brandon and Central Mississippi. The current site presents covered patios, porches, outdoor kitchens, decks, pergolas, pavilions, pool-area features, fire features, and lighting as possible project types. Request an estimate to discuss the property, intended use, and desired scope.",
    faqs: withSharedQuestions({
      process:
        "Begin with how the space will be used, where it should connect to the home, desired shade or cover, cooking and seating needs, utilities, drainage, and maintenance preferences.",
      design:
        "The design can be discussed around the home's existing form, circulation, intended use, appearance, maintenance preferences, and project scope.",
      start:
        "Use /estimate and share the address, photos of the area, project type, how the space should be used, preferred features, and known utility or drainage concerns.",
    }),
  },
  barndominiums: {
    description:
      "Plan a barndominium with living, garage, workshop, storage, or hobby space in Brandon or Central Mississippi. Share the property and project goals to request an estimate.",
    opening:
      "Bradley Brown Inc. offers barndominium construction for homeowners in Brandon and Central Mississippi. The current site presents barndominiums as personalized structures that may combine living space with a garage, workshop, storage, or hobby space. Request an estimate to discuss the land, intended use, space needs, and desired finish level.",
    faqs: withSharedQuestions({
      process:
        "Start with the land, intended uses, desired mix of living and work space, access, utilities, layout, and finish priorities. The property and proposed scope need review before the building approach is finalized.",
      design:
        "The current site presents a combination of home, shop, garage, storage, and hobby space as a possible barndominium concept. The exact layout and feasibility depend on the property, intended use, structure, utilities, and approved scope.",
      start:
        "Use /estimate and include the property location, whether land is already owned, intended living and work uses, approximate space needs, finish priorities, and any plans or site information available.",
    }),
  },
};
