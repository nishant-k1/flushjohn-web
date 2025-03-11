import React from "react";
import PortaPottyRentalCity from "@/components/Locations/PortaPottyRentalCity";
import { cityPageData, s3assets, websiteURL } from "@/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params; // Keeping await as requested

  const cityName = city.replace("-", " "); // Convert slug format to readable format

  return {
    title: cityPageData.title.replace("{city}", cityName),
    description: cityPageData.description.replace("{city}", cityName),
    keywords: `porta potty rental in ${cityName}, portable toilet rental ${cityName}, restroom rental services ${cityName}`,
    openGraph: {
      title: `Porta Potty Rental in ${cityName} | FlushJohn`,
      description: cityPageData.description.replace("{city}", cityName),
      url: `${websiteURL}/porta-potty-rental/${city}`,
      images: [
        {
          url: `${s3assets}/og-image-flushjonn-web.png`,
          height: 630,
          width: 1200,
          alt: `Portable toilet rentals in ${cityName}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Porta Potty Rental in ${cityName}`,
      description: cityPageData.description.replace("{city}", cityName),
      images: [`${s3assets}/og-image-flushjonn-web.png`],
    },
    alternates: {
      canonical: `${websiteURL}/porta-potty-rental/${city}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params; // Keeping await as requested
  const cityName = city.replace("-", " ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Porta Potty Rental in ${cityName}`,
    description: `Affordable porta potty rental services in ${cityName}. Get high-quality portable restrooms for construction sites, events, and outdoor gatherings.`,
    areaServed: {
      "@type": "City",
      name: cityName,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-877-790-7062",
      contactType: "customer service",
    },
    serviceType: "Portable Toilet Rental",
    provider: {
      "@type": "Organization",
      name: "FlushJohn",
      url: websiteURL,
    },
    url: `${websiteURL}/porta-potty-rental/${city}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortaPottyRentalCity city={cityName} />
    </>
  );
}
