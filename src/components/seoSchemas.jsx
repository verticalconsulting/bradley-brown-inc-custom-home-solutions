const SITE_URL = "https://bradleybrowninc.com";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Bradley Brown Inc.",
  "alternateName": "Bradley Brown Custom Homes",
  "description": "Bradley Brown Inc. is the Brandon and Rankin County area's premier custom home builder, offering custom home construction, renovations, room additions, and outdoor living spaces since 1995.",
  "url": SITE_URL,
  "telephone": "+18443514154",
  "email": "bradleybrowninc@gmail.com",
  "foundingDate": "1995",
  "founder": { "@type": "Person", "name": "Bradley Brown" },
  "image": [
    "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/cf31ad9a-e08a-4158-ddd3-ca127b735b00/large",
    "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/932d74d8-4f05-4b52-fa85-6903e1e42b00/large",
    "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/7b34280a-4da6-4735-a990-074941b06e00/large"
  ],
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "104 Tiffany Drive",
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
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Mississippi Residential Builder License #08290",
      "credentialCategory": "license",
      "url": "https://www.msboc.us",
      "recognizedBy": { "@type": "Organization", "name": "Mississippi State Board of Contractors", "url": "https://www.msboc.us" }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "BBB Accredited Business",
      "credentialCategory": "accreditation",
      "url": "https://www.bbb.org/us/ms/brandon/profile/remodeling/bradley-brown-inc-0523-235908473"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/BradleyBrownInc",
    "https://www.tiktok.com/@bb859876",
    "https://www.bbb.org",
    "https://g.co/kgs/bradleybrowninc"
  ],
  "areaServed": [
    { "@type": "City", "name": "Brandon, Mississippi" },
    { "@type": "City", "name": "Madison, Mississippi" },
    { "@type": "City", "name": "Ridgeland, Mississippi" },
    { "@type": "City", "name": "Flowood, Mississippi" },
    { "@type": "City", "name": "Pearl, Mississippi" },
    { "@type": "City", "name": "Jackson, Mississippi" },
    { "@type": "City", "name": "Clinton, Mississippi" },
    { "@type": "City", "name": "Richland, Mississippi" },
    { "@type": "City", "name": "Florence, Mississippi" },
    { "@type": "AdministrativeArea", "name": "Rankin County, Mississippi" },
    { "@type": "AdministrativeArea", "name": "Hinds County, Mississippi" },
    { "@type": "AdministrativeArea", "name": "Madison County, Mississippi" }
  ],
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "09:00", "closes": "15:00" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": 87,
    "bestRating": "5"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Home Remodeling Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kitchen Remodeling in Brandon, MS" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bathroom Renovation in Brandon, MS" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Room Additions in Brandon, MS" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Home Building in the Brandon and Rankin County Area" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Outdoor Living Spaces & Decks" } }
    ]
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
        "description": "Full-service custom home construction in the Brandon and Rankin County area, designed and built to your exact specifications.",
        "provider": { "@type": "HomeAndConstructionBusiness", "name": "Bradley Brown Inc." },
        "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "250000" }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Home Renovation & Remodeling",
        "description": "Expert kitchen, bathroom, and full home renovations for Brandon and Rankin County area homeowners.",
        "provider": { "@type": "HomeAndConstructionBusiness", "name": "Bradley Brown Inc." },
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
        "provider": { "@type": "HomeAndConstructionBusiness", "name": "Bradley Brown Inc." },
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
        "provider": { "@type": "HomeAndConstructionBusiness", "name": "Bradley Brown Inc." },
        "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "15000" }
      }
    }
  ]
};