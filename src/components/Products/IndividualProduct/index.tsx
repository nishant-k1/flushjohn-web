import React from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "../../Breadcrumbs";
import { products_data } from "../../../constants";
import Image from "next/image";
import Link from "next/link";

interface IndividualProductProps {
  slug: string;
}

const IndividualProduct = ({ slug }: IndividualProductProps) => {
  if (!slug) return null; // Return null if slug is not provided

  // Find the current product based on the slug
  const currentProduct = products_data.product_list.find((product) => {
    const formattedSlug = product.title.toLowerCase().replace(/\s+/g, "-");
    return formattedSlug === slug;
  });

  if (!currentProduct) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const { title, image, desc } = currentProduct;
  const { src_1, src_2, alt } = image;

  return (
    <div className={styles.product}>
      <div className={styles.container}>
        <Breadcrumbs path={`/rental-products/${slug}`} />
        <div className={styles.wrapper}>
          <h1>{title} - Porta Potty Rentals Nearby</h1>
          <p>
            Reliable, hygienic, and affordable portable toilet rentals for your
            event or job site.
          </p>
          <div>
            <Image
              src={src_1}
              alt={alt}
              width={300}
              height={600}
              priority={true}
              placeholder="empty"
            />
            <Image
              src={src_2}
              alt={alt}
              width={300}
              height={600}
              priority={true}
              placeholder="empty"
            />
          </div>
          <p>{desc}</p>
          <h2>Why Choose Our {title}?</h2>
          <ul>
            <li>✅ Clean and sanitized before every use</li>
            <li>✅ Durable and weather-resistant design</li>
            <li>✅ Available for short-term and long-term rentals</li>
            <li>
              ✅ Perfect for events, construction sites, and outdoor gatherings
            </li>
          </ul>
          <p>
            Need a {title}? <Link href="/quote">Get a free quote</Link> today or
            learn more about our{" "}
            <Link href="/rental-products">rental options</Link>.
          </p>
          <p>
            <Link href="/">Back to Homepage</Link> |{" "}
            <Link href="/faq">Frequently Asked Questions</Link> |{" "}
            <Link href="/contact">Contact Us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
