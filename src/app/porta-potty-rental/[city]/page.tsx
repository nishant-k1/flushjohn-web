import React from "react";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";
import { PortaPottyRentalCity } from "@/features/locations/components";
import {
  citiesData,
  getCityCoordinatesWithFallback,
  getCitiesByState,
} from "@/features/locations/constants";

const getServiceAreas = (state: string) => {
  const serviceAreas = {
    DE: [
      {
        name: "State Capital Area",
        description: "Porta potty rentals in Dover, Delaware's capital city",
      },
      {
        name: "Construction Sites",
        description: "Long-term porta potty rentals for Delaware construction",
      },
      {
        name: "Government Facilities",
        description:
          "Porta potty services for government events and facilities",
      },
      {
        name: "Event Venues",
        description:
          "Wedding and corporate event porta potty services in Dover",
      },
      {
        name: "Parks & Recreation",
        description: "Outdoor event porta potty rentals in Delaware",
      },
      {
        name: "Military Bases",
        description: "Porta potty services for military events and facilities",
      },
      {
        name: "Historic Areas",
        description: "Historic district porta potty rentals in Dover",
      },
      {
        name: "Corporate Events",
        description: "Professional porta potty services for business events",
      },
    ],
    TX: [
      {
        name: "Downtown Districts",
        description:
          "Professional porta potty services for downtown business districts and urban areas",
      },
      {
        name: "Construction Sites",
        description:
          "Long-term porta potty rentals for Texas construction projects",
      },
      {
        name: "Event Venues",
        description: "Wedding and event porta potty services across Texas",
      },
      {
        name: "Industrial Areas",
        description:
          "Heavy-duty porta potty solutions for industrial facilities",
      },
      {
        name: "Parks & Recreation",
        description: "Outdoor event porta potty rentals in Texas parks",
      },
      {
        name: "Sports Facilities",
        description: "Athletic event porta potty services in Texas",
      },
      {
        name: "Schools & Universities",
        description: "Educational institution porta potty rentals",
      },
      {
        name: "Hospitals & Medical",
        description: "Healthcare facility porta potty services",
      },
    ],
    FL: [
      {
        name: "Beach Areas",
        description:
          "Porta potty rentals for Florida beach events and festivals",
      },
      {
        name: "Theme Parks",
        description: "Event porta potty services near Florida theme parks",
      },
      {
        name: "Downtown Districts",
        description: "Urban porta potty services in Florida cities",
      },
      {
        name: "Construction Sites",
        description: "Long-term porta potty rentals for Florida construction",
      },
      {
        name: "Event Venues",
        description: "Wedding and corporate event porta potty services",
      },
      {
        name: "Marinas & Waterfront",
        description: "Waterfront event porta potty rentals",
      },
      {
        name: "Golf Courses",
        description: "Golf tournament porta potty services",
      },
      {
        name: "Convention Centers",
        description: "Large event porta potty solutions",
      },
    ],
    CA: [
      {
        name: "Downtown Areas",
        description: "Urban porta potty services in California cities",
      },
      {
        name: "Construction Sites",
        description:
          "Long-term porta potty rentals for California construction",
      },
      {
        name: "Event Venues",
        description: "Wedding and festival porta potty services",
      },
      { name: "Beach Areas", description: "Coastal event porta potty rentals" },
      {
        name: "Wine Country",
        description: "Vineyard and wine event porta potty services",
      },
      {
        name: "Entertainment Industry",
        description: "Film and TV production porta potty rentals",
      },
      {
        name: "Tech Companies",
        description: "Corporate event porta potty services",
      },
      {
        name: "Parks & Recreation",
        description: "Outdoor event porta potty rentals",
      },
    ],
    GA: [
      {
        name: "Downtown Districts",
        description: "Urban porta potty services in Georgia cities",
      },
      {
        name: "Construction Sites",
        description: "Long-term porta potty rentals for Georgia construction",
      },
      {
        name: "Event Venues",
        description: "Wedding and corporate event porta potty services",
      },
      {
        name: "Historic Areas",
        description: "Historic district porta potty rentals",
      },
      {
        name: "Parks & Recreation",
        description: "Outdoor event porta potty services",
      },
      {
        name: "Sports Facilities",
        description: "Athletic event porta potty rentals",
      },
      {
        name: "Universities",
        description: "College event porta potty services",
      },
      {
        name: "Industrial Areas",
        description: "Manufacturing facility porta potty rentals",
      },
    ],
    IL: [
      {
        name: "Downtown Areas",
        description: "Urban porta potty services in Illinois cities",
      },
      {
        name: "Construction Sites",
        description: "Long-term porta potty rentals for Illinois construction",
      },
      {
        name: "Event Venues",
        description: "Wedding and corporate event porta potty services",
      },
      {
        name: "Parks & Recreation",
        description: "Outdoor event porta potty rentals",
      },
      {
        name: "Sports Facilities",
        description: "Athletic event porta potty services",
      },
      {
        name: "Universities",
        description: "College event porta potty rentals",
      },
      {
        name: "Industrial Areas",
        description: "Manufacturing porta potty services",
      },
      {
        name: "Suburban Areas",
        description: "Suburban event porta potty rentals",
      },
    ],
  };

  return serviceAreas[state as keyof typeof serviceAreas] || serviceAreas.DE;
};

const getNearbyCities = (state: string) => {
  return getCitiesByState(state).slice(0, 3);
};

export async function generateStaticParams() {
  return citiesData.map((city) => ({
    city: city.name,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityData = citiesData.find((c) => c.name === city);

  if (!cityData) {
    return {
      title: "Porta Potty Rentals - FlushJohn",
      description:
        "Professional porta potty rental services across the United States.",
    };
  }

  const { displayName, state } = cityData;
  const cityTitle = `${displayName}, ${state}`;
  const coordinates = getCityCoordinatesWithFallback(city);

  return {
    title: `Porta Potty Rentals in ${cityTitle} | Same-Day Delivery | FlushJohn`,
    description: `Affordable porta potty rental & portable toilet services in ${cityTitle}. Professional porta john & portable restroom rentals. Same-day delivery. Free quote!`,
    keywords: `porta potty rental ${displayName}, porta potty rentals ${cityTitle}, rent a porta potty ${displayName}, porta potties for rent ${cityTitle}, porta potty rental ${cityTitle}, portable toilet rental ${cityTitle}, portable toilet rentals ${displayName}, portable toilets for rent ${cityTitle}, portable restroom rental ${cityTitle}, portable restrooms ${displayName}, porta john rental ${displayName}, hand wash station rental ${displayName}, hand washing sink station rental ${cityTitle}, portable sink rental ${displayName}, standalone portable sink station rental ${cityTitle}, handwash station rental ${displayName}, rent portable toilets ${cityTitle}, rent portable toilet ${displayName}, rent a porta potty ${cityTitle}, porta potties for rent ${displayName}, temporary restroom rental ${cityTitle}, temporary restroom rental services ${displayName}, rent porta potty ${displayName}, rent portable toilet ${cityTitle}, rent hand wash station ${displayName}, porta potty rental near me ${displayName}, portable toilet rental near me ${cityTitle}, hand wash station rental near me ${displayName}, rent porta potty for event ${cityTitle}, porta potty for construction site ${displayName}, portable restroom rental for wedding ${cityTitle}, porta potty rental prices ${displayName}, event porta potty rental ${cityTitle}, luxury porta potty rental ${displayName}, ADA portable toilet rental ${cityTitle}, hand washing station rental ${displayName}, restroom trailer rental ${cityTitle}, portable bathroom rental ${displayName}, toilet rental for events ${cityTitle}, construction porta potty ${displayName}, porta potty for wedding ${cityTitle}, porta potty rental service ${cityTitle}, portable toilet rental service ${displayName}, hand wash station rental service ${cityTitle}, temporary restroom rental service ${displayName}, porta potty rental company ${cityTitle}, portable toilet rental company ${displayName}, porta potty rental cost ${cityTitle}, portable toilet rental cost ${displayName}, hand wash station rental cost ${cityTitle}, porta potty rental price ${displayName}, portable toilet rental price ${cityTitle}, porta potty rental delivery ${displayName}, portable toilet rental delivery ${cityTitle}, hand wash station rental delivery ${displayName}, construction porta potty rental ${cityTitle}, event porta potty rental ${displayName}, wedding porta potty rental ${cityTitle}, home renovation porta potty rental ${displayName}, home renovation portable toilet rental ${cityTitle}, disaster relief porta potty rental ${displayName}, disaster relief portable toilet rental ${cityTitle}, renovation porta potty rental ${displayName}, renovation portable toilet rental ${cityTitle}, ADA porta potty rental ${cityTitle}, deluxe portable restroom rental ${displayName}, flushing portable restroom rental ${cityTitle}, flushable restroom rental ${displayName}, standard portable restroom rental ${cityTitle}, ADA compliant portable restroom rental ${displayName}, emergency porta potty rental ${cityTitle}, same day porta potty rental ${displayName}, long term porta potty rental ${cityTitle}, porta potty rental for construction ${displayName}, portable toilet rental for construction ${cityTitle}, hand wash station rental for construction ${displayName}, porta potty rental for events ${cityTitle}, portable toilet rental for events ${displayName}, hand wash station rental for events ${cityTitle}, porta potty rental for wedding ${displayName}, portable toilet rental for wedding ${cityTitle}, porta potty rental for home renovation ${displayName}, portable toilet rental for home renovation ${cityTitle}, porta potty rental for disaster relief ${displayName}, portable toilet rental for disaster relief ${cityTitle}, how much does porta potty rental cost ${displayName}, how much to rent porta potty ${cityTitle}, porta potty rental quote ${displayName}, portable toilet rental quote ${cityTitle}, hand wash station rental quote ${displayName}, best porta potty rental ${cityTitle}, affordable porta potty rental ${displayName}, professional porta potty rental ${cityTitle}`,
    other: {
      "geo.region": `US-${state}`,
      "geo.placename": displayName,
      "geo.position": `${coordinates.lat};${coordinates.lng}`,
      ICBM: `${coordinates.lat}, ${coordinates.lng}`,
      dateModified: new Date().toISOString(),
    },
    openGraph: {
      title: `Porta Potty Rentals in ${cityTitle} - FlushJohn`,
      description: `Get reliable porta potty rental, portable toilet rental, porta john, and portable restroom services in ${cityTitle}. Same-day delivery, competitive pricing, and professional service for all your event and construction needs.`,
      url: `${websiteURL}/porta-potty-rental/${city}`,
      type: "website",
      siteName: "FlushJohn",
      images: [
        {
          url: `${s3assets}/og-image-flushjonn-web.png`,
          height: 630,
          width: 1200,
          alt: `Porta Potty Rentals in ${cityTitle} - FlushJohn`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Porta Potty Rentals in ${cityTitle} - FlushJohn`,
      description: `Professional porta potty rental & portable toilet services in ${cityTitle}. Porta john & portable restroom rentals. Fast delivery, competitive pricing.`,
      images: [`${s3assets}/og-image-flushjonn-web.png`],
    },
    alternates: {
      canonical: `${websiteURL}/porta-potty-rental/${city}`,
    },
  };
}

const CityPage = async ({ params }: { params: Promise<{ city: string }> }) => {
  const { city } = await params;

  // Handle URLs with state suffix (e.g., "fort-worth-tx" -> "fort-worth")
  const normalizedCity = city.replace(/-(tx|fl|ca|ga|il|de)$/i, "");
  const cityData = citiesData.find(
    (c) => c.name === normalizedCity || c.name === city
  );

  if (!cityData) {
    return <div>City not found</div>;
  }

  const { displayName, state, population } = cityData;
  const coordinates = getCityCoordinatesWithFallback(normalizedCity);
  // getServiceAreas is defined in the component file - keep it for now
  const serviceAreas = getServiceAreas(state);
  const nearbyCities = getNearbyCities(state);

  return (
    <PortaPottyRentalCity
      city={displayName}
      displayName={displayName}
      state={state}
      population={population}
      citySlug={normalizedCity}
      serviceAreas={serviceAreas}
      nearbyCities={nearbyCities}
      coordinates={coordinates}
    />
  );
};

export default CityPage;
