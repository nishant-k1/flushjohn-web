"use client";
import React from "react";
import { Check, Award, DollarSign, Truck, Droplet, Phone } from "lucide-react";
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
            <span className={styles.badgeIcon}><Check size={20} /></span>
            <span>Licensed & Insured</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}><Award size={20} /></span>
            <span>5-Star Rated</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}><Truck size={20} /></span>
            <span>Same-Day Delivery</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}><DollarSign size={20} /></span>
            <span>Best Price Guarantee</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}><Droplet size={20} /></span>
            <span>Professionally Cleaned</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}><Phone size={20} /></span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
