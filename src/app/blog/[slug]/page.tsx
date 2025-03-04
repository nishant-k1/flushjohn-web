import React from "react";
import BlogPost from "@/components/Blog/BlogPost";
import { apiBaseUrls } from "@/constants";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify"; // Import DOMPurify
import { Metadata } from "next";

const { API_BASE_URL } = apiBaseUrls;
const API_URL = `${API_BASE_URL}/blogs`;

type Props = { params: { slug: string } };

// ✅ **Dynamic Metadata for SEO**
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  try {
    const res = await axios.get(API_URL, { params: { slug } });
    const blog = res?.data?.data;

    if (!blog) {
      return { title: "Blog Post Not Found" };
    }

    return {
      title: `${blog.title} | FlushJohn Blog`,
      description: blog.excerpt || "Read our latest blog post on FlushJohn.",
      keywords: blog.tags?.join(", ") || "blog, FlushJohn",
      openGraph: {
        title: blog.title,
        description: blog.excerpt || blog.title,
        url: `https://flushjohn.com/blog/${slug}`,
        images: [{ url: blog.coverImage, alt: blog.title }],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.excerpt || blog.title,
        images: [blog.coverImage],
      },
      alternates: {
        canonical: `https://flushjohn.com/blog/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
    return { title: "FlushJohn Blog" };
  }
}

// ✅ **Page Component**
const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const res = await axios.get(API_URL, { params: { slug } });

  const blogPost = {
    ...res?.data?.data,
    content: DOMPurify.sanitize(res?.data?.data?.content),
  };

  return (
    <BlogPost
      blogPost={blogPost}
      slug={slug}
    />
  );
};

export default BlogPostPage;
