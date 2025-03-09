import React from "react";
import { Carousel } from "antd";
import styles from "./styles.module.css";
import Image from "next/image";

export default function CarouselView() {
  return (
    <Carousel
      autoplay
      autoplaySpeed={2000}
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
            height={900}
            width={2100}
            alt="flusjohn-porta-potty-rental"
            className={styles.heroImage}
          />
          <div className={styles.overlayHeroImage}></div>
        </div>
      ))}
    </Carousel>
  );
}
