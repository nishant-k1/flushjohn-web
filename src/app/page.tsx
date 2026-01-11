import React from "react";
import type { Metadata } from "next";
import Script from "next/script";

import Home from "@/features/home/components/Home";

const websiteURL = process.env.NEXT_PUBLIC_FLUSH_JOHN_WEBSITE_URL!;
const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL!;

export const metadata: Metadata = {
  title: "Porta Potty Rentals | Fast Delivery | 25+ Cities | FlushJohn",
  description:
    "Affordable porta potty rental and portable toilet services in 25+ cities. Rent a porta potty for events, construction sites, and weddings. Fast delivery, competitive pricing. Free quote!",
  keywords:
    "porta potty rental, porta potty rentals, rent a porta potty, porta potties for rent, porta john rental, portable toilet rental, portable toilet rentals, portable toilets for rent, portable restroom rental, portable restrooms, rent portable toilets, rent portable toilet, porta potty rental near me, portable toilet rental near me, rent porta potty for event, porta potty for construction site, portable restroom rental for wedding, porta potty rental prices, event porta potty rental, luxury porta potty rental, ADA portable toilet rental, hand washing station rental, restroom trailer rental, portable bathroom rental, toilet rental for events, construction porta potty, porta potty for wedding, hand wash station rental, hand washing sink station rental, portable sink rental, handwash station rental, standalone portable sink station rental, temporary restroom rental services, temporary restroom rental, construction porta potty rental, wedding porta potty rental, home renovation porta potty rental, home renovation portable toilet rental, disaster relief porta potty rental, disaster relief portable toilet rental, renovation porta potty rental, renovation portable toilet rental, ADA porta potty rental, deluxe portable restroom rental, deluxe restroom rental, flushing portable restroom rental, flushable restroom rental, standard portable restroom rental, ADA compliant portable restroom rental, emergency porta potty rental, same day porta potty rental, long term porta potty rental, hand wash station rental near me, porta potty rental service, portable toilet rental service, hand wash station rental service, temporary restroom rental service, porta potty rental company, portable toilet rental company, porta potty rental cost, portable toilet rental cost, hand wash station rental cost, porta potty rental price, portable toilet rental price, porta potty rental delivery, portable toilet rental delivery, hand wash station rental delivery, porta potty rental for construction, portable toilet rental for construction, hand wash station rental for construction, porta potty rental for events, portable toilet rental for events, hand wash station rental for events, porta potty rental for wedding, portable toilet rental for wedding, porta potty rental for home renovation, portable toilet rental for home renovation, porta potty rental for disaster relief, portable toilet rental for disaster relief, how much does porta potty rental cost, how much to rent porta potty, rent porta potty, rent portable toilet, rent hand wash station, porta potty rental quote, portable toilet rental quote, hand wash station rental quote, best porta potty rental, best portable toilet rental, affordable porta potty rental, affordable portable toilet rental, professional porta potty rental, professional portable toilet rental",
  openGraph: {
    title: "Porta Potty Rentals | Fast Delivery | 25+ Cities | FlushJohn",
    description:
      "Affordable porta potty rental and portable toilet services in 25+ cities. Rent a porta potty for events, construction sites, and weddings. Fast delivery, competitive pricing. Free quote!",
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
    title: "Porta Potty Rentals | Fast Delivery | 25+ Cities | FlushJohn",
    description:
      "Professional porta potty rentals in 25+ cities. Fast delivery, competitive pricing, licensed & insured. Get your free quote today!",
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
  telephone: process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!,
  email: process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID!,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!,
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
    process.env.NEXT_PUBLIC_FLUSH_JOHN_FACEBOOK!,
    process.env.NEXT_PUBLIC_FLUSH_JOHN_TWITTER!,
    process.env.NEXT_PUBLIC_FLUSH_JOHN_LINKEDIN!,
    process.env.NEXT_PUBLIC_FLUSH_JOHN_INSTAGRAM!,
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
        text: "We offer fast delivery, typically within 24-48 hours. Same-day delivery may be available in select locations when inventory permits. Contact us to check availability in your area for urgent portable toilet delivery needs.",
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
      {/* Critical Structured Data - Load before page interactive for SEO */}
      {/* ServiceAreaBusiness schema - most important for local SEO */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Organization/Website schema - critical for brand recognition */}
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* Service schema - important for service-based business */}
      <Script
        id="service-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {/* FAQ schema - can load later as it's less critical */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* HowTo schema - can load later as it's less critical */}
      <Script
        id="howto-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <Home />
    </>
  );
};

export default HomePage;
