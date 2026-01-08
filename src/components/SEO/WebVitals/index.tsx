/**
 * Web Vitals Tracking Component
 * Tracks Core Web Vitals and sends to Google Analytics
 *
 * Core Web Vitals:
 * - LCP (Largest Contentful Paint): < 2.5s (good)
 * - INP (Interaction to Next Paint): < 200ms (good) - replaces FID
 * - CLS (Cumulative Layout Shift): < 0.1 (good)
 * - FCP (First Contentful Paint): < 1.8s (good)
 * - TTFB (Time to First Byte): < 800ms (good)
 */

"use client";

import { useEffect } from "react";
import { onCLS, onLCP, onFCP, onTTFB, onINP, Metric } from "web-vitals";

// gtag is already declared globally in layout.tsx

function sendToAnalytics(metric: Metric) {
  // Send to Google Analytics if available
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", metric.name, {
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value
      ),
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
      // Custom dimensions for better analysis
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }

  // Also log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
      rating: metric.rating,
    });
  }
}

export default function WebVitals() {
  useEffect(() => {
    // Track Core Web Vitals
    onCLS(sendToAnalytics);
    onLCP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);

    // Track INP (Interaction to Next Paint) - replaces FID as Core Web Vital
    // INP measures responsiveness (replaces FID in 2024)
    onINP(sendToAnalytics);
  }, []);

  return null;
}
