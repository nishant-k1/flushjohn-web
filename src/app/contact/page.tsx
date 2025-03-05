import React from "react";
import Contact from "@/components/Contact";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Contact Us - FlushJohn Porta Potty Rentals",
  description:
    "Have questions? Get in touch with the FlushJohn team for inquiries about porta potty rentals, pricing, or any other services.",
  keywords:
    "contact flushjohn, porta potty inquiries, rental questions, customer support",
  openGraph: {
    title: "Contact FlushJohn - Porta Potty Rentals",
    description:
      "Reach out to us for any questions or assistance with our porta potty rental services. We’re here to help.",
    url: `${websiteURL}/contact`,
    type: "website",
    siteName: "FlushJohn",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        height: 630,
        width: 1200,
        alt: "FlushJohn Contact",
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
    canonical: `${websiteURL}/contact`,
  },
};

// ✅ **JSON-LD Structured Data for SEO**
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "Organization",
    name: "FlushJohn",
    url: websiteURL,
    logo: {
      "@type": "ImageObject",
      url: `${s3assets}/og-image-flushjonn-web.png`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-877-790-7062",
      contactType: "Customer Service",
      email: "support@flushjohn.com",
      availableLanguage: ["English", "Spanish"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "1234 Portable Toilet Ave",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94105",
      addressCountry: "US",
    },
  },
};

const ContactPage = () => {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${websiteURL}/contact`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Contact />
    </>
  );
};

export default ContactPage;
