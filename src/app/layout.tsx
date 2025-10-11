import React from "react";
import "../../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { s3assets, websiteURL } from "@/constants";
import { testimonials } from "@/features/home/constants";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";

// Dynamic imports for better code splitting
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});
const Testimonial = dynamic(() => import("@/features/home/components").then(mod => ({ default: mod.Testimonial })), {
  ssr: true,
});
const QuickQuote = dynamic(() => import("@/features/quote/components").then(mod => ({ default: mod.QuickQuote })), {
  ssr: true,
  loading: () => null,
});
const Sidebar = dynamic(() => import("@/components/Sidebar"), {
  ssr: true,
});

import { ClientWidthContextProvider } from "@/contexts/ClientWidthContext";
import { QuoteContextProvider } from "@/features/quote/contexts/QuoteContext";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { QuickQuoteContextProvider } from "@/features/quote/contexts/QuickQuoteContext";
import Script from "next/script";

export const metadata = {
  title: "FlushJohn - Porta Potty Rentals",
  description:
    "FlushJohn offers jobsite and event porta potty rental services.",
  url: websiteURL,
  type: "website",
  siteName: "FlushJohn",
  alternates: {
    canonical: websiteURL,
    languages: {
      "en-US": websiteURL,
      en: websiteURL,
      "x-default": websiteURL,
    },
  },
  openGraph: {
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        width: 1200,
        height: 630,
        alt: "FlushJohn Porta Potty Rentals",
      },
    ],
  },
  other: {
    // Resource hints for critical resources
    'dns-prefetch': 'https://cdn.flushjohn.com',
    'preconnect': 'https://cdn.flushjohn.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://cdn.flushjohn.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.flushjohn.com" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://cdn.flushjohn.com/fonts/Poppins/Poppins-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Minimal inline critical CSS - loads immediately */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles */
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
            * { box-sizing: border-box; }
            img { max-width: 100%; height: auto; }
          `
        }} />

        {/* Google Analytics - Load after interactive */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=AW-11246929750"
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-11246929750');
              `}
            </Script>
          </>
        )}

        {/* Service Worker - Load when idle */}
        <Script
          id="service-worker"
          strategy="lazyOnload"
        >
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then((registration) => {
                    console.log('SW registered: ', registration);
                  })
                  .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `}
        </Script>

        <Layout>
          <ClientWidthContextProvider>
            <SidebarContextProvider>
              <QuickQuoteContextProvider>
                <QuoteContextProvider>
                  <Sidebar />
                  <Navbar />
                  {children}
                  <QuickQuote />
                  <Testimonial {...testimonials} />
                  <Footer />
                  <ToastContainer />
                </QuoteContextProvider>
              </QuickQuoteContextProvider>
            </SidebarContextProvider>
          </ClientWidthContextProvider>
        </Layout>
      </body>
    </html>
  );
}
