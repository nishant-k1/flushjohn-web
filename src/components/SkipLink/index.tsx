"use client";

import React from "react";
import styles from "./styles.module.css";

/**
 * SkipLink Component
 * 
 * Provides keyboard-accessible skip navigation link for screen reader users.
 * Hidden by default, appears on focus to allow users to skip to main content.
 * WCAG 2.1 Level A compliance requirement.
 */
const SkipLink = () => {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Skip to main content
    </a>
  );
};

export default SkipLink;
