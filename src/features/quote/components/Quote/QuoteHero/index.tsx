"use client";

import React from "react";
import styles from "./styles.module.css";

const phone_link = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK!;
const phone_number = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!;

const QuoteHero = () => {
  return (
    <div className={styles.hero}>
      {/* H1 Heading for SEO - Clean and Simple */}
      <h1 className={styles.h1}>Get Your Free Porta Potty Rental Quote</h1>

      {/* Simple Subheading */}
      <p className={styles.subheading}>
        Quick, easy, and no obligation. Fast delivery typically within 24-48
        hours.
      </p>

      {/* Phone Number - Clean CTA */}
      <div className={styles.phoneSection}>
        <a
          href={phone_link}
          className={styles.phoneLink}
          aria-label={`Call FlushJohn at ${phone_number}`}
        >
          <span className={styles.phoneNumber}>{phone_number}</span>
          <span className={styles.phoneLabel}>Or call us</span>
        </a>
      </div>

      {/* Minimal Trust Signal */}
      <div className={styles.trustBadge}>
        <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
        <span className={styles.trustText}>4.8/5 from 127+ customers</span>
      </div>
    </div>
  );
};

export default QuoteHero;
