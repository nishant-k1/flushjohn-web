import React from "react";
import Carousel from "antd/es/carousel";
import "antd/es/carousel/style";
import styles from "./styles.module.css";
import Image from "next/image";

export default function CarouselView() {
  const images = [
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp",
      alt: "Professional porta potty rental unit at construction site - FlushJohn portable toilets"
    },
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-2.webp", 
      alt: "Clean portable toilet for outdoor events - FlushJohn porta potty rentals"
    },
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-3.webp",
      alt: "ADA compliant portable toilet rental - FlushJohn accessible porta potty"
    },
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-4.webp",
      alt: "Deluxe porta potty rental unit with amenities - FlushJohn premium portable toilets"
    },
  ];

  return (
    <Carousel
      autoplay
      autoplaySpeed={2000}
      style={{ height: "900px" }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={styles.imageWrapper}
        >
          <Image
            src={image.src}
            fill={true}
            alt={image.alt}
            className={styles.carouselImage}
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
          />
          <div className={styles.overlayHeroImage}></div>
        </div>
      ))}
    </Carousel>
  );
}
