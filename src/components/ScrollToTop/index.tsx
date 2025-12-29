"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop component - Scrolls to top on route change
 *
 * This component ensures that when navigating between pages,
 * the page scrolls to the top automatically.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use instant for better UX (no animation delay)
    });
  }, [pathname]);

  return null;
}
