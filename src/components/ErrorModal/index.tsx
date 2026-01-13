"use client";

import React, { useEffect, useState, useRef } from "react";
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
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-message"
    >
      <div
        ref={modalRef}
        className={`${styles.modal} ${showContent ? styles.modalShow : ""}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
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
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close error message"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ErrorModal;
