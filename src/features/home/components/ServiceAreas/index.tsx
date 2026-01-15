import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const serviceAreasByState = {
  Delaware: [{ name: "Dover", slug: "dover", state: "DE" }],
  Texas: [
    { name: "Houston", slug: "houston", state: "TX" },
    { name: "Dallas", slug: "dallas", state: "TX" },
    { name: "Austin", slug: "austin", state: "TX" },
    { name: "San Antonio", slug: "san-antonio", state: "TX" },
    { name: "Fort Worth", slug: "fort-worth", state: "TX" },
  ],
  Florida: [
    { name: "Miami", slug: "miami", state: "FL" },
    { name: "Orlando", slug: "orlando", state: "FL" },
    { name: "Tampa", slug: "tampa", state: "FL" },
    { name: "Jacksonville", slug: "jacksonville", state: "FL" },
    { name: "Fort Lauderdale", slug: "fort-lauderdale", state: "FL" },
  ],
  California: [
    { name: "Los Angeles", slug: "los-angeles", state: "CA" },
    { name: "San Diego", slug: "san-diego", state: "CA" },
    { name: "Sacramento", slug: "sacramento", state: "CA" },
    { name: "San Jose", slug: "san-jose", state: "CA" },
    { name: "Fresno", slug: "fresno", state: "CA" },
  ],
  Georgia: [
    { name: "Atlanta", slug: "atlanta", state: "GA" },
    { name: "Savannah", slug: "savannah", state: "GA" },
    { name: "Augusta", slug: "augusta", state: "GA" },
    { name: "Macon", slug: "macon", state: "GA" },
    { name: "Columbus", slug: "columbus", state: "GA" },
  ],
  Illinois: [
    { name: "Chicago", slug: "chicago", state: "IL" },
    { name: "Springfield", slug: "springfield", state: "IL" },
    { name: "Peoria", slug: "peoria", state: "IL" },
    { name: "Rockford", slug: "rockford", state: "IL" },
    { name: "Naperville", slug: "naperville", state: "IL" },
  ],
};

const ServiceAreas = () => {
  return (
    <div className={styles.serviceAreas}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Find Porta Potty Rentals Near You
        </h2>
        <p className={styles.description}>
          We provide reliable porta potty rental services across multiple
          states. Click on any city below to learn more about our services in
          that area.
        </p>
        <div className={styles.statesGrid}>
          {Object.entries(serviceAreasByState).map(([state, cities]) => (
            <div key={state} className={styles.stateCard}>
              <h3 className={styles.stateName}>{state}</h3>
              <ul className={styles.citiesList}>
                {cities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/porta-potty-rental/${city.slug}`}
                      className={styles.cityLink}
                      prefetch={true}
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.viewAllLink}>
          <Link href="/service-areas" className={styles.linkButton}>
            View All Service Areas →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreas;
