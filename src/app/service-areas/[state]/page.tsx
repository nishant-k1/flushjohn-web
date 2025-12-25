import React from "react";
import type { Metadata } from "next";
import { websiteURL, s3assets } from "@/constants";
import StateHubPage from "@/features/service-areas/components/StateHubPage";

const states = {
  texas: {
    name: "Texas",
    abbreviation: "TX",
    displayName: "Texas",
    cities: [
      { name: "Houston", slug: "houston", population: "2.3M" },
      { name: "Dallas", slug: "dallas", population: "1.3M" },
      { name: "Austin", slug: "austin", population: "965K" },
      { name: "San Antonio", slug: "san-antonio", population: "1.5M" },
      { name: "Fort Worth", slug: "fort-worth", population: "918K" },
    ],
    description: "FlushJohn provides reliable porta potty rental services across major Texas cities. From construction sites in Houston to events in Austin, we serve Texas with professional portable toilet solutions.",
  },
  florida: {
    name: "Florida",
    abbreviation: "FL",
    displayName: "Florida",
    cities: [
      { name: "Miami", slug: "miami", population: "467K" },
      { name: "Orlando", slug: "orlando", population: "307K" },
      { name: "Tampa", slug: "tampa", population: "399K" },
      { name: "Jacksonville", slug: "jacksonville", population: "950K" },
      { name: "Fort Lauderdale", slug: "fort-lauderdale", population: "182K" },
    ],
    description: "Professional porta potty rental services throughout Florida. We serve major cities from Miami to Orlando, providing clean, reliable portable toilets for events, construction, and special occasions.",
  },
  california: {
    name: "California",
    abbreviation: "CA",
    displayName: "California",
    cities: [
      { name: "Los Angeles", slug: "los-angeles", population: "4.0M" },
      { name: "San Diego", slug: "san-diego", population: "1.4M" },
      { name: "Sacramento", slug: "sacramento", population: "525K" },
      { name: "San Jose", slug: "san-jose", population: "1.0M" },
      { name: "Fresno", slug: "fresno", population: "542K" },
    ],
    description: "Comprehensive porta potty rental services across California. From Los Angeles entertainment events to San Diego beach gatherings, we provide professional portable toilet solutions statewide.",
  },
  georgia: {
    name: "Georgia",
    abbreviation: "GA",
    displayName: "Georgia",
    cities: [
      { name: "Atlanta", slug: "atlanta", population: "498K" },
      { name: "Savannah", slug: "savannah", population: "147K" },
      { name: "Augusta", slug: "augusta", population: "202K" },
      { name: "Macon", slug: "macon", population: "153K" },
      { name: "Columbus", slug: "columbus", population: "206K" },
    ],
    description: "Reliable porta potty rental services throughout Georgia. We serve major cities including Atlanta, Savannah, and Augusta, providing professional portable toilet solutions for all your needs.",
  },
  illinois: {
    name: "Illinois",
    abbreviation: "IL",
    displayName: "Illinois",
    cities: [
      { name: "Chicago", slug: "chicago", population: "2.7M" },
      { name: "Springfield", slug: "springfield", population: "114K" },
      { name: "Peoria", slug: "peoria", population: "113K" },
      { name: "Rockford", slug: "rockford", population: "148K" },
      { name: "Naperville", slug: "naperville", population: "149K" },
    ],
    description: "Professional porta potty rental services across Illinois. From Chicago events to construction sites in Springfield, we provide reliable portable toilet solutions throughout the state.",
  },
  delaware: {
    name: "Delaware",
    abbreviation: "DE",
    displayName: "Delaware",
    cities: [
      { name: "Dover", slug: "dover", population: "39K" },
    ],
    description: "Porta potty rental services in Delaware's capital city. FlushJohn provides professional portable toilet solutions for Dover events, construction projects, and special occasions.",
  },
};

interface PageProps {
  params: Promise<{
    state: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateParam } = await params;
  const stateKey = stateParam?.toLowerCase() as keyof typeof states;
  const state = states[stateKey];

  if (!state) {
    return {
      title: "State Not Found | FlushJohn",
    };
  }

  return {
    title: `Porta Potty Rentals ${state.displayName} | ${state.cities.length} Cities Served | FlushJohn`,
    description: `${state.description} Serving ${state.cities.length} major cities including ${state.cities.map(c => c.name).join(", ")}. Same-day delivery available.`,
    keywords: `porta potty rental ${state.name}, portable toilet ${state.name}, ${state.abbreviation} porta potty rental, construction porta potty ${state.name}, event porta potty ${state.name}, ${state.cities.map(c => `${c.name} porta potty`).join(", ")}`,
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
  return Object.keys(states).map((state) => ({
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
  const stateKey = stateParam.toLowerCase() as keyof typeof states;
  const state = states[stateKey];

  if (!state) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>State Not Found</h1>
        <p>The requested state page could not be found.</p>
      </div>
    );
  }

  return <StateHubPage state={state} />;
};

export default StatePage;

