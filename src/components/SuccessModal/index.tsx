"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  submessage?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Thank You!",
  message = "Your quote request has been received successfully.",
  submessage = "One of our representatives will contact you within 24 hours.",
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={`${styles.modal} ${showContent ? styles.modalShow : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Checkmark Circle */}
        <div className={styles.checkmarkWrapper}>
          <div
            className={`${styles.checkmarkCircle} ${showContent ? styles.checkmarkCircleShow : ""}`}
          >
            <svg
              className={`${styles.checkmark} ${showContent ? styles.checkmarkShow : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className={styles.checkmarkCircleSvg}
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className={styles.checkmarkCheck}
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.message}>{message}</p>
          {submessage && <p className={styles.submessage}>{submessage}</p>}
        </div>

        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
