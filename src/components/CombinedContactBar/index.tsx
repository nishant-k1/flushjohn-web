"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PhoneIcon } from "@/components/UI/Icons";
import styles from "./styles.module.css";
// Construct Google Ads conversion label from env vars
const GOOGLE_ADS_CONVERSION_PHONE_CALL = `${process.env.NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_PHONE_BUTTON_SUFFIX}`;

const CombinedContactBar = () => {
  const phone_link = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK!;
  const phone_number = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!;
  const [zipCode, setZipCode] = useState("");
  const [showResult, setShowResult] = useState(false);

  React.useEffect(() => {
    setShowResult(zipCode.length === 5);
  }, [zipCode]);

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 5);
    setZipCode(value);
    setShowResult(false);
  };


  return (
    <div className={styles.combinedBar}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Zip Code Checker Section */}
          <div className={styles.zipSection}>
            <div className={styles.zipForm}>
              <label htmlFor="zipCode" className={styles.zipLabel}>
                Enter Delivery Zipcode:
              </label>
              <input
                id="zipCode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                value={zipCode}
                onChange={handleZipChange}
                placeholder="Zip Code"
                className={styles.zipInput}
              />
              <span className={styles.zipHint}>Auto‑checks after 5 digits</span>
            </div>

            {/* Success message */}
            <div
              className={`${styles.resultMessage} ${showResult ? styles.resultVisible : styles.resultHidden}`}
            >
              <div className={styles.successIcon}>✓</div>
              <span className={styles.successText}>
                Yes! We deliver to your area.
              </span>
            </div>
          </div>

          {/* Phone Number Section */}
          <div className={styles.phoneSection}>
            <span className={styles.phoneLabel}>Order By Phone:</span>
            <Link
              href={phone_link}
              className={styles.phoneNumber}
              onClick={() => {
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
              <PhoneIcon className={styles.phoneIcon} size={16} />
              <span className={styles.phoneNumberText}>{phone_number}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedContactBar;
