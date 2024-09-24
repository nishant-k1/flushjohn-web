import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../../Breadcrumbs";
import { products_data } from "../../../constants";
import Image from "next/image";

interface IndividualProductProps {
  slug: string;
}

const IndividualProduct = ({ slug }: IndividualProductProps) => {
  if (!slug) return null; // Return null if slug is not provided

  // Find the current product based on the slug
  const currentProduct = products_data.product_list.find((product) => {
    const formattedSlug = product.title.toLowerCase().replace(/\s+/g, "-");
    return formattedSlug === slug;
  });

  if (!currentProduct) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const { title, image, desc } = currentProduct;
  const { src_1, src_2, alt } = image;

  return (
    <div className={styles.product}>
      <div className={styles.container}>
        <Breadcrumbs path={`/rental-products/${slug}`} />
        <div className={styles.wrapper}>
          <h1>{title}</h1>
          <div>
            <Image
              src={src_1}
              alt={alt}
              width={300}
              height={600}
            />
            <Image
              src={src_2}
              alt={alt}
              width={300}
              height={600}
            />
          </div>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
