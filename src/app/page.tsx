import React from "react";
import Home from "@/components/Home";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";

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

const HomePage = () => <Home />;

export default HomePage;
