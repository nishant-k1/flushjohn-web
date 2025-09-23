"use client";
import React from "react";
import styles from "./styles.module.css";

const TrustSignals = () => {
  return (
    <div className={styles.trustSignals}>
      <div className={styles.container}>
        <h2>Trusted by Thousands of Customers Nationwide</h2>
        
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>10,000+</div>
            <div className={styles.statLabel}>Happy Customers</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Cities Served</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>99%</div>
            <div className={styles.statLabel}>Customer Satisfaction</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Customer Support</div>
          </div>
        </div>

        <div className={styles.trustBadges}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✅</span>
            <span>Licensed & Insured</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🏆</span>
            <span>5-Star Rated</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🚚</span>
            <span>Same-Day Delivery</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>💰</span>
            <span>Best Price Guarantee</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🧹</span>
            <span>Professionally Cleaned</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>📞</span>
            <span>24/7 Support</span>
          </div>
        </div>

        <div className={styles.testimonials}>
          <h3>What Our Customers Say</h3>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonial}>
              <div className={styles.testimonialText}>
                "FlushJohn provided excellent service for our wedding. Clean, professional, and affordable!"
              </div>
              <div className={styles.testimonialAuthor}>
                <strong>Sarah M.</strong> - Wedding Event
              </div>
              <div className={styles.testimonialRating}>⭐⭐⭐⭐⭐</div>
            </div>
            <div className={styles.testimonial}>
              <div className={styles.testimonialText}>
                "We've been using FlushJohn for our construction projects for 2 years. Reliable and cost-effective."
              </div>
              <div className={styles.testimonialAuthor}>
                <strong>Mike R.</strong> - Construction Site
              </div>
              <div className={styles.testimonialRating}>⭐⭐⭐⭐⭐</div>
            </div>
            <div className={styles.testimonial}>
              <div className={styles.testimonialText}>
                "Great porta potty service for our corporate event. The team was professional and the units were spotless."
              </div>
              <div className={styles.testimonialAuthor}>
                <strong>Jennifer L.</strong> - Corporate Event
              </div>
              <div className={styles.testimonialRating}>⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
