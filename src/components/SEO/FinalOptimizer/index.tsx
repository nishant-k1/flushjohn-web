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
            let validationTimeout: NodeJS.Timeout;
            input.addEventListener(
              "input",
              () => {
                clearTimeout(validationTimeout);
                validationTimeout = setTimeout(() => {
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
        events.forEach((eventType) => {
          document.addEventListener(eventType, () => {}, { passive: true });
        });
      };

      enablePassiveListeners();
    }, 50); // Small delay to ensure hydration is complete

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
};

export default FinalOptimizer;
