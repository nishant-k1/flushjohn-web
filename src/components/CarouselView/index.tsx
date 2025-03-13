import React from "react";
import Carousel from "antd/es/carousel";
import "antd/es/carousel/style";
import styles from "./styles.module.css";
import Image from "next/image";

export default function CarouselView() {
  const images = [
    "https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp",
    "https://cdn.flushjohn.com/images/home-page-images/hero-img-2.webp",
    "https://cdn.flushjohn.com/images/home-page-images/hero-img-3.webp",
    "https://cdn.flushjohn.com/images/home-page-images/hero-img-4.webp",
  ];

  return (
    <Carousel
      autoplay
      autoplaySpeed={2000}
      style={{ height: "900px" }}
    >
      {images.map((src, index) => (
        <div
          key={index}
          className={styles.imageWrapper}
        >
          <Image
            src={src}
            fill
            alt="flushjohn-porta-potty-rental"
            className={styles.heroImage}
            priority={index === 0} // Only first image loads eagerly
            loading={index === 0 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="/placeholder.jpg" // Optional: Use a placeholder image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
          />
          <div className={styles.overlayHeroImage}></div>
        </div>
      ))}
    </Carousel>
  );
}
