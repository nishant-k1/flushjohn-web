import React from "react";
import styles from "./styles.module.css";
import { BiCircle } from "react-icons/bi";

type IndicatorProps = {
  toggle?: boolean;
  onIndicatorClick?: (index: number) => void;
  totalSlides?: number;
  currentSlide?: number;
};

const Indicator = ({ 
  toggle, 
  onIndicatorClick, 
  totalSlides = 2, 
  currentSlide = 0 
}: IndicatorProps) => {
  return (
    <div className={styles.indicator}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onIndicatorClick?.(index)}
          className={styles.indicatorButton}
          aria-label={`Go to slide ${index + 1}`}
          type="button"
        >
          <BiCircle
            className={`${styles.circle} ${
              index === currentSlide ? styles.active : styles.inactive
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default Indicator;
