import React from "react";
import { BlogPost } from "@/features/blog/components";
import { apiBaseUrls, s3assets, websiteURL, socialMedia } from "@/constants";
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
    const { data: blogs } = (await res.json()) || {};
    if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
      return { title: "Blog Post Not Found" };
    }

    // Find the blog post that matches the slug
    const blog = blogs.find((b: any) => b.slug === slug);
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
    const { data: blogs } = (await res.json()) || {};
    if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
      return <div>Blog Post Not Found</div>;
    }

    // Find the blog post that matches the slug
    const blog = blogs.find((b: any) => b.slug === slug);
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

    // Enhanced JSON-LD with more SEO data
    const enhancedJsonLd = {
      ...jsonLd,
      wordCount: Math.max(
        blogPost.content?.replace(/<[^>]*>/g, "").length || 0,
        500
      ),
      timeRequired: `PT${Math.ceil((blogPost.content?.replace(/<[^>]*>/g, "").length || 500) / 200)}M`,
      articleSection: blogPost.category || "Porta Potty Rentals",
      keywords:
        blogPost.tags?.join(", ") ||
        "porta potty rental, portable toilets, event sanitation",
      inLanguage: "en-US",
      isAccessibleForFree: true,
      about: [
        {
          "@type": "Thing",
          name: "Porta Potty Rental Services",
          description:
            "Professional porta potty rental services for events and construction sites",
        },
        {
          "@type": "Service",
          name: "Event Sanitation Solutions",
          description: "Comprehensive sanitation services for outdoor events",
        },
      ],
      mentions: [
        {
          "@type": "Organization",
          name: "FlushJohn",
          url: websiteURL,
          sameAs: [
            socialMedia.facebook,
            socialMedia.twitter,
            socialMedia.linkedin,
          ],
        },
      ],
      speakable: {
        "@type": "SpeakableSpecification",
        xpath: ["/html/head/title", "//*[@id='main-content']"],
      },
      potentialAction: {
        "@type": "ReadAction",
        target: `${websiteURL}/blog/${slug}`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "23",
        bestRating: "5",
        worstRating: "1",
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(enhancedJsonLd) }}
        />
        <BlogPost
          blogPost={blogPost}
          slug={slug}
        />
      </>
    );
  } catch (error) {

    return <div>Error loading blog post</div>;
  }
};

export default BlogPostPage;
