/**
 * Performance Turbo Mode
 * Aggressive performance optimizations for lightning-fast loading
 */

"use client";

import { useEffect } from "react";

export default function PerformanceTurbo() {
  useEffect(() => {
    const removeUnusedCSS = () => {
      const usedSelectors = new Set<string>();
      
      document.querySelectorAll('*').forEach((el) => {
        el.classList.forEach((className) => usedSelectors.add(`.${className}`));
        if (el.id) usedSelectors.add(`#${el.id}`);
      });
    };

    const lazyLoadImages = () => {
      if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach((img) => {
          const htmlImg = img as HTMLImageElement;
          htmlImg.src = htmlImg.dataset.src || '';
          htmlImg.removeAttribute('data-src');
        });
      } else {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.src || '';
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach((img) => {
          observer.observe(img);
        });
      }
    };

    const prefetchCriticalPages = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const criticalPages = [
            '/quote',
            '/porta-potty-rental',
            '/contact',
          ];

          criticalPages.forEach((page) => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
          });
        }, { timeout: 2000 });
      }
    };

    const deferNonCriticalScripts = () => {
      const scripts = document.querySelectorAll('script[data-defer="true"]');
      scripts.forEach((script) => {
        const newScript = document.createElement('script');
        const src = script.getAttribute('src');
        if (src) {
          newScript.src = src;
          newScript.async = true;
          document.body.appendChild(newScript);
        }
      });
    };

    const optimizeFonts = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        @font-face {
          font-family: 'Poppins';
          font-display: swap;
          src: url('https://cdn.flushjohn.com/fonts/Poppins/Poppins-Regular.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Merriweather';
          font-display: swap;
          src: url('https://cdn.flushjohn.com/fonts/Merriweather/Merriweather-Regular.woff2') format('woff2');
        }
      `;
      document.head.appendChild(style);
    };

    const removeRenderBlocking = () => {
      const loadCSS = (href: string) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = function() {
          link.media = 'all';
        };
        document.head.appendChild(link);
      };

      if (document.readyState === 'complete') {
        loadCSS('/css/non-critical.css');
      }
    };

    const optimizeThirdPartyScripts = () => {
      const gaScript = document.querySelector('script[src*="googletagmanager"]');
      if (gaScript) {
        gaScript.setAttribute('data-defer', 'true');
      }
    };

    const addResourceHints = () => {
      const hints = [
        { rel: 'preconnect', href: 'https://cdn.flushjohn.com' },
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
        { rel: 'prefetch', href: '/quote' },
        { rel: 'prefetch', href: '/contact' },
      ];

      hints.forEach(hint => {
        if (!document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`)) {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          document.head.appendChild(link);
        }
      });
    };

    const preventLayoutShifts = () => {
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach((img) => {
        const htmlImg = img as HTMLImageElement;
        if (htmlImg.naturalWidth && htmlImg.naturalHeight) {
          htmlImg.setAttribute('width', htmlImg.naturalWidth.toString());
          htmlImg.setAttribute('height', htmlImg.naturalHeight.toString());
        }
      });
    };

    setTimeout(() => {
      lazyLoadImages();
      prefetchCriticalPages();
      deferNonCriticalScripts();
      optimizeFonts();
      removeRenderBlocking();
      optimizeThirdPartyScripts();
      addResourceHints();
      preventLayoutShifts();
    }, 100);

    return () => {
    };
  }, []);

  return null;
}
