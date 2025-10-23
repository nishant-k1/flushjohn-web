"use client";
import { useEffect } from "react";

const PerformanceOptimizer = () => {
  useEffect(() => {
    let scrollHandler: (() => void) | null = null;

    const timer = setTimeout(() => {
      const preloadCriticalResources = () => {
        const criticalResources = [
          "https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp",
        ];

        criticalResources.forEach((resource) => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.href = resource;
          link.as = resource.includes("font") ? "font" : "image";
          if (resource.includes("font")) {
            link.type = "font/woff2";
            link.crossOrigin = "anonymous";
          }
          document.head.appendChild(link);
        });
      };

      const optimizeImages = () => {
        const images = document.querySelectorAll("img:not([data-nimg])"); // Exclude Next.js images
        images.forEach((img) => {
          if (
            img.getBoundingClientRect().top > window.innerHeight &&
            !img.getAttribute("loading")
          ) {
            img.setAttribute("loading", "lazy");
          }

          const htmlImg = img as HTMLImageElement;
          if (!htmlImg.alt || htmlImg.alt === "") {
            htmlImg.alt = "FlushJohn porta potty rental service";
          }
        });
      };

      const deferNonCriticalJS = () => {
        const scripts = document.querySelectorAll("script[data-defer]");
        scripts.forEach((script) => {
          const newScript = document.createElement("script");
          newScript.src = script.getAttribute("src") || "";
          newScript.async = true;
          script.parentNode?.replaceChild(newScript, script);
        });
      };

      preloadCriticalResources();
      optimizeImages();
      deferNonCriticalJS();

      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            optimizeImages();
            ticking = false;
          });
          ticking = true;
        }
      };

      scrollHandler = handleScroll;

      if ("requestIdleCallback" in window) {
        requestIdleCallback(deferNonCriticalJS, { timeout: 2000 });
      } else {
        setTimeout(deferNonCriticalJS, 1000);
      }

      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 25); // Small delay to ensure hydration is complete

    return () => {
      clearTimeout(timer);
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;
