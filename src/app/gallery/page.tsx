import React from "react";
import Gallery from "@/components/Gallery";
import Head from "next/head";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";

export const metadata: Metadata = {
  title: "Gallery - FlushJohn Porta Potty Rentals",
  description:
    "Check out our gallery showcasing our high-quality porta potty rental units at various events.",
  keywords:
    "porta potty gallery, portable toilet images, event rentals showcase",
  openGraph: {
    title: "FlushJohn Gallery",
    description:
      "View images of our porta potty rentals in action. See our clean and high-quality units used at various events.",
    url: `${websiteURL}/gallery`,
    type: "website", // ✅ Open Graph type should be "website"
    siteName: "FlushJohn",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        height: 630,
        width: 1200,
        alt: "FlushJohn Gallery",
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

// ✅ JSON-LD structured data for the Gallery page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "FlushJohn Gallery",
  url: `${websiteURL}/gallery`,
  description:
    "View images of our porta potty rentals in action. See our clean and high-quality units used at various events.",
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

const GalleryPage = () => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Gallery />
    </>
  );
};

export default GalleryPage;
