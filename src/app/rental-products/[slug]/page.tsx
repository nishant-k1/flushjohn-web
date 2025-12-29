import React from "react";
import { notFound } from "next/navigation";
import { IndividualProduct } from "@/features/products/components";
import { s3assets, websiteURL, phone } from "@/constants";
import { products_data } from "@/features/products/constants";
import { findProductBySlug, generateProductSlug } from "@/utils/slug";

export async function generateStaticParams() {
  return products_data.product_list.map((product) => ({
    slug: generateProductSlug(product.title),
  }));
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  if (!slug) return { title: "FlushJohn Products" };

  const currentProduct = findProductBySlug(slug, products_data.product_list);

  if (!currentProduct) {
    notFound();
  }

  const { title, image, keywords } = currentProduct;
  const { src_1, alt } = image;

  // Enhanced local keywords for SEO
  const localKeywords = `${keywords}, porta potty rental, portable toilet rental, ${title.toLowerCase()} rental near me, porta potty rental Houston, porta potty rental Dallas, porta potty rental Miami, porta potty rental Los Angeles, portable toilet rental near me, ${title.toLowerCase()} rental, construction porta potty rental, event porta potty rental, flushjohn`;

  return {
    title: `${title} - FlushJohn Porta Potty Rentals`,
    description: `Get detailed information about our ${title}. Affordable and reliable porta potty rentals for your event. Available in 25+ cities across 6 states with same-day delivery.`,
    keywords: localKeywords,
    openGraph: {
      title: `${title} - FlushJohn Porta Potty Rentals`,
      description: `Discover the features and pricing for our ${title} at FlushJohn. Available in 25+ cities across the United States with same-day delivery and competitive pricing.`,
      url: `${websiteURL}/rental-products/${slug}`,
      type: "website",
      siteName: "FlushJohn",
      images: [
        {
          url: src_1 || `${s3assets}/og-image-flushjonn-web.png`,
          height: 630,
          width: 1200,
          alt: `${alt} - FlushJohn`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - FlushJohn Porta Potty Rentals`,
      description: `Discover the features and pricing for our ${title} at FlushJohn.`,
      images: [src_1 || `${s3assets}/og-image-flushjonn-web.png`],
    },
    alternates: {
      canonical: `${websiteURL}/rental-products/${slug}`,
    },
    other: {
      "geo.region": "US",
      dateModified: new Date().toISOString(),
    },
  };
};

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  if (!slug) return;

  const product = findProductBySlug(slug, products_data.product_list);

  if (!product) return <p>Product not found</p>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: `${product.desc}`,
    image: [product.image.src_1, product.image.src_2],
    brand: {
      "@type": "Brand",
      name: "FlushJohn",
    },
    category: "Portable Toilet Rentals",
    areaServed: [
      {
        "@type": "City",
        name: "Houston",
        containedIn: {
          "@type": "State",
          name: "Texas",
        },
      },
      {
        "@type": "City",
        name: "Dallas",
        containedIn: {
          "@type": "State",
          name: "Texas",
        },
      },
      {
        "@type": "City",
        name: "Miami",
        containedIn: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "City",
        name: "Los Angeles",
        containedIn: {
          "@type": "State",
          name: "California",
        },
      },
      {
        "@type": "City",
        name: "Atlanta",
        containedIn: {
          "@type": "State",
          name: "Georgia",
        },
      },
      {
        "@type": "City",
        name: "Chicago",
        containedIn: {
          "@type": "State",
          name: "Illinois",
        },
      },
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Event Organizers, Construction Companies",
    },
    offers: {
      "@type": "Offer",
      url: `${websiteURL}/rental-products/${slug}`,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "Competitive rates starting from $50/day",
        priceCurrency: "USD",
        eligibleTransactionVolume: {
          "@type": "PriceSpecification",
          minPrice: "50.00",
          priceCurrency: "USD",
        },
      },
      availability: "https://schema.org/InStock",
      availabilityStarts: new Date().toISOString(),
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "FlushJohn",
        url: websiteURL,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: phone.phone_number,
          contactType: "sales",
        },
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
          {
            "@type": "State",
            name: "Delaware",
          },
        ],
      },
      businessFunction: "https://schema.org/LeaseOut",
      eligibleRegion: [
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
        {
          "@type": "State",
          name: "Delaware",
        },
      ],
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Rental Duration",
        value: "Daily, Weekly, Monthly",
      },
      {
        "@type": "PropertyValue",
        name: "Delivery Included",
        value: "Yes",
      },
      {
        "@type": "PropertyValue",
        name: "Setup Service",
        value: "Professional Installation",
      },
    ],
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
        name: "Rental Products",
        item: `${websiteURL}/rental-products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `${websiteURL}/rental-products/${slug}`,
      },
    ],
  };

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: product.title,
      brand: {
        "@type": "Brand",
        name: "FlushJohn",
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
    reviewBody: `Excellent ${product.title} rental service from FlushJohn. Clean, reliable, and professionally maintained units perfect for any event or construction site.`,
    datePublished: "2024-01-15",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <IndividualProduct slug={slug} />
    </>
  );
};

export default ProductPage;
