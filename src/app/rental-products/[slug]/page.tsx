import React from "react";
import IndividualProduct from "@/components/Products/IndividualProduct";
import { s3assets, websiteURL, products_data } from "@/constants";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  if (!slug) return null;

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
const ProductPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // ✅ Generate JSON-LD for structured data
  const product = products_data.product_list.find((p) => {
    return p.title.toLowerCase().replace(/\s+/g, "-") === slug;
  });

  if (!product) return <p>Product not found</p>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: `Learn more about our ${product.title}.`,
    image: product.image.src_1,
    brand: {
      "@type": "Brand",
      name: "FlushJohn",
    },
    offers: {
      "@type": "Offer",
      url: `${websiteURL}/rental-products/${slug}`,
      priceCurrency: "USD",
      price: "Contact for pricing",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "FlushJohn",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndividualProduct slug={slug} />
    </>
  );
};

export default ProductPage;
