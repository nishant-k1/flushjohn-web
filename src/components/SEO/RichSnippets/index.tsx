/**
 * Rich Snippets Component
 *
 * Generates additional rich snippets and JSON-LD schemas for enhanced search results.
 * Helps achieve featured snippets, knowledge panels, and rich results.
 */

import React from "react";
import Script from "next/script";
import { websiteURL, s3assets } from "@/constants";

interface RichSnippetsProps {
  pageType?: "homepage" | "city" | "product" | "blog" | "faq";
  city?: string;
  state?: string;
  productName?: string;
  productPrice?: string;
  blogTitle?: string;
  blogAuthor?: string;
}

export default function RichSnippets({
  pageType = "homepage",
  city,
  state,
  productName,
  productPrice,
  blogTitle,
  blogAuthor,
}: RichSnippetsProps) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Rent a Porta Potty",
    description: "Step-by-step guide to renting a porta potty from FlushJohn",
    totalTime: "PT15M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "100-500",
    },
    tool: [
      {
        "@type": "HowToTool",
        name: "Internet connection",
      },
      {
        "@type": "HowToTool",
        name: "Event or project details",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Determine Your Needs",
        text: "Calculate how many porta potties you need based on attendance, event duration, and whether alcohol is served. Use 1 unit per 50 people for short events, 1 per 35 for events with alcohol.",
        url: `${websiteURL}/faq`,
        image: `${s3assets}/og-image-flushjonn-web.png`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Choose Your Unit Type",
        text: "Select from standard porta potties, deluxe flushing units, ADA compliant units, or luxury restroom trailers based on your event type and budget.",
        url: `${websiteURL}/rental-products`,
        image: `${s3assets}/og-image-flushjonn-web.png`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Request a Quote",
        text: "Fill out our online quote form with your event details, location, dates, and unit requirements. We respond within 1 hour during business hours.",
        url: `${websiteURL}/quote`,
        image: `${s3assets}/og-image-flushjonn-web.png`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Review and Confirm",
        text: "Review the customized quote including delivery, setup, and pickup. Approve the quote and provide payment to confirm your reservation.",
        url: `${websiteURL}/quote`,
        image: `${s3assets}/og-image-flushjonn-web.png`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Prepare Your Site",
        text: "Ensure level ground, vehicle access within 50 feet, and 12 feet of clearance for delivery. Mark preferred placement locations.",
        url: `${websiteURL}/faq`,
        image: `${s3assets}/og-image-flushjonn-web.png`,
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Delivery and Setup",
        text: "Our team delivers and sets up the porta potties at your specified location. We handle all setup - you just need to provide access.",
        url: `${websiteURL}/contact`,
        image: `${s3assets}/og-image-flushjonn-web.png`,
      },
    ],
  };

  const videoSchema =
    pageType === "homepage"
      ? {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: "FlushJohn Porta Potty Rental Services Overview",
          description:
            "Learn about FlushJohn porta potty rental services, our products, and service areas across the United States.",
          thumbnailUrl: `${s3assets}/og-image-flushjonn-web.png`,
          uploadDate: "2024-01-01T00:00:00Z",
          duration: "PT2M30S",
          contentUrl: `${websiteURL}/#video`,
          embedUrl: `${websiteURL}/#video`,
        }
      : null;

  const productListSchema =
    pageType === "product" || pageType === "homepage"
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "FlushJohn Porta Potty Product Catalog",
          description:
            "Complete range of porta potty rental options from FlushJohn",
          numberOfItems: 6,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Product",
                name: "Standard Porta Potty",
                description:
                  "Basic portable toilet for events and construction",
                image: `${s3assets}/og-image-flushjonn-web.png`,
                offers: {
                  "@type": "Offer",
                  price: "100-150",
                  priceCurrency: "USD",
                  priceValidUntil: new Date(
                    new Date().getFullYear() + 1,
                    11,
                    31
                  )
                    .toISOString()
                    .split("T")[0],
                  availability: "https://schema.org/InStock",
                },
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Product",
                name: "Deluxe Flushing Porta Potty",
                description: "Upgraded unit with flushing toilet and sink",
                image: `${s3assets}/og-image-flushjonn-web.png`,
                offers: {
                  "@type": "Offer",
                  price: "150-250",
                  priceCurrency: "USD",
                  priceValidUntil: new Date(
                    new Date().getFullYear() + 1,
                    11,
                    31
                  )
                    .toISOString()
                    .split("T")[0],
                  availability: "https://schema.org/InStock",
                },
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "Product",
                name: "ADA Compliant Porta Potty",
                description: "Wheelchair accessible portable toilet",
                image: `${s3assets}/og-image-flushjonn-web.png`,
                offers: {
                  "@type": "Offer",
                  price: "175-275",
                  priceCurrency: "USD",
                  priceValidUntil: new Date(
                    new Date().getFullYear() + 1,
                    11,
                    31
                  )
                    .toISOString()
                    .split("T")[0],
                  availability: "https://schema.org/InStock",
                },
              },
            },
            {
              "@type": "ListItem",
              position: 4,
              item: {
                "@type": "Product",
                name: "Luxury Restroom Trailer",
                description: "Premium multi-stall trailer with AC",
                image: `${s3assets}/og-image-flushjonn-web.png`,
                offers: {
                  "@type": "Offer",
                  price: "800-1500",
                  priceCurrency: "USD",
                  priceValidUntil: new Date(
                    new Date().getFullYear() + 1,
                    11,
                    31
                  )
                    .toISOString()
                    .split("T")[0],
                  availability: "https://schema.org/InStock",
                },
              },
            },
          ],
        }
      : null;

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: websiteURL,
    name: "FlushJohn Porta Potty Rentals",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".faq-question", ".product-name"],
    },
  };

  return (
    <>
      {/* How-To Schema */}
      <Script
        id="schema-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Video Schema */}
      {videoSchema && (
        <Script
          id="schema-video"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      {/* Product List Schema */}
      {productListSchema && (
        <Script
          id="schema-product-list"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productListSchema),
          }}
        />
      )}

      {/* Speakable Schema for Voice Search */}
      <Script
        id="schema-speakable"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
    </>
  );
}
