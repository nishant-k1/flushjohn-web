"use client";

import React, { useState } from "react";
import Link from "next/link";
import { phone } from "@/constants";
import { PhoneIcon } from "@/components/UI/Icons";
import styles from "./styles.module.css";

const CombinedContactBar = () => {
  const { phone_link, phone_number } = phone;
  const [zipCode, setZipCode] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const zipSectionRef = React.useRef<HTMLDivElement>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zipCode || zipCode.length !== 5) {
      return;
    }

    setIsChecking(true);
    
    // Simulate a brief check (always returns yes)
    setTimeout(() => {
      setIsChecking(false);
      setShowResult(true);
    }, 500);
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 5);
    setZipCode(value);
    setShowResult(false);
  };

  // Close popover when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        zipSectionRef.current &&
        !zipSectionRef.current.contains(event.target as Node) &&
        showResult
      ) {
        setShowResult(false);
      }
    };

    if (showResult) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResult]);

  return (
    <div className={styles.combinedBar}>
      <div className={styles.container}>
        {/* Zip Code Checker Section */}
        <div className={styles.zipSection} ref={zipSectionRef}>
          <form onSubmit={handleCheck} className={styles.zipForm}>
            <label htmlFor="zipCode" className={styles.zipLabel}>
              Enter Delivery Zipcode:
            </label>
            <div className={styles.zipInputGroup}>
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
              <button
                type="submit"
                className={styles.checkButton}
                disabled={zipCode.length !== 5 || isChecking}
              >
                {isChecking ? "Checking..." : "Can I get it?"}
              </button>
            </div>
          </form>
          
          {/* Success message - positioned absolutely to prevent layout shift */}
          <div className={`${styles.resultMessage} ${showResult ? styles.resultVisible : styles.resultHidden}`}>
            <div className={styles.successIcon}>✓</div>
            <span className={styles.successText}>Yes! We deliver to your area.</span>
          </div>
        </div>

        {/* Phone Number Section */}
        <div className={styles.phoneSection}>
          <span className={styles.phoneLabel}>ORDER BY PHONE:</span>
          <Link
            href={phone_link}
            className={styles.phoneNumber}
            onClick={() => {
              if (typeof window !== "undefined" && typeof window.gtag === "function") {
                window.gtag("event", "conversion", {
                  send_to: "AW-11248564671/kLt0CLzekKoaEL_z3fMp",
                  event_category: "Phone Call",
                  event_label: "Phone Bar Link",
                  value: 1,
                });
              }
            }}
          >
            <PhoneIcon className={styles.phoneIcon} size={20} />
            <span className={styles.phoneNumberText}>{phone_number}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CombinedContactBar;

