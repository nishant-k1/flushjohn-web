import React from "react";
import { useRouter } from "next/router";
import IndividualProduct from "../../components/Products/IndividualProduct";

const Product = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <IndividualProduct slug={slug} />;
};

export default Product;
