import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { s3assets, websiteURL } from "@/constants";
import Link from "next/link";
import styles from "./styles.module.css";
import {
  getCityCoordinatesWithFallback,
  citiesData,
  getServiceCityUniqueContent,
} from "@/features/locations/constants";
import {
  servicesData,
  SERVICES,
} from "@/features/locations/constants/services";
import { getStateSlugFromAbbreviation } from "@/utils";

export async function generateStaticParams() {
  const params: Array<{ city: string; service: string }> = [];

  citiesData.forEach((city) => {
    SERVICES.forEach((service) => {
      params.push({ city: city.name, service });
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city, service } = await params;
  const cityData = citiesData.find((c) => c.name === city);
  const serviceData = servicesData[service as keyof typeof servicesData];

  if (!cityData || !serviceData) {
    return {
      title: "Service Not Found - FlushJohn",
    };
  }

  const { displayName, state } = cityData;
  const cityTitle = `${displayName}, ${state}`;
  const coordinates = getCityCoordinatesWithFallback(city);

  const metadata: Metadata = {
    title: `${serviceData.title} in ${cityTitle} | FlushJohn`,
    description: `Affordable ${serviceData.description.toLowerCase()} & portable toilet in ${cityTitle}. Professional porta john & portable restroom. Free quote!`,
    keywords: `${service} porta potty rental ${displayName}, ${service} portable toilet rental ${cityTitle}, ${service} porta john rental ${displayName}, ${service} portable restroom rental ${cityTitle}, ${service} hand wash station rental ${displayName}, ${service} hand washing sink station rental ${cityTitle}, ${service} portable sink rental ${displayName}, rent ${service} porta potty ${cityTitle}, rent ${service} portable toilet ${displayName}, rent ${service} hand wash station ${cityTitle}, ${service} porta potty rental near me ${displayName}, ${service} portable toilet rental near me ${cityTitle}, ${service} hand wash station rental near me ${displayName}, ${service} porta potty rental service ${cityTitle}, ${service} portable toilet rental service ${displayName}, ${service} hand wash station rental service ${cityTitle}, ${service} porta potty rental company ${displayName}, ${service} portable toilet rental company ${cityTitle}, ${service} porta potty rental cost ${displayName}, ${service} portable toilet rental cost ${cityTitle}, ${service} hand wash station rental cost ${displayName}, ${service} porta potty rental price ${cityTitle}, ${service} portable toilet rental price ${displayName}, ${service} porta potty rental delivery ${cityTitle}, ${service} portable toilet rental delivery ${displayName}, ${service} hand wash station rental delivery ${cityTitle}, ${service} ADA porta potty rental ${displayName}, ${service} luxury porta potty rental ${cityTitle}, ${service} emergency porta potty rental ${displayName}, ${service} same day porta potty rental ${cityTitle}, ${service} long term porta potty rental ${displayName}, ${service} porta potty rental for construction ${cityTitle}, ${service} portable toilet rental for construction ${displayName}, ${service} hand wash station rental for construction ${cityTitle}, ${service} porta potty rental for events ${displayName}, ${service} portable toilet rental for events ${cityTitle}, ${service} hand wash station rental for events ${displayName}, ${service} porta potty rental for wedding ${cityTitle}, ${service} portable toilet rental for wedding ${displayName}, how much does ${service} porta potty rental cost ${cityTitle}, how much to rent ${service} porta potty ${displayName}, ${service} porta potty rental quote ${cityTitle}, ${service} portable toilet rental quote ${displayName}, ${service} hand wash station rental quote ${cityTitle}, best ${service} porta potty rental ${displayName}, affordable ${service} porta potty rental ${cityTitle}, professional ${service} porta potty rental ${displayName}`,
    other: {
      "geo.region": `US-${state}`,
      "geo.placename": displayName,
      "geo.position": `${coordinates.lat};${coordinates.lng}`,
      ICBM: `${coordinates.lat}, ${coordinates.lng}`,
      dateModified: new Date().toISOString(),
    },
    openGraph: {
      title: `${serviceData.title} in ${cityTitle} | FlushJohn`,
      description: `Affordable ${serviceData.description.toLowerCase()} and portable toilet rental services in ${cityTitle}. Professional porta john and portable restroom options. Get your free quote today!`,
      url: `${websiteURL}/porta-potty-rental/${city}/${service}`,
      type: "website",
      siteName: "FlushJohn",
      images: [
        {
          url: `${s3assets}/og-image-flushjonn-web.png`,
          height: 630,
          width: 1200,
          alt: `${serviceData.title} in ${cityTitle}`,
        },
      ],
    },
    alternates: {
      canonical: `${websiteURL}/porta-potty-rental/${city}/${service}`,
    },
  };

  return metadata;
}

const ServiceCityPage = async ({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) => {
  const { city, service } = await params;
  const cityData = citiesData.find((c) => c.name === city);
  const serviceData = servicesData[service as keyof typeof servicesData];

  if (!cityData || !serviceData) {
    notFound();
  }

  const { displayName, state } = cityData;
  const cityTitle = `${displayName}, ${state}`;
  const coordinates = getCityCoordinatesWithFallback(city);
  const stateSlug = getStateSlugFromAbbreviation(state);

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
        name: `${state} Porta Potty Rentals`,
        item: `${websiteURL}/service-areas/${stateSlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${displayName} Porta Potty Rentals`,
        item: `${websiteURL}/porta-potty-rental/${city}`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: serviceData.title,
        item: `${websiteURL}/porta-potty-rental/${city}/${service}`,
      },
    ],
  };

  // Event schema for event-specific service pages
  const eventJsonLd =
    service === "events" || service === "weddings"
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: `${serviceData.title} in ${cityTitle}`,
          description: `${serviceData.description} in ${cityTitle}. Professional porta potty rental services for your event.`,
          location: {
            "@type": "Place",
            name: cityTitle,
            address: {
              "@type": "PostalAddress",
              addressLocality: displayName,
              addressRegion: state,
              addressCountry: "US",
            },
          },
          organizer: {
            "@type": "Organization",
            name: "FlushJohn",
            url: websiteURL,
          },
          offers: {
            "@type": "Offer",
            url: `${websiteURL}/quote`,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        }
      : null;

  // Enhanced Service schema for service-specific pages
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceData.title} in ${cityTitle}`,
    description: `${serviceData.description} in ${cityTitle}. Professional porta potty rental services with same-day delivery.`,
    provider: {
      "@type": "Organization",
      name: "FlushJohn",
      url: websiteURL,
      address: {
        "@type": "PostalAddress",
        addressLocality: displayName,
        addressRegion: state,
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: displayName,
      containedIn: {
        "@type": "State",
        name: state,
        containedIn: {
          "@type": "Country",
          name: "United States",
        },
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
    },
    serviceType: "Porta Potty Rental Services",
    offers: {
      "@type": "Offer",
      url: `${websiteURL}/quote`,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      areaServed: {
        "@type": "City",
        name: displayName,
        containedIn: {
          "@type": "State",
          name: state,
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Customer Reviews",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4.8",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody: `FlushJohn provides excellent ${serviceData.title.toLowerCase()} in ${cityTitle}. Professional, reliable, and affordable service with fast delivery.`,
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Satisfied Customer",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody: `Outstanding ${serviceData.title.toLowerCase()} service in ${cityTitle}. Clean units, prompt delivery, and great customer service. Highly recommended!`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {eventJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      )}
      <div className={styles.page}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span> / </span>
            <Link href={`/porta-potty-rental/${city}`}>
              {cityTitle} Porta Potty Rentals
            </Link>
            <span> / </span>
            <span>{serviceData.title}</span>
          </nav>

          <div className={styles.header}>
            <h1>
              {serviceData.title} in {cityTitle}
            </h1>
            {(() => {
              const uniqueContent = getServiceCityUniqueContent(
                city,
                service as "construction" | "events" | "weddings"
              );
              return uniqueContent ? (
                <p
                  className={styles.description}
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    marginTop: "1rem",
                  }}
                >
                  {uniqueContent.introduction}
                </p>
              ) : (
                <p className={styles.description}>
                  {serviceData.description} in {cityTitle}.
                </p>
              );
            })()}
          </div>

          <div className={styles.content}>
            {(() => {
              const uniqueContent = getServiceCityUniqueContent(
                city,
                service as "construction" | "events" | "weddings"
              );
              if (uniqueContent) {
                return (
                  <>
                    <div className={styles.features}>
                      <h2>
                        Why Choose FlushJohn for {serviceData.title} in{" "}
                        {displayName}?
                      </h2>
                      <p
                        style={{
                          fontSize: "1.05rem",
                          lineHeight: "1.7",
                          marginBottom: "1.5rem",
                        }}
                      >
                        {uniqueContent.whyChooseUs}
                      </p>
                    </div>

                    <div className={styles.features}>
                      <h2>
                        Our {serviceData.title} Services in {displayName}
                      </h2>
                      <p
                        style={{
                          fontSize: "1.05rem",
                          lineHeight: "1.7",
                          marginBottom: "1.5rem",
                        }}
                      >
                        {uniqueContent.serviceOverview}
                      </p>
                      <h3 style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
                        What We Offer
                      </h3>
                      <ul>
                        {serviceData.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.features}>
                      <h2>Local Examples in {displayName}</h2>
                      <p
                        style={{
                          fontSize: "1.05rem",
                          lineHeight: "1.7",
                          marginBottom: "1.5rem",
                        }}
                      >
                        {uniqueContent.localExamples}
                      </p>
                    </div>

                    <div className={styles.cta}>
                      <h2>Get Started Today</h2>
                      <p>
                        Contact us for a free quote on{" "}
                        {serviceData.title.toLowerCase()} in {cityTitle}.
                      </p>
                      <div className={styles.buttons}>
                        <Link
                          href="/quote"
                          className={styles.primaryButton}
                        >
                          Get Free Quote
                        </Link>
                        <Link
                          href={serviceData.productLink}
                          className={styles.secondaryButton}
                        >
                          View Products
                        </Link>
                        <Link
                          href={`/porta-potty-rental/${city}`}
                          className={styles.linkButton}
                        >
                          View All {displayName} Services
                        </Link>
                      </div>
                    </div>
                  </>
                );
              }
              // Fallback to original template if no unique content
              return (
                <>
                  <div className={styles.features}>
                    <h2>What We Offer</h2>
                    <ul>
                      {serviceData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.cta}>
                    <h2>Get Started Today</h2>
                    <p>
                      Contact us for a free quote on{" "}
                      {serviceData.title.toLowerCase()} in {cityTitle}.
                    </p>
                    <div className={styles.buttons}>
                      <Link
                        href="/quote"
                        className={styles.primaryButton}
                      >
                        Get Free Quote
                      </Link>
                      <Link
                        href={serviceData.productLink}
                        className={styles.secondaryButton}
                      >
                        View Products
                      </Link>
                      <Link
                        href={`/porta-potty-rental/${city}`}
                        className={styles.linkButton}
                      >
                        View All {displayName} Services
                      </Link>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCityPage;
