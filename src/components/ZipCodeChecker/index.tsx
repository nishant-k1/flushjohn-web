"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";

const ZipCodeChecker = () => {
  const [zipCode, setZipCode] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

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

  return (
    <div className={styles.zipChecker}>
      <div className={styles.zipCheckerContent}>
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
        
        {showResult && (
          <div className={styles.resultMessage}>
            <div className={styles.successIcon}>✓</div>
            <span className={styles.successText}>Yes! We deliver to your area.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZipCodeChecker;

