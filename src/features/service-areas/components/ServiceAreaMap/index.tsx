"use client";

import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const ServiceAreaMap = () => {
  return (
    <div className={styles.mapContainer}>
      <h3 className={styles.mapTitle}>Our Service Coverage</h3>
      <p className={styles.mapDescription}>
        We provide porta potty rental services across <strong>25 cities</strong>{" "}
        in <strong>6 states</strong>. Click on any state below to see all cities
        we serve in that state.
      </p>

      <div className={styles.statesVisualization}>
        <div className={styles.stateCard}>
          <div className={styles.stateHeader}>
            <h4 className={styles.stateTitle}>Texas</h4>
            <span className={styles.cityCount}>5 cities</span>
          </div>
          <div className={styles.citiesList}>
            <Link href="/porta-potty-rental/houston">Houston</Link>
            <Link href="/porta-potty-rental/dallas">Dallas</Link>
            <Link href="/porta-potty-rental/austin">Austin</Link>
            <Link href="/porta-potty-rental/san-antonio">San Antonio</Link>
            <Link href="/porta-potty-rental/fort-worth">Fort Worth</Link>
          </div>
          <Link href="/service-areas/texas" className={styles.viewStateLink}>
            View All Texas Cities →
          </Link>
        </div>

        <div className={styles.stateCard}>
          <div className={styles.stateHeader}>
            <h4 className={styles.stateTitle}>Florida</h4>
            <span className={styles.cityCount}>5 cities</span>
          </div>
          <div className={styles.citiesList}>
            <Link href="/porta-potty-rental/miami">Miami</Link>
            <Link href="/porta-potty-rental/orlando">Orlando</Link>
            <Link href="/porta-potty-rental/tampa">Tampa</Link>
            <Link href="/porta-potty-rental/jacksonville">Jacksonville</Link>
            <Link href="/porta-potty-rental/fort-lauderdale">
              Fort Lauderdale
            </Link>
          </div>
          <Link href="/service-areas/florida" className={styles.viewStateLink}>
            View All Florida Cities →
          </Link>
        </div>

        <div className={styles.stateCard}>
          <div className={styles.stateHeader}>
            <h4 className={styles.stateTitle}>California</h4>
            <span className={styles.cityCount}>5 cities</span>
          </div>
          <div className={styles.citiesList}>
            <Link href="/porta-potty-rental/los-angeles">Los Angeles</Link>
            <Link href="/porta-potty-rental/san-diego">San Diego</Link>
            <Link href="/porta-potty-rental/sacramento">Sacramento</Link>
            <Link href="/porta-potty-rental/san-jose">San Jose</Link>
            <Link href="/porta-potty-rental/fresno">Fresno</Link>
          </div>
          <Link
            href="/service-areas/california"
            className={styles.viewStateLink}
          >
            View All California Cities →
          </Link>
        </div>

        <div className={styles.stateCard}>
          <div className={styles.stateHeader}>
            <h4 className={styles.stateTitle}>Georgia</h4>
            <span className={styles.cityCount}>5 cities</span>
          </div>
          <div className={styles.citiesList}>
            <Link href="/porta-potty-rental/atlanta">Atlanta</Link>
            <Link href="/porta-potty-rental/savannah">Savannah</Link>
            <Link href="/porta-potty-rental/augusta">Augusta</Link>
            <Link href="/porta-potty-rental/macon">Macon</Link>
            <Link href="/porta-potty-rental/columbus">Columbus</Link>
          </div>
          <Link href="/service-areas/georgia" className={styles.viewStateLink}>
            View All Georgia Cities →
          </Link>
        </div>

        <div className={styles.stateCard}>
          <div className={styles.stateHeader}>
            <h4 className={styles.stateTitle}>Illinois</h4>
            <span className={styles.cityCount}>5 cities</span>
          </div>
          <div className={styles.citiesList}>
            <Link href="/porta-potty-rental/chicago">Chicago</Link>
            <Link href="/porta-potty-rental/springfield">Springfield</Link>
            <Link href="/porta-potty-rental/peoria">Peoria</Link>
            <Link href="/porta-potty-rental/rockford">Rockford</Link>
            <Link href="/porta-potty-rental/naperville">Naperville</Link>
          </div>
          <Link href="/service-areas/illinois" className={styles.viewStateLink}>
            View All Illinois Cities →
          </Link>
        </div>

        <div className={styles.stateCard}>
          <div className={styles.stateHeader}>
            <h4 className={styles.stateTitle}>Delaware</h4>
            <span className={styles.cityCount}>1 city</span>
          </div>
          <div className={styles.citiesList}>
            <Link href="/porta-potty-rental/dover">Dover</Link>
          </div>
          <Link href="/service-areas/delaware" className={styles.viewStateLink}>
            View Delaware Services →
          </Link>
        </div>
      </div>

      <div className={styles.summaryStats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>6</span>
          <span className={styles.statLabel}>States</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>25</span>
          <span className={styles.statLabel}>Cities</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>50+</span>
          <span className={styles.statLabel}>Mile Radius</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreaMap;
