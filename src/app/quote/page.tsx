import React from "react";
import { Quote } from "@/features/quote/components";
import type { Metadata } from "next";
import { s3assets, websiteURL, phone, contact } from "@/constants";

export const metadata: Metadata = {
  title: "Get Your Free Porta Potty Rental Quote in 60 Seconds | FlushJohn",
  description:
    "Get your free porta potty rental quote in 60 seconds. No obligation, same-day delivery available. Starting at $150/unit. Serving 25+ cities across 6 states. Call (877) 790-7062 or fill out our quick form.",
  keywords:
    "get a quote, porta potty rental quote, portable toilet pricing, event rentals, porta potty quote near me, portable toilet quote Houston, porta potty quote Dallas, porta potty quote Miami, porta potty quote Los Angeles, porta potty pricing near me, portable toilet quote [city]",
  openGraph: {
    title: "Get a Quote for Porta Potty Rentals - FlushJohn",
    description:
      "Submit the form to receive a custom quote for our porta potty rental services. Fast, reliable, and affordable solutions.",
    url: `${websiteURL}/quote`,
    type: "website",
    siteName: "FlushJohn",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        height: 630,
        width: 1200,
        alt: "FlushJohn Quote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlushJohn - Porta Potty Rentals",
    description:
      "Providing high-quality porta potty rental solutions for events of all sizes. Clean, affordable, and convenient.",
    images: [`${s3assets}/og-image-flushjonn-web.png`],
  },
  alternates: {
    canonical: `${websiteURL}/quote`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Get a Quote - FlushJohn",
  url: `${websiteURL}/quote`,
  description:
    "Fill out our simple form to get a personalized quote for porta potty rentals for your event. Quick, easy, and competitive pricing. Available in 25+ cities across 6 states.",
  image: `${s3assets}/og-image-flushjonn-web.png`,
  provider: {
    "@type": "Organization",
    name: "FlushJohn",
    url: websiteURL,
    logo: {
      "@type": "ImageObject",
      url: `${s3assets}/og-image-flushjonn-web.png`,
    },
  },
  mainEntity: {
    "@type": "ContactAction",
    target: `${websiteURL}/quote`,
    name: "Get Porta Potty Rental Quote",
    description:
      "Request a personalized quote for porta potty rentals in your city",
  },
  potentialAction: [
    {
      "@type": "ReservationAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${websiteURL}/quote`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "Porta Potty Rental Quote",
      },
    },
    {
      "@type": "BookAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${websiteURL}/quote`,
      },
      result: {
        "@type": "Book",
        name: "Porta Potty Rental Booking",
      },
    },
  ],
};

// ServiceAreaBusiness schema for local context
const serviceAreaBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ServiceAreaBusiness",
  name: "FlushJohn - Porta Potty Rental Quotes",
  description:
    "Get free porta potty rental quotes across 25+ cities in 6 states. Same-day delivery available.",
  url: `${websiteURL}/quote`,
  telephone: phone.phone_number,
  email: contact.support_email,
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  serviceType: "Porta Potty Rental Services",
  priceRange: "$$",
};

const QuotePage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceAreaBusinessJsonLd),
        }}
      />
      <Quote />
    </>
  );
};

export default QuotePage;
