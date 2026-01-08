"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { phone } from "@/constants";
import styles from "./styles.module.css";

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
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  typeof window.gtag === "function"
                ) {
                  window.gtag("event", "conversion", {
                    send_to: "AW-11248564671/kLt0CLzekKoaEL_z3fMp",
                    event_category: "Quote Request",
                    event_label: "Sticky CTA Quote",
                    value: 1,
                  });
                }
              }}
            >
              <MessageCircle size={18} />
              Get Free Quote
            </Link>
            <a
              href={phone.phone_link}
              className={styles.phoneButton}
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  typeof window.gtag === "function"
                ) {
                  window.gtag("event", "conversion", {
                    send_to: "AW-11248564671/kLt0CLzekKoaEL_z3fMp",
                    event_category: "Phone Call",
                    event_label: "Sticky CTA Phone",
                    value: 1,
                  });
                }
              }}
            >
              <Phone size={18} />
              {phone.phone_number}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
