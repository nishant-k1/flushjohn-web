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
    card: "summary_large_image",
    title: "FlushJohn - Porta Potty Rentals",
    description:
      "Providing high-quality porta potty rental solutions for events of all sizes. Clean, affordable, and convenient.",
    images: [`${s3assets}/og-image-flushjonn-web.png`],
  },
  alternates: {
    canonical: `${websiteURL}/rental-products`,
  },
};

// JSON-LD structured data for the Products page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "FlushJohn Rental Products",
  url: `${websiteURL}/rental-products`,
  description:
    "Find the best porta potty rental units for your event. Choose from a wide selection at affordable prices.",
  image: `${s3assets}/og-image-flushjonn-web.png`,
  provider: {
    "@type": "Organization",
    name: "FlushJohn",
    url: websiteURL,
    logo: {
      "@type": "ImageObject",
      url: `${s3assets}/og-image-flushjonn-web.png`,
    },
    areaServed: {
      "@type": "Country",
      name: "United States"
    }
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Porta Potty Rental Products",
    description: "Complete selection of portable toilet rental units available across the United States",
    numberOfItems: "10+",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Standard Porta Potty",
        description: "Basic portable toilet unit for events and construction sites"
      },
      {
        "@type": "ListItem", 
        position: 2,
        name: "Deluxe Porta Potty",
        description: "Enhanced portable toilet with additional amenities"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "ADA Compliant Porta Potty",
        description: "Americans with Disabilities Act compliant portable toilet"
      }
    ]
  }
};

const ProductsPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Products />
    </>
  );
};

export default ProductsPage;
