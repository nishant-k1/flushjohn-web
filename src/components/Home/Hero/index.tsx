"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { phone } from "../../../constants";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import { logEvent } from "../../../../react-ga4-config";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";
import { phoneType } from "../../../constants";

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

const Hero = React.memo(({ title, image, truckImg }: HeroProps) => {
  const { phone_link, phone_number }: phoneType = phone;
  return (
    <div className={styles.hero}>
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
                  <PhoneIcon />
                  <div>{phone_number}</div>
                </Link>
              </div>
            </div>

            <div className={styles.heroImage}>
              {/* <AnimationWrapper effect={animations?.fadeWithScale}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  height={300}
                  width={300}
                />
              </AnimationWrapper> */}
            </div>
          </div>
        </div>
      </AnimationWrapper>
      {/* HIDE MOVING TRUCK PANEL*/}
      {/* <div
        className={styles.heroTruckImage}
        style={{ overflow: "hidden" }}
      >
        <AnimationWrapper effect={animations?.slideWithOpacityChange}>
          <Image
            src={truckImg.src}
            alt={image.alt}
            height={180}
            width={400}
          />
        </AnimationWrapper>
      </div> */}
    </div>
  );
});

export default Hero;
