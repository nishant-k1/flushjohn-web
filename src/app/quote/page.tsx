import React from "react";
import Quote from "@/components/Quote";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";

export const metadata: Metadata = {
  title: "Get a Quote - FlushJohn Porta Potty Rentals",
  description:
    "Fill out our simple form to get a personalized quote for porta potty rentals for your event. Quick, easy, and competitive pricing.",
  keywords:
    "get a quote, porta potty rental quote, portable toilet pricing, event rentals",
  openGraph: {
    title: "Get a Quote for Porta Potty Rentals - FlushJohn",
    description:
      "Submit the form to receive a custom quote for our porta potty rental services. Fast, reliable, and affordable solutions.",
    url: `${websiteURL}/quote`,
    type: "website",
    images: [
      {
        url: `${s3assets}/icon.svg`,
        alt: "FlushJohn Quote",
      },
    ],
  },
};

const QuotePage = () => <Quote />;

export default QuotePage;
