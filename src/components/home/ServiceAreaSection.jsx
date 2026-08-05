import React from "react";
import { MapPin, Phone, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const cities = [
"Brandon", "Flowood", "Richland", "Pearl",
"Florence", "Pelahatchie", "Ridgeland", "Madison",
"Jackson", "Clinton", "Raymond", "Rankin County"];


export default function ServiceAreaSection() {
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="font-semibold text-sm uppercase tracking-wider mb-2 text-[hsl(var(--ring))]">WHERE WE WORK</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--input))]">Home Remodeling Services Across Brandon, MS and Rankin County

          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-foreground/70 leading-relaxed">
            Bradley Brown Inc. has been based in Brandon, Mississippi since 1995.
            Our crews regularly work throughout Brandon, Flowood, Richland, Pearl,
            Florence, Pelahatchie, and Reservoir-area neighborhoods, bringing
            decades of experience with local permitting, soil conditions, and
            trusted trade partners. We also serve Madison County communities like
            Ridgeland and Madison, along with Hinds County neighborhoods in
            Jackson, Clinton, and Raymond, for larger custom builds and historic
            restoration projects. Whether you're planning a kitchen remodel,
            bathroom update, room addition, or a brand-new custom home, our team
            understands the building requirements specific to Rankin County and
            the surrounding area. As the go-to choice for{" "}
            <Link to="/remodeling-brandon-ms" className="text-primary hover:underline font-medium">
              Brandon remodeling
            </Link>{" "}
            and a trusted{" "}
            <Link to="/custom-home-builder-brandon-ms" className="text-primary hover:underline font-medium">
              custom home builder in Brandon
            </Link>
            , we back every project with licensed, insured craftsmanship. We also offer{" "}
            <Link to="/remodeling-ms" className="text-primary hover:underline font-medium">
              remodeling services across Mississippi
            </Link>{" "}
            — from custom homes to emergency repairs. Call{" "}
            <a href="tel:+18443514154" className="text-primary hover:underline font-medium">
              (844) 351-4154
            </a>{" "}
            or get your{" "}
            <Link to="/estimate" className="text-primary hover:underline font-medium">
              free estimate online
            </Link>{" "}
            to confirm we cover your address.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
          {cities.map((city) =>
          <div key={city} className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
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
            className="flex items-center gap-2 hover:opacity-90 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors shadow-md bg-primary">
            
            <Phone className="w-4 h-4" /> Call (844) 351-4154
          </a>
          <Link
            to="/estimate"
            className="flex items-center gap-2 bg-primary hover:opacity-90 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors shadow-md">
            
            Get My Free Estimate <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>);

}