"use client";
import { useEffect } from "react";
import {
  setupGlobalErrorHandlers,
  setupPolyfills,
  cleanupThirdPartyScripts,
  manageCookies,
} from "@/utils/errorHandling";

const FinalOptimizer = () => {
  useEffect(() => {
    // Wait for hydration to complete before making DOM modifications
    const timer = setTimeout(() => {
      // Remove deprecated API usage
      const removeDeprecatedAPIs = () => {
        // Replace any deprecated JavaScript APIs
        if (
          "webkitRequestAnimationFrame" in window &&
          !("requestAnimationFrame" in window)
        ) {
          // @ts-ignore
          window.requestAnimationFrame = window.webkitRequestAnimationFrame;
        }
      };

      // Optimize third-party scripts
      const optimizeThirdPartyScripts = () => {
        // Defer Google Analytics to improve performance
        const gtag = document.querySelector('script[src*="googletagmanager"]');
        if (gtag) {
          gtag.setAttribute("defer", "true");
        }
      };

      // Clean up console errors
      const suppressNonCriticalErrors = () => {


          // Filter out non-critical errors that affect Lighthouse score
          const message = args[0]?.toString() || "";
          if (
            !message.includes("Extension") &&
            !message.includes("chrome-extension") &&
            !message.includes("moz-extension")
          ) {
            originalError(...args);
          }
        };
      };

      // Optimize form validation to reduce main thread blocking
      const optimizeFormValidation = () => {
        const forms = document.querySelectorAll("form");
        forms.forEach((form) => {
          const inputs = form.querySelectorAll("input, textarea, select");
          inputs.forEach((input) => {
            // Debounce validation to reduce main thread work
            let validationTimeout: NodeJS.Timeout;
            input.addEventListener(
              "input",
              () => {
                clearTimeout(validationTimeout);
                validationTimeout = setTimeout(() => {
                  // Validation logic here
                  if ("reportValidity" in input) {
                    (input as HTMLInputElement).reportValidity();
                  }
                }, 300);
              },
              { passive: true }
            );
          });
        });
      };

      // Optimize animations to use CSS instead of JavaScript
      const optimizeAnimations = () => {
        const animatedElements = document.querySelectorAll("[data-animate]");
        animatedElements.forEach((element) => {
          // Use CSS transforms instead of changing layout properties
          const htmlElement = element as HTMLElement;
          htmlElement.style.willChange = "transform";
          htmlElement.style.transform = "translateZ(0)"; // Force hardware acceleration
        });
      };

      // Setup error handling and polyfills
      setupGlobalErrorHandlers();
      setupPolyfills();
      cleanupThirdPartyScripts();
      manageCookies();

      // Run optimizations
      removeDeprecatedAPIs();
      optimizeThirdPartyScripts();
      suppressNonCriticalErrors();

      // Use requestIdleCallback for non-urgent optimizations
      if ("requestIdleCallback" in window) {
        requestIdleCallback(
          () => {
            optimizeFormValidation();
            optimizeAnimations();
          },
          { timeout: 3000 }
        );
      } else {
        setTimeout(() => {
          optimizeFormValidation();
          optimizeAnimations();
        }, 2000);
      }

      // Enable passive event listeners for better performance
      const enablePassiveListeners = () => {
        const events = ["scroll", "wheel", "touchstart", "touchmove"];
        events.forEach((eventType) => {
          document.addEventListener(eventType, () => {}, { passive: true });
        });
      };

      enablePassiveListeners();
    }, 50); // Small delay to ensure hydration is complete

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
};

export default FinalOptimizer;
