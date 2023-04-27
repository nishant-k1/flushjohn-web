import * as React from "react";
import { QuickQuoteContext } from "../../../contexts/QuickQuoteContext";
import styles from "../styles.module.css";
import { motion } from "framer-motion";

export default function QuickQuoteButton() {
  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext(QuickQuoteContext);

  return (
    <button
      onClick={() => {
        setQuickQuoteViewStatus(!quickQuoteViewStatus);
      }}
      className={styles.quickQuoteBtn}
    >
      Quick Free Quote
    </button>
  );
}
