import React from "react";
import { Blog } from "@/features/blog/components";
import type { Metadata } from "next";
import { s3assets, websiteURL, apiBaseUrls } from "@/constants";

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
    card: "summary_large_image",
    title: "FlushJohn - Porta Potty Rentals",
    description:
      "Providing high-quality porta potty rental solutions for events of all sizes. Clean, affordable, and convenient.",
    images: [`${s3assets}/og-image-flushjonn-web.png`],
  },
  alternates: {
    canonical: `${websiteURL}/blog`,
  },
};

const BlogPage = async () => {
  const { API_BASE_URL } = apiBaseUrls;

  let initialBlogs: any[] = [];
  let initialPagination: any = null;

  try {
    const res = await fetch(
      `${API_BASE_URL}/blogs?page=1&limit=12&status=published&sortBy=createdAt&sortOrder=desc`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      }
    );

    if (res.ok) {
      const result = await res.json();
      if (result.success) {
        initialBlogs = result.data || [];
        initialPagination = result.pagination || null;
      }
    }
  } catch (error) {
    console.error("Error fetching initial blogs:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "FlushJohn Blog",
    url: `${websiteURL}/blog`,
    description:
      "Stay updated with the latest news, tips, and insights on porta potty rentals from FlushJohn.",
    publisher: {
      "@type": "Organization",
      name: "FlushJohn",
      logo: {
        "@type": "ImageObject",
        url: `${s3assets}/og-image-flushjonn-web.png`,
      },
    },
    blogPost: initialBlogs.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt || post.title,
      datePublished: post.createdAt,
      author: {
        "@type": "Person",
        name: post.author || "FlushJohn Team",
      },
      image: post.coverImage?.src,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${websiteURL}/blog/${post._id}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Blog
        initialBlogs={initialBlogs}
        initialPagination={initialPagination}
      />
    </>
  );
};

export default BlogPage;
