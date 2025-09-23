"use client";
import { useEffect } from "react";

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        "https://cdn.flushjohn.com/fonts/Poppins/Poppins-Regular.woff2",
        "https://cdn.flushjohn.com/fonts/Merriweather/Merriweather-Regular.woff2",
        "https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp"
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

    // Optimize images
    const optimizeImages = () => {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        // Add loading="lazy" to images below the fold
        if (img.getBoundingClientRect().top > window.innerHeight) {
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

    // Re-optimize on scroll (for lazy loading)
    const handleScroll = () => {
      optimizeImages();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;
