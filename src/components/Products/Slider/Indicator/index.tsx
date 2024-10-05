import React from "react";
import styles from "./styles.module.css";
import { BiCircle } from "react-icons/bi";

type IndicatorProps = {
  toggle: boolean;
};
const Indicator = ({ toggle }: IndicatorProps) => {
  return (
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
  );
};

export default Indicator;
