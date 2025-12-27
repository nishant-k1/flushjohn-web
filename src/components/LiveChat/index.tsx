"use client";

import React, { useEffect } from "react";
import Script from "next/script";

/**
 * LiveChat Component
 * Supports multiple chat providers:
 * - Tawk.to (free, recommended)
 * - Intercom
 * - Crisp
 * - Custom implementation
 *
 * Configure via environment variables:
 * - NEXT_PUBLIC_LIVE_CHAT_PROVIDER: 'tawk' | 'intercom' | 'crisp' | 'custom' | 'none'
 * - NEXT_PUBLIC_TAWK_PROPERTY_ID: Tawk.to property ID
 * - NEXT_PUBLIC_TAWK_WIDGET_ID: Tawk.to widget ID
 * - NEXT_PUBLIC_INTERCOM_APP_ID: Intercom app ID
 * - NEXT_PUBLIC_CRISP_WEBSITE_ID: Crisp website ID
 */

type LiveChatProvider = "tawk" | "intercom" | "crisp" | "custom" | "none";

const LiveChat = () => {
  // TEMPORARILY DISABLED: Testing if Tawk.to causes React hydration error #418
  // TODO: Remove this temporary disable after testing
  const TEMPORARILY_DISABLED = true;

  // Aggressively disable Tawk.to - prevent any scripts from loading
  useEffect(() => {
    if (TEMPORARILY_DISABLED) {
      // Remove any existing Tawk.to scripts
      const tawkScripts = document.querySelectorAll(
        'script[src*="embed.tawk.to"], script[id*="tawk"]'
      );
      tawkScripts.forEach((script) => script.remove());

      // Remove Tawk.to container if it exists
      const tawkContainer = document.getElementById("tawkchat-container");
      if (tawkContainer) {
        tawkContainer.remove();
      }

      // Clear Tawk.to global if it exists
      if (typeof window !== "undefined") {
        (window as any).Tawk_API = undefined;
        (window as any).Tawk_LoadStart = undefined;
      }
    }
  }, []);

  if (TEMPORARILY_DISABLED) {
    return null;
  }

  const provider: LiveChatProvider =
    (process.env.NEXT_PUBLIC_LIVE_CHAT_PROVIDER as LiveChatProvider) || "none";

  // Don't render if disabled
  if (provider === "none" || !provider) {
    return null;
  }

  // Tawk.to implementation
  if (provider === "tawk") {
    const tawkPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const tawkWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

    if (!tawkPropertyId || !tawkWidgetId) {
      console.warn(
        "Tawk.to is enabled but property ID or widget ID is missing"
      );
      return null;
    }

    return (
      <>
        <Script
          strategy="lazyOnload"
          id="tawk-to-script"
        >
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </>
    );
  }

  // Intercom implementation
  if (provider === "intercom") {
    const intercomAppId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

    if (!intercomAppId) {
      console.warn("Intercom is enabled but app ID is missing");
      return null;
    }

    return (
      <>
        <Script
          strategy="lazyOnload"
          id="intercom-script"
        >
          {`
            (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${intercomAppId}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
          `}
        </Script>
      </>
    );
  }

  // Crisp implementation
  if (provider === "crisp") {
    const crispWebsiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

    if (!crispWebsiteId) {
      console.warn("Crisp is enabled but website ID is missing");
      return null;
    }

    return (
      <>
        <Script
          strategy="lazyOnload"
          id="crisp-script"
        >
          {`
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="${crispWebsiteId}";
            (function(){
              d=document;
              s=d.createElement("script");
              s.src="https://client.crisp.chat/l.js";
              s.async=1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </Script>
      </>
    );
  }

  // Custom implementation placeholder
  if (provider === "custom") {
    // Add your custom chat implementation here
    return null;
  }

  return null;
};

export default LiveChat;
