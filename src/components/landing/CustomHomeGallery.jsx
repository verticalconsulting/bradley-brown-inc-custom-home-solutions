import React from "react";

const projects = [
  {
    img: "https://images.unsplash.com/photo-1605229659903-5e5c9c9c9c9c?w=800&q=80",
    alt: "Custom modern farmhouse home built by Bradley Brown Inc. in Brandon, MS",
    caption: "2,800 sq ft modern farmhouse with board-and-batten siding and a wraparound porch. Built in the Crossgates neighborhood of Brandon, MS.",
  },
  {
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    alt: "Custom traditional brick home built by Bradley Brown Inc. in Brandon, MS",
    caption: "3,400 sq ft traditional brick home with a screened back porch. Full brick exterior with gable accents, located in the Lake Serene subdivision near Brandon.",
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    alt: "Custom craftsman-style home built by Bradley Brown Inc. in Flowood, MS",
    caption: "2,500 sq ft craftsman-style home with tapered columns and stone skirting. Completed in Flowood, just across the reservoir from Brandon, MS.",
  },
  {
    img: "https://images.unsplash.com/photo-1484154218962-a197022b58a8?w=800&q=80",
    alt: "Custom French Country home built by Bradley Brown Inc. in Madison, MS",
    caption: "4,100 sq ft French Country estate with steep-pitched rooflines and arched entry. Built on a two-acre lot in Madison, MS, within Rankin County's neighboring Madison County.",
  },
  {
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    alt: "Custom ranch-style home built by Bradley Brown Inc. in Pearl, MS",
    caption: "2,200 sq ft single-story ranch with an open-concept kitchen and vaulted ceilings. Completed in Pearl, MS, just south of Brandon in Rankin County.",
  },
  {
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    alt: "Custom contemporary home built by Bradley Brown Inc. in Brandon, MS",
    caption: "3,000 sq ft contemporary home with metal roof accents and floor-to-ceiling windows. Built in the Brookwood subdivision of Brandon, MS.",
  },
  {
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    alt: "Custom Southern plantation-style home built by Bradley Brown Inc. in Richland, MS",
    caption: "3,800 sq ft Southern-style home with full-width front porch and paired columns. Constructed on a wooded lot in Richland, MS, near the Rankin County line.",
  },
  {
    img: "https://images.unsplash.com/photo-1572122381173-40efe2c5c9c2?w=800&q=80",
    alt: "Custom two-story colonial home built by Bradley Brown Inc. in Jackson, MS",
    caption: "2,900 sq ft two-story colonial with side-loading garage and dormer windows. Built in a Northeast Jackson neighborhood within commuting distance of Brandon.",
  },
  {
    img: "https://images.unsplash.com/photo-1592595896616-3716ac0c4f6d?w=800&q=80",
    alt: "Custom barndominium-style home built by Bradley Brown Inc. in Brandon, MS",
    caption: "2,600 sq ft barndominium-style home with metal siding and a large shop addition. Built on acreage outside Brandon city limits in Rankin County, MS.",
  },
];

export default function CustomHomeGallery() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1E2D3D]">Custom Homes We've Built in Brandon &amp; Rankin County</h2>
      <p className="text-slate-600 leading-relaxed">
        A selection of custom homes our team has designed and built across Brandon, Flowood, Pearl, Richland, and the greater Rankin County area.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <figure key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
            <img src={p.img} alt={p.alt} className="w-full h-56 object-cover" loading="lazy" />
            <figcaption className="p-4 text-sm text-slate-600 leading-relaxed">{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}