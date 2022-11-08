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
import QuickQuote from "./../components/QuickQuote";
import { QuickQuoteContext } from "../contexts/QuickQuoteContext";
import { ClientWidthContext } from "../contexts/ClientWidthContext";
import { SidebarContext } from "./../contexts/SidebarContext";
import ModalBackground from "../components/ModalBackground";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  const [clientWidth, setClientWidth] = React.useState(null);
  const [quickQuoteViewStatus, setQuickQuoteViewStatus] = React.useState(false);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setClientWidth(window.innerWidth);
      // modal container
      if ((quickQuoteViewStatus && clientWidth <= 600) || active) {
        document.documentElement.style.overflowY = "hidden"; // firefox, chrome
        // document.body.scroll = "no"; // ie only
      } else {
        document.documentElement.style.overflowY = "scroll"; // firefox, chrome
        // document.body.scroll = "yes"; // ie only
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
    <div>
      <DefaultSeo {...SEO} />
      <ClientWidthContext.Provider value={[clientWidth, setClientWidth]}>
        <SidebarContext.Provider value={{ active, setActive }}>
          <QuoteContextProvider>
            <QuickQuoteContext.Provider
              value={{ quickQuoteViewStatus, setQuickQuoteViewStatus }}
            >
              <Sidebar />
              <Layout>
                {active && <ModalBackground />}
                <Header />
                <Nav />
                <Component {...pageProps} />
                {clientWidth <= 600 && <QuickQuote />}
                <Testimonial />
                <Footer />
                <ToastContainer />
              </Layout>
            </QuickQuoteContext.Provider>
          </QuoteContextProvider>
        </SidebarContext.Provider>
      </ClientWidthContext.Provider>
    </div>
  );
}

export default MyApp;
