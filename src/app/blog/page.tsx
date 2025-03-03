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
    images: [
      {
        url: `${s3assets}/icon.svg`,
        alt: "FlushJohn Blog",
      },
    ],
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
