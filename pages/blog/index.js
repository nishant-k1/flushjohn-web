import React from "react";
import { useRouter } from "next/router";
import Blog from "../../components/Blog";

const blog = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <Blog slug={slug} />;
};

export default blog;
