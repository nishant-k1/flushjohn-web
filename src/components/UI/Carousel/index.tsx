/**
 * Lightweight Carousel Component
 * Replaces Antd Carousel (saves 30+ KB!)
 * Pure CSS + minimal JavaScript
 */

"use client";

import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface CarouselProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  arrows?: boolean;
}

export default function Carousel({
  children,
  autoplay = false,
  autoplaySpeed = 3000,
  arrows = false,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = React.Children.count(children);

  useEffect(() => {
    if (!autoplay || totalSlides <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoplaySpeed);

    return () => clearInterval(timer);
  }, [autoplay, autoplaySpeed, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.slidesContainer}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            className={styles.slide}
            key={index}
            aria-hidden={currentSlide !== index}
          >
            {child}
          </div>
        ))}
      </div>

      {arrows && totalSlides > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.prevArrow}`}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className={`${styles.arrow} ${styles.nextArrow}`}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      )}

      {totalSlides > 1 && (
        <div className={styles.dots}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

