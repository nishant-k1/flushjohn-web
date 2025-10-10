"use client";

import React from "react";
import QuoteStep2 from "./QuoteStep2";
import QuoteStep3 from "./QuoteStep3";
import QuoteStep1 from "./QuoteStep1";
import QuoteStep4 from "./QuoteStep4";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/features/quote/contexts/QuoteContext";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";

const Quote = () => {
  const { render } = useContext(QuoteContext);
  const [step] = render;

  return (
    <React.Fragment>
      <div className={styles.section}>
        <AnimationWrapper
          effect={animations.fadeWithScale}
          className={styles.container}
        >
          <Breadcrumbs path={""} />
          <div className={styles.quoteWrapper}>
            <div className={styles.progressBar}>
              <div
                className={`${styles.step} ${
                  step === 1 || step === 2 || step === 3 || step === 4
                    ? `${styles.active}`
                    : null
                }`}
              >
                Requirement Details
              </div>
              <div
                className={`${styles.step} ${
                  step === 2 || step === 3 || step === 4
                    ? `${styles.active}`
                    : null
                }`}
              >
                Delivery Details
              </div>
              <div
                className={`${styles.step} ${
                  step === 3 || step === 4 ? `${styles.active}` : null
                }`}
              >
                Personal Details
              </div>
            </div>
            <div className={styles.innerSection}>
              {step === 1 ? (
                <AnimationWrapper effect={animations?.zoomOutAndZoomIn}>
                  <QuoteStep1 />{" "}
                </AnimationWrapper>
              ) : null}
              {step === 2 ? (
                <AnimationWrapper effect={animations?.zoomOutAndZoomIn}>
                  <QuoteStep2 />
                </AnimationWrapper>
              ) : null}
              {step === 3 ? (
                <AnimationWrapper effect={animations?.zoomOutAndZoomIn}>
                  <QuoteStep3 />
                </AnimationWrapper>
              ) : null}
              {step === 4 ? (
                <AnimationWrapper effect={animations?.zoomOutAndZoomIn}>
                  <QuoteStep4 />
                </AnimationWrapper>
              ) : null}
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </React.Fragment>
  );
};

export default Quote;
