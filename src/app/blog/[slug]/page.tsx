import React from "react";
import BlogPost from "@/components/Blog/BlogPost";
import { apiBaseUrls } from "@/constants";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify"; // Import DOMPurify

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { API_BASE_URL } = apiBaseUrls;
  const API_URL = `${API_BASE_URL}/blogs/${slug}`;
  let blogPost;

  try {
    const res = await axios.get(API_URL);
    if (res.data.success) {
      const data = res.data.data;
      blogPost = {
        ...data,
        content: DOMPurify.sanitize(data.content),
      };
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
  }

  return (
    <BlogPost
      blogPost={blogPost}
      slug={slug}
    />
  );
};

export default BlogPostPage;
