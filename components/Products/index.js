import React from "react";
import { products_data } from "../../constants";
import styles from "./styles.module.css";
import Slider from "../Slider";

const Products = () => (
  <React.Fragment>
    <div className={`${styles.section} ${styles.section4Section}`}>
      <div className={styles.container}>
        <div className={styles.section4}>
          {/* <div className={styles.wrapper}>
            <Slider
              img={{
                img1: "assets/sps_yellow.svg",
                img2: "assets/yellowSPSInterior1.png",
              }}
            />
            <h5>{products_data.h1}</h5>
            <p>{products_data.p1}</p>
          </div> */}
          <div className={styles.wrapper}>
            {/* <img src="/assets/sps_blue.svg" alt="product_pic" /> */}
            <Slider
              img={{
                img1: "assets/sps_blue.svg",
                img2: "assets/blueSPSInterior1.png",
              }}
            />
            <h5>{products_data.h2}</h5>
            <p>{products_data.p2}</p>
          </div>
          <div className={styles.wrapper}>
            {/* <img src="/assets/ada_blue.svg" alt="product_pic" /> */}
            <Slider
              img={{
                img1: "assets/ada_blue.svg",
                img2: "assets/ADAInterior1.jpg",
              }}
            />
            <h5>{products_data.h3}</h5>
            <p>{products_data.p3}</p>
          </div>
          <div className={styles.wrapper}>
            {/* <img src="/assets/flushable.svg" alt="product_pic" /> */}
            <Slider
              img={{
                img1: "assets/flushable.svg",
                img2: "assets/whiteFlushableInterior1.jpg",
              }}
            />
            <h5>{products_data.h4}</h5>
            <p>{products_data.p4}</p>
          </div>
          <div className={styles.wrapper}>
            {/* <img src="/assets/sink.svg" alt="product_pic" /> */}
            <Slider
              img={{ img1: "assets/sinkFront.png", img2: "assets/sink.png" }}
            />
            <h5>{products_data.h5}</h5>
            <p>{products_data.p5}</p>
          </div>
          {/* <div className={styles.wrapper}>
            <Slider
              img={{
                img1: "assets/VIP-Flush-1.svg",
                img2: "assets/blueFlushableInterior.jpg",
              }}
            />
            <h5>{products_data.h6}</h5>
            <p>{products_data.p6}</p>
          </div> */}
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default Products;
