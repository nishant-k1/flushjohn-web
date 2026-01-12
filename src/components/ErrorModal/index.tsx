"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  submessage?: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title = "Oops!",
  message = "Something went wrong. Please try again.",
  submessage = "If the problem persists, please contact our support team.",
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
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-message"
    >
      <div
        className={`${styles.modal} ${showContent ? styles.modalShow : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Error Icon Circle */}
        <div className={styles.errorWrapper}>
          <div
            className={`${styles.errorCircle} ${showContent ? styles.errorCircleShow : ""}`}
          >
            <svg
              className={`${styles.errorIcon} ${showContent ? styles.errorIconShow : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className={styles.errorCircleSvg}
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className={styles.errorX}
                fill="none"
                d="M16 16 36 36 M36 16 16 36"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className={styles.content}>
          <h2 id="error-modal-title" className={styles.title}>{title}</h2>
          <p id="error-modal-message" className={styles.message} role="alert" aria-live="assertive">{message}</p>
          {submessage && <p className={styles.submessage}>{submessage}</p>}
        </div>

        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Close error message">
          Try Again
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ErrorModal;
