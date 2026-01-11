import React from "react";
import { Faq } from "@/features/legal/components";
import type { Metadata } from "next";

const websiteURL = process.env.NEXT_PUBLIC_FLUSH_JOHN_WEBSITE_URL!;
const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL!;

export const metadata: Metadata = {
  title: "FAQ - Porta Potty Rental Questions & Answers | FlushJohn",
  description:
    "FAQ about porta potty rental, portable toilet rental, porta john & portable restroom services, pricing & more. Get answers to common questions.",
  keywords:
    "FAQ, porta potty rental questions, portable toilet rental questions, porta john rental questions, portable restroom rental questions, hand wash station rental questions, hand washing sink station rental questions, portable sink rental questions, rent porta potty questions, rent portable toilet questions, rent hand wash station questions, flushjohn faq, porta potty rental FAQ, portable toilet rental FAQ, hand wash station rental FAQ, porta potty rental help, portable toilet rental help, hand wash station rental help, porta potty rental cost questions, portable toilet rental cost questions, hand wash station rental cost questions",
  openGraph: {
    title: "FlushJohn FAQ - Porta Potty Rentals",
    description:
      "Get answers to common questions about porta potty rental, portable toilet rental, porta john, and portable restroom services, pricing, delivery, and more with FlushJohn.",
    url: `${websiteURL}/faq`,
    type: "website",
    siteName: "FlushJohn",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        height: 630,
        width: 1200,
        alt: "FlushJohn FAQ",
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
    canonical: `${websiteURL}/faq`,
  },
};

import {
  comprehensiveFaqData,
  generateFAQSchema,
} from "@/features/legal/constants/comprehensiveFaq";
import Script from "next/script";

const topFAQs = [
  ...comprehensiveFaqData
    .filter((f) => f.category === "Pricing & Costs")
    .slice(0, 5),
  ...comprehensiveFaqData
    .filter((f) => f.category === "Service Areas & Delivery")
    .slice(0, 4),
  ...comprehensiveFaqData
    .filter((f) => f.category === "Product Types & Options")
    .slice(0, 4),
  ...comprehensiveFaqData
    .filter((f) => f.category === "Booking & Reservations")
    .slice(0, 3),
  ...comprehensiveFaqData
    .filter((f) => f.category === "Events & Occasions")
    .slice(0, 2),
  ...comprehensiveFaqData
    .filter((f) => f.category === "Construction Sites")
    .slice(0, 2),
];

const jsonLd = generateFAQSchema(topFAQs, websiteURL);

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Rent a Porta Potty - Complete Guide",
  description:
    "Learn how to rent a porta potty with our step-by-step guide. From calculating your needs to final delivery, we'll walk you through the entire process.",
  totalTime: "PT15M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "100-500",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Calculate Your Needs",
      text: "Determine how many porta potties you need based on attendance, event duration, and whether alcohol is served. Use 1 unit per 50 people for short events, 1 per 35 for events with alcohol.",
      url: `${websiteURL}/faq`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose Unit Type",
      text: "Select from standard porta potties, deluxe flushing units, ADA compliant units, or luxury restroom trailers based on your event type and budget.",
      url: `${websiteURL}/rental-products`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Request a Quote",
      text: "Fill out our online quote form with your event details, location, dates, and unit requirements. We respond within 1 hour during business hours.",
      url: `${websiteURL}/quote`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review and Confirm",
      text: "Review the customized quote including delivery, setup, and pickup. Approve the quote and provide payment to confirm your reservation.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Prepare Your Site",
      text: "Ensure level ground, vehicle access within 50 feet, and 12 feet of clearance for delivery. Mark preferred placement locations.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Delivery and Setup",
      text: "Our team delivers and sets up the porta potties at your specified location. We handle all setup - you just need to provide access.",
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: websiteURL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "FAQ",
      item: `${websiteURL}/faq`,
    },
  ],
};

const FaqPage = () => (
  <>
    <Script
      id="faq-schema"
      type="application/ld+json"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <Script
      id="faq-howto-schema"
      type="application/ld+json"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
    />
    <Script
      id="faq-breadcrumb-schema"
      type="application/ld+json"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
    />
    <Faq />
  </>
);

export default FaqPage;
