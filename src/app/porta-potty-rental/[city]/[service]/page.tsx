import React from "react";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";
import Link from "next/link";
import styles from "./styles.module.css";

// Helper function to get city coordinates
const getCityCoordinates = (cityName: string) => {
  const coordinates: Record<string, { lat: string; lng: string }> = {
    dover: { lat: "39.1615", lng: "-75.5268" },
    houston: { lat: "29.7604", lng: "-95.3698" },
    dallas: { lat: "32.7767", lng: "-96.7970" },
    austin: { lat: "30.2672", lng: "-97.7431" },
    "san-antonio": { lat: "29.4241", lng: "-98.4936" },
    "fort-worth": { lat: "32.7555", lng: "-97.3308" },
    miami: { lat: "25.7617", lng: "-80.1918" },
    orlando: { lat: "28.5383", lng: "-81.3792" },
    tampa: { lat: "27.9506", lng: "-82.4572" },
    jacksonville: { lat: "30.3322", lng: "-81.6557" },
    "fort-lauderdale": { lat: "26.1224", lng: "-80.1373" },
    "los-angeles": { lat: "34.0522", lng: "-118.2437" },
    "san-diego": { lat: "32.7157", lng: "-117.1611" },
    sacramento: { lat: "38.5816", lng: "-121.4944" },
    "san-jose": { lat: "37.3382", lng: "-121.8863" },
    fresno: { lat: "36.7378", lng: "-119.7871" },
    atlanta: { lat: "33.7490", lng: "-84.3880" },
    savannah: { lat: "32.0835", lng: "-81.0998" },
    augusta: { lat: "33.4735", lng: "-82.0105" },
    macon: { lat: "32.8407", lng: "-83.6324" },
    columbus: { lat: "32.4610", lng: "-84.9877" },
    chicago: { lat: "41.8781", lng: "-87.6298" },
    springfield: { lat: "39.7817", lng: "-89.6501" },
    peoria: { lat: "40.6936", lng: "-89.5890" },
    rockford: { lat: "42.2711", lng: "-89.0940" },
    naperville: { lat: "41.7508", lng: "-88.1535" },
  };
  return coordinates[cityName] || { lat: "39.8283", lng: "-98.5795" };
};

const cities = [
  { name: "dover", displayName: "Dover", state: "DE" },
  { name: "houston", displayName: "Houston", state: "TX" },
  { name: "dallas", displayName: "Dallas", state: "TX" },
  { name: "austin", displayName: "Austin", state: "TX" },
  { name: "san-antonio", displayName: "San Antonio", state: "TX" },
  { name: "fort-worth", displayName: "Fort Worth", state: "TX" },
  { name: "miami", displayName: "Miami", state: "FL" },
  { name: "orlando", displayName: "Orlando", state: "FL" },
  { name: "tampa", displayName: "Tampa", state: "FL" },
  { name: "jacksonville", displayName: "Jacksonville", state: "FL" },
  { name: "fort-lauderdale", displayName: "Fort Lauderdale", state: "FL" },
  { name: "los-angeles", displayName: "Los Angeles", state: "CA" },
  { name: "san-diego", displayName: "San Diego", state: "CA" },
  { name: "sacramento", displayName: "Sacramento", state: "CA" },
  { name: "san-jose", displayName: "San Jose", state: "CA" },
  { name: "fresno", displayName: "Fresno", state: "CA" },
  { name: "atlanta", displayName: "Atlanta", state: "GA" },
  { name: "savannah", displayName: "Savannah", state: "GA" },
  { name: "augusta", displayName: "Augusta", state: "GA" },
  { name: "macon", displayName: "Macon", state: "GA" },
  { name: "columbus", displayName: "Columbus", state: "GA" },
  { name: "chicago", displayName: "Chicago", state: "IL" },
  { name: "springfield", displayName: "Springfield", state: "IL" },
  { name: "peoria", displayName: "Peoria", state: "IL" },
  { name: "rockford", displayName: "Rockford", state: "IL" },
  { name: "naperville", displayName: "Naperville", state: "IL" },
];

const services = {
  construction: {
    title: "Construction Site Porta Potty Rentals",
    description: "Professional porta potty rentals for construction sites",
    productLink: "/rental-products/standard-porta-potty",
    features: [
      "OSHA-compliant units",
      "Long-term rental options",
      "Regular maintenance & servicing",
      "Durable construction-grade units",
    ],
  },
  events: {
    title: "Event Porta Potty Rentals",
    description: "Portable toilet rentals for festivals, concerts, and large gatherings",
    productLink: "/rental-products/deluxe-porta-potty",
    features: [
      "High-capacity units",
      "Fast setup & delivery",
      "Event-grade sanitation",
      "Multiple unit options",
    ],
  },
  weddings: {
    title: "Wedding Porta Potty Rentals",
    description: "Elegant portable restroom solutions for weddings",
    productLink: "/rental-products/luxury-restroom-trailer",
    features: [
      "Luxury restroom trailers",
      "Elegant interior design",
      "Climate-controlled units",
      "Premium amenities",
    ],
  },
};

export async function generateStaticParams() {
  const params: Array<{ city: string; service: string }> = [];
  
  cities.forEach((city) => {
    Object.keys(services).forEach((service) => {
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
  const cityData = cities.find((c) => c.name === city);
  const serviceData = services[service as keyof typeof services];

  if (!cityData || !serviceData) {
    return {
      title: "Service Not Found - FlushJohn",
    };
  }

  const { displayName, state } = cityData;
  const cityTitle = `${displayName}, ${state}`;
  const coordinates = getCityCoordinates(city);

  const metadata: Metadata = {
    title: `${serviceData.title} in ${cityTitle} | FlushJohn`,
    description: `${serviceData.description} in ${cityTitle}. Professional service, competitive pricing, and reliable delivery. Get your free quote today!`,
    keywords: `${service} porta potty ${displayName}, ${service} portable toilet ${cityTitle}, ${displayName} ${service} porta potty rental`,
    other: {
      "geo.region": `US-${state}`,
      "geo.placename": displayName,
      "geo.position": `${coordinates.lat};${coordinates.lng}`,
      "ICBM": `${coordinates.lat}, ${coordinates.lng}`,
      "dateModified": new Date().toISOString(),
    },
    openGraph: {
      title: `${serviceData.title} in ${cityTitle} | FlushJohn`,
      description: `${serviceData.description} in ${cityTitle}. Get your free quote today!`,
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
  const cityData = cities.find((c) => c.name === city);
  const serviceData = services[service as keyof typeof services];

  if (!cityData || !serviceData) {
    return <div>Page not found</div>;
  }

  const { displayName, state } = cityData;
  const cityTitle = `${displayName}, ${state}`;
  const coordinates = getCityCoordinates(city);
  const stateSlug = state.toLowerCase();

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
        item: `${websiteURL}/service-areas/${stateSlug === "de" ? "delaware" : stateSlug === "tx" ? "texas" : stateSlug === "fl" ? "florida" : stateSlug === "ca" ? "california" : stateSlug === "ga" ? "georgia" : "illinois"}`,
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
  const eventJsonLd = service === "events" || service === "weddings" ? {
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
  } : null;

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
          <Link href={`/porta-potty-rental/${city}`}>{cityTitle} Porta Potty Rentals</Link>
          <span> / </span>
          <span>{serviceData.title}</span>
        </nav>

        <div className={styles.header}>
          <h1>{serviceData.title} in {cityTitle}</h1>
          <p className={styles.description}>{serviceData.description} in {cityTitle}.</p>
        </div>

        <div className={styles.content}>
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
            <p>Contact us for a free quote on {serviceData.title.toLowerCase()} in {cityTitle}.</p>
            <div className={styles.buttons}>
              <Link href="/quote" className={styles.primaryButton}>
                Get Free Quote
              </Link>
              <Link href={serviceData.productLink} className={styles.secondaryButton}>
                View Products
              </Link>
              <Link href={`/porta-potty-rental/${city}`} className={styles.linkButton}>
                View All {displayName} Services
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ServiceCityPage;

