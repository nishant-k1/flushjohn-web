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
      <div className={styles.section}>
        <AnimationWrapper
          effect={animations.fadeWithScale}
          className={styles.container}
        >
          <div className={styles.breadcrumbWrapper}>
            <Breadcrumbs path={""} />
          </div>

          {/* Hero Section - H1, Value Props, Trust Signals, Phone */}
          <QuoteHero />

          <div className={styles.quoteWrapper}>
            <div className={styles.innerSection}>
              <AnimationWrapper effect={animations?.zoomOutAndZoomIn}>
                <QuoteSinglePage />
              </AnimationWrapper>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </React.Fragment>
  );
};

export default Quote;
