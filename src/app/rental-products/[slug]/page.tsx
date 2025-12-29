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

  // Enhanced local keywords for SEO - focused on rental intent and lead generation
  const localKeywords = `${keywords}, ${title.toLowerCase()} rental, rent ${title.toLowerCase()}, ${title.toLowerCase()} rental near me, ${title.toLowerCase()} rental service, ${title.toLowerCase()} rental company, ${title.toLowerCase()} rental cost, ${title.toLowerCase()} rental price, ${title.toLowerCase()} rental delivery, ${title.toLowerCase()} rental quote, porta potty rental, portable toilet rental, porta john rental, portable restroom rental, hand wash station rental, hand washing sink station rental, portable sink rental, handwash station rental, rent porta potty, rent portable toilet, rent hand wash station, porta potty rental Houston, porta potty rental Dallas, porta potty rental Miami, porta potty rental Los Angeles, portable toilet rental near me, hand wash station rental near me, construction porta potty rental, event porta potty rental, wedding porta potty rental, ADA porta potty rental, luxury porta potty rental, emergency porta potty rental, same day porta potty rental, long term porta potty rental, porta potty rental for construction, portable toilet rental for construction, hand wash station rental for construction, porta potty rental for events, portable toilet rental for events, hand wash station rental for events, porta potty rental for wedding, portable toilet rental for wedding, how much does porta potty rental cost, how much to rent porta potty, porta potty rental quote, portable toilet rental quote, hand wash station rental quote, best porta potty rental, affordable porta potty rental, professional porta potty rental, flushjohn`;

  return {
    title: `${title} - FlushJohn Porta Potty Rentals`,
    description: `Get detailed info about our ${title}. Affordable porta potty, portable toilet, porta john & portable restroom rentals. Available in 25+ cities with same-day delivery.`,
    keywords: localKeywords,
    openGraph: {
      title: `${title} - FlushJohn Porta Potty Rentals`,
      description: `Discover the features and pricing for our ${title} at FlushJohn. Available in 25+ cities across the United States with same-day delivery and competitive pricing. Perfect for porta potty, portable toilet, porta john, and portable restroom rental needs.`,
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
    material: "High-quality plastic and steel construction",
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

  // AggregateOffer schema for better pricing information
  const aggregateOfferJsonLd = {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    name: `${product.title} Rental - Price Range`,
    description: `Competitive pricing for ${product.title} rentals`,
    priceCurrency: "USD",
    lowPrice: "100",
    highPrice: "500",
    offerCount: "6",
    availability: "https://schema.org/InStock",
    url: `${websiteURL}/quote`,
    seller: {
      "@type": "Organization",
      name: "FlushJohn",
      url: websiteURL,
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateOfferJsonLd) }}
      />
      <IndividualProduct slug={slug} />
    </>
  );
};

export default ProductPage;
