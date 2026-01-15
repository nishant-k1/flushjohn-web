"use client";

import React from "react";
import HeroQuickQuote from "@/components/HeroQuickQuote";
import QuoteHero from "./QuoteHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "./styles.module.css";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";

const Quote = () => {
  return (
    <>
      <Breadcrumbs path={""} />
      <section className={styles.quoteSection}>
        <div className={styles.container}>
          <AnimationWrapper
            effect={animations.fadeWithScale}
            className={styles.quoteHeroWrapper}
          >
            <QuoteHero />
            <AnimationWrapper effect={animations?.zoomOutAndZoomIn}>
              <HeroQuickQuote />
            </AnimationWrapper>
          </AnimationWrapper>
        </div>
      </section>
    </>
  );
};

export default Quote;
