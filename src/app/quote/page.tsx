import React from "react";
import Quote from "@/components/Quote";
import Head from "next/head";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";

export const metadata: Metadata = {
  title: "Get a Quote - FlushJohn Porta Potty Rentals",
  description:
    "Fill out our simple form to get a personalized quote for porta potty rentals for your event. Quick, easy, and competitive pricing.",
  keywords:
    "get a quote, porta potty rental quote, portable toilet pricing, event rentals",
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
};

// JSON-LD structured data for "Get a Quote" page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Get a Quote - FlushJohn",
  url: `${websiteURL}/quote`,
  description:
    "Fill out our simple form to get a personalized quote for porta potty rentals for your event. Quick, easy, and competitive pricing.",
  image: `${s3assets}/og-image-flushjonn-web.png`,
  provider: {
    "@type": "Organization",
    name: "FlushJohn",
    url: websiteURL,
    logo: {
      "@type": "ImageObject",
      url: `${s3assets}/logo.png`,
    },
  },
};

const QuotePage = () => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Quote />
    </>
  );
};

export default QuotePage;
