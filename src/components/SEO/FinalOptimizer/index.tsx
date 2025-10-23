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
    const timer = setTimeout(() => {
      const removeDeprecatedAPIs = () => {
        if (
          "webkitRequestAnimationFrame" in window &&
          !("requestAnimationFrame" in window)
        ) {
          window.requestAnimationFrame = window.webkitRequestAnimationFrame;
        }
      };

      const optimizeThirdPartyScripts = () => {
        const gtag = document.querySelector('script[src*="googletagmanager"]');
        if (gtag) {
          gtag.setAttribute("defer", "true");
        }
      };

      const suppressNonCriticalErrors = () => {
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
      cleanupThirdPartyScripts();
      manageCookies();

      removeDeprecatedAPIs();
      optimizeThirdPartyScripts();
      suppressNonCriticalErrors();

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
