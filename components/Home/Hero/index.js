import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { phone } from "../../../constants";
import PhoneIcon from "@mui/icons-material/Phone";
import { gtag } from "../../../google-gtag";
import Link from "next/link";

const Hero = React.memo(({ title, image }) => {
  const { phone_link, phone_number } = phone;

  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroTitle}>
            <h1>{title}</h1>
            <div className={styles.heroCta}>
              <Link
                href="/quote"
                className={styles.ctaQuoteBtn}
              >
                GET QUOTE
              </Link>
              <Link
                href={phone_link}
                className={styles.ctaPhoneBtn}
                onClick={() => {
                  gtag("event", "button_click", {
                    event_category: "Button",
                    event_label: "Homepage hero Phone Button Clicked",
                  });
                }}
              >
                <PhoneIcon />
                <div>{phone_number}</div>
              </Link>
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
