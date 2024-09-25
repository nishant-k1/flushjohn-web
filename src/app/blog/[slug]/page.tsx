import React from "react";
import BlogPost from "@/components/Blog/Post";

const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  console.log("params", params);
  const { slug } = params;

  return <BlogPost slug={slug} />;
};

export default BlogPostPage;
