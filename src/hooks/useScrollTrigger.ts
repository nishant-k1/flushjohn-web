import { useState, useEffect } from "react";

interface UseScrollTriggerOptions {
  threshold?: number; // Percentage of page scrolled (0-100)
  delay?: number; // Delay in milliseconds before showing
  once?: boolean; // Only trigger once per session
}

export const useScrollTrigger = (options: UseScrollTriggerOptions = {}) => {
  const {
    threshold = 50, // Default: show after 50% scroll
    delay = 2000, // Default: wait 2 seconds after threshold
    once = true, // Default: only show once
  } = options;

  const [shouldShow, setShouldShow] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (once && hasTriggered) return;

    let timeoutId: NodeJS.Timeout;

    const checkScrollPosition = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      if (scrollPercentage >= threshold && !hasTriggered) {
        // Clear any existing timeout
        if (timeoutId) clearTimeout(timeoutId);

        // Set timeout to show after delay (only if delay > 0)
        if (delay > 0) {
          timeoutId = setTimeout(() => {
            setShouldShow(true);
            setHasTriggered(true);
          }, delay);
        } else {
          // Show immediately if no delay
          setShouldShow(true);
          setHasTriggered(true);
        }
      }
    };

    // Check initial scroll position on mount
    checkScrollPosition();

    // Throttle scroll events
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [threshold, delay, once, hasTriggered]);

  return { shouldShow, reset: () => setHasTriggered(false) };
};
