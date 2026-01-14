import React from "react";
import type { Metadata } from "next";
import StateHubPage from "@/features/service-areas/components/StateHubPage";

const websiteURL = process.env.NEXT_PUBLIC_FLUSH_JOHN_WEBSITE_URL!;
const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL!;
import {
  statesData,
  getStateCoordinates,
} from "@/features/locations/constants";

interface PageProps {
  params: Promise<{
    state: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { state: stateParam } = await params;
  const stateKey = stateParam?.toLowerCase() as keyof typeof statesData;
  const state = statesData[stateKey];

  if (!state) {
    return {
      title: "State Not Found | FlushJohn",
    };
  }

  const coordinates = getStateCoordinates(state.abbreviation);

  return {
    title: `Porta Potty Rentals ${state.displayName} | ${state.cities.length} Cities Served | FlushJohn`,
    description: `Porta potty rental, portable toilet rental, porta john & portable restroom in ${state.displayName}. Serving ${state.cities.length} cities. Same-day delivery available.`,
    keywords: `porta potty rental ${state.name}, porta potty rentals ${state.name}, rent a porta potty ${state.name}, porta potties for rent ${state.name}, portable toilet rental ${state.name}, portable toilet rentals ${state.name}, portable toilets for rent ${state.name}, portable restroom rental ${state.name}, portable restrooms ${state.name}, porta john rental ${state.name}, hand wash station rental ${state.name}, hand washing sink station rental ${state.name}, portable sink rental ${state.name}, handwash station rental ${state.name}, rent porta potty ${state.name}, rent portable toilet ${state.name}, rent hand wash station ${state.name}, rent a porta potty ${state.name}, porta potties for rent ${state.name}, ${state.abbreviation} porta potty rental, ${state.abbreviation} portable toilet rental, ${state.abbreviation} hand wash station rental, porta potty rental near me ${state.name}, portable toilet rental near me ${state.name}, hand wash station rental near me ${state.name}, rent porta potty for event ${state.name}, porta potty for construction site ${state.name}, portable restroom rental for wedding ${state.name}, porta potty rental prices ${state.name}, event porta potty rental ${state.name}, luxury porta potty rental ${state.name}, ADA portable toilet rental ${state.name}, hand washing station rental ${state.name}, restroom trailer rental ${state.name}, portable bathroom rental ${state.name}, toilet rental for events ${state.name}, construction porta potty ${state.name}, porta potty for wedding ${state.name}, porta potty rental service ${state.name}, portable toilet rental service ${state.name}, hand wash station rental service ${state.name}, porta potty rental company ${state.name}, portable toilet rental company ${state.name}, porta potty rental cost ${state.name}, portable toilet rental cost ${state.name}, hand wash station rental cost ${state.name}, porta potty rental price ${state.name}, portable toilet rental price ${state.name}, porta potty rental delivery ${state.name}, portable toilet rental delivery ${state.name}, hand wash station rental delivery ${state.name}, construction porta potty rental ${state.name}, event porta potty rental ${state.name}, wedding porta potty rental ${state.name}, ADA porta potty rental ${state.name}, luxury porta potty rental ${state.name}, emergency porta potty rental ${state.name}, same day porta potty rental ${state.name}, long term porta potty rental ${state.name}, porta potty rental for construction ${state.name}, portable toilet rental for construction ${state.name}, hand wash station rental for construction ${state.name}, porta potty rental for events ${state.name}, portable toilet rental for events ${state.name}, hand wash station rental for events ${state.name}, porta potty rental for wedding ${state.name}, portable toilet rental for wedding ${state.name}, how much does porta potty rental cost ${state.name}, how much to rent porta potty ${state.name}, porta potty rental quote ${state.name}, portable toilet rental quote ${state.name}, hand wash station rental quote ${state.name}, best porta potty rental ${state.name}, affordable porta potty rental ${state.name}, professional porta potty rental ${state.name}`,
    other: {
      "geo.region": `US-${state.abbreviation}`,
      "geo.placename": state.displayName,
      "geo.position": `${coordinates.lat};${coordinates.lng}`,
      ICBM: `${coordinates.lat}, ${coordinates.lng}`,
      dateModified: new Date().toISOString(),
    },
    openGraph: {
      title: `Porta Potty Rentals ${state.displayName} | FlushJohn`,
      description: `${state.description} Offering porta potty rental, portable toilet rental, porta john, and portable restroom services across ${state.displayName}.`,
      url: `${websiteURL}/service-areas/${stateParam}`,
      type: "website",
      siteName: "FlushJohn",
      images: [
        {
          url: `${s3assets}/og-image-flushjonn-web.png`,
          height: 630,
          width: 1200,
          alt: `FlushJohn Porta Potty Rentals ${state.displayName}`,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `Porta Potty Rentals ${state.displayName} | FlushJohn`,
      description: `${state.description} Offering porta potty rental, portable toilet rental, porta john, and portable restroom services across ${state.displayName}.`,
      images: [`${s3assets}/og-image-flushjonn-web.png`],
    },
    alternates: {
      canonical: `${websiteURL}/service-areas/${stateParam}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(statesData).map((state) => ({
    state: state,
  }));
}

const StatePage = async ({ params }: PageProps) => {
  const { state: stateParam } = await params;
  if (!stateParam) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>State Not Found</h1>
        <p>The requested state page could not be found.</p>
      </div>
    );
  }
  const stateKey = stateParam.toLowerCase() as keyof typeof statesData;
  const state = statesData[stateKey];

  if (!state) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>State Not Found</h1>
        <p>The requested state page could not be found.</p>
      </div>
    );
  }

  // Breadcrumb schema
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
      {
        "@type": "ListItem",
        position: 3,
        name: `${state.displayName} Porta Potty Rentals`,
        item: `${websiteURL}/service-areas/${stateParam}`,
      },
    ],
  };

  // Organization schema for state page
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${websiteURL}#organization`,
    name: "FlushJohn",
    legalName: "Siteway Services",
    url: websiteURL,
    logo: {
      "@type": "ImageObject",
      url: `${s3assets}/og-image-flushjonn-web.png`,
      width: 1200,
      height: 630,
    },
    description: `FlushJohn provides professional porta potty rental services across ${state.displayName}. Serving ${state.cities.length} major cities including ${state.cities.map((c: { name: string }) => c.name).join(", ")}.`,
    telephone: process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!,
    email: process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID!,
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    areaServed: state.cities.map((city: { name: string }) => ({
      "@type": "City",
      name: city.name,
      containedIn: {
        "@type": "State",
        name: state.name,
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
    })),
  };

  // ServiceAreaBusiness schema for state-level local SEO
  const serviceAreaBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ServiceAreaBusiness",
    name: `FlushJohn - Porta Potty Rentals ${state.displayName}`,
    description: `Professional porta potty rental services across ${state.displayName}. Serving ${state.cities.length} major cities.`,
    url: `${websiteURL}/service-areas/${stateParam}`,
    telephone: process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!,
    email: process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID!,
    address: {
      "@type": "PostalAddress",
      addressRegion: state.abbreviation,
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "State",
        name: state.name,
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
      ...state.cities.map((city: { name: string }) => ({
        "@type": "City",
        name: city.name,
        containedIn: {
          "@type": "State",
          name: state.name,
        },
      })),
    ],
    serviceType: "Porta Potty Rental Services",
    priceRange: "$$",
  };

  // Enhanced ItemList schema for cities in state
  const cityItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Porta Potty Rental Cities in ${state.displayName}`,
    description: `Complete list of cities in ${state.displayName} where FlushJohn provides porta potty rental services`,
    numberOfItems: state.cities.length,
    itemListElement: state.cities.map(
      (city: { name: string }, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${city.name}, ${state.abbreviation}`,
        description: `Porta potty rental services in ${city.name}, ${state.displayName}`,
        url: `${websiteURL}/porta-potty-rental/${city.name.toLowerCase().replace(/\s+/g, "-")}`,
      })
    ),
  };

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
          __html: JSON.stringify(serviceAreaBusinessJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityItemListJsonLd) }}
      />
      <StateHubPage state={state} />
    </>
  );
};

export default StatePage;
