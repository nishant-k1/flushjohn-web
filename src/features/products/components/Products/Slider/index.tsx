"use client";

import React, { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import styles from "./styles.module.css";
import Indicator from "./Indicator";
import Image from "next/image";
import { ProductImage } from "../../../constants";

const Slider = ({ src_1, src_2, alt }: ProductImage) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [src_1, src_2];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className={styles.navButton}
          aria-label="Previous image"
          type="button"
        >
          <IoIosArrowDropleft />
        </button>

        {/* Image Container with Fade Effect */}
        <div className={styles.imageViewport}>
          {images.map((src, index) => (
            <div
              key={index}
              className={`${styles.imageSlide} ${
                index === currentIndex ? styles.active : styles.inactive
              }`}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={src}
                  alt={`${alt} - View ${index + 1}`}
                  width={180}
                  height={144}
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 767px) 150px, (max-width: 1023px) 220px, 240px"
                  quality={90}
                  className={styles.productImage}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className={styles.navButton}
          aria-label="Next image"
          type="button"
        >
          <IoIosArrowDropright />
        </button>
      </div>

      {/* Indicators */}
      <Indicator 
        totalSlides={images.length}
        currentSlide={currentIndex}
        onIndicatorClick={goToSlide}
      />
    </div>
  );
};

export default Slider;
