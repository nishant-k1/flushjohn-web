"use client";

import React from "react";
import styles from "./styles.module.css";
import { phone } from "../../../constants";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import { logEvent } from "../../../../react-ga4-config";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";
import { phoneType } from "../../../constants";
import HeroQuickQuote from "@/components/HeroQuickQuote";
import CarouselView from "@/components/CarouselView";

type HeroProps = {
  title: string;
  image: {
    src: string;
    alt: string;
  };
  truckImg: {
    src: string;
    alt: string;
  };
};

const Hero = React.memo(({ title }: HeroProps) => {
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
