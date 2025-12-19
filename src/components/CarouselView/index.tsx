import React from "react";
import Carousel from "@/components/UI/Carousel";
import styles from "./styles.module.css";
import Image from "next/image";

// Hero images dimensions (16:9 aspect ratio for 1920x1080 base)
const HERO_IMAGE_WIDTH = 1920;
const HERO_IMAGE_HEIGHT = 1080;

export default function CarouselView() {
  const images = [
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp",
      alt: "Professional porta potty rental unit at construction site - FlushJohn portable toilets",
      width: HERO_IMAGE_WIDTH,
      height: HERO_IMAGE_HEIGHT,
    },
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-2.webp",
      alt: "Clean portable toilet for outdoor events - FlushJohn porta potty rentals",
      width: HERO_IMAGE_WIDTH,
      height: HERO_IMAGE_HEIGHT,
    },
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-3.webp",
      alt: "ADA compliant portable toilet rental - FlushJohn accessible porta potty",
      width: HERO_IMAGE_WIDTH,
      height: HERO_IMAGE_HEIGHT,
    },
    {
      src: "https://cdn.flushjohn.com/images/home-page-images/hero-img-4.webp",
      alt: "Deluxe porta potty rental unit with amenities - FlushJohn premium portable toilets",
      width: HERO_IMAGE_WIDTH,
      height: HERO_IMAGE_HEIGHT,
    },
  ];

  return (
    <div
      style={{
        height: "900px",
        minHeight: "900px",
        maxHeight: "900px",
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Carousel
        autoplay
        autoplaySpeed={4000}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.imageWrapper}
            style={{
              aspectRatio: `${image.width} / ${image.height}`,
              width: "100%",
              height: "900px",
              minHeight: "900px",
              maxHeight: "900px",
            }}
          >
            <Image
              src={image.src}
              fill={true}
              alt={image.alt}
              className={styles.carouselImage}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1920px"
              quality={index === 0 ? 90 : 85}
              fetchPriority={index === 0 ? "high" : "low"}
            />
            <div className={styles.overlayHeroImage}></div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
