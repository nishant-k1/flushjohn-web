import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Construction,
  Calendar,
  MapPin,
  Award,
  AlertCircle,
  DollarSign,
  Phone,
  Home,
  FileText,
  HelpCircle,
  Toilet,
  Truck,
  Droplet,
} from "lucide-react";
import styles from "./styles.module.css";
import Link from "next/link";
import { phone, contact, websiteURL, s3assets } from "@/constants";
import { cityPageData } from "../../../constants";
import { getCityEnhancement } from "../../../constants/cityEnhancements";
import dynamic from "next/dynamic";

const ContentMarketing = dynamic(
  () => import("@/components/SEO/ContentMarketing")
);
const ReviewCollection = dynamic(
  () => import("@/components/SEO/ReviewCollection")
);
const StickyCTA = dynamic(() => import("@/components/StickyCTA"));

interface PortaPottyRentalCityProps {
  city: string;
  displayName: string;
  state: string;
  population: string;
  citySlug: string;
  serviceAreas: Array<{ name: string; description: string }>;
  nearbyCities: Array<{ name: string; displayName: string; state: string }>;
  coordinates: { lat: string; lng: string };
}

export default function PortaPottyRentalCity({
  city,
  displayName,
  state,
  population,
  citySlug,
  serviceAreas,
  nearbyCities,
  coordinates,
}: PortaPottyRentalCityProps) {
  const cityTitle = `${displayName}, ${state}`;
  const { phone_number, phone_link } = phone;
  const enhancements = getCityEnhancement(citySlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Porta Potty Rentals in ${cityTitle}`,
    description: `Professional porta potty rental services in ${cityTitle}. Fast delivery, competitive pricing, and reliable service for events and construction sites.`,
    provider: {
      "@type": "Organization",
      name: "FlushJohn",
      url: websiteURL,
      logo: `${s3assets}/og-image-flushjonn-web.png`,
      areaServed: {
        "@type": "City",
        name: cityTitle,
        containedInPlace: {
          "@type": "State",
          name: state,
        },
      },
    },
    serviceType: "Porta Potty Rental Services",
    areaServed: {
      "@type": "City",
      name: cityTitle,
      containedInPlace: {
        "@type": "State",
        name: state,
      },
    },
    offers: {
      "@type": "Offer",
      description: `Affordable porta potty rental services in ${cityTitle}`,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `FlushJohn Porta Potty Rentals - ${cityTitle}`,
    description: `Professional porta potty rental services in ${cityTitle}. Same-day delivery, competitive pricing, and reliable service for events and construction sites.`,
    url: `${websiteURL}/porta-potty-rental/${citySlug}`,
    telephone: phone.phone_number,
    email: contact.support_email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    hasMap: `https://www.google.com/maps/place/${encodeURIComponent(displayName)},+${state}`,
    openingHours: "Mo-Su 08:00-20:00",
    priceRange: "$$",
    paymentAccepted: [
      "Cash",
      "Credit Card",
      "Debit Card",
      "Check",
      "Online Payment",
    ],
    currenciesAccepted: "USD",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "24/7 Availability",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Same-Day Delivery",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Emergency Service",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Regular Maintenance",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Professional Cleaning",
        value: true,
      },
    ],
    accessibilityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Wheelchair Accessible",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "ADA Compliant Units Available",
        value: true,
      },
    ],
    image: [
      `${s3assets}/og-image-flushjonn-web.png`,
      `${s3assets}/images/porta-potty-standard.jpg`,
      `${s3assets}/images/porta-potty-deluxe.jpg`,
      `${s3assets}/images/porta-potty-ada.jpg`,
      `${s3assets}/images/luxury-restroom-trailer.jpg`,
    ],
    areaServed: {
      "@type": "City",
      name: cityTitle,
      containedInPlace: {
        "@type": "State",
        name: state,
      },
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Porta Potty Rental Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Standard Porta Potty Rental",
            description:
              "Basic portable toilet rental for events and construction",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Deluxe Porta Potty Rental",
            description: "Enhanced portable toilet with additional amenities",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ADA Compliant Porta Potty",
            description:
              "Americans with Disabilities Act compliant portable toilet",
          },
        },
      ],
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
          name: "Sarah M.",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody: `Excellent porta potty service in ${cityTitle}. Clean, professional, and affordable!`,
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Mike R.",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody: `We've been using FlushJohn for our construction projects in ${cityTitle} for 2 years. Reliable and cost-effective.`,
      },
    ],
  };

  // ServiceAreaBusiness schema for better local SEO (service-area business model)
  const serviceAreaBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ServiceAreaBusiness",
    name: `FlushJohn - ${cityTitle}`,
    description: `Professional porta potty rental services in ${cityTitle}. Same-day delivery, competitive pricing, and reliable service for events and construction sites.`,
    url: `${websiteURL}/porta-potty-rental/${citySlug}`,
    telephone: phone.phone_number,
    email: contact.support_email,
    address: {
      "@type": "PostalAddress",
      addressLocality: displayName,
      addressRegion: state,
      addressCountry: "US",
    },
    areaServed: [
      {
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
      },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        },
        geoRadius: "50000",
      },
    ],
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
        name: "Porta Potty Rentals",
        item: `${websiteURL}/porta-potty-rental`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityTitle,
        item: `${websiteURL}/porta-potty-rental/${citySlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceAreaBusinessJsonLd),
        }}
      />

      <div className={styles.city}>
        <div className={styles.container}>
          <div
            className={styles.breadcrumbWrapper}
            style={{ position: "relative" }}
          >
            <div style={{ position: "relative", top: 0 }}>
              <Breadcrumbs path={""} />
            </div>
          </div>

          {/* Hero Section */}
          <div className={styles.heroSection}>
            <h1>Porta Potty Rentals in {cityTitle}</h1>
            <p>
              Serving {population} residents with reliable, clean porta potty
              rental services. Fast delivery, competitive pricing, and
              exceptional customer service.
            </p>

            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <Link
                href="/quote"
                className={styles.ctaButton}
              >
                Get Free Quote
              </Link>
              <a
                href={phone_link}
                className={styles.ctaButtonSecondary}
              >
                Call {phone_number}
              </a>
            </div>
          </div>

          <div className={styles.cityWrapper}>
            {/* Introduction */}
            <div className={styles.section}>
              <h1>{cityPageData?.title.replace("{city}", displayName)}</h1>
              <p>{cityPageData?.description.replace("{city}", displayName)}</p>
            </div>

            {/* Why Choose Us - Features Grid */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h2>
                  Why Choose FlushJohn for Porta Potty Rentals in {displayName}?
                </h2>
              </div>
              <div className={styles.featureGrid}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <Truck size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h3>Fast & Reliable Same-Day Delivery</h3>
                    <p>
                      Quick delivery throughout {displayName} and surrounding
                      areas
                    </p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <Droplet size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h3>Clean & Sanitized</h3>
                    <p>
                      Professionally cleaned portable toilets before every
                      rental
                    </p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <DollarSign size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h3>Affordable Pricing</h3>
                    <p>Competitive rates with no hidden fees or surprises</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <Calendar size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h3>Flexible Plans</h3>
                    <p>Short-term and long-term rental options available</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <Award size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h3>Multiple Options</h3>
                    <p>Events, construction, weddings, and more</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <Phone size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h3>24/7 Support</h3>
                    <p>
                      Round-the-clock customer service for {displayName}{" "}
                      customers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h2>We Serve All Areas in {cityTitle}</h2>
              </div>
              <div className={`${styles.grid} ${styles.gridAutoFit}`}>
                {serviceAreas.map((area) => (
                  <div
                    key={area.name}
                    className={styles.serviceCard}
                  >
                    <h3>{area.name}</h3>
                    <p>{area.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Services */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h2>Our Portable Toilet Rental Services in {displayName}</h2>
              </div>
              <p
                style={{
                  textAlign: "center",
                  maxWidth: "800px",
                  margin: "0 auto 2rem",
                }}
              >
                At FlushJohn, we offer a comprehensive range of portable toilet
                rental solutions tailored to your needs:
              </p>
              <ul className={styles.servicesList}>
                <li>
                  <Construction size={24} />
                  <div>
                    <strong>Construction Site Porta Potties</strong>
                    <p style={{ margin: "0.5rem 0 0" }}>
                      Durable, OSHA-compliant units perfect for construction
                      sites and long-term projects
                    </p>
                  </div>
                </li>
                <li>
                  <Calendar size={24} />
                  <div>
                    <strong>Event Porta Potties</strong>
                    <p style={{ margin: "0.5rem 0 0" }}>
                      Ideal for concerts, festivals, fairs, and large gatherings
                    </p>
                  </div>
                </li>
                <li>
                  <MapPin size={24} />
                  <div>
                    <strong>Outdoor & Camping Toilets</strong>
                    <p style={{ margin: "0.5rem 0 0" }}>
                      Convenient portable solutions for remote locations and
                      outdoor events
                    </p>
                  </div>
                </li>
                <li>
                  <Award size={24} />
                  <div>
                    <strong>Luxury Restroom Trailers</strong>
                    <p style={{ margin: "0.5rem 0 0" }}>
                      Premium facilities perfect for weddings, VIP events, and
                      upscale occasions
                    </p>
                  </div>
                </li>
                <li>
                  <AlertCircle size={24} />
                  <div>
                    <strong>Emergency & Disaster Relief Toilets</strong>
                    <p style={{ margin: "0.5rem 0 0" }}>
                      Quick deployment solutions for emergencies and disaster
                      relief situations
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Popular Services */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h2>Popular Porta Potty Services in {cityTitle}</h2>
              </div>
              <div className={`${styles.grid} ${styles.gridAutoFit}`}>
                {[
                  {
                    name: "Construction Sites",
                    desc: "Long-term rentals for construction projects",
                    link: "/rental-products/standard-porta-potty",
                  },
                  {
                    name: "Weddings",
                    desc: "Elegant portable toilets for special events",
                    link: "/rental-products/luxury-restroom-trailer",
                  },
                  {
                    name: "Corporate Events",
                    desc: "Professional sanitation for business events",
                    link: "/rental-products/deluxe-porta-potty",
                  },
                  {
                    name: "Festivals",
                    desc: "High-capacity solutions for large gatherings",
                    link: "/rental-products/standard-porta-potty",
                  },
                  {
                    name: "Sports Events",
                    desc: "Durable units for athletic competitions",
                    link: "/rental-products/standard-porta-potty",
                  },
                  {
                    name: "Concerts",
                    desc: "Heavy-duty porta potties for music events",
                    link: "/rental-products/standard-porta-potty",
                  },
                ].map((service) => (
                  <div
                    key={service.name}
                    className={styles.card}
                  >
                    <h3>{service.name}</h3>
                    <p>{service.desc}</p>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      <Link
                        href={service.link}
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--primary-light)",
                        }}
                      >
                        View Products →
                      </Link>
                      <Link
                        href="/quote"
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--primary-light)",
                        }}
                      >
                        Get Quote →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              {/* Mid-content CTA */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "2rem",
                  padding: "1.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <p style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
                  Need porta potty rental services in {displayName}? Get a free
                  quote today!
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Link
                    href="/quote"
                    className={styles.ctaButton}
                  >
                    Get Free Quote
                  </Link>
                  <a
                    href={phone_link}
                    className={styles.ctaButtonSecondary}
                  >
                    Call {phone_number}
                  </a>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h2>
                  How Much Does a Porta Potty Rental Cost in {displayName}?
                </h2>
              </div>
              <p
                style={{
                  textAlign: "center",
                  maxWidth: "800px",
                  margin: "0 auto 2rem",
                }}
              >
                Porta potty rental prices in {displayName} vary based on the
                rental duration, unit type, and location. We provide competitive
                pricing for both short-term and long-term rentals with
                transparent, no-hidden-fee pricing.
              </p>
              <div style={{ textAlign: "center" }}>
                <Link
                  href="/quote"
                  className={styles.ctaButton}
                >
                  <DollarSign
                    size={20}
                    style={{ marginRight: "8px", verticalAlign: "middle" }}
                  />
                  Get an Instant Free Quote
                </Link>
              </div>
            </div>

            {/* Local Testimonials */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h2>What {cityTitle} Customers Say</h2>
              </div>
              <div className={`${styles.grid} ${styles.gridAutoFitWide}`}>
                {[
                  {
                    name: "Sarah M.",
                    location: "Downtown",
                    text: `FlushJohn provided excellent service for our wedding in downtown ${cityTitle}. Clean, professional, and affordable!`,
                  },
                  {
                    name: "Mike R.",
                    location: "Construction Site",
                    text: `We've been using FlushJohn for our construction projects in ${cityTitle} for 2 years. Reliable and cost-effective.`,
                  },
                  {
                    name: "Jennifer L.",
                    location: "Event Venue",
                    text: "Great porta potty service for our corporate event. The team was professional and the units were spotless.",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className={styles.testimonialCard}
                  >
                    <p>"{testimonial.text}"</p>
                    <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                      - {testimonial.name}, {testimonial.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h2>Frequently Asked Questions - {cityTitle}</h2>
              </div>
              <div className={styles.grid}>
                {[
                  {
                    q: `How much does porta potty rental cost in ${cityTitle}?`,
                    a: `Our porta potty rental prices in ${cityTitle} vary based on location, duration, and unit type. Contact us for a personalized quote.`,
                  },
                  {
                    q: `Do you deliver to all areas in ${cityTitle}?`,
                    a: `Yes! We provide porta potty delivery throughout ${cityTitle} and surrounding areas. Same-day delivery available.`,
                  },
                  {
                    q: `How often are the porta potties cleaned?`,
                    a: `We clean and service our porta potties regularly, typically weekly, with additional cleaning available upon request.`,
                  },
                  {
                    q: `What types of events do you serve in ${cityTitle}?`,
                    a: `We serve all types of events in ${cityTitle}: weddings, construction sites, festivals, corporate events, and more.`,
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className={styles.card}
                  >
                    <h3>{faq.q}</h3>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Cities */}
            {nearbyCities.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <h2>We Also Serve These Nearby Areas</h2>
                </div>
                <div className={`${styles.grid} ${styles.gridAutoFitNarrow}`}>
                  {nearbyCities.map((nearbyCity) => (
                    <Link
                      key={nearbyCity.name}
                      href={`/porta-potty-rental/${nearbyCity.name}`}
                      className={styles.cityCard}
                    >
                      <h4
                        style={{
                          margin: "0 0 5px 0",
                          color: "var(--primary-bg-color)",
                        }}
                      >
                        {nearbyCity.displayName}, {nearbyCity.state}
                      </h4>
                      <p style={{ margin: "0", fontSize: "0.9em" }}>
                        Porta potty rental services →
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Local Landmarks Section */}
            {enhancements.landmarks.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <h2>
                    Porta Potty Rentals Near Popular {displayName} Landmarks
                  </h2>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    maxWidth: "800px",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  We provide porta potty rental services throughout{" "}
                  {displayName}, including areas near major landmarks and
                  attractions. Whether you need{" "}
                  <Link
                    href="/rental-products/standard-porta-potty"
                    style={{
                      color: "var(--primary-light)",
                      textDecoration: "underline",
                    }}
                  >
                    standard porta potties
                  </Link>
                  ,{" "}
                  <Link
                    href="/rental-products/luxury-restroom-trailer"
                    style={{
                      color: "var(--primary-light)",
                      textDecoration: "underline",
                    }}
                  >
                    luxury restroom trailers
                  </Link>
                  , or{" "}
                  <Link
                    href="/rental-products/ada-compliant-portable-toilet"
                    style={{
                      color: "var(--primary-light)",
                      textDecoration: "underline",
                    }}
                  >
                    ADA-compliant units
                  </Link>
                  , we've got you covered.
                </p>
                <div className={`${styles.grid} ${styles.gridAutoFit}`}>
                  {enhancements.landmarks.slice(0, 6).map((landmark) => (
                    <div
                      key={landmark}
                      className={styles.card}
                    >
                      <MapPin
                        size={24}
                        style={{
                          marginBottom: "0.5rem",
                          color: "var(--primary-light)",
                        }}
                      />
                      <h3>{landmark}</h3>
                      <p>Porta potty rentals available in this area</p>
                      <Link
                        href="/quote"
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--primary-light)",
                          marginTop: "0.5rem",
                          display: "inline-block",
                        }}
                      >
                        Get Quote →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Local Events Section */}
            {enhancements.events.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <h2>Porta Potty Rentals for {displayName} Events</h2>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    maxWidth: "800px",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  We've provided porta potty rental services for major events
                  and festivals in {displayName}. Let us help make your event a
                  success! View our{" "}
                  <Link
                    href="/rental-products"
                    style={{
                      color: "var(--primary-light)",
                      textDecoration: "underline",
                    }}
                  >
                    full range of portable toilet rental options
                  </Link>{" "}
                  or check out other cities we serve like{" "}
                  {nearbyCities.length > 0
                    ? nearbyCities.slice(0, 2).map((nc, idx) => (
                        <React.Fragment key={nc.name}>
                          <Link
                            href={`/porta-potty-rental/${nc.name}`}
                            style={{
                              color: "var(--primary-light)",
                              textDecoration: "underline",
                            }}
                          >
                            {nc.displayName}
                          </Link>
                          {idx < Math.min(nearbyCities.length, 2) - 1
                            ? ", "
                            : ""}
                        </React.Fragment>
                      ))
                    : ""}
                  .
                </p>
                <div className={`${styles.grid} ${styles.gridAutoFit}`}>
                  {enhancements.events.slice(0, 6).map((event) => (
                    <div
                      key={event}
                      className={styles.card}
                    >
                      <Calendar
                        size={24}
                        style={{
                          marginBottom: "0.5rem",
                          color: "var(--primary-light)",
                        }}
                      />
                      <h3>{event}</h3>
                      <p>Professional porta potty services for this event</p>
                      <Link
                        href="/quote"
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--primary-light)",
                          marginTop: "0.5rem",
                          display: "inline-block",
                        }}
                      >
                        Request Quote →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Neighborhoods Section */}
            {enhancements.neighborhoods.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <h2>Porta Potty Rentals in {displayName} Neighborhoods</h2>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    maxWidth: "800px",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  We serve neighborhoods throughout {displayName} with reliable
                  porta potty rental services.
                </p>
                <div className={`${styles.grid} ${styles.gridAutoFitNarrow}`}>
                  {enhancements.neighborhoods.map((neighborhood) => (
                    <div
                      key={neighborhood}
                      className={styles.card}
                    >
                      <Home
                        size={20}
                        style={{
                          marginBottom: "0.5rem",
                          color: "var(--primary-light)",
                        }}
                      />
                      <h4>{neighborhood}</h4>
                      <p style={{ fontSize: "0.9em", margin: 0 }}>
                        Serving this area
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regulations Section */}
            {enhancements.regulations.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <h2>
                    {displayName} Porta Potty Rental Regulations & Compliance
                  </h2>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    maxWidth: "800px",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  We ensure all porta potty rentals comply with local{" "}
                  {displayName} and {state} regulations.
                </p>
                <div className={`${styles.grid} ${styles.gridAutoFit}`}>
                  {enhancements.regulations.map((regulation, index) => (
                    <div
                      key={index}
                      className={styles.card}
                    >
                      <FileText
                        size={24}
                        style={{
                          marginBottom: "0.5rem",
                          color: "var(--primary-light)",
                        }}
                      />
                      <h3>Compliance Requirement</h3>
                      <p>{regulation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* City-Specific FAQs */}
            {enhancements.faqs.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <h2>
                    Frequently Asked Questions About Porta Potty Rentals in{" "}
                    {displayName}
                  </h2>
                </div>
                <div className={`${styles.grid} ${styles.gridAutoFit}`}>
                  {enhancements.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className={styles.card}
                    >
                      <HelpCircle
                        size={24}
                        style={{
                          marginBottom: "0.5rem",
                          color: "var(--primary-light)",
                        }}
                      />
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action Section */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h2>Rent a Porta Potty in {displayName} Today!</h2>
              </div>
              <p
                style={{
                  textAlign: "center",
                  maxWidth: "800px",
                  margin: "0 auto 2rem",
                }}
              >
                Whether you need a porta potty for a construction project, a
                wedding, or an outdoor event, FlushJohn is your go-to provider
                in {displayName}. We ensure clean, reliable, and hassle-free
                rentals with exceptional customer service.
              </p>
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Link
                    href="/contact"
                    className={styles.ctaButton}
                  >
                    <Phone
                      size={20}
                      style={{ marginRight: "8px", verticalAlign: "middle" }}
                    />
                    Contact Us
                  </Link>
                  <Link
                    href="/quote"
                    className={styles.ctaButtonSecondary}
                  >
                    Get a Free Quote
                  </Link>
                </div>
                <p style={{ marginTop: "1.5rem", fontSize: "1.1rem" }}>
                  Or call us directly at{" "}
                  <Link
                    href={phone.phone_link}
                    style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                  >
                    {phone.phone_number}
                  </Link>
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <div className={styles.finalCTA}>
              <div style={{ maxWidth: "980px", margin: "0 auto" }}>
                <h2>Ready to Rent Porta Potties in {cityTitle}?</h2>
                <p style={{ fontSize: "1.2em", marginBottom: "30px" }}>
                  Join thousands of satisfied customers in {cityTitle}. Get your
                  free quote today!
                </p>
                <div className={styles.ctaButtons}>
                  <Link
                    href="/quote"
                    className={styles.finalCTAButton}
                  >
                    Get Free Quote
                  </Link>
                  <a
                    href={phone_link}
                    className={styles.ctaButtonSecondary}
                  >
                    Call {phone_number}
                  </a>
                </div>
              </div>
            </div>

            {/* Explore More Section */}
            <div className={styles.exploreSection}>
              <h3>Explore More</h3>
              <ul className={styles.exploreLinks}>
                <li>
                  <Link href="/">
                    <Home size={20} />
                    <span>Visit Homepage</span>
                  </Link>
                </li>
                <li>
                  <Link href="/quote">
                    <DollarSign size={20} />
                    <span>Get a Free Quote</span>
                  </Link>
                </li>
                <li>
                  <Link href="/rental-products">
                    <Toilet size={20} />
                    <span>View All Rental Services</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <FileText size={20} />
                    <span>View Our Blog</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <HelpCircle size={20} />
                    <span>Porta Potty Rental FAQs</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <Phone size={20} />
                    <span>Contact Us</span>
                  </Link>
                </li>
                <li>
                  <Link href={phone.phone_link}>
                    <Phone size={20} />
                    <span>Call Us Now</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Content Marketing Section */}
          <ContentMarketing
            city={displayName}
            state={state}
          />

          {/* Review Collection Section */}
          <ReviewCollection
            city={displayName}
            state={state}
          />
        </div>
      </div>

      {/* Sticky CTA */}
      <StickyCTA
        city={displayName}
        state={state}
      />
    </>
  );
}
