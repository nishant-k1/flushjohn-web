import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../../Breadcrumbs";
import { products_data } from "../../../constants";

const IndividualProduct = ({ slug }) => {
  if (!slug) return "";
  const { spr, acpr, dfr, hss } = products_data;
  const currentProduct = (slug) => {
    switch (slug) {
      case "standard-portable-restroom":
        return spr;
      case "ada-compliant-portable-restroom":
        return acpr;
      case "hand-wash-sink-station":
        return dfr;
      case "flushable-restroom-sink-inside":
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
            <img
              src={src_1}
              alt={alt}
            />
            <img
              src={src_2}
              alt={alt}
            />
          </div>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
