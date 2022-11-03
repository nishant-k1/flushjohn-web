import React from "react";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import "../styles/globals.css";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { QuoteContextProvider } from "../contexts/QuoteContext";
import Testimonial from "../components/Testimonial";
import { useEffect } from "react";
import Head from "next/head";
import initGA, { PageView } from "../lib/analytics";
import QuickQuoteButton from "../components/QuickQuoteButton";
import { QuickQuoteContext } from "../contexts/QuickQuoteContext";
import { ClientWidthContext } from "../contexts/ClientWidthContext";
import QuickQuote from "./../components/QuickQuote";
import { SidebarContext } from "./../contexts/SidebarContext";
import ModalBackground from "../components/ModalBackground";
import { ToastContainer, toast } from "react-toastify";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initGA("YourTrackingID");
    PageView();
  });
  const [clientWidth, setClientWidth] = React.useState();
  const [quickQuoteViewStatus, setQuickQuoteViewStatus] = React.useState(false);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setClientWidth(window.innerWidth);
      // modal container
      if ((quickQuoteViewStatus && clientWidth <= 600) || active) {
        document.documentElement.style.overflowY = "hidden"; // firefox, chrome
        document.body.scroll = "no"; // ie only
      } else {
        document.documentElement.style.overflowY = "scroll"; // firefox, chrome
        document.body.scroll = "yes"; // ie only
      }
    }
    if (clientWidth) {
      window.addEventListener("resize", () => {
        setClientWidth(window.innerWidth);
      });
    }
    return () => {
      window.removeEventListener("resize", () => {
        setClientWidth(window.innerWidth);
      });
    };
  }, [clientWidth, quickQuoteViewStatus, active]);
  return (
    <>
      <Head>
        <link rel="manifest" href="manifest.webmanifest" />
        <link rel="icon" href="logo-black.svg" />
        <link rel="apple-touch-icon" href="icon-192x192.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#001A2E" />
        <meta name="apple-mobile-web-app-title" content="Reliable Portable" />
        <link
          rel="icon"
          type="image/ico"
          sizes="32x32"
          href="/favicon-32x32.ico"
        />
      </Head>
      <DefaultSeo {...SEO} />
      <SidebarContext.Provider value={{ active, setActive }}>
        <QuoteContextProvider>
          <QuickQuoteContext.Provider
            value={{ quickQuoteViewStatus, setQuickQuoteViewStatus }}
          >
            <ClientWidthContext.Provider
              value={{ clientWidth, setClientWidth }}
            >
              <Sidebar />

              <Layout>
                {active && <ModalBackground />}
                <Header />
                <Nav />
                <Component {...pageProps} />
                {quickQuoteViewStatus && clientWidth <= 600 && (
                  <ModalBackground />
                )}
                {clientWidth <= 600 && <QuickQuoteButton />}
                {quickQuoteViewStatus && clientWidth <= 600 && <QuickQuote />}
                <Testimonial />
                <Footer />
                <ToastContainer />
              </Layout>
            </ClientWidthContext.Provider>
          </QuickQuoteContext.Provider>
        </QuoteContextProvider>
      </SidebarContext.Provider>
    </>
  );
}

export default MyApp;
