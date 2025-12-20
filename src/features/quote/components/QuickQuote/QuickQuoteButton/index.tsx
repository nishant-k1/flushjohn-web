"use client";

import * as React from "react";
import { QuickQuoteContext } from "../../../contexts/QuickQuoteContext";
import styles from "./styles.module.css";
import { PhoneIcon } from "@/components/UI/Icons";
import { phone } from "@/constants";
import Link from "next/link";

export default function QuickQuoteButton() {
  const { phone_link } = phone;
  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext(QuickQuoteContext);
  const [showCallout, setShowCallout] = React.useState(true);

  React.useEffect(() => {
    // Hide callout after 5 seconds
    const timer = setTimeout(() => {
      setShowCallout(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
          <span className={styles.calloutText}>Call us now!</span>
        </div>
      )}
      <Link
        href={phone_link}
        className={styles.phoneBtn}
        aria-label="Call Us"
        onClick={() => {
          window.gtag("event", "conversion", {
            send_to: "AW-11248564671/OTFxCOSso6oaEL_z3fMp",
            event_category: "Phone Call",
            event_label: "Quick Phone Link",
            value: 1,
          });
        }}
      >
        <PhoneIcon className={styles.icon} size={24} />
      </Link>
    </div>
  );
}
