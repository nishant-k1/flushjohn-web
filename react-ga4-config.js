/**
 * Google Analytics Event Tracking
 * 
 * Note: Google Analytics is initialized directly in layout.tsx using gtag.
 * This file provides a compatibility layer for legacy code that uses react-ga4.
 * 
 * For new code, use window.gtag directly instead of this file.
 */

/**
 * Log an event to Google Analytics using gtag
 * Compatible with react-ga4 event format
 */
export const logEvent = (event) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  try {
    // Convert react-ga4 event format to gtag format
    window.gtag("event", event.action || "event", {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      non_interaction: event.nonInteraction,
      transport: event.transport,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Google Analytics event logging error:", error);
    }
  }
};

/**
 * Initialize Google Analytics (no-op - already initialized in layout.tsx)
 * Kept for backward compatibility
 */
export const initGA = () => {
  // Google Analytics is already initialized in layout.tsx
  // This function is kept for backward compatibility
};

/**
 * Log page view (no-op - page views are tracked automatically)
 * Kept for backward compatibility
 */
export const logPageView = (path, title) => {
  // Page views are automatically tracked by gtag in layout.tsx
  // This function is kept for backward compatibility
};
