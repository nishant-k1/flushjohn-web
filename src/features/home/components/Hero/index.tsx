"use client";

import React from "react";
import styles from "./styles.module.css";
import { phone } from "@/constants";
import { PhoneIcon } from "@/components/UI/Icons";
import Link from "next/link";
import dynamic from "next/dynamic";
// Import CarouselView directly (not dynamically) to ensure LCP image loads immediately
import CarouselView from "@/components/CarouselView";

const HeroQuickQuote = dynamic(() => import("@/components/HeroQuickQuote"), {
  loading: () => <div className={styles.skeletonQuote} />,
});

type HeroProps = {
  title: string;
  subTitle: string;
};

const { phone_link, phone_number } = phone;

const Hero = React.memo(({ title, subTitle }: HeroProps) => {
  return (
    <div className={styles.hero}>
      {/* Background carousel */}
      <div className={styles.carouselWrapper}>
        <CarouselView />
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
                onClick={() => {
                  window.gtag("event", "conversion", {
                    send_to: "AW-11248564671/kLt0CLzekKoaEL_z3fMp",
                    event_category: "Phone Call",
                    event_label: "Hero Phone Link",
                    value: 1,
                  });
                }}
              >
                <div>{phone_number}</div>
                <PhoneIcon
                  className={styles.flippedIcon}
                  size={20}
                />
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

export default Hero;
