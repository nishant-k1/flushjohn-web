"use client";

import React from "react";
import QuoteStep2 from "./QuoteStep2";
import QuoteStep3 from "./QuoteStep3";
import QuoteStep1 from "./QuoteStep1";
import QuoteStep4 from "./QuoteStep4";
import QuoteHero from "./QuoteHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/features/quote/contexts/QuoteContext";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";

const Quote = () => {
  const { render, quoteRequested } = useContext(QuoteContext);
  const [step] = render;

  return (
    <React.Fragment>
      <div className={styles.section}>
        <AnimationWrapper
          effect={animations.fadeWithScale}
          className={styles.container}
        >
          <div className={step !== 1 ? styles.breadcrumbWrapper : ""}>
            <Breadcrumbs path={""} />
          </div>

          {/* Hero Section - H1, Value Props, Trust Signals, Phone */}
          {step === 1 && <QuoteHero />}

          <div className={styles.quoteWrapper}>
            {/* Animated Progress Bar */}
            <div
              className={`${styles.progressBarContainer} ${step !== 1 ? styles.progressBarWithMargin : ""}`}
            >
              <div className={styles.progressBar}>
                {/* Progress Line Background */}
                <div className={styles.progressLine}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${step === 1 ? "0%" : step === 2 ? "33%" : step === 3 && quoteRequested ? "100%" : step === 3 ? "67%" : "100%"}`,
                      transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </div>

                {/* Step 1 */}
                <div className={styles.stepWrapper}>
                  <div
                    className={`${styles.stepIndicator} ${
                      step >= 2 ? styles.completed : ""
                    } ${step === 1 ? styles.current : ""}`}
                  >
                    {step >= 2 ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M16.6667 5L7.50004 14.1667L3.33337 10"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span className={styles.stepNumber}>1</span>
                    )}
                  </div>
                  <span
                    className={`${styles.stepLabel} ${step >= 2 ? styles.activeLabel : step === 1 ? styles.activeLabel : ""}`}
                  >
                    Requirement Details
                  </span>
                </div>

                {/* Step 2 */}
                <div className={styles.stepWrapper}>
                  <div
                    className={`${styles.stepIndicator} ${
                      step >= 3 ? styles.completed : ""
                    } ${step === 2 ? styles.current : ""}`}
                  >
                    {step >= 3 ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M16.6667 5L7.50004 14.1667L3.33337 10"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span className={styles.stepNumber}>2</span>
                    )}
                  </div>
                  <span
                    className={`${styles.stepLabel} ${step >= 3 ? styles.activeLabel : step === 2 ? styles.activeLabel : ""}`}
                  >
                    Delivery Details
                  </span>
                </div>

                {/* Step 3 */}
                <div className={styles.stepWrapper}>
                  <div
                    className={`${styles.stepIndicator} ${
                      step === 3 && quoteRequested ? styles.completed : ""
                    } ${step === 3 && !quoteRequested ? styles.current : ""}`}
                  >
                    {step === 3 && quoteRequested ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M16.6667 5L7.50004 14.1667L3.33337 10"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span className={styles.stepNumber}>3</span>
                    )}
                  </div>
                  <span
                    className={`${styles.stepLabel} ${step === 3 && quoteRequested ? styles.activeLabel : step === 3 ? styles.activeLabel : ""}`}
                  >
                    Personal Details
                  </span>
                </div>
              </div>

              {/* Progress Percentage */}
              <div className={styles.progressPercentage}>
                <span className={styles.percentageText}>
                  {step === 1
                    ? "0%"
                    : step === 2
                      ? "33%"
                      : step === 3 && quoteRequested
                        ? "100%"
                        : step === 3
                          ? "67%"
                          : "100%"}{" "}
                  Complete
                </span>
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
