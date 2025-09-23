"use client";
import { useEffect } from "react";

const UltimateOptimizer = () => {
  useEffect(() => {
    // Wait for hydration to complete before making DOM modifications
    const timer = setTimeout(() => {
      // Resource hints for better performance
      const addResourceHints = () => {
        const head = document.head;

        // DNS prefetch for external domains
        const dnsPrefetchDomains = [
          "//www.google-analytics.com",
          "//www.googletagmanager.com",
          "//fonts.googleapis.com",
          "//fonts.gstatic.com",
          "//cdn.flushjohn.com",
        ];

        dnsPrefetchDomains.forEach((domain) => {
          const link = document.createElement("link");
          link.rel = "dns-prefetch";
          link.href = domain;
          head.appendChild(link);
        });

        // Preconnect to critical domains
        const preconnectDomains = [
          "https://www.google-analytics.com",
          "https://cdn.flushjohn.com",
        ];

        preconnectDomains.forEach((domain) => {
          const link = document.createElement("link");
          link.rel = "preconnect";
          link.href = domain;
          link.crossOrigin = "anonymous";
          head.appendChild(link);
        });
      };

      // Optimize form interactions
      const optimizeFormInteractions = () => {
        const forms = document.querySelectorAll("form");
        forms.forEach((form) => {
          // Add proper ARIA labels
          const inputs = form.querySelectorAll("input, textarea, select");
          inputs.forEach((input) => {
            const htmlInput = input as HTMLInputElement;

            // Ensure every form field has proper accessibility
            if (
              !htmlInput.getAttribute("aria-label") &&
              !htmlInput.getAttribute("aria-labelledby")
            ) {
              const label = form.querySelector(`label[for="${htmlInput.id}"]`);
              if (label) {
                htmlInput.setAttribute(
                  "aria-labelledby",
                  label.id || `label-${htmlInput.id}`
                );
              } else {
                const placeholder = htmlInput.getAttribute("placeholder");
                if (placeholder) {
                  htmlInput.setAttribute("aria-label", placeholder);
                }
              }
            }

            // Add proper autocomplete attributes
            if (
              htmlInput.type === "email" &&
              !htmlInput.getAttribute("autocomplete")
            ) {
              htmlInput.setAttribute("autocomplete", "email");
            }
            if (
              htmlInput.type === "tel" &&
              !htmlInput.getAttribute("autocomplete")
            ) {
              htmlInput.setAttribute("autocomplete", "tel");
            }
            if (htmlInput.name === "firstName" || htmlInput.name === "fName") {
              htmlInput.setAttribute("autocomplete", "given-name");
            }
            if (htmlInput.name === "lastName" || htmlInput.name === "lName") {
              htmlInput.setAttribute("autocomplete", "family-name");
            }
          });
        });
      };

      // Optimize images for better CLS (but avoid Next.js images to prevent hydration issues)
      const optimizeImages = () => {
        const images = document.querySelectorAll("img:not([data-nimg])"); // Exclude Next.js images
        images.forEach((img) => {
          // Add proper dimensions if missing
          if (!img.width || !img.height) {
            // Set aspect ratio to prevent layout shift
            img.style.aspectRatio = "16/9";
          }

          // Add proper loading attributes only for non-Next.js images
          if (!img.getAttribute("loading")) {
            const rect = img.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
              img.setAttribute("loading", "lazy");
            } else {
              img.setAttribute("loading", "eager");
            }
          }

          // Add proper decoding
          if (!img.getAttribute("decoding")) {
            img.setAttribute("decoding", "async");
          }
        });
      };

      // Optimize third-party cookies
      const optimizeThirdPartyCookies = () => {
        // Set SameSite=Lax for all cookies by default
        const originalSetCookie = document.cookie;
        Object.defineProperty(document, "cookie", {
          get: () => originalSetCookie,
          set: (value: string) => {
            if (!value.includes("SameSite=")) {
              value += "; SameSite=Lax";
            }
            if (
              !value.includes("Secure") &&
              window.location.protocol === "https:"
            ) {
              value += "; Secure";
            }
            return originalSetCookie;
          },
        });
      };

      // Eliminate render-blocking resources
      const eliminateRenderBlocking = () => {
        // Defer non-critical CSS
        const nonCriticalCSS = document.querySelectorAll(
          'link[rel="stylesheet"]:not([data-critical])'
        );
        nonCriticalCSS.forEach((link) => {
          const htmlLink = link as HTMLLinkElement;
          if (!htmlLink.media || htmlLink.media === "all") {
            htmlLink.media = "print";
            htmlLink.onload = () => {
              htmlLink.media = "all";
            };
          }
        });

        // Skip font preloading - fonts should be loaded via CSS to avoid 403 errors
        // The CDN fonts are returning 403 Forbidden, so we'll let CSS handle font loading
      };

      // Setup Intersection Observer for better performance
      const setupIntersectionObserver = () => {
        if ("IntersectionObserver" in window) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const element = entry.target as HTMLElement;

                  // Trigger animations only when in viewport
                  if (element.dataset.animate) {
                    element.classList.add("animate-in-view");
                  }

                  // Load images when visible
                  if (element.tagName === "IMG" && element.dataset.src) {
                    const img = element as HTMLImageElement;
                    const dataSrc = img.dataset.src;
                    if (dataSrc) {
                      img.src = dataSrc;
                      img.removeAttribute("data-src");
                    }
                  }

                  observer.unobserve(element);
                }
              });
            },
            {
              rootMargin: "50px 0px",
              threshold: 0.1,
            }
          );

          // Observe all elements that need optimization
          document
            .querySelectorAll("[data-animate], img[data-src]")
            .forEach((el) => {
              observer.observe(el);
            });
        }
      };

      // Run all optimizations
      addResourceHints();
      optimizeFormInteractions();
      optimizeImages();
      optimizeThirdPartyCookies();
      eliminateRenderBlocking();
      setupIntersectionObserver();
    }, 100); // Small delay to ensure hydration is complete

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      // Clean up observers and event listeners
    };
  }, []);

  return null;
};

export default UltimateOptimizer;
