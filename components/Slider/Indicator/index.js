import React from "react";
import styles from "./styles.module.css";
import { BiCircle } from "react-icons/bi";
import Link from "next/link";

const Indicator = ({ toggle }) => {
  return (
    <div>
      <div className={styles.indicator}>
        <BiCircle
          className={`${styles.circle} ${
            toggle ? styles.active : styles.inactive
          }`}
        />
        <BiCircle
          className={`${styles.circle} ${
            !toggle ? styles.active : styles.inactive
          }`}
        />
      </div>
      <button className={styles.quoteLink}>
        <Link href="/quote">Get Free Quote</Link>
      </button>
    </div>
  );
};

export default Indicator;
