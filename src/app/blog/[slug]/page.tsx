import React from "react";
import BlogPost from "@/components/Blog/BlogPost";
import { apiBaseUrls } from "@/constants";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify"; // Import DOMPurify

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { API_BASE_URL } = apiBaseUrls;
  const API_URL = `${API_BASE_URL}/blogs`;
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
