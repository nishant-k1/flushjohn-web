"use client";

import React from "react";
import Link from "next/link";
import { phone } from "@/constants";
import { PhoneIcon } from "@/components/UI/Icons";
import styles from "./styles.module.css";

const PhoneNumberBar = () => {
  const { phone_link, phone_number } = phone;

  return (
    <div className={styles.phoneBar}>
      <div className={styles.phoneBarContent}>
        <div className={styles.phoneBarLeft}>
          <span className={styles.phoneBarLabel}>Order By Phone:</span>
        </div>
        <Link
          href={phone_link}
          className={styles.phoneNumber}
          onClick={() => {
            if (
              typeof window !== "undefined" &&
              typeof window.gtag === "function"
            ) {
              window.gtag("event", "conversion", {
                send_to: "AW-11248564671/kLt0CLzekKoaEL_z3fMp",
                event_category: "Phone Call",
                event_label: "Phone Bar Link",
                value: 1,
              });
            }
          }}
        >
          <PhoneIcon
            className={styles.phoneIcon}
            size={20}
          />
          <span className={styles.phoneNumberText}>{phone_number}</span>
        </Link>
      </div>
    </div>
  );
};

export default PhoneNumberBar;
