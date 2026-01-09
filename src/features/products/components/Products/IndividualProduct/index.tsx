import React from "react";
import { Check } from "lucide-react";
import styles from "./styles.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import { products_data } from "../../../constants";
import Image from "next/image";
import Link from "next/link";
import { findProductBySlug } from "@/utils/slug";

interface IndividualProductProps {
  slug: string;
}

const IndividualProduct = ({ slug }: IndividualProductProps) => {
  if (!slug) return null; // Return null if slug is not provided

  const currentProduct = findProductBySlug(slug, products_data.product_list);

  if (!currentProduct) {
    return (
      <div className={styles.product}>
        <div className={styles.container}>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link href="/rental-products">View All Products</Link>
        </div>
      </div>
    );
  }

  const { title, image, desc } = currentProduct;
  const { src_1, src_2, alt } = image;

  return (
    <div className={styles.product}>
      <div className={styles.container}>
        <Breadcrumbs path={`/rental-products/${slug}`} />
        <div className={styles.wrapper}>
          <h1>{title} - Porta Potty Rentals Nearby</h1>
          <p style={{ color: "var(--text-primary)" }}>
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
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-primary)",
              }}
            >
              <Check size={18} color="var(--primary-light)" />
              Clean and sanitized before every use
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-primary)",
              }}
            >
              <Check size={18} color="var(--primary-light)" />
              Durable and weather-resistant design
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-primary)",
              }}
            >
              <Check size={18} color="var(--primary-light)" />
              Available for short-term and long-term rentals
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-primary)",
              }}
            >
              <Check size={18} color="var(--primary-light)" />
              Perfect for events, construction sites, and outdoor gatherings
            </li>
          </ul>
          <div className={styles.serviceAreasSection}>
            <h2>Available in 25+ Cities Across 6 States</h2>
            <p className={styles.serviceAreasDescription}>
              Our {title} is available for rental in major cities across the
              United States. Find porta potty rentals in your city:
            </p>
            <div className={styles.cityLinksContainer}>
              <Link
                href="/porta-potty-rental/houston"
                className={styles.cityLink}
              >
                Houston, TX
              </Link>
              <Link
                href="/porta-potty-rental/dallas"
                className={styles.cityLink}
              >
                Dallas, TX
              </Link>
              <Link
                href="/porta-potty-rental/miami"
                className={styles.cityLink}
              >
                Miami, FL
              </Link>
              <Link
                href="/porta-potty-rental/los-angeles"
                className={styles.cityLink}
              >
                Los Angeles, CA
              </Link>
              <Link
                href="/porta-potty-rental/atlanta"
                className={styles.cityLink}
              >
                Atlanta, GA
              </Link>
              <Link
                href="/porta-potty-rental/chicago"
                className={styles.cityLink}
              >
                Chicago, IL
              </Link>
            </div>
            <p className={styles.viewAllLink}>
              <Link href="/service-areas">View All 25+ Service Areas →</Link>
            </p>
          </div>

          <p style={{ marginTop: "2rem", color: "var(--text-primary)" }}>
            Need a {title}?{" "}
            <Link href="/quote" style={{ color: "var(--text-primary)" }}>
              Get a free quote
            </Link>{" "}
            today or learn more about our{" "}
            <Link href="/rental-products" style={{ color: "#ffffff" }}>
              rental options
            </Link>
            .
          </p>
          <p style={{ color: "var(--text-primary)" }}>
            <Link href="/" style={{ color: "#ffffff" }}>
              Back to Homepage
            </Link>{" "}
            |{" "}
            <Link href="/faq" style={{ color: "#ffffff" }}>
              Frequently Asked Questions
            </Link>{" "}
            |{" "}
            <Link href="/contact" style={{ color: "#ffffff" }}>
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
