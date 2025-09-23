import React from "react";
import "../../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { s3assets, websiteURL, testimonials } from "@/constants";
import Layout from "@/components/Layout";
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});
const Testimonial = dynamic(() => import("@/components/Testimonial"), {
  ssr: true,
});
const QuickQuote = dynamic(() => import("@/components/QuickQuote"), {
  ssr: true,
});
const Sidebar = dynamic(() => import("@/components/Sidebar"), {
  ssr: true,
});
import { ClientWidthContextProvider } from "@/contexts/ClientWidthContext";
import { QuoteContextProvider } from "@/contexts/QuoteContext";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { QuickQuoteContextProvider } from "@/contexts/QuickQuoteContext";
import Script from "next/script";
import dynamic from "next/dynamic";
import PerformanceOptimizer from "@/components/SEO/PerformanceOptimizer";
import CoreWebVitals from "@/components/SEO/CoreWebVitals";
import FinalOptimizer from "@/components/SEO/FinalOptimizer";
import UltimateOptimizer from "@/components/SEO/UltimateOptimizer";
// import PageTranisition from "@/anmations/PageTranisition";

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
    preload: [
      {
        rel: "preload",
        as: "style",
        href: "/css/critical.css",
      },
      {
        rel: "preload",
        as: "image",
        href: "https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp",
      },
      {
        rel: "preload",
        as: "font",
        href: "https://cdn.flushjohn.com/fonts/Poppins/Poppins-Regular.woff2",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        href: "https://cdn.flushjohn.com/fonts/Merriweather/Merriweather-Regular.woff2",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          id="deferred-css"
          strategy="lazyOnload"
        >
          {`
            document.addEventListener('DOMContentLoaded', function() {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = '/css/non-critical.css';
              document.head.appendChild(link);
            });
          `}
        </Script>
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
        <Script
          id="service-worker"
          strategy="afterInteractive"
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
                  <PerformanceOptimizer />
                  <CoreWebVitals />
                  <FinalOptimizer />
                  <UltimateOptimizer />
                  <Sidebar />
                  <Navbar />
                  {/* <PageTranisition> */}
                  {children}
                  {/* </PageTranisition> */}
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
