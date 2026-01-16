"use client";

import { useEffect } from "react";

/**
 * Handles browser extension injections that can cause hydration mismatches
 * This component normalizes extension-injected elements before React hydration completes
 */
const BrowserExtensionHandler = () => {
  useEffect(() => {
    // This runs on the client after hydration
    // Normalize any extension-injected elements to prevent future mismatches
    const normalizeExtensionElements = () => {
      // Find and normalize common extension-injected elements
      const extensionSelectors = [
        '[id*="pronounce"]',
        '[class*="pronounce"]',
        '[id*="accessibility"]',
        '[class*="accessibility"]',
      ];

      extensionSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          
          // Normalize hidden attribute - convert null to boolean or remove
          if (htmlEl.hasAttribute('hidden')) {
            const hiddenValue = htmlEl.getAttribute('hidden');
            if (hiddenValue === 'null' || hiddenValue === null) {
              htmlEl.removeAttribute('hidden');
            } else if (hiddenValue === 'true' || hiddenValue === '') {
              htmlEl.setAttribute('hidden', '');
            }
          }
          
          // Add data attribute to mark as extension-injected
          htmlEl.setAttribute('data-extension-injected', 'true');
        });
      });
    };

    // Run after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(normalizeExtensionElements, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
};

export default BrowserExtensionHandler;
