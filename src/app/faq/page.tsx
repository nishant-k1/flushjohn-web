import Faq from "@/components/Faq";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";

export const metadata: Metadata = {
  title: "FAQ - FlushJohn Porta Potty Rentals",
  description:
    "Find answers to the most frequently asked questions about our porta potty rental services, pricing, and more.",
  keywords:
    "FAQ, porta potty questions, flushjohn faq, rental questions, portable toilet help",
  openGraph: {
    title: "FlushJohn FAQ - Porta Potty Rentals",
    description:
      "Get answers to common questions about porta potty rentals, pricing, delivery, and more with FlushJohn.",
    url: `${websiteURL}/faq`,
    type: "website",
    images: [
      {
        url: `${s3assets}/icon.png`,
        alt: "FlushJohn FAQ",
      },
    ],
  },
};

const FaqPage = () => <Faq />;

export default FaqPage;
