import React from "react";
import { s3assets, websiteURL } from "@/constants";
// Import CSS - Next.js will optimize this automatically
import "../../styles/globals.css";
import { testimonials } from "@/features/home/constants";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";

// Critical above-the-fold components - SSR enabled
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: true,
});

// Below-the-fold components - can be lazy loaded
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
  loading: () => <div style={{ minHeight: "200px" }} />, // Reserve space to prevent CLS
});

const Testimonial = dynamic(
  () =>
    import("@/features/home/components").then((mod) => ({
      default: mod.Testimonial,
    })),
  {
    ssr: true,
    loading: () => <div style={{ minHeight: "300px" }} />, // Reserve space
  }
);

const QuickQuote = dynamic(
  () =>
    import("@/features/quote/components").then((mod) => ({
      default: mod.QuickQuote,
    })),
  {
    ssr: true,
    loading: () => null,
  }
);

const Sidebar = dynamic(() => import("@/components/Sidebar"), {
  ssr: true,
});

import { ClientWidthContextProvider } from "@/contexts/ClientWidthContext";
import { QuoteContextProvider } from "@/features/quote/contexts/QuoteContext";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { QuickQuoteContextProvider } from "@/features/quote/contexts/QuickQuoteContext";
import Script from "next/script";

import FacebookPixel from "@/components/SEO/FacebookPixel";
import FinalOptimizer from "@/components/SEO/FinalOptimizer";

export const metadata = {
  title: "FlushJohn - Premium Porta Potty Rentals | Same-Day Delivery",
  description:
    "FlushJohn offers affordable and reliable porta potty rental services for all types of events and construction sites. Get your quote today!",
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
    "dns-prefetch": "https://cdn.flushjohn.com",
    preconnect: "https://cdn.flushjohn.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Enable back/forward cache */}
        <meta
          name="mobile-web-app-capable"
          content="yes"
        />
        {/* Viewport meta tag with proper mobile scaling */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=0.5, user-scalable=yes"
        />

        {/* Preconnect to critical domains - highest priority */}
        <link
          rel="preconnect"
          href="https://cdn.flushjohn.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://api.flushjohn.com"
          crossOrigin="anonymous"
        />

        {/* Preload critical fonts IMMEDIATELY after preconnect - before CSS to break dependency chain */}
        <link
          rel="preload"
          href="https://cdn.flushjohn.com/fonts/Poppins/Poppins-Regular.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="https://cdn.flushjohn.com/fonts/Merriweather/Merriweather-Regular.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Inline critical @font-face declarations to break CSS dependency chain */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: "Poppins";
                src: url("https://cdn.flushjohn.com/fonts/Poppins/Poppins-Regular.ttf") format("truetype");
                font-weight: 400;
                font-style: normal;
                font-display: swap;
                ascent-override: 95%;
                descent-override: 25%;
                line-gap-override: 0%;
                size-adjust: 100%;
              }
              @font-face {
                font-family: "Merriweather";
                src: url("https://cdn.flushjohn.com/fonts/Merriweather/Merriweather-Regular.ttf") format("truetype");
                font-weight: 400;
                font-style: normal;
                font-display: swap;
                ascent-override: 105%;
                descent-override: 30%;
                line-gap-override: 0%;
                size-adjust: 100%;
              }
              /* Critical hero styles to prevent CLS */
              .heroTitle h1 {
                min-height: 2.6em;
                display: block;
              }
            `,
          }}
        />

        {/* DNS prefetch for third-party domains - lower priority */}
        <link
          rel="dns-prefetch"
          href="https://www.googletagmanager.com"
        />
        <link
          rel="dns-prefetch"
          href="https://www.google-analytics.com"
        />
        <link
          rel="dns-prefetch"
          href="https://googleads.g.doubleclick.net"
        />
        <link
          rel="dns-prefetch"
          href="https://connect.facebook.net"
        />
        <link
          rel="dns-prefetch"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="dns-prefetch"
          href="https://fonts.gstatic.com"
        />

        {/* Preload critical hero image for LCP optimization */}
        <link
          rel="preload"
          href="https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp"
          as="image"
          fetchPriority="high"
          type="image/webp"
        />

        {/* Prefetch next carousel images for smoother transitions */}
        <link
          rel="prefetch"
          href="https://cdn.flushjohn.com/images/home-page-images/hero-img-2.webp"
          as="image"
        />
        <link
          rel="prefetch"
          href="https://cdn.flushjohn.com/images/home-page-images/hero-img-3.webp"
          as="image"
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Analytics / Google Ads Conversion Tracking
            Note: Third-party cookie warnings from /ccm/collect are expected when using Google Ads conversion tracking.
            These cookies are set by Google's domain and are necessary for conversion measurement.
            The configuration below minimizes privacy impact by disabling ad personalization and anonymizing IPs. */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
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
                gtag('config', 'AW-11246929750', {
                  'send_page_view': false,
                  'cookie_domain': 'auto',
                  'cookie_expires': 63072000,
                  'anonymize_ip': true,
                  'allow_google_signals': false,
                  'allow_ad_personalization_signals': false,
                  'restricted_data_processing': true
                });
              `}
            </Script>
          </>
        )}

        {/* Facebook Pixel - Load after page is interactive */}
        <FacebookPixel />

        {/* Final Optimizer - Suppresses console errors and optimizes performance */}
        <FinalOptimizer />

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
                </QuoteContextProvider>
              </QuickQuoteContextProvider>
            </SidebarContextProvider>
          </ClientWidthContextProvider>
        </Layout>
      </body>
    </html>
  );
}
