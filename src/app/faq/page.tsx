import React from "react";
import Faq from "@/components/Faq";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";
import Head from "next/head";

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

// ✅ **Static JSON-LD for SEO**
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to rent a porta potty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our porta potty rental prices vary depending on location, rental duration, and unit type. Contact us for a quote.",
      },
    },
    {
      "@type": "Question",
      name: "How often are the porta potties cleaned?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide regular servicing, including cleaning and restocking, typically on a weekly basis. Additional servicing can be arranged.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer delivery and setup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We handle delivery, setup, and pickup to ensure a hassle-free experience for your event or construction site.",
      },
    },
  ],
};

// ✅ **Page Component**
const FaqPage = () => (
  <>
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
    <Faq />
  </>
);

export default FaqPage;
