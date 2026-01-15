"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Zap, DollarSign, Droplet, Phone, Tag } from "lucide-react";
import styles from "./styles.module.css";
// Construct Google Ads conversion label from env vars
const GOOGLE_ADS_CONVERSION_PHONE_CALL = `${process.env.NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_PHONE_BUTTON_SUFFIX}`;

type Props = {};

const CTAsection = (props: Props) => {
  const router = useRouter();
  const phone_number = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!;
  const phone_link = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK!;

  return (
    <div>
      <div className={styles.ctaSection}>
        <div className={styles.container}>
          <h3>Get Your Free Quote in 60 Seconds</h3>
          <p>
            Join thousands of satisfied customers across the USA. Get a free, no-obligation quote today!
          </p>

          <div className={styles.ctaButtons}>
            <button
              className={styles.ctaButton}
              onClick={() => {
                router.push("/quote");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
            >
              Get My Free Quote
            </button>
            <a
              href={phone_link}
              className={styles.phoneButton}
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
              Call {phone_number}
            </a>
          </div>

          <p className={styles.ctaOffer}>
            <Tag
              size={18}
              style={{
                display: "inline",
                verticalAlign: "middle",
                marginRight: "4px",
              }}
            />
            Claim $15 OFF on Your First Rental! Limited Time Offer!
          </p>

          <div className={styles.trustElements}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <Zap size={20} />
              </span>
              <span>Fast Delivery (24-48hrs)</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <DollarSign size={20} />
              </span>
              <span>Best Price Guarantee</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <Droplet size={20} />
              </span>
              <span>Professionally Cleaned</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <Phone size={20} />
              </span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAsection;
