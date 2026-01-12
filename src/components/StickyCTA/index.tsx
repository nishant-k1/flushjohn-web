"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import styles from "./styles.module.css";
import { GOOGLE_ADS_CONVERSION_PHONE_CALL } from "@/config/env";

const phone_link = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE_LINK!;
const phone_number = process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!;

interface StickyCTAProps {
  city?: string;
  state?: string;
}

const StickyCTA = ({ city, state }: StickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const locationText = city ? `${city}${state ? `, ${state}` : ""}` : "";

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.stickyCTA}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.text}>
            <strong>
              {locationText
                ? `Ready to rent porta potties in ${locationText}?`
                : "Need porta potty rental?"}
            </strong>
            <span>Get your free quote today!</span>
          </div>
          <div className={styles.buttons}>
            <Link
              href="/quote"
              className={styles.quoteButton}
            >
              <MessageCircle size={18} />
              Get Free Quote
            </Link>
            <a
              href={phone_link}
              className={styles.phoneButton}
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  typeof window.gtag === "function" &&
                  GOOGLE_ADS_CONVERSION_PHONE_CALL
                ) {
                  window.gtag("event", "conversion", {
                    send_to: GOOGLE_ADS_CONVERSION_PHONE_CALL,
                    event_category: "Phone Call",
                    event_label: "Sticky CTA Phone",
                    value: 1,
                  });
                }
              }}
            >
              <Phone size={18} />
              {phone_number}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
