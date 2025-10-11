import React from "react";
import { Faq } from "@/features/legal/components";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";

export const metadata: Metadata = {
  title: "FAQ - FlushJohn Porta Potty Rentals",
  description:
    "Find answers to the most frequently asked questions about our porta potty rental services, pricing, and more.",
  keywords:
    "FAQ, porta potty questions, flushjohn faq, rental questions, portable toilet help",
  openGraph: {
    title: "FlushJohn FAQ - Porta Potty Rentals",
    description:
      "Get answers to common questions about porta potty rentals, pricing, delivery, and more with FlushJohn.",
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

import { comprehensiveFaqData, generateFAQSchema } from "@/features/legal/constants/comprehensiveFaq";

// ✅ **Comprehensive JSON-LD for SEO (using first 20 most important FAQs)**
const topFAQs = [
  ...comprehensiveFaqData.filter(f => f.category === "Pricing & Costs").slice(0, 5),
  ...comprehensiveFaqData.filter(f => f.category === "Service Areas & Delivery").slice(0, 4),
  ...comprehensiveFaqData.filter(f => f.category === "Product Types & Options").slice(0, 4),
  ...comprehensiveFaqData.filter(f => f.category === "Booking & Reservations").slice(0, 3),
  ...comprehensiveFaqData.filter(f => f.category === "Events & Occasions").slice(0, 2),
  ...comprehensiveFaqData.filter(f => f.category === "Construction Sites").slice(0, 2),
];

const jsonLd = generateFAQSchema(topFAQs, websiteURL);

// ✅ **Page Component**
const FaqPage = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <Faq />
  </>
);

export default FaqPage;
