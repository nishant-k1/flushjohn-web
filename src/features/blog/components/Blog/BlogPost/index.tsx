"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { phone, websiteURL, s3assets } from "@/constants";
import { generateSlug } from "@/utils";
import { convert } from "html-to-text";

const BlogPost = ({ blogPost, slug, relatedPosts = [] }: any) => {
  const actualBlogPost = blogPost;

  const {
    title,
    coverImageS3,
    coverImageUnsplash,
    coverImage, // Legacy field for backward compatibility
    blogNo,
    content,
    author,
    createdAt,
    tags,
    excerpt,
  } = actualBlogPost || {};

  // Prioritize S3 image over Unsplash, with fallback to legacy and default
  const imageSource =
    coverImageS3?.src ||
    coverImageUnsplash?.src ||
    coverImage?.src ||
    `${s3assets}/og-image-flushjonn-web.png`;

  const imageAlt =
    coverImageS3?.alt ||
    coverImageUnsplash?.alt ||
    coverImage?.alt ||
    title ||
    "Blog cover image";

  const [imageError, setImageError] = useState(false);
  const fallbackImage = `${s3assets}/og-image-flushjonn-web.png`;
  const finalImageSource = imageError ? fallbackImage : imageSource;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    // Use UTC to ensure consistent formatting between server and client
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const year = date.getUTCFullYear();
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    return `${month} ${day}, ${year}`;
  };

  const readingTime = Math.ceil((content?.length || 0) / 200);

  if (!title && !content) {
    return (
      <div>
        <div className={styles.post}>
          <div className={styles.container}>
            <Breadcrumbs path={`/blog/${slug}`} />
            <div className={styles.wrapper}>
              <h1>{actualBlogPost?.title || "No Title"}</h1>
              {imageSource && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    maxWidth: "1200px",
                    margin: "0 auto",
                  }}
                >
                  <Image
                    src={finalImageSource}
                    alt={imageAlt}
                    fill
                    priority={true}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    quality={85}
                    onError={() => {
                      if (!imageError) {
                        setImageError(true);
                      }
                    }}
                    unoptimized={finalImageSource.includes("unsplash.com")}
                  />
                </div>
              )}
              <div
                className={styles.blogContent}
                dangerouslySetInnerHTML={{
                  __html: actualBlogPost?.content || "",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.post}>
        <div className={styles.container}>
          <Breadcrumbs path={`/blog/${slug}`} />
          <div className={styles.wrapper}>
            {/* Enhanced Blog Header */}
            <header style={{ marginBottom: "30px" }}>
              <h1
                style={{
                  fontSize: "2.5em",
                  marginBottom: "15px",
                  color: "var(--text-primary)",
                  lineHeight: "1.2",
                }}
              >
                {title || "No Title"}
              </h1>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px",
                  marginBottom: "20px",
                  fontSize: "0.9em",
                  color: "var(--text-secondary)",
                }}
              >
                {author && (
                  <span>
                    By <strong>{author}</strong>
                  </span>
                )}
                {createdAt && (
                  <span suppressHydrationWarning>
                    • {formatDate(createdAt)}
                  </span>
                )}
                <span>• {readingTime} min read</span>
              </div>

              {excerpt && (
                <p
                  style={{
                    fontSize: "1.2em",
                    color: "var(--text-secondary)",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                  }}
                >
                  {excerpt.replace(/<[^>]*>/g, "")}
                </p>
              )}

              {tags && tags.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  {tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      style={{
                        display: "inline-block",
                        background: "var(--primary-bg-color)",
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: "0",
                        fontSize: "0.8em",
                        marginRight: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Cover Image */}
            {imageSource && (
              <div
                style={{
                  marginBottom: "30px",
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: "0",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={imageSource}
                  alt={imageAlt}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  onError={(e) => {
                    e.currentTarget.src = `${s3assets}/og-image-flushjonn-web.png`;
                  }}
                />
              </div>
            )}

            {/* Blog Content */}
            <div
              className={styles.blogContent}
              style={{
                fontSize: "1.1em",
                lineHeight: "1.8",
                color: "var(--text-primary)",
                marginBottom: "40px",
              }}
              dangerouslySetInnerHTML={{
                __html: content || "",
              }}
            />

            {/* SEO-Enhanced CTA Section */}
            <div
              style={{
                background: "var(--primary-bg-color)",
                color: "white",
                padding: "30px",
                borderRadius: "0",
                marginBottom: "40px",
                textAlign: "center",
              }}
            >
              <h2 style={{ margin: "0 0 15px 0", fontSize: "1.5em" }}>
                Need Porta Potty Rentals?
              </h2>
              <p style={{ margin: "0 0 25px 0", fontSize: "1.1em" }}>
                Get professional porta potty rental services for your event or
                construction site
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  href="/quote"
                  style={{
                    background: "var(--text-primary)",
                    color: "var(--bg-primary)",
                    padding: "12px 25px",
                    textDecoration: "none",
                    borderRadius: "0",
                    fontSize: "1em",
                    fontWeight: "bold",
                    display: "inline-block",
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Free Quote
                </Link>
                <a
                  href={phone.phone_link}
                  style={{
                    background: "var(--primary)",
                    color: "white",
                    padding: "12px 25px",
                    textDecoration: "none",
                    borderRadius: "0",
                    fontSize: "1em",
                    fontWeight: "bold",
                    display: "inline-block",
                  }}
                >
                  Call {phone.phone_number}
                </a>
              </div>
            </div>

            {/* Author Bio */}
            <div
              style={{
                background: "var(--neutral-700)",
                padding: "20px",
                borderRadius: "0",
                marginBottom: "40px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <h3
                style={{ margin: "0 0 10px 0", color: "var(--text-primary)" }}
              >
                About {author || "FlushJohn Team"}
              </h3>
              <p style={{ margin: "0", color: "var(--text-secondary)" }}>
                {author || "FlushJohn Team"} is a porta potty rental expert with
                years of experience in event sanitation and construction site
                services. They help customers find the perfect portable toilet
                solutions for their needs.
              </p>
            </div>

            {/* Social Sharing */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h3
                style={{ margin: "0 0 15px 0", color: "var(--text-primary)" }}
              >
                Share This Article
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${websiteURL}/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "var(--social-facebook)",
                    color: "white",
                    padding: "8px 15px",
                    textDecoration: "none",
                    borderRadius: "0",
                    fontSize: "0.9em",
                  }}
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${websiteURL}/blog/${slug}`)}&text=${encodeURIComponent(actualBlogPost?.title || "Check out this article")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "var(--social-twitter)",
                    color: "white",
                    padding: "8px 15px",
                    textDecoration: "none",
                    borderRadius: "0",
                    fontSize: "0.9em",
                  }}
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${websiteURL}/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "var(--social-linkedin)",
                    color: "white",
                    padding: "8px 15px",
                    textDecoration: "none",
                    borderRadius: "0",
                    fontSize: "0.9em",
                  }}
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className={styles.relatedPosts}>
                <h2 className={styles.relatedPostsTitle}>Related Articles</h2>
                <div className={styles.relatedPostsGrid}>
                  {relatedPosts.map((post: any) => {
                    const postSlug = post.slug || generateSlug(post.title);
                    const postImage =
                      post.coverImageS3?.src ||
                      post.coverImageUnsplash?.src ||
                      post.coverImage?.src ||
                      `${s3assets}/og-image-flushjonn-web.png`;
                    const postExcerpt = post.excerpt
                      ? post.excerpt.replace(/<[^>]*>/g, "").substring(0, 120) +
                        "..."
                      : convert(post.content || "", {
                          wordwrap: false,
                        }).substring(0, 120) + "...";
                    const formatDate = (dateString: string) => {
                      if (!dateString) return "";
                      const date = new Date(dateString);
                      const months = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ];
                      return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
                    };

                    return (
                      <Link
                        key={post._id}
                        href={`/blog/${postSlug}`}
                        className={styles.relatedPostCard}
                      >
                        <div className={styles.relatedPostImage}>
                          <Image
                            src={postImage}
                            alt={post.title || "Related post"}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                          />
                        </div>
                        <div className={styles.relatedPostContent}>
                          <h3>{post.title || "Untitled"}</h3>
                          <p className={styles.relatedPostExcerpt}>
                            {postExcerpt}
                          </p>
                          <span
                            className={styles.relatedPostDate}
                            suppressHydrationWarning
                          >
                            {formatDate(post.createdAt)}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Back to Blog */}
            <div style={{ textAlign: "center" }}>
              <Link
                href="/blog"
                style={{
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  fontWeight: "500",
                  fontSize: "1.1em",
                }}
              >
                ← Back to All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
