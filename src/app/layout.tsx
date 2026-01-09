import React from "react";
import {
  s3assets,
  websiteURL,
  phone,
  contact,
  address,
  socialMedia,
} from "@/constants";
// Import CSS - Next.js will optimize this automatically
import "../../styles/globals.css";
import { testimonials } from "@/features/home/constants";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
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

// Theme Switcher for testing - can be removed after testing
// Import as dynamic to avoid SSR issues
const ThemeSwitcherWrapper = dynamic(
  () => import("@/components/ThemeSwitcher/ThemeSwitcherWrapper")
);

import { ClientWidthContextProvider } from "@/contexts/ClientWidthContext";
import { QuoteContextProvider } from "@/features/quote/contexts/QuoteContext";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { QuickQuoteContextProvider } from "@/features/quote/contexts/QuickQuoteContext";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import Script from "next/script";

import FacebookPixel from "@/components/SEO/FacebookPixel";
import FinalOptimizer from "@/components/SEO/FinalOptimizer";
import WebVitals from "@/components/SEO/WebVitals";

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
  metadataBase: new URL(websiteURL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical Schema Markup - Inline for SEO audit tools that don't execute JavaScript */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FlushJohn",
              url: websiteURL,
              logo: `${s3assets}/og-image-flushjonn-web.png`,
              description:
                "Professional porta potty rental and portable toilet rental services across 25+ cities in the United States",
              telephone: phone.phone_number,
              email: contact.support_email,
              address: {
                "@type": "PostalAddress",
                addressLocality: address.city,
                addressRegion: address.state,
                postalCode: address.zip,
                addressCountry: "US",
              },
              areaServed: {
                "@type": "Country",
                name: "United States",
              },
              sameAs: [
                socialMedia.facebook,
                socialMedia.twitter,
                socialMedia.linkedin,
                socialMedia.instagram,
              ],
            }),
          }}
        />
        {/* Apply theme immediately to prevent flash - runs before render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var themeId = localStorage.getItem('flushjohn-theme') || 'default';
                  var root = document.documentElement;
                  var setVar = function(key, value) { root.style.setProperty(key, value); };
                  
                  // Theme color definitions (simplified for inline script)
                  // Helper to create theme object with text colors
                  function createTheme(primary, primaryDark, primaryLight, primaryLighter, secondary, bgPrimary, bgSecondary, bgTertiary, bgDark, bgDarkAlpha, bgDarkAlpha50, bgDarkAlpha40, bgGlass, bgGlassLight, bgGlassDark, textPrimary, textSecondary, textTertiary) {
                    return {
                      primary: primary, primaryDark: primaryDark, primaryLight: primaryLight, primaryLighter: primaryLighter,
                      secondary: secondary,
                      bgPrimary: bgPrimary, bgSecondary: bgSecondary, bgTertiary: bgTertiary, bgDark: bgDark,
                      bgDarkAlpha: bgDarkAlpha, bgDarkAlpha50: bgDarkAlpha50, bgDarkAlpha40: bgDarkAlpha40,
                      bgGlass: bgGlass, bgGlassLight: bgGlassLight, bgGlassDark: bgGlassDark,
                      textPrimary: textPrimary || '#ffffff', textSecondary: textSecondary || 'rgba(255, 255, 255, 0.9)', textTertiary: textTertiary || 'rgba(255, 255, 255, 0.7)'
                    };
                  }
                  
                  var themes = {
                    // Dark themes - white text
                    'default': createTheme('#8c6f48', '#6d5637', '#a5896a', '#bea38c', '#8c6f48', '#5a4a3a', '#5a4a3a', '#5a4a3a', '#5a4a3a', 'rgba(90, 74, 58, 0.95)', 'rgba(90, 74, 58, 0.5)', 'rgba(90, 74, 58, 0.4)', 'rgba(90, 74, 58, 0.75)', 'rgba(90, 74, 58, 0.65)', 'rgba(90, 74, 58, 0.85)', '#ffffff', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)'),
                    'brown-dark': createTheme('#8c6f48', '#6d5637', '#a5896a', '#bea38c', '#8c6f48', '#2a1f15', '#2a1f15', '#2a1f15', '#1a130c', 'rgba(26, 19, 12, 0.85)', 'rgba(26, 19, 12, 0.5)', 'rgba(26, 19, 12, 0.4)', 'rgba(42, 31, 21, 0.75)', 'rgba(42, 31, 21, 0.65)', 'rgba(26, 19, 12, 0.85)', '#ffffff', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)'),
                    'blue': createTheme('#2563eb', '#1e40af', '#3b82f6', '#60a5fa', '#2563eb', '#0f172a', '#0f172a', '#0f172a', '#020617', 'rgba(2, 6, 23, 0.85)', 'rgba(15, 23, 42, 0.5)', 'rgba(15, 23, 42, 0.4)', 'rgba(15, 23, 42, 0.75)', 'rgba(15, 23, 42, 0.65)', 'rgba(2, 6, 23, 0.85)', '#ffffff', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)'),
                    'green': createTheme('#059669', '#047857', '#10b981', '#34d399', '#059669', '#0f1f1c', '#0f1f1c', '#0f1f1c', '#051411', 'rgba(5, 20, 17, 0.85)', 'rgba(15, 31, 28, 0.5)', 'rgba(15, 31, 28, 0.4)', 'rgba(15, 31, 28, 0.75)', 'rgba(15, 31, 28, 0.65)', 'rgba(5, 20, 17, 0.85)', '#ffffff', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)'),
                    'purple': createTheme('#7c3aed', '#6d28d9', '#8b5cf6', '#a78bfa', '#7c3aed', '#1a0d3d', '#1a0d3d', '#1a0d3d', '#0d0520', 'rgba(13, 5, 32, 0.85)', 'rgba(26, 13, 61, 0.5)', 'rgba(26, 13, 61, 0.4)', 'rgba(26, 13, 61, 0.75)', 'rgba(26, 13, 61, 0.65)', 'rgba(13, 5, 32, 0.85)', '#ffffff', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)'),
                    'dark-gray': createTheme('#6366f1', '#4f46e5', '#818cf8', '#a5b4fc', '#6366f1', '#1f2937', '#1f2937', '#1f2937', '#111827', 'rgba(17, 24, 39, 0.95)', 'rgba(31, 41, 55, 0.5)', 'rgba(31, 41, 55, 0.4)', 'rgba(31, 41, 55, 0.75)', 'rgba(31, 41, 55, 0.65)', 'rgba(17, 24, 39, 0.85)', '#ffffff', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)'),
                    'midnight-blue': createTheme('#3b82f6', '#2563eb', '#60a5fa', '#93c5fd', '#3b82f6', '#0c1222', '#0c1222', '#0c1222', '#040810', 'rgba(4, 8, 16, 0.95)', 'rgba(12, 18, 34, 0.5)', 'rgba(12, 18, 34, 0.4)', 'rgba(12, 18, 34, 0.75)', 'rgba(12, 18, 34, 0.65)', 'rgba(4, 8, 16, 0.85)', '#ffffff', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)'),
                    'deep-green': createTheme('#10b981', '#059669', '#34d399', '#6ee7b7', '#10b981', '#0a1f18', '#0a1f18', '#0a1f18', '#051411', 'rgba(5, 20, 17, 0.95)', 'rgba(10, 31, 24, 0.5)', 'rgba(10, 31, 24, 0.4)', 'rgba(10, 31, 24, 0.75)', 'rgba(10, 31, 24, 0.65)', 'rgba(5, 20, 17, 0.85)', '#ffffff', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)'),
                    'charcoal': createTheme('#f59e0b', '#d97706', '#fbbf24', '#fcd34d', '#f59e0b', '#1a1a1a', '#1a1a1a', '#1a1a1a', '#0f0f0f', 'rgba(15, 15, 15, 0.95)', 'rgba(26, 26, 26, 0.5)', 'rgba(26, 26, 26, 0.4)', 'rgba(26, 26, 26, 0.75)', 'rgba(26, 26, 26, 0.65)', 'rgba(15, 15, 15, 0.85)', '#ffffff', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)'),
                    // Medium themes - dark text on light backgrounds
                    'medium-blue': createTheme('#2563eb', '#1d4ed8', '#3b82f6', '#60a5fa', '#2563eb', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#6366f1', 'rgba(99, 102, 241, 0.9)', 'rgba(99, 102, 241, 0.5)', 'rgba(99, 102, 241, 0.4)', 'rgba(224, 231, 255, 0.8)', 'rgba(199, 210, 254, 0.7)', 'rgba(165, 180, 252, 0.85)', '#1e293b', '#334155', '#475569'),
                    'medium-green': createTheme('#059669', '#047857', '#10b981', '#34d399', '#059669', '#d1fae5', '#a7f3d0', '#6ee7b7', '#059669', 'rgba(5, 150, 105, 0.9)', 'rgba(5, 150, 105, 0.5)', 'rgba(5, 150, 105, 0.4)', 'rgba(209, 250, 229, 0.8)', 'rgba(167, 243, 208, 0.7)', 'rgba(110, 231, 183, 0.85)', '#064e3b', '#065f46', '#047857'),
                    'medium-purple': createTheme('#7c3aed', '#6d28d9', '#8b5cf6', '#a78bfa', '#7c3aed', '#ede9fe', '#ddd6fe', '#c4b5fd', '#7c3aed', 'rgba(124, 58, 237, 0.9)', 'rgba(124, 58, 237, 0.5)', 'rgba(124, 58, 237, 0.4)', 'rgba(237, 233, 254, 0.8)', 'rgba(221, 214, 254, 0.7)', 'rgba(196, 181, 253, 0.85)', '#4c1d95', '#5b21b6', '#6d28d9'),
                    'medium-gray': createTheme('#6366f1', '#4f46e5', '#818cf8', '#a5b4fc', '#6366f1', '#e2e8f0', '#cbd5e1', '#94a3b8', '#475569', 'rgba(71, 85, 105, 0.9)', 'rgba(71, 85, 105, 0.5)', 'rgba(71, 85, 105, 0.4)', 'rgba(226, 232, 240, 0.8)', 'rgba(203, 213, 225, 0.7)', 'rgba(148, 163, 184, 0.85)', '#1e293b', '#334155', '#475569'),
                    'warm-beige': createTheme('#a16207', '#854d0e', '#ca8a04', '#eab308', '#a16207', '#fef3c7', '#fde68a', '#fcd34d', '#d97706', 'rgba(217, 119, 6, 0.9)', 'rgba(217, 119, 6, 0.5)', 'rgba(217, 119, 6, 0.4)', 'rgba(254, 243, 199, 0.8)', 'rgba(253, 230, 138, 0.7)', 'rgba(252, 211, 77, 0.85)', '#422006', '#713f12', '#854d0e'),
                    // Light themes - dark text on very light backgrounds
                    'light-blue': createTheme('#2563eb', '#1e40af', '#3b82f6', '#60a5fa', '#2563eb', '#f8fafc', '#f1f5f9', '#e2e8f0', '#2563eb', 'rgba(37, 99, 235, 0.95)', 'rgba(37, 99, 235, 0.5)', 'rgba(37, 99, 235, 0.4)', 'rgba(248, 250, 252, 0.9)', 'rgba(241, 245, 249, 0.85)', 'rgba(226, 232, 240, 0.95)', '#0f172a', '#1e293b', '#334155'),
                    'light-green': createTheme('#059669', '#047857', '#10b981', '#34d399', '#059669', '#f0fdf4', '#dcfce7', '#bbf7d0', '#059669', 'rgba(5, 150, 105, 0.95)', 'rgba(5, 150, 105, 0.5)', 'rgba(5, 150, 105, 0.4)', 'rgba(240, 253, 244, 0.9)', 'rgba(220, 252, 231, 0.85)', 'rgba(187, 247, 208, 0.95)', '#022c22', '#064e3b', '#065f46'),
                    'light-purple': createTheme('#7c3aed', '#6d28d9', '#8b5cf6', '#a78bfa', '#7c3aed', '#faf5ff', '#f3e8ff', '#e9d5ff', '#7c3aed', 'rgba(124, 58, 237, 0.95)', 'rgba(124, 58, 237, 0.5)', 'rgba(124, 58, 237, 0.4)', 'rgba(250, 245, 255, 0.9)', 'rgba(243, 232, 255, 0.85)', 'rgba(233, 213, 255, 0.95)', '#3b0764', '#4c1d95', '#5b21b6'),
                    'light-brown': createTheme('#8c6f48', '#6d5637', '#a5896a', '#bea38c', '#8c6f48', '#fafaf9', '#f5f5f4', '#e7e5e4', '#8c6f48', 'rgba(140, 111, 72, 0.95)', 'rgba(140, 111, 72, 0.5)', 'rgba(140, 111, 72, 0.4)', 'rgba(250, 250, 249, 0.9)', 'rgba(245, 245, 244, 0.85)', 'rgba(231, 229, 228, 0.95)', '#292524', '#44403c', '#57534e'),
                    'light-gray': createTheme('#6366f1', '#4f46e5', '#818cf8', '#a5b4fc', '#6366f1', '#ffffff', '#f8fafc', '#f1f5f9', '#475569', 'rgba(71, 85, 105, 0.95)', 'rgba(71, 85, 105, 0.5)', 'rgba(71, 85, 105, 0.4)', 'rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.9)', 'rgba(241, 245, 249, 0.98)', '#0f172a', '#1e293b', '#334155')
                  };
                  
                  var theme = themes[themeId] || themes['default'];
                  
                  // Apply critical colors immediately (all background variants)
                  setVar('--primary', theme.primary);
                  setVar('--primary-dark', theme.primaryDark);
                  setVar('--primary-light', theme.primaryLight);
                  setVar('--primary-lighter', theme.primaryLighter);
                  setVar('--secondary', theme.secondary);
                  setVar('--bg-primary', theme.bgPrimary);
                  setVar('--bg-secondary', theme.bgSecondary);
                  setVar('--bg-tertiary', theme.bgTertiary);
                  setVar('--bg-dark', theme.bgDark);
                  setVar('--bg-dark-alpha', theme.bgDarkAlpha);
                  setVar('--bg-dark-alpha-50', theme.bgDarkAlpha50);
                  setVar('--bg-dark-alpha-40', theme.bgDarkAlpha40);
                  setVar('--bg-glass', theme.bgGlass);
                  setVar('--bg-glass-light', theme.bgGlassLight);
                  setVar('--bg-glass-dark', theme.bgGlassDark);
                  
                  // Apply text colors (already defined per theme in createTheme)
                  setVar('--text-primary', theme.textPrimary);
                  setVar('--text-secondary', theme.textSecondary);
                  setVar('--text-tertiary', theme.textTertiary);
                } catch(e) {
                  // Silently fail - default theme will be used
                }
              })();
            `,
          }}
        />
        {/* Suppress CSS MIME type errors immediately - runs before any other scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Suppress MIME type errors immediately before any other code runs
                if (typeof window !== 'undefined') {
                  // Catch errors before they're logged
                  const originalError = console.error;
                  const originalWarn = console.warn;
                  
                  console.error = function() {
                    const message = arguments[0] ? String(arguments[0]) : '';
                    // Suppress CSS MIME type errors (typically from browser extensions or cached HTML)
                    if (message.includes('MIME type') && (message.includes('text/css') || message.includes('.css') || message.includes('not executable'))) {
                      return; // Suppress this error
                    }
                    originalError.apply(console, arguments);
                  };
                  
                  console.warn = function() {
                    const message = arguments[0] ? String(arguments[0]) : '';
                    // Suppress CSS MIME type warnings
                    if (message.includes('MIME type') && (message.includes('text/css') || message.includes('.css'))) {
                      return; // Suppress this warning
                    }
                    originalWarn.apply(console, arguments);
                  };
                  
                  // Catch errors via global error handler (capture phase)
                  window.addEventListener('error', function(event) {
                    const message = event.message || '';
                    const filename = event.filename || '';
                    // Suppress MIME type errors for CSS files
                    if ((message.includes('MIME type') || message.includes('not executable')) && 
                        (filename.includes('.css') || message.includes('text/css'))) {
                      event.preventDefault();
                      event.stopPropagation();
                      event.stopImmediatePropagation();
                      return false;
                    }
                  }, true);
                  
                  // Catch unhandled promise rejections
                  window.addEventListener('unhandledrejection', function(event) {
                    const message = event.reason ? String(event.reason) : '';
                    if (message.includes('MIME type') && (message.includes('text/css') || message.includes('.css'))) {
                      event.preventDefault();
                      return false;
                    }
                  });
                }
              })();
            `,
          }}
        />
        {/* Enable back/forward cache */}
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Viewport meta tag with proper mobile scaling */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=0.5, user-scalable=yes"
        />

        {/* Preconnect to critical domains - highest priority - MUST be first */}
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

        {/* Inline critical @font-face declarations FIRST to break CSS dependency chain */}
        {/* Using font-display: optional to prevent blocking - fonts load in background */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: "Poppins";
                src: url("https://cdn.flushjohn.com/fonts/Poppins/Poppins-Regular.ttf") format("truetype");
                font-weight: 400;
                font-style: normal;
                font-display: optional;
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
                font-display: optional;
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
              .heroTitle h2 {
                min-height: 3.2em;
                display: block;
              }
              .serviceBadge {
                min-height: 2rem;
              }
              .heroCta {
                min-height: 3.5rem;
              }
            `,
          }}
        />

        {/* Preload fonts AFTER font-face declaration - non-blocking with optional display */}
        {/* Note: CDN must send Cache-Control headers for these fonts.
            See CDN_CACHE_CONFIGURATION.md for setup instructions */}
        {/* Using lower priority to prevent blocking critical path */}
        <link
          rel="preload"
          href="https://cdn.flushjohn.com/fonts/Poppins/Poppins-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.flushjohn.com/fonts/Merriweather/Merriweather-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for third-party domains - lower priority */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preload critical hero image for LCP optimization */}
        {/* Note: CDN must send Cache-Control headers for this image.
            See CDN_CACHE_CONFIGURATION.md for setup instructions */}
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
            <Script id="google-analytics" strategy="afterInteractive">
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

        {/* Web Vitals Tracking - Track Core Web Vitals */}
        <WebVitals />

        {/* Final Optimizer - Suppresses console errors and optimizes performance */}
        <FinalOptimizer />

        <ThemeContextProvider>
          <Layout>
            <ClientWidthContextProvider>
              <SidebarContextProvider>
                <QuickQuoteContextProvider>
                  <QuoteContextProvider>
                    <ScrollToTop />
                    <Sidebar />
                    <Navbar />
                    {/* Theme Switcher - Fixed position for easy testing */}
                    <ThemeSwitcherWrapper />
                    {children}
                    <QuickQuote />
                    <Testimonial {...testimonials} />
                    <Footer />
                  </QuoteContextProvider>
                </QuickQuoteContextProvider>
              </SidebarContextProvider>
            </ClientWidthContextProvider>
          </Layout>
        </ThemeContextProvider>
        {/* Portal root for datepicker and other portals */}
        <div id="root" />
      </body>
    </html>
  );
}
