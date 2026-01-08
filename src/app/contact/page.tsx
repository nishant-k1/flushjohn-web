import React from "react";
import { Contact } from "@/features/contact/components";
import type { Metadata } from "next";
import { s3assets, websiteURL, phone, contact, socialMedia } from "@/constants";
import EnhancedStructuredData from "@/components/SEO/EnhancedStructuredData";

export const metadata: Metadata = {
  title: "Contact Us - FlushJohn Porta Potty Rentals",
  description:
    "Have questions? Get in touch with the FlushJohn team for inquiries about porta potty rentals, pricing, or any other services.",
  keywords:
    "contact flushjohn, porta potty inquiries, rental questions, customer support",
  openGraph: {
    title: "Contact FlushJohn - Porta Potty Rentals",
    description:
      "Reach out to us for any questions or assistance with our porta potty rental services. We’re here to help.",
    url: `${websiteURL}/contact`,
    type: "website",
    siteName: "FlushJohn",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        height: 630,
        width: 1200,
        alt: "FlushJohn Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlushJohn - Porta Potty Rentals",
    description:
      "Providing high-quality porta potty rental solutions for events of all sizes. Clean, affordable, and convenient.",
    images: [`${s3assets}/og-image-flushjonn-web.png`],
  },
  alternates: {
    canonical: `${websiteURL}/contact`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact FlushJohn - Porta Potty Rentals",
  description:
    "Get in touch with FlushJohn for porta potty rental inquiries, pricing, and customer support across the United States.",
  mainEntity: {
    "@type": "Organization",
    name: "FlushJohn",
    url: websiteURL,
    logo: {
      "@type": "ImageObject",
      url: `${s3assets}/og-image-flushjonn-web.png`,
      width: 1200,
      height: 630,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phone.phone_number,
        contactType: "Customer Service",
        email: contact.support_email,
        availableLanguage: ["English"],
        areaServed: "US",
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
          opens: "08:00",
          closes: "20:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: phone.phone_number,
        contactType: "Sales",
        email: contact.sales_email,
        availableLanguage: ["English"],
        areaServed: "US",
      },
      {
        "@type": "ContactPoint",
        contactType: "Emergency Support",
        telephone: phone.phone_number,
        availableLanguage: ["English"],
        areaServed: "US",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "39.8283",
        longitude: "-98.5795",
      },
      geoRadius: "2000000",
    },
    sameAs: [socialMedia.facebook, socialMedia.twitter, socialMedia.linkedin],
  },
  breadcrumb: {
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
        name: "Contact",
        item: `${websiteURL}/contact`,
      },
    ],
  },
  potentialAction: {
    "@type": "ContactAction",
    target: `${websiteURL}/contact`,
    name: "Contact FlushJohn",
  },
};

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "Organization",
    name: "FlushJohn",
    image: `${s3assets}/og-image-flushjonn-web.png`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  },
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
  reviewBody:
    "FlushJohn provides excellent porta potty rental services across the United States. Professional, reliable, and affordable portable toilet solutions for events and construction sites.",
  datePublished: "2024-01-15",
};

const serviceAreaBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ServiceAreaBusiness",
  name: "FlushJohn",
  url: websiteURL,
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
};

const ContactPage = () => {
  return (
    <>
      {/* Enhanced Structured Data for Contact Page */}
      <EnhancedStructuredData pageType="contact" />

      <link rel="canonical" href={`${websiteURL}/contact`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceAreaBusinessJsonLd),
        }}
      />
      <Contact />
    </>
  );
};

export default ContactPage;
