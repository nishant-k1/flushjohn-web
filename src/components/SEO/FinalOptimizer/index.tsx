"use client";
import { useEffect } from "react";
import {
  setupGlobalErrorHandlers,
  setupPolyfills,
  cleanupThirdPartyScripts,
  manageCookies,
} from "@/utils/errorHandling";
import {
  optimizeLongTasks,
  deferNonCriticalInit,
} from "@/utils/longTaskOptimizer";

const FinalOptimizer = () => {
  useEffect(() => {
    // Suppress console errors immediately (before any other code runs)
    cleanupThirdPartyScripts();

    // Store cleanup functions for event listeners
    const cleanupFunctions: Array<() => void> = [];
    const timeoutIds: Set<NodeJS.Timeout> = new Set();
    const passiveListeners: Array<{ type: string; handler: () => void }> = [];

    const timer = setTimeout(() => {
      const removeDeprecatedAPIs = () => {
        // Modern browsers support requestAnimationFrame natively
        // webkitRequestAnimationFrame is deprecated and no longer needed
        // Only add fallback for very old browsers (pre-2012)
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = function (
            callback: FrameRequestCallback
          ) {
            return window.setTimeout(() => callback(Date.now()), 1000 / 60);
          };
        }
      };

      const optimizeThirdPartyScripts = () => {
        const gtag = document.querySelector('script[src*="googletagmanager"]');
        if (gtag) {
          gtag.setAttribute("defer", "true");
        }
      };

      // suppressNonCriticalErrors is now handled by cleanupThirdPartyScripts
      // No need for duplicate implementation

      const optimizeFormValidation = () => {
        const forms = document.querySelectorAll("form");
        
        forms.forEach((form) => {
          const inputs = form.querySelectorAll("input, textarea, select");
          inputs.forEach((input) => {
            const inputElement = input as HTMLElement;
            let validationTimeout: NodeJS.Timeout | null = null;

            const handler = () => {
              if (validationTimeout) {
                clearTimeout(validationTimeout);
                timeoutIds.delete(validationTimeout);
              }
              validationTimeout = setTimeout(() => {
                if ("reportValidity" in input) {
                  (input as HTMLInputElement).reportValidity();
                }
                if (validationTimeout) {
                  timeoutIds.delete(validationTimeout);
                }
                validationTimeout = null;
              }, 300);
              if (validationTimeout) {
                timeoutIds.add(validationTimeout);
              }
            };

            inputElement.addEventListener("input", handler, { passive: true });

            // Store cleanup function for this input
            cleanupFunctions.push(() => {
              inputElement.removeEventListener("input", handler);
              if (validationTimeout) {
                clearTimeout(validationTimeout);
                timeoutIds.delete(validationTimeout);
              }
            });
          });
        });
      };

      const optimizeAnimations = () => {
        const animatedElements = document.querySelectorAll("[data-animate]");
        animatedElements.forEach((element) => {
          const htmlElement = element as HTMLElement;
          htmlElement.style.willChange = "transform";
          htmlElement.style.transform = "translateZ(0)"; // Force hardware acceleration
        });
      };

      setupGlobalErrorHandlers();
      setupPolyfills();
      // cleanupThirdPartyScripts already called at the start of useEffect
      manageCookies();

      removeDeprecatedAPIs();
      optimizeThirdPartyScripts();

      // Optimize long tasks to reduce TBT
      optimizeLongTasks();

      // Defer non-critical optimizations
      deferNonCriticalInit(() => {
        optimizeFormValidation();
        optimizeAnimations();
      });

      const enablePassiveListeners = () => {
        const events = ["scroll", "wheel", "touchstart", "touchmove"];
        const emptyHandler = () => {};
        events.forEach((eventType) => {
          document.addEventListener(eventType, emptyHandler, { passive: true });
          passiveListeners.push({ type: eventType, handler: emptyHandler });
        });
      };

      enablePassiveListeners();
    }, 50); // Small delay to ensure hydration is complete

    // Cleanup function that handles timer and all event listeners
    return () => {
      clearTimeout(timer);
      // Clean up all form validation listeners
      cleanupFunctions.forEach((cleanup) => cleanup());
      // Clear all validation timeouts
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutIds.clear();
      // Remove all passive listeners
      passiveListeners.forEach(({ type, handler }) => {
        document.removeEventListener(type, handler);
      });
    };
  }, []);

  return null;
};

export default FinalOptimizer;
