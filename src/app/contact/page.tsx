import React from "react";
import Contact from "@/components/Contact";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";

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

const ContactPage = () => <Contact />;

export default ContactPage;
