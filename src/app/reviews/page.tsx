import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import styles from "./styles.module.css";
import Link from "next/link";
import { testimonials } from "@/features/home/constants";
import Image from "next/image";
import { Star } from "lucide-react";

const websiteURL = process.env.NEXT_PUBLIC_FLUSH_JOHN_WEBSITE_URL!;
const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL!;

export const metadata: Metadata = {
  title: "Customer Reviews | FlushJohn Porta Potty Rentals",
  description:
    "Read real customer reviews and testimonials from FlushJohn porta potty rental customers across the United States.",
  openGraph: {
    title: "Customer Reviews - FlushJohn Porta Potty Rentals",
    description:
      "Read real customer reviews and testimonials from FlushJohn porta potty rental customers.",
    url: `${websiteURL}/reviews`,
    type: "website",
    images: [
      {
        url: `${s3assets}/og-image-flushjonn-web.png`,
        width: 1200,
        height: 630,
        alt: "FlushJohn Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews | FlushJohn Porta Potty Rentals",
    description:
      "Read real customer reviews and testimonials from FlushJohn porta potty rental customers across the United States.",
    images: [`${s3assets}/og-image-flushjonn-web.png`],
  },
  alternates: {
    canonical: `${websiteURL}/reviews`,
  },
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlushJohn",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "6",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function ReviewsPage() {
  return (
    <>
      <Script
        id="review-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <div className={styles.reviewsPage}>
        <div className={styles.container}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <h1>Customer Reviews</h1>
            <p className={styles.subtitle}>
              See what our customers say about FlushJohn porta potty rental
              services
            </p>
            <div className={styles.ratingSummary}>
              <div className={styles.ratingStars}>
                <Star size={32} fill="currentColor" />
                <Star size={32} fill="currentColor" />
                <Star size={32} fill="currentColor" />
                <Star size={32} fill="currentColor" />
                <Star size={32} fill="currentColor" />
              </div>
              <div className={styles.ratingText}>
                <strong>4.8 out of 5</strong>
                <span>Based on customer reviews</span>
              </div>
            </div>
          </section>

          {/* Reviews Grid */}
          <section className={styles.reviewsSection}>
            <h2>What Our Customers Say</h2>
            <div className={styles.reviewsGrid}>
              {testimonials.content.map((review, index) => (
                <div key={index} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <Image
                      src={review.image.src}
                      alt={review.image.alt}
                      width={80}
                      height={80}
                      className={styles.reviewImage}
                    />
                    <div className={styles.reviewInfo}>
                      <h3>{review.title}</h3>
                      <div className={styles.reviewMeta}>
                        <div className={styles.stars}>
                          {Array.from({ length: review.rating || 5 }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                size={16}
                                fill="currentColor"
                                className={styles.star}
                              />
                            )
                          )}
                        </div>
                        {review.verified && (
                          <span className={styles.verifiedBadge}>
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      {review.date && (
                        <p className={styles.reviewDate}>{review.date}</p>
                      )}
                    </div>
                  </div>
                  <p className={styles.reviewBody}>{review.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Leave Review CTA */}
          <section className={styles.ctaSection}>
            <h2>Share Your Experience</h2>
            <p>
              Had a great experience with FlushJohn? We'd love to hear from you!
              Your feedback helps us improve and helps other customers make
              informed decisions.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_FLUSH_JOHN_PHONE!}`}
                className={styles.primaryButton}
              >
                Call Us to Share Feedback
              </a>
              <Link href="/contact" className={styles.secondaryButton}>
                Contact Us
              </Link>
            </div>
            <p className={styles.ctaNote}>
              After your rental, we'll send you a follow-up email with a link to
              leave a review on Google Business Profile.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
