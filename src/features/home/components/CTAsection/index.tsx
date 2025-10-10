"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { phone } from "@/constants";

type Props = {};

const CTAsection = (props: Props) => {
  const router = useRouter();
  const { phone_number, phone_link } = phone;

  return (
    <div>
      <div className={styles.ctaSection}>
        <h3>Ready to Rent Your Porta Potty?</h3>
        <p>
          Join thousands of satisfied customers across the USA. Get a free,
          no-obligation quote today!
        </p>

        <div className={styles.ctaButtons}>
          <button
            className={styles.ctaButton}
            onClick={() => router.push("/quote")}
          >
            Get My Free Quote
          </button>
          <a
            href={phone_link}
            className={styles.phoneButton}
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                typeof window.gtag === "function"
              ) {
                window.gtag("event", "conversion", {
                  send_to: "AW-11248564671/kLt0CLzekKoaEL_z3fMp",
                  event_category: "Phone Call",
                  event_label: "CTA Phone Link",
                  value: 1,
                });
              }
            }}
          >
            Call {phone_number}
          </a>
        </div>

        <p className={styles.ctaOffer}>
          🚀 Claim $15 OFF on Your First Rental! Limited Time Offer! 🎉
        </p>

        <div className={styles.trustElements}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>⚡</span>
            <span>Same-Day Delivery</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>💰</span>
            <span>Best Price Guarantee</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🧹</span>
            <span>Professionally Cleaned</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>📞</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAsection;
