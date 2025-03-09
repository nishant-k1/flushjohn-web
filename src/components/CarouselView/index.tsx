import React from "react";
import { Carousel } from "antd";
import styles from "../Home/Hero/styles.module.css";
import Image from "next/image";

export default function CarouselView() {
  return (
    <Carousel
      autoplay
      autoplaySpeed={2000}
    >
      {[
        "https://cdn.flushjohn.com/assets/gallery/img-2.jpg",
        "https://cdn.flushjohn.com/assets/gallery/img-9.jpg",
        "https://cdn.flushjohn.com/assets/gallery/img-10.jpg",
        "https://cdn.flushjohn.com/assets/gallery/img-14.jpg",
      ].map((src, index) => (
        <div
          key={index}
          className={styles.imageWrapper}
        >
          <Image
            src={src}
            height={900}
            width={2100}
            alt=""
            className={styles.heroImage}
          />
          <div className={styles.overlay}></div>
        </div>
      ))}
    </Carousel>
  );
}
