import React from "react";
import { useRouter } from "next/router";
import Post from "@/components/Blog/Post";

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Ensure slug is a string before using it
  if (Array.isArray(slug) || typeof slug !== "string") {
    return null; // Return null or a loading state if slug is not a string
  }

  return <Post slug={slug} />;
};

export default PostPage;
