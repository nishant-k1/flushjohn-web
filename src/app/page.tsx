import React from "react";
import type { Metadata } from "next";
import {
  s3assets,
  websiteURL,
  phone,
  contact,
  address,
  socialMedia,
} from "@/constants";
import Script from "next/script";

import Home from "@/features/home/components/Home";

export const metadata: Metadata = {
  title:
    "Porta Potty Rentals | Same-Day Delivery | Serving 25+ Cities Nationwide | FlushJohn",
  description:
    "Professional porta potty rentals in Dover DE, Houston TX, Dallas TX, Los Angeles CA, and 22+ more cities. Same-day delivery, competitive pricing, licensed & insured. Serving 25+ cities across TX, FL, CA, GA, IL, and DE. Get your free quote today!",
  keywords:
    "porta potty rentals, portable toilet rental service, construction site porta potty, wedding porta potty rental, event sanitation services, ADA compliant portable toilets, luxury restroom trailer rental, emergency porta potty delivery, construction site sanitation, outdoor event portable toilets, festival porta potty rental, corporate event sanitation, sports event porta potty, long-term porta potty rental, same-day porta potty delivery, affordable portable toilet rental, professional porta potty service, construction porta potty rental, event porta potty rental, portable restroom rental, construction site toilets, event portable toilets, wedding portable toilets, festival portable toilets, corporate event portable toilets, sports portable toilets, emergency portable toilets, luxury portable toilets, ADA portable toilets, construction portable toilets, event portable toilets, wedding portable toilets, festival portable toilets, corporate portable toilets, sports portable toilets, emergency portable toilets, luxury portable toilets, ADA portable toilets",
  openGraph: {
    title:
      "Porta Potty Rentals | Same-Day Delivery | Serving 25+ Cities | FlushJohn",
    description:
      "Professional porta potty rentals in Dover DE, Houston TX, Dallas TX, Los Angeles CA, and 22+ more cities. Same-day delivery, competitive pricing, licensed & insured. Serving 25+ cities nationwide.",
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
    title: "Porta Potty Rentals | Serving 25+ Cities Nationwide | FlushJohn",
    description:
      "Professional porta potty rentals in 25+ cities. Same-day delivery, competitive pricing, licensed & insured. Get your free quote today!",
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
  image: [
    `${s3assets}/og-image-flushjonn-web.png`,
    `${s3assets}/images/porta-potty-standard.jpg`,
    `${s3assets}/images/porta-potty-deluxe.jpg`,
    `${s3assets}/images/porta-potty-ada.jpg`,
    `${s3assets}/images/luxury-restroom-trailer.jpg`,
  ],
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
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
      opens: "08:00",
      closes: "20:00",
    },
  },
  // ServiceAreaBusiness requires areaServed array with specific locations
  areaServed: [
    // Delaware
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
    // Texas
    {
      "@type": "City",
      name: "Houston",
      containedIn: {
        "@type": "State",
        name: "Texas",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Dallas",
      containedIn: {
        "@type": "State",
        name: "Texas",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Austin",
      containedIn: {
        "@type": "State",
        name: "Texas",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "San Antonio",
      containedIn: {
        "@type": "State",
        name: "Texas",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Fort Worth",
      containedIn: {
        "@type": "State",
        name: "Texas",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    // Florida
    {
      "@type": "City",
      name: "Miami",
      containedIn: {
        "@type": "State",
        name: "Florida",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Orlando",
      containedIn: {
        "@type": "State",
        name: "Florida",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Tampa",
      containedIn: {
        "@type": "State",
        name: "Florida",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Jacksonville",
      containedIn: {
        "@type": "State",
        name: "Florida",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Fort Lauderdale",
      containedIn: {
        "@type": "State",
        name: "Florida",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    // California
    {
      "@type": "City",
      name: "Los Angeles",
      containedIn: {
        "@type": "State",
        name: "California",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "San Diego",
      containedIn: {
        "@type": "State",
        name: "California",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Sacramento",
      containedIn: {
        "@type": "State",
        name: "California",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "San Jose",
      containedIn: {
        "@type": "State",
        name: "California",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Fresno",
      containedIn: {
        "@type": "State",
        name: "California",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    // Georgia
    {
      "@type": "City",
      name: "Atlanta",
      containedIn: {
        "@type": "State",
        name: "Georgia",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Savannah",
      containedIn: {
        "@type": "State",
        name: "Georgia",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Augusta",
      containedIn: {
        "@type": "State",
        name: "Georgia",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Macon",
      containedIn: {
        "@type": "State",
        name: "Georgia",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Columbus",
      containedIn: {
        "@type": "State",
        name: "Georgia",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    // Illinois
    {
      "@type": "City",
      name: "Chicago",
      containedIn: {
        "@type": "State",
        name: "Illinois",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Springfield",
      containedIn: {
        "@type": "State",
        name: "Illinois",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Peoria",
      containedIn: {
        "@type": "State",
        name: "Illinois",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Rockford",
      containedIn: {
        "@type": "State",
        name: "Illinois",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    {
      "@type": "City",
      name: "Naperville",
      containedIn: {
        "@type": "State",
        name: "Illinois",
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    },
    // Fallback for nationwide coverage
    {
      "@type": "Country",
      name: "United States",
    },
  ],
  serviceType: "Porta Potty Rental Services",
  priceRange: "$$",
  paymentAccepted: [
    "Cash",
    "Credit Card",
    "Debit Card",
    "Check",
    "Online Payment",
  ],
  currenciesAccepted: "USD",
  serviceRadius: {
    "@type": "GeoCircle",
    geoRadius: "50 miles",
  },
  knowsAbout: [
    "Porta Potty Rentals",
    "Portable Toilet Services",
    "Event Sanitation",
    "Construction Site Services",
  ],
  sameAs: [
    socialMedia.facebook,
    socialMedia.twitter,
    socialMedia.linkedin,
    socialMedia.instagram,
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

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Rent a Porta Potty",
  description:
    "Step-by-step guide to renting a porta potty from FlushJohn for your event or construction site",
  totalTime: "PT15M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "100-500",
  },
  tool: [
    {
      "@type": "HowToTool",
      name: "Internet connection",
    },
    {
      "@type": "HowToTool",
      name: "Event or project details",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Determine Your Needs",
      text: "Calculate how many porta potties you need based on attendance, event duration, and whether alcohol is served. Use 1 unit per 50 people for short events, 1 per 35 for events with alcohol.",
      url: `${websiteURL}/faq`,
      image: `${s3assets}/og-image-flushjonn-web.png`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose Your Unit Type",
      text: "Select from standard porta potties, deluxe flushing units, ADA compliant units, or luxury restroom trailers based on your event type and budget.",
      url: `${websiteURL}/rental-products`,
      image: `${s3assets}/og-image-flushjonn-web.png`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Request a Quote",
      text: "Fill out our online quote form with your event details, location, dates, and unit requirements. We respond within 1 hour during business hours.",
      url: `${websiteURL}/quote`,
      image: `${s3assets}/og-image-flushjonn-web.png`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review and Confirm",
      text: "Review the customized quote including delivery, setup, and pickup. Approve the quote and provide payment to confirm your reservation.",
      url: `${websiteURL}/quote`,
      image: `${s3assets}/og-image-flushjonn-web.png`,
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Prepare Your Site",
      text: "Ensure level ground, vehicle access within 50 feet, and 12 feet of clearance for delivery. Mark preferred placement locations.",
      url: `${websiteURL}/faq`,
      image: `${s3assets}/og-image-flushjonn-web.png`,
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Delivery and Setup",
      text: "Our team delivers and sets up the porta potties at your specified location. We handle all setup - you just need to provide access.",
      url: `${websiteURL}/contact`,
      image: `${s3assets}/og-image-flushjonn-web.png`,
    },
  ],
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
      <Script
        id="howto-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <Home />
    </>
  );
};

export default HomePage;
