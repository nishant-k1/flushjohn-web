"use client";
import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

type Props = {};

const CTAsection = (props: Props) => {
  const router = useRouter();

  return (
    <div>
      <div className={styles.ctaSection}>
        <h3>Ready to Rent Your Porta Potty?</h3>
        <p>
          Join thousands of satisfied customers across the USA. Get a free,
          no-obligation quote today!
        </p>
        <button
          className={styles.ctaButton}
          onClick={() => router.push("/quote")}
        >
          Get My Free Quote
        </button>
        <p className={styles.ctaOffer}>
          🚀 Claim $15 OFF on Your First Rental!🎉
        </p>
      </div>
    </div>
  );
};

export default CTAsection;
