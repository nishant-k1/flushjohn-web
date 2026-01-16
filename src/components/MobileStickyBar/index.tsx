"use client";

import React from "react";
import styles from "./styles.module.css";
import { QuickQuoteContext } from "@/features/quote/contexts/QuickQuoteContext";
import { QuickQuoteContextType } from "@/features/quote/contexts/QuickQuoteContext";
import { PhoneIcon } from "@/components/UI/Icons";

// Construct Google Ads conversion label from env vars
const GOOGLE_ADS_CONVERSION_PHONE_CALL = `${process.env.NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_PHONE_BUTTON_SUFFIX}`;

const phone_link = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK!;

const MobileStickyBar = () => {
  const { quickQuoteViewStatus, setQuickQuoteViewStatus, setQuickQuoteTitle } =
    React.useContext<QuickQuoteContextType>(QuickQuoteContext);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible || quickQuoteViewStatus) return null;

  return (
    <div className={styles.mobileStickyBar} role="region" aria-label="Quick actions">
      <button
        className={styles.quoteButton}
        onClick={() => {
          setQuickQuoteTitle("Quick Quote");
          setQuickQuoteViewStatus(true);
        }}
        type="button"
      >
        Get Free Quote
      </button>
      <a
        href={phone_link}
        className={styles.phoneButton}
        aria-label="Call us now"
        onClick={() => {
          if (
            typeof window !== "undefined" &&
            typeof window.gtag === "function" &&
            GOOGLE_ADS_CONVERSION_PHONE_CALL
          ) {
            window.gtag("event", "conversion", {
              send_to: GOOGLE_ADS_CONVERSION_PHONE_CALL,
            });
          }
        }}
      >
        <PhoneIcon size={18} aria-hidden="true" />
        Call
      </a>
    </div>
  );
};

export default MobileStickyBar;
