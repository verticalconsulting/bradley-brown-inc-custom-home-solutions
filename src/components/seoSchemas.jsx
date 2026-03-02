const SITE_URL = "https://custom-home-builder.bradleybrowninc.com";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "name": "Bradley Brown Inc.",
  "alternateName": "Bradley Brown Custom Homes",
  "description": "Bradley Brown Inc. is Central Mississippi's premier custom home builder, offering custom home construction, renovations, room additions, and outdoor living spaces since 1995.",
  "url": SITE_URL,
  "telephone": "+16019541306",
  "email": "bradleybrowninc@gmail.com",
  "foundingDate": "1995",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Brandon",
    "addressRegion": "MS",
    "postalCode": "39042",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 32.2729,
    "longitude": -89.9923
  },
  "sameAs": [
    "https://www.facebook.com/BradleyBrownInc",
    "https://www.tiktok.com/@bb859876",
    "https://www.bbb.org"
  ],
  "areaServed": [
    { "@type": "City", "name": "Jackson, Mississippi" },
    { "@type": "City", "name": "Madison, Mississippi" },
    { "@type": "City", "name": "Ridgeland, Mississippi" },
    { "@type": "City", "name": "Brandon, Mississippi" },
    { "@type": "City", "name": "Flowood, Mississippi" },
    { "@type": "City", "name": "Pearl, Mississippi" },
    { "@type": "City", "name": "Clinton, Mississippi" }
  ],
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "09:00", "closes": "15:00" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87",
    "bestRating": "5"
  }
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Construction Services – Bradley Brown Inc.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Custom Home Building",
        "description": "Full-service custom home construction in Central Mississippi, designed and built to your exact specifications.",
        "provider": { "@type": "LocalBusiness", "name": "Bradley Brown Inc." },
        "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "250000" }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Home Renovation & Remodeling",
        "description": "Expert kitchen, bathroom, and full home renovations for Central Mississippi homeowners.",
        "provider": { "@type": "LocalBusiness", "name": "Bradley Brown Inc." },
        "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "25000" }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Room Additions",
        "description": "Seamless home additions and room expansions that match your existing home's style.",
        "provider": { "@type": "LocalBusiness", "name": "Bradley Brown Inc." },
        "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "75000" }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Outdoor Living Spaces",
        "description": "Custom patios, outdoor kitchens, pergolas, and pool surrounds for Mississippi homeowners.",
        "provider": { "@type": "LocalBusiness", "name": "Bradley Brown Inc." },
        "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "15000" }
      }
    }
  ]
};