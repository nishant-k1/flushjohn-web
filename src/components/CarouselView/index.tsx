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
        "https://cdn.flushjohn.com/assets/gallery/img-2.1-enhanced-1.jpg",
        "https://cdn.flushjohn.com/assets/gallery/img-4.jpg",
        "https://cdn.flushjohn.com/assets/gallery/img-21.jpg",
        "https://cdn.flushjohn.com/assets/gallery/img-20.jpg",
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
