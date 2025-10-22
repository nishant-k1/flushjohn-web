"use client";

import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/utils";
import { convert } from "html-to-text";
import { useBlogsPagination } from "@/hooks/useBlogsPagination";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const truncateText = (html: string, maxLength = 150) => {
  const plainText = convert(html, { wordwrap: false });
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength).trim() + "..."
    : plainText;
};

interface BlogProps {
  initialBlogs?: any[];
  initialPagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const Blog = ({ initialBlogs = [], initialPagination }: BlogProps) => {
  const {
    blogs,
    loading,
    error,
    hasNextPage,
    loadMore,
    isFetchingMore,
    totalItems,
  } = useBlogsPagination({
    limit: 12, // 12 blogs per page as recommended
    initialData: initialBlogs,
    initialPagination,
  });

  const { targetRef, isIntersecting } = useInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingMore,
    threshold: 0.1,
    rootMargin: "100px",
  });

  // Load more when intersection is detected
  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingMore) {
      loadMore();
    }
  }, [isIntersecting, hasNextPage, isFetchingMore, loadMore]);

  // Only show loading if we don't have initial data
  if (loading && !initialBlogs.length) {
    return (
      <div className={styles.section}>
        <div className={styles.container}>
          <Breadcrumbs path="" />
          <div className={styles.wrapper}>
            <h1>Our Blog</h1>
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading blogs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.section}>
        <div className={styles.container}>
          <Breadcrumbs path="" />
          <div className={styles.wrapper}>
            <h1>Our Blog</h1>
            <div className={styles.errorContainer}>
              <p>Error loading blogs: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className={styles.retryButton}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <Breadcrumbs path="" />
        <div className={styles.wrapper}>
          <h1>Our Blog</h1>
          <div className={styles.blogStats}>
            <p>
              Showing {blogs.length} of {totalItems} blog posts
            </p>
          </div>
          <div className={styles.blogWrapper}>
            {blogs.map((item) => {
              const { _id, coverImage, title, createdAt, content } = item;
              const blogDate = new Date(createdAt);
              const { src = "", alt = "" } = coverImage || {};
              const slug = generateSlug(title);
              const previewText = truncateText(content);

              return (
                <Link
                  href={`/blog/${slug}`}
                  key={_id}
                  className={styles.blogItem}
                >
                  <div className={styles.imageContainer}>
                    {coverImage && (
                      <Image
                        src={src}
                        alt={alt}
                        width={400}
                        height={200}
                        priority={true}
                        placeholder="empty"
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    )}
                  </div>
                  <div className={styles.textContainer}>
                    <h2>{title || "Untitled"}</h2>
                    <h3>
                      {blogDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <p>{previewText || "No preview available."}</p>
                    <span className={styles.readMore}>Read More →</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Infinite scroll trigger */}
          {hasNextPage && (
            <div
              ref={targetRef}
              className={styles.loadMoreTrigger}
            >
              {isFetchingMore && (
                <div className={styles.loadingMore}>
                  <div className={styles.loadingSpinner}></div>
                  <p>Loading more blogs...</p>
                </div>
              )}
            </div>
          )}

          {!hasNextPage && blogs.length > 0 && (
            <div className={styles.endMessage}>
              <p>You've reached the end! No more blogs to load.</p>

              {/* Related Content Section */}
              <div className={styles.relatedContent}>
                <h3>Explore More Resources</h3>
                <div className={styles.relatedLinks}>
                  <Link
                    href="/porta-potty-rental"
                    className={styles.relatedLink}
                  >
                    <h4>🏙️ City-Specific Services</h4>
                    <p>Find porta potty rentals in your city</p>
                  </Link>
                  <Link
                    href="/rental-products"
                    className={styles.relatedLink}
                  >
                    <h4>🚽 Product Catalog</h4>
                    <p>Browse our complete range of portable toilets</p>
                  </Link>
                  <Link
                    href="/quote"
                    className={styles.relatedLink}
                  >
                    <h4>💰 Get a Quote</h4>
                    <p>Request a free quote for your event or project</p>
                  </Link>
                  <Link
                    href="/faq"
                    className={styles.relatedLink}
                  >
                    <h4>❓ FAQ</h4>
                    <p>Common questions about porta potty rentals</p>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
