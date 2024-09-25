"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { phone } from "../../../constants";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import { logEvent } from "../../../../react-ga4-config";


type HeroProps = {
  title: string;
  image: {
    src: string;
    alt: string;
  }
}
const Hero = React.memo(({ title, image }:HeroProps) => {
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
                  logEvent({
                    category: "Button",
                    action: "Home Page Hero Section Phone Call",
                    label: "Home Page Hero Section Phone Call Button",
                    value: undefined,
                    nonInteraction: undefined,
                    transport: "beacon",
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
