import React from "react";
import { useRouter } from "next/router";
import StandardPortableRestroom from "../../components/Products/StandardPortableRestroom";
import DeluxeFlushableRestroom from "../../components/Products/DeluxeFlushableRestroom";
import AdaPortableRestroom from "../../components/Products/AdaPortableRestroom";
import HandWashSinkStation from "../../components/Products/HandWashSinkStation";
import Breadcrumbs from "../../components/Breadcrumbs";
import styles from "../../components/Products/styles.module.css";

const Product = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div className={styles.products}>
      <div className={styles.container}>
        <Breadcrumbs path={`/products/${slug}`} />
        <div className={styles.productsWrapper}>
          {slug === "standard-portable-restroom" && (
            <StandardPortableRestroom />
          )}
          {slug === "ada-compliant-portable-restroom" && (
            <AdaPortableRestroom />
          )}
          {slug === "hand-wash-sink-station" && <HandWashSinkStation />}
          {slug === "flushable-restroom-sink-inside" && (
            <DeluxeFlushableRestroom />
          )}
        </div>
      </div>
    </div>
  );
};

// if (slug === "standard-portable-restroom")
// return c;
// if (slug === "ada-compliant-portable-restroom")
// return <AdaPortableRestroom />;
// if (slug === "hand-wash-sink-station") return <HandWashSinkStation />;
// if (slug === "flushable-restroom-sink-inside")
// return <DeluxeFlushableRestroom />;
// else return "";
export default Product;
