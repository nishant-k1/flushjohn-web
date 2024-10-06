import React from "react";
import Contact from "@/components/Contact";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";

export const metadata = {
  title: "Contact Us - FlushJohn Porta Potty Rentals",
  description:
    "Have questions? Get in touch with the FlushJohn team for inquiries about porta potty rentals, pricing, or any other services.",
  keywords:
    "contact flushjohn, porta potty inquiries, rental questions, customer support",
  openGraph: {
    title: "Contact FlushJohn - Porta Potty Rentals",
    description:
      "Reach out to us for any questions or assistance with our porta potty rental services. We’re here to help.",
    url: `${websiteURL}/contact`,
    type: "website",
    images: [
      {
        url: `${s3assets}/icon.svg`,
        alt: "FlushJohn Contact",
      },
    ],
  },
};

const ContactPage = () => <Contact />;

export default ContactPage;
