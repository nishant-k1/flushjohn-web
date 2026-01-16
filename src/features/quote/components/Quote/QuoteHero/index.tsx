"use client";

import React from "react";
import styles from "./styles.module.css";

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

    </div>
  );
};

export default QuoteHero;
