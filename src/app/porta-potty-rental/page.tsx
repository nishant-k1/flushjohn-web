import React from "react";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Porta Potty Rentals by City - FlushJohn",
  description:
    "Find porta potty rental services in your city. Professional, reliable, and affordable portable toilet rentals across the United States.",
  keywords:
    "porta potty rental by city, portable toilet rental locations, event sanitation services, construction porta potty",
  openGraph: {
    title: "Porta Potty Rentals by City - FlushJohn",
    description:
      "Professional porta potty rental services in major US cities. Fast delivery, competitive pricing, and reliable service.",
    url: `${websiteURL}/porta-potty-rental`,
    type: "website",
    siteName: "FlushJohn",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        height: 630,
        width: 1200,
        alt: "Porta Potty Rentals by City - FlushJohn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Porta Potty Rentals by City - FlushJohn",
    description:
      "Professional porta potty rental services in major US cities. Fast delivery and competitive pricing.",
    images: [`${s3assets}/og-image-flushjonn-web.png`],
  },
  alternates: {
    canonical: `${websiteURL}/porta-potty-rental`,
  },
};

// FlushJohn service coverage cities
const cities = [
  // Texas
  { name: "houston", displayName: "Houston", state: "TX", population: "2.3M" },
  { name: "dallas", displayName: "Dallas", state: "TX", population: "1.3M" },
  { name: "austin", displayName: "Austin", state: "TX", population: "965K" },
  {
    name: "san-antonio",
    displayName: "San Antonio",
    state: "TX",
    population: "1.5M",
  },
  {
    name: "fort-worth",
    displayName: "Fort Worth",
    state: "TX",
    population: "918K",
  },

  // Florida
  { name: "miami", displayName: "Miami", state: "FL", population: "467K" },
  { name: "orlando", displayName: "Orlando", state: "FL", population: "307K" },
  { name: "tampa", displayName: "Tampa", state: "FL", population: "399K" },
  {
    name: "jacksonville",
    displayName: "Jacksonville",
    state: "FL",
    population: "950K",
  },
  {
    name: "fort-lauderdale",
    displayName: "Fort Lauderdale",
    state: "FL",
    population: "182K",
  },

  // California
  {
    name: "los-angeles",
    displayName: "Los Angeles",
    state: "CA",
    population: "4.0M",
  },
  {
    name: "san-diego",
    displayName: "San Diego",
    state: "CA",
    population: "1.4M",
  },
  {
    name: "sacramento",
    displayName: "Sacramento",
    state: "CA",
    population: "525K",
  },
  {
    name: "san-jose",
    displayName: "San Jose",
    state: "CA",
    population: "1.0M",
  },
  { name: "fresno", displayName: "Fresno", state: "CA", population: "542K" },

  // Georgia
  { name: "atlanta", displayName: "Atlanta", state: "GA", population: "498K" },
  {
    name: "savannah",
    displayName: "Savannah",
    state: "GA",
    population: "147K",
  },
  { name: "augusta", displayName: "Augusta", state: "GA", population: "202K" },
  { name: "macon", displayName: "Macon", state: "GA", population: "157K" },
  {
    name: "columbus",
    displayName: "Columbus",
    state: "GA",
    population: "206K",
  },

  // Illinois
  { name: "chicago", displayName: "Chicago", state: "IL", population: "2.7M" },
  {
    name: "springfield",
    displayName: "Springfield",
    state: "IL",
    population: "114K",
  },
  { name: "peoria", displayName: "Peoria", state: "IL", population: "113K" },
  {
    name: "rockford",
    displayName: "Rockford",
    state: "IL",
    population: "148K",
  },
  {
    name: "naperville",
    displayName: "Naperville",
    state: "IL",
    population: "149K",
  },
];

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Porta Potty Rentals by City",
  url: `${websiteURL}/porta-potty-rental`,
  description:
    "Find porta potty rental services in your city. Professional, reliable, and affordable portable toilet rentals across the United States.",
  provider: {
    "@type": "Organization",
    name: "FlushJohn",
    url: websiteURL,
    logo: `${s3assets}/og-image-flushjonn-web.png`,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  },
  mainEntity: {
    "@type": "ItemList",
    name: "US Cities with Porta Potty Rental Services",
    description:
      "Complete list of major US cities where FlushJohn provides porta potty rental services",
    numberOfItems: cities.length,
    itemListElement: cities.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${city.displayName}, ${city.state}`,
      description: `Porta potty rental services in ${city.displayName}, ${city.state} - Population: ${city.population}`,
      url: `${websiteURL}/porta-potty-rental/${city.name}`,
    })),
  },
};

const PortaPottyRentalPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1>Porta Potty Rentals by City</h1>
          <p style={{ fontSize: "1.2em", marginBottom: "30px" }}>
            Professional porta potty rental services in major US cities. Fast
            delivery, competitive pricing, and reliable service.
          </p>
        </div>

        {/* Cities by State */}
        <div style={{ marginBottom: "40px" }}>
          <h2>Select Your City</h2>
          <p
            style={{ textAlign: "center", marginBottom: "30px", color: "#666" }}
          >
            We provide porta potty rental services across 25 cities in 5 states
          </p>

          {["TX", "FL", "CA", "GA", "IL"].map((state) => {
            const stateCities = cities.filter((city) => city.state === state);
            const stateName = {
              TX: "Texas",
              FL: "Florida",
              CA: "California",
              GA: "Georgia",
              IL: "Illinois",
            }[state];

            return (
              <div
                key={state}
                style={{ marginBottom: "40px" }}
              >
                <h3
                  style={{
                    color: "var(--primary-bg-color)",
                    borderBottom: "2px solid var(--primary-bg-color)",
                    paddingBottom: "10px",
                    marginBottom: "20px",
                  }}
                >
                  {stateName} ({stateCities.length} cities)
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "15px",
                  }}
                >
                  {stateCities.map((city) => (
                    <Link
                      key={city.name}
                      href={`/porta-potty-rental/${city.name}`}
                      style={{
                        display: "block",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        textDecoration: "none",
                        color: "inherit",
                        background: "white",
                      }}
                    >
                      <h4
                        style={{
                          margin: "0 0 8px 0",
                          color: "var(--primary-bg-color)",
                        }}
                      >
                        {city.displayName}
                      </h4>
                      <p
                        style={{
                          margin: "0 0 5px 0",
                          color: "#666",
                          fontSize: "0.9em",
                        }}
                      >
                        Population: {city.population}
                      </p>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "0.8em",
                          color: "#888",
                        }}
                      >
                        Porta potty rental services →
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose FlushJohn */}
        <div style={{ marginBottom: "40px" }}>
          <h2>Why Choose FlushJohn for City-Wide Porta Potty Rentals?</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                padding: "20px",
                background: "#f8f9fa",
                borderRadius: "5px",
              }}
            >
              <h3>🏙️ City Coverage</h3>
              <p>
                We serve all major US cities with reliable porta potty delivery
                and pickup services.
              </p>
            </div>
            <div
              style={{
                padding: "20px",
                background: "#f8f9fa",
                borderRadius: "5px",
              }}
            >
              <h3>⚡ Fast Delivery</h3>
              <p>
                Same-day delivery available in most cities. Quick setup and
                professional service.
              </p>
            </div>
            <div
              style={{
                padding: "20px",
                background: "#f8f9fa",
                borderRadius: "5px",
              }}
            >
              <h3>💰 Competitive Pricing</h3>
              <p>
                Best rates in every city with transparent, no-hidden-fees
                pricing.
              </p>
            </div>
            <div
              style={{
                padding: "20px",
                background: "#f8f9fa",
                borderRadius: "5px",
              }}
            >
              <h3>🧹 Clean & Sanitized</h3>
              <p>
                Professionally cleaned units before every rental in every city
                we serve.
              </p>
            </div>
          </div>
        </div>

        {/* Popular Services */}
        <div style={{ marginBottom: "40px" }}>
          <h2>Popular Porta Potty Services Across All Cities</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {[
              "Construction Sites",
              "Weddings & Events",
              "Corporate Events",
              "Festivals & Concerts",
              "Sports Events",
              "Parks & Recreation",
              "Emergency Services",
              "Long-term Rentals",
            ].map((service) => (
              <div
                key={service}
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                <h4 style={{ margin: "0 0 10px 0" }}>{service}</h4>
                <p style={{ margin: "0", fontSize: "0.9em", color: "#666" }}>
                  Available in all cities
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            background: "var(--primary-bg-color)",
            color: "white",
            borderRadius: "10px",
          }}
        >
          <h2>Ready to Rent Porta Potties in Your City?</h2>
          <p style={{ fontSize: "1.2em", marginBottom: "30px" }}>
            Get a free quote for porta potty rental services in your city today!
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/quote"
              style={{
                background: "white",
                color: "var(--primary-bg-color)",
                padding: "15px 30px",
                textDecoration: "none",
                borderRadius: "5px",
                fontWeight: "bold",
                fontSize: "1.1em",
              }}
            >
              Get Free Quote
            </Link>
            <Link
              href="/contact"
              style={{
                background: "#28a745",
                color: "white",
                padding: "15px 30px",
                textDecoration: "none",
                borderRadius: "5px",
                fontWeight: "bold",
                fontSize: "1.1em",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortaPottyRentalPage;
