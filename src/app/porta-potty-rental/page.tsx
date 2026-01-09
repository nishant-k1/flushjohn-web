import React from "react";
import type { Metadata } from "next";
import {
  Building2,
  Zap,
  DollarSign,
  Droplet,
  FileText,
  HelpCircle,
  Camera,
} from "lucide-react";
import { s3assets, websiteURL, phone, contact } from "@/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Porta Potty Rentals by City - FlushJohn",
  description:
    "Find porta potty rental, portable toilet rental, porta john & portable restroom services in your city. Professional, reliable & affordable across the US.",
  keywords:
    "porta potty rental by city, portable toilet rental by city, porta john rental by city, portable restroom rental by city, hand wash station rental by city, hand washing sink station rental by city, portable sink rental by city, rent porta potty by city, rent portable toilet by city, rent hand wash station by city, porta potty rental locations, portable toilet rental locations, hand wash station rental locations, porta potty rental service, portable toilet rental service, hand wash station rental service, porta potty rental company, portable toilet rental company, porta potty rental quote, portable toilet rental quote, hand wash station rental quote, construction porta potty rental, event porta potty rental, wedding porta potty rental",
  openGraph: {
    title: "Porta Potty Rentals by City - FlushJohn",
    description:
      "Professional porta potty rental, portable toilet rental, porta john, and portable restroom services in major US cities. Fast delivery, competitive pricing, and reliable service.",
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

import { citiesData, getCitiesByState } from "@/features/locations/constants";

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
    numberOfItems: citiesData.length,
    itemListElement: citiesData.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${city.displayName}, ${city.state}`,
      description: `Porta potty rental services in ${city.displayName}, ${city.state} - Population: ${city.population}`,
      url: `${websiteURL}/porta-potty-rental/${city.name}`,
    })),
  },
};

// ServiceAreaBusiness schema for main landing page
const serviceAreaBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ServiceAreaBusiness",
  name: "FlushJohn - Porta Potty Rentals",
  description:
    "Professional porta potty rental services across 25+ cities in 6 states. Same-day delivery, competitive pricing.",
  url: `${websiteURL}/porta-potty-rental`,
  telephone: phone.phone_number,
  email: contact.support_email,
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  serviceType: "Porta Potty Rental Services",
  priceRange: "$$",
};

// Service schema for main service page
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Porta Potty Rental Services",
  description:
    "Professional porta potty rental services for events, construction sites, and special occasions across the United States.",
  provider: {
    "@type": "Organization",
    name: "FlushJohn",
    url: websiteURL,
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  serviceType: "Portable Toilet Rental Services",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "100",
    highPrice: "500",
    availability: "https://schema.org/InStock",
  },
};

const PortaPottyRentalPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceAreaBusinessJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "var(--spacing-section) 0",
        }}
      >
        <div style={{ padding: "0 var(--spacing-lg)" }}>
          {/* Hero Section */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ color: "var(--text-primary)" }}>
              Porta Potty Rentals by City
            </h1>
            <p
              style={{
                fontSize: "1.2em",
                marginBottom: "30px",
                color: "var(--text-primary)",
              }}
            >
              Professional porta potty rental services in major US cities. Fast
              delivery, competitive pricing, and reliable service.
            </p>
          </div>

          {/* Cities by State */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ color: "var(--text-primary)" }}>Select Your City</h2>
            <p
              style={{
                textAlign: "center",
                marginBottom: "30px",
                color: "var(--text-primary)",
              }}
            >
              We provide porta potty rental services across 25 cities in 5
              states
            </p>

            {["TX", "FL", "CA", "GA", "IL"].map((state) => {
              const stateCities = getCitiesByState(state);
              const stateName = {
                TX: "Texas",
                FL: "Florida",
                CA: "California",
                GA: "Georgia",
                IL: "Illinois",
              }[state];

              return (
                <div key={state} style={{ marginBottom: "40px" }}>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      borderBottom: "2px solid var(--primary-light)",
                      paddingBottom: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    {stateName} ({stateCities.length} cities)
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(280px, 1fr))",
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
                          border: "1px solid var(--white-alpha-15)",
                          borderRadius: "0",
                          textDecoration: "none",
                          color: "inherit",
                          background: "var(--neutral-700)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <h4
                          style={{
                            margin: "0 0 8px 0",
                            color: "var(--text-primary)",
                          }}
                        >
                          {city.displayName}
                        </h4>
                        <p
                          style={{
                            margin: "0 0 5px 0",
                            color: "var(--text-primary)",
                            fontSize: "0.9em",
                          }}
                        >
                          Population: {city.population}
                        </p>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "0.8em",
                            color: "var(--text-primary)",
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
            <h2 style={{ color: "var(--text-primary)" }}>
              Why Choose FlushJohn for City-Wide Porta Potty Rentals?
            </h2>
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
                  background: "var(--neutral-700)",
                  borderRadius: "0",
                  border: "1px solid var(--white-alpha-15)",
                  transition: "all 0.3s ease",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--text-primary)",
                  }}
                >
                  <Building2 size={20} />
                  City Coverage
                </h3>
                <p style={{ color: "var(--text-primary)" }}>
                  We serve all major US cities with reliable porta potty
                  delivery and pickup services.
                </p>
              </div>
              <div
                style={{
                  padding: "20px",
                  background: "var(--neutral-700)",
                  borderRadius: "0",
                  border: "1px solid var(--white-alpha-15)",
                  transition: "all 0.3s ease",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--text-primary)",
                  }}
                >
                  <Zap size={20} />
                  Fast Delivery
                </h3>
                <p style={{ color: "var(--text-primary)" }}>
                  Same-day delivery available in most cities. Quick setup and
                  professional service.
                </p>
              </div>
              <div
                style={{
                  padding: "20px",
                  background: "var(--neutral-700)",
                  borderRadius: "0",
                  border: "1px solid var(--white-alpha-15)",
                  transition: "all 0.3s ease",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--text-primary)",
                  }}
                >
                  <DollarSign size={20} />
                  Competitive Pricing
                </h3>
                <p style={{ color: "var(--text-primary)" }}>
                  Best rates in every city with transparent, no-hidden-fees
                  pricing.
                </p>
              </div>
              <div
                style={{
                  padding: "20px",
                  background: "var(--neutral-700)",
                  borderRadius: "0",
                  border: "1px solid var(--white-alpha-15)",
                  transition: "all 0.3s ease",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--text-primary)",
                  }}
                >
                  <Droplet size={20} />
                  Clean & Sanitized
                </h3>
                <p style={{ color: "var(--text-primary)" }}>
                  Professionally cleaned units before every rental in every city
                  we serve.
                </p>
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ color: "var(--text-primary)" }}>
              Popular Porta Potty Services Across All Cities
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px",
              }}
            >
              {[
                {
                  name: "Construction Sites",
                  link: "/rental-products/construction-porta-potty",
                },
                {
                  name: "Weddings & Events",
                  link: "/rental-products/luxury-restroom-trailer",
                },
                {
                  name: "Corporate Events",
                  link: "/rental-products/deluxe-porta-potty",
                },
                {
                  name: "Festivals & Concerts",
                  link: "/rental-products/standard-porta-potty",
                },
                {
                  name: "Sports Events",
                  link: "/rental-products/ada-compliant-porta-potty",
                },
                {
                  name: "Parks & Recreation",
                  link: "/rental-products/hand-wash-station",
                },
                { name: "Emergency Services", link: "/contact" },
                { name: "Long-term Rentals", link: "/quote" },
              ].map((service) => (
                <Link
                  key={service.name}
                  href={service.link}
                  style={{
                    padding: "15px",
                    border: "1px solid var(--white-alpha-15)",
                    borderRadius: "0",
                    textAlign: "center",
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    background: "var(--neutral-700)",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 10px 0",
                      color: "var(--text-primary)",
                    }}
                  >
                    {service.name}
                  </h4>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "0.9em",
                      color: "var(--text-primary)",
                    }}
                  >
                    Available in all cities →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Related Content Section */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ color: "var(--text-primary)" }}>Related Resources</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              <Link
                href="/blog"
                style={{
                  padding: "20px",
                  border: "1px solid var(--white-alpha-15)",
                  borderRadius: "0",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  transition: "all 0.3s ease",
                  background: "var(--neutral-700)",
                }}
              >
                <h3
                  style={{
                    color: "var(--text-primary)",
                    margin: "0 0 10px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FileText size={20} />
                  Blog & Guides
                </h3>
                <p style={{ margin: "0", color: "var(--text-primary)" }}>
                  Read our comprehensive guides on porta potty rentals, event
                  planning, and construction site requirements.
                </p>
              </Link>
              <Link
                href="/faq"
                style={{
                  padding: "20px",
                  border: "1px solid var(--white-alpha-15)",
                  borderRadius: "0",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  transition: "all 0.3s ease",
                  background: "var(--neutral-700)",
                }}
              >
                <h3
                  style={{
                    color: "var(--text-primary)",
                    margin: "0 0 10px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <HelpCircle size={20} />
                  Frequently Asked Questions
                </h3>
                <p style={{ margin: "0", color: "var(--text-primary)" }}>
                  Find answers to common questions about porta potty rentals,
                  delivery, pricing, and maintenance.
                </p>
              </Link>
              <Link
                href="/gallery"
                style={{
                  padding: "20px",
                  border: "1px solid var(--white-alpha-15)",
                  borderRadius: "0",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  transition: "all 0.3s ease",
                  background: "var(--neutral-700)",
                }}
              >
                <h3
                  style={{
                    color: "var(--text-primary)",
                    margin: "0 0 10px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Camera size={20} />
                  Photo Gallery
                </h3>
                <p style={{ margin: "0", color: "var(--text-primary)" }}>
                  See our porta potty units in action at various events and
                  construction sites across the country.
                </p>
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div
            style={{
              textAlign: "center",
              padding: "80px 18px",
              background: "var(--primary-bg-color)",
              color: "white",
              borderRadius: "0",
            }}
          >
            <div style={{ maxWidth: "960px", margin: "0 auto" }}>
              <h2 style={{ color: "var(--text-primary)" }}>
                Ready to Rent Porta Potties in Your City?
              </h2>
              <p
                style={{
                  fontSize: "1.2em",
                  marginBottom: "30px",
                  color: "var(--text-primary)",
                }}
              >
                Get a free quote for porta potty rental services in your city
                today!
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
                    background: "var(--text-primary)",
                    color: "var(--bg-primary)",
                    padding: "15px 30px",
                    textDecoration: "none",
                    borderRadius: "0",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Free Quote
                </Link>
                <Link
                  href="/contact"
                  style={{
                    background: "var(--primary)",
                    color: "white",
                    padding: "15px 30px",
                    textDecoration: "none",
                    borderRadius: "0",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortaPottyRentalPage;
