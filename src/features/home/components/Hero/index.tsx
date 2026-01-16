"use client";

import React from "react";
import styles from "./styles.module.css";
import { PhoneIcon } from "@/components/UI/Icons";
import Link from "next/link";
import dynamic from "next/dynamic";
// Construct Google Ads conversion label from env vars
const GOOGLE_ADS_CONVERSION_PHONE_CALL = `${process.env.NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_PHONE_BUTTON_SUFFIX}`;
// Import CarouselView directly (not dynamically) to ensure LCP image loads immediately
import CarouselView from "@/components/CarouselView";

const InlineQuickQuote = dynamic(
  () => import("@/features/quote/components/QuickQuote/InlineQuickQuote"),
  {
    loading: () => <div className={styles.skeletonQuote} />,
  }
);

type HeroProps = {
  title: string;
  subTitle: string;
};

const phone_link = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK!;
const phone_number = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!;

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
            <div className={styles.serviceBadge}>
              <span className={styles.badgeIcon}>✓</span>
              <span>Serving 25+ Cities Across 6 States</span>
            </div>
            <h1>{title}</h1>
            <h2>{subTitle}</h2>
            <div className={styles.heroCta}>
              <Link href="/quote" className={styles.ctaQuoteBtn}>
                GET A QUOTE
              </Link>
              <Link
                href={phone_link}
                className={styles.ctaPhoneBtn}
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    typeof window.gtag === "function" &&
                    GOOGLE_ADS_CONVERSION_PHONE_CALL
                  ) {
                    // Google's recommended format: only send_to parameter
                    window.gtag("event", "conversion", {
                      send_to: GOOGLE_ADS_CONVERSION_PHONE_CALL,
                    });
                  }
                }}
              >
                <div>{phone_number}</div>
                <PhoneIcon className={styles.flippedIcon} size={18} />
              </Link>
            </div>
            <div className={styles.heroTrust}>
              <span>⭐ 4.8/5</span>
              <span>120+ reviews</span>
              <span>Fast delivery 24–48 hrs</span>
            </div>
          </div>

          {/* Lazy-loaded form with skeleton fallback */}
          <div className={styles.heroImage}>
            <InlineQuickQuote />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Hero;
