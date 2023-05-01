import React from "react";
import { useRouter } from "next/router";
import BlogPost from "../../components/Blog/Post";

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <BlogPost slug={slug} />;
};

export default Post;
