import React from "react";
import QuoteStep2 from "./QuoteStep2";
import QuoteStep3 from "./QuoteStep3";
import QuoteStep1 from "./QuoteStep1";
import QuoteStep4 from "./QuoteStep4";
import { useRouter } from "next/router";
import Breadcrumbs from "../Breadcrumbs";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "../../contexts/QuoteContext";

const Quote = () => {
  const router = useRouter();
  const { render } = useContext(QuoteContext);
  const [step] = render;
  return (
    <React.Fragment>
      <div className={styles.section}>
        <div className={styles.container}>
          <Breadcrumbs />
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
              {step === 1 ? <QuoteStep1 /> : null}
              {step === 2 ? <QuoteStep2 /> : null}
              {step === 3 ? <QuoteStep3 /> : null}
              {step === 4 ? <QuoteStep4 /> : null}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Quote;
