
"use client";

import styles from "./styles.module.css";

const LoadingSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonSubtitle}></div>
      </div>
      
      <div className={styles.skeletonGrid}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonButton}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
