import React from "react";
import BlogPost from "@/components/Blog/BlogPost";
import { apiBaseUrls, s3assets, websiteURL } from "@/constants";
import DOMPurify from "isomorphic-dompurify";

const { API_BASE_URL } = apiBaseUrls;
const API_URL = `${API_BASE_URL}/blogs`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) return { title: "FlushJohn Blog" };

  try {
    const res = await fetch(`${API_URL}?slug=${slug}`, {
      cache: "no-store",
    });
    const { data: blog } = (await res.json()) || {};
    if (!blog) {
      return { title: "Blog Post Not Found" };
    }
    return {
      title: `${blog?.title} | FlushJohn Blog`,
      description: blog?.excerpt || "Read our latest blog post on FlushJohn.",
      keywords: blog?.tags?.join(", ") || "blog, FlushJohn",
      openGraph: {
        title: blog?.title,
        description: blog?.excerpt || blog?.title,
        url: `${websiteURL}/blog/${slug}`,
        images: [
          {
            url: blog?.coverImage?.src,
            height: 630,
            width: 1200,
            alt: blog?.title,
          },
        ],
        type: "article",
        siteName: "FlushJohn",
        publishedTime: blog?.publishedAt || new Date().toISOString(),
        modifiedTime: blog?.updatedAt || new Date().toISOString(),
        authors: [blog?.author || "FlushJohn Team"],
      },
      twitter: {
        card: "summary_large_image",
        title: blog?.title,
        description: blog?.excerpt || blog?.title,
        images: [blog?.coverImage?.src],
      },
      alternates: {
        canonical: `${websiteURL}/blog/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
    return { title: "FlushJohn Blog" };
  }
}

// ✅ **Page Component**
const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  if (!slug) return;

  try {
    const res = await fetch(`${API_URL}?slug=${slug}`, { cache: "no-store" });
    const { data: blog } = (await res.json()) || {};
    if (!blog) {
      return <div>Blog Post Not Found</div>;
    }

    const blogPost = {
      ...blog,
      content: DOMPurify.sanitize(blog.content),
    };

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blogPost.title,
      description: blogPost.excerpt || blogPost.title,
      datePublished: blogPost.publishedAt || new Date().toISOString(),
      dateModified: blogPost.updatedAt || new Date().toISOString(),
      author: {
        "@type": "Person",
        name: blogPost.author || "FlushJohn Team",
      },
      publisher: {
        "@type": "Organization",
        name: "FlushJohn",
        logo: {
          "@type": "ImageObject",
          url: `${s3assets}/og-image-flushjonn-web.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${websiteURL}/blog/${slug}`,
      },
      image:
        blogPost?.coverImage?.src || `${s3assets}/og-image-flushjonn-web.png`,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BlogPost
          blogPost={blogPost}
          slug={slug}
        />
      </>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return <div>Error loading blog post</div>;
  }
};

export default BlogPostPage;
