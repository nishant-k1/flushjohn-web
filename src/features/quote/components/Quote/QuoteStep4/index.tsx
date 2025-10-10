import React from "react";
import { TiTick } from "react-icons/ti";
import styles from "./styles.module.css";
import { websiteURL } from "@/constants";

const QuoteStep4 = () => {
  return (
    <div className={styles.step4}>
      <TiTick className={styles.tick} />
      <h1 className={styles.thanks}>Thank You!</h1>
      <h2 className={styles.confirmation}>
        Request sent successfully. One of our representative will contact you
        shortly.
      </h2>
      <div className={styles.linkAndMessage}>
        <a
          className={styles.refreshLink}
          type="button"
          href={`${websiteURL}/quote`}
        >
          Click Here
          <p className={styles.refreshLinkMessage}>
            to submit a new quote request.
          </p>
        </a>
      </div>
    </div>
  );
};

export default QuoteStep4;
