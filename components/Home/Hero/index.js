import React from "react";
import styles from "./styles.module.css";

const Hero = React.memo(({ title, image }) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroWrapper}>
            <div className={styles.heroTitle}>
              <h1>{title}</h1>
            </div>
            <div className={styles.heroImage}>
              <img
                src={image.src}
                alt={image.alt}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Hero;
