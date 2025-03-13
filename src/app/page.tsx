import React from "react";
import Home from "@/components/Home";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";
import Script from "next/script";

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
    card: "summary_large_image",
    title: "FlushJohn - Porta Potty Rentals",
    description:
      "Providing high-quality porta potty rental solutions for events of all sizes. Clean, affordable, and convenient.",
    images: [`${s3assets}/og-image-flushjonn-web.png`],
  },
  alternates: {
    canonical: websiteURL,
  },
};

// JSON-LD structured data for homepage
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlushJohn",
  url: websiteURL,
  logo: `${s3assets}/og-image-flushjonn-web.png`, // Ensure this is a valid public URL
  description:
    "FlushJohn offers affordable and reliable porta potty rental services for all types of events.",
  image: `${s3assets}/og-image-flushjonn-web.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-877-790-7062", // Replace with actual contact
    contactType: "customer service",
  },
};

const HomePage = () => {
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="deferred-css"
        strategy="lazyOnload"
      >
        {`
            document.addEventListener('DOMContentLoaded', function() {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = '/css/non-critical.css';
              document.head.appendChild(link);
            });
          `}
      </Script>
      <Home />
    </>
  );
};

export default HomePage;
