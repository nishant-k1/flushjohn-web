"use client";

import * as React from "react";
import { QuickQuoteContext } from "../../../contexts/QuickQuoteContext";
import styles from "./styles.module.css";
import { PhoneIcon } from "@/components/UI/Icons";
import Link from "next/link";

const phone_link = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK!;

export default function QuickQuoteButton() {
  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext(QuickQuoteContext);
  const [showCallout, setShowCallout] = React.useState(true);

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
      {showCallout && (
        <div className={styles.callout}>
          <button
            className={styles.calloutClose}
            onClick={() => setShowCallout(false)}
            aria-label="Close callout"
          >
            ×
          </button>
          <span className={styles.calloutText}>Order By Phone</span>
        </div>
      )}
      <Link
        href={phone_link}
        className={styles.phoneBtn}
        aria-label="Call Us"
        onClick={() => {
          if (
            typeof window !== "undefined" &&
            typeof window.gtag === "function"
          ) {
            window.gtag("event", "conversion", {
              send_to: "AW-11248564671/OTFxCOSso6oaEL_z3fMp",
              event_category: "Phone Call",
              event_label: "Quick Phone Link",
              value: 1,
            });
          }
        }}
      >
        <PhoneIcon className={styles.icon} size={24} />
      </Link>
    </div>
  );
}
