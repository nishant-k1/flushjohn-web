import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { phone } from "../../../constants";
import PhoneIcon from "@mui/icons-material/Phone";

const Hero = React.memo(({ title, image }) => {
  const { phone_link, phone_number } = phone;

  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroTitle}>
            <h1>{title}</h1>
            <div className={styles.heroCta}>
              <a
                href="/quote"
                className={styles.ctaQuoteBtn}
              >
                GET QUOTE
              </a>
              <a
                href={phone_link}
                className={styles.ctaPhoneBtn}
              >
                <PhoneIcon />
                <div>{phone_number}</div>
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
