"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
          <h3>Ready to Get Started?</h3>
          <p>
            Get your free quote in 60 seconds or speak with our team now.
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
          </div>

          <p className={styles.ctaOffer}>
            or call <a
              href={phone_link}
              className={styles.phoneLink}
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
              {phone_number}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTAsection;
