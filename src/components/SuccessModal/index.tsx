"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll when modal is open
      document.body.style.overflow = "hidden";
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
      // Restore body scroll when modal is closed
      document.body.style.overflow = "";
    }

    // Cleanup function to restore scroll if component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div 
      className={styles.overlay} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-message"
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
          <h2 id="success-modal-title" className={styles.title}>{title}</h2>
          <p id="success-modal-message" className={styles.message} role="alert" aria-live="polite">{message}</p>
          {submessage && <p className={styles.submessage}>{submessage}</p>}
        </div>

        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Close success message">
          Got it!
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default SuccessModal;
