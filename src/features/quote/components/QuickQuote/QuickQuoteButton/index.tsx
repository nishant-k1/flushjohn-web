"use client";

import * as React from "react";
import { QuickQuoteContext } from "../../../contexts/QuickQuoteContext";
import styles from "./styles.module.css";
import { PhoneIcon } from "@/components/UI/Icons";
import Link from "next/link";
// Construct Google Ads conversion label from env vars (same as site-wide call button)
const GOOGLE_ADS_CONVERSION_PHONE_CALL = `${process.env.NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_PHONE_BUTTON_SUFFIX}`;

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
        onClick={(e) => {
          // Fire conversion event (same as site-wide call button)
          // Use Google's recommended format: only send_to parameter
          if (
            typeof window !== "undefined" &&
            typeof window.gtag === "function" &&
            GOOGLE_ADS_CONVERSION_PHONE_CALL
          ) {
            // Google's recommended format: only send_to parameter
            window.gtag("event", "conversion", {
              send_to: GOOGLE_ADS_CONVERSION_PHONE_CALL,
            });
          }
        }}
      >
        <PhoneIcon className={styles.icon} size={24} />
      </Link>
    </div>
  );
}
