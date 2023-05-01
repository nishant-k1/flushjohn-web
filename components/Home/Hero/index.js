import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";

const Hero = React.memo(({ title, image }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroTitle}>
            <h1>{title}</h1>
            <div className={styles.heroCta}>
              <a
                className={styles.ctaQuoteBtn}
                href="/quote"
              >
                GET QUOTE
              </a>
              <a
                href="tel:+1 326-598-5963"
                className={styles.ctaPhoneBtn}
              >
                362-569-3598
              </a>
            </div>
          </div>

          <div className={styles.heroImage}>
            <Image
              src={image.src}
              alt={image.alt}
              height={300}
              width={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Hero;
