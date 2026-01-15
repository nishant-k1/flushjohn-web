"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface LogoProps {
  height?: string | number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ height = "3rem", className = "" }) => {
  return (
    <div className={`${styles.logoContainer} ${className}`} style={{ height }}>
      {/* Logo Icon */}
      <div className={styles.iconWrapper}>
        <Image
          src="/flush_john_logo-transparent_bg.png"
          alt="FlushJohn Logo"
          width={343}
          height={219}
          priority={true}
          className={styles.logoIcon}
          style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </div>
      
      {/* Text: Flush John */}
      <div className={styles.textContainer}>
        <span className={styles.flushText}>Flush</span>
        <span className={styles.johnText}>John</span>
      </div>
    </div>
  );
};

export default Logo;
