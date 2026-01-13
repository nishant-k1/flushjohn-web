"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Focus trap and management
  useEffect(() => {
    if (!isOpen || !mounted) return;

    // Save currently focused element
    previousActiveElementRef.current = document.activeElement as HTMLElement;

      // Lock body scroll when modal is open
      document.body.style.overflow = "hidden";
      setTimeout(() => setShowContent(true), 100);

    // Focus close button when modal opens
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 150);

    // Get all focusable elements within modal
    const getFocusableElements = (): HTMLElement[] => {
      if (!modalRef.current) return [];
      const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      return Array.from(modalRef.current.querySelectorAll<HTMLElement>(selector));
    };

    // Handle Tab key for focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
    }

      if (e.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus to previous element
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen, mounted, onClose]);

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
        ref={modalRef}
        className={`${styles.modal} ${showContent ? styles.modalShow : ""}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
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
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close success message"
        >
          Got it!
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default SuccessModal;
