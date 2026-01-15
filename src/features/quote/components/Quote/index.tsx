"use client";

import React from "react";
import QuoteSinglePage from "./QuoteSinglePage";
import QuoteHero from "./QuoteHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "./styles.module.css";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";

const Quote = () => {
  return (
    <React.Fragment>
      <Breadcrumbs path={""} />
      <section className={styles.section}>
        <div className={styles.container}>
          <AnimationWrapper effect={animations.fadeWithScale}>
            <QuoteHero />
          </AnimationWrapper>

          <AnimationWrapper effect={animations?.zoomOutAndZoomIn}>
            <QuoteSinglePage />
          </AnimationWrapper>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Quote;
