import React from "react";
import { IndividualProduct } from "@/features/products/components";
import { s3assets, websiteURL, phone } from "@/constants";
import { products_data } from "@/features/products/constants";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  if (!slug) return { title: "FlushJohn Products" };

  // Find the current product based on the slug
  const currentProduct = products_data.product_list.find((product) => {
    const formattedSlug = product.title.toLowerCase().replace(/\s+/g, "-");
    return formattedSlug === slug;
  });

  if (!currentProduct) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const { title, image, keywords } = currentProduct;
  const { src_1, alt } = image;

  return {
    title: `${title} - FlushJohn Porta Potty Rentals`,
    description: `Get detailed information about our ${title}. Affordable and reliable porta potty rentals for your event.`,
    keywords: `${keywords}, porta potty rental, flushjohn`,
    openGraph: {
      title: `${title} - FlushJohn Porta Potty Rentals`,
      description: `Discover the features and pricing for our ${title} at FlushJohn.`,
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
  };
};

// ✅ **Page Component**
const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  if (!slug) return;

  const product = products_data.product_list.find((p) => {
    return p.title.toLowerCase().replace(/\s+/g, "-") === slug;
  });

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
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
      },
      businessFunction: "https://schema.org/LeaseOut",
      eligibleRegion: {
        "@type": "Country",
        name: "United States",
      },
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
      <IndividualProduct slug={slug} />
    </>
  );
};

export default ProductPage;
