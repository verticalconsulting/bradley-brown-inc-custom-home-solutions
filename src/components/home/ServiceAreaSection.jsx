import React from "react";
import { MapPin, Phone, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const cities = [
"Brandon", "Flowood", "Pearl", "Richland",
"Jackson", "Madison", "Ridgeland", "Clinton",
"Byram", "Rankin County", "Hinds County", "Madison County"];


export default function ServiceAreaSection() {
  return (
    <section className="py-14 md:py-20 bg-[#F5F2ED]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">Where We Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2D3D]">Serving Brandon and Rankin County M

          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">
            Locally owned and operated. We build and remodel homes within a 50-mile radius of Brandon — no travel fees, no out-of-state crews.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
          {cities.map((city) =>
          <div key={city} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
              {city}, MS
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="tel:+18443514154"
            onClick={() => {
              if (typeof window.gtag === 'function') {
                window.gtag('event', 'conversion', {
                  send_to: 'AW-17864041271/21TJCO2Bj5ccELfGnsZC',
                  value: 30,
                  currency: 'USD'
                });
              }
            }}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors shadow-md">
            
            <Phone className="w-4 h-4" /> Call (844) 351-4154
          </a>
          <Link
            to={createPageUrl("Contact")}
            className="flex items-center gap-1.5 text-sky-600 font-semibold text-sm hover:underline">
            
            View Service Area Map <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>);

}