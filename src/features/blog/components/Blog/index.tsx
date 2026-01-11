"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  DollarSign,
  Building2,
  Toilet,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Tag,
} from "lucide-react";
import styles from "./styles.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/utils";
import { convert } from "html-to-text";
import { useRouter, useSearchParams } from "next/navigation";

// Component to handle image loading with error fallback
const BlogImage = ({
  src,
  alt,
  blogId,
}: {
  src: string;
  alt: string;
  blogId: string;
}) => {
  const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL!;
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const fallbackImage = `${s3assets}/og-image-flushjonn-web.png`;

  // Reset when src changes
  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError && imageSrc !== fallbackImage) {
      setHasError(true);
      setImageSrc(fallbackImage);
    }
  };

  return (
    <div className={styles.imageContainer}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={false}
        placeholder="empty"
        style={{
          objectFit: "cover",
        }}
        onError={handleError}
        unoptimized={imageSrc.includes("unsplash.com")}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
      />
    </div>
  );
};

const truncateText = (html: string, maxLength = 150) => {
  const plainText = convert(html, { wordwrap: false });
  const truncated =
    plainText.length > maxLength
      ? plainText.substring(0, maxLength).trim() + "..."
      : plainText;

  // Convert to proper case (first letter uppercase, rest lowercase)
  // Only if the text is ALL CAPS (more than 3 consecutive uppercase letters)
  if (truncated.length > 3 && /[A-Z]{4,}/.test(truncated)) {
    return truncated
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return truncated;
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
  const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL!;
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10) || 1;
  const searchQuery = searchParams.get("search") || "";
  const selectedTag = searchParams.get("tag") || "";

  const [blogs, setBlogs] = useState(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [pagination, setPagination] = useState(
    initialPagination || {
      currentPage: 1,
      totalPages: 1,
      totalItems: initialBlogs.length,
      hasNextPage: false,
      hasPrevPage: false,
    }
  );

  // Extract all unique tags from blogs
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blogs.forEach((blog) => {
      if (blog.tags && Array.isArray(blog.tags)) {
        blog.tags.forEach((tag: string) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [blogs]);

  // Get featured post (first post on page 1, when no search/tag filter)
  const featuredPost = useMemo(() => {
    if (currentPage === 1 && !searchQuery && !selectedTag && blogs.length > 0) {
      return blogs[0];
    }
    return null;
  }, [blogs, currentPage, searchQuery, selectedTag]);

  // Regular posts (exclude featured post from grid)
  const regularPosts = useMemo(() => {
    if (featuredPost) {
      return blogs.slice(1);
    }
    return blogs;
  }, [blogs, featuredPost]);

  // Fetch blogs when page, search, or tag changes
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: "12",
          status: "published",
          sortBy: "createdAt",
          sortOrder: "desc",
        });

        if (searchQuery) {
          params.append("search", searchQuery);
        }

        const res = await fetch(`${API_BASE_URL}/blogs?${params}`);

        if (res.ok) {
          const result = await res.json();
          if (result.success) {
            let filteredBlogs = result.data || [];

            // Filter by tag if selected
            if (selectedTag) {
              filteredBlogs = filteredBlogs.filter(
                (blog: any) =>
                  blog.tags &&
                  Array.isArray(blog.tags) &&
                  blog.tags.includes(selectedTag)
              );
            }

            setBlogs(filteredBlogs);
            setPagination(result.pagination || pagination);
          } else {
            throw new Error("Failed to fetch blogs");
          }
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, searchQuery, selectedTag]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (selectedTag) params.set("tag", selectedTag);
    router.push(`/blog?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput.trim()) {
      params.set("search", searchInput.trim());
    }
    if (selectedTag) params.set("tag", selectedTag);
    params.set("page", "1");
    router.push(`/blog?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams();
    if (searchInput.trim()) params.set("search", searchInput.trim());
    if (tag !== selectedTag) {
      params.set("tag", tag);
    }
    params.set("page", "1");
    router.push(`/blog?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const clearFilters = () => {
    setSearchInput("");
    router.push("/blog?page=1");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const totalPages = pagination.totalPages;
    const current = pagination.currentPage;

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

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

  const formatBlogDate = (dateString: string) => {
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
    const year = date.getUTCFullYear();
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <Breadcrumbs path="" />
        <div className={styles.wrapper}>
          <h1>Our Blog</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchInputWrapper}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={styles.searchInput}
              />
              {(searchQuery || selectedTag) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className={styles.clearButton}
                  aria-label="Clear filters"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>

          {/* Active Filters */}
          {(searchQuery || selectedTag) && (
            <div className={styles.activeFilters}>
              {searchQuery && (
                <span className={styles.filterTag}>
                  Search: "{searchQuery}"
                  <button
                    onClick={() => {
                      const params = new URLSearchParams();
                      if (selectedTag) params.set("tag", selectedTag);
                      params.set("page", "1");
                      router.push(`/blog?${params.toString()}`);
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }}
                    className={styles.filterRemove}
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedTag && (
                <span className={styles.filterTag}>
                  Tag: {selectedTag}
                  <button
                    onClick={() => {
                      const params = new URLSearchParams();
                      if (searchQuery) params.set("search", searchQuery);
                      params.set("page", "1");
                      router.push(`/blog?${params.toString()}`);
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }}
                    className={styles.filterRemove}
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}

          <div className={styles.contentLayout}>
            {/* Main Content */}
            <div className={styles.mainContent}>
              {/* Featured Post */}
              {featuredPost && (
                <Link
                  href={`/blog/${featuredPost.slug || generateSlug(featuredPost.title)}`}
                  className={styles.featuredPost}
                >
                  <div className={styles.featuredImageContainer}>
                    <Image
                      src={
                        featuredPost.coverImageS3?.src ||
                        featuredPost.coverImageUnsplash?.src ||
                        featuredPost.coverImage?.src ||
                        `${s3assets}/og-image-flushjonn-web.png`
                      }
                      alt={featuredPost.title || "Featured post"}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 980px"
                    />
                  </div>
                  <div className={styles.featuredContent}>
                    <span className={styles.featuredBadge}>Featured</span>
                    <h2>{featuredPost.title || "Untitled"}</h2>
                    {featuredPost.excerpt && (
                      <p className={styles.featuredExcerpt}>
                        {featuredPost.excerpt.replace(/<[^>]*>/g, "")}
                      </p>
                    )}
                    <div className={styles.featuredMeta}>
                      <span suppressHydrationWarning>
                        {formatBlogDate(featuredPost.createdAt)}
                      </span>
                      {featuredPost.author && (
                        <>
                          <span>•</span>
                          <span>By {featuredPost.author}</span>
                        </>
                      )}
                    </div>
                    <span className={styles.readMore}>Read More →</span>
                  </div>
                </Link>
              )}

              {/* Blog Stats */}
              <div className={styles.blogStats}>
                <p>
                  Page {pagination.currentPage} of {pagination.totalPages} •
                  Showing {blogs.length} of {pagination.totalItems} blog posts
                </p>
              </div>

              {/* Blog Grid */}
              <div className={styles.blogWrapper}>
                {regularPosts.map((item) => {
                  const {
                    _id,
                    coverImageS3,
                    coverImageUnsplash,
                    title,
                    createdAt,
                    content,
                    slug: apiSlug,
                  } = item;

                  // Prioritize S3 image over Unsplash, with fallback to legacy and default
                  const imageSource =
                    coverImageS3?.src ||
                    coverImageUnsplash?.src ||
                    item.coverImage?.src ||
                    `${s3assets}/og-image-flushjonn-web.png`;

                  const imageAlt =
                    coverImageS3?.alt ||
                    coverImageUnsplash?.alt ||
                    item.coverImage?.alt ||
                    title ||
                    "Blog cover image";

                  // Use slug from API, fallback to generated slug from title
                  const slug = apiSlug || generateSlug(title);
                  const previewText = truncateText(content);

                  return (
                    <Link
                      href={`/blog/${slug}`}
                      key={_id}
                      className={styles.blogItem}
                    >
                      <BlogImage
                        src={imageSource}
                        alt={imageAlt}
                        blogId={_id}
                      />
                      <div className={styles.textContainer}>
                        <h2>{title || "Untitled"}</h2>
                        <h3 suppressHydrationWarning>
                          {formatBlogDate(createdAt)}
                        </h3>
                        <p>{previewText || "No preview available."}</p>
                        <span className={styles.readMore}>Read More →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Categories/Tags */}
              {allTags.length > 0 && (
                <div className={styles.sidebarSection}>
                  <h3 className={styles.sidebarTitle}>
                    <Tag size={18} />
                    Categories
                  </h3>
                  <div className={styles.tagsList}>
                    <button
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (searchQuery) params.set("search", searchQuery);
                        params.set("page", "1");
                        router.push(`/blog?${params.toString()}`);
                        window.scrollTo({ top: 0, behavior: "instant" });
                      }}
                      className={`${styles.tagButton} ${!selectedTag ? styles.tagButtonActive : ""}`}
                    >
                      All Posts
                    </button>
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`${styles.tagButton} ${selectedTag === tag ? styles.tagButtonActive : ""}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Quick Links</h3>
                <div className={styles.quickLinks}>
                  <Link href="/porta-potty-rental" className={styles.quickLink}>
                    <Building2 size={16} />
                    City Services
                  </Link>
                  <Link href="/rental-products" className={styles.quickLink}>
                    <Toilet size={16} />
                    Products
                  </Link>
                  <Link href="/quote" className={styles.quickLink}>
                    <DollarSign size={16} />
                    Get Quote
                  </Link>
                  <Link href="/faq" className={styles.quickLink}>
                    <HelpCircle size={16} />
                    FAQ
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Traditional Pagination */}
          {pagination.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage || loading}
                className={styles.paginationButton}
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
                <span>Previous</span>
              </button>

              <div className={styles.pageNumbers}>
                {generatePageNumbers().map((page, index) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className={styles.ellipsis}
                      >
                        ...
                      </span>
                    );
                  }

                  const pageNum = page as number;
                  const isActive = pageNum === pagination.currentPage;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={loading}
                      className={`${styles.pageNumber} ${isActive ? styles.active : ""}`}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage || loading}
                className={styles.paginationButton}
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Related Content Section - Show on last page */}
          {pagination.currentPage === pagination.totalPages &&
            blogs.length > 0 && (
              <div className={styles.relatedContent}>
                <h3>Explore More Resources</h3>
                <div className={styles.relatedLinks}>
                  <Link
                    href="/porta-potty-rental"
                    className={styles.relatedLink}
                  >
                    <h4
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Building2 size={18} />
                      City-Specific Services
                    </h4>
                    <p>Find porta potty rentals in your city</p>
                  </Link>
                  <Link href="/rental-products" className={styles.relatedLink}>
                    <h4
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Toilet size={18} />
                      Product Catalog
                    </h4>
                    <p>Browse our complete range of portable toilets</p>
                  </Link>
                  <Link href="/quote" className={styles.relatedLink}>
                    <h4
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <DollarSign size={18} />
                      Get a Quote
                    </h4>
                    <p>Request a free quote for your event or project</p>
                  </Link>
                  <Link href="/faq" className={styles.relatedLink}>
                    <h4
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <HelpCircle size={18} />
                      FAQ
                    </h4>
                    <p>Common questions about porta potty rentals</p>
                  </Link>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
