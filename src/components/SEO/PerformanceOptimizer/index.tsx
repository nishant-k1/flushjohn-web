"use client";
import { useEffect } from "react";

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Store scroll handler reference for cleanup
    let scrollHandler: (() => void) | null = null;

    // Wait for hydration to complete before making DOM modifications
    const timer = setTimeout(() => {
      // Preload critical resources
      const preloadCriticalResources = () => {
        const criticalResources = [
          // Only preload accessible resources - fonts are loaded via CSS
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

      // Optimize images (but avoid Next.js images to prevent hydration issues)
      const optimizeImages = () => {
        const images = document.querySelectorAll("img:not([data-nimg])"); // Exclude Next.js images
        images.forEach((img) => {
          // Add loading="lazy" to images below the fold (only for non-Next.js images)
          if (
            img.getBoundingClientRect().top > window.innerHeight &&
            !img.getAttribute("loading")
          ) {
            img.setAttribute("loading", "lazy");
          }

          // Add proper alt text if missing
          if (!img.alt || img.alt === "") {
            img.alt = "FlushJohn porta potty rental service";
          }
        });
      };

      // Defer non-critical JavaScript
      const deferNonCriticalJS = () => {
        const scripts = document.querySelectorAll("script[data-defer]");
        scripts.forEach((script) => {
          const newScript = document.createElement("script");
          newScript.src = script.getAttribute("src") || "";
          newScript.async = true;
          script.parentNode?.replaceChild(newScript, script);
        });
      };

      // Initialize optimizations
      preloadCriticalResources();
      optimizeImages();
      deferNonCriticalJS();

      // Re-optimize on scroll (for lazy loading) with throttling
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

      // Store reference for cleanup
      scrollHandler = handleScroll;

      // Use requestIdleCallback for non-urgent tasks
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
