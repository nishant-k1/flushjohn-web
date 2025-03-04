import React from "react";
import Blog from "@/components/Blog";
import type { Metadata } from "next";
import { s3assets, websiteURL } from "@/constants";
import axios from "axios";
import { apiBaseUrls } from "@/constants";

export const metadata: Metadata = {
  title: "Blog - FlushJohn Porta Potty Rentals",
  description:
    "Stay updated with the latest news, tips, and insights on porta potty rentals from FlushJohn.",
  keywords:
    "porta potty blog, flushjohn news, portable toilet tips, event hygiene",
  openGraph: {
    title: "FlushJohn Blog",
    description:
      "Discover insights and tips on porta potty rentals and event hygiene.",
    url: `${websiteURL}/blog`,
    type: "website",
    siteName: "FlushJohn",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        height: 630,
        width: 1200,
        alt: "FlushJohn Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // Use "summary" for square/tall images, "summary_large_image" for 1200x630
    title: "FlushJohn - Porta Potty Rentals",
    description:
      "Providing high-quality porta potty rental solutions for events of all sizes. Clean, affordable, and convenient.",
    images: [`${s3assets}/og-image-flushjonn-web.png`], // Use the same image
  },
  other: {
    "og:type": "website",
    "og:site_name": "FlushJohn",
    "og:locale": "en_US", // Change if needed

    // For Pinterest (Rich Pins)
    "article:published_time": "2024-03-04T12:00:00Z", // Change if needed
    "article:author": "FlushJohn Team",

    // For WhatsApp & Discord (OG works automatically)
  },
};

const BlogPage = async () => {
  const { API_BASE_URL } = apiBaseUrls;
  const API_URL = `${API_BASE_URL}/blogs`;

  let blogList: {
    createdAt: string;
    title: string;
    content: any;
    _id: string;
  }[] = [];

  try {
    const res = await axios.get(API_URL);
    if (res.data.success) {
      blogList = [...res.data.data];
    }
  } catch (error) {
    console.error("Error fetching blog list:", error);
  }
  return <Blog blogList={blogList} />;
};

export default BlogPage;
