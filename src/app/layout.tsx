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
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";

export const metadata: Metadata = {
  title: "FlushJohn Porta Potty Rentals",
  description:
    "Reliable and affordable porta potty rentals for all your events.",
  keywords: "porta potty, portable toilets, event rentals, FlushJohn",
  openGraph: {
    title: "FlushJohn Porta Potty Rentals",
    description:
      "Get portable restrooms for your events at competitive prices.",
    url: `${websiteURL}/icon.svg`,
    type: "website",
    images: [
      {
        url: `${s3assets}/icon.svg`,
        alt: "FlushJohn Portable Toilet Rental Service",
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
