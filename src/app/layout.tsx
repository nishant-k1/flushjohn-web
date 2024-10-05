import "../../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import QuickQuote from "@/components/QuickQuote";
import { ToastContainer } from "react-toastify";
import { testimonials } from "@/constants";
import Testimonial from "@/components/Testimonial";
import React from "react";
import { ClientWidthContextProvider } from "@/contexts/ClientWidthContext";
import { QuoteContextProvider } from "@/contexts/QuoteContext";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { QuickQuoteContextProvider } from "@/contexts/QuickQuoteContext";
import Layout from "@/components/Layout";
import { poppins, merriweather } from "./fontConfig";

// import DefaultSeo from "next-seo";
// import defaultSeoConfig from "../../next-seo.config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${merriweather.variable}`}
    >
      <head>{/* <DefaultSeo {...defaultSeoConfig} /> */}</head>
      <body>
        <Layout>
          <ClientWidthContextProvider>
            <SidebarContextProvider>
              <QuickQuoteContextProvider>
                <QuoteContextProvider>
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
