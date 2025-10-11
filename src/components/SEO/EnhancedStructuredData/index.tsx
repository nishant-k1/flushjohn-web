/**
 * Enhanced Structured Data Component
 *
 * Comprehensive Schema.org structured data for maximum SEO and AI discoverability.
 * This component generates multiple interconnected schema types.
 */

import React from "react";
import Script from "next/script";
import { websiteURL, phone, contact, s3assets } from "@/constants";

interface EnhancedStructuredDataProps {
  pageType?: "homepage" | "city" | "product" | "blog" | "faq" | "contact";
  city?: string;
  state?: string;
  cityDisplayName?: string;
  productName?: string;
  productDescription?: string;
  latitude?: string;
  longitude?: string;
  blogTitle?: string;
  blogContent?: string;
  blogAuthor?: string;
  publishDate?: string;
}

export default function EnhancedStructuredData({
  pageType = "homepage",
  city,
  state,
  cityDisplayName,
  productName,
  productDescription,
  latitude,
  longitude,
  blogTitle,
  blogContent,
  blogAuthor,
  publishDate,
}: EnhancedStructuredDataProps) {
  // Base Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${websiteURL}#organization`,
    name: "FlushJohn",
    legalName: "FlushJohn LLC",
    url: websiteURL,
    logo: {
      "@type": "ImageObject",
      "@id": `${websiteURL}#logo`,
      url: `${s3assets}/og-image-flushjonn-web.png`,
      width: 1200,
      height: 630,
      caption: "FlushJohn Porta Potty Rentals",
    },
    image: {
      "@type": "ImageObject",
      url: `${s3assets}/og-image-flushjonn-web.png`,
      width: 1200,
      height: 630,
    },
    description:
      "FlushJohn is a leading porta potty rental company providing professional portable toilet services across the United States. We serve construction sites, events, weddings, festivals, and more with same-day delivery and competitive pricing.",
    foundingDate: "2020",
    slogan: "Professional Porta Potty Rentals - Fast, Reliable, Affordable",
    telephone: phone.phone_number,
    email: contact.support_email,
    areaServed: [
      {
        "@type": "Country",
        name: "United States",
      },
      {
        "@type": "State",
        name: "Texas",
      },
      {
        "@type": "State",
        name: "Florida",
      },
      {
        "@type": "State",
        name: "California",
      },
      {
        "@type": "State",
        name: "Georgia",
      },
      {
        "@type": "State",
        name: "Illinois",
      },
    ],
    knowsAbout: [
      "Porta Potty Rentals",
      "Portable Toilet Services",
      "Event Sanitation Solutions",
      "Construction Site Sanitation",
      "ADA Compliant Restrooms",
      "Luxury Restroom Trailers",
      "Hand Washing Stations",
      "Temporary Sanitation Services",
      "OSHA Compliance",
      "Special Event Services",
    ],
    sameAs: [
      "https://www.facebook.com/flushjohn",
      "https://www.twitter.com/flushjohn",
      "https://www.linkedin.com/company/flushjohn",
      "https://www.instagram.com/flushjohn",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phone.phone_number,
        contactType: "customer service",
        contactOption: "TollFree",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: phone.phone_number,
        contactType: "sales",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
      },
      {
        "@type": "ContactPoint",
        email: contact.support_email,
        contactType: "customer support",
        areaServed: "US",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "25",
    },
    founder: {
      "@type": "Person",
      name: "FlushJohn Founder",
    },
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${websiteURL}#service`,
    serviceType: "Porta Potty Rental Services",
    name: productName || "FlushJohn Porta Potty Rental Services",
    description:
      productDescription ||
      "Professional porta potty rental services for events, construction sites, and special occasions. We offer standard units, deluxe units, ADA compliant options, and luxury restroom trailers.",
    provider: {
      "@id": `${websiteURL}#organization`,
    },
    areaServed:
      city && state
        ? {
            "@type": "City",
            name: cityDisplayName || city,
            containedInPlace: {
              "@type": "State",
              name: state,
              containedInPlace: {
                "@type": "Country",
                name: "United States",
              },
            },
          }
        : {
            "@type": "Country",
            name: "United States",
          },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${websiteURL}/quote`,
      serviceName: "Online Quote Request",
      servicePhone: phone.phone_number,
      availableLanguage: ["English", "Spanish"],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "100",
      highPrice: "500",
      offerCount: "6",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31)
        .toISOString()
        .split("T")[0],
      url: `${websiteURL}/rental-products`,
    },
    brand: {
      "@id": `${websiteURL}#organization`,
    },
    category: "Portable Sanitation Services",
    termsOfService: `${websiteURL}/terms`,
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };

  // Local Business Schema (for city pages)
  const localBusinessSchema =
    city && state
      ? {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${websiteURL}/porta-potty-rental/${city}#localbusiness`,
          name: `FlushJohn - ${cityDisplayName || city}, ${state}`,
          description: `Professional porta potty rental services in ${cityDisplayName || city}, ${state}. Same-day delivery, competitive pricing, and reliable service for all your event and construction needs.`,
          url: `${websiteURL}/porta-potty-rental/${city}`,
          telephone: phone.phone_number,
          email: contact.support_email,
          image: `${s3assets}/og-image-flushjonn-web.png`,
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: cityDisplayName || city,
            addressRegion: state,
            addressCountry: "US",
          },
          geo:
            latitude && longitude
              ? {
                  "@type": "GeoCoordinates",
                  latitude: latitude,
                  longitude: longitude,
                }
              : undefined,
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
          paymentAccepted: [
            "Cash",
            "Credit Card",
            "Debit Card",
            "Check",
            "Online Payment",
          ],
          currenciesAccepted: "USD",
          areaServed: {
            "@type": "GeoCircle",
            geoMidpoint:
              latitude && longitude
                ? {
                    "@type": "GeoCoordinates",
                    latitude: latitude,
                    longitude: longitude,
                  }
                : undefined,
            geoRadius: "50000",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "127",
            bestRating: "5",
            worstRating: "1",
          },
          parentOrganization: {
            "@id": `${websiteURL}#organization`,
          },
        }
      : null;

  // Product Schema (for product pages)
  const productSchema = productName
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${websiteURL}/rental-products/${productName.toLowerCase().replace(/\s+/g, "-")}#product`,
        name: productName,
        description:
          productDescription || `Professional ${productName} rental services`,
        image: `${s3assets}/og-image-flushjonn-web.png`,
        brand: {
          "@id": `${websiteURL}#organization`,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${websiteURL}/quote`,
          priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31)
            .toISOString()
            .split("T")[0],
          seller: {
            "@id": `${websiteURL}#organization`,
          },
        },
        category: "Portable Sanitation Equipment",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "127",
        },
      }
    : null;

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${websiteURL}#website`,
    url: websiteURL,
    name: "FlushJohn",
    description:
      "Professional porta potty rental services across the United States",
    publisher: {
      "@id": `${websiteURL}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${websiteURL}/quote?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };

  // Blog Article Schema (for blog pages)
  const articleSchema = blogTitle
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: blogTitle,
        description: blogContent?.substring(0, 200) || "",
        author: {
          "@type": "Person",
          name: blogAuthor || "FlushJohn Team",
        },
        publisher: {
          "@id": `${websiteURL}#organization`,
        },
        datePublished: publishDate || new Date().toISOString(),
        dateModified: new Date().toISOString(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": websiteURL,
        },
        image: `${s3assets}/og-image-flushjonn-web.png`,
      }
    : null;

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: websiteURL,
      },
      ...(city && state
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: "Porta Potty Rentals",
              item: `${websiteURL}/porta-potty-rental`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: `${cityDisplayName || city}, ${state}`,
              item: `${websiteURL}/porta-potty-rental/${city}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      {/* Organization Schema */}
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Service Schema */}
      <Script
        id="schema-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Website Schema */}
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Local Business Schema (city pages) */}
      {localBusinessSchema && (
        <Script
          id="schema-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      )}

      {/* Product Schema (product pages) */}
      {productSchema && (
        <Script
          id="schema-product"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}

      {/* Article Schema (blog pages) */}
      {articleSchema && (
        <Script
          id="schema-article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}

      {/* Breadcrumb Schema */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
