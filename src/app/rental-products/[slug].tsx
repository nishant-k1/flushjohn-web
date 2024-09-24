import React from "react";
import { useRouter } from "next/router";
import IndividualProduct from "../../components/Products/IndividualProduct";

const Product = () => {
  const router = useRouter();
  const { slug } = router.query;
  if (Array.isArray(slug) || typeof slug !== "string") {
    return null; // Return null or a loading state if slug is not a string
  }
  return <IndividualProduct slug={slug} />;
};

export default Product;
