"use client";

import { useEffect } from "react";

/**
 * Client-side error suppression component
 * Suppresses non-critical MIME type errors from browser extensions
 * This replaces the inline script in layout.tsx to allow proper cleanup
 */
export const ErrorSuppression = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Store original console methods
    const originalError = console.error;
    const originalWarn = console.warn;

    // Track if we've already set up listeners to prevent duplicates
    if ((window as any).__errorSuppressionSetup) {
      return; // Already set up
    }
    (window as any).__errorSuppressionSetup = true;

    // Override console.error
    console.error = function (...args: any[]) {
      const message = args[0] ? String(args[0]) : "";
      // Suppress CSS MIME type errors (typically from browser extensions or cached HTML)
      if (
        message.includes("MIME type") &&
        (message.includes("text/css") ||
          message.includes(".css") ||
          message.includes("not executable"))
      ) {
        return; // Suppress this error
      }
      originalError.apply(console, args);
    };

    // Override console.warn
    console.warn = function (...args: any[]) {
      const message = args[0] ? String(args[0]) : "";
      // Suppress CSS MIME type warnings
      if (
        message.includes("MIME type") &&
        (message.includes("text/css") || message.includes(".css"))
      ) {
        return; // Suppress this warning
      }
      originalWarn.apply(console, args);
    };

    // Global error handler for MIME type errors
    const errorHandler = (event: ErrorEvent) => {
      const message = event.message || "";
      const filename = event.filename || "";
      // Suppress MIME type errors for CSS files
      if (
        (message.includes("MIME type") || message.includes("not executable")) &&
        (filename.includes(".css") || message.includes("text/css"))
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }
    };

    // Global unhandled rejection handler
    const rejectionHandler = (event: PromiseRejectionEvent) => {
      const message = event.reason ? String(event.reason) : "";
      if (
        message.includes("MIME type") &&
        (message.includes("text/css") || message.includes(".css"))
      ) {
        event.preventDefault();
        return false;
      }
    };

    // Add event listeners
    window.addEventListener("error", errorHandler, true);
    window.addEventListener("unhandledrejection", rejectionHandler);

    // Cleanup function
    return () => {
      // Restore original console methods
      console.error = originalError;
      console.warn = originalWarn;

      // Remove event listeners
      window.removeEventListener("error", errorHandler, true);
      window.removeEventListener("unhandledrejection", rejectionHandler);

      // Clear the setup flag
      delete (window as any).__errorSuppressionSetup;
    };
  }, []);

  return null;
};
