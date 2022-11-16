import * as React from "react";
import { QuickQuoteContext } from "../contexts/QuickQuoteContext";
import styles from "../styles/QuickQuote.module.css";

export default function QuickQuoteButton() {
  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext(QuickQuoteContext);

  return (
    <button
      variant="contained"
      size="small"
      onClick={() => {
        setQuickQuoteViewStatus(!quickQuoteViewStatus);
      }}
      className={styles.quickQuoteBtn}
    >
      Quick Free Quote
    </button>
  );
}
