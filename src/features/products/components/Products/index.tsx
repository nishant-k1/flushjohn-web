import React from "react";
import { products_data } from "../../constants";
import styles from "./styles.module.css";
import Slider from "./Slider";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { generateProductSlug } from "@/utils/slug";

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
              const slug = generateProductSlug(title);
              return (
                <div className={styles.wrapper} key={id}>
                  <div>
                    <h3>{title}</h3>
                    <p>
                      {desc.length > 100
                        ? `${desc.substring(0, 100)}...`
                        : desc}
                    </p>
                    <Link
                      className={styles.moreLink}
                      href={`/rental-products/${slug}`}
                    >
                      Learn More →
                    </Link>
                  </div>
                  <div>
                    <Slider {...image} />
                    <Link className={styles.quoteLink} href="/quote">
                      Request Quote
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
