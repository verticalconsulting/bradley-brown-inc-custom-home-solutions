import React from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronRight, Phone, CheckCircle, Home, Plus, Star } from "lucide-react";

const additions = [
{
  title: "Master Suite Addition",
  description: "Add a private retreat to your home with a spacious master bedroom, walk-in closet, and luxury en-suite bathroom. One of the highest-ROI additions you can make.",
  roi: "~60–70% ROI",
  cost: "$80,000 – $150,000+",
  image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  features: ["Private ensuite bathroom", "Walk-in closet", "Tray ceilings & premium finishes", "Seamlessly matches existing home"]
},
{
  title: "Sunroom or Four-Season Room",
  description: "Extend your living space without going fully outdoors. A sunroom or enclosed porch is perfect for Mississippi's climate — enjoy natural light year-round.",
  roi: "~50–60% ROI",
  cost: "$30,000 – $75,000",
  image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  features: ["Natural light & views", "Climate controlled", "Multi-season use", "Great for entertaining"]
},
{
  title: "In-Law Suite / ADU",
  description: "A separate living space for aging parents, adult children, or rental income. Increasingly popular across Brandon and Central Mississippi.",
  roi: "~55–65% ROI",
  cost: "$60,000 – $120,000",
  image: "https://images.unsplash.com/photo-1560185009-dddeb820b50c?w=800&q=80",
  features: ["Private entrance", "Full kitchen & bath", "Rental income potential", "Multi-generational living"]
},
{
  title: "Family Room or Great Room Expansion",
  description: "Open up your main living area for modern open-concept living. Knock down walls and expand your family room to transform how you live and entertain.",
  roi: "~50–55% ROI",
  cost: "$40,000 – $90,000",
  image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  features: ["Open-concept design", "Custom built-ins", "New flooring & lighting", "Expanded kitchen access"]
},
{
  title: "Garage Conversion to Living Space",
  description: "Transform an underutilized garage into a home office, gym, playroom, or guest suite without the cost of a full addition.",
  roi: "~60–75% ROI",
  cost: "$20,000 – $50,000",
  image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=800&q=80",
  features: ["Most cost-effective addition", "Fast project timeline", "No new foundation needed", "Versatile use — office, gym, suite"]
},
{
  title: "Covered Patio & Outdoor Kitchen Addition",
  description: "Mississippi summers are made for outdoor living. A covered patio with an outdoor kitchen is one of the most-requested additions in Brandon, MS.",
  roi: "~55–70% ROI",
  cost: "$25,000 – $70,000",
  image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
  features: ["Covered outdoor dining", "Built-in grill & countertops", "Year-round entertaining", "Increases perceived home value"]
}];


const additionsSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Home Addition Ideas for Brandon, MS Homeowners — 6 Best Expansions",
  "description": "Discover the best home addition ideas for Brandon, MS homeowners. Compare costs, ROI, and timelines for master suites, sunrooms, in-law suites, garage conversions and more.",
  "author": { "@type": "Organization", "name": "Bradley Brown Inc." },
  "publisher": { "@type": "Organization", "name": "Bradley Brown Inc.", "url": "https://custom-home-builder.bradleybrowninc.com" }
};

export default function HomeAdditionIdeas() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Home Addition Ideas for Brandon, MS | Room Additions & Expansions"
        description="Explore the best home addition ideas for Brandon, MS homeowners. Master suites, sunrooms, in-law suites, garage conversions & outdoor kitchens. Get a free estimate from Bradley Brown Inc."
        schema={additionsSchema}
        canonical="https://bradleybrowninc.com/HomeAdditionIdeas" />
      

      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Brandon, MS & Central Mississippi</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Home Addition Ideas</h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            The 6 best room additions and home expansions for Mississippi homeowners — with real cost ranges and ROI estimates.
          </p>
          <a href="tel:+16019541306" className="mt-6 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-colors">
            <Phone className="w-4 h-4" /> Free Addition Estimate: (601) 954-1306
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        <div className="grid grid-cols-1 gap-10">
          {additions.map((addition, i) =>
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <img src="https://media.base44.com/images/public/699c758479c46f0580553750/234f1870c_Cozy_rustic_patio_at_twilight.png"

              alt={`${addition.title} in Brandon MS by Bradley Brown Inc`} className="w-full h-56 md:h-full object-cover"

              loading="lazy"
              width="800"
              height="560" />
              
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-sky-50 text-sky-600 border border-sky-200 px-2 py-0.5 rounded-full font-medium">{addition.roi}</span>
                    <span className="text-xs text-slate-400">{addition.cost}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#1E2D3D] mb-3">{addition.title}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{addition.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {addition.features.map((f) =>
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                      </li>
                  )}
                  </ul>
                  <Link to={createPageUrl("QuoteAssistant")} className="inline-flex items-center gap-1.5 bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-600 transition-colors">
                    Get Estimate <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-[#1E2D3D] mb-1">Pro Tip: Choose Additions That Match Your Neighborhood</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In Brandon, MS and surrounding areas, home values are influenced by neighborhood comps. We always advise clients to choose additions that bring their home up to — not far beyond — surrounding home values to maximize ROI. Our team will advise you on the best investment for your specific street and neighborhood.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={createPageUrl("Services")} className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-50 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" /> All Services
          </Link>
          <Link to={createPageUrl("Portfolio")} className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-50 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" /> View Our Portfolio
          </Link>
          <Link to={createPageUrl("RenovationLoans")} className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-50 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" /> Renovation Financing Options
          </Link>
        </div>
      </div>

      <div className="bg-[#1E2D3D] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Add Space to Your Home?</h2>
          <p className="text-slate-300 mb-8">Bradley Brown Inc. has built additions across Brandon, Flowood, Pearl, Madison & Jackson since 1995. Let's talk about your project.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("QuoteAssistant")} className="inline-flex items-center justify-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
              Get Free Estimate <ChevronRight className="w-4 h-4" />
            </Link>
            <a href="tel:+16019541306" className="inline-flex items-center justify-center gap-2 border border-slate-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> Call (601) 954-1306
            </a>
          </div>
        </div>
      </div>
    </div>);

}