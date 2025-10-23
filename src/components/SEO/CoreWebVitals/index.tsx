"use client";

import { useEffect } from "react";

const CoreWebVitals = () => {
  useEffect(() => {
    const reportWebVitals = (metric: any) => {
      if (process.env.NODE_ENV === "development") {

      }

      if (
        process.env.NODE_ENV === "production" &&
        typeof window !== "undefined"
      ) {
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

    import("web-vitals")
      .then((webVitals) => {
        if (webVitals.onCLS) webVitals.onCLS(reportWebVitals);
        if (webVitals.onFCP) webVitals.onFCP(reportWebVitals);
        if (webVitals.onLCP) webVitals.onLCP(reportWebVitals);
        if (webVitals.onTTFB) webVitals.onTTFB(reportWebVitals);
        if (webVitals.onINP) webVitals.onINP(reportWebVitals);
      })
      .catch((error) => {

      });
  }, []);

  return null; // This component doesn't render anything
};

export default CoreWebVitals;
