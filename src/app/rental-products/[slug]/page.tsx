import React from "react";
import IndividualProduct from "@/components/Products/IndividualProduct";
import { websiteURL } from "@/constants";
import { products_data } from "@/constants";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  if (!slug) return null; // Return null if slug is not provided

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
    title: `${title} - FlushJohn Porta Potty Rentals`, // Use product name
    description: `Get detailed information about our ${title}. Affordable and reliable porta potty rentals for your event.`,
    keywords: `${keywords}, porta potty rental, flushjohn`, // Use product keywords
    openGraph: {
      title: `${title} - FlushJohn Porta Potty Rentals`, // Use product name
      description: `Discover the features and pricing for our ${title} at FlushJohn. Ideal for all types of events.`,
      url: `${websiteURL}/rental-products/${slug}`,
      type: "website",
      images: [
        {
          url: src_1, // Use product image URL
          alt: `${alt} - FlushJohn`, // Use product name
        },
      ],
    },
  };
};

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return <IndividualProduct slug={slug} />;
};

export default ProductPage;
