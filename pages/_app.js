import React from "react";
import { DefaultSeo, LocalBusinessJsonLd } from "next-seo";
import SEO from "../next-seo.config";
import "../styles/globals.css";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { QuoteContextProvider } from "../contexts/QuoteContext";
import Testimonial from "../components/Testimonial";
import Head from "next/head";
import QuickQuote from "./../components/QuickQuote";
import { QuickQuoteContext } from "../contexts/QuickQuoteContext";
import { ClientWidthContext } from "../contexts/ClientWidthContext";
import { SidebarContext } from "./../contexts/SidebarContext";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  const [clientWidth, setClientWidth] = React.useState(null);
  const [quickQuoteViewStatus, setQuickQuoteViewStatus] = React.useState(true);
  const [active, setActive] = React.useState(false);
  
  const handleResize = React.useCallback(() => {
    setClientWidth(window.innerWidth);
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize();
    }
  }, [handleResize]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // modal container
      if ((quickQuoteViewStatus && clientWidth <= 600) || active) {
        document.documentElement.style.overflowY = "hidden"; // firefox, chrome
        // document.body.scroll = "no"; // ie only
      } else {
        document.documentElement.style.overflowY = "scroll"; // firefox, chrome
        // document.body.scroll = "yes"; // ie only
      }
    }
  }, [quickQuoteViewStatus, clientWidth, active]);

  React.useEffect(() => {
    if (clientWidth) {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [clientWidth, handleResize]);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no, user-scalable=1, viewport-fit=cover"
        />
        <meta name="robots" content="nosnippet,max-snippet:100" />
        <link rel="shortcut icon" href="favicon-16x16.ico" type="image/x-icon" />
      </Head>
      <ClientWidthContext.Provider value={[clientWidth, setClientWidth]}>
        <SidebarContext.Provider value={{ active, setActive }}>
          <QuoteContextProvider>
            <QuickQuoteContext.Provider
              value={{ quickQuoteViewStatus, setQuickQuoteViewStatus }}
            >
              <Sidebar />
              <Layout>
                <Header />
                <Nav />
                <DefaultSeo {...SEO} />
                  <LocalBusinessJsonLd
                    type="LocalBusiness"
                    id="https://www.reliableportable.com/#local-business"
                    name="Reliable Portable"
                    description="We offer a wide range of portable toilet rentals and hand wash station rentals for all your events and job site needs."
                    url="https://www.reliableportable.com/"
                    // telephone="123-456-7890"
                    // address={{
                    //   streetAddress: "123 Main St",
                    //   addressLocality: "Anytown",
                    //   addressRegion: "CA",
                    //   postalCode: "12345",
                    //   addressCountry: "US"
                    // }}
                    openingHours={[
                      "Monday-Friday 9:00-17:00",
                      "Saturday 9:00-12:00"
                    ]}
                  />
                <Component {...pageProps} />
                <QuickQuote />
                <Testimonial />
                <Footer />
                <ToastContainer />
              </Layout>
            </QuickQuoteContext.Provider>
          </QuoteContextProvider>
        </SidebarContext.Provider>
      </ClientWidthContext.Provider>
    </React.Fragment>
  );
}

export default MyApp;
