import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../../Breadcrumbs";
import { products_data } from "../../../constants";
import Image from "next/image";

const IndividualProduct = ({ slug }) => {
  if (!slug) return;

  const { spr, acpr, dfr, hss } = products_data;

  const currentProduct = (slug) => {
    switch (slug) {
      case "standard-portable-restroom":
        return spr;
      case "ada-compliant-portable-restroom":
        return acpr;
      case "flushable-restroom-sink-inside":
        return dfr;
      case "hand-wash-sink-station":
        return hss;
      default:
        throw new Error(`Invalid slug: ${slug}`);
    }
  };

  const { title, image, desc } = currentProduct(slug);
  const { src_1, src_2, alt } = image;

  return (
    <div className={styles.product}>
      <div className={styles.container}>
        <Breadcrumbs path={`/products/${slug}`} />
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
