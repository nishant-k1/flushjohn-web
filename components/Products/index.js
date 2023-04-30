import React from "react";
import { products_data } from "../../constants";
import styles from "./styles.module.css";
import Slider from "../Slider";
import { products_data_1 } from "../../constants";
import { useRouter } from "next/router";
import Breadcrumbs from "../Breadcrumbs";
import Link from "next/link";

const Products = () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <div className={styles.products}>
        <div className={styles.container}>
          <Breadcrumbs path={router.pathname} />
          <div className={styles.productsWrapper}>
            {products_data_1.map((item, index) => {
              const { id, image, title, desc } = item;
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
                        href={`/products/${title
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
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
