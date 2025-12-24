import React from "react";
import { Check } from "lucide-react";
import styles from "./styles.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import { products_data } from "../../../constants";
import Image from "next/image";
import Link from "next/link";

interface IndividualProductProps {
  slug: string;
}

const IndividualProduct = ({ slug }: IndividualProductProps) => {
  if (!slug) return null; // Return null if slug is not provided

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
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div
              style={{
                position: "relative",
                width: "300px",
                height: "400px",
                maxWidth: "100%",
                contain: "layout style paint",
              }}
            >
              <Image
                src={src_1}
                alt={alt}
                fill
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 300px"
                quality={85}
              />
            </div>
            <div
              style={{
                position: "relative",
                width: "300px",
                height: "400px",
                maxWidth: "100%",
                contain: "layout style paint",
              }}
            >
              <Image
                src={src_2}
                alt={alt}
                fill
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 300px"
                quality={85}
              />
            </div>
          </div>
          <p>{desc}</p>
          <h2>Why Choose Our {title}?</h2>
          <ul>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Check size={18} />
              Clean and sanitized before every use
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Check size={18} />
              Durable and weather-resistant design
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Check size={18} />
              Available for short-term and long-term rentals
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Check size={18} />
              Perfect for events, construction sites, and outdoor gatherings
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
