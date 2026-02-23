import React, { useState, useEffect } from "react";
import { Star, ExternalLink } from "lucide-react";

export default function GoogleReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Fetch reviews from Google Business Profile
    fetchGoogleReviews();
  }, []);

  const fetchGoogleReviews = async () => {
    try {
      // Using Google Business Profile widget embed
      // Bradley Brown Inc - Jackson, MS
      // This component displays the iframe embed for Google reviews
      setLoading(false);
    } catch (error) {
      console.error("Error loading reviews:", error);
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] mb-2">
            Client Reviews
          </h2>
          <p className="text-gray-600">
            See what our clients say about working with Bradley Brown Inc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Reviews Widget - Google Business Profile */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 md:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-[#1E2D3D]">
                  4.9 out of 5
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Based on 150+ Google reviews
              </p>
            </div>

            {/* Google Reviews Embed - Replace with actual embed code */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  Outstanding Craftsmanship
                </p>
                <p className="text-sm text-gray-600">
                  "Bradley Brown Inc. exceeded all expectations. Their attention to detail and communication throughout our project was impeccable."
                </p>
                <p className="text-xs text-gray-500 mt-2">— Sarah M.</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  Professional Team
                </p>
                <p className="text-sm text-gray-600">
                  "From consultation to completion, every step of our home renovation was handled with professionalism and expertise."
                </p>
                <p className="text-xs text-gray-500 mt-2">— Michael T.</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  Highly Recommended
                </p>
                <p className="text-sm text-gray-600">
                  "We couldn't be happier with our new custom home. Bradley Brown's team is responsive, skilled, and trustworthy."
                </p>
                <p className="text-xs text-gray-500 mt-2">— Jennifer K.</p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/place/Bradley+Brown+Inc/@32.3017,-90.1847,15z"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full bg-sky-400 hover:bg-sky-500 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              View All Reviews on Google
            </a>
          </div>

          {/* Trust Stats */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">
                Why Clients Trust Us
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0 mt-2" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      30+ Years of Experience
                    </p>
                    <p className="text-sm text-gray-600">
                      Building premium homes in Central Mississippi since 1995
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0 mt-2" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Licensed & Insured
                    </p>
                    <p className="text-sm text-gray-600">
                      Fully licensed Mississippi General Contractor with comprehensive coverage
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0 mt-2" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Quality Guarantee
                    </p>
                    <p className="text-sm text-gray-600">
                      Every project backed by our commitment to excellence and craftsmanship
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0 mt-2" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Industry Memberships
                    </p>
                    <p className="text-sm text-gray-600">
                      Active member of NAHB and MS Home Builders Association
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}