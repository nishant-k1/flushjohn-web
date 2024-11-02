import React from "react";
import { products_data } from "../../constants";
import styles from "./styles.module.css";
import Slider from "./Slider";
import Breadcrumbs from "../Breadcrumbs";
import Link from "next/link";

const Products = () => {
  const { product_list } = products_data;
  return (
    <React.Fragment>
      <div className={styles.products}>
        <div className={styles.container}>
          <Breadcrumbs path={""} />
          <div className={styles.productsWrapper}>
            {product_list.map((item, index) => {
              const { id, image, title, desc } = item;
              const slug = title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/\/+/g, "/")
                .replace(/^-|-$/g, "");
              return (
                <div
                  className={styles.wrapper}
                  key={id}
                >
                  <div>
                    <h3>{title}</h3>
                    <p>
                      {desc}
                      <span>
                        <Link
                          className={styles.moreLink}
                          href={`/rental-products/${slug}`}
                        >
                          ...More
                        </Link>
                      </span>
                    </p>
                  </div>
                  <div>
                    <Slider {...image} />
                    <Link
                      className={styles.quoteLink}
                      href="/quote"
                    >
                      Get Free Quote
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Products;
