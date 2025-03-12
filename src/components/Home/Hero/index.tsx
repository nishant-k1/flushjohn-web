"use client";

import React from "react";
import styles from "./styles.module.css";
import { phone } from "../../../constants";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";
import { phoneType } from "../../../constants";
import dynamic from "next/dynamic";
const CarouselView = dynamic(() => import("@/components/CarouselView"), {
  ssr: false,
});
const HeroQuickQuote = dynamic(() => import("@/components/HeroQuickQuote"), {
  ssr: false,
});

type HeroProps = {
  title: string;
  subTitle: string;
  image: {
    src: string;
    alt: string;
  };
  truckImg: {
    src: string;
    alt: string;
  };
};

const Hero = React.memo(({ title, subTitle }: HeroProps) => {
  const { phone_link, phone_number }: phoneType = phone;
  return (
    <div className={styles.hero}>
      <div className={styles.carouselWrapper}>
        <CarouselView />
      </div>
      <AnimationWrapper effect={animations.fadeWithScale}>
        <div className={styles.container}>
          <div className={styles.heroWrapper}>
            <div className={styles.heroTitle}>
              <h1>{title} -</h1>
              <h2>{subTitle}</h2>
              <div className={styles.heroCta}>
                <Link
                  href="/quote"
                  className={styles.ctaQuoteBtn}
                >
                  GET A QUOTE
                </Link>
                <Link
                  href={phone_link}
                  className={styles.ctaPhoneBtn}
                >
                  <div>{phone_number}</div>
                  <PhoneIcon className={styles.flippedIcon} />
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <HeroQuickQuote />
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  );
});

export default Hero;
