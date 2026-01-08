import React from "react";
import { Products } from "@/features/products/components";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";
import { products_data } from "@/features/products/constants";
import { generateProductSlug } from "@/utils/slug";

export const metadata: Metadata = {
  title: "Rental Products - FlushJohn Porta Potty Rentals",
  description:
    "Explore a wide variety of porta potty rental units for all types of events. Affordable, clean, and delivered to your location.",
  keywords:
    "porta potty rental, porta potty rentals, rent a porta potty, porta potties for rent, portable toilet rental, portable toilet rentals, portable toilets for rent, portable restroom rental, portable restrooms, hand wash station rental, standard portable restroom rental, ADA compliant portable restroom rental, flushable restroom rental, deluxe portable restroom rental, flushing portable restroom rental, standalone portable sink station rental, portable toilet products, event hygiene, rental service, rent portable toilets, temporary restroom rental, home renovation porta potty rental, disaster relief porta potty rental, rent porta potty for event, porta potty for construction site, portable restroom rental for wedding, porta potty rental prices, event porta potty rental, luxury porta potty rental, ADA portable toilet rental, hand washing station rental, restroom trailer rental, portable bathroom rental, toilet rental for events, construction porta potty, porta potty for wedding",
  openGraph: {
    title: "FlushJohn Rental Products",
    description:
      "Find the best porta potty rental units for your event. Choose from a wide selection at affordable prices.",
    url: `${websiteURL}/rental-products`,
    type: "website",
    siteName: "FlushJohn",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        height: 630,
        width: 1200,
        alt: "FlushJohn Rental Products",
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
    canonical: `${websiteURL}/rental-products`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "FlushJohn Rental Products",
  url: `${websiteURL}/rental-products`,
  description:
    "Find the best porta potty rental units for your event. Choose from a wide selection at affordable prices.",
  image: `${s3assets}/og-image-flushjonn-web.png`,
  provider: {
    "@type": "Organization",
    name: "FlushJohn",
    url: websiteURL,
    logo: {
      "@type": "ImageObject",
      url: `${s3assets}/og-image-flushjonn-web.png`,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Porta Potty Rental Products",
    description:
      "Complete selection of portable toilet rental units available across the United States",
    numberOfItems: products_data.product_list.length,
    itemListElement: products_data.product_list.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.title,
      description:
        product.desc.length > 150
          ? `${product.desc.substring(0, 150)}...`
          : product.desc,
      url: `${websiteURL}/rental-products/${generateProductSlug(product.title)}`,
    })),
  },
};

const ProductsPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Products />
    </>
  );
};

export default ProductsPage;
