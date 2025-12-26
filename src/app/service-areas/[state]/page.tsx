import React from "react";
import type { Metadata } from "next";
import { websiteURL, s3assets, phone, contact, address } from "@/constants";
import StateHubPage from "@/features/service-areas/components/StateHubPage";
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
    description: `${state.description} Serving ${state.cities.length} major cities including ${state.cities.map((c) => c.name).join(", ")}. Same-day delivery available.`,
    keywords: `porta potty rental ${state.name}, portable toilet ${state.name}, ${state.abbreviation} porta potty rental, construction porta potty ${state.name}, event porta potty ${state.name}, ${state.cities.map((c) => `${c.name} porta potty`).join(", ")}`,
    other: {
      "geo.region": `US-${state.abbreviation}`,
      "geo.placename": state.displayName,
      "geo.position": `${coordinates.lat};${coordinates.lng}`,
      ICBM: `${coordinates.lat}, ${coordinates.lng}`,
      dateModified: new Date().toISOString(),
    },
    openGraph: {
      title: `Porta Potty Rentals ${state.displayName} | FlushJohn`,
      description: state.description,
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
      description: state.description,
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
    legalName: "FlushJohn LLC",
    url: websiteURL,
    logo: {
      "@type": "ImageObject",
      url: `${s3assets}/og-image-flushjonn-web.png`,
      width: 1200,
      height: 630,
    },
    description: `FlushJohn provides professional porta potty rental services across ${state.displayName}. Serving ${state.cities.length} major cities including ${state.cities.map((c: { name: string }) => c.name).join(", ")}.`,
    telephone: phone.phone_number,
    email: contact.support_email,
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
      <StateHubPage state={state} />
    </>
  );
};

export default StatePage;
