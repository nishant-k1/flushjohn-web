import React from "react";
import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { s3assets, websiteURL } from "@/constants";
import { testimonials } from "@/features/home/constants";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";

// Lazy load ToastContainer to avoid initial bundle size
const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  {
    ssr: false,
    loading: () => null,
  }
);

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
    ssr: false, // Changed to false - this is an interactive modal
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

// Lazy load Facebook Pixel to avoid blocking initial render
const FacebookPixel = dynamic(() => import("@/components/SEO/FacebookPixel"), {
  ssr: false,
});

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

        {/* Preconnect to critical domains */}
        <link
          rel="preconnect"
          href="https://cdn.flushjohn.com"
        />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
        />
        <link
          rel="dns-prefetch"
          href="https://cdn.flushjohn.com"
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
        {/* Minimal inline critical CSS - loads immediately */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical above-the-fold styles */
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
            * { box-sizing: border-box; }
            img { max-width: 100%; height: auto; }
          `,
          }}
        />

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

        {/* Facebook Pixel - Load after page is interactive */}
        {process.env.NODE_ENV === "production" && <FacebookPixel />}

        <Layout>
          <ClientWidthContextProvider>
            <SidebarContextProvider>
              <QuickQuoteContextProvider>
                <QuoteContextProvider>
                  <Sidebar />
                  <Navbar />
                  {children}
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                  />
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
