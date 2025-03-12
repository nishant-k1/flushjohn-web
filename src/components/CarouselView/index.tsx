import React from "react";
import { Carousel } from "antd";
import styles from "./styles.module.css";
import Image from "next/image";

export default function CarouselView() {
  return (
    <Carousel
      autoplay
      autoplaySpeed={2000}
      style={{ height: "900px" }}
    >
      {[
        "https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp",
        "https://cdn.flushjohn.com/images/home-page-images/hero-img-2.webp",
        "https://cdn.flushjohn.com/images/home-page-images/hero-img-3.webp",
        "https://cdn.flushjohn.com/images/home-page-images/hero-img-4.webp",
      ].map((src, index) => (
        <div
          key={index}
          className={styles.imageWrapper}
        >
          <Image
            src={src}
            fill={true}
            alt="flusjohn-porta-potty-rental"
            className={styles.heroImage}
            priority={true}
            placeholder="empty"
          />
          <div className={styles.overlayHeroImage}></div>
        </div>
      ))}
    </Carousel>
  );
}
