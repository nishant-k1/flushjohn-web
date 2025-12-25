import React from "react";
import type { Metadata } from "next";
import { websiteURL, s3assets } from "@/constants";
import ServiceAreasPage from "@/features/service-areas/components/ServiceAreasPage";

export const metadata: Metadata = {
  title: "Service Areas | Porta Potty Rentals Nationwide | FlushJohn",
  description:
    "FlushJohn provides porta potty rental services across 25+ cities in 6 states: Delaware, Texas, Florida, California, Georgia, and Illinois. Find porta potty rentals in your city.",
  keywords:
    "porta potty rental service areas, portable toilet rental locations, porta potty rental cities, portable toilet service coverage, porta potty rental states, nationwide porta potty rental",
  openGraph: {
    title: "Service Areas | Porta Potty Rentals Nationwide | FlushJohn",
    description:
      "FlushJohn provides porta potty rental services across 25+ cities in 6 states. Find porta potty rentals in your city.",
    url: `${websiteURL}/service-areas`,
    type: "website",
    siteName: "FlushJohn",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        height: 630,
        width: 1200,
        alt: "FlushJohn Service Areas",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas | Porta Potty Rentals Nationwide | FlushJohn",
    description:
      "FlushJohn provides porta potty rental services across 25+ cities in 6 states. Find porta potty rentals in your city.",
    images: [`${s3assets}/og-image-flushjonn-web.png`],
  },
  alternates: {
    canonical: `${websiteURL}/service-areas`,
  },
};

const ServiceAreasPageRoute = () => {
  return <ServiceAreasPage />;
};

export default ServiceAreasPageRoute;

