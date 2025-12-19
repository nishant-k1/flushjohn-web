"use client";

import React, { useState, useEffect } from "react";
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

  const [showCarousel, setShowCarousel] = useState(false);
  const firstImage = images[0];

  // Delay carousel visibility to ensure first image is measured as LCP
  useEffect(() => {
    // Wait 4 seconds to ensure LCP measurement completes (LCP typically measured within 2.5s)
    const timer = setTimeout(() => {
      setShowCarousel(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

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
      {/* Render first image immediately in HTML for LCP discovery - always visible */}
      <div
        className={styles.imageWrapper}
        style={{
          aspectRatio: `${firstImage.width} / ${firstImage.height}`,
          width: "100%",
          height: "900px",
          minHeight: "900px",
          maxHeight: "900px",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: showCarousel ? 1 : 2,
        }}
      >
        <Image
          src={firstImage.src}
          fill={true}
          alt={firstImage.alt}
          className={styles.carouselImage}
          priority
          loading="eager"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1920px"
          quality={90}
          fetchPriority="high"
        />
        <div className={styles.overlayHeroImage}></div>
      </div>

      {/* Carousel - only becomes visible after delay to ensure LCP measurement */}
      {showCarousel && (
        <div style={{ position: "relative", zIndex: 2 }}>
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
                  priority={false}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1920px"
                  quality={85}
                  fetchPriority="low"
                />
                <div className={styles.overlayHeroImage}></div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
