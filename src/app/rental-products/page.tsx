import React from "react";
import Products from "@/components/Products";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";

export const metadata: Metadata = {
  title: "Rental Products - FlushJohn Porta Potty Rentals",
  description:
    "Explore a wide variety of porta potty rental units for all types of events. Affordable, clean, and delivered to your location.",
  keywords:
    "porta potty rental, portable toilet products, event hygiene, rental service",
  openGraph: {
    title: "FlushJohn Rental Products",
    description:
      "Find the best porta potty rental units for your event. Choose from a wide selection at affordable prices.",
    url: `${websiteURL}/rental-products`,
    type: "website",
    siteName: "FlushJohn",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        height: 630,
        width: 1200,
        alt: "FlushJohn Rental Products",
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

const ProductsPage = () => <Products />;

export default ProductsPage;
