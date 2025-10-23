
/**
 * Debounce function to reduce excessive function calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function to limit function execution frequency
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Yield to main thread for better performance
 */
export const yieldToMain = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

/**
 * Break up long tasks
 */
export async function processInChunks<T>(
  items: T[],
  processor: (item: T) => void,
  chunkSize: number = 10
): Promise<void> {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    chunk.forEach(processor);

    if (i + chunkSize < items.length) {
      await yieldToMain();
    }
  }
}

/**
 * Lazy load images with Intersection Observer
 */
export const lazyLoadImages = (): void => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Preload critical resources
 */
export const preloadCriticalResources = (): void => {
  const criticalResources = [
    "/css/critical.css",
    "https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp",
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = resource.endsWith(".css") ? "style" : "image";
    link.href = resource;
    document.head.appendChild(link);
  });
};

/**
 * Optimize scroll performance
 */
export const optimizeScrollPerformance = (): void => {
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
};
