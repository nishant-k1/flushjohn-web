"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { phone } from "../../../constants";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load components with skeleton placeholders
const CarouselView = dynamic(() => import("@/components/CarouselView"), {
  ssr: false,
  loading: () => <div className={styles.skeletonCarousel} />,
});
const HeroQuickQuote = dynamic(() => import("@/components/HeroQuickQuote"), {
  ssr: false,
  loading: () => <div className={styles.skeletonQuote} />,
});

type HeroProps = {
  title: string;
  subTitle: string;
};

// Extract phone data once outside the component
const { phone_link, phone_number } = phone;

const Hero = React.memo(({ title, subTitle }: HeroProps) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowForm(true), 2000);
  }, []);

  return (
    <div className={styles.hero}>
      {/* Lazy-loaded carousel with skeleton fallback */}
      <div className={styles.carouselWrapper}>
        {showForm && <CarouselView />}
      </div>
      <div className={styles.container}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroTitle}>
            <h1>{title}</h1>
            <h2>{subTitle}</h2>
            <div className={styles.heroCta}>
              <Link
                href="/quote"
                className={styles.ctaQuoteBtn}
              >
                GET A QUOTE
              </Link>
              <Link
                href={phone_link}
                className={styles.ctaPhoneBtn}
              >
                <div>{phone_number}</div>
                <PhoneIcon className={styles.flippedIcon} />
              </Link>
            </div>
          </div>

          {/* Lazy-loaded form with skeleton fallback */}
          <div className={styles.heroImage}>
            <HeroQuickQuote />
          </div>
        </div>
      </div>
    </div>
  );
});

// Only re-render if title or subTitle changes
export default Hero;
