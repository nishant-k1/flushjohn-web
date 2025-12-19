import React from "react";
import "../../styles/globals.css";
import { s3assets, websiteURL } from "@/constants";
import { testimonials } from "@/features/home/constants";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});
const Testimonial = dynamic(
  () =>
    import("@/features/home/components").then((mod) => ({
      default: mod.Testimonial,
    })),
  {
    ssr: true,
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
    <html lang="en">
      <head>
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
        {/* Google Analytics - Load after interactive with defer for better performance */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=AW-11246929750"
              strategy="lazyOnload"
              defer
            />
            <Script
              id="google-analytics"
              strategy="lazyOnload"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-11246929750', {
                  'send_page_view': false
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
