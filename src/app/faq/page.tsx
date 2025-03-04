import Faq from "@/components/Faq";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";

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

const FaqPage = () => <Faq />;

export default FaqPage;
