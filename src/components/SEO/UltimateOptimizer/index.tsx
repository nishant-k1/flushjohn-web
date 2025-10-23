"use client";
import { useEffect } from "react";

const UltimateOptimizer = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const addResourceHints = () => {
        const head = document.head;

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

      const optimizeFormInteractions = () => {
        const forms = document.querySelectorAll("form");
        forms.forEach((form) => {
          const inputs = form.querySelectorAll("input, textarea, select");
          inputs.forEach((input) => {
            const htmlInput = input as HTMLInputElement;

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

      const optimizeImages = () => {
        const images = document.querySelectorAll("img:not([data-nimg])"); // Exclude Next.js images
        images.forEach((img) => {
          const htmlImg = img as HTMLImageElement;
          if (!htmlImg.width || !htmlImg.height) {
            htmlImg.style.aspectRatio = "16/9";
          }

          if (!img.getAttribute("loading")) {
            const rect = img.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
              img.setAttribute("loading", "lazy");
            } else {
              img.setAttribute("loading", "eager");
            }
          }

          if (!img.getAttribute("decoding")) {
            img.setAttribute("decoding", "async");
          }
        });
      };

      const optimizeThirdPartyCookies = () => {
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

      const eliminateRenderBlocking = () => {
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

      };

      const setupIntersectionObserver = () => {
        if ("IntersectionObserver" in window) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const element = entry.target as HTMLElement;

                  if (element.dataset.animate) {
                    element.classList.add("animate-in-view");
                  }

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

          document
            .querySelectorAll("[data-animate], img[data-src]")
            .forEach((el) => {
              observer.observe(el);
            });
        }
      };

      addResourceHints();
      optimizeFormInteractions();
      optimizeImages();
      optimizeThirdPartyCookies();
      eliminateRenderBlocking();
      setupIntersectionObserver();
    }, 100); // Small delay to ensure hydration is complete

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
};

export default UltimateOptimizer;
