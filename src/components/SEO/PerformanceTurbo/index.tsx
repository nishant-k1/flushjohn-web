/**
 * Performance Turbo Mode
 * Aggressive performance optimizations for lightning-fast loading
 */

"use client";

import { useEffect } from "react";

export default function PerformanceTurbo() {
  useEffect(() => {
    // Only run non-blocking optimizations after page is interactive
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Critical: Prefetch important pages
        const criticalPages = ['/quote', '/porta-potty-rental', '/contact'];
        criticalPages.forEach((page) => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = page;
          document.head.appendChild(link);
        });

        // Lazy load images only when browser supports it natively
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0 && 'loading' in HTMLImageElement.prototype) {
          images.forEach((img) => {
            const htmlImg = img as HTMLImageElement;
            htmlImg.src = htmlImg.dataset.src || '';
            htmlImg.removeAttribute('data-src');
          });
        }
      }, { timeout: 3000 });
    }
  }, []);

  return null;
}
