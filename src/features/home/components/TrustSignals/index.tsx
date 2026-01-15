"use client";
import React from "react";
import {
  Check,
  Award,
  DollarSign,
  Truck,
  Droplet,
  Phone,
  Shield,
  Lock,
} from "lucide-react";
import styles from "./styles.module.css";

const TrustSignals = () => {
  return (
    <div className={styles.trustSignals}>
      <div className={styles.container}>
        <h2>Trusted by Thousands of Customers Nationwide</h2>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>25+</div>
            <div className={styles.statLabel}>Cities Served</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>6</div>
            <div className={styles.statLabel}>States Covered</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>2020</div>
            <div className={styles.statLabel}>Established</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Satisfaction Rate</div>
          </div>
        </div>

        <div className={styles.trustBadges}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Check size={20} />
            </span>
            <span>Licensed & Insured</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Truck size={20} />
            </span>
            <span>Fast Delivery (24-48hrs)</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <DollarSign size={20} />
            </span>
            <span>Competitive Pricing</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Droplet size={20} />
            </span>
            <span>Professionally Cleaned</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Phone size={20} />
            </span>
            <span>24/7 Support</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Award size={20} />
            </span>
            <span>Quality Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
