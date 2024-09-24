import React from "react";
import { products_data } from "../../constants";
import styles from "./styles.module.css";
import Slider from "../Slider";
import { useRouter } from "next/router";
import Breadcrumbs from "../Breadcrumbs";
import Link from "next/link";

const Products = () => {
  const router = useRouter();
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
                  <Slider {...image} />
                  <Link
                    className={styles.quoteLink}
                    href="/quote"
                  >
                    Get Free Quote
                  </Link>
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
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Products;
