import React from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { s3assets, websiteURL, phone, contact } from "@/constants";
import Script from "next/script";
import AIOptimizedMeta from "@/components/SEO/AIOptimizedMeta";
import RichSnippets from "@/components/SEO/RichSnippets";

// Lazy load the main Home component for better initial load
const Home = dynamic(
  () =>
    import("@/features/home/components").then((mod) => ({ default: mod.Home })),
  {
    loading: () => (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div style={{ color: "white", fontSize: "1.2rem" }}>Loading...</div>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "FlushJohn - Porta Potty Rentals",
  description:
    "FlushJohn offers affordable and reliable porta potty rental services for all types of events. Get your quote today!",
  keywords:
    "porta potty rentals, portable toilets, event hygiene, flushjohn, rental service",
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

// JSON-LD structured data for homepage
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlushJohn",
  url: websiteURL,
  logo: `${s3assets}/og-image-flushjonn-web.png`,
  description:
    "FlushJohn offers affordable and reliable porta potty rental services for all types of events across the United States.",
  image: `${s3assets}/og-image-flushjonn-web.png`,
  foundingDate: "2020",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: phone.phone_number,
    contactType: "customer service",
    availableLanguage: ["English"],
    areaServed: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  knowsAbout: [
    "Porta Potty Rentals",
    "Portable Toilet Services",
    "Event Sanitation",
    "Construction Site Services",
  ],
};

// Service schema for remote business
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

// WebSite schema for search functionality
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

// FAQ schema for better featured snippets
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What areas do you serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide porta potty rentals across multiple locations including Houston, Dallas, Austin, San Antonio, Fort Worth, Miami, Orlando, Tampa, Jacksonville, Fort Lauderdale, Los Angeles, San Diego, Sacramento, San Jose, Fresno, Atlanta, Savannah, Augusta, Macon, Columbus, Chicago, Springfield, Peoria, Rockford, and Naperville.",
      },
    },
    {
      "@type": "Question",
      name: "How do I request a quote?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can easily request a quote by filling out the form on our website or calling us directly. Our team will get back to you promptly with a customized solution.",
      },
    },
    {
      "@type": "Question",
      name: "What types of porta potties do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a variety of porta potty options including standard units, deluxe flushing units, ADA compliant units, and portable restroom trailers to suit different event and project needs.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide same-day delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer same-day delivery for urgent needs when inventory is available. Contact us to check availability in your area.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in your rental service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our rental service includes delivery, setup, regular cleaning and maintenance, toilet paper and hand sanitizer restocking, and pickup at the end of your rental period.",
      },
    },
  ],
};

// Review schema for homepage
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
      {/* AI-Optimized Meta Tags for ChatGPT, Claude, etc. */}
      <AIOptimizedMeta />

      {/* Enhanced Rich Snippets */}
      <RichSnippets pageType="homepage" />

      {/* Existing Structured Data */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <Script
        id="deferred-css"
        strategy="lazyOnload"
      >
        {`
            document.addEventListener('DOMContentLoaded', function() {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = '/css/non-critical.css';
              document.head.appendChild(link);
            });
          `}
      </Script>
      <Home />
    </>
  );
};

export default HomePage;
