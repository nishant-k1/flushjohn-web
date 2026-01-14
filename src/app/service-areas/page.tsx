import React from "react";
import type { Metadata } from "next";
import ServiceAreasPage from "@/features/service-areas/components/ServiceAreasPage";

const websiteURL = process.env.NEXT_PUBLIC_FLUSH_JOHN_WEBSITE_URL!;
const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL!;
const legalName = process.env.NEXT_PUBLIC_FLUSH_JOHN_LEGAL_NAME || "Siteway Services";

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
  other: {
    dateModified: new Date().toISOString(),
  },
};

// Service areas data for ItemList schema
const allCities = [
  { name: "Dover", slug: "dover", state: "Delaware", stateAbbr: "DE" },
  { name: "Houston", slug: "houston", state: "Texas", stateAbbr: "TX" },
  { name: "Dallas", slug: "dallas", state: "Texas", stateAbbr: "TX" },
  { name: "Austin", slug: "austin", state: "Texas", stateAbbr: "TX" },
  { name: "San Antonio", slug: "san-antonio", state: "Texas", stateAbbr: "TX" },
  { name: "Fort Worth", slug: "fort-worth", state: "Texas", stateAbbr: "TX" },
  { name: "Miami", slug: "miami", state: "Florida", stateAbbr: "FL" },
  { name: "Orlando", slug: "orlando", state: "Florida", stateAbbr: "FL" },
  { name: "Tampa", slug: "tampa", state: "Florida", stateAbbr: "FL" },
  {
    name: "Jacksonville",
    slug: "jacksonville",
    state: "Florida",
    stateAbbr: "FL",
  },
  {
    name: "Fort Lauderdale",
    slug: "fort-lauderdale",
    state: "Florida",
    stateAbbr: "FL",
  },
  {
    name: "Los Angeles",
    slug: "los-angeles",
    state: "California",
    stateAbbr: "CA",
  },
  {
    name: "San Diego",
    slug: "san-diego",
    state: "California",
    stateAbbr: "CA",
  },
  {
    name: "Sacramento",
    slug: "sacramento",
    state: "California",
    stateAbbr: "CA",
  },
  { name: "San Jose", slug: "san-jose", state: "California", stateAbbr: "CA" },
  { name: "Fresno", slug: "fresno", state: "California", stateAbbr: "CA" },
  { name: "Atlanta", slug: "atlanta", state: "Georgia", stateAbbr: "GA" },
  { name: "Savannah", slug: "savannah", state: "Georgia", stateAbbr: "GA" },
  { name: "Augusta", slug: "augusta", state: "Georgia", stateAbbr: "GA" },
  { name: "Macon", slug: "macon", state: "Georgia", stateAbbr: "GA" },
  { name: "Columbus", slug: "columbus", state: "Georgia", stateAbbr: "GA" },
  { name: "Chicago", slug: "chicago", state: "Illinois", stateAbbr: "IL" },
  {
    name: "Springfield",
    slug: "springfield",
    state: "Illinois",
    stateAbbr: "IL",
  },
  { name: "Peoria", slug: "peoria", state: "Illinois", stateAbbr: "IL" },
  { name: "Rockford", slug: "rockford", state: "Illinois", stateAbbr: "IL" },
  {
    name: "Naperville",
    slug: "naperville",
    state: "Illinois",
    stateAbbr: "IL",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: websiteURL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Service Areas",
      item: `${websiteURL}/service-areas`,
    },
  ],
};

// Organization schema
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${websiteURL}#organization`,
  name: "FlushJohn",
  legalName: legalName,
  url: websiteURL,
  logo: {
    "@type": "ImageObject",
    url: `${s3assets}/og-image-flushjonn-web.png`,
    width: 1200,
    height: 630,
  },
  description:
    "FlushJohn is a leading porta potty rental company providing professional portable toilet services across 25+ cities in 6 states: Delaware, Texas, Florida, California, Georgia, and Illinois.",
  telephone: process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!,
  email: process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID!,
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  areaServed: allCities.map((city) => ({
    "@type": "City",
    name: city.name,
    containedIn: {
      "@type": "State",
      name: city.state,
      containedIn: {
        "@type": "Country",
        name: "United States",
      },
    },
  })),
  sameAs: [],
};

// CollectionPage schema with ItemList
const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Service Areas - FlushJohn Porta Potty Rentals",
  description:
    "Complete list of all cities and states where FlushJohn provides porta potty rental services",
  url: `${websiteURL}/service-areas`,
  mainEntity: {
    "@type": "ItemList",
    name: "FlushJohn Service Areas",
    description:
      "Complete list of 25+ cities across 6 states where FlushJohn provides porta potty rental services",
    numberOfItems: allCities.length,
    itemListElement: allCities.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${city.name}, ${city.stateAbbr}`,
      description: `Porta potty rental services in ${city.name}, ${city.state}`,
      url: `${websiteURL}/porta-potty-rental/${city.slug}`,
    })),
  },
};

// ServiceAreaBusiness schema for service areas page
const serviceAreaBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ServiceAreaBusiness",
  name: "FlushJohn - Porta Potty Rental Service Areas",
  description:
    "Professional porta potty rental services across 25+ cities in 6 states: Delaware, Texas, Florida, California, Georgia, and Illinois.",
  url: `${websiteURL}/service-areas`,
  telephone: process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!,
  email: process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID!,
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  areaServed: allCities.map((city) => ({
    "@type": "City",
    name: city.name,
    containedIn: {
      "@type": "State",
      name: city.state,
      containedIn: {
        "@type": "Country",
        name: "United States",
      },
    },
  })),
  serviceType: "Porta Potty Rental Services",
  priceRange: "$$",
};

const ServiceAreasPageRoute = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceAreaBusinessJsonLd),
        }}
      />
      <ServiceAreasPage />
    </>
  );
};

export default ServiceAreasPageRoute;
