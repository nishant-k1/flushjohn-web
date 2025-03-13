"use client";

import * as React from "react";
import { QuickQuoteContext } from "../../../contexts/QuickQuoteContext";
import styles from "./styles.module.css";
import PhoneIcon from "@mui/icons-material/Phone";
import { phone } from "../../../constants";
import Link from "next/link";

export default function QuickQuoteButton() {
  const { phone_link } = phone;
  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext(QuickQuoteContext);

  return (
    <div>
      <button
        onClick={() => {
          setQuickQuoteViewStatus(!quickQuoteViewStatus);
        }}
        className={styles.quickQuoteBtn}
      >
        Quick Quote
      </button>
      <Link
        href={phone_link}
        className={styles.phoneBtn}
        aria-label="Call Us"
        onClick={() => {
          window.gtag("event", "Quick Phone Call", {
            event_category: "Phone Call",
            event_label: "Quick Phone Link",
            value: 1,
          });
        }}
      >
        <PhoneIcon className={styles.icon} />
      </Link>
    </div>
  );
}
