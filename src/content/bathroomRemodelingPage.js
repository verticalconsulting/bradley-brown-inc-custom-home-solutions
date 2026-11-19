// Content for /services/bathroom-remodeling.
// Every factual statement here is limited to what the company already publishes on its own
// site: the service-page scope, the live portfolio records (https://bradleybrowninc.com/portfolio)
// and the /estimate message form. Nothing here states a price, timeline, guarantee, license,
// permit practice, years in business, project count or customer quote.

const ESTIMATE_PATH = "/estimate";
const PORTFOLIO_URL = "https://bradleybrowninc.com/portfolio";

export const bathroomRemodelingPage = {
  title: "Bathroom Remodeling in Brandon, MS | Bradley Brown Inc",
  description:
    "Planning a bathroom remodel in Brandon, MS? Discuss your space, project priorities, and scope with Bradley Brown Inc., then request a bathroom-remodel estimate.",
  canonical: "https://bradleybrowninc.com/services/bathroom-remodeling",
  h1: "Bathroom Remodeling in Brandon, MS",
  subtitle:
    "Update showers, tubs, vanities, tile, storage, and fixtures in your Brandon or Central Mississippi home, planned around the bathroom you have and how your household uses it.",
  opening:
    "Bradley Brown Inc. remodels bathrooms for homeowners in Brandon, MS and Central Mississippi. A bathroom project can include showers and tubs, vanities, tile, storage, fixtures, ventilation, accessibility changes, and finishes. The final scope depends on your existing room and priorities, so the best next step is to request a bathroom-remodel estimate and describe what you want to change.",
  openingCta: { to: ESTIMATE_PATH, label: "Request a Bathroom-Remodel Estimate" },
  sections: [
    {
      heading: "What a bathroom remodel can include",
      paragraphs: [
        "Bradley Brown Inc.'s bathroom remodeling service covers the main parts of a bathroom: showers and tubs (including walk-in showers and tub-to-shower conversions), vanities and storage, tile, fixtures, ventilation, accessibility features, and finishes.",
        "Which of these make sense for your home depends on the existing room, including its layout, its condition, and any moisture concerns. Scope is confirmed for each project rather than assumed, and a layout change depends on what is behind the walls and under the floor.",
      ],
    },
    {
      heading: "Recent bathroom work in the portfolio",
      paragraphs: [
        "Two projects listed in our portfolio show bathroom work in Central Mississippi. The Pelahatchie Master Bath Remodel (400 sq ft, 2024) included a new walk-in shower and a freestanding tub. The Custom Home Remodel and Addition in Brandon, MS (3,750 sq ft, 2024) was a whole-house project in which the kitchen and bathrooms were completely gutted, with walk-in showers among the finished features.",
        "Every home is different. These are examples of past work, not fixed packages or prices.",
      ],
      links: [{ to: "/portfolio", label: "See the full portfolio" }],
    },
    {
      heading: "What to have ready before you request an estimate",
      paragraphs: [
        "The estimate page has a message form with a Bathroom Renovation project type, a project address field, and a space to describe your project. Choose Bathroom Renovation, then describe the room, what you would like to change, and any problems you have noticed, such as leaks, damaged flooring, or poor ventilation.",
        "It also helps to have photos of the current bathroom and rough dimensions on hand when you talk through the project. If you would rather talk first, call (844) 351-4154.",
      ],
      links: [{ to: ESTIMATE_PATH, label: "Start Your Bathroom Estimate Request" }],
    },
    {
      heading: "Questions to settle before any bathroom remodel starts",
      paragraphs: [
        "Whoever you hire, get clear on these before work begins: what the scope includes and excludes, what happens if hidden damage turns up once walls or floors are opened, who is responsible for permits and inspections, which fixtures and finishes you are choosing and who orders them, and how the schedule will be set and communicated.",
        "These are worth raising during your estimate conversation so the plan matches your expectations.",
      ],
    },
  ],
  projects: [
    {
      title: "Pelahatchie Master Bath Remodel",
      location: "Pelahatchie, MS",
      year: 2024,
      squareFeet: 400,
      description: "New walk-in shower and freestanding tub.",
      source: PORTFOLIO_URL,
    },
    {
      title: "Custom Home Remodel and Addition",
      location: "Brandon, MS",
      year: 2024,
      squareFeet: 3750,
      description:
        "Whole-house remodel and addition in which the kitchen and bathrooms were completely gutted; walk-in showers are among the finished features.",
      source: PORTFOLIO_URL,
    },
  ],
  images: [
    {
      url: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/466141bd-cb8b-493a-6dce-ce29737aa600/medium",
      alt: "Master bathroom remodel by Bradley Brown Inc. in Pelahatchie, MS, with a glass-enclosed tile walk-in shower, wood vanity, and freestanding tub",
      caption: "Pelahatchie Master Bath Remodel (400 sq ft, 2024): new walk-in shower and freestanding tub",
    },
    {
      url: "https://media.base44.com/images/public/699c758479c46f0580553750/d343a428a_brad-portfolio-bathj-customhome.jpeg",
      alt: "Remodeled bathroom with a glass-enclosed tile shower from the Bradley Brown Inc. custom home remodel and addition in Brandon, MS",
      caption: "Custom Home Remodel and Addition, Brandon, MS (3,750 sq ft, 2024): whole-house project that included the bathrooms",
    },
  ],
  faqs: [
    {
      question: "What can a bathroom remodel with Bradley Brown Inc. include?",
      answer:
        "The service covers showers and tubs (including walk-in showers and tub-to-shower conversions), vanities, tile, storage, fixtures, ventilation, accessibility features, and finishes. The final scope depends on your existing room and priorities.",
    },
    {
      question: "Can the layout of my bathroom change?",
      answer:
        "Sometimes, but it depends on the existing room and on what is behind the walls and under the floor. A layout change should be reviewed for your specific bathroom before anyone promises a result.",
    },
    {
      question: "How much does a bathroom remodel cost in Brandon, MS?",
      answer:
        "Cost depends on the size of the room, the scope of work, the condition of what is behind the walls, and the fixtures, tile, and finishes you choose. This page does not list a standard price, so request an estimate based on your actual bathroom.",
    },
    {
      question: "What should I include when I request an estimate?",
      answer:
        "Use the estimate page's message form: choose Bathroom Renovation, add your project address, and describe the room and what you would like to change. Photos and rough dimensions are helpful to have ready, and you can also call (844) 351-4154.",
    },
    {
      question: "Where does Bradley Brown Inc. do bathroom remodeling?",
      answer:
        "Bradley Brown Inc. is based in Brandon, MS, and presents Central Mississippi as its service area. Portfolio bathroom work includes projects in Brandon and Pelahatchie. Availability can vary by location and scope, so include your project address in your request.",
    },
  ],
  relatedLinks: [
    { to: "/protips/small-bathroom-ideas", label: "Small Bathroom Remodeling Ideas" },
    { to: "/protips/renovation-loans", label: "Renovation Loan Options" },
    { to: "/bathroom-remodeling-brandon-ms", label: "Brandon bathroom-remodeling page" },
  ],
  ctaBody:
    "Describe your bathroom and what you would like to change, then request an estimate. Prefer to talk first? Call and we can go over the project.",
};
