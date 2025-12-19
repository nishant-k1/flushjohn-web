import React from "react";
import Carousel from "@/components/UI/Carousel";
import styles from "./styles.module.css";
import Image from "next/image";

export default function CarouselView() {
  const images = [
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp",
      alt: "Professional porta potty rental unit at construction site - FlushJohn portable toilets",
    },
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-2.webp",
      alt: "Clean portable toilet for outdoor events - FlushJohn porta potty rentals",
    },
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-3.webp",
      alt: "ADA compliant portable toilet rental - FlushJohn accessible porta potty",
    },
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-4.webp",
      alt: "Deluxe porta potty rental unit with amenities - FlushJohn premium portable toilets",
    },
  ];

  return (
    <div style={{ height: "900px", minHeight: "900px" }}>
      <Carousel
        autoplay
        autoplaySpeed={2000}
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
            placeholder="empty"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
          />
          <div className={styles.overlayHeroImage}></div>
        </div>
        ))}
      </Carousel>
    </div>
  );
}
