import React from "react";
import Quote from "@/components/Quote";
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
    card: "summary_large_image", // Use "summary" for square/tall images, "summary_large_image" for 1200x630
    title: "FlushJohn - Porta Potty Rentals",
    description:
      "Providing high-quality porta potty rental solutions for events of all sizes. Clean, affordable, and convenient.",
    images: [`${s3assets}/og-image-flushjonn-web.png`], // Use the same image
  },
  other: {
    "og:type": "website",
    "og:site_name": "FlushJohn",
    "og:locale": "en_US", // Change if needed

    // For Pinterest (Rich Pins)
    "article:published_time": "2024-03-04T12:00:00Z", // Change if needed
    "article:author": "FlushJohn Team",

    // For WhatsApp & Discord (OG works automatically)
  },
};

const QuotePage = () => <Quote />;

export default QuotePage;
