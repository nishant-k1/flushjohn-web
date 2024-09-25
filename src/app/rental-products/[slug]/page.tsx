import React from "react";
import IndividualProduct from "@/components/Products/IndividualProduct";

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return <IndividualProduct slug={slug} />;
};

export default ProductPage;
