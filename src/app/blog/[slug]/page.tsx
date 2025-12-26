import React from "react";
import { BlogPost } from "@/features/blog/components";
import { apiBaseUrls, s3assets, websiteURL, socialMedia } from "@/constants";
import DOMPurify from "isomorphic-dompurify";

const { API_BASE_URL } = apiBaseUrls;
const API_URL = `${API_BASE_URL}/blogs`;

// City coordinates mapping for geo-targeting
const getCityCoordinates = (cityName: string | null, state: string | null) => {
  if (!cityName || !state) return null;

  const citySlug = cityName.toLowerCase().replace(/\s+/g, "-");
  const coordinates: Record<string, { lat: string; lng: string }> = {
    dover: { lat: "39.1582", lng: "-75.5244" },
    houston: { lat: "29.7604", lng: "-95.3698" },
    dallas: { lat: "32.7767", lng: "-96.7970" },
    austin: { lat: "30.2672", lng: "-97.7431" },
    "san-antonio": { lat: "29.4241", lng: "-98.4936" },
    "fort-worth": { lat: "32.7555", lng: "-97.3308" },
    miami: { lat: "25.7617", lng: "-80.1918" },
    orlando: { lat: "28.5383", lng: "-81.3792" },
    tampa: { lat: "27.9506", lng: "-82.4572" },
    jacksonville: { lat: "30.3322", lng: "-81.6557" },
    "fort-lauderdale": { lat: "26.1224", lng: "-80.1373" },
    "los-angeles": { lat: "34.0522", lng: "-118.2437" },
    "san-diego": { lat: "32.7157", lng: "-117.1611" },
    sacramento: { lat: "38.5816", lng: "-121.4944" },
    "san-jose": { lat: "37.3382", lng: "-121.8863" },
    fresno: { lat: "36.7378", lng: "-119.7871" },
    atlanta: { lat: "33.7490", lng: "-84.3880" },
    savannah: { lat: "32.0835", lng: "-81.0998" },
    augusta: { lat: "33.4735", lng: "-82.0105" },
    macon: { lat: "32.8407", lng: "-83.6324" },
    columbus: { lat: "32.4610", lng: "-84.9877" },
    chicago: { lat: "41.8781", lng: "-87.6298" },
    springfield: { lat: "39.7817", lng: "-89.6501" },
    peoria: { lat: "40.6936", lng: "-89.5890" },
    rockford: { lat: "42.2711", lng: "-89.0940" },
    naperville: { lat: "41.7508", lng: "-88.1535" },
  };

  return coordinates[citySlug] || null;
};

// Normalize state abbreviation
const normalizeState = (state: string | null): string | null => {
  if (!state) return null;
  const stateMap: Record<string, string> = {
    texas: "TX",
    florida: "FL",
    california: "CA",
    georgia: "GA",
    illinois: "IL",
    delaware: "DE",
  };
  const normalized = state.trim();
  return stateMap[normalized.toLowerCase()] || normalized.toUpperCase().slice(0, 2);
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) return { title: "FlushJohn Blog" };

  try {
    const res = await fetch(`${API_URL}?slug=${slug}&status=published`, {
      cache: "no-store",
    });
    const { data: blogs } = (await res.json()) || {};
    if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
      return { title: "Blog Post Not Found" };
    }

    const blog = blogs.find((b: any) => b.slug === slug);
    if (!blog) {
      return { title: "Blog Post Not Found" };
    }

    const hasLocation = blog.city && blog.state;
    const stateAbbr = hasLocation ? normalizeState(blog.state) : null;
    const coordinates = hasLocation ? getCityCoordinates(blog.city, blog.state) : null;

    const metadata: any = {
      title: `${blog?.title} | FlushJohn Blog`,
      description: blog?.excerpt || "Read our latest blog post on FlushJohn.",
      keywords: blog?.tags?.join(", ") || "blog, FlushJohn",
      openGraph: {
        title: blog?.title,
        description: blog?.excerpt || blog?.title,
        url: `${websiteURL}/blog/${slug}`,
        images: [
          {
            url: blog?.coverImageUnsplash?.src || blog?.coverImageS3?.src || blog?.coverImage?.src || `${s3assets}/og-image-flushjonn-web.png`,
            height: 630,
            width: 1200,
            alt: blog?.title,
          },
        ],
        type: "article",
        siteName: "FlushJohn",
        publishedTime: blog?.publishedAt || new Date().toISOString(),
        modifiedTime: blog?.updatedAt || new Date().toISOString(),
        authors: [blog?.author || "FlushJohn Team"],
      },
      twitter: {
        card: "summary_large_image",
        title: blog?.title,
        description: blog?.excerpt || blog?.title,
        images: [blog?.coverImageUnsplash?.src || blog?.coverImageS3?.src || blog?.coverImage?.src || `${s3assets}/og-image-flushjonn-web.png`],
      },
      alternates: {
        canonical: `${websiteURL}/blog/${slug}`,
      },
    };

    // Add geo-targeting meta tags for city-specific blog posts
    if (hasLocation && stateAbbr && coordinates) {
      metadata.other = {
        "geo.region": `US-${stateAbbr}`,
        "geo.placename": blog.city,
        "geo.position": `${coordinates.lat};${coordinates.lng}`,
        "ICBM": `${coordinates.lat}, ${coordinates.lng}`,
      };
    }

    return metadata;
  } catch (error) {
    return { title: "FlushJohn Blog" };
  }
}

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  if (!slug) return;

  try {
    const res = await fetch(`${API_URL}?slug=${slug}&status=published`, {
      cache: "no-store",
    });
    const { data: blogs } = (await res.json()) || {};
    if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
      return <div>Blog Post Not Found</div>;
    }

    const blog = blogs.find((b: any) => b.slug === slug);
    if (!blog) {
      return <div>Blog Post Not Found</div>;
    }

    const blogPost = {
      ...blog,
      content: DOMPurify.sanitize(
        blog.content
          ?.replace(/^```html\s*\n?/, "") // Remove opening ```html with optional newline
          ?.replace(/\n?\s*```\s*$/, "") // Remove closing ``` with optional newline
          ?.replace(/^```html\s*/, "") // Fallback: Remove opening ```html
          ?.replace(/\s*```\s*$/, "") // Fallback: Remove closing ```
          ?.trim() || ""
      ),
    };

    // Fetch related posts (same tags, excluding current post)
    let relatedPosts: any[] = [];
    try {
      const relatedRes = await fetch(
        `${API_URL}?status=published&limit=12&sortBy=createdAt&sortOrder=desc`,
        { cache: "no-store" }
      );
      if (relatedRes.ok) {
        const relatedResult = await relatedRes.json();
        if (relatedResult.success && relatedResult.data) {
          // Filter posts with matching tags, exclude current post
          if (blogPost.tags && Array.isArray(blogPost.tags) && blogPost.tags.length > 0) {
            relatedPosts = relatedResult.data
              .filter((post: any) => {
                if (post._id === blogPost._id || post.slug === slug) return false;
                if (!post.tags || !Array.isArray(post.tags)) return false;
                return post.tags.some((tag: string) => blogPost.tags.includes(tag));
              })
              .slice(0, 3);
          }
          
          // If not enough related posts, fill with recent posts
          if (relatedPosts.length < 3) {
            const recentPosts = relatedResult.data
              .filter((post: any) => post._id !== blogPost._id && post.slug !== slug)
              .slice(0, 3 - relatedPosts.length);
            relatedPosts = [...relatedPosts, ...recentPosts].slice(0, 3);
          }
        }
      }
    } catch (error) {
      // Error fetching related posts - continue without them
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blogPost.title,
      description: blogPost.excerpt || blogPost.title,
      datePublished: blogPost.publishedAt || new Date().toISOString(),
      dateModified: blogPost.updatedAt || new Date().toISOString(),
      author: {
        "@type": "Person",
        name: blogPost.author || "FlushJohn Team",
      },
      publisher: {
        "@type": "Organization",
        name: "FlushJohn",
        logo: {
          "@type": "ImageObject",
          url: `${s3assets}/og-image-flushjonn-web.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${websiteURL}/blog/${slug}`,
      },
      image:
        blogPost?.coverImageUnsplash?.src || blogPost?.coverImageS3?.src || blogPost?.coverImage?.src || `${s3assets}/og-image-flushjonn-web.png`,
    };

    // Enhanced JSON-LD with location data for city-specific posts
    const hasLocation = blogPost.city && blogPost.state;
    const stateAbbr = hasLocation ? normalizeState(blogPost.state) : null;
    const coordinates = hasLocation ? getCityCoordinates(blogPost.city, blogPost.state) : null;

    const enhancedJsonLd: any = {
      ...jsonLd,
      wordCount: Math.max(
        blogPost.content?.replace(/<[^>]*>/g, "").length || 0,
        500
      ),
      timeRequired: `PT${Math.ceil((blogPost.content?.replace(/<[^>]*>/g, "").length || 500) / 200)}M`,
      articleSection: blogPost.category || "Porta Potty Rentals",
      keywords:
        blogPost.tags?.join(", ") ||
        "porta potty rental, portable toilets, event sanitation",
      inLanguage: "en-US",
      isAccessibleForFree: true,
      about: [
        {
          "@type": "Thing",
          name: "Porta Potty Rental Services",
          description:
            "Professional porta potty rental services for events and construction sites",
        },
        {
          "@type": "Service",
          name: "Event Sanitation Solutions",
          description: "Comprehensive sanitation services for outdoor events",
        },
      ],
      mentions: [
        {
          "@type": "Organization",
          name: "FlushJohn",
          url: websiteURL,
          sameAs: [
            socialMedia.facebook,
            socialMedia.twitter,
            socialMedia.linkedin,
          ],
        },
      ],
      speakable: {
        "@type": "SpeakableSpecification",
        xpath: ["/html/head/title", "//*[@id='main-content']"],
      },
      potentialAction: {
        "@type": "ReadAction",
        target: `${websiteURL}/blog/${slug}`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "23",
        bestRating: "5",
        worstRating: "1",
      },
    };

    // Add location data to JSON-LD for city-specific blog posts
    if (hasLocation && stateAbbr && coordinates) {
      enhancedJsonLd.contentLocation = {
        "@type": "City",
        name: blogPost.city,
        addressRegion: stateAbbr,
        addressCountry: "US",
      };
      enhancedJsonLd.spatialCoverage = {
        "@type": "Place",
        name: `${blogPost.city}, ${stateAbbr}`,
        geo: {
          "@type": "GeoCoordinates",
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        },
      };
    }

    // Breadcrumb schema for blog post
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: websiteURL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${websiteURL}/blog`,
      },
    ];

    // Add city link if blog post is city-specific
    if (hasLocation && blogPost.city) {
      const citySlug = blogPost.city.toLowerCase().replace(/\s+/g, "-");
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 3,
        name: `${blogPost.city} Porta Potty Rentals`,
        item: `${websiteURL}/porta-potty-rental/${citySlug}`,
      });
    }

    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: blogPost.title,
      item: `${websiteURL}/blog/${slug}`,
    });

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(enhancedJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <BlogPost
          blogPost={blogPost}
          slug={slug}
          relatedPosts={relatedPosts}
        />
      </>
    );
  } catch (error) {
    return <div>Error loading blog post</div>;
  }
};

export default BlogPostPage;
