"use client";

import { useEffect } from "react";

const CoreWebVitals = () => {
  useEffect(() => {
    const reportWebVitals = (metric: any) => {
      if (process.env.NODE_ENV === "development") {
        console.log("Core Web Vitals:", metric);
      }

      if (
        process.env.NODE_ENV === "production" &&
        typeof window !== "undefined"
      ) {
        // Send to Google Analytics if available
        if (typeof (window as any).gtag !== "undefined") {
          (window as any).gtag("event", metric.name, {
            event_category: "Web Vitals",
            event_label: metric.id,
            value: Math.round(
              metric.name === "CLS" ? metric.value * 1000 : metric.value
            ),
            non_interaction: true,
          });
        }

        // Send to Google Tag Manager if available
        if (typeof (window as any).dataLayer !== "undefined") {
          (window as any).dataLayer.push({
            event: "web_vitals",
            metric_name: metric.name,
            metric_value: metric.value,
            metric_id: metric.id,
          });
        }
      }
    };

    // Dynamically import web-vitals to avoid SSR issues
    import("web-vitals")
      .then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS(reportWebVitals);
        onFCP(reportWebVitals);
        onLCP(reportWebVitals);
        onTTFB(reportWebVitals);
        onINP(reportWebVitals);
      })
      .catch((error) => {
        console.warn("Web Vitals library not available:", error);
      });
  }, []);

  return null; // This component doesn't render anything
};

export default CoreWebVitals;
