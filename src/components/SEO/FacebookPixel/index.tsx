
/**
 * Facebook Pixel Component
 *
 * Implements Facebook Pixel for conversion tracking and retargeting.
 * Only loads in production to avoid development noise.
 */

"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    trackFacebookEvent: (eventName: string, parameters?: any) => void;
  }
}

interface FacebookPixelProps {
  pixelId?: string;
}

export default function FacebookPixel({
  pixelId = "YOUR_PIXEL_ID",
}: FacebookPixelProps) {
  const trackEvent = (eventName: string, parameters?: any) => {
    if (process.env.NODE_ENV === "production" && pixelId !== "YOUR_PIXEL_ID") {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", eventName, parameters);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.trackFacebookEvent = trackEvent;
    }
  }, [trackEvent]);

  if (process.env.NODE_ENV !== "production" || pixelId === "YOUR_PIXEL_ID") {
    return null;
  }

  return (
    <Script
      id="facebook-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}
