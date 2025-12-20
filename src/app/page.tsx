import React from "react";
import type { Metadata } from "next";
import { s3assets, websiteURL, phone, contact, address } from "@/constants";
import Script from "next/script";

import Home from "@/features/home/components/Home";

export const metadata: Metadata = {
  title:
    "Porta Potty Rentals Dover DE | Same-Day Delivery | FlushJohn | Serving Nationwide",
  description:
    "Porta potty rentals in Dover, DE and nationwide. Same-day delivery for events, construction sites, and weddings. Licensed & insured. 24/7 service. Get your instant quote today!",
  keywords:
    "porta potty rentals, portable toilet rental service, construction site porta potty, wedding porta potty rental, event sanitation services, ADA compliant portable toilets, luxury restroom trailer rental, emergency porta potty delivery, construction site sanitation, outdoor event portable toilets, festival porta potty rental, corporate event sanitation, sports event porta potty, long-term porta potty rental, same-day porta potty delivery, affordable portable toilet rental, professional porta potty service, construction porta potty rental, event porta potty rental, portable restroom rental, construction site toilets, event portable toilets, wedding portable toilets, festival portable toilets, corporate event portable toilets, sports portable toilets, emergency portable toilets, luxury portable toilets, ADA portable toilets, construction portable toilets, event portable toilets, wedding portable toilets, festival portable toilets, corporate portable toilets, sports portable toilets, emergency portable toilets, luxury portable toilets, ADA portable toilets",
  openGraph: {
    title: "FlushJohn - Porta Potty Rentals",
    description:
      "Providing high-quality porta potty rental solutions for events of all sizes. Clean, affordable, and convenient.",
    url: websiteURL,
    type: "website",
    siteName: "FlushJohn",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        height: 630,
        width: 1200,
        alt: "FlushJohn Porta Potty Rentals",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlushJohn - Porta Potty Rentals",
    description:
      "Providing high-quality porta potty rental solutions for events of all sizes. Clean, affordable, and convenient.",
    images: [`${s3assets}/og-image-flushjonn-web.png`],
  },
  alternates: {
    canonical: websiteURL,
  },
};

// ServiceAreaBusiness schema - better for delivery/service businesses without walk-in location
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ServiceAreaBusiness", // Changed from LocalBusiness - better for service-area businesses
  name: "FlushJohn",
  url: websiteURL,
  logo: `${s3assets}/og-image-flushjonn-web.png`,
  description:
    "FlushJohn offers affordable and reliable porta potty rental services for all types of events across the United States.",
  image: `${s3assets}/og-image-flushjonn-web.png`,
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: address.street,
    addressLocality: address.city,
    addressRegion: address.state,
    postalCode: address.zip,
    addressCountry: address.country,
  },
  telephone: phone.phone_number,
  email: contact.email,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: phone.phone_number,
    contactType: "customer service",
    availableLanguage: ["English"],
    areaServed: "US",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "07:00",
      closes: "19:00",
    },
  },
  // ServiceAreaBusiness requires areaServed array with specific locations
  areaServed: [
    {
      "@type": "City",
      name: "Dover",
      containedIn: {
        "@type": "State",
        name: "Delaware",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Houston",
      containedIn: {
        "@type": "State",
        name: "Texas",
      },
    },
    {
      "@type": "City",
      name: "Dallas",
      containedIn: {
        "@type": "State",
        name: "Texas",
      },
    },
    {
      "@type": "City",
      name: "Los Angeles",
      containedIn: {
        "@type": "State",
        name: "California",
      },
    },
    // Note: Add all other cities you serve here for better local SEO
    // For now, including major ones. Full list should be added based on actual service areas.
    {
      "@type": "Country",
      name: "United States", // Fallback for nationwide coverage
    },
  ],
  serviceType: "Porta Potty Rental Services",
  priceRange: "$$",
  paymentAccepted: "Cash, Credit Card, Check",
  currenciesAccepted: "USD",
  knowsAbout: [
    "Porta Potty Rentals",
    "Portable Toilet Services",
    "Event Sanitation",
    "Construction Site Services",
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FlushJohn Porta Potty Rentals",
  description:
    "Professional porta potty rental services for events and construction sites across the United States",
  provider: {
    "@type": "Organization",
    name: "FlushJohn",
    url: websiteURL,
    logo: `${s3assets}/og-image-flushjonn-web.png`,
  },
  serviceType: "Porta Potty Rental Services",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${websiteURL}/quote`,
    serviceName: "Online Quote Request",
  },
  offers: {
    "@type": "Offer",
    description: "Affordable porta potty rental services",
    priceCurrency: "USD",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FlushJohn",
  url: websiteURL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${websiteURL}/quote?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What areas do you serve for porta potty rentals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide porta potty rentals across multiple locations including Houston, Dallas, Austin, San Antonio, Fort Worth, Miami, Orlando, Tampa, Jacksonville, Fort Lauderdale, Los Angeles, San Diego, Sacramento, San Jose, Fresno, Atlanta, Savannah, Augusta, Macon, Columbus, Chicago, Springfield, Peoria, Rockford, and Naperville.",
      },
    },
    {
      "@type": "Question",
      name: "How do I request a porta potty rental quote?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can easily request a quote by filling out the form on our website or calling us directly. Our team will get back to you promptly with a customized solution for your event or construction site.",
      },
    },
    {
      "@type": "Question",
      name: "What types of portable toilets do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a variety of portable toilet options including standard porta potty units, deluxe flushing porta potties, ADA compliant portable toilets, luxury restroom trailers, construction porta potties, and hand wash stations to suit different event and project needs.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide same-day porta potty delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer same-day delivery for urgent porta potty rental needs when inventory is available. Contact us to check availability in your area for emergency portable toilet delivery.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in your porta potty rental service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our portable toilet rental service includes delivery, setup, regular cleaning and maintenance, toilet paper and hand sanitizer restocking, and pickup at the end of your rental period. We handle all aspects of porta potty management.",
      },
    },
    {
      "@type": "Question",
      name: "How many porta potties do I need for my event?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The number of porta potties needed depends on the event size, duration, and type. Generally, we recommend 1 porta potty per 50-100 guests for events under 4 hours, and 1 per 25-50 guests for longer events. Contact us for a detailed porta potty calculation.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer ADA compliant porta potty rentals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide ADA compliant portable toilets that meet accessibility requirements for construction sites and events. These units are wheelchair accessible and comply with ADA regulations.",
      },
    },
    {
      "@type": "Question",
      name: "What are your porta potty rental prices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our porta potty rental prices vary based on location, rental duration, and unit type. We offer competitive pricing for standard porta potties, deluxe units, and luxury restroom trailers. Contact us for a free quote.",
      },
    },
    {
      "@type": "Question",
      name: "How far in advance should I book porta potty rentals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We recommend booking porta potty rentals at least 1-2 weeks in advance for events and construction projects. However, we can often accommodate last-minute requests depending on availability in your area.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide porta potty rentals for construction sites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we specialize in construction site porta potty rentals with durable units designed for long-term use. We provide regular maintenance, cleaning, and restocking services for construction porta potty rentals.",
      },
    },
  ],
};

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "Organization",
    name: "FlushJohn",
    image: `${websiteURL}/logo.png`,
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "120",
    },
  },
  author: {
    "@type": "Person",
    name: "Customer Reviews",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "4.8",
  },
  name: "Excellent Porta Potty Rental Service",
  reviewBody:
    "FlushJohn provides top-notch service and clean, reliable porta potties. Highly recommended for any event or construction site!",
  publisher: {
    "@type": "Organization",
    name: "FlushJohn",
  },
};

const HomePage = () => {
  return (
    <>
      {/* Existing Structured Data - Load only essential JSON-LD */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Home />
    </>
  );
};

export default HomePage;
