import React from "react";
import Link from "next/link";
import Script from "next/script";
import { websiteURL, phone, contact, s3assets } from "@/constants";
import {
  getStateUniqueContent,
  generateStateServices,
  generateStateFeatures,
  generateStateCTADescription,
} from "@/features/locations/constants";
import styles from "./styles.module.css";

interface City {
  name: string;
  slug: string;
  population: string;
}

interface StateProps {
  state: {
    name: string;
    abbreviation: string;
    displayName: string;
    cities: City[];
    description: string;
  };
}

const StateHubPage = ({ state }: StateProps) => {
  const uniqueContent = getStateUniqueContent(state.name.toLowerCase());
  
  // Generate state-specific content
  const stateServices = generateStateServices(state, uniqueContent);
  const stateFeatures = generateStateFeatures(state);
  const ctaDescription = generateStateCTADescription(state);
  // ServiceAreaBusiness schema for state-level local SEO
  const serviceAreaBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ServiceAreaBusiness",
    name: `FlushJohn - ${state.displayName}`,
    description: state.description,
    url: `${websiteURL}/service-areas/${state.name.toLowerCase()}`,
    telephone: phone.phone_number,
    email: contact.support_email,
    address: {
      "@type": "PostalAddress",
      addressRegion: state.abbreviation,
      addressCountry: "US",
    },
    areaServed: state.cities.map((city) => ({
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
    serviceType: "Porta Potty Rental Services",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `FlushJohn Porta Potty Rentals - ${state.displayName}`,
    description: state.description,
    url: `${websiteURL}/service-areas/${state.name.toLowerCase()}`,
    telephone: phone.phone_number,
    areaServed: {
      "@type": "State",
      name: state.name,
      containedIn: {
        "@type": "Country",
        name: "United States",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
  };

  return (
    <>
      <Script
        id="state-service-area-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceAreaBusinessJsonLd),
        }}
      />
      <Script
        id="state-local-business-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Porta Potty Rentals in {state.displayName}
          </h1>
          {uniqueContent ? (
            <p className={styles.description} style={{ fontSize: '1.1rem', lineHeight: '1.8', marginTop: '1rem' }}>
              {uniqueContent.expandedDescription}
            </p>
          ) : (
            <p className={styles.description}>{state.description}</p>
          )}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{state.cities.length}</span>
              <span className={styles.statLabel}>
                {state.cities.length === 1 ? "City" : "Cities"} in {state.displayName}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Mile Coverage in {state.abbreviation}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Service in {state.displayName}</span>
            </div>
          </div>
        </div>

        <div className={styles.citiesSection}>
          <h2 className={styles.sectionTitle}>
            Cities We Serve in {state.displayName}
          </h2>
          <div className={styles.citiesGrid}>
            {state.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/porta-potty-rental/${city.slug}`}
                className={styles.cityCard}
                prefetch={true}
              >
                <h3 className={styles.cityName}>{city.name}</h3>
                <p className={styles.cityPopulation}>Population: {city.population}</p>
                <span className={styles.viewLink}>View Services →</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.servicesSection}>
          <h2 className={styles.sectionTitle}>Our Services in {state.displayName}</h2>
          {uniqueContent && (
            <div style={{ marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '900px', margin: '0 auto 2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Construction Site Rentals</h3>
                <p>{uniqueContent.constructionOverview}</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Event & Festival Rentals</h3>
                <p>{uniqueContent.eventsOverview}</p>
              </div>
              {uniqueContent.localRegulations && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Local Regulations & Compliance</h3>
                  <p>{uniqueContent.localRegulations}</p>
                </div>
              )}
            </div>
          )}
          <div className={styles.servicesGrid}>
            {stateServices.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaDescription}>
            {ctaDescription}
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/quote" className={styles.quoteButton}>
              Request a Quote
            </Link>
            <Link href="/contact" className={styles.contactButton}>
              Contact Us
            </Link>
          </div>
        </div>

        <div className={styles.backLink}>
          <Link href="/service-areas">← View All Service Areas</Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default StateHubPage;

