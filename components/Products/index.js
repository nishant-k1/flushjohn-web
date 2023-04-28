import React from "react";
import { products_data } from "../../constants";
import styles from "./styles.module.css";
import Slider from "../Slider";
import { products_data_1 } from "../../constants";

const Products = () => (
  <React.Fragment>
    <div className={styles.products}>
      <div className={styles.container}>
        <div className={styles.productsWrapper}>
          {products_data_1.map((item, index) => {
            const { id, image, title, desc } = item;
            return (
              <div
                className={styles.wrapper}
                key={id}
              >
                <Slider {...image} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default Products;
