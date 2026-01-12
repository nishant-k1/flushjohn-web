/**
 * Analytics Initializer Component
 * 
 * Initializes all analytics tracking on page load:
 * - Remarketing audiences
 * - Detailed analytics tracking
 */

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { remarketingAudienceManager } from "@/utils/analytics/remarketing";
import { detailedAnalytics } from "@/utils/analytics/detailedTracking";

export default function AnalyticsInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize remarketing
    remarketingAudienceManager.init();

    // Track page visit for remarketing
    remarketingAudienceManager.trackPageVisit(pathname);

    // Initialize detailed analytics tracking
    detailedAnalytics.initPageTracking(pathname);

    // Cleanup on pathname change
    return () => {
      detailedAnalytics.cleanup(pathname);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}
